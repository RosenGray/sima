const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

const MONGO_URI = 'mongodb://localhost:30016/sima';

async function insertBatches() {
  const client = new MongoClient(MONGO_URI);
  
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully\n');
    
    const db = client.db('sima');
    const collection = db.collection('professionalservices');
    
    let totalInserted = 0;
    
    // Insert all 20 batches
    for (let i = 0; i < 20; i++) {
      console.log(`Processing batch ${i}...`);
      
      // Read the batch
      const batchPath = `/tmp/batch_${i}_final.json`;
      const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));
      
      // Convert $oid format to ObjectId instances
      const documents = batchData.map(doc => ({
        publicId: doc.publicId,
        user: new ObjectId(doc.user.$oid),
        category: new ObjectId(doc.category.$oid),
        subCategory: new ObjectId(doc.subCategory.$oid),
        district: doc.district,
        city: doc.city,
        description: doc.description,
        email: doc.email,
        phoneNumber: doc.phoneNumber,
        acceptTerms: doc.acceptTerms,
        images: doc.images
      }));
      
      // Insert the batch
      const result = await collection.insertMany(documents);
      totalInserted += result.insertedCount;
      
      console.log(`  ✓ Inserted ${result.insertedCount} documents (Total: ${totalInserted}/1000)\n`);
    }
    
    console.log('========================================');
    console.log(`SUCCESS: Inserted ${totalInserted} documents total`);
    console.log('========================================\n');
    
    // Verify the data
    console.log('Verifying insertion...');
    const totalCount = await collection.countDocuments();
    console.log(`Total documents in collection: ${totalCount}`);
    
    // Check real user documents
    const realUserCount = await collection.countDocuments({ 
      user: new ObjectId("68ee539a6c41f6c3edf447e6") 
    });
    console.log(`Documents with real user ID: ${realUserCount} (expected: 50)`);
    
    // Check last batch (district should be d7 - "All")
    const lastBatchSample = await collection.find({ district: "d7" }).limit(5).toArray();
    console.log(`\nSample from last batch (district "All"): ${lastBatchSample.length} found`);
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

insertBatches();
