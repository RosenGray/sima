import mongoose from "mongoose";
import connectDB from "@/lib/mongo/mongodb";

const RATE_LIMITS_COLLECTION = "rate_limits";
const TTL_SECONDS = 86400; // 24 hours — docs older than this are removed by TTL index on windowStart

export interface RateLimitOptions {
  key: string;
  action: string;
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function checkRateLimit({
  key,
  action,
  limit,
  windowSeconds,
}: RateLimitOptions): Promise<RateLimitResult> {
  await connectDB();
  const collection = mongoose.connection.collection(RATE_LIMITS_COLLECTION);

  const minWindowStart = new Date(Date.now() - windowSeconds * 1000);

  const result = await collection.findOneAndUpdate(
    {
      key,
      action,
      windowStart: { $gte: minWindowStart },
    },
    {
      $inc: { count: 1 },
      $setOnInsert: { windowStart: new Date() },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  const count = result?.count ?? 1;

  if (count > limit) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: limit - count };
}

/**
 * Creates TTL index on windowStart so documents are removed after TTL_SECONDS.
 * Run once per environment.
 */
export async function ensureRateLimitIndex(): Promise<void> {
  await connectDB();
  const collection = mongoose.connection.collection(RATE_LIMITS_COLLECTION);
  await collection.createIndex(
    { windowStart: 1 },
    { expireAfterSeconds: TTL_SECONDS }
  );
}
