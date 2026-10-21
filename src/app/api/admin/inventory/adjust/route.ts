import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "DENTIST"]);
    const body = await request.json();

    const {
      inventoryItemId,
      movementType, // "Purchase", "Usage", "Adjustment", "Damaged", "Expired"
      quantity,     // positive integer count
      reason,
    } = body;

    const numQty = Math.max(1, Math.abs(Number(quantity) || 1));
    if (!inventoryItemId || !movementType || !reason) {
      return NextResponse.json(
        { error: "Item ID, movement type, and clinical reason are required." },
        { status: 400 }
      );
    }

    const item = await prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 });
    }

    // Determine inventory delta:
    // Purchase = +numQty
    // Usage, Damaged, Expired = -numQty
    // Adjustment = can be positive or negative based on reason or explicit delta
    let delta = numQty;
    if (["Usage", "Damaged", "Expired"].includes(movementType)) {
      if (item.quantityAvailable < numQty) {
        return NextResponse.json(
          { error: `Insufficient stock available (${item.quantityAvailable} units). Cannot deduct ${numQty}.` },
          { status: 400 }
        );
      }
      delta = -numQty;
    } else if (movementType === "Adjustment" && body.direction === "decrease") {
      delta = -numQty;
    }

    const [movement, updatedItem] = await prisma.$transaction([
      prisma.stockMovement.create({
        data: {
          inventoryItemId: item.id,
          movementType,
          quantity: delta,
          reason: reason.trim(),
          recordedById: session.userId,
        },
        include: {
          recordedBy: { select: { fullName: true } },
        },
      }),
      prisma.inventoryItem.update({
        where: { id: item.id },
        data: {
          quantityAvailable: { increment: delta },
        },
      }),
    ]);

    // Check low stock alert notification
    if (updatedItem.quantityAvailable <= updatedItem.reorderThreshold) {
      await prisma.notification.create({
        data: {
          title: "Low Inventory Alert",
          message: `${updatedItem.name} is down to ${updatedItem.quantityAvailable} ${updatedItem.unit}s (Threshold: ${updatedItem.reorderThreshold}).`,
          type: "warning",
          link: "/admin/inventory",
        },
      });
    }

    await createAuditLog({
      actor: session,
      action: "STOCK_ADJUSTMENT",
      entityType: "InventoryItem",
      entityId: updatedItem.id,
      details: {
        sku: updatedItem.sku,
        name: updatedItem.name,
        movementType,
        quantity: delta,
        newStock: updatedItem.quantityAvailable,
        reason,
      },
    });

    return NextResponse.json({ success: true, movement, item: updatedItem });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
