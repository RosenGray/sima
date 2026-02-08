import {
  AccessoryCategory,
  AccessoryCategoryId,
} from "./types/accessoryCategory.schema";

export const accessoryCategoriesMap = {
  A4X4B1: {
    id: "A4X4B1",
    name: "אביזרים 4x4",
    russianName: "Аксессуары 4x4",
    models: [
      {
        id: "M3A1A1",
        name: "אביזרי חילוץ וגרירה",
        russianName: "Аксессуары для эвакуации и буксировки",
      },
      {
        id: "M3A1A2",
        name: "אביזרי מיגון",
        russianName: "Защитные аксессуары",
      },
      {
        id: "M3A1A3",
        name: "אביזרי ניווט",
        russianName: "Навигационное оборудование",
      },
      {
        id: "M3A1A4",
        name: "גגונים ועריסות",
        russianName: "Багажники и крепления на крышу",
      },
      {
        id: "M3A1A5",
        name: "ציוד מחנאות",
        russianName: "Туристическое и кемпинговое снаряжение",
      },
      { id: "M3A1A6", name: "צמיגים וג`אנטים", russianName: "Шины и диски" },
      {
        id: "M3A1A7",
        name: "קישוטים ותוספות",
        russianName: "Декор и дополнительные аксессуары",
      },
      {
        id: "M3A1A8",
        name: "קשר ואלקטרוניקה",
        russianName: "Связь и электроника",
      },
      {
        id: "M3A1A9",
        name: "רמקולים ומערכות",
        russianName: "Аудиосистемы и динамики",
      },
      { id: "M3A1B0", name: "שונות", russianName: "Другое" },
      { id: "M3A1B1", name: "תאורה ופנסים", russianName: "Освещение и фары" },
      {
        id: "M3A1B2",
        name: "תפעול ומכניקה",
        russianName: "Эксплуатация и механика",
      },
    ],
  },

  B2MOTO3: {
    id: "B2MOTO3",
    name: "אביזרים דו גלגלי",
    russianName: "Аксессуары для мототехники",
    models: [
      {
        id: "M3B1A1",
        name: "אביזרי חילוץ",
        russianName: "Аксессуары для эвакуации",
      },
      {
        id: "M3B1A2",
        name: "אביזרי לבוש ומיגון",
        russianName: "Экипировка и защита",
      },
      {
        id: "M3B1A3",
        name: "אגזוזים",
        russianName: "Глушители и выхлопные системы",
      },
      { id: "M3B1A4", name: "ארגזים", russianName: "Кофры и багажные боксы" },
      { id: "M3B1A5", name: "חלקי מנוע", russianName: "Детали двигателя" },
      { id: "M3B1A6", name: "צמיגים", russianName: "Мотошины" },
      {
        id: "M3B1A7",
        name: "קישוטים ותוספות",
        russianName: "Декор и аксессуары",
      },
      { id: "M3B1A8", name: "קסדות", russianName: "Шлемы" },
      { id: "M3B1A9", name: "שונות", russianName: "Другое" },
      {
        id: "M3B1B0",
        name: "תפעול ומכניקה",
        russianName: "Эксплуатация и механика",
      },
    ],
  },

  C3AUTO4: {
    id: "C3AUTO4",
    name: "אביזרים פרטיות",
    russianName: "Аксессуары для легковых авто",
    models: [
      { id: "M3C1A1", name: "הגה", russianName: "Рулевые колёса" },
      {
        id: "M3C1A2",
        name: "חילוץ וגרירה",
        russianName: "Эвакуация и буксировка",
      },
      { id: "M3C1A3", name: "טסות", russianName: "Колпаки" },
      { id: "M3C1A4", name: "כיסויים וריפודים", russianName: "Чехлы и обивка" },
      { id: "M3C1A5", name: "צמיגים וג`אנטים", russianName: "Шины и диски" },
      {
        id: "M3C1A6",
        name: "קישוטים ותוספות",
        russianName: "Декор и аксессуары",
      },
      {
        id: "M3C1A7",
        name: "רמקולים ומערכות ",
        russianName: "Аудиосистемы и динамики",
      },
      { id: "M3C1A8", name: "שונות", russianName: "Другое" },
      { id: "M3C1A9", name: "תאורה ופנסים", russianName: "Освещение и фары" },
    ],
  },

  D4CARAV: {
    id: "D4CARAV",
    name: "אביזרים קראוון",
    russianName: "Аксессуары для караванов",
    models: [
      { id: "M3D1A1", name: "חלקי חילוף", russianName: "Запасные части" },
      { id: "M3D1A2", name: "שונות", russianName: "Другое" },
    ],
  },

  E5FIND6: {
    id: "E5FIND6",
    name: "מחפשים אביזרים",
    russianName: "Поиск аксессуаров",
    models: [
      { id: "M3E1A1", name: "אופנועים", russianName: "Для мотоциклов" },
      { id: "M3E1A2", name: "פרטיות", russianName: "Для легковых авто" },
      { id: "M3E1A3", name: "קטנועים", russianName: "Для скутеров" },
      { id: "M3E1A4", name: "שונות", russianName: "Другое" },
      { id: "M3E1A5", name: "שטח", russianName: "Для внедорожников" },
    ],
  },
} satisfies Record<AccessoryCategoryId, AccessoryCategory>;
