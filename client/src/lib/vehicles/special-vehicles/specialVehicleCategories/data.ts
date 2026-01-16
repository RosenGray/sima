import {
  SpecialVehicleCategory,
  SpecialVehicleCategoryId,
} from "./types/specialVehicleCategory.schema";

export const specialVehicleCategoriesMap = {
  BUSES: {
    id: "BUSES",
    name: "אוטובוסים",
    russianName: "Автобусы",
    models: [
      {
        id: "BUSES_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "BUSES_IVECO",
        name: "איווקו",
        russianName: "Iveco",
      },
      {
        id: "BUSES_DAF",
        name: "דאף",
        russianName: "DAF",
      },
      {
        id: "BUSES_VOLVO",
        name: "וולוו",
        russianName: "Volvo",
      },
      {
        id: "BUSES_TEMSA",
        name: "טמסה",
        russianName: "Temsa",
      },
      {
        id: "BUSES_YUTONG",
        name: "יוטונג",
        russianName: "Yutong",
      },
      {
        id: "BUSES_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "BUSES_MAN",
        name: "מאן",
        russianName: "MAN",
      },
      {
        id: "BUSES_MERCEDES",
        name: "מרצדס",
        russianName: "Mercedes",
      },
      {
        id: "BUSES_SCANIA",
        name: "סקניה",
        russianName: "Scania",
      },
      {
        id: "BUSES_KING_LONG",
        name: "קינג לונג",
        russianName: "King Long",
      },
    ],
  },
  AUTOCARAVAN: {
    id: "AUTOCARAVAN",
    name: "אוטוקראוון",
    russianName: "Автокараван",
    models: [
      {
        id: "AUTOCARAVAN_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "AUTOCARAVAN_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "AUTOCARAVAN_LAVI",
        name: "לאווי",
        russianName: "LAVI",
      },
    ],
  },
  SEA_MOTORCYCLES: {
    id: "SEA_MOTORCYCLES",
    name: "אופנועי ים",
    russianName: "Гидроциклы",
    models: [
      {
        id: "SEA_MOTORCYCLES_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "SEA_MOTORCYCLES_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "SEA_MOTORCYCLES_YAMAHA",
        name: "ימהה",
        russianName: "Yamaha",
      },
      {
        id: "SEA_MOTORCYCLES_POLARIS",
        name: "פולריס",
        russianName: "Polaris",
      },
      {
        id: "SEA_MOTORCYCLES_SEA_DOO",
        name: "סיבר",
        russianName: "Sea-Doo",
      },
    ],
  },
  OTHER: {
    id: "OTHER",
    name: "אחרים",
    russianName: "Другое",
    models: [
      {
        id: "OTHER_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "OTHER_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  TRAILERS_AND_TOWED: {
    id: "TRAILERS_AND_TOWED",
    name: "גרורים ונתמכים",
    russianName: "Прицепы и буксируемые",
    models: [
      {
        id: "TRAILERS_AND_TOWED_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "TRAILERS_AND_TOWED_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  PUBLIC_TAXI_LICENSE: {
    id: "PUBLIC_TAXI_LICENSE",
    name: "זכות ציבורית למונית",
    russianName: "Публичная лицензия на такси",
    models: [
      {
        id: "PUBLIC_TAXI_LICENSE_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "PUBLIC_TAXI_LICENSE_YOKNEAM_ILLIT",
        name: "זכות יוקנעם עילית",
        russianName: "Лицензия Йокнеам-Илит",
      },
      {
        id: "PUBLIC_TAXI_LICENSE_METULA",
        name: "זכות מטולה",
        russianName: "Лицензия Метула",
      },
      {
        id: "PUBLIC_TAXI_LICENSE_SAFED",
        name: "זכות צפת",
        russianName: "Лицензия Цфат",
      },
    ],
  },
  TRACTOR: {
    id: "TRACTOR",
    name: "טרקטור",
    russianName: "Трактор",
    models: [
      {
        id: "TRACTOR_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "TRACTOR_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  ATVS: {
    id: "ATVS",
    name: "טרקטורונים",
    russianName: "Квадроциклы",
    models: [
      {
        id: "ATVS_ACCESS",
        name: "ACCESS",
        russianName: "Access",
      },
      {
        id: "ATVS_CFMOTO",
        name: "CFMOTO",
        russianName: "CFMoto",
      },
      {
        id: "ATVS_JOHN_DEERE",
        name: "John Deere",
        russianName: "John Deere",
      },
      {
        id: "ATVS_TEXTRON",
        name: "Textron",
        russianName: "Textron",
      },
      {
        id: "ATVS_TGB",
        name: "TGB",
        russianName: "TGB",
      },
      {
        id: "ATVS_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "ATVS_ADLY",
        name: "אדלי",
        russianName: "Adly",
      },
      {
        id: "ATVS_OTHER",
        name: "אחר",
        russianName: "Другое",
      },
      {
        id: "ATVS_ARO",
        name: "ארו",
        russianName: "Aro",
      },
      {
        id: "ATVS_ARCTIC_CAT",
        name: "ארקטיק",
        russianName: "Arctic Cat",
      },
      {
        id: "ATVS_BUGGY",
        name: "באגי",
        russianName: "Buggy",
      },
      {
        id: "ATVS_BACAI_FLYING",
        name: "באקאי (מעופף)",
        russianName: "Bacai (Flying)",
      },
      {
        id: "ATVS_BOMBARDIER_CAN_AM",
        name: "בומברדיר/ קאן אם",
        russianName: "Bombardier/Can-Am",
      },
      {
        id: "ATVS_DINLI",
        name: "דינלי",
        russianName: "Dinli",
      },
      {
        id: "ATVS_HONDA",
        name: "הונדה",
        russianName: "Honda",
      },
      {
        id: "ATVS_HAISAN",
        name: "הייסן",
        russianName: "Haisan",
      },
      {
        id: "ATVS_LAWN_TRACTOR",
        name: "טרקטורון דשא",
        russianName: "Газонный трактор",
      },
      {
        id: "ATVS_TRACKSTAR",
        name: "טרקסטאר",
        russianName: "Trackstar",
      },
      {
        id: "ATVS_YOSANG",
        name: "יוסאנג",
        russianName: "Yosang",
      },
      {
        id: "ATVS_YAMAHA",
        name: "ימאהה",
        russianName: "Yamaha",
      },
      {
        id: "ATVS_MIOUL",
        name: "מיול",
        russianName: "Mioul",
      },
      {
        id: "ATVS_NATIONAL_MOTOCROSS",
        name: "נשיונל מוטוקרוס",
        russianName: "National Motocross",
      },
      {
        id: "ATVS_SAGWAY",
        name: "סאגווי",
        russianName: "Sagway",
      },
      {
        id: "ATVS_SUN_YANG",
        name: "סאן יאנג",
        russianName: "Sun Yang",
      },
      {
        id: "ATVS_SUZUKI",
        name: "סוזוקי",
        russianName: "Suzuki",
      },
      {
        id: "ATVS_POLARIS",
        name: "פולריס",
        russianName: "Polaris",
      },
      {
        id: "ATVS_KAWASAKI",
        name: "קוואסקי",
        russianName: "Kawasaki",
      },
      {
        id: "ATVS_KTM",
        name: "קי טי אם",
        russianName: "KTM",
      },
      {
        id: "ATVS_KIMCO",
        name: "קימקו",
        russianName: "Kimco",
      },
      {
        id: "ATVS_SHIRUMIKA",
        name: "שירומיקה",
        russianName: "Shirumika",
      },
      {
        id: "ATVS_TOMCAR",
        name: "תומקר",
        russianName: "Tomcar",
      },
    ],
  },
  DRIVING_SCHOOL: {
    id: "DRIVING_SCHOOL",
    name: 'מבי"ס לנהיגה',
    russianName: "Автошкола",
    models: [
      {
        id: "DRIVING_SCHOOL_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "DRIVING_SCHOOL_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  TAXIS: {
    id: "TAXIS",
    name: "מוניות",
    russianName: "Такси",
    models: [
      {
        id: "TAXIS_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "TAXIS_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  PLOW: {
    id: "PLOW",
    name: "מחרשה",
    russianName: "Плуг",
    models: [
      {
        id: "PLOW_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "PLOW_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  MINIBUSES: {
    id: "MINIBUSES",
    name: "מיניבוסים",
    russianName: "Микроавтобусы",
    models: [
      {
        id: "MINIBUSES_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "MINIBUSES_IVECO",
        name: "איווקו",
        russianName: "Iveco",
      },
      {
        id: "MINIBUSES_DAF",
        name: "דאף",
        russianName: "DAF",
      },
      {
        id: "MINIBUSES_VOLVO",
        name: "וולוו",
        russianName: "Volvo",
      },
      {
        id: "MINIBUSES_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "MINIBUSES_MAN",
        name: "מאן",
        russianName: "MAN",
      },
      {
        id: "MINIBUSES_MERCEDES",
        name: "מרצדס",
        russianName: "Mercedes",
      },
      {
        id: "MINIBUSES_VOLKSWAGEN",
        name: "פולקסווגן",
        russianName: "Volkswagen",
      },
      {
        id: "MINIBUSES_FORD",
        name: "פורד",
        russianName: "Ford",
      },
      {
        id: "MINIBUSES_FIAT",
        name: "פיאט",
        russianName: "Fiat",
      },
      {
        id: "MINIBUSES_RENAULT",
        name: "רנו",
        russianName: "Renault",
      },
      {
        id: "MINIBUSES_CHEVROLET",
        name: "שברולט",
        russianName: "Chevrolet",
      },
    ],
  },
  FORKLIFT: {
    id: "FORKLIFT",
    name: "מלגזה",
    russianName: "Вилочный погрузчик",
    models: [
      {
        id: "FORKLIFT_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "FORKLIFT_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  TRUCKS: {
    id: "TRUCKS",
    name: "משאיות",
    russianName: "Грузовики",
    models: [
      {
        id: "TRUCKS_GMC",
        name: "GMC",
        russianName: "GMC",
      },
      {
        id: "TRUCKS_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "TRUCKS_OTHER",
        name: "אחר",
        russianName: "Другое",
      },
      {
        id: "TRUCKS_IVECO",
        name: "איווקו",
        russianName: "Iveco",
      },
      {
        id: "TRUCKS_INTERNATIONAL",
        name: "אינטרנשיונל",
        russianName: "International",
      },
      {
        id: "TRUCKS_ISUZU",
        name: "איסוזו",
        russianName: "Isuzu",
      },
      {
        id: "TRUCKS_DAF",
        name: "דאף",
        russianName: "DAF",
      },
      {
        id: "TRUCKS_VOLVO",
        name: "וולוו",
        russianName: "Volvo",
      },
      {
        id: "TRUCKS_TOYOTA",
        name: "טויוטה",
        russianName: "Toyota",
      },
      {
        id: "TRUCKS_MAN",
        name: "מאן",
        russianName: "MAN",
      },
      {
        id: "TRUCKS_MITSUBISHI",
        name: "מיצובישי",
        russianName: "Mitsubishi",
      },
      {
        id: "TRUCKS_MACK",
        name: "מק",
        russianName: "Mack",
      },
      {
        id: "TRUCKS_MERCEDES",
        name: "מרצדס",
        russianName: "Mercedes",
      },
      {
        id: "TRUCKS_NISSAN",
        name: "ניסן",
        russianName: "Nissan",
      },
      {
        id: "TRUCKS_SCANIA",
        name: "סקניה",
        russianName: "Scania",
      },
      {
        id: "TRUCKS_VOLKSWAGEN",
        name: "פולקסווגן",
        russianName: "Volkswagen",
      },
      {
        id: "TRUCKS_FORD",
        name: "פורד",
        russianName: "Ford",
      },
      {
        id: "TRUCKS_KENWORTH",
        name: "קנוורת'",
        russianName: "Kenworth",
      },
      {
        id: "TRUCKS_RENAULT",
        name: "רנו",
        russianName: "Renault",
      },
      {
        id: "TRUCKS_CHEVROLET",
        name: "שברולט",
        russianName: "Chevrolet",
      },
    ],
  },
  MOBILITY_SCOOTERS: {
    id: "MOBILITY_SCOOTERS",
    name: "קלנועיות",
    russianName: "Мобильные скутеры",
    models: [
      {
        id: "MOBILITY_SCOOTERS_BREEZE",
        name: "BREEZE",
        russianName: "Breeze",
      },
      {
        id: "MOBILITY_SCOOTERS_KIMCO",
        name: "KIMCO",
        russianName: "Kimco",
      },
      {
        id: "MOBILITY_SCOOTERS_MERITZ",
        name: "MERITZ",
        russianName: "Meritz",
      },
      {
        id: "MOBILITY_SCOOTERS_PRIDE",
        name: "PRIDE",
        russianName: "Pride",
      },
      {
        id: "MOBILITY_SCOOTERS_SHOP_RIDER",
        name: "SHOP RIDER",
        russianName: "Shop Rider",
      },
      {
        id: "MOBILITY_SCOOTERS_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "MOBILITY_SCOOTERS_OTHER",
        name: "אחר",
        russianName: "Другое",
      },
    ],
  },
  TRAILER_CARAVAN: {
    id: "TRAILER_CARAVAN",
    name: "קראוון נגרר",
    russianName: "Прицепной караван",
    models: [
      {
        id: "TRAILER_CARAVAN_BLACK_SERIES",
        name: "Black Series",
        russianName: "Black Series",
      },
      {
        id: "TRAILER_CARAVAN_KNAUS",
        name: "Knaus",
        russianName: "Knaus",
      },
      {
        id: "TRAILER_CARAVAN_STERCKEMAN",
        name: "STERCKEMAN",
        russianName: "Sterckeman",
      },
      {
        id: "TRAILER_CARAVAN_TAB",
        name: "T@b",
        russianName: "T@b",
      },
      {
        id: "TRAILER_CARAVAN_TABBERT",
        name: "Tabbert",
        russianName: "Tabbert",
      },
      {
        id: "TRAILER_CARAVAN_WEINSBERG",
        name: "Weinsberg",
        russianName: "Weinsberg",
      },
      {
        id: "TRAILER_CARAVAN_ADRIA",
        name: "אדריה",
        russianName: "Adria",
      },
      {
        id: "TRAILER_CARAVAN_OTHER",
        name: "אחר",
        russianName: "Другое",
      },
      {
        id: "TRAILER_CARAVAN_HOBBY",
        name: "הובי",
        russianName: "Hobby",
      },
      {
        id: "TRAILER_CARAVAN_NAHALIM",
        name: "נחלים",
        russianName: "Nahalin",
      },
    ],
  },
  COLLECTOR_CAR: {
    id: "COLLECTOR_CAR",
    name: "רכב אספנות",
    russianName: "Коллекционный автомобиль",
    models: [
      {
        id: "COLLECTOR_CAR_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
      {
        id: "COLLECTOR_CAR_MG",
        name: "MG",
        russianName: "MG",
      },
      {
        id: "COLLECTOR_CAR_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "COLLECTOR_CAR_OLDSMOBILE",
        name: "אולדסמוביל",
        russianName: "Oldsmobile",
      },
      {
        id: "COLLECTOR_CAR_AUSTIN",
        name: "אוסטין",
        russianName: "Austin",
      },
      {
        id: "COLLECTOR_CAR_OPEL",
        name: "אופל",
        russianName: "Opel",
      },
      {
        id: "COLLECTOR_CAR_MOTORCYCLES",
        name: "אופנועים",
        russianName: "Мотоциклы",
      },
      {
        id: "COLLECTOR_CAR_ALFA_ROMEO",
        name: "אלפא רומאו",
        russianName: "Alfa Romeo",
      },
      {
        id: "COLLECTOR_CAR_BMW",
        name: "ב.מ.וו",
        russianName: "BMW",
      },
      {
        id: "COLLECTOR_CAR_BUICK",
        name: "ביואיק",
        russianName: "Buick",
      },
      {
        id: "COLLECTOR_CAR_JEEP_CJ",
        name: "ג'יפ CJ",
        russianName: "Jeep CJ",
      },
      {
        id: "COLLECTOR_CAR_DODGE",
        name: "'דודג",
        russianName: "Dodge",
      },
      {
        id: "COLLECTOR_CAR_HILLMAN",
        name: "הילמן",
        russianName: "Hillman",
      },
      {
        id: "COLLECTOR_CAR_WILLYS",
        name: "וויליס",
        russianName: "Willys",
      },
      {
        id: "COLLECTOR_CAR_VOLVO",
        name: "וולוו",
        russianName: "Volvo",
      },
      {
        id: "COLLECTOR_CAR_TRIUMPH",
        name: "טריומף",
        russianName: "Triumph",
      },
      {
        id: "COLLECTOR_CAR_JAGUAR",
        name: "יגואר",
        russianName: "Jaguar",
      },
      {
        id: "COLLECTOR_CAR_LINCOLN",
        name: "לינקולן",
        russianName: "Lincoln",
      },
      {
        id: "COLLECTOR_CAR_LAND_ROVER",
        name: "לנדרובר",
        russianName: "Land Rover",
      },
      {
        id: "COLLECTOR_CAR_LANCIA",
        name: "לנציה",
        russianName: "Lancia",
      },
      {
        id: "COLLECTOR_CAR_MORRIS",
        name: "מוריס",
        russianName: "Morris",
      },
      {
        id: "COLLECTOR_CAR_MINI_MINOR",
        name: "מיני מיינור",
        russianName: "Mini Minor",
      },
      {
        id: "COLLECTOR_CAR_MERCEDES",
        name: "מרצדס",
        russianName: "Mercedes",
      },
      {
        id: "COLLECTOR_CAR_SAAB",
        name: "סאאב",
        russianName: "Saab",
      },
      {
        id: "COLLECTOR_CAR_SUBARU",
        name: "סובארו",
        russianName: "Subaru",
      },
      {
        id: "COLLECTOR_CAR_SUSITA",
        name: "סוסיתא",
        russianName: "Susita",
      },
      {
        id: "COLLECTOR_CAR_CITROEN",
        name: "סיטרואן",
        russianName: "Citroën",
      },
      {
        id: "COLLECTOR_CAR_VOLKSWAGEN",
        name: "פולקסוואגן",
        russianName: "Volkswagen",
      },
      {
        id: "COLLECTOR_CAR_PONTIAC",
        name: "פונטיאק",
        russianName: "Pontiac",
      },
      {
        id: "COLLECTOR_CAR_FORD",
        name: "פורד",
        russianName: "Ford",
      },
      {
        id: "COLLECTOR_CAR_PORSCHE",
        name: "פורשה",
        russianName: "Porsche",
      },
      {
        id: "COLLECTOR_CAR_FIAT",
        name: "פיאט",
        russianName: "Fiat",
      },
      {
        id: "COLLECTOR_CAR_PEUGEOT",
        name: "פיג'ו",
        russianName: "Peugeot",
      },
      {
        id: "COLLECTOR_CAR_PLYMOUTH",
        name: "פליימות",
        russianName: "Plymouth",
      },
      {
        id: "COLLECTOR_CAR_CADILLAC",
        name: "קאדילק",
        russianName: "Cadillac",
      },
      {
        id: "COLLECTOR_CAR_ROLLS_ROYCE",
        name: "רולס רויס",
        russianName: "Rolls-Royce",
      },
      {
        id: "COLLECTOR_CAR_RENAULT",
        name: "רנו",
        russianName: "Renault",
      },
      {
        id: "COLLECTOR_CAR_CHEVROLET",
        name: "שברולט",
        russianName: "Chevrolet",
      },
    ],
  },
  CONSTRUCTION_EQUIPMENT: {
    id: "CONSTRUCTION_EQUIPMENT",
    name: 'רכב צמ"ה',
    russianName: "Строительная техника",
    models: [
      {
        id: "CONSTRUCTION_EQUIPMENT_BULLDOZERS",
        name: "דחפורים",
        russianName: "Бульдозеры",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_DEMOLITION_BALL",
        name: "כדור הריסה",
        russianName: "Шар для сноса",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_SCRAPER",
        name: "מגרדת",
        russianName: "Скребок",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_EXCAVATOR",
        name: "מחפר",
        russianName: "Экскаватор",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_BACKHOE",
        name: "מחפרון",
        russianName: "Экскаватор-погрузчик",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_MINI_EXCAVATOR",
        name: "מיני מחפר",
        russianName: "Мини-экскаватор",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_MINI_LOADER",
        name: "מיני מעמיס",
        russianName: "Мини-погрузчик",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_ROLLER",
        name: "מכבש",
        russianName: "Каток",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_DRILLING_MACHINE",
        name: "מכונת קידוח",
        russianName: "Буровая машина",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_FORKLIFT",
        name: "מלגזה",
        russianName: "Вилочный погрузчик",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_CRANE",
        name: "מנוף",
        russianName: "Кран",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_TELESCOPIC_LOADER",
        name: "מעמיס טלסקופי",
        russianName: "Телескопический погрузчик",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_CONCRETE_MIXER",
        name: "מערבל בטון",
        russianName: "Бетономешалка",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_GRADER",
        name: "מפלסת",
        russianName: "Грейдер",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_ROAD_SCRAPER",
        name: "מקרצפת כביש",
        russianName: "Дорожный скребок",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_CONCRETE_PUMP",
        name: "משאבת בטון",
        russianName: "Бетонный насос",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_CRANE_LIFT",
        name: "עגורן",
        russianName: "Подъемный кран",
      },
      {
        id: "CONSTRUCTION_EQUIPMENT_SCHOPEL",
        name: "שופל",
        russianName: "Шопел",
      },
    ],
  },
  OPERATIONAL_VEHICLES: {
    id: "OPERATIONAL_VEHICLES",
    name: "רכבים תפעוליים",
    russianName: "Операционные транспортные средства",
    models: [
      {
        id: "OPERATIONAL_VEHICLES_CLUB_CAR",
        name: "CLUB CAR",
        russianName: "Club Car",
      },
      {
        id: "OPERATIONAL_VEHICLES_EASY_GO",
        name: "EASY GO",
        russianName: "Easy Go",
      },
      {
        id: "OPERATIONAL_VEHICLES_E_CAR",
        name: "E-CAR",
        russianName: "E-Car",
      },
      {
        id: "OPERATIONAL_VEHICLES_HDK",
        name: "HDK",
        russianName: "HDK",
      },
      {
        id: "OPERATIONAL_VEHICLES_ITALCAR",
        name: "ITALCAR",
        russianName: "Italcar",
      },
      {
        id: "OPERATIONAL_VEHICLES_MARSHELL",
        name: "Marshell",
        russianName: "Marshell",
      },
      {
        id: "OPERATIONAL_VEHICLES_MELEX",
        name: "MELEX",
        russianName: "Melex",
      },
      {
        id: "OPERATIONAL_VEHICLES_PARK_CAR",
        name: "PARK CAR",
        russianName: "Park Car",
      },
      {
        id: "OPERATIONAL_VEHICLES_SUN_CAR",
        name: "Sun Car",
        russianName: "Sun Car",
      },
      {
        id: "OPERATIONAL_VEHICLES_TAYLOR_DUNNE",
        name: "TAYLOR DUNNE",
        russianName: "Taylor Dunne",
      },
      {
        id: "OPERATIONAL_VEHICLES_VCAR",
        name: "VCAR",
        russianName: "VCar",
      },
      {
        id: "OPERATIONAL_VEHICLES_YAMAHA",
        name: "YAMAHA",
        russianName: "Yamaha",
      },
      {
        id: "OPERATIONAL_VEHICLES_ZYCAR",
        name: "ZYCAR",
        russianName: "ZyCar",
      },
      {
        id: "OPERATIONAL_VEHICLES_ACCESSORIES",
        name: "אביזרים",
        russianName: "Аксессуары",
      },
      {
        id: "OPERATIONAL_VEHICLES_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
} satisfies Record<SpecialVehicleCategoryId, SpecialVehicleCategory>;
