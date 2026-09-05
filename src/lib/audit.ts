import { db } from "@/lib/db";

export async function createAuditLog(
  userId: string,
  action: string,
  entity: string,
  entityId: string,
  previousValue?: any,
  newValue?: any,
  ipAddress?: string
) {
  try {
    return await db.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        previousValue: previousValue ? JSON.stringify(previousValue) : null,
        newValue: newValue ? JSON.stringify(newValue) : null,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // Don't throw, just log so it doesn't break main application flow
  }
}
