/**
 * One-time setup: create TTL index on rate_limits.windowStart so old entries
 * are automatically removed after 24 hours.
 *
 * Run once per environment from client/: node scripts/ensure-rate-limit-index.js
 * Requires: MONGODB_URI or MONGO_URI, or DB_USERNAME/DB_PASSWORD with NODE_ENV=production.
 */

const mongoose = require("mongoose");

const RATE_LIMITS_COLLECTION = "rate_limits";
const EXPIRE_AFTER_SECONDS = 86400; // 24 hours

async function main() {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === "production"
      ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@simacluster.iwsya.mongodb.net/sima`
      : "mongodb://localhost:30016/sima");

  if (!uri) {
    console.error(
      "Set MONGODB_URI, MONGO_URI, or DB_USERNAME/DB_PASSWORD (and NODE_ENV=production)."
    );
    process.exit(1);
  }

  await mongoose.connect(uri);
  const coll = mongoose.connection.collection(RATE_LIMITS_COLLECTION);

  const indexes = await coll.indexes();
  const hasTtl = indexes.some(
    (idx) => idx.key && idx.key.windowStart === 1 && idx.expireAfterSeconds
  );

  if (hasTtl) {
    console.log("rate_limits TTL index on windowStart already exists.");
  } else {
    await coll.createIndex(
      { windowStart: 1 },
      { expireAfterSeconds: EXPIRE_AFTER_SECONDS }
    );
    console.log(
      "Created rate_limits TTL index on windowStart (expireAfterSeconds:",
      EXPIRE_AFTER_SECONDS,
      ")."
    );
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
