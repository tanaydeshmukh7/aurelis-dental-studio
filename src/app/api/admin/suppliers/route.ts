import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function GET() {
  try {
    await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN", "ACCOUNTANT"]);

    const suppliers = await prisma.supplier.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { inventoryItems: true, expenses: true },
        },
      },
    });

    return NextResponse.json({ suppliers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth(["SUPER_ADMIN", "CLINIC_ADMIN"]);
    const body = await request.json();

    const { name, contactPerson, email, phone, address, categories, notes } = body;
    if (!name) {
      return NextResponse.json({ error: "Supplier name is required" }, { status: 400 });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name: name.trim(),
        contactPerson: contactPerson?.trim() || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        address: address?.trim() || null,
        categoriesJson: JSON.stringify(categories || []),
        notes: notes?.trim() || null,
        isActive: true,
      },
    });

    await createAuditLog({
      actor: session,
      action: "CREATE_SUPPLIER",
      entityType: "Supplier",
      entityId: supplier.id,
      details: { name: supplier.name, contact: supplier.contactPerson },
    });

    return NextResponse.json({ success: true, supplier }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
