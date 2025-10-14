import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import {
  SerializeServiceCategory,
  SerializeServiceSubCategory,
} from "@/lib/service-categories/types/service-categories.types";
import { nanoid } from "nanoid";

// Define categories and subcategories
const categoriesData: Array<{
  category: Omit<SerializeServiceCategory, "id" | "createdAt" | "updatedAt">;
  subCategories: Array<
    Omit<
      SerializeServiceSubCategory,
      "id" | "createdAt" | "updatedAt" | "serviceCategory"
    >
  >;
}> = [
  {
    category: {
      key: "ConstructionRepair",
      displayName: "Construction & Repair",
      description:
        "Services related to construction, renovation, and structural repairs",
      russianDisplayName: "Строительство и Ремонт",
      russianDescription:
        "Услуги, связанные со строительством, ремонтом и конструкционными работами",
    },
    subCategories: [
      {
        key: "GeneralRepair",
        displayName: "General Repair",
        description: "General construction and repair services",
        serviceCategoryKey: "ConstructionRepair",
        russianDisplayName: "Общий ремонт",
        russianDescription: "Общие строительные и ремонтные работы",
      },
      {
        key: "Plumbing",
        displayName: "Plumbing",
        description: "Plumbing installation and repair",
        serviceCategoryKey: "ConstructionRepair",
        russianDisplayName: "Сантехника",
        russianDescription: "Установка и ремонт сантехники",
      },
      {
        key: "Electrical",
        displayName: "Electrical Work",
        description: "Electrical installation and repair",
        serviceCategoryKey: "ConstructionRepair",
        russianDisplayName: "Электрика",
        russianDescription: "Электромонтажные работы",
      },
    ],
  },
  {
    category: {
      key: "BeautyHealth",
      displayName: "Beauty & Health",
      description: "Beauty and health related services",
      russianDisplayName: "Красота и Здоровье",
      russianDescription: "Услуги красоты и здоровья",
    },
    subCategories: [
      {
        key: "Manicure",
        displayName: "Manicure & Pedicure",
        description: "Nail care services",
        serviceCategoryKey: "BeautyHealth",
        russianDisplayName: "Маникюр и Педикюр",
        russianDescription: "Услуги по уходу за ногтями",
      },
      {
        key: "Massage",
        displayName: "Massage",
        description: "Therapeutic and relaxation massage",
        serviceCategoryKey: "BeautyHealth",
        russianDisplayName: "Массаж",
        russianDescription: "Лечебный и расслабляющий массаж",
      },
    ],
  },
  {
    category: {
      key: "Education",
      displayName: "Education & Tutoring",
      description: "Educational and tutoring services",
      russianDisplayName: "Образование и Репетиторство",
      russianDescription: "Образовательные услуги и репетиторство",
    },
    subCategories: [
      {
        key: "Mathematics",
        displayName: "Mathematics Tutoring",
        description: "Math tutoring for all levels",
        serviceCategoryKey: "Education",
        russianDisplayName: "Репетитор по математике",
        russianDescription: "Репетиторство по математике всех уровней",
      },
      {
        key: "Languages",
        displayName: "Language Tutoring",
        description: "Foreign language instruction",
        serviceCategoryKey: "Education",
        russianDisplayName: "Изучение языков",
        russianDescription: "Обучение иностранным языкам",
      },
    ],
  },
  {
    category: {
      key: "ITTechnology",
      displayName: "IT & Technology",
      description: "Information technology services",
      russianDisplayName: "IT и Технологии",
      russianDescription: "Информационные технологии",
    },
    subCategories: [
      {
        key: "WebDevelopment",
        displayName: "Web Development",
        description: "Website and web application development",
        serviceCategoryKey: "ITTechnology",
        russianDisplayName: "Веб-разработка",
        russianDescription: "Разработка веб-сайтов и приложений",
      },
      {
        key: "ComputerRepair",
        displayName: "Computer Repair",
        description: "Computer and laptop repair services",
        serviceCategoryKey: "ITTechnology",
        russianDisplayName: "Ремонт компьютеров",
        russianDescription: "Ремонт компьютеров и ноутбуков",
      },
    ],
  },
  {
    category: {
      key: "TransportLogistics",
      displayName: "Transport & Logistics",
      description: "Transportation and delivery services",
      russianDisplayName: "Транспорт и Логистика",
      russianDescription: "Транспортные и логистические услуги",
    },
    subCategories: [
      {
        key: "Delivery",
        displayName: "Delivery Services",
        description: "Package and goods delivery",
        serviceCategoryKey: "TransportLogistics",
        russianDisplayName: "Доставка",
        russianDescription: "Доставка посылок и товаров",
      },
      {
        key: "Moving",
        displayName: "Moving Services",
        description: "Residential and office moving",
        serviceCategoryKey: "TransportLogistics",
        russianDisplayName: "Переезды",
        russianDescription: "Квартирные и офисные переезды",
      },
    ],
  },
  {
    category: {
      key: "SportsFitness",
      displayName: "Sports & Fitness",
      description: "Sports and fitness training",
      russianDisplayName: "Спорт и Фитнес",
      russianDescription: "Спортивные тренировки и фитнес",
    },
    subCategories: [
      {
        key: "PersonalTrainer",
        displayName: "Personal Training",
        description: "One-on-one fitness training",
        serviceCategoryKey: "SportsFitness",
        russianDisplayName: "Персональный тренер",
        russianDescription: "Индивидуальные фитнес тренировки",
      },
      {
        key: "Yoga",
        displayName: "Yoga Instruction",
        description: "Yoga classes and instruction",
        serviceCategoryKey: "SportsFitness",
        russianDisplayName: "Йога",
        russianDescription: "Занятия йогой",
      },
    ],
  },
  {
    category: {
      key: "HomeCleaning",
      displayName: "Home Services",
      description: "Home cleaning and maintenance",
      russianDisplayName: "Домашние Услуги",
      russianDescription: "Уборка и обслуживание дома",
    },
    subCategories: [
      {
        key: "Cleaning",
        displayName: "Cleaning Services",
        description: "Residential and office cleaning",
        serviceCategoryKey: "HomeCleaning",
        russianDisplayName: "Уборка",
        russianDescription: "Уборка квартир и офисов",
      },
      {
        key: "Gardening",
        displayName: "Gardening",
        description: "Garden maintenance and landscaping",
        serviceCategoryKey: "HomeCleaning",
        russianDisplayName: "Садоводство",
        russianDescription: "Уход за садом и ландшафтный дизайн",
      },
    ],
  },
];

