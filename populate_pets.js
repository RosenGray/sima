/**
 * Populate pets collections: PetForSale, PetForFree, PetAccessory
 * - 2 users × 100 ads × 3 collections = 600 documents
 * - Every 10 ads: same district, city, animal, kind, adjustments
 * - Accessories: title "title 1", "title 2", ... ; price different every 10 ads
 */

const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URI = "mongodb://localhost:30016/";
const DB_NAME = "sima";
const ADS_PER_USER = 100;
const GROUP_SIZE = 10;

// Districts from lib/cities/types/cities.schema (exclude All)
const DISTRICT_IDS = ["d1", "d2", "d3", "d4", "d5", "d6"]; // North, South, Center, Heifa, Jerusalem, TelAviv

const DISTRICT_CITIES = {
  d1: ["c12", "c13", "c14", "c15", "c16", "c17", "c18", "c19", "c20", "c21", "c22", "c23", "c24", "c25", "c26", "c27", "c28", "c29"],
  d2: ["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12"],
  d3: ["c44", "c45", "c46", "c47", "c48", "c49", "c50", "c51", "c52", "c53", "c54", "c55", "c56", "c57", "c58", "c59", "c60", "c61", "c62", "c63", "c64"],
  d4: ["c30", "c31", "c32", "c33", "c34", "c35", "c36", "c37", "c38", "c39", "c40", "c41"],
  d5: ["c42", "c43"],
  d6: ["c65", "c66", "c67", "c68", "c69", "c70", "c71", "c72", "c73", "c74"],
};

// Animals and kinds from lib/pets/animals/data.ts (animal id -> kinds)
const ANIMAL_KINDS = [
  { animal: "dog", kind: "labrador" },
  { animal: "dog", kind: "german-shepherd" },
  { animal: "cat", kind: "persian" },
  { animal: "cat", kind: "siamese" },
  { animal: "bird", kind: "parrot" },
  { animal: "bird", kind: "canary" },
  { animal: "rabbit", kind: "holland-lop" },
  { animal: "rabbit", kind: "mini-rex" },
  { animal: "hamster", kind: "syrian" },
  { animal: "hamster", kind: "roborovski" },
];

// PetAdjustments 1-9
const ADJUSTMENTS_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// PetGender 1, 2
const GENDER_VALUES = [1, 2];
// PetAge 1, 2, 3, 4
const AGE_VALUES = [1, 2, 3, 4];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function generatePublicId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generatePhoneNumber() {
  const prefixes = ["050", "051", "052", "053", "054"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000).toString();
  return prefix + number;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomSubset(arr, maxLen) {
  const len = Math.min(1 + Math.floor(Math.random() * maxLen), arr.length);
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, len);
}

// Clone images and assign new _id for each (MongoDB subdocuments)
function cloneImages(images) {
  return images.map((img) => ({
    _id: new ObjectId(),
    originalName: img.originalName,
    uniqueName: img.uniqueName,
    url: img.url,
    fieldname: img.fieldname || "images",
    versionId: img.versionId || "",
    folderName: img.folderName || "pets",
  }));
}

// Fallback if no existing doc has images
const FALLBACK_IMAGES = [
  {
    originalName: "pet.jpeg",
    uniqueName: "pet-placeholder.jpeg",
    url: "https://f003.backblazeb2.com/file/sima-board-public-dev/pets/placeholder.jpeg",
    fieldname: "images",
    versionId: "",
    folderName: "pets",
  },
];

async function getUsersAndSampleImages(client) {
  const db = client.db(DB_NAME);
  const usersCol = db.collection("users");
  const users = await usersCol.find({}).limit(2).toArray();
  if (users.length < 2) {
    throw new Error("Need at least 2 users in users collection");
  }

  let saleImages = FALLBACK_IMAGES;
  let freeImages = FALLBACK_IMAGES;
  let accessoryImages = FALLBACK_IMAGES;

  const saleDoc = await db.collection("petforsales").findOne({});
  if (saleDoc && saleDoc.images && saleDoc.images.length > 0) {
    saleImages = saleDoc.images;
  }
  const freeDoc = await db.collection("petforfrees").findOne({});
  if (freeDoc && freeDoc.images && freeDoc.images.length > 0) {
    freeImages = freeDoc.images;
  }
  const accDoc = await db.collection("petaccessories").findOne({});
  if (accDoc && accDoc.images && accDoc.images.length > 0) {
    accessoryImages = accDoc.images;
  }

  return {
    users: users.map((u) => {
      const phone = u.phoneNumber || u.contactPrimaryPhone || generatePhoneNumber();
      return {
        _id: u._id,
        email: u.email,
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        contactName: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Contact",
        phoneNumber: phone,
      };
    }),
    saleImages,
    freeImages,
    accessoryImages,
  };
}

