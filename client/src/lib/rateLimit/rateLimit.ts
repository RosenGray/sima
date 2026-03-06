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
  console.log("[checkRateLimit] START", { action, limit, windowSeconds });

  console.log("[checkRateLimit] calling connectDB...");
  await connectDB();
  console.log("[checkRateLimit] connectDB done");

  const collection = mongoose.connection.collection(RATE_LIMITS_COLLECTION);
  console.log("[checkRateLimit] got collection");

  if (!indexEnsured) {
    console.log("[checkRateLimit] creating TTL index...");
    await collection.createIndex(
      { windowStart: 1 },
      { expireAfterSeconds: TTL_CLEANUP_SECONDS, background: true },
    );
    indexEnsured = true;
    console.log("[checkRateLimit] ✓ TTL index created");
  } else {
    console.log("[checkRateLimit] ✓ TTL index already ensured");
  }

  const windowStart = new Date(Date.now() - windowSeconds * 1000);
  console.log("[checkRateLimit] checking existing record...");

  const existing = await collection.findOne({
    key,
    action,
    windowStart: { $gte: windowStart },
  });
  console.log("[checkRateLimit] existing record:", existing ? { count: existing.count } : null);

  if (existing && existing.count >= limit) {
    console.log("[checkRateLimit] rate limit exceeded, returning not allowed");
    return { allowed: false, remaining: 0 };
  }

  console.log("[checkRateLimit] calling findOneAndUpdate...");
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
  console.log("[checkRateLimit] findOneAndUpdate done, result count:", result?.count);

  const count = result?.count ?? 1;

  console.log("[checkRateLimit] END, returning allowed:", true, "remaining:", limit - count);
  return { allowed: true, remaining: limit - count };
}