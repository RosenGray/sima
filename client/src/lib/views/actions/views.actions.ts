"use server";

import { headers } from "next/headers";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { viewsRepository } from "../repository/ViewsRepository";
import { EntityType } from "@/lib/constants/entityTypes";

export async function recordAdView(
  entityType: EntityType,
  entityPublicId: string
): Promise<void> {
  try {
    const user = await getCurrentUser();

    if (user) {
      await viewsRepository.recordView({
        entityType,
        entityPublicId,
        userId: user.id,
      });
    } else {
      const headerStore = await headers();
      const forwarded = headerStore.get("x-forwarded-for");
      const realIp = headerStore.get("x-real-ip");

      const ip = forwarded
        ? forwarded.split(",")[0].trim()
        : realIp
        ? realIp
        : null;

      if (!ip) return;

      await viewsRepository.recordView({
        entityType,
        entityPublicId,
        ip,
      });
    }
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
    console.error("recordAdView error:", error);
  }
}

export async function getAdViewCount(
  entityType: EntityType,
  entityPublicId: string
): Promise<number> {
  try {
    return await viewsRepository.getViewCount(entityType, entityPublicId);
  } catch {
    return 0;
  }
}
