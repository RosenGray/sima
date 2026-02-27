import mongoose from "mongoose";
import connectDB from "@/lib/mongo/mongodb";

const RATE_LIMITS_COLLECTION = "rate_limits";
const TTL_CLEANUP_SECONDS = 60 * 60 * 24 * 7; // 7 days - just garbage collection 
let indexEnsured = false;

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

  if (!indexEnsured) {
    await collection.createIndex(
      { windowStart: 1 },
      { expireAfterSeconds: TTL_CLEANUP_SECONDS, background: true },
    );
    indexEnsured = true;
    console.log("✓ rate_limits TTL index ensured");
  }else{
    console.log("✓ rate_limits TTL index already ensured");
  }

  const windowStart = new Date(Date.now() - windowSeconds * 1000);

  // First check current count without incrementing
  const existing = await collection.findOne({
    key,
    action,
    windowStart: { $gte: windowStart },
  });

  if (existing && existing.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  // Only increment if allowed
  const result = await collection.findOneAndUpdate(
    {
      key,
      action,
      windowStart: { $gte: windowStart },
    },
    {
      $inc: { count: 1 },
      $setOnInsert: {
        windowStart: new Date(),
        windowSeconds,
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    },
  );

  const count = result?.count ?? 1;

  return { allowed: true, remaining: limit - count };
}