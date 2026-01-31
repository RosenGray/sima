/**
 * One-time migration: fix chat duplicate-key (E11000) for multiple users messaging same ad.
 *
 * 1. Drop old unique index on (participants, adSnapshot.entityType, adSnapshot.entityPublicId).
 *    MongoDB multikey index on participants made (owner + ad) unique per participant,
 *    so owner+user3 failed when owner+user2 already existed.
 *
 * 2. Backfill conversationKey for existing conversations (sorted participant IDs + entityType + entityPublicId).
 *
 * Run once from client/: node scripts/drop-conversations-old-index.js
 * Requires: MONGODB_URI or MONGO_URI, or DB_USERNAME/DB_PASSWORD with NODE_ENV=production.
 */

const mongoose = require("mongoose");

const OLD_INDEX_NAME = "participants_1_adSnapshot.entityType_1_adSnapshot.entityPublicId_1";

function buildConversationKey(participants, entityType, entityPublicId) {
  const sorted = participants.map((p) => p.toString()).sort();
  return `${sorted[0]}_${sorted[1]}_${entityType}_${entityPublicId}`;
}

async function main() {
  const uri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    (process.env.NODE_ENV === "production"
      ? `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@simacluster.iwsya.mongodb.net/sima`
      : "mongodb://localhost:30016/sima");

  if (!uri) {
    console.error("Set MONGODB_URI, MONGO_URI, or DB_USERNAME/DB_PASSWORD (and NODE_ENV=production).");
    process.exit(1);
  }

  await mongoose.connect(uri);
  const coll = mongoose.connection.collection("conversations");

  // 1. Drop old index if present
  const indexes = await coll.indexes();
  const hasOld = indexes.some((idx) => idx.name === OLD_INDEX_NAME);
  if (hasOld) {
    await coll.dropIndex(OLD_INDEX_NAME);
    console.log("Dropped index:", OLD_INDEX_NAME);
  } else {
    console.log("Old index already removed.");
  }

  // 2. Backfill conversationKey for docs that don't have it
  const cursor = coll.find({ conversationKey: { $exists: false } });
  let backfilled = 0;
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc || !doc.participants || !doc.adSnapshot) continue;
    const key = buildConversationKey(
      doc.participants,
      doc.adSnapshot.entityType,
      doc.adSnapshot.entityPublicId
    );
    await coll.updateOne({ _id: doc._id }, { $set: { conversationKey: key } });
    backfilled++;
  }
  if (backfilled > 0) console.log("Backfilled conversationKey for", backfilled, "conversation(s).");

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
