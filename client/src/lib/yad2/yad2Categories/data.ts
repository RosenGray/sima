import {
  Yad2Category,
  Yad2CategoryId,
} from "./types/yad2Category.schema";

export const yad2Categories: Record<Yad2CategoryId, Yad2Category> = {
  ELECTRONICS: {
    id: "ELECTRONICS",
    name: "Electronics",
    russianName: "Электроника",
    subCategories: [
      {
        id: "ELECTRONICS_SMARTPHONES",
        name: "Smartphones",
        russianName: "Смартфоны",
      },
      {
        id: "ELECTRONICS_LAPTOPS",
        name: "Laptops",
        russianName: "Ноутбуки",
      },
      {
        id: "ELECTRONICS_TABLETS",
        name: "Tablets",
        russianName: "Планшеты",
      },
      {
        id: "ELECTRONICS_CAMERAS",
        name: "Cameras",
        russianName: "Фотоаппараты",
      },
      {
        id: "ELECTRONICS_HEADPHONES",
        name: "Headphones",
        russianName: "Наушники",
      },
      {
        id: "ELECTRONICS_GAMING_CONSOLES",
        name: "Gaming Consoles",
        russianName: "Игровые консоли",
      },
    ],
  },
  FURNITURE: {
    id: "FURNITURE",
    name: "Furniture",
    russianName: "Мебель",
    subCategories: [
      {
        id: "FURNITURE_CHAIRS",
        name: "Chairs",
        russianName: "Стулья",
      },
      {
        id: "FURNITURE_TABLES",
        name: "Tables",
        russianName: "Столы",
      },
      {
        id: "FURNITURE_SOFAS",
        name: "Sofas",
        russianName: "Диваны",
      },
      {
        id: "FURNITURE_BEDS",
        name: "Beds",
        russianName: "Кровати",
      },
      {
        id: "FURNITURE_CABINETS",
        name: "Cabinets",
        russianName: "Шкафы",
      },
      {
        id: "FURNITURE_DESKS",
        name: "Desks",
        russianName: "Письменные столы",
      },
    ],
  },
  CLOTHING: {
    id: "CLOTHING",
    name: "Clothing",
    russianName: "Одежда",
    subCategories: [
      {
        id: "CLOTHING_MENS",
        name: "Men's Clothing",
        russianName: "Мужская одежда",
      },
      {
        id: "CLOTHING_WOMENS",
        name: "Women's Clothing",
        russianName: "Женская одежда",
      },
      {
        id: "CLOTHING_SHOES",
        name: "Shoes",
        russianName: "Обувь",
      },
      {
        id: "CLOTHING_ACCESSORIES",
        name: "Accessories",
        russianName: "Аксессуары",
      },
      {
        id: "CLOTHING_BAGS",
        name: "Bags",
        russianName: "Сумки",
      },
    ],
  },
  SPORTS_EQUIPMENT: {
    id: "SPORTS_EQUIPMENT",
    name: "Sports Equipment",
    russianName: "Спортивное оборудование",
    subCategories: [
      {
        id: "SPORTS_EQUIPMENT_BICYCLES",
        name: "Bicycles",
        russianName: "Велосипеды",
      },
      {
        id: "SPORTS_EQUIPMENT_FITNESS",
        name: "Fitness Equipment",
        russianName: "Фитнес оборудование",
      },
      {
        id: "SPORTS_EQUIPMENT_OUTDOOR",
        name: "Outdoor Gear",
        russianName: "Туристическое снаряжение",
      },
      {
        id: "SPORTS_EQUIPMENT_ACCESSORIES",
        name: "Sports Accessories",
        russianName: "Спортивные аксессуары",
      },
    ],
  },
  BOOKS: {
    id: "BOOKS",
    name: "Books",
    russianName: "Книги",
    subCategories: [
      {
        id: "BOOKS_FICTION",
        name: "Fiction",
        russianName: "Художественная литература",
      },
      {
        id: "BOOKS_NON_FICTION",
        name: "Non-Fiction",
        russianName: "Нехудожественная литература",
      },
      {
        id: "BOOKS_TEXTBOOKS",
        name: "Textbooks",
        russianName: "Учебники",
      },
      {
        id: "BOOKS_CHILDREN",
        name: "Children's Books",
        russianName: "Детские книги",
      },
      {
        id: "BOOKS_COMICS",
        name: "Comics",
        russianName: "Комиксы",
      },
    ],
  },
  HOME_GARDEN: {
    id: "HOME_GARDEN",
    name: "Home & Garden",
    russianName: "Дом и сад",
    subCategories: [
      {
        id: "HOME_GARDEN_KITCHEN",
        name: "Kitchen Items",
        russianName: "Кухонная утварь",
      },
      {
        id: "HOME_GARDEN_GARDEN_TOOLS",
        name: "Garden Tools",
        russianName: "Садовый инвентарь",
      },
      {
        id: "HOME_GARDEN_DECOR",
        name: "Decor",
        russianName: "Декор",
      },
      {
        id: "HOME_GARDEN_APPLIANCES",
        name: "Appliances",
        russianName: "Бытовая техника",
      },
    ],
  },
  TOYS: {
    id: "TOYS",
    name: "Toys",
    russianName: "Игрушки",
    subCategories: [
      {
        id: "TOYS_ACTION_FIGURES",
        name: "Action Figures",
        russianName: "Фигурки",
      },
      {
        id: "TOYS_BOARD_GAMES",
        name: "Board Games",
        russianName: "Настольные игры",
      },
      {
        id: "TOYS_PUZZLES",
        name: "Puzzles",
        russianName: "Пазлы",
      },
      {
        id: "TOYS_EDUCATIONAL",
        name: "Educational Toys",
        russianName: "Обучающие игрушки",
      },
    ],
  },
  JEWELRY: {
    id: "JEWELRY",
    name: "Jewelry",
    russianName: "Ювелирные изделия",
    subCategories: [
      {
        id: "JEWELRY_RINGS",
        name: "Rings",
        russianName: "Кольца",
      },
      {
        id: "JEWELRY_NECKLACES",
        name: "Necklaces",
        russianName: "Ожерелья",
      },
      {
        id: "JEWELRY_WATCHES",
        name: "Watches",
        russianName: "Часы",
      },
      {
        id: "JEWELRY_BRACELETS",
        name: "Bracelets",
        russianName: "Браслеты",
      },
      {
        id: "JEWELRY_EARRINGS",
        name: "Earrings",
        russianName: "Серьги",
      },
    ],
  },
};
