import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: NextRequest) {
  try {
    const session = await requireAuth();
    const url = new URL(request.url);

    const category = url.searchParams.get("category");
    const lowStockOnly = url.searchParams.get("lowStock") === "true";
    const search = url.searchParams.get("search");

    const where: any = { isActive: true };
    if (category && category !== "ALL") where.category = category;

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
      ];
    }

    let items = await prisma.inventoryItem.findMany({
      where,
      orderBy: { name: "asc" },
      include: {
        supplier: { select: { id: true, name: true, phone: true } },
        movements: {
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { recordedBy: { select: { fullName: true } } },
        },
      },
    });

    if (lowStockOnly) {
      items = items.filter((i) => i.quantityAvailable <= i.reorderThreshold);
    }

    return NextResponse.json({ items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const body = await request.json();

    const {
      sku,
      name,
      category = "Consumables",
      unit = "box",
      quantityAvailable = 0,
      reorderThreshold = 5,
      supplierId,
      purchaseCost = 0,
      expiryDate,
      batchNumber,
      storageLocation = "Main Storage",
    } = body;

    if (!sku || !name) {
      return NextResponse.json({ error: "SKU and Item Name are required." }, { status: 400 });
    }

    const cleanSku = sku.trim().toUpperCase();
    const existing = await prisma.inventoryItem.findUnique({ where: { sku: cleanSku } });
    if (existing) {
      return NextResponse.json({ error: "An item with this SKU already exists." }, { status: 400 });
    }

    const item = await prisma.inventoryItem.create({
      data: {
        sku: cleanSku,
        name: name.trim(),
        category,
        unit,
        quantityAvailable: Number(quantityAvailable),
        reorderThreshold: Number(reorderThreshold),
        supplierId: supplierId || null,
        purchaseCost: Number(purchaseCost),
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        batchNumber: batchNumber?.trim() || null,
        storageLocation,
        isActive: true,
      },
      include: { supplier: true },
    });

    // Record initial ledger intake if quantity > 0
    if (Number(quantityAvailable) > 0) {
      await prisma.stockMovement.create({
        data: {
          inventoryItemId: item.id,
          movementType: "Purchase",
          quantity: Number(quantityAvailable),
          reason: "Initial catalogue intake",
          recordedById: session.userId,
        },
      });
    }

    await createAuditLog({
      actor: session,
      action: "CREATE_INVENTORY_ITEM",
      entityType: "InventoryItem",
      entityId: item.id,
      details: { sku: item.sku, name: item.name, initialQuantity: item.quantityAvailable },
    });

    return NextResponse.json({ success: true, item }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
