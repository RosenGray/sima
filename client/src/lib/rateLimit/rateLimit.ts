import mongoose from "mongoose";
import connectDB from "@/lib/mongo/mongodb";
import { RateLimitAction } from "@/lib/constants/rateLimitActions";

const RATE_LIMITS_COLLECTION = "rate_limits";
const TTL_CLEANUP_SECONDS = 60 * 60 * 24 * 7; // 7 days - just garbage collection
let indexEnsured = false;

export interface RateLimitOptions {
  key: string;
  action: RateLimitAction;
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt?: Date;
  windowSeconds?: number;
}

export async function checkRateLimit({
  key,
  action,
  limit,
  windowSeconds,
  dryRun = false,
}: RateLimitOptions & { dryRun?: boolean }): Promise<RateLimitResult> {
  await connectDB();

  const collection = mongoose.connection.collection(RATE_LIMITS_COLLECTION);

  if (!indexEnsured) {
    try {
      await collection.createIndex(
        { windowStart: 1 },
        { expireAfterSeconds: TTL_CLEANUP_SECONDS, background: true },
      );
    } catch (e: unknown) {
      const mongoError = e as { code?: number };
      if (mongoError?.code === 85) {
        // IndexOptionsConflict — TTL value changed in code, drop and recreate
        await collection.dropIndex("windowStart_1");
        await collection.createIndex(
          { windowStart: 1 },
          { expireAfterSeconds: TTL_CLEANUP_SECONDS, background: true },
        );
      } else {
        throw e;
      }
    }
    indexEnsured = true;
  }

  const windowStart = new Date(Date.now() - windowSeconds * 1000);

  const existing = await collection.findOne({
    key,
    action,
    windowStart: { $gte: windowStart },
  });

  if (existing && existing.count >= limit) {
    const resetAt = new Date(
      existing.windowStart.getTime() + existing.windowSeconds * 1000
    );
    return { allowed: false, remaining: 0, resetAt, windowSeconds };
  }

  if (dryRun) {
    return { allowed: true, remaining: limit - (existing?.count ?? 0) };
  }

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

export function formatRateLimitError(result: RateLimitResult): string {
  const isDaily = (result.windowSeconds ?? 0) >= 86400;
  const prefix = isDaily
    ? "Превышен дневной лимит публикаций"
    : "Превышен часовой лимит публикаций";

  if (!result.resetAt) return `${prefix}. Попробуйте позже`;
  const msLeft = result.resetAt.getTime() - Date.now();
  if (msLeft <= 0) return `${prefix}. Попробуйте позже`;
  const totalMinutes = Math.ceil(msLeft / 60000);
  if (totalMinutes < 60) {
    return `${prefix}. Попробуйте через ${totalMinutes} мин.`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const timeStr = minutes > 0 ? `${hours} ч. ${minutes} мин.` : `${hours} ч.`;
  return `${prefix}. Попробуйте через ${timeStr}`;
}

/**
 * Checks multiple rate limits. First does a dry-run pass to find the most
 * restrictive blocked limit (latest resetAt) without incrementing any counters.
 * Only increments if all limits are currently passing.
 */
export async function checkRateLimits(
  limits: RateLimitOptions[],
): Promise<RateLimitResult> {
  let mostRestrictive: RateLimitResult | null = null;

  for (const options of limits) {
    const result = await checkRateLimit({ ...options, dryRun: true });
    if (!result.allowed) {
      if (
        !mostRestrictive ||
        (result.resetAt &&
          mostRestrictive.resetAt &&
          result.resetAt > mostRestrictive.resetAt)
      ) {
        mostRestrictive = result;
      }
    }
  }

  if (mostRestrictive) return mostRestrictive;

  for (const options of limits) {
    await checkRateLimit(options);
  }
  return { allowed: true, remaining: 0 };
}
