const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = 'mongodb://localhost:30016/';
const DB_NAME = 'sima';
const COLLECTION_NAME = 'professionalservices';

// Districts from the code (cycling through: South, North, Heifa, Jerusalem, Center, TelAviv, All)
// Based on enum: North = "d1", South = "d2", Center = "d3", Heifa = "d4", Jerusalem = "d5", TelAviv = "d6", All = "all"
const districts = ['d2', 'd1', 'd4', 'd5', 'd3', 'd6', 'all']; // South, North, Heifa, Jerusalem, Center, TelAviv, All

// District to cities mapping (based on index.ts)
const districtCities = {
  'd1': ['c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20', 'c21', 'c22', 'c23', 'c24', 'c25', 'c26', 'c27', 'c28', 'c29'], // North
  'd2': ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'], // South
  'd3': ['c44', 'c45', 'c46', 'c47', 'c48', 'c49', 'c50', 'c51', 'c52', 'c53', 'c54', 'c55', 'c56', 'c57', 'c58', 'c59', 'c60', 'c61', 'c62', 'c63', 'c64'], // Center
  'd4': ['c30', 'c31', 'c32', 'c33', 'c34', 'c35', 'c36', 'c37', 'c38', 'c39', 'c40', 'c41'], // Heifa
  'd5': ['c42', 'c43'], // Jerusalem
  'd6': ['c65', 'c66', 'c67', 'c68', 'c69', 'c70', 'c71', 'c72', 'c73', 'c74'], // TelAviv
  'all': ['c75'] // All
};

// Categories and subcategories mapping (from DB)
const categorySubcategoryMap = {
  '6904c5eda5aa03f1f627c678': ['6904c5faa5aa03f1f627c6a4', '6904c5faa5aa03f1f627c6a5', '6904c5faa5aa03f1f627c6a6', '6904c5faa5aa03f1f627c6a7', '6904c5faa5aa03f1f627c6a8', '6904c5faa5aa03f1f627c6a9', '6904c5faa5aa03f1f627c6aa'], // ConstructionRepair
  '6904c5eda5aa03f1f627c67a': ['6904c5faa5aa03f1f627c6ab', '6904c5faa5aa03f1f627c6ac', '6904c5faa5aa03f1f627c6ad', '6904c5faa5aa03f1f627c6ae'], // ApplianceRepair
  '6904c5eda5aa03f1f627c67c': ['6904c5faa5aa03f1f627c6af', '6904c5faa5aa03f1f627c6b0', '6904c5faa5aa03f1f627c6b1', '6904c5faa5aa03f1f627c6b2'], // Legal
  '6904c5eda5aa03f1f627c67e': ['6904c5faa5aa03f1f627c6b3', '6904c5faa5aa03f1f627c6b4', '6904c5faa5aa03f1f627c6b5', '6904c5faa5aa03f1f627c6b6'], // Medical
  '6904c5eda5aa03f1f627c680': ['6904c5faa5aa03f1f627c6b7', '6904c5faa5aa03f1f627c6b8', '6904c5faa5aa03f1f627c6b9'], // Transportation
  '6904c5eda5aa03f1f627c682': ['6904c5faa5aa03f1f627c6ba', '6904c5faa5aa03f1f627c6bb', '6904c5faa5aa03f1f627c6bc'], // SecurityInstallation
  '6904c5eda5aa03f1f627c684': ['6904c5faa5aa03f1f627c6bd', '6904c5faa5aa03f1f627c6be', '6904c5faa5aa03f1f627c6bf', '6904c5faa5aa03f1f627c6c0'], // ItAdvertising
  '6904c5eda5aa03f1f627c686': ['6904c5faa5aa03f1f627c6c1', '6904c5faa5aa03f1f627c6c2', '6904c5faa5aa03f1f627c6c3'], // Education
  '6904c5eda5aa03f1f627c688': ['6904c5faa5aa03f1f627c6c4', '6904c5faa5aa03f1f627c6c5', '6904c5faa5aa03f1f627c6c6', '6904c5faa5aa03f1f627c6c7'], // Business
  '6904c5eda5aa03f1f627c68c': ['6904c5faa5aa03f1f627c6cc'] // Other
};