// District to cities mapping based on israelLocations
const districtCitiesMap = {
  d1: [
    "c12",
    "c13",
    "c14",
    "c15",
    "c16",
    "c17",
    "c18",
    "c19",
    "c20",
    "c21",
    "c22",
    "c23",
    "c24",
    "c25",
    "c26",
    "c27",
    "c28",
    "c29",
  ], // North
  d2: [
    "c1",
    "c2",
    "c3",
    "c4",
    "c5",
    "c6",
    "c7",
    "c8",
    "c9",
    "c10",
    "c11",
    "c12",
  ], // South
  d3: [
    "c44",
    "c45",
    "c46",
    "c47",
    "c48",
    "c49",
    "c50",
    "c51",
    "c52",
    "c53",
    "c54",
    "c55",
    "c56",
    "c57",
    "c58",
    "c59",
    "c60",
    "c61",
    "c62",
    "c63",
    "c64",
  ], // Center
  d4: [
    "c30",
    "c31",
    "c32",
    "c33",
    "c34",
    "c35",
    "c36",
    "c37",
    "c38",
    "c39",
    "c40",
    "c41",
  ], // Heifa
  d5: ["c42", "c43"], // Jerusalem
  d6: ["c65", "c66", "c67", "c68", "c69", "c70", "c71", "c72", "c73", "c74"], // TelAviv
};

