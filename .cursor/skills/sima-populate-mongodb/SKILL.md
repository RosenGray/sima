git st---
name: sima-populate-mongodb
description: Populate MongoDB collections with test data for development and testing. Generates bulk documents following entity schemas, handles ObjectIds, references, enums, and field types. Use when populating collections with test data, creating seed data, or generating bulk documents for testing.
---

# Populate MongoDB Collections with Test Data

## Overview

This skill guides you through populating MongoDB collections with test data. It handles different entity schemas, generates proper ObjectIds, manages references, and creates realistic test data following the project's patterns.

## Workflow

### Step 1: Understand the Schema

1. **Identify the collection** to populate (e.g., `professionalservices`, `cars`, `petsforsale`)
2. **Read the Mongoose model** from `lib/{section}/{category}/models/{Entity}.ts`
3. **Identify field types**:
   - ObjectId references (user, category, subCategory, etc.)
   - Enums (districts, categories, statuses)
   - Arrays (images, adjustments, features)
   - Primitives (strings, numbers, booleans)
   - Dates (createdAt, updatedAt)

### Step 2: Gather Required Data

Query existing collections for reference data:

```javascript
// Users collection
const users = await collection.find({}).limit(10).toArray();

// Categories (if applicable)
const categories = await collection.find({}).toArray();

// Subcategories (if applicable) 
const subcategories = await collection.find({}).toArray();
```

**Common reference collections:**
- `users` - For `user` field
- `{entity}categories` - For category references
- `{entity}subcategories` - For subcategory references
- Existing documents - For copying image arrays, contact info patterns

### Step 3: Understand Field Requirements

For each field, determine:

| Field Type | Generation Strategy |
|------------|---------------------|
| `_id` | Generate new ObjectId: `crypto.randomBytes(12).toString('hex')` |
| `publicId` | Generate random string: 10 alphanumeric characters |
| `user` | Use real user ObjectId from users collection |
| `category` / `subCategory` | Use real ObjectIds from respective collections |
| `district` | Use enum values from code: `d1`, `d2`, `d3`, `d4`, `d5`, `d6` (exclude `all`) |
| `city` | Use city IDs from code matching the district |
| `description` | Use "Lorem ipsum..." or copy from existing document |
| `email` | Use real user email from users collection |
| `phoneNumber` | Use real user phone from users collection |
| `contactEmail` | Use real user email |
| `contactPrimaryPhone` | Use real user phone |
| `acceptTerms` | Always `true` |
| `images` | Copy image array from existing document (generate new `_id` for each image) |
| `price` | Generate random number within reasonable range (if needed) |
| `createdAt` / `updatedAt` | Use `new Date()` |

### Step 4: Create Distribution Pattern

**Pattern: Group by combinations**

- Every N ads share the same category/subcategory/district/city combination
- Example: 100 ads per user = 10 groups × 10 ads each
- Each group uses a different category/subcategory/district/city combination

```javascript
const categorySubcategoryPairs = [
  { categoryId: '...', subCategoryId: '...' },
  // ... 10 pairs
];

const districtCityPairs = [
  { district: 'd1', city: 'c13' },
  // ... 10 pairs
];

// For each user
for (let i = 0; i < 100; i++) {
  const groupIndex = Math.floor(i / 10);
  const categoryPair = categorySubcategoryPairs[groupIndex];
  const locationPair = districtCityPairs[groupIndex];
  // Create document with this combination
}
```

### Step 5: Generate Documents

Create a Node.js script to generate documents:

```javascript
const crypto = require('crypto');
const fs = require('fs');

// Helper functions
function generateObjectId() {
  return crypto.randomBytes(12).toString('hex');
}

function generatePublicId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Users data (from MongoDB query)
const users = [
  {
    _id: '...',
    email: '...',
    phoneNumber: '...',
    // Copy images from existing document
    images: [...]
  }
];

// Generate documents
const allDocuments = [];

users.forEach((user) => {
  for (let i = 0; i < TARGET_COUNT_PER_USER; i++) {
    const groupIndex = Math.floor(i / GROUP_SIZE);
    
    // Generate new ObjectIds for nested images
    const images = user.images.map(img => ({
      ...img,
      _id: generateObjectId()
    }));
    
    const doc = {
      _id: generateObjectId(),
      publicId: generatePublicId(),
      user: user._id,
      category: categoryPairs[groupIndex].categoryId,
      subCategory: categoryPairs[groupIndex].subCategoryId,
      district: locationPairs[groupIndex].district,
      city: locationPairs[groupIndex].city,
      description: 'Lorem ipsum...',
      email: user.email,
      phoneNumber: user.phoneNumber,
      acceptTerms: true,
      images: images,
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    };
    
    allDocuments.push(doc);
  }
});

// Save to file
fs.writeFileSync('/tmp/documents.json', JSON.stringify(allDocuments, null, 2));
```

### Step 6: Insert into MongoDB

Create insertion script using MongoDB driver:

