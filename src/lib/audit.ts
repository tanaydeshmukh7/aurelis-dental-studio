import { prisma } from "./prisma";
import { SessionPayload } from "./auth";

export async function createAuditLog({
  actor,
  action,
  entityType,
  entityId,
  details,
  ipAddress,
}: {
  actor?: SessionPayload | null;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown> | string;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: actor?.userId || null,
        actorName: actor?.fullName || "System / Public",
        actorRole: actor?.role || "SYSTEM",
        action,
        entityType,
        entityId: entityId || null,
        detailsJson: typeof details === "object" ? JSON.stringify(details) : details || null,
        ipAddress: ipAddress || null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
}
