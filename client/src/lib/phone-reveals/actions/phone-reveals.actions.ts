"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { phoneRevealsRepository } from "../repository/PhoneRevealsRepository";
import { EntityType } from "@/lib/constants/entityTypes";

export async function recordPhoneReveal(
  entityType: EntityType,
  entityPublicId: string
): Promise<void> {
  try {
    const user = await getCurrentUser();
    if (!user) return;

    await phoneRevealsRepository.recordReveal({
      userId: user.id,
      entityType,
      entityPublicId,
    });
  } catch (error: unknown) {
    // E11000 duplicate key — treat as success (race condition)
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: number }).code === 11000
    ) {
      return;
    }
    console.error("recordPhoneReveal error:", error);
  }
}

export async function getPhoneRevealCount(
  entityType: EntityType,
  entityPublicId: string
): Promise<number> {
  try {
    return await phoneRevealsRepository.getRevealCount(entityType, entityPublicId);
  } catch {
    return 0;
  }
}