const categories = Object.keys(categorySubcategoryMap);

// Example images structure from DB
const exampleImages = [
  {
    originalName: "4.png",
    uniqueName: "1761921952277-e2ozyd4wp2g.png",
    url: "https://f003.backblazeb2.com/file/sima-board-public-dev/professionals/68ee539a6c41f6c3edf447e6/1761921952277-e2ozyd4wp2g.png",
    fieldname: "files",
    versionId: "4_z340ffe562965213b964d0b14_f119c02959a351844_d20251031_m144552_c003_v0312032_t0023_u01761921952799",
    folderName: "professionals"
  },
  {
    originalName: "5.png",
    uniqueName: "1761921952278-m1ira8oa58o.png",
    url: "https://f003.backblazeb2.com/file/sima-board-public-dev/professionals/68ee539a6c41f6c3edf447e6/1761921952278-m1ira8oa58o.png",
    fieldname: "files",
    versionId: "4_z340ffe562965213b964d0b14_f1014692acd629ee7_d20251031_m144552_c003_v0312016_t0021_u01761921952813",
    folderName: "professionals"
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

// Generate fake email
function generateFakeEmail(index) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'mail.ru', 'yandex.ru'];
  const names = ['user', 'client', 'customer', 'person', 'contact'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomName}${index}@${randomDomain}`;
}

// Generate phone number
function generatePhoneNumber() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

// Generate description
function generateDescription() {
  const descriptions = [
    'Профессиональные услуги высокого качества',
    'Опытный специалист с многолетним стажем',
    'Быстрое и качественное выполнение работ',
    'Доступные цены и гарантия качества',
    'Индивидуальный подход к каждому клиенту',
    'Работаем по всей стране',
    'Квалифицированные мастера',
    'Современное оборудование и технологии'
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

async function populateDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    const documents = [];
    const realUserId = new ObjectId('68ee539a6c41f6c3edf447e6');
    
    // Generate 1000 documents (20 groups of 50)
    for (let group = 0; group < 20; group++) {
      // User: first group uses real userId, others generate new ObjectId
      const userId = group === 0 ? realUserId : new ObjectId();
      
      // Email: first group uses real email, others generate fake
      const email = group === 0 ? 'vladonchik@gmail.com' : generateFakeEmail(group);
      
      // District: cycle through districts, last group (group 19) gets 'all' (All)
      const districtIndex = group === 19 ? 6 : group % 6; // 0-5 for groups 0-18, 6 (All) for group 19
      const district = districts[districtIndex];
      
      // City: pick a random city from the district's cities
      const districtCityList = districtCities[district];
      const city = districtCityList[Math.floor(Math.random() * districtCityList.length)];
      
      // Category and subCategory: pick a random category and matching subcategory
      const categoryId = categories[Math.floor(Math.random() * categories.length)];
      const subCategories = categorySubcategoryMap[categoryId];
      const subCategoryId = subCategories[Math.floor(Math.random() * subCategories.length)];
      
      // Phone number: same for all 50 items in this group
      const phoneNumber = generatePhoneNumber();
      
      // Generate 50 documents for this group
      for (let i = 0; i < 50; i++) {
        documents.push({
          _id: new ObjectId(),
          publicId: generatePublicId(),
          user: userId,
          category: new ObjectId(categoryId),
          subCategory: new ObjectId(subCategoryId),
          district: district,
          city: city,
          description: generateDescription(),
          email: email,
          phoneNumber: phoneNumber,
          acceptTerms: true,
          images: exampleImages
        });
      }
    }
    
    // Insert in batches of 100 to avoid memory issues
    console.log(`Generated ${documents.length} documents. Starting insertion...`);
    
    const batchSize = 100;
    for (let i = 0; i < documents.length; i += batchSize) {
      const batch = documents.slice(i, i + batchSize);
      await collection.insertMany(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} documents)`);
    }
    
    console.log(`Successfully inserted ${documents.length} documents!`);
    
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

populateDatabase().catch(console.error);

