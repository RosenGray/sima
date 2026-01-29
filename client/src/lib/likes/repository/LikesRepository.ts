import connectDB from "@/lib/mongo/mongodb";
import { AdLike } from "../models/AdLike";
import mongoose from "mongoose";

/**
 * Returns liked ad public IDs grouped by entity type for a given user.
 * Used in layout to hydrate LikesProvider for authenticated users.
 */
export async function getLikedAdIdsByUser(
  userId: string
): Promise<Record<string, string[]>> {
  await connectDB();

  const docs = await AdLike.find({ user: new mongoose.Types.ObjectId(userId) })
    .select("entityType entityPublicId")
    .lean();

  const result: Record<string, string[]> = {};
  for (const doc of docs) {
    const type = doc.entityType as string;
    if (!result[type]) result[type] = [];
    result[type].push(doc.entityPublicId);
  }
  return result;
}
