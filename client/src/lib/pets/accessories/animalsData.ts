import type { Animal, AnimalId } from "@/lib/pets/animals/types/animal.schema";

/**
 * Animals data for the pets accessories flow.
 * Edit this file to change animal/kind options only for accessories;
 * for-sale and for-free use their own data.
 */
export const animals: Record<AnimalId, Animal> = {
  anim_dogs: {
    id: "anim_dogs",
    russianName: "Собаки",
    kinds: [
      { id: "4", name: "מלונה", russianName: "Будка" },
      { id: "2", name: "כלוב", russianName: "Клетка" },
      { id: "3", name: "כלוב טיסה", russianName: "Вольер (летная клетка)" },
      { id: "8", name: "נוגדי קרציות", russianName: "Средства от клещей" },
      { id: "6", name: "קולר", russianName: "Ошейник" },
      { id: "10", name: "ביגוד", russianName: "Одежда" },
      {
        id: "7",
        name: "ציוד לאילוף",
        russianName: "Дрессировочное снаряжение",
      },
      { id: "9", name: "מכונת תספורת", russianName: "Машинка для стрижки" },
      { id: "12", name: "מיטה", russianName: "Лежанка" },
      { id: "73", name: "אחר", russianName: "Другое" },
    ],
  },
  anim_cats: {
    id: "anim_cats",
    russianName: "Кошки",
    kinds: [
      {
        id: "aF3kP9",
        name: "ארגז צרכים",
        russianName: "Лоток для туалета",
      },
      {
        id: "Q8mL2x",
        name: "כלוב נשיאה",
        russianName: "Переноска",
      },
      {
        id: "Z5R1wA",
        name: "כלי אוכל ושתייה",
        russianName: "Миски для еды и воды",
      },
      {
        id: "M7Tq4e",
        name: "משחקים וצעצועים",
        russianName: "Игрушки",
      },
      {
        id: "H2c9Sx",
        name: "מיטה",
        russianName: "Лежанка",
      },
      {
        id: "N6B8dP",
        name: "חול לחתולים",
        russianName: "Наполнитель для кошачьего туалета",
      },
      {
        id: "yK4E0V",
        name: "אחר",
        russianName: "Другое",
      },
    ],
  },
  anim_fish: {
    id: "anim_fish",
    russianName: "Рыбы",
    kinds: [
      {
        id: "Q7xA2M",
        name: "אקווריום",
        russianName: "Аквариум",
      },
      {
        id: "L9KpE4",
        name: "בית מנורה",
        russianName: "Корпус для лампы",
      },
      {
        id: "R5Vn8C",
        name: "דקורציה לאקווריום",
        russianName: "Декорации для аквариума",
      },
      {
        id: "Z3T6Wq",
        name: "סלעים לציקלדים",
        russianName: "Камни для цихлид",
      },
      {
        id: "M8FJ2d",
        name: "ברז לבלון",
        russianName: "Кран для баллона",
      },
      {
        id: "H4S9aP",
        name: "צמחיה לאקווריום",
        russianName: "Растения для аквариума",
      },
      {
        id: "C6YxN1",
        name: "אינקובטור",
        russianName: "Инкубатор",
      },
      {
        id: "E2R7KZ",
        name: "פילטר",
        russianName: "Фильтр",
      },
      {
        id: "A9D5mQ",
        name: "משאבת חמצן",
        russianName: "Кислородный насос",
      },
      {
        id: "W4J8L6",
        name: "משאבת אויר",
        russianName: "Воздушный насос",
      },
      {
        id: "B7U0T9",
        name: "אחר",
        russianName: "Другое",
      },
    ],
  },
  anim_birds: {
    id: "anim_birds",
    russianName: "Птицы",
    kinds: [
      {
        "id": "N4p7Qx",
        "name": "כלוב",
        "russianName": "Клетка"
      },
      {
        "id": "T8m2Vf",
        "name": "כלוב האכלת יד",
        "russianName": "Клетка для ручного выкармливания"
      },
      {
        "id": "G3k9Ld",
        "name": "מיכל תערובת",
        "russianName": "Контейнер для смеси"
      },
      {
        "id": "S6w1Jc",
        "name": "סטנד לתוכי",
        "russianName": "Подставка для попугая"
      },
      {
        "id": "H2r5Za",
        "name": "תאי הטלה",
        "russianName": "Гнездовые ячейки"
      },
      {
        "id": "P9x4Bn",
        "name": "מדגרה",
        "russianName": "Инкубатор"
      },
      {
        "id": "D7u3Ke",
        "name": "בתי הטלה",
        "russianName": "Гнездовые домики"
      },
      {
        "id": "V1c8Ms",
        "name": "דיזות",
        "russianName": "Ниппели"
      },
      {
        "id": "K5j6Rt",
        "name": "לול",
        "russianName": "Курятник"
      },
      {
        "id": "Y0n9Wq",
        "name": "אחר",
        "russianName": "Другое"
      }
  
    ],
  },
  anim_ferrets: {
    id: "anim_ferrets",
    russianName: "Хорьки",
    kinds: [
      {
        "id": "FmA7K2",
        "name": "אחר",
        "russianName": "Другое"
      }
  
    ],
  },
  anim_rodents: {
    id: "anim_rodents",
    russianName: "Грызуны",
    kinds: [
      {
        "id": "S4h9KQ",
        "name": "חול",
        "russianName": "Песок"
      },
      {
        "id": "R7M2eA",
        "name": "תאים למכרסמים",
        "russianName": "Домики для грызунов"
      },
      {
        "id": "C8Vx5P",
        "name": "כלוב",
        "russianName": "Клетка"
      },
      {
        "id": "W3N6dT",
        "name": "מתקן שתייה",
        "russianName": "Поилка"
      },
      {
        "id": "Z0LQ7m",
        "name": "אחר",
        "russianName": "Другое"
      }
  
    ],
  },
  anim_farm_animals: {
    id: "anim_farm_animals",
    russianName: "сельскохозяйственные животные",
    kinds: [
      { "id": "238", "name": "אחר", "russianName": "Другое" },
    ],
  },
  anim_horses: {
    id: "anim_horses",
    russianName: "Лошади",
    kinds: [
      {
        "id": "H8Q2mA",
        "name": "אוכף",
        "russianName": "Седло"
      },
      {
        "id": "L4N9Wx",
        "name": "אורווה",
        "russianName": "Конюшня"
      },
      {
        "id": "P7K3ZV",
        "name": "שמיכות",
        "russianName": "Попоны"
      },
      {
        "id": "R5C8Dq",
        "name": "קסדת רכיבה",
        "russianName": "Шлем для верховой езды"
      },
      {
        "id": "M2T6Hn",
        "name": "קרון לסוסים",
        "russianName": "Конный прицеп"
      },
      {
        "id": "S9F1eB",
        "name": "רתמות",
        "russianName": "Упряжь"
      },
      {
        "id": "X4J7Kp",
        "name": "שוט",
        "russianName": "Хлыст"
      },
      {
        "id": "A6VQ3L",
        "name": "כרכרה",
        "russianName": "Карета"
      },
      {
        "id": "Z0W8R5",
        "name": "אחר",
        "russianName": "Другое"
      }
  
  
    ],
  },
  anim_reptiles: {
    id: "anim_reptiles",
    russianName: "Ящерицы и змеи",
    kinds: [
      {
        "id": "L8Q2mP",
        "name": "מנורות",
        "russianName": "Лампы"
      },
      {
        "id": "C7N4A9",
        "name": "כלוב",
        "russianName": "Клетка"
      },
      {
        "id": "R5KxD1",
        "name": "מצע לזוחלים",
        "russianName": "Субстрат для рептилий"
      },
      {
        "id": "T3MZ8F",
        "name": "רשתות",
        "russianName": "Сетки"
      },
      {
        "id": "H6VQ2S",
        "name": "טרריום",
        "russianName": "Террариум"
      },
      {
        "id": "B9E7Wk",
        "name": "אינקובטור לדגירה",
        "russianName": "Инкубатор для инкубации"
      },
      {
        "id": "X4J0nC",
        "name": "טרמוסטט",
        "russianName": "Термостат"
      },
      {
        "id": "ZP6R5A",
        "name": "אחר",
        "russianName": "Другое"
      }
  
    ],
  },
};