function buildPetForSaleDocs(users, saleImages, publicIdSet) {
  const docs = [];
  for (const user of users) {
    for (let i = 0; i < ADS_PER_USER; i++) {
      const groupIndex = Math.floor(i / GROUP_SIZE);
      const districtIndex = groupIndex % DISTRICT_IDS.length;
      const district = DISTRICT_IDS[districtIndex];
      const cities = DISTRICT_CITIES[district];
      const city = cities[groupIndex % cities.length] || cities[0];
      const animalKind = ANIMAL_KINDS[groupIndex % ANIMAL_KINDS.length];
      const adjustments = pickRandomSubset(ADJUSTMENTS_VALUES, 4);

      let publicId = generatePublicId();
      while (publicIdSet.has(publicId)) publicId = generatePublicId();
      publicIdSet.add(publicId);

      docs.push({
        _id: new ObjectId(),
        publicId,
        user: user._id,
        animal: animalKind.animal,
        kind: animalKind.kind,
        price: 500 + Math.floor(Math.random() * 4500),
        gender: pickRandom(GENDER_VALUES),
        age: pickRandom(AGE_VALUES),
        adjustments,
        description: LOREM,
        district,
        city,
        contactName: user.contactName,
        contactPrimaryPhone: user.phoneNumber,
        contactSecondaryPhone: undefined,
        contactEmail: user.email,
        acceptTerms: true,
        images: cloneImages(saleImages),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  return docs;
}

function buildPetForFreeDocs(users, freeImages, publicIdSet) {
  const docs = [];
  for (const user of users) {
    for (let i = 0; i < ADS_PER_USER; i++) {
      const groupIndex = Math.floor(i / GROUP_SIZE);
      const districtIndex = groupIndex % DISTRICT_IDS.length;
      const district = DISTRICT_IDS[districtIndex];
      const cities = DISTRICT_CITIES[district];
      const city = cities[groupIndex % cities.length] || cities[0];
      const animalKind = ANIMAL_KINDS[groupIndex % ANIMAL_KINDS.length];
      const adjustments = pickRandomSubset(ADJUSTMENTS_VALUES, 4);

      let publicId = generatePublicId();
      while (publicIdSet.has(publicId)) publicId = generatePublicId();
      publicIdSet.add(publicId);

      docs.push({
        _id: new ObjectId(),
        publicId,
        user: user._id,
        animal: animalKind.animal,
        kind: animalKind.kind,
        gender: pickRandom(GENDER_VALUES),
        age: pickRandom(AGE_VALUES),
        adjustments,
        description: LOREM,
        district,
        city,
        contactName: user.contactName,
        contactPrimaryPhone: user.phoneNumber,
        contactSecondaryPhone: undefined,
        contactEmail: user.email,
        acceptTerms: true,
        images: cloneImages(freeImages),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  return docs;
}

function buildPetAccessoryDocs(users, accessoryImages, publicIdSet) {
  const docs = [];
  let globalIndex = 0;
  for (const user of users) {
    for (let i = 0; i < ADS_PER_USER; i++) {
      const groupIndex = Math.floor(i / GROUP_SIZE);
      const districtIndex = groupIndex % DISTRICT_IDS.length;
      const district = DISTRICT_IDS[districtIndex];
      const cities = DISTRICT_CITIES[district];
      const city = cities[groupIndex % cities.length] || cities[0];
      const animalKind = ANIMAL_KINDS[groupIndex % ANIMAL_KINDS.length];
      const adjustments = pickRandomSubset(ADJUSTMENTS_VALUES, 4);

      let publicId = generatePublicId();
      while (publicIdSet.has(publicId)) publicId = generatePublicId();
      publicIdSet.add(publicId);

      globalIndex += 1;
      const title = `title ${globalIndex}`;
      const priceForGroup = 50 + groupIndex * 100 + Math.floor(Math.random() * 80);

      docs.push({
        _id: new ObjectId(),
        publicId,
        user: user._id,
        animal: animalKind.animal,
        kind: animalKind.kind,
        title,
        price: priceForGroup,
        description: LOREM,
        district,
        city,
        contactName: user.contactName,
        contactPrimaryPhone: user.phoneNumber,
        contactSecondaryPhone: undefined,
        contactEmail: user.email,
        acceptTerms: true,
        images: cloneImages(accessoryImages),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  return docs;
}

async function run() {
  const client = new MongoClient(MONGODB_URI);
  const publicIdSet = new Set();

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const { users, saleImages, freeImages, accessoryImages } =
      await getUsersAndSampleImages(client);
    console.log("Users:", users.length, "Sample images loaded");

    const db = client.db(DB_NAME);

    const saleDocs = buildPetForSaleDocs(users, saleImages, publicIdSet);
    const freeDocs = buildPetForFreeDocs(users, freeImages, publicIdSet);
    const accDocs = buildPetAccessoryDocs(users, accessoryImages, publicIdSet);

    const BATCH = 50;

    for (let i = 0; i < saleDocs.length; i += BATCH) {
      const batch = saleDocs.slice(i, i + BATCH);
      await db.collection("petforsales").insertMany(batch);
      console.log(`PetForSale: inserted ${i + batch.length}/${saleDocs.length}`);
    }
    for (let i = 0; i < freeDocs.length; i += BATCH) {
      const batch = freeDocs.slice(i, i + BATCH);
      await db.collection("petforfrees").insertMany(batch);
      console.log(`PetForFree: inserted ${i + batch.length}/${freeDocs.length}`);
    }
    for (let i = 0; i < accDocs.length; i += BATCH) {
      const batch = accDocs.slice(i, i + BATCH);
      await db.collection("petaccessories").insertMany(batch);
      console.log(`PetAccessory: inserted ${i + batch.length}/${accDocs.length}`);
    }

    const saleCount = await db.collection("petforsales").countDocuments();
    const freeCount = await db.collection("petforfrees").countDocuments();
    const accCount = await db.collection("petaccessories").countDocuments();
    console.log("\nDone. Counts:");
    console.log("  petforsales:", saleCount);
    console.log("  petforfrees:", freeCount);
    console.log("  petaccessories:", accCount);
    console.log("  Total:", saleCount + freeCount + accCount);
  } finally {
    await client.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
