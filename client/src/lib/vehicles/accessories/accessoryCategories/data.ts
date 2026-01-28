import {
  AccessoryCategory,
  AccessoryCategoryId,
} from "./types/accessoryCategory.schema";

export const accessoryCategoriesMap = {
  AUDIO_SYSTEMS: {
    id: "AUDIO_SYSTEMS",
    name: "מערכות שמע",
    russianName: "Аудиосистемы",
    models: [
      {
        id: "AUDIO_SYSTEMS_SPEAKERS",
        name: "רמקולים",
        russianName: "Колонки",
      },
      {
        id: "AUDIO_SYSTEMS_HEAD_UNITS",
        name: "ראש יחידה",
        russianName: "Головные устройства",
      },
      {
        id: "AUDIO_SYSTEMS_AMPLIFIERS",
        name: "מגברים",
        russianName: "Усилители",
      },
      {
        id: "AUDIO_SYSTEMS_SUBWOOFERS",
        name: "סאבוופרים",
        russianName: "Сабвуферы",
      },
      {
        id: "AUDIO_SYSTEMS_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  EXTERIOR_PARTS: {
    id: "EXTERIOR_PARTS",
    name: "חלקי חוץ",
    russianName: "Внешние детали",
    models: [
      {
        id: "EXTERIOR_PARTS_BUMPERS",
        name: "פחות",
        russianName: "Бампера",
      },
      {
        id: "EXTERIOR_PARTS_MIRRORS",
        name: "מראות",
        russianName: "Зеркала",
      },
      {
        id: "EXTERIOR_PARTS_GRILLES",
        name: "רשתות",
        russianName: "Решетки",
      },
      {
        id: "EXTERIOR_PARTS_SPOILERS",
        name: "ספוילרים",
        russianName: "Спойлеры",
      },
      {
        id: "EXTERIOR_PARTS_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  INTERIOR_PARTS: {
    id: "INTERIOR_PARTS",
    name: "חלקי פנים",
    russianName: "Внутренние детали",
    models: [
      {
        id: "INTERIOR_PARTS_SEATS",
        name: "מושבים",
        russianName: "Сиденья",
      },
      {
        id: "INTERIOR_PARTS_DASHBOARDS",
        name: "לוחות מחוונים",
        russianName: "Панели приборов",
      },
      {
        id: "INTERIOR_PARTS_FLOOR_MATS",
        name: "מזרני רצפה",
        russianName: "Коврики",
      },
      {
        id: "INTERIOR_PARTS_STEERING_WHEELS",
        name: "הגאים",
        russianName: "Рулевые колеса",
      },
      {
        id: "INTERIOR_PARTS_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  SAFETY_EQUIPMENT: {
    id: "SAFETY_EQUIPMENT",
    name: "ציוד בטיחות",
    russianName: "Оборудование безопасности",
    models: [
      {
        id: "SAFETY_EQUIPMENT_CAMERAS",
        name: "מצלמות",
        russianName: "Камеры",
      },
      {
        id: "SAFETY_EQUIPMENT_SENSORS",
        name: "חיישנים",
        russianName: "Датчики",
      },
      {
        id: "SAFETY_EQUIPMENT_ALARMS",
        name: "אזעקות",
        russianName: "Сигнализации",
      },
      {
        id: "SAFETY_EQUIPMENT_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
  LIGHTING: {
    id: "LIGHTING",
    name: "תאורה",
    russianName: "Освещение",
    models: [
      {
        id: "LIGHTING_LED_LIGHTS",
        name: "נורות LED",
        russianName: "LED лампы",
      },
      {
        id: "LIGHTING_FOG_LIGHTS",
        name: "פנסי ערפל",
        russianName: "Противотуманные фары",
      },
      {
        id: "LIGHTING_HEADLIGHTS",
        name: "פנסים",
        russianName: "Фары",
      },
      {
        id: "LIGHTING_GENERAL",
        name: "כללי",
        russianName: "Общий",
      },
    ],
  },
} satisfies Record<AccessoryCategoryId, AccessoryCategory>;
