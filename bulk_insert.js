const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

async function bulkInsert() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('MONGODB_URI environment variable not set');
    console.log('\nPlease run with: MONGODB_URI="your-connection-string" node bulk_insert.js');
    process.exit(1);
  }

  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB\n');
    
    const database = client.db('sima');
    const collection = database.collection('professionalservices');
    
    // Read all documents
    const allDocs = JSON.parse(fs.readFileSync('all_documents.json', 'utf8'));
    console.log(`Read ${allDocs.length} documents from all_documents.json`);
    
    // Convert $oid format to ObjectId
    const documents = allDocs.map(doc => ({
      ...doc,
      user: new ObjectId(doc.user.$oid),
      category: new ObjectId(doc.category.$oid),
      subCategory: new ObjectId(doc.subCategory.$oid)
    }));
    
    console.log('Inserting documents...');
    const result = await collection.insertMany(documents, { ordered: false });
    console.log(`\n✓ Successfully inserted ${result.insertedCount} documents!`);
    
    // Verify
    const count = await collection.countDocuments();
    console.log(`Total documents in collection: ${count}`);
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

bulkInsert();

