import { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import { nanoid } from "nanoid";

// Generate dummy data for testing
export const generateDummyProfessionalServices = (count: number): SerilizeProfessionalService[] => {
  const firstNames = [
    "Владислав", "Александр", "Дмитрий", "Сергей", "Андрей", 
    "Михаил", "Николай", "Иван", "Петр", "Олег",
    "Анна", "Мария", "Елена", "Ольга", "Наталья"
  ];

  const lastNames = [
    "Иохим", "Петров", "Сидоров", "Козлов", "Васильев",
    "Новиков", "Федоров", "Морозов", "Волков", "Алексеев",
    "Лебедева", "Соколова", "Павлова", "Семенова", "Егорова"
  ];

  const cities = ["c1", "c2", "c3", "c4", "c5"];
  const districts = ["d1", "d2", "d3", "d4", "d5"];

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
    "Сантехнические услуги. Установка, ремонт, замена сантехники."
  ];

  const imageNames = [
    "photo-1.png", "photo-2.jpg", "image-3.png", "pic-4.jpg",
    "service-1.png", "service-2.jpg", "work-1.png", "work-2.jpg"
  ];

  const dummyServices: SerilizeProfessionalService[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    const email = `${firstName.toLowerCase()}${i}@example.com`;
    const phoneNumber = `${Math.floor(Math.random() * 900000000) + 100000000}`;
    
    const now = new Date();
    const createdAt = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    const updatedAt = createdAt;

    // Generate 2-5 random images
    const imageCount = Math.floor(Math.random() * 4) + 2;
    const images = [];
    
    for (let j = 0; j < imageCount; j++) {
      const originalName = imageNames[Math.floor(Math.random() * imageNames.length)];
      const timestamp = Date.now() + j;
      const randomId = nanoid(11);
      const uniqueName = `${timestamp}-${randomId}.${originalName.split('.')[1]}`;
      const userId = nanoid(24);
      
      images.push({
        originalName,
        uniqueName,
        url: `https://f003.backblazeb2.com/file/sima-board-public-dev/professionals/${userId}/${uniqueName}`,
        fieldname: "files",
        versionId: `4_z${nanoid(24)}_f${nanoid(24)}_d20251010_m145500_c003_v0312031_t0052_u${timestamp}`,
        folderName: "professionals",
        _id: nanoid(24)
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
        id: nanoid(24)
      },
      category: null,
      subCategory: null,
      district: randomDistrict,
      city: randomCity,
      description: randomDescription,
      email,
      phoneNumber,
      acceptTerms: true,
      images,
      createdAt,
      updatedAt,
      id: nanoid(24)
    });
  }

  return dummyServices;
};
