"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import connectDB from "@/lib/mongo/mongodb";
import { AdLike } from "../models/AdLike";
import mongoose from "mongoose";

export type LikeActionResult =
  | { success: true; liked: boolean }
  | { success: false; error: string };

/**
 * Add a like for the current user. Idempotent (no-op if already liked).
 */
export async function addLike(
  entityType: string,
  entityPublicId: string
): Promise<LikeActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Необходимо войти в систему" };
    }

    await connectDB();
    const userId = new mongoose.Types.ObjectId(user.id);
    await AdLike.findOneAndUpdate(
      { user: userId, entityType, entityPublicId },
      { $setOnInsert: { user: userId, entityType, entityPublicId } },
      { upsert: true }
    );

    return { success: true, liked: true };
  } catch (error) {
    console.error("Error adding like:", error);
    return { success: false, error: "Не удалось добавить в избранное" };
  }
}

/**
 * Remove a like for the current user. No-op if not liked.
 */
export async function removeLike(
  entityType: string,
  entityPublicId: string
): Promise<LikeActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Необходимо войти в систему" };
    }

    await connectDB();
    await AdLike.deleteOne({
      user: new mongoose.Types.ObjectId(user.id),
      entityType,
      entityPublicId,
    });

    return { success: true, liked: false };
  } catch (error) {
    console.error("Error removing like:", error);
    return { success: false, error: "Не удалось убрать из избранного" };
  }
}

/**
 * Merge guest likes (from localStorage) into the current user's likes.
 * Called after login. Returns the new list of liked public IDs for the given entity type.
 */
export async function mergeGuestLikes(
  entityType: string,
  publicIds: string[]
): Promise<{ success: true; likedIds: string[] } | { success: false; error: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Необходимо войти в систему" };
    }

    if (!publicIds.length) {
      return { success: true, likedIds: [] };
    }

    await connectDB();
    const userId = new mongoose.Types.ObjectId(user.id);
    const bulkOps = publicIds.map((entityPublicId) => ({
      updateOne: {
        filter: { user: userId, entityType, entityPublicId },
        update: { $setOnInsert: { user: userId, entityType, entityPublicId } },
        upsert: true,
      },
    }));

    await AdLike.bulkWrite(bulkOps);

    const docs = await AdLike.find({ user: userId, entityType })
      .select("entityPublicId")
      .lean();
    const likedIds = docs.map((d) => d.entityPublicId);

    return { success: true, likedIds };
  } catch (error) {
    console.error("Error merging guest likes:", error);
    return { success: false, error: "Не удалось синхронизировать избранное" };
  }
}
