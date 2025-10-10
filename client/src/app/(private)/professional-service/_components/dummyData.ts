import { IProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

// Generate dummy data for testing
export const generateDummyProfessionalServices = (): IProfessionalService[] => {
  const categories = [
    "Ремонт и строительство",
    "Красота и здоровье", 
    "Образование",
    "IT и технологии",
    "Транспорт и логистика",
    "Спорт и фитнес",
    "Домашние услуги",
    "Бизнес и консалтинг"
  ];

  const subCategories = [
    "Ремонт квартир",
    "Маникюр и педикюр",
    "Репетиторство",
    "Веб-разработка",
    "Доставка",
    "Персональный тренер",
    "Уборка",
    "Бухгалтерские услуги"
  ];

  const cities = ["Киев", "Харьков", "Одесса", "Днепр", "Львов"];
  const districts = ["Центр", "Печерский", "Шевченковский", "Подольский", "Соломенский"];

  const descriptions = [
    "Профессиональный ремонт квартир любой сложности. Гарантия качества, современные материалы.",
    "Мастер маникюра с 5-летним опытом. Работаю с премиум материалами.",
    "Репетитор по математике и физике. Подготовка к ЗНО, помощь в учебе.",
    "Разработка веб-сайтов и мобильных приложений. Современные технологии.",
    "Быстрая и надежная доставка по городу. Работаем 24/7.",
    "Персональный тренер в спортзале. Индивидуальный подход к каждому клиенту.",
    "Качественная уборка квартир и офисов. Экологически чистые средства.",
    "Бухгалтерские услуги для малого и среднего бизнеса. Налоговое планирование."
  ];

  const dummyServices: IProfessionalService[] = [];

  for (let i = 0; i < 20; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomSubCategory = subCategories[Math.floor(Math.random() * subCategories.length)];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    dummyServices.push({
      id: `service-${i + 1}`,
      publicId: nanoid(10),
      userId: new mongoose.Types.ObjectId(),
      category: new mongoose.Types.ObjectId(),
      subCategory: new mongoose.Types.ObjectId(),
      district: randomDistrict,
      city: randomCity,
      description: randomDescription,
      email: `service${i + 1}@example.com`,
      phoneNumber: `+380${Math.floor(Math.random() * 900000000) + 100000000}`,
      acceptTerms: true,
      images: [
        {
          originalName: `service-${i + 1}.jpg`,
          uniqueName: `service-${i + 1}-${Date.now()}.jpg`,
          url: `https://picsum.photos/400/300?random=${i + 1}`,
          fieldname: "images",
          versionId: "",
          folderName: "professional-services"
        },
        {
          originalName: `service-${i + 21}.jpg`,
          uniqueName: `service-${i + 21}-${Date.now()}.jpg`,
          url: `https://picsum.photos/400/300?random=${i + 2}`,
          fieldname: "images",
          versionId: "",
          folderName: "professional-services"
        },
        {
          originalName: `service-${i + 13}.jpg`,
          uniqueName: `service-${i + 13}-${Date.now()}.jpg`,
          url: `https://picsum.photos/400/300?random=${i + 3}`,
          fieldname: "images",
          versionId: "",
          folderName: "professional-services"
        },
        {
          originalName: `service-${i + 14}.jpg`,
          uniqueName: `service-${i +  1}-${Date.now()}.jpg`,
          url: `https://picsum.photos/400/300?random=${i + 4}`,
          fieldname: "images",
          versionId: "",
          folderName: "professional-services"
        },
        {
          originalName: `service-${i + 15}.jpg`,
          uniqueName: `service-${i + 15}-${Date.now()}.jpg`,
          url: `https://picsum.photos/400/300?random=${i + 5}`,
          fieldname: "images",
          versionId: "",
          folderName: "professional-services"
        },
      ]
    });
  }

  return dummyServices;
};
