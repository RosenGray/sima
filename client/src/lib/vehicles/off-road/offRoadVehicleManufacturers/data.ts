import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";

export const offRoadVehicleManufacturersMap = {
  a1B2c3: {
    id: "a1B2c3",
    name: "אאודי",
    russianName: "Ауди",
    models: [
      { id: "u7K2p9", name: "E-TRON", russianName: "e-tron" },
      { id: "n4V1b6", name: "Q2", russianName: "Q2" },
      { id: "r8M5x2", name: "Q3", russianName: "Q3" },
      { id: "t3F9q1", name: "Q5", russianName: "Q5" },
      { id: "z6H2c4", name: "Q7", russianName: "Q7" },
      { id: "p0L7s8", name: "Q8", russianName: "Q8" },
    ],
  },

  d4E5f6: {
    id: "d4E5f6",
    name: "אופל",
    russianName: "Опель",
    models: [{ id: "k9D2m7", name: "מוקה X", russianName: "Mokka X" }],
  },

  g7H8i9: {
    id: "g7H8i9",
    name: "אינפיניטי",
    russianName: "Инфинити",
    models: [
      { id: "A9f3K2", name: "FX30 D", russianName: "FX30d" },
      { id: "L4P8Q7", name: "FX35", russianName: "FX35" },
      { id: "M2R9X5", name: "FX45", russianName: "FX45" },
      { id: "Z7C6N1", name: "FX50", russianName: "FX50" },
      { id: "D8V4T9", name: "QX30", russianName: "QX30" },
      { id: "H5J2S8", name: "QX50", russianName: "QX50" },
      { id: "W6E1B3", name: "QX56", russianName: "QX56" },
      { id: "F3U9A4", name: "QX60", russianName: "QX60" },
      { id: "K8M5R2", name: "QX70", russianName: "QX70" },
    ],
  },

  j1K2l3: {
    id: "j1K2l3",
    name: "איסוזו",
    russianName: "Исузу",
    models: [
      { id: "R9A2M6", name: "DMAX", russianName: "D-Max" },
      { id: "K4F8P1", name: "טנדר", russianName: "Пикап" },
      { id: "S7D3L9", name: "טרופר", russianName: "Trooper" },
      { id: "C2W5X8", name: "טרופר קצר", russianName: "Trooper Short" },
      { id: "H6N9B4", name: "סומו", russianName: "Como" },
      { id: "M8E1Q7", name: "רודיאו", russianName: "Rodeo" },
    ],
  },

  m4N5o6: {
    id: "m4N5o6",
    name: "אלפא רומיאו",
    russianName: "Альфа Ромео",
    models: [{ id: "V7K2M9", name: "סטלביו", russianName: "Stelvio" }],
  },

  p7Q8r9: {
    id: "p7Q8r9",
    name: "אם ג`י MG",
    russianName: "MG",
    models: [
      { id: "J8M4C2", name: "RX5", russianName: "RX5" },
      { id: "Q5T9A7", name: "ZS", russianName: "ZS" },
    ],
  },

  s1T2u3: {
    id: "s1T2u3",
    name: "אסטון מרטין",
    russianName: "Астон Мартин",
    models: [{ id: "X4A7M9", name: "DBX", russianName: "DBX" }],
  },

  v4W5x6: {
    id: "v4W5x6",
    name: "ב.מ.וו",
    russianName: "БМВ",
    models: [
      { id: "B7K9M2", name: "X1", russianName: "X1" },
      { id: "D4A6T8", name: "X2", russianName: "X2" },
      { id: "F9Q1R5", name: "X3", russianName: "X3" },
      { id: "L2S8C6", name: "X4", russianName: "X4" },
      { id: "M7E3X9", name: "X5", russianName: "X5" },
      { id: "P5H2W4", name: "X6", russianName: "X6" },
      { id: "N8J6A1", name: "X7", russianName: "X7" },
    ],
  },

  y7Z8a9: {
    id: "y7Z8a9",
    name: "בי.ווי.די",
    russianName: "BYD",
    models: [{ id: "E6R9K2", name: "אטו 3", russianName: "ATTO 3" }],
  },

  b1C2d3: {
    id: "b1C2d3",
    name: "ביואיק",
    russianName: "Бьюик",
    models: [
      { id: "U9C2F7", name: "אינווי", russianName: "Envoy" },
      { id: "M4K8D1", name: "אינקלייב", russianName: "Enclave" },
      { id: "R6P9A5", name: "רנדוו", russianName: "Rendezvous" },
    ],
  },

  e4F5g6: {
    id: "e4F5g6",
    name: "בנטלי",
    russianName: "Бентли",
    models: [{ id: "T8M2K9", name: "בנטיאגה", russianName: "Bentayga" }],
  },

  h7J8k9: {
    id: "h7J8k9",
    name: "ג`י.אם.סי",
    russianName: "GMC",
    models: [
      { id: "E7M9A2", name: "אינווי", russianName: "Envoy" },
      { id: "K4R6T1", name: "אכאדיה", russianName: "Acadia" },
      { id: "J8P5N3", name: "ג`ימי", russianName: "Jimmy" },
      { id: "H2D9C7", name: "האמר", russianName: "Hummer" },
      { id: "X6F4M8", name: "האמר EV", russianName: "Hummer EV" },
      { id: "B1S8Q4", name: "טנדר 4X4", russianName: "Pickup 4x4" },
      { id: "L9W2K6", name: "יוקון", russianName: "Yukon" },
      { id: "M5A7R8", name: "יוקון דנאלי", russianName: "Yukon Denali" },
      { id: "T3E6V9", name: "סוברבן", russianName: "Suburban" },
      { id: "P4N8D5", name: "סיירה 4X4", russianName: "Sierra 4x4" },
    ],
  },

  l1M2n3: {
    id: "l1M2n3",
    name: "ג`יי.איי.סי",
    russianName: "GAC",
    models: [{ id: "S8M4Q2", name: "E-S2", russianName: "E-S2" }],
  },

  o4P5q6: {
    id: "o4P5q6",
    name: "ג`ילי",
    russianName: "Джили",
    models: [{ id: "G5M9K2", name: "גיאומטרי c", russianName: "Geometry C" }],
  },

  r7S8t9: {
    id: "r7S8t9",
    name: "ג`יפ",
    russianName: "Jeep",
    models: [
      { id: "A7M2K9", name: "גלדיאטור", russianName: "Gladiator" },
      { id: "D8R4T6", name: "גראנד וואגוניר", russianName: "Grand Wagoneer" },
      { id: "C5P9H2", name: "גרנד צ`ירוקי", russianName: "Grand Cherokee" },
      {
        id: "L7S8M4",
        name: "גרנד צ`רוקי לימיטד",
        russianName: "Grand Cherokee Limited",
      },
      { id: "J3E6Q8", name: "סי. ג`יי.", russianName: "CJ" },
      { id: "P2V5N7", name: "פטריוט", russianName: "Patriot" },
      { id: "W9A4K1", name: "צ`ירוקי", russianName: "Cherokee" },
      { id: "M6B8D3", name: "קומנדר", russianName: "Commander" },
      { id: "R5H2T9", name: "קומפאס", russianName: "Compass" },
      { id: "F4S6E8", name: "רנגייד", russianName: "Renegade" },
      { id: "N7Q1C5", name: "רנגלר", russianName: "Wrangler" },
      { id: "K8M9L2", name: "רנגלר ארוך", russianName: "Wrangler Unlimited" },
      { id: "S6D4P7", name: "רנגלר סהרה", russianName: "Wrangler Sahara" },
      { id: "T9A8R5", name: "רנגלר רוביקון", russianName: "Wrangler Rubicon" },
    ],
  },

  u1V2w3: {
    id: "u1V2w3",
    name: "גרייט וול",
    russianName: "Great Wall",
    models: [{ id: "H6M9K2", name: "HAVAL H6", russianName: "Haval H6" }],
  },

  x4Y5z6: {
    id: "x4Y5z6",
    name: "דאצ'יה",
    russianName: "Дачия",
    models: [
      { id: "D8M2K9", name: "דאסטר", russianName: "Duster" },
      { id: "A5R9L2", name: "דאסטר החדשה", russianName: "Duster New" },
      { id: "S6P4H8", name: "סנדרו Stepway", russianName: "Sandero Stepway" },
    ],
  },

  a7B8c9: {
    id: "a7B8c9",
    name: "דודג`",
    russianName: "Додж",
    models: [
      { id: "O4R9K2", name: "אחר", russianName: "Другое" },
      { id: "D7M5A8", name: "דורנגו", russianName: "Durango" },
      { id: "N2P6H9", name: "נייטרו", russianName: "Nitro" },
      { id: "C8L4T1", name: "קאליבר", russianName: "Caliber" },
    ],
  },

  d1E2f3: {
    id: "d1E2f3",
    name: "דופנג",
    russianName: "Dongfeng",
    models: [{ id: "G5M2R9", name: "גלורי 580", russianName: "Glory 580" }],
  },

  g4H5i6: {
    id: "g4H5i6",
    name: "די.אס",
    russianName: "DS",
    models: [
      { id: "D3M9K2", name: "DS3 קרוסבק", russianName: "DS 3 Crossback" },
      { id: "S7R4A8", name: "DS7 קרוסבק", russianName: "DS 7 Crossback" },
    ],
  },

  j7K8l9: {
    id: "j7K8l9",
    name: "דייהו",
    russianName: "Дэу",
    models: [
      { id: "Ac2y9L", name: "אחר", russianName: "Другое" },
      { id: "GkqH4E", name: "מוסו", russianName: "Musso" },
    ],
  },

  m1N2o3: {
    id: "m1N2o3",
    name: "דייהטסו",
    russianName: "Дайхатсу",
    models: [
      { id: "XKQnq5", name: "ג`יפ טריוס", russianName: "Terios" },
      { id: "C1cfzH", name: "ג`יפ פרוזה", russianName: "Feroza" },
    ],
  },

  p4Q5r6: {
    id: "p4Q5r6",
    name: "האמר",
    russianName: "Хаммер",
    models: [
      { id: "hIMoP1", name: "EV", russianName: "Hummer EV" },
      { id: "2GQhZq", name: "H1", russianName: "H1" },
      { id: "4mYw0H", name: "H2", russianName: "H2" },
      { id: "zYw0Yj", name: "H2 SUT", russianName: "H2 SUT" },
      { id: "eE3b5J", name: "H3", russianName: "H3" },
    ],
  },

  s7T8u9: {
    id: "s7T8u9",
    name: "הונדה",
    russianName: "Хонда",
    models: [
      { id: "bN2y4o", name: "CR-V", russianName: "CR-V" },
      { id: "S1q3zV", name: "CRV החדשה", russianName: "CR-V New" },
      { id: "c4j9Ue", name: "HRV", russianName: "HR-V" },
      { id: "zQ7a2M", name: "פיילוט", russianName: "Pilot" },
    ],
  },

  v1W2x3: {
    id: "v1W2x3",
    name: "וויה",
    russianName: "Voyah",
    models: [{ id: "rE8N2w", name: "פרי", russianName: "Free" }],
  },

  y4Z5a6: {
    id: "y4Z5a6",
    name: "וולוו",
    russianName: "Вольво",
    models: [
      { id: "o4xL8M", name: "XC40", russianName: "XC40" },
      { id: "nN2G7R", name: "XC60", russianName: "XC60" },
      { id: "y1Pz8H", name: "XC70", russianName: "XC70" },
      { id: "p9Qw1J", name: "XC90", russianName: "XC90" },
    ],
  },

  b7C8d9: {
    id: "b7C8d9",
    name: "טאטא",
    russianName: "Тата",
    models: [
      { id: "m4U2aQ", name: "סהרה", russianName: "Sahara" },
      { id: "F7s2E1", name: "סומו", russianName: "Sumo" },
      { id: "a9K1pR", name: "סיירה", russianName: "Sierra" },
      { id: "Q3b6X9", name: "ספארי", russianName: "Safari" },
    ],
  },

  e1F2g3: {
    id: "e1F2g3",
    name: "טויוטה",
    russianName: "Тойота",
    models: [
      { id: "Z2p4Qk", name: "4Runner", russianName: "4Runner" },
      { id: "k7A3mP", name: "C-HR", russianName: "C-HR" },
      { id: "w4R9Hc", name: "FJ קרוזר", russianName: "FJ Cruiser" },
      { id: "L8p2Vn", name: "RAV4 החדשה", russianName: "RAV4 New" },
      { id: "s3M9Qa", name: "RAV4 הייבריד", russianName: "RAV4 Hybrid" },
      { id: "N6e1Kx", name: "היילנדר", russianName: "Highlander" },
      { id: "c5T8Jr", name: "וונזה", russianName: "Venza" },
      { id: "P7n2Wd", name: "לנד קרוזר", russianName: "Land Cruiser" },
      { id: "u8H1bQ", name: "לנד קרוזר 70", russianName: "Land Cruiser 70" },
      {
        id: "g3V7pA",
        name: "לנד קרוזר LC100",
        russianName: "Land Cruiser 100",
      },
      { id: "k1Q9sM", name: "לנד קרוזר V8", russianName: "Land Cruiser V8" },
      {
        id: "t4R2eH",
        name: "לנד קרוזר פרדו",
        russianName: "Land Cruiser Prado",
      },
      {
        id: "x9M3aC",
        name: "לנד קרוזר קצר",
        russianName: "Land Cruiser Short",
      },
      { id: "B2n8Qv", name: "סקויה", russianName: "Sequoia" },
      { id: "r7P5kD", name: "ראב 4", russianName: "RAV4" },
    ],
  },

  h4J5k6: {
    id: "h4J5k6",
    name: "טסלה",
    russianName: "Тесла",
    models: [
      { id: "d2Q7sA", name: "מודל X", russianName: "Model X" },
      { id: "Q8m1Vx", name: "סייברטראק", russianName: "Cybertruck" },
    ],
  },

  l7M8n9: {
    id: "l7M8n9",
    name: "יגואר",
    russianName: "Ягуар",
    models: [
      { id: "y7K2pR", name: "E-Pace", russianName: "E-Pace" },
      { id: "P1s8Hq", name: "F-Pace", russianName: "F-Pace" },
      { id: "k9V3bT", name: "I-Pace", russianName: "I-Pace" },
    ],
  },

  o1P2q3: {
    id: "o1P2q3",
    name: "יונדאי",
    russianName: "Хёндэ",
    models: [
      { id: "Q2m9Kp", name: "ix35", russianName: "ix35" },
      { id: "a8R3tV", name: "ix55", russianName: "ix55" },
      { id: "m1P6Hj", name: "גאלופר", russianName: "Galloper" },
      { id: "V7q2Ew", name: "וניו", russianName: "Venue" },
      { id: "n9B4cM", name: "ורה קרוז", russianName: "Veracruz" },
      { id: "t6H1pQ", name: "טאראקן", russianName: "Terracan" },
      { id: "R4m8Aa", name: "טוסון", russianName: "Tucson" },
      { id: "e1K7pZ", name: "סנטה פה", russianName: "Santa Fe" },
      { id: "W2b9Qn", name: "פליסדה", russianName: "Palisade" },
      { id: "p8T1rM", name: "קונה", russianName: "Kona" },
      { id: "H5m2Vq", name: "קונה EV", russianName: "Kona Electric" },
      { id: "s3Q8kA", name: "קונה הייבריד", russianName: "Kona Hybrid" },
    ],
  },

  r4S5t6: {
    id: "r4S5t6",
    name: "יונימוג",
    russianName: "Унимог",
    models: [{ id: "V3q8nM", name: "אחר", russianName: "Другое" }],
  },

  u7V8w9: {
    id: "u7V8w9",
    name: "לאדה",
    russianName: "Лада",
    models: [
      { id: "m8Q2aV", name: "ג`יפ ויליג`", russianName: "Niva Village" },
      { id: "p1K9sR", name: "ג`יפ ניבה", russianName: "Niva" },
    ],
  },

  x1Y2z3: {
    id: "x1Y2z3",
    name: "לינקולן",
    russianName: "Линкольн",
    models: [
      { id: "k3P9mQ", name: "AVIATOR", russianName: "Aviator" },
      { id: "H8q2Vn", name: "MKC", russianName: "MKC" },
      { id: "s2R4pK", name: "MKT", russianName: "MKT" },
      { id: "Q9m1aT", name: "MKX", russianName: "MKX" },
      { id: "b7K3pR", name: "NAVIGATOR", russianName: "Navigator" },
    ],
  },

  a4B5c6: {
    id: "a4B5c6",
    name: "לנדרובר",
    russianName: "Ленд Ровер",
    models: [
      { id: "D9m2Qk", name: "דיסקברי", russianName: "Discovery" },
      {
        id: "n3P7aV",
        name: "דיסקברי (05 ומעלה)",
        russianName: "Discovery (2005+)",
      },
      {
        id: "Q1s8Mm",
        name: "דיסקברי (99-04)",
        russianName: "Discovery (1999–2004)",
      },
      { id: "p4K9Vb", name: "דיסקברי 3", russianName: "Discovery 3" },
      { id: "H2q7mR", name: "דיסקברי 4", russianName: "Discovery 4" },
      { id: "s6P1kT", name: "דיסקברי 5", russianName: "Discovery 5" },
      { id: "V8m2Qp", name: "דיסקברי ספורט", russianName: "Discovery Sport" },
      { id: "t1R9aK", name: "דיפנדר", russianName: "Defender" },
      { id: "m7P3Qn", name: "פרילנדר 1", russianName: "Freelander" },
      { id: "Q3k9pA", name: "פרילנדר 2", russianName: "Freelander 2" },
      {
        id: "b9M2rV",
        name: "ריינג' רובר ספורט",
        russianName: "Range Rover Sport",
      },
      { id: "p5Q1mK", name: "ריינג` רובר", russianName: "Range Rover" },
      {
        id: "H7s2Qm",
        name: "ריינג` רובר איווק",
        russianName: "Range Rover Evoque",
      },
      {
        id: "r8P2mV",
        name: "ריינג` רובר איווק MHEV",
        russianName: "Range Rover Evoque MHEV",
      },
      {
        id: "Q6m9pT",
        name: "ריינג` רובר וולאר",
        russianName: "Range Rover Velar",
      },
    ],
  },

  d7E8f9: {
    id: "d7E8f9",
    name: "לקסוס",
    russianName: "Лексус",
    models: [
      { id: "p9Q2mV", name: "GX460", russianName: "GX 460" },
      { id: "m2P8Qk", name: "GX470", russianName: "GX 470" },
      { id: "Q7m1pT", name: "LX570", russianName: "LX 570" },
      { id: "b4K9mR", name: "NX", russianName: "NX" },
      { id: "H3p7Qm", name: "RX200T", russianName: "RX 200t" },
      { id: "r1Q9mK", name: "RX300", russianName: "RX 300" },
      { id: "V8m2Qp", name: "RX330", russianName: "RX 330" },
      { id: "t7P3Qn", name: "RX350", russianName: "RX 350" },
      { id: "Q4m9pT", name: "RX400H", russianName: "RX 400h" },
      { id: "b6K1mR", name: "RX450H", russianName: "RX 450h" },
      { id: "H9p2Qm", name: "UX", russianName: "UX" },
    ],
  },

  g1H2i3: {
    id: "g1H2i3",
    name: "מאזדה",
    russianName: "Мазда",
    models: [
      { id: "p2Q9mK", name: "CX-07", russianName: "CX-7" },
      { id: "m7P2Qn", name: "CX-09", russianName: "CX-9" },
      { id: "Q9m1pT", name: "CX-3", russianName: "CX-3" },
      { id: "b4K8mR", name: "CX-30", russianName: "CX-30" },
      { id: "H2p7Qm", name: "CX-5", russianName: "CX-5" },
      { id: "r6Q1mK", name: "טריביוט", russianName: "Tribute" },
    ],
  },

  j4K5l6: {
    id: "j4K5l6",
    name: "מוטוקארס",
    russianName: "Мотокарс",
    models: [
      { id: "V2m9Qp", name: "ג`יפ דאסטר", russianName: "Duster" },
      { id: "t8P3Qn", name: "שיפטר", russianName: "Shifter" },
    ],
  },

  m7N8o9: {
    id: "m7N8o9",
    name: "מזראטי",
    russianName: "Мазерати",
    models: [{ id: "Q2m8pT", name: "לבנטה", russianName: "Levante" }],
  },

  p1Q2r3: {
    id: "p1Q2r3",
    name: "מיצובישי",
    russianName: "Мицубиси",
    models: [
      { id: "b7K2mR", name: "ASX", russianName: "ASX" },
      { id: "H1p9Qm", name: "אאוטלנדר", russianName: "Outlander" },
      { id: "r8Q2mK", name: "אאוטלנדר PHEV", russianName: "Outlander PHEV" },
      { id: "V4m9Qp", name: "אאוטלנדר החדשה", russianName: "Outlander New" },
      { id: "t2P7Qn", name: "אקליפס קרוס", russianName: "Eclipse Cross" },
      { id: "Q6m1pT", name: "האנטר", russianName: "Hunter" },
      { id: "b3K9mR", name: "מגנום", russianName: "Magnum" },
      { id: "H9p2Qm", name: "פאג`רו", russianName: "Pajero" },
      { id: "r5Q1mK", name: "פאג`רו ספורט", russianName: "Pajero Sport" },
      { id: "V7m2Qp", name: "קינג ", russianName: "King" },
      { id: "t9P3Qn", name: "קינג החדשה", russianName: "King New" },
    ],
  },

  s4T5u6: {
    id: "s4T5u6",
    name: "מרצדס",
    russianName: "Мерседес",
    models: [
      { id: "Q7m2pT", name: "EQC", russianName: "EQC" },
      { id: "b4K9mR", name: "G CLASS", russianName: "G-Class" },
      { id: "H2p7Qm", name: "GL CLASS", russianName: "GL-Class" },
      { id: "r6Q1mK", name: "GLA", russianName: "GLA" },
      { id: "V2m9Qp", name: "GLB", russianName: "GLB" },
      { id: "t8P3Qn", name: "GLC", russianName: "GLC" },
      { id: "Q2m8pT", name: "GLC-Class קופה", russianName: "GLC Coupe" },
      { id: "b7K2mR", name: "GLE", russianName: "GLE" },
      { id: "H1p9Qm", name: "GLE קופה", russianName: "GLE Coupe" },
      { id: "r8Q2mK", name: "GLK CLASS", russianName: "GLK-Class" },
      { id: "V4m9Qp", name: "GLS CLASS", russianName: "GLS-Class" },
      { id: "t2P7Qn", name: "ML", russianName: "ML" },
      { id: "Q6m1pT", name: "ML CLASS החדשה", russianName: "ML-Class New" },
      { id: "b3K9mR", name: "ג`יפ", russianName: "SUV" },
      { id: "H9p2Qm", name: "יונימוג", russianName: "Unimog" },
    ],
  },

  v7W8x9: {
    id: "v7W8x9",
    name: "ניסאן",
    russianName: "Ниссан",
    models: [
      { id: "r1Q9mK", name: "אינפיניטי", russianName: "Infiniti" },
      { id: "V8m2Qp", name: "איקס טרייל", russianName: "X-Trail" },
      { id: "t7P3Qn", name: "אקס טרה", russianName: "Xterra" },
      { id: "Q4m9pT", name: "ארמדה", russianName: "Armada" },
      { id: "b6K1mR", name: "ג`וק / JUKE", russianName: "Juke" },
      { id: "H3p7Qm", name: "ווינר", russianName: "Vanette" },
      { id: "p9Q2mV", name: "טראנו", russianName: "Terrano" },
      { id: "m2P8Qk", name: "מוראנו", russianName: "Murano" },
      { id: "Q9m1pT", name: "פאת`פיינדר", russianName: "Pathfinder" },
      { id: "b4K8mR", name: "פטרול", russianName: "Patrol" },
      { id: "H2p7Qm", name: "קווסט", russianName: "Quest" },
      { id: "r6Q1mK", name: "קשקאי", russianName: "Qashqai" },
      { id: "V2m9Qp", name: "קשקאי פלוס 2", russianName: "Qashqai+2" },
    ],
  },

  y1Z2a3: {
    id: "y1Z2a3",
    name: "סאנגיונג",
    russianName: "СсангЙонг",
    models: [
      { id: "p4K9Vb", name: "אקטיון", russianName: "Actyon" },
      { id: "H2q7mR", name: "אקטיון ספורט", russianName: "Actyon Sports" },
      { id: "s6P1kT", name: "טיבולי", russianName: "Tivoli" },
      { id: "V8m2Qp", name: "מוסו", russianName: "Musso" },
      { id: "t1R9aK", name: "קורנדו", russianName: "Korando" },
      { id: "m7P3Qn", name: "קיירון", russianName: "Kyron" },
      { id: "Q3k9pA", name: "רודיוס", russianName: "Rodius" },
      { id: "b9M2rV", name: "רקסטון", russianName: "Rexton" },
    ],
  },

  b4C5d6: {
    id: "b4C5d6",
    name: "סובארו",
    russianName: "Субару",
    models: [
      { id: "D9m2Qk", name: "B9 טריבקה", russianName: "B9 Tribeca" },
      { id: "n3P7aV", name: "XV", russianName: "XV" },
      { id: "Q1s8Mm", name: "אאוטבק", russianName: "Outback" },
      { id: "p4K9Vb", name: "אאוטבק החדשה", russianName: "Outback New" },
      { id: "H2q7mR", name: "אבולטיס", russianName: "Evoltis" },
      { id: "s6P1kT", name: "פורסטר", russianName: "Forester" },
      { id: "V8m2Qp", name: "פורסטר החדשה", russianName: "Forester New" },
    ],
  },

  e7F8g9: {
    id: "e7F8g9",
    name: "סוזוקי",
    russianName: "Сузуки",
    models: [
      { id: "t1R9aK", name: "SX4 קרוסאובר", russianName: "SX4 Crossover" },
      { id: "m7P3Qn", name: "X90", russianName: "X-90" },
      { id: "Q3k9pA", name: "XL7", russianName: "XL7" },
      { id: "b9M2rV", name: "איגניס", russianName: "Ignis" },
      { id: "p5Q1mK", name: "ג`ימני", russianName: "Jimny" },
      { id: "H7s2Qm", name: "גרנד ויטרה", russianName: "Grand Vitara" },
      {
        id: "r8P2mV",
        name: "גרנד ויטרה החדשה",
        russianName: "Grand Vitara New",
      },
      { id: "Q6m9pT", name: "ויטרה", russianName: "Vitara" },
      { id: "b7K3pR", name: "סמוראי", russianName: "Samurai" },
    ],
  },

  h1J2k3: {
    id: "h1J2k3",
    name: "סופה",
    russianName: "Супра",
    models: [
      { id: "Q8m2Vx", name: "ג`יפ", russianName: "Джип" },
      { id: "d2Q7sA", name: "סגור", russianName: "Закрытый" },
      { id: "p1K9sR", name: "פתוח", russianName: "Открытый" },
    ],
  },

  l4M5n6: {
    id: "l4M5n6",
    name: "סיאט",
    russianName: "Сеат",
    models: [
      { id: "m4U2aQ", name: "אטקה", russianName: "Ateca" },
      { id: "F7s2E1", name: "ארונה", russianName: "Arona" },
      { id: "a9K1pR", name: "קופרה אטקה", russianName: "Cupra Ateca" },
    ],
  },

  o7P8q9: {
    id: "o7P8q9",
    name: "סיטרואן",
    russianName: "Ситроен",
    models: [
      { id: "Q3b6X9", name: "C קרוסר", russianName: "C-Crosser" },
      { id: "Z2p4Qk", name: "C5 איירקרוס", russianName: "C5 Aircross" },
    ],
  },

  r1S2t3: {
    id: "r1S2t3",
    name: "סקודה",
    russianName: "Шкода",
    models: [
      { id: "k7A3mP", name: "ייטי / Yeti", russianName: "Yeti" },
      { id: "w4R9Hc", name: "קאמיק", russianName: "Kamiq" },
      { id: "L8p2Vn", name: "קארוק", russianName: "Karoq" },
      { id: "s3M9Qa", name: "קודיאק", russianName: "Kodiaq" },
    ],
  },

  u4V5w6: {
    id: "u4V5w6",
    name: "סקייוול",
    russianName: "Skywell",
    models: [{ id: "N6e1Kx", name: "ET5", russianName: "ET5" }],
  },

  x7Y8z9: {
    id: "x7Y8z9",
    name: "סרס",
    russianName: "Seres",
    models: [
      { id: "c5T8Jr", name: "5", russianName: "Seres 5" },
      { id: "P7n2Wd", name: "EV-3", russianName: "Seres EV3" },
    ],
  },

  a2B3c4: {
    id: "a2B3c4",
    name: "פולקסווגן",
    russianName: "Фольксваген",
    models: [
      { id: "u8H1bQ", name: "T-CROSS", russianName: "T-Cross" },
      { id: "g3V7pA", name: "T-ROC", russianName: "T-Roc" },
      { id: "k1Q9sM", name: "אטלס", russianName: "Atlas" },
      { id: "t4R2eH", name: "טוארג", russianName: "Touareg" },
      { id: "x9M3aC", name: "טוארג החדש", russianName: "Touareg New" },
      { id: "B2n8Qv", name: "טיגואן", russianName: "Tiguan" },
    ],
  },

  d5E6f7: {
    id: "d5E6f7",
    name: "פורד",
    russianName: "Форд",
    models: [
      { id: "r7P5kD", name: "Excursion", russianName: "Excursion" },
      { id: "Z2p4Qk", name: "MACH-E", russianName: "Mustang Mach-E" },
      { id: "k7A3mP", name: "אדג` / EDGE", russianName: "Edge" },
      { id: "w4R9Hc", name: "אסקייפ", russianName: "Escape" },
      { id: "L8p2Vn", name: "אקספדישן", russianName: "Expedition" },
      { id: "s3M9Qa", name: "אקספלורר", russianName: "Explorer" },
      { id: "N6e1Kx", name: "ברונקו", russianName: "Bronco" },
      { id: "c5T8Jr", name: "לינקולן MKC", russianName: "Lincoln MKC" },
      { id: "P7n2Wd", name: "לינקולן MKT", russianName: "Lincoln MKT" },
      { id: "u8H1bQ", name: "פומה", russianName: "Puma" },
      { id: "g3V7pA", name: "קוגה", russianName: "Kuga" },
    ],
  },

  g8H9i1: {
    id: "g8H9i1",
    name: "פורשה",
    russianName: "Порше",
    models: [
      { id: "k1Q9sM", name: "מקאן", russianName: "Macan" },
      { id: "t4R2eH", name: "מקאן GTS", russianName: "Macan GTS" },
      { id: "x9M3aC", name: "קאיין", russianName: "Cayenne" },
      { id: "B2n8Qv", name: "קאיין טורבו", russianName: "Cayenne Turbo" },
    ],
  },

  j2K3l4: {
    id: "j2K3l4",
    name: "פיאט",
    russianName: "Фиат",
    models: [
      { id: "r7P5kD", name: "500X", russianName: "500X" },
      { id: "Z2p4Qk", name: "סדיצ`י", russianName: "Sedici" },
    ],
  },

  m5N6o7: {
    id: "m5N6o7",
    name: "פיג'ו",
    russianName: "Пежо",
    models: [
      { id: "k7A3mP", name: "3008", russianName: "3008" },
      { id: "w4R9Hc", name: "5008", russianName: "5008" },
    ],
  },

  p8Q9r1: {
    id: "p8Q9r1",
    name: "צ`רי",
    russianName: "Chery",
    models: [
      { id: "L8p2Vn", name: "FX", russianName: "FX" },
      { id: "s3M9Qa", name: "TIGGO 7 Pro", russianName: "Tiggo 7 Pro" },
      { id: "N6e1Kx", name: "TIGGO 8 Pro", russianName: "Tiggo 8 Pro" },
    ],
  },

  s2T3u4: {
    id: "s2T3u4",
    name: "קאדילק",
    russianName: "Кадиллак",
    models: [
      { id: "c5T8Jr", name: "SRX", russianName: "SRX" },
      { id: "P7n2Wd", name: "XT4", russianName: "XT4" },
      { id: "u8H1bQ", name: "XT5", russianName: "XT5" },
      { id: "g3V7pA", name: "XT6", russianName: "XT6" },
      { id: "k1Q9sM", name: "אחר", russianName: "Другое" },
      { id: "t4R2eH", name: "אסקלייד", russianName: "Escalade" },
    ],
  },

  v5W6x7: {
    id: "v5W6x7",
    name: "קופרה",
    russianName: "Купра",
    models: [{ id: "x9M3aC", name: "אטקה", russianName: "Ateca" }],
  },

  y8Z9a1: {
    id: "y8Z9a1",
    name: "קיה",
    russianName: "Киа",
    models: [
      { id: "B2n8Qv", name: "בורנגו", russianName: "Borrego" },
      { id: "r7P5kD", name: "טלורייד", russianName: "Telluride" },
      { id: "Z2p4Qk", name: "נירו EV", russianName: "Niro EV" },
      { id: "k7A3mP", name: "נירו הייבריד", russianName: "Niro Hybrid" },
      { id: "w4R9Hc", name: "סול", russianName: "Soul" },
      { id: "L8p2Vn", name: "סורנטו", russianName: "Sorento" },
      { id: "s3M9Qa", name: "סטוניק", russianName: "Stonic" },
      { id: "N6e1Kx", name: "סלטוס", russianName: "Seltos" },
      { id: "c5T8Jr", name: "ספורטאז`", russianName: "Sportage" },
    ],
  },

  b2C3d4: {
    id: "b2C3d4",
    name: "קרייזלר",
    russianName: "Крайслер",
    models: [
      { id: "P7n2Wd", name: "ג`יפ", russianName: "Jeep" },
      {
        id: "u8H1bQ",
        name: "גרנד צ`ירוקי החדשה",
        russianName: "Grand Cherokee New",
      },
      { id: "g3V7pA", name: "צ`יורקי ליברטי", russianName: "Cherokee Liberty" },
      { id: "k1Q9sM", name: "קומפאס", russianName: "Compass" },
      { id: "t4R2eH", name: "רנגלר", russianName: "Wrangler" },
    ],
  },

  e5F6g7: {
    id: "e5F6g7",
    name: "רנו",
    russianName: "Рено",
    models: [
      { id: "x9M3aC", name: "RX4", russianName: "RX4" },
      { id: "B2n8Qv", name: "קדג`אר", russianName: "Kadjar" },
      { id: "r7P5kD", name: "קולאוס", russianName: "Koleos" },
    ],
  },

  h8J9k1: {
    id: "h8J9k1",
    name: "שברולט",
    russianName: "Шевроле",
    models: [
      { id: "Z2p4Qk", name: "אפלנדר", russianName: "Uplander" },
      { id: "k7A3mP", name: "בלייזר", russianName: "Blazer" },
      {
        id: "w4R9Hc",
        name: "בלייזר החדשה (מ-2019)",
        russianName: "Blazer (2019+)",
      },
      { id: "L8p2Vn", name: "טאהו / יוקון", russianName: "Tahoe" },
      { id: "s3M9Qa", name: "טראוורס", russianName: "Traverse" },
      { id: "N6e1Kx", name: "טראקס", russianName: "Trax" },
      { id: "c5T8Jr", name: "טרייל בלייזר", russianName: "TrailBlazer" },
      { id: "P7n2Wd", name: "סוברבן", russianName: "Suburban" },
      { id: "u8H1bQ", name: "סרבס 3.6", russianName: "Traverse 3.6" },
      { id: "g3V7pA", name: "קפטיבה", russianName: "Captiva" },
    ],
  },
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;