// Generate dummy data for testing
export const generateDummyProfessionalServices = (
  count: number
): SerilizeProfessionalService[] => {
  const firstNames = [
    "Владислав",
    "Александр",
    "Дмитрий",
    "Сергей",
    "Андрей",
    "Михаил",
    "Николай",
    "Иван",
    "Петр",
    "Олег",
    "Анна",
    "Мария",
    "Елена",
    "Ольга",
    "Наталья",
  ];

  const lastNames = [
    "Иохим",
    "Петров",
    "Сидоров",
    "Козлов",
    "Васильев",
    "Новиков",
    "Федоров",
    "Морозов",
    "Волков",
    "Алексеев",
    "Лебедева",
    "Соколова",
    "Павлова",
    "Семенова",
    "Егорова",
  ];

  const districts = ["d1", "d2", "d3", "d4", "d5", "d6"] as const;

  const descriptions = [
    "Профессиональный ремонт квартир любой сложности. Гарантия качества, современные материалы.",
    "Мастер маникюра с 5-летним опытом. Работаю с премиум материалами.",
    "Репетитор по математике и физике. Подготовка к ЗНО, помощь в учебе.",
    "Разработка веб-сайтов и мобильных приложений. Современные технологии.",
    "Быстрая и надежная доставка по городу. Работаем 24/7.",
    "Персональный тренер в спортзале. Индивидуальный подход к каждому клиенту.",
    "Качественная уборка квартир и офисов. Экологически чистые средства.",
    "Бухгалтерские услуги для малого и среднего бизнеса. Налоговое планирование.",
    "Электрик с опытом работы более 10 лет. Все виды электромонтажных работ.",
    "Сантехнические услуги. Установка, ремонт, замена сантехники.",
  ];

  const imageExtensions = ["png", "jpg"];

  const dummyServices: SerilizeProfessionalService[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    // Select random district
    const randomDistrict =
      districts[Math.floor(Math.random() * districts.length)];

    // Select random city from that district
    const citiesInDistrict = districtCitiesMap[randomDistrict];
    const randomCity =
      citiesInDistrict[Math.floor(Math.random() * citiesInDistrict.length)];

    const randomDescription =
      descriptions[Math.floor(Math.random() * descriptions.length)];
    const email = `${firstName.toLowerCase()}${i}@example.com`;
    const phoneNumber = `${Math.floor(Math.random() * 900000000) + 100000000}`;

    const now = new Date();
    const createdAt = new Date(
      now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    const updatedAt = createdAt;

    // Select random category and subcategory
    const categoryData =
      categoriesData[Math.floor(Math.random() * categoriesData.length)];
    const subCategoryData =
      categoryData.subCategories[
        Math.floor(Math.random() * categoryData.subCategories.length)
      ];

    const categoryId = nanoid(24);
    const category: SerializeServiceCategory = {
      ...categoryData.category,
      id: categoryId,
      createdAt,
      updatedAt,
    };

    const subCategory: SerializeServiceSubCategory = {
      ...subCategoryData,
      id: nanoid(24),
      serviceCategory: category,
      createdAt,
      updatedAt,
    };

    // Generate 2-5 random images
    const imageCount = Math.floor(Math.random() * 4) + 2;
    const images = [];
    const userId = nanoid(24);

    for (let j = 0; j < imageCount; j++) {
      const randomSeed = i * 1000 + j;
      const extension =
        imageExtensions[Math.floor(Math.random() * imageExtensions.length)];
      const originalName = `photo-${randomSeed}.${extension}`;
      const timestamp = Date.now() + j;
      const randomId = nanoid(11);
      const uniqueName = `${timestamp}-${randomId}.${extension}`;

      images.push({
        originalName,
        uniqueName,
        url: `https://picsum.photos/seed/${randomSeed}/800/600`,
        fieldname: "files",
        versionId: `4_z${nanoid(24)}_f${nanoid(
          24
        )}_d20251010_m180053_c003_v0312031_t0036_u${timestamp}`,
        folderName: "professionals",
        _id: nanoid(24),
      });
    }

    dummyServices.push({
      publicId: nanoid(10),
      user: {
        firstName,
        lastName,
        email,
        createdAt,
        updatedAt,
        id: userId,
      },
      category,
      subCategory,
      district: randomDistrict,
      city: randomCity,
      description: randomDescription,
      email,
      phoneNumber,
      acceptTerms: true,
      images,
      createdAt,
      updatedAt,
      id: nanoid(24),
    });
  }

  return dummyServices;
};