```javascript
const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');

const MONGODB_URI = 'mongodb://localhost:30016/';
const DB_NAME = 'sima';
const COLLECTION_NAME = '{collectionName}';

async function insertDocuments() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const docs = JSON.parse(fs.readFileSync('/tmp/documents.json', 'utf8'));
    
    // Convert string IDs to ObjectIds
    const processedDocs = docs.map(doc => ({
      _id: new ObjectId(doc._id),
      publicId: doc.publicId,
      user: new ObjectId(doc.user),
      category: new ObjectId(doc.category),
      subCategory: new ObjectId(doc.subCategory),
      // ... other fields
      images: doc.images.map(img => ({
        ...img,
        _id: new ObjectId(img._id)
      })),
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      __v: doc.__v
    }));
    
    // Insert in batches of 50
    const batchSize = 50;
    let inserted = 0;
    
    for (let i = 0; i < processedDocs.length; i += batchSize) {
      const batch = processedDocs.slice(i, i + batchSize);
      const result = await collection.insertMany(batch);
      inserted += result.insertedCount;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${result.insertedCount} documents`);
    }
    
    console.log(`Successfully inserted ${inserted} documents!`);
    
  } finally {
    await client.close();
  }
}

insertDocuments().catch(console.error);
```

### Step 7: Verify Results

```javascript
const user1Count = await collection.countDocuments({ 
  user: new ObjectId('user1Id') 
});
const user2Count = await collection.countDocuments({ 
  user: new ObjectId('user2Id') 
});

console.log('User 1:', user1Count, 'ads');
console.log('User 2:', user2Count, 'ads');
console.log('Total:', user1Count + user2Count, 'ads');
```

## Field Type Patterns

### ObjectId References

```javascript
// In generation script (strings)
user: user._id,
category: categoryPair.categoryId,

// In insertion script (ObjectIds)
user: new ObjectId(doc.user),
category: new ObjectId(doc.category),
```

### Nested ObjectIds (Images)

```javascript
// Generate new ObjectId for each image
const images = user.images.map(img => ({
  ...img,
  _id: generateObjectId()  // New ObjectId for each image
}));

// Convert in insertion
images: doc.images.map(img => ({
  ...img,
  _id: new ObjectId(img._id)
}))
```

### Enums from Code

**Districts and Cities:**
- Read from `lib/cities/index.ts` or `lib/cities/types/cities.schema.ts`
- Districts: `d1` (North), `d2` (South), `d3` (Center), `d4` (Heifa), `d5` (Jerusalem), `d6` (TelAviv)
- Cities: Match city IDs to districts (e.g., `c13` for North, `c1` for South)

**Category Enums:**
- Read from model schema or types file
- Use actual enum values, not arbitrary strings

### Arrays

```javascript
// Copy array structure from existing document
images: existingDoc.images.map(img => ({
  ...img,
  _id: generateObjectId()  // Generate new _id
}))

// For numeric enum arrays (e.g., adjustments)
adjustments: [1, 3, 5]  // Use actual enum numeric values
```

## Common Schema Variations

### Standard Ad Pattern
- `price` (number, required)
- `contactName`, `contactPrimaryPhone`, `contactEmail` (required)
- `contactSecondaryPhone` (optional)
- `images` (array, required)

### Service Pattern (Professional Services)
- No `price` field
- `email`, `phoneNumber` (direct fields, not contact*)
- `category`, `subCategory` (ObjectId references)
- `images` (array, required)

### Real Estate Pattern
- `price` (number, required)
- `squaremeter`, `floor`, `totalflors` (numbers)
- `parking`, `furniture` (enums as numbers)
- `additionalFeatures` (array of numbers)
- `year`, `month`, `day` (date components)
- `entryDate` (enum)

## Best Practices

1. **Always use real ObjectIds** from existing collections for references
2. **Generate new ObjectIds** for `_id` and nested document `_id` fields
3. **Copy image arrays** from existing documents (generate new `_id` for each image)
4. **Use real user data** (email, phone) from users collection
5. **Follow distribution pattern** (group by category/location combinations)
6. **Insert in batches** (50 documents per batch) to avoid timeouts
7. **Verify counts** after insertion to confirm success
8. **Clean up temporary files** after completion

## Example: Professional Services

```javascript
// 1. Query users and existing documents
const users = await usersCollection.find({}).limit(2).toArray();
const existingDoc = await professionalservicesCollection.findOne({});

// 2. Query categories and subcategories
const categories = await servicecategoriesCollection.find({}).toArray();
const subcategories = await servicesubcategoriesCollection.find({}).toArray();

// 3. Create pairs (10 groups)
const categorySubcategoryPairs = categories.slice(0, 10).map(cat => ({
  categoryId: cat._id.toString(),
  subCategoryId: subcategories.find(sub => 
    sub.serviceCategory.toString() === cat._id.toString()
  )._id.toString()
}));

// 4. Create district/city pairs
const districtCityPairs = [
  { district: 'd1', city: 'c13' },
  // ... 10 pairs
];

// 5. Generate documents (100 per user)
// 6. Insert in batches
// 7. Verify counts
```

## Troubleshooting

**Error: "unknown operator: $oid"**
- Use `new ObjectId('...')` in MongoDB driver, not `{ $oid: '...' }`

**Error: "duplicate key error"**
- Regenerate `publicId` if it already exists
- Ensure `_id` generation is unique

**Error: "invalid ObjectId"**
- Verify ObjectId strings are 24 hex characters
- Check that reference ObjectIds exist in source collections

**Missing required fields**
- Review schema definition for all required fields
- Ensure all required fields are included in document generation
