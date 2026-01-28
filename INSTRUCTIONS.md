# Instructions to Insert 1000 Professional Services

I've generated 1000 professional service documents according to your specifications.  The data is ready in `all_documents.json`.

## Option 1: Using Node.js Script (Recommended)

Run the bulk insert script:

```bash
cd /Users/vladislaviokhim/Desktop/archive/sima
MONGODB_URI="your-mongodb-connection-string-here" node bulk_insert.js
```

Replace `your-mongodb-connection-string-here` with your actual MongoDB connection string.

## Option 2: Using mongoimport

First, convert the extended JSON format:

```bash
cd /Users/vladislaviokhim/Desktop/archive/sima
node -e "
const fs = require('fs');
const docs = JSON.parse(fs.readFileSync('all_documents.json', 'utf8'));
const ndjson = docs.map(d => JSON.stringify(d)).join('\n');
fs.writeFileSync('import.ndjson', ndjson);
"
```

Then import:

```bash
mongoimport --uri="your-mongodb-connection-string" --db=sima --collection=professionalservices --file=import.ndjson
```

## Data Summary

- **Total documents**: 1000
- **Groups**: 20 groups of 50 documents each
- **First group** (items 1-50):
  - User: ObjectId(68ee539a6c41f6c3edf447e6) - YOUR REAL USER
  - Email: vladonchik@gmail.com
  - District: South
  - Category: ConstructionRepair
  
- **Remaining groups** (items 51-1000):
  - Each group has 50 items
  - Each group has a unique generated user ID (ObjectId)
  - Each group has unique email, phone number
  - Districts cycle through: South, North, Heifa, Jerusalem, Center, TelAviv
  - Last group (951-1000) has district "All"
  - Categories and subcategories properly matched
  - Cities properly matched to their districts

## Files Generated

- `all_documents.json` - All 1000 documents
- `batch_1.json` through `batch_10.json` - Original generation batches  
- `insert_batch_1.json` through `insert_batch_10.json` - Formatted for insertion
- `bulk_insert.js` - Node.js insertion script

