const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:30016/';
const DB_NAME = 'sima';
const COLLECTION_NAME = 'jobs';

// Districts from the code (cycling through: South, North, Heifa, Jerusalem, Center, TelAviv)
// Based on enum: North = "d1", South = "d2", Center = "d3", Heifa = "d4", Jerusalem = "d5", TelAviv = "d6"
const districts = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']; // North, South, Center, Heifa, Jerusalem, TelAviv

// District to cities mapping (based on lib/cities/index.ts)
const districtCities = {
  'd1': ['c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29'], // North
  'd2': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'], // South
  'd3': ['c44', 'c45', 'c46', 'c47', 'c48', 'c49', 'c50', 'c51', 'c52', 'c53', 'c54', 'c55', 'c56', 'c57', 'c58', 'c59', 'c60', 'c61', 'c62', 'c63', 'c64'], // Center
  'd4': ['c30', 'c31', 'c32', 'c33', 'c34', 'c35', 'c36', 'c37', 'c38', 'c39', 'c40', 'c41'], // Heifa
  'd5': ['c42', 'c43'], // Jerusalem
  'd6': ['c65', 'c66', 'c67', 'c68', 'c69', 'c70', 'c71', 'c72', 'c73', 'c74'] // TelAviv
};

// Example images structure from existing job document (copied exactly, MongoDB will auto-generate _id for subdocuments)
const exampleImages = [
  {
    originalName: "1.jpeg",
    uniqueName: "1769609677650-evfojd8ayld.jpeg",
    url: "https://f003.backblazeb2.com/file/sima-board-public-dev/jobs/6979cb965df34ed3a9cdf1d8/1769609677650-evfojd8ayld.jpeg",
    fieldname: "files",
    versionId: "4_z340ffe562965213b964d0b14_f1015cb2aae237867_d20260128_m141438_c003_v0312032_t0039_u01769609678101",
    folderName: "jobs"
  },
  {
    originalName: "2mb-jpg-example-file.jpg",
    uniqueName: "1769609677651-87wgzocdsmd.jpg",
    url: "https://f003.backblazeb2.com/file/sima-board-public-dev/jobs/6979cb965df34ed3a9cdf1d8/1769609677651-87wgzocdsmd.jpg",
    fieldname: "files",
    versionId: "4_z340ffe562965213b964d0b14_f1045dec521341afa_d20260128_m141438_c003_v0312031_t0009_u01769609678088",
    folderName: "jobs"
  }
];

// Generate random 10-character publicId
function generatePublicId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate phone number (10 digits, format: 0501234567)
function generatePhoneNumber() {
  const prefixes = ['050', '051', '052', '053', '054', '055', '056', '057', '058', '059'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(1000000 + Math.random() * 9000000).toString();
  return prefix + number;
}

// Generate lorem ipsum description
function generateDescription() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
}

// Real users from database
const users = [
  {
    _id: new ObjectId('6979cb965df34ed3a9cdf1d8'),
    firstName: 'Vladislav',
    lastName: 'Iokhim',
    email: 'vladonchik@gmail.com'
  },
  {
    _id: new ObjectId('6979cc6c5df34ed3a9cdf1f0'),
    firstName: 'Mark',
    lastName: 'Idel',
    email: 'vladi_iokhim@icloud.com'
  }
];

async function populateDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const documents = [];
    const ADS_PER_USER = 100;
    
    // Generate documents for each user
    users.forEach((user, userIndex) => {
      // Generate phone number for this user (same for all their ads)
      const phoneNumber = generatePhoneNumber();
      
      // Generate 100 ads for this user
      for (let i = 0; i < ADS_PER_USER; i++) {
        // Every 10 ads share the same district/city
        const groupIndex = Math.floor(i / 10);
        const districtIndex = groupIndex % 6; // Cycle through 6 districts
        const district = districts[districtIndex];
        
        // Pick a random city from the district's city list
        const cityList = districtCities[district];
        const city = cityList[Math.floor(Math.random() * cityList.length)];
        
        // Generate document
        documents.push({
          _id: new ObjectId(),
          publicId: generatePublicId(),
          user: user._id,
          title: `Job Title ${i + 1}`,
          district: district,
          city: city,
          description: generateDescription(),
          contactName: `${user.firstName} ${user.lastName}`,
          contactPrimaryPhone: phoneNumber,
          contactEmail: user.email,
          acceptTerms: true,
          images: exampleImages, // Same images array for all documents
          createdAt: new Date(),
          updatedAt: new Date(),
          __v: 0
        });
      }
      
      console.log(`Generated ${ADS_PER_USER} documents for user ${user.firstName} ${user.lastName}`);
    });
    
    // Insert in batches of 50 to avoid memory issues
    console.log(`\nTotal documents to insert: ${documents.length}`);
    console.log('Starting insertion...\n');
    
    const batchSize = 50;
    let inserted = 0;
    
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      const result = await collection.insertMany(batch);
      inserted += result.insertedCount;
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}: ${result.insertedCount} documents (Total: ${inserted}/${documents.length})`);
    }
    
    console.log(`\n✅ Successfully inserted ${inserted} documents!`);
    
    // Verify counts
    console.log('\nVerifying insertion...');
    const user1Count = await collection.countDocuments({ 
      user: users[0]._id 
    });
    const user2Count = await collection.countDocuments({ 
      user: users[1]._id 
    });
    const totalCount = await collection.countDocuments({});
    
    console.log(`User 1 (${users[0].firstName} ${users[0].lastName}): ${user1Count} ads`);
    console.log(`User 2 (${users[1].firstName} ${users[1].lastName}): ${user2Count} ads`);
    console.log(`Total jobs in collection: ${totalCount}`);
    
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

populateDatabase().catch(console.error);
