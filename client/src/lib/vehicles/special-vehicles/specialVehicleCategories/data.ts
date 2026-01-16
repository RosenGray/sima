import {
  SpecialVehicleCategory,
  SpecialVehicleCategoryId,
} from "./types/specialVehicleCategory.schema";

export const specialVehicleCategoriesMap = {
  TRAILERS: {
    id: "TRAILERS",
    name: "נגררים",
    russianName: "Прицепы",
    models: [
      {
        id: "TRAILERS_SINGLE_AXLE",
        name: "ציר יחיד",
        russianName: "Одноосный",
      },
      {
        id: "TRAILERS_DOUBLE_AXLE",
        name: "ציר כפול",
        russianName: "Двухосный",
      },
      {
        id: "TRAILERS_TRIPLE_AXLE",
        name: "ציר משולש",
        russianName: "Трехосный",
      },
      {
        id: "TRAILERS_CARAVAN",
        name: "קרוואן",
        russianName: "Караван",
      },
      {
        id: "TRAILERS_BOAT",
        name: "סירת גרירה",
        russianName: "Лодочный прицеп",
      },
      {
        id: "TRAILERS_MOTORCYCLE",
        name: "נגרר אופנוע",
        russianName: "Мотоциклетный прицеп",
      },
    ],
  },
  CARAVANS: {
    id: "CARAVANS",
    name: "קרוואנים",
    russianName: "Караваны",
    models: [
      {
        id: "CARAVANS_SINGLE_AXLE",
        name: "קרוואן ציר יחיד",
        russianName: "Одноосный караван",
      },
      {
        id: "CARAVANS_DOUBLE_AXLE",
        name: "קרוואן ציר כפול",
        russianName: "Двухосный караван",
      },
      {
        id: "CARAVANS_MOTORHOME",
        name: "בית על גלגלים",
        russianName: "Дом на колесах",
      },
      {
        id: "CARAVANS_CAMPER_VAN",
        name: "ואן קמפינג",
        russianName: "Кемпер-фургон",
      },
    ],
  },
  SPECIAL_PURPOSE: {
    id: "SPECIAL_PURPOSE",
    name: "רכבים מיוחדים",
    russianName: "Специального назначения",
    models: [
      {
        id: "SPECIAL_PURPOSE_AMBULANCE",
        name: "אמבולנס",
        russianName: "Скорая помощь",
      },
      {
        id: "SPECIAL_PURPOSE_FIRE_TRUCK",
        name: "מכונית כיבוי",
        russianName: "Пожарная машина",
      },
      {
        id: "SPECIAL_PURPOSE_GARBAGE_TRUCK",
        name: "משאית זבל",
        russianName: "Мусоровоз",
      },
      {
        id: "SPECIAL_PURPOSE_TOW_TRUCK",
        name: "משאית גרירה",
        russianName: "Эвакуатор",
      },
      {
        id: "SPECIAL_PURPOSE_CRANE_TRUCK",
        name: "משאית מנוף",
        russianName: "Автокран",
      },
    ],
  },
  AGRICULTURAL: {
    id: "AGRICULTURAL",
    name: "חקלאות",
    russianName: "Сельскохозяйственная техника",
    models: [
      {
        id: "AGRICULTURAL_TRACTOR",
        name: "טרקטור",
        russianName: "Трактор",
      },
      {
        id: "AGRICULTURAL_COMBINE_HARVESTER",
        name: "קומביין",
        russianName: "Комбайн",
      },
      {
        id: "AGRICULTURAL_HAY_BALER",
        name: "מכבש קש",
        russianName: "Пресс-подборщик",
      },
      {
        id: "AGRICULTURAL_PLOW",
        name: "מחרשה",
        russianName: "Плуг",
      },
    ],
  },
  CONSTRUCTION: {
    id: "CONSTRUCTION",
    name: "בנייה",
    russianName: "Строительная техника",
    models: [
      {
        id: "CONSTRUCTION_EXCAVATOR",
        name: "דחפור",
        russianName: "Экскаватор",
      },
      {
        id: "CONSTRUCTION_BULLDOZER",
        name: "בולדוזר",
        russianName: "Бульдозер",
      },
      {
        id: "CONSTRUCTION_LOADER",
        name: "מטען",
        russianName: "Погрузчик",
      },
      {
        id: "CONSTRUCTION_DUMP_TRUCK",
        name: "משאית משא",
        russianName: "Самосвал",
      },
    ],
  },
} satisfies Record<SpecialVehicleCategoryId, SpecialVehicleCategory>;
