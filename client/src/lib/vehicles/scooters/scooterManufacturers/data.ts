import {
  ScooterManufacturer,
  ScooterManufacturerId,
} from "./types/scooterManufacturer.schema";

export const scooterManufacturersMap = {
  CPI001: {
    id: "CPI001",
    name: "CPI",
    russianName: "Си-Пи-Ай / CPI",
    models: [
      { id: "M40001", name: "אחר", russianName: "Другое" },
      {
        id: "M40002",
        name: "אראגון 125",
        russianName: "Арагон 125 / Aragon 125",
      },
      {
        id: "M40003",
        name: "הוסאר 125",
        russianName: "Хусар 125 / Hussar 125",
      },
      { id: "M40004", name: "הוסאר 50", russianName: "Хусар 50 / Hussar 50" },
      { id: "M40005", name: "מארס 50", russianName: "Марс 50 / Mars 50" },
      { id: "M40006", name: "קינג 125", russianName: "Кинг 125 / King 125" },
    ],
  },

  EVT002: {
    id: "EVT002",
    name: "EVT",
    russianName: "ЭВТ / EVT",
    models: [
      { id: "M40007", name: "168 רטרו", russianName: "168 Ретро / Retro" },
      { id: "M40008", name: "345 תלת", russianName: "345 Трайк / Trike" },
      { id: "M40009", name: "אחר", russianName: "Другое" },
      { id: "M40010", name: "E4000", russianName: "E4000" },
    ],
  },

  FYM003: {
    id: "FYM003",
    name: "FYM",
    russianName: "ФИМ / FYM",
    models: [
      { id: "M40011", name: "125T-13", russianName: "125T-13" },
      { id: "M40012", name: "125T-15", russianName: "125T-15" },
      { id: "M40013", name: "125T-18", russianName: "125T-18" },
      { id: "M40014", name: "150T-18", russianName: "150T-18" },
      { id: "M40015", name: "אחר", russianName: "Другое" },
    ],
  },

  GMI004: {
    id: "GMI004",
    name: "GMI",
    russianName: "Джи-Эм-Ай / GMI",
    models: [
      { id: "M40016", name: "Runner", russianName: "Раннер / Runner" },
      { id: "M40017", name: "אחר", russianName: "Другое" },
    ],
  },

  LML005: {
    id: "LML005",
    name: "LML Italia",
    russianName: "ЛМЛ / LML Italia",
    models: [
      {
        id: "M40018",
        name: "STAR 2T 125",
        russianName: "Стар 2T 125 / Star 2T 125",
      },
      {
        id: "M40019",
        name: "STAR AUTOMATICA 125",
        russianName: "Стар Автоматика 125 / Star Automatica 125",
      },
      {
        id: "M40020",
        name: "STAR DELUX 125",
        russianName: "Стар Делюкс 125 / Star Delux 125",
      },
      {
        id: "M40021",
        name: "STAR DELUX 200",
        russianName: "Стар Делюкс 200 / Star Delux 200",
      },
      { id: "M40022", name: "אחר", russianName: "Другое" },
    ],
  },

  NIU006: {
    id: "NIU006",
    name: "NIU NQI",
    russianName: "Нью NQi / NIU NQi",
    models: [{ id: "M40023", name: "GT Pro", russianName: "ГТ Про / GT Pro" }],
  },

  PGO007: {
    id: "PGO007",
    name: "PGO",
    russianName: "ПиДжиО / PGO",
    models: [
      { id: "M40024", name: "אחר", russianName: "Другое" },
      {
        id: "M40025",
        name: "ג'י-מקס 125",
        russianName: "Джи-Макс 125 / G-Max 125",
      },
      {
        id: "M40026",
        name: "ג'י-מקס 250",
        russianName: "Джи-Макс 250 / G-Max 250",
      },
      {
        id: "M40027",
        name: "טי-רקס 125",
        russianName: "Ти-Рекс 125 / T-Rex 125",
      },
      {
        id: "M40028",
        name: "ליגרו 125",
        russianName: "Лигеро 125 / Ligero 125",
      },
      { id: "M40029", name: "סטאר", russianName: "Стар / Star" },
      { id: "M40030", name: "קומט", russianName: "Комет / Comet" },
    ],
  },

  TGB008: {
    id: "TGB008",
    name: "TGB",
    russianName: "ТиДжиБи / TGB",
    models: [
      { id: "M40031", name: "R101 125", russianName: "R101 125" },
      { id: "M40032", name: "R303 150", russianName: "R303 150" },
      { id: "M40033", name: "R50X", russianName: "R50X" },
      { id: "M40034", name: "RS303 125", russianName: "RS303 125" },
      { id: "M40035", name: "T202 125", russianName: "T202 125" },
      {
        id: "M40036",
        name: "X-Motion 125",
        russianName: "Икс-Моушн 125 / X-Motion 125",
      },
      {
        id: "M40037",
        name: "X-Motion 250",
        russianName: "Икс-Моушн 250 / X-Motion 250",
      },
      {
        id: "M40038",
        name: "X-Motion 300",
        russianName: "Икс-Моушн 300 / X-Motion 300",
      },
      { id: "M40039", name: "אחר", russianName: "Другое" },
      {
        id: "M40040",
        name: "אקספרס 125",
        russianName: "Экспресс 125 / Express 125",
      },
      {
        id: "M40041",
        name: "אקרוס טק 50",
        russianName: "Акрос Тек 50 / A-Cross Tech 50",
      },
      { id: "M40042", name: "אראגון 50", russianName: "Арагон 50 / Aragon 50" },
      { id: "M40043", name: "בולט 125", russianName: "Болт 125 / Bolt 125" },
      {
        id: "M40044",
        name: "דליברי 125",
        russianName: "Деливери 125 / Delivery 125",
      },
      {
        id: "M40045",
        name: "דליברי 50",
        russianName: "Деливери 50 / Delivery 50",
      },
      { id: "M40046", name: "הוק 125", russianName: "Хок 125 / Hook 125" },
    ],
  },

  UM0009: {
    id: "UM0009",
    name: "UM",
    russianName: "ЮЭм / UM",
    models: [
      { id: "M40047", name: "Chill 125", russianName: "Чилл 125 / Chill 125" },
    ],
  },

  OTHR10: {
    id: "OTHR10",
    name: "אחר",
    russianName: "Другое",
    models: [{ id: "M40048", name: "אחר", russianName: "Другое" }],
  },
  IMAX01: {
    id: "IMAX01",
    name: "אי-מקס קטנועים חשמליים",
    russianName: "Ай-Макс / I-Max (электроскутеры)",
    models: [
      { id: "A1S110", name: "S110", russianName: "S110" },
      { id: "A1S090", name: "S90", russianName: "S90" },
      { id: "A1VX1I", name: "VX100i", russianName: "VX100i" },
      { id: "A1VX1S", name: "VX100S", russianName: "VX100S" },
      { id: "A1OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 12) אפריליה
  APR001: {
    id: "APR001",
    name: "אפריליה",
    russianName: "Априлия / Aprilia",
    models: [
      { id: "B2AREA", name: "AREA51", russianName: "Ареа 51 / Area 51" },
      { id: "B2RSRC", name: "RS RACING", russianName: "RS Racing" },
      { id: "B2RS50", name: "RS50", russianName: "RS 50" },
      { id: "B2SRAC", name: "SR AC 50", russianName: "SR 50 AC" },
      { id: "B2SRLC", name: "SR LC 50", russianName: "SR 50 LC" },
      { id: "B2SRV8", name: "SRV850", russianName: "SRV 850" },
      { id: "B2OTHR", name: "אחר", russianName: "Другое" },
      {
        id: "B2GOLI",
        name: "גוליבר 50",
        russianName: "Гулливер 50 / Gulliver 50",
      },
      {
        id: "B2LEO1",
        name: "לאונרדו 150",
        russianName: "Леонардо 150 / Leonardo 150",
      },
      { id: "B2SONI", name: "סוניק 50", russianName: "Соник 50 / Sonic 50" },
      {
        id: "B2SCRA",
        name: "סקראבאו 50",
        russianName: "Скарабей 50 / Scarabeo 50",
      },
      {
        id: "B2RALAC",
        name: "ראלי 50 AC",
        russianName: "Ралли 50 AC / Rally 50 AC",
      },
      {
        id: "B2RALLC",
        name: "ראלי 50 LC",
        russianName: "Ралли 50 LC / Rally 50 LC",
      },
    ],
  },

  // 13) ב.מ.וו
  BMW001: {
    id: "BMW001",
    name: "ב.מ.וו",
    russianName: "БМВ / BMW",
    models: [
      { id: "C3C600", name: "C 600 ספורט", russianName: "C 600 Sport" },
      { id: "C3C650", name: "C 650 GT", russianName: "C 650 GT" },
      { id: "C3C120", name: "C1 200", russianName: "C1 200" },
      { id: "C3C6SP", name: "C650 SPORT", russianName: "C 650 Sport" },
      { id: "C3OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 14) בטה
  BETA01: {
    id: "BETA01",
    name: "בטה",
    russianName: "Бета / Beta",
    models: [
      { id: "D4RR00", name: "RR", russianName: "RR" },
      { id: "D4OTHR", name: "אחר", russianName: "Другое" },
      { id: "D4ALPH", name: "אלף", russianName: "Альфа / Alpha" },
      { id: "D4ARK", name: "ארק", russianName: "Арк / Ark" },
    ],
  },

  // 15) בליץ מוטורס - קטנועים חשמליים
  BLTZ01: {
    id: "BLTZ01",
    name: "בליץ מוטורס - קטנועים חשמליים",
    russianName: "Блиц Моторс (электроскутеры) / Blitz Motors",
    models: [
      { id: "E5RR00", name: "RR", russianName: "RR" },
      { id: "E5OT01", name: "אחר", russianName: "Другое" },
      { id: "E5ALPH", name: "אלף", russianName: "Альфа / Alpha" },
      { id: "E5ARK", name: "ארק", russianName: "Арк / Ark" },
      { id: "E5OT02", name: "אחר", russianName: "Другое" },
      {
        id: "E5BL3K",
        name: "בליץ 3000",
        russianName: "Блиц 3000 / Blitz 3000",
      },
      {
        id: "E5BL6K",
        name: "בליץ 6000",
        russianName: "Блиц 6000 / Blitz 6000",
      },
    ],
  },

  // 16) בנלי
  BEN001: {
    id: "BEN001",
    name: "בנלי",
    russianName: "Бенелли / Benelli",
    models: [
      {
        id: "F6AD12",
        name: "אדיבה 125",
        russianName: "Аддива 125 / Adiva 125",
      },
      {
        id: "F6AD15",
        name: "אדיבה 150",
        russianName: "Аддива 150 / Adiva 150",
      },
      { id: "F6OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 17) ג`ילרה
  GIL001: {
    id: "GIL001",
    name: "ג`ילרה",
    russianName: "Джилера / Gilera",
    models: [
      { id: "G7GP80", name: "GP800", russianName: "GP 800" },
      { id: "G7ICE5", name: "ICE 50", russianName: "Айc 50 / ICE 50" },
      { id: "G7VXR0", name: "VXR", russianName: "VXR" },
      { id: "G7OTHR", name: "אחר", russianName: "Другое" },
      {
        id: "G7N300",
        name: "נקסוס 300",
        russianName: "Нексус 300 / Nexus 300",
      },
      {
        id: "G7N500",
        name: "נקסוס 500",
        russianName: "Нексус 500 / Nexus 500",
      },
      { id: "G7ST50", name: "סטוקר 50", russianName: "Стокер 50 / Stalker 50" },
      { id: "G7FU50", name: "פוקו 500", russianName: "Фуоко 500 / Fuoco 500" },
      { id: "G7RN50", name: "ראנר 50", russianName: "Раннер 50 / Runner 50" },
      {
        id: "G7RV12",
        name: "ראנר VX 125",
        russianName: "Раннер VX 125 / Runner VX 125",
      },
      {
        id: "G7RV18",
        name: "ראנר VXR 180/200",
        russianName: "Раннер VXR 180/200 / Runner VXR",
      },
    ],
  },

  // 18) גוגורו
  GOGO01: {
    id: "GOGO01",
    name: "גוגורו",
    russianName: "Гогоро / Gogoro",
    models: [
      { id: "H8DELI", name: "Delight", russianName: "Делайт / Delight" },
      { id: "H8PLS2", name: "PLUS 2", russianName: "Плюс 2 / Plus 2" },
      { id: "H8PULSE", name: "PULSE", russianName: "Пульс / Pulse" },
      { id: "H8S1", name: "S1", russianName: "S1" },
      { id: "H8S2A", name: "S2 ABS", russianName: "S2 ABS" },
      { id: "H8VMIX", name: "VIVA MIX", russianName: "Вива Микс / Viva Mix" },
      { id: "H8VXL", name: "VIVA XL", russianName: "Вива XL / Viva XL" },
    ],
  },

  // 19) דיאלים
  DIAL01: {
    id: "DIAL01",
    name: "דיאלים",
    russianName: "Дайлим / Daelim",
    models: [
      { id: "J9ARO", name: "Aroma 125", russianName: "Арома 125 / Aroma 125" },
      {
        id: "J9BBON",
        name: "B-bone 125",
        russianName: "Би-Боун 125 / B-Bone 125",
      },
      { id: "J9DART", name: "Dart 125", russianName: "Дарт 125 / Dart 125" },
      { id: "J9QL12", name: "QL 125", russianName: "QL 125" },
      { id: "J9QL12A", name: "QL 125 A", russianName: "QL 125 A" },
      { id: "J9S112", name: "S1 125", russianName: "S1 125" },
      { id: "J9S312", name: "S3 125", russianName: "S3 125" },
      { id: "J9S3A25", name: "S3 Advance 250", russianName: "S3 Advance 250" },
      { id: "J9OTHR", name: "אחר", russianName: "Другое" },
      {
        id: "J9LIB50",
        name: "ליברטי 50",
        russianName: "Либерти 50 / Liberty 50",
      },
      {
        id: "J9MSG50",
        name: "מסג` 50",
        russianName: "Месседж 50 / Message 50",
      },
      {
        id: "J9STZ12",
        name: "סטיזר 125",
        russianName: "Стизер 125 / Steezer 125",
      },
    ],
  },

  // 20) דיבלאסי
  DIB001: {
    id: "DIB001",
    name: "דיבלאסי",
    russianName: "Диблази / Di Blasi",
    models: [
      { id: "K0R7E", name: "R7E", russianName: "R7E (электро)" },
      { id: "K0OTHR", name: "אחר", russianName: "Другое" },
    ],
  },
  DER001: {
    id: "DER001",
    name: "דרבי",
    russianName: "Дерби / Derbi",
    models: [
      { id: "A1GP50", name: "GP1 50", russianName: "GP1 50" },
      { id: "A1GPRR", name: "GPR50R", russianName: "GPR 50R" },
      { id: "A1OTHR", name: "אחר", russianName: "Другое" },
      {
        id: "A1ATL5",
        name: "אטלנטיס 50",
        russianName: "Атлантис 50 / Atlantis 50",
      },
      { id: "A1BLVD", name: "בולוורד", russianName: "Бульвар / Boulevard" },
      { id: "A1VAMOS", name: "ואמוס", russianName: "Вамос / Vamos" },
      { id: "A1SNDA", name: "סנדה 50", russianName: "Сенда 50 / Senda 50" },
      {
        id: "A1PRED",
        name: "פרדטור 50",
        russianName: "Предатор 50 / Predator 50",
      },
      {
        id: "A1CRVR",
        name: "קורייר ואריאנט",
        russianName: "Курьер Вариант / Courier Variant",
      },
      {
        id: "A1CRR5",
        name: "קורייר/רבולושן 50",
        russianName: "Курьер / Революшн 50 / Courier Revolution 50",
      },
      {
        id: "A1RDBL",
        name: "רד-בולט 50",
        russianName: "Ред Болт 50 / Red Bolt 50",
      },
    ],
  },

  // 22) הונדה
  HON001: {
    id: "HON001",
    name: "הונדה",
    russianName: "Хонда / Honda",
    models: [
      { id: "B2AT12", name: "125@", russianName: "@125" },
      { id: "B2AT15", name: "150@", russianName: "@150" },
      { id: "B2ADV3", name: "ADV350", russianName: "ADV 350" },
      { id: "B2CH25", name: "CH-250", russianName: "CH 250" },
      { id: "B2CN25", name: "CN250", russianName: "CN 250 Helix" },
      { id: "B2CRM", name: "CRM", russianName: "CRM" },
      { id: "B2FORZ", name: "FORZA", russianName: "Форза / Forza" },
      {
        id: "B2INT7",
        name: "Integra 700",
        russianName: "Интегра 700 / Integra 700",
      },
      {
        id: "B2INT75",
        name: "Integra 750",
        russianName: "Интегра 750 / Integra 750",
      },
      { id: "B2JAZZ", name: "Jazz", russianName: "Джазз / Jazz" },
      { id: "B2LEAD", name: "LEAD", russianName: "Лид / Lead" },
      { id: "B2NES", name: "NES", russianName: "NES" },
      { id: "B2PCX1", name: "PCX125", russianName: "PCX 125" },
      { id: "B2PS12", name: "PS125i", russianName: "PS 125i" },
      { id: "B2PS15", name: "PS150i", russianName: "PS 150i" },
      { id: "B2S8RX", name: "S8RX/S 50", russianName: "S8RX/S 50" },
      { id: "B2SH50", name: "SH 50", russianName: "SH 50" },
      { id: "B2SHMD", name: "SH MODE", russianName: "SH Mode" },
      { id: "B2SH12D", name: "SH125 דיסק", russianName: "SH 125 (диск)" },
      { id: "B2SH125", name: "SH125", russianName: "SH 125" },
      { id: "B2SH12I", name: "SH125i", russianName: "SH 125i" },
      { id: "B2SH150", name: "SH150", russianName: "SH 150" },
      { id: "B2SH300", name: "SH300", russianName: "SH 300" },
      { id: "B2SH30I", name: "SH300i", russianName: "SH 300i" },
      { id: "B2SW40", name: "SW400T", russianName: "SW-T 400" },
      { id: "B2SWING", name: "S-WING 125", russianName: "S-Wing 125" },
      { id: "B2X8R", name: "x8r", russianName: "X8R" },
      { id: "B2X8RS", name: "X8RX/S 50", russianName: "X8RX/S 50" },
      { id: "B2XADV", name: "X-ADV", russianName: "X-ADV" },
      { id: "B2ZX50", name: "zx50", russianName: "ZX 50" },
      { id: "B2OTHR", name: "אחר", russianName: "Другое" },
      {
        id: "B2INNO",
        name: "אינובה 125",
        russianName: "Иннова 125 / Innova 125",
      },
      { id: "B2BALI", name: "באלי 50", russianName: "Бали 50 / Bali 50" },
      { id: "B2JZ25", name: "ג'אז 250", russianName: "Джазз 250 / Jazz 250" },
      {
        id: "B2GYRX",
        name: "ג'יירו X 50",
        russianName: "Джайро X 50 / Gyro X 50",
      },
      { id: "B2DY12", name: "דילן 125", russianName: "Дилан 125 / Dylan 125" },
      { id: "B2DY15", name: "דילן 150", russianName: "Дилан 150 / Dylan 150" },
      { id: "B2VIS1", name: "ויז'ן 110", russianName: "Вижн 110 / Vision 110" },
      { id: "B2ZOOM", name: "זומר", russianName: "Зумер / Zoomer" },
      { id: "B2LD10", name: "ליד 100", russianName: "Лид 100 / Lead 100" },
      {
        id: "B2NLD1",
        name: "ניו ליד 110",
        russianName: "Нью Лид 110 / New Lead 110",
      },
      {
        id: "B2SD50",
        name: "סופר דיו 50",
        russianName: "Супер Дио 50 / Super Dio 50",
      },
      {
        id: "B2SC50",
        name: "סופר קאב 50",
        russianName: "Супер Каб 50 / Super Cub 50",
      },
      {
        id: "B2SW40",
        name: "סילבר-ווינג 400",
        russianName: "Сильвер Винг 400 / Silver Wing 400",
      },
      {
        id: "B2SW60",
        name: "סילבר-ווינג 600",
        russianName: "Сильвер Винг 600 / Silver Wing 600",
      },
      {
        id: "B2SP12",
        name: "ספייסי 125",
        russianName: "Спейси 125 / Spacy 125",
      },
      { id: "B2SK50", name: "סקיי 50", russianName: "Скай 50 / Sky 50" },
      { id: "B2FZ25", name: "פורזה 250", russianName: "Форза 250 / Forza 250" },
      { id: "B2FZ35", name: "פורזה 350", russianName: "Форза 350 / Forza 350" },
      { id: "B2FZ75", name: "פורזה 750", russianName: "Форза 750 / Forza 750" },
      { id: "B2NSS3", name: "פורזה NSS300", russianName: "Forza NSS300" },
      {
        id: "B2FS25",
        name: "פורסייט 250",
        russianName: "Форсайт 250 / Foresight 250",
      },
      {
        id: "B2PN12",
        name: "פנתאון 125",
        russianName: "Пантеон 125 / Pantheon 125",
      },
      {
        id: "B2PN15T",
        name: "פנתאון 150 2 פעימות",
        russianName: "Пантеон 150 2T",
      },
      {
        id: "B2PN15F",
        name: "פנתאון 150 4 פעימות",
        russianName: "Пантеон 150 4T",
      },
    ],
  },

  // 23) וקטריקס
  VEC001: {
    id: "VEC001",
    name: "וקטריקס",
    russianName: "Вектрикс / Vectrix",
    models: [
      { id: "C3VX1", name: "VX-1", russianName: "VX-1" },
      { id: "C3OTHR", name: "אחר", russianName: "Другое" },
      { id: "C3VEC", name: "וקטריקס", russianName: "Vectrix" },
    ],
  },

  // 24) זאפ - קטנועים חשמליים
  ZAP001: {
    id: "ZAP001",
    name: "זאפ - קטנועים חשמליים",
    russianName: "Зап (электроскутеры) / ZAP",
    models: [
      { id: "D4P4K", name: "PULSE 4000W", russianName: "Pulse 4000W" },
      { id: "D4P5K", name: "PULSE 5000W", russianName: "Pulse 5000W" },
      { id: "D4PUS", name: "PUMA-S 9900W", russianName: "Puma-S 9900W" },
      { id: "D4PUX", name: "PUMA-X 9900W", russianName: "Puma-X 9900W" },
    ],
  },

  // 25) זונגשן
  ZONG01: {
    id: "ZONG01",
    name: "זונגשן",
    russianName: "Зонгшен / Zongshen",
    models: [
      { id: "E5F50", name: "FOTURA 50", russianName: "Фотура 50 / Fotura 50" },
      { id: "E5ZS7", name: "ZS125T-7", russianName: "ZS125T-7" },
      { id: "E5OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 26) זנן
  ZNEN01: {
    id: "ZNEN01",
    name: "זנן",
    russianName: "Знен / Znen",
    models: [
      { id: "F6ZN18", name: "ZN125T-18", russianName: "ZN125T-18" },
      { id: "F6ZN19", name: "ZN125T-19", russianName: "ZN125T-19" },
      { id: "F6ZN24", name: "ZN125T-24", russianName: "ZN125T-24" },
      { id: "F6ZNE", name: "ZN125T-E", russianName: "ZN125T-E" },
      { id: "F6ZNF", name: "ZN125T-F", russianName: "ZN125T-F" },
      { id: "F6OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 27) יוסאנג
  HYOS01: {
    id: "HYOS01",
    name: "יוסאנג",
    russianName: "Хёсунг / Hyosung",
    models: [
      { id: "G7MS12", name: "MS3-125", russianName: "MS3 125" },
      { id: "G7MS25", name: "MS3-250", russianName: "MS3 250" },
      { id: "G7MSDL", name: "MS3-250DLX", russianName: "MS3 250 DLX" },
      { id: "G7SFB", name: "SFB50B", russianName: "SFB 50B" },
      { id: "G7OTHR", name: "אחר", russianName: "Другое" },
      { id: "G7BVR", name: "ביבר 125", russianName: "Бивер 125 / Beaver 125" },
    ],
  },

  // 28) ימאהה
  YAM001: {
    id: "YAM001",
    name: "ימאהה",
    russianName: "Ямаха / Yamaha",
    models: [
      { id: "H8BW12", name: "BW's 125", russianName: "BW’s 125" },
      { id: "H8BW50", name: "BW's 50", russianName: "BW’s 50" },
      {
        id: "H8DL15",
        name: "Delight 115",
        russianName: "Делайт 115 / Delight 115",
      },
      { id: "H8DT50", name: "DT50/SM", russianName: "DT 50 SM" },
      { id: "H8FL15", name: "Fly One 150", russianName: "Fly One 150" },
      { id: "H8JOG", name: "JOG 50", russianName: "Джог 50 / Jog 50" },
      { id: "H8NEO", name: "Neo's 50", russianName: "Неос 50 / Neo’s 50" },
      { id: "H8NMAX", name: "NMAX", russianName: "NMAX" },
      { id: "H8NMX1", name: "NMAX 125", russianName: "NMAX 125" },
      { id: "H8SPY", name: "Spy 50", russianName: "Спай 50 / Spy 50" },
      { id: "H8TMAXN", name: "THE NEW TMAX", russianName: "TMAX (новый)" },
      {
        id: "H8XMN1",
        name: "THE NEW XMAX 125",
        russianName: "XMAX 125 (новый)",
      },
      { id: "H8TM50", name: "T-Max 500", russianName: "TMAX 500" },
      { id: "H8TM5B", name: "T-Max 500 Black", russianName: "TMAX 500 Black" },
      { id: "H8TM5W", name: "T-Max 500 White", russianName: "TMAX 500 White" },
      { id: "H8TM53", name: "T-Max 530", russianName: "TMAX 530" },
      { id: "H8TM56", name: "T-Max 560", russianName: "TMAX 560" },
      { id: "H8TM5T", name: "Tmax 560 Tech", russianName: "TMAX 560 Tech" },
      { id: "H8TMDX", name: "TMAX DX", russianName: "TMAX DX" },
      { id: "H8TMSX", name: "TMAX SX", russianName: "TMAX SX" },
      {
        id: "H8TR15",
        name: "TRICITY 155",
        russianName: "Трисити 155 / Tricity 155",
      },
      { id: "H8XCT1", name: "X-City 125", russianName: "X-City 125" },
      { id: "H8XCT2", name: "X-City 250", russianName: "X-City 250" },
      { id: "H8XM12", name: "X-Max 125", russianName: "XMAX 125" },
      { id: "H8XM1B", name: "X-Max 125 Black", russianName: "XMAX 125 Black" },
      { id: "H8XM1S", name: "X-Max 125 Sport", russianName: "XMAX 125 Sport" },
      { id: "H8XM25", name: "X-Max 250", russianName: "XMAX 250" },
      { id: "H8XM2B", name: "X-Max 250 Black", russianName: "XMAX 250 Black" },
      { id: "H8XM2S", name: "X-Max 250 Sport", russianName: "XMAX 250 Sport" },
      { id: "H8XM30", name: "X-MAX 300", russianName: "XMAX 300" },
      { id: "H8XM3T", name: "X-Max 300 Tech", russianName: "XMAX 300 Tech" },
      { id: "H8XM40", name: "X-Max 400", russianName: "XMAX 400" },
      { id: "H8XT35", name: "XT350", russianName: "XT 350" },
      { id: "H8OTHR", name: "אחר", russianName: "Другое" },
      { id: "H8AXIS", name: "אקסיס", russianName: "Аксис / Axis" },
      { id: "H8AR50", name: "ארוקס 50", russianName: "Аэрокс 50 / Aerox 50" },
      { id: "H8BMP5", name: "באמפ 50", russianName: "Бамп 50 / Bump 50" },
      {
        id: "H8VRS3",
        name: "ורסיטי 300",
        russianName: "Версити 300 / Versity 300",
      },
      {
        id: "H8TR12",
        name: "טריסיטי 125",
        russianName: "Трисити 125 / Tricity 125",
      },
      {
        id: "H8TR15",
        name: "טריסיטי 150",
        russianName: "Трисити 150 / Tricity 150",
      },
      {
        id: "H8TR25",
        name: "טריסיטי 250",
        russianName: "Трисити 250 / Tricity 250",
      },
      {
        id: "H8TR30",
        name: "טריסיטי 300",
        russianName: "Трисити 300 / Tricity 300",
      },
      { id: "H8MAXT", name: "מאקסטר", russianName: "Макстер / Maxter" },
      {
        id: "H8MJ12",
        name: "מג'סטי 125",
        russianName: "Маджести 125 / Majesty 125",
      },
      {
        id: "H8MJ25",
        name: "מג'סטי 250",
        russianName: "Маджести 250 / Majesty 250",
      },
      {
        id: "H8MJ40",
        name: "מג'סטי 400",
        russianName: "Маджести 400 / Majesty 400",
      },
      { id: "H8NEOS", name: "נאוס", russianName: "Неос / Neo’s" },
      { id: "H8NIKN", name: "ניקן", russianName: "Никен / Niken" },
      {
        id: "H8CYR",
        name: "סיגנוס 125 R",
        russianName: "Сигнус 125 R / Cygnus 125 R",
      },
      {
        id: "H8SL50",
        name: "סליידר 50",
        russianName: "Слайдер 50 / Slider 50",
      },
    ],
  },

  // 29) לונגיה
  LONC01: {
    id: "LONC01",
    name: "לונגיה",
    russianName: "Лонгия / Loncin",
    models: [
      { id: "J9VM12", name: "VMAX 125", russianName: "VMAX 125" },
      { id: "J9VM30", name: "VMAX 300", russianName: "VMAX 300" },
    ],
  },

  // 30) לונסין
  LNSN01: {
    id: "LNSN01",
    name: "לונסין",
    russianName: "Лонгсин / Loncin",
    models: [
      { id: "K0LX12", name: "LX125T-C", russianName: "LX125T-C" },
      { id: "K0TBL", name: "TBL125A", russianName: "TBL125A" },
      { id: "K0OTHR", name: "אחר", russianName: "Другое" },
      { id: "K0LX25", name: "LX250GY", russianName: "LX250GY" },
    ],
  },

  // 2) EVT
  EVT001: {
    id: "EVT001",
    name: "EVT",
    russianName: "ЭВТ / EVT",
    models: [
      { id: "G6R8T2", name: "168 רטרו", russianName: "168 Ретро / 168 Retro" },
      { id: "H1T7R9", name: "345 תלת", russianName: "345 Трайк / 345 Trike" },
      { id: "J3O0T6", name: "אחר", russianName: "Другое" },
      { id: "K5E4V1", name: "E4000", russianName: "E4000" },
    ],
  },

  // 3) FYM
  FYM001: {
    id: "FYM001",
    name: "FYM",
    russianName: "ФИМ / FYM",
    models: [
      { id: "L2T1A8", name: "125T-13", russianName: "125T-13" },
      { id: "M7T5B4", name: "125T-15", russianName: "125T-15" },
      { id: "N9T3C0", name: "125T-18", russianName: "125T-18" },
      { id: "P4T8D7", name: "150T-18", russianName: "150T-18" },
      { id: "Q1O6R2", name: "אחר", russianName: "Другое" },
    ],
  },

  // 4) GMI
  GMI001: {
    id: "GMI001",
    name: "GMI",
    russianName: "Джи-Эм-Ай / GMI",
    models: [
      { id: "R8N4R1", name: "Runner", russianName: "Раннер / Runner" },
      { id: "S0O3T9", name: "אחר", russianName: "Другое" },
    ],
  },

  // 5) LML Italia
  LML001: {
    id: "LML001",
    name: "LML Italia",
    russianName: "ЛМЛ / LML Italia",
    models: [
      {
        id: "T6S2T5",
        name: "STAR 2T 125",
        russianName: "Стар 2T 125 / Star 2T 125",
      },
      {
        id: "U1A9U3",
        name: "STAR AUTOMATICA 125",
        russianName: "Стар Автоматика 125 / Star Automatica 125",
      },
      {
        id: "V7D4X8",
        name: "STAR DELUX 125",
        russianName: "Стар Делюкс 125 / Star Delux 125",
      },
      {
        id: "W3D8X2",
        name: "STAR DELUX 200",
        russianName: "Стар Делюкс 200 / Star Delux 200",
      },
      { id: "X5O1T0", name: "אחר", russianName: "Другое" },
    ],
  },

  // 6) NIU NQI
  NIU001: {
    id: "NIU001",
    name: "NIU NQI",
    russianName: "Ниу NQi / NIU NQi",
    models: [
      { id: "Y9G2P7", name: "GT Pro", russianName: "Джи-Ти Про / GT Pro" },
    ],
  },

  // 7) PGO
  PGO001: {
    id: "PGO001",
    name: "PGO",
    russianName: "Пи-Джи-О / PGO",
    models: [
      { id: "Z1O8T4", name: "אחר", russianName: "Другое" },
      {
        id: "A8G1M6",
        name: "ג'י-מקס 125",
        russianName: "Джи-Макс 125 / G-Max 125",
      },
      {
        id: "B2G7M0",
        name: "ג'י-מקס 250",
        russianName: "Джи-Макс 250 / G-Max 250",
      },
      {
        id: "C6T3R5",
        name: "טי-רקס 125",
        russianName: "Ти-Рекс 125 / T-Rex 125",
      },
      {
        id: "D9L4G1",
        name: "ליגרו 125",
        russianName: "Лигеро 125 / Ligero 125",
      },
      { id: "E1S8T2", name: "סטאר", russianName: "Стар / Star" },
      { id: "F5C0M9", name: "קומט", russianName: "Комет / Comet" },
    ],
  },

  // 8) TGB
  TGB001: {
    id: "TGB001",
    name: "TGB",
    russianName: "Ти-Джи-Би / TGB",
    models: [
      { id: "G0R1A7", name: "R101 125", russianName: "R101 125" },
      { id: "H4R3B8", name: "R303 150", russianName: "R303 150" },
      { id: "J8R5X1", name: "R50X", russianName: "R50X" },
      { id: "K2S3C6", name: "RS303 125", russianName: "RS303 125" },
      { id: "L7T2D4", name: "T202 125", russianName: "T202 125" },
      {
        id: "M1X0M5",
        name: "X-Motion 125",
        russianName: "Икс-Моушн 125 / X-Motion 125",
      },
      {
        id: "N6X8M2",
        name: "X-Motion 250",
        russianName: "Икс-Моушн 250 / X-Motion 250",
      },
      {
        id: "P3X4M9",
        name: "X-Motion 300",
        russianName: "Икс-Моушн 300 / X-Motion 300",
      },
      { id: "Q9O2T1", name: "אחר", russianName: "Другое" },
      {
        id: "R5E7X0",
        name: "אקספרס 125",
        russianName: "Экспресс 125 / Express 125",
      },
      {
        id: "S2A6T8",
        name: "אקרוס טק 50",
        russianName: "Акрос Тек 50 / Across Tech 50",
      },
      { id: "T9A3G6", name: "אראגון 50", russianName: "Арагон 50" },
      { id: "U4B1L7", name: "בולט 125", russianName: "Болт 125 / Bolt 125" },
      {
        id: "V8D2L3",
        name: "דליברי 125",
        russianName: "Деливери 125 / Delivery 125",
      },
      {
        id: "W1D7L5",
        name: "דליברי 50",
        russianName: "Деливери 50 / Delivery 50",
      },
      { id: "X3H8K2", name: "הוק 125", russianName: "Хук 125 / Hook 125" },
    ],
  },

  // 9) UM
  UM0001: {
    id: "UM0001",
    name: "UM",
    russianName: "Ю-Эм / UM",
    models: [
      { id: "Y6C4H1", name: "Chill 125", russianName: "Чилл 125 / Chill 125" },
    ],
  },

  // 10) אחר
  OTH001: {
    id: "OTH001",
    name: "אחר",
    russianName: "Другое",
    models: [{ id: "Z8O7T3", name: "אחר", russianName: "Другое" }],
  },
  KYM001: {
    id: "KYM001",
    name: "קוואנג-יאנג",
    russianName: "Каймко / Kymco",
    models: [
      { id: "A1DJRF", name: "DJ Refind50 SA10EB", russianName: "DJ Refind 50" },
      {
        id: "A1MOVX",
        name: "Movie 125 XL",
        russianName: "Муви 125 XL / Movie 125 XL",
      },
      {
        id: "A1ND12",
        name: "Newdink 125",
        russianName: "Нью Динк 125 / New Dink 125",
      },
      { id: "A1VIVO", name: "VIVIO", russianName: "Вивио / Vivio" },
      { id: "A1OTHR", name: "אחר", russianName: "Другое" },
      { id: "A1DINK", name: "דינק 50", russianName: "Динк 50 / Dink 50" },
    ],
  },

  // 42) קוואסאקי
  KAW001: {
    id: "KAW001",
    name: "קוואסאקי",
    russianName: "Кавасаки / Kawasaki",
    models: [
      { id: "B2J300", name: "J300", russianName: "J300" },
      { id: "B2OTHR", name: "אחר", russianName: "Другое" },
    ],
  },

  // 43) קיוואי
  KEW001: {
    id: "KEW001",
    name: "קיוואי",
    russianName: "Кивей / Keeway",
    models: [
      {
        id: "C3ARNR",
        name: "ARN 125 RX RACING",
        russianName: "ARN 125 RX Racing",
      },
      { id: "C3ARNT", name: "ARN 125 TOURING", russianName: "ARN 125 Touring" },
      {
        id: "C3CITY",
        name: "CityBlade 125",
        russianName: "СитиБлейд 125 / CityBlade 125",
      },
      { id: "C3FACT", name: "F-ACT 125", russianName: "F-ACT 125" },
      {
        id: "C3MTRX",
        name: "MATRIX 125",
        russianName: "Матрикс 125 / Matrix 125",
      },
      {
        id: "C3OUTL",
        name: "אאוטלוק 125",
        russianName: "Аутлук 125 / Outlook 125",
      },
      {
        id: "C3OUTS",
        name: "אאוטלוק ספורט 125",
        russianName: "Аутлук Спорт 125 / Outlook Sport 125",
      },
      { id: "C3OTHR", name: "אחר", russianName: "Другое" },
      { id: "C3HACK", name: "האקר 125", russianName: "Хакер 125 / Hacker 125" },
      {
        id: "C3HUR5",
        name: "הוריקן 50",
        russianName: "Харрикейн 50 / Hurricane 50",
      },
      {
        id: "C3HUR9",
        name: "הוריקן 90",
        russianName: "Харрикейн 90 / Hurricane 90",
      },
      { id: "C3ZHR1", name: "זהרה 125", russianName: "Захра 125 / Zahra 125" },
      {
        id: "C3LOGI",
        name: "לוג`יק 125",
        russianName: "Лоджик 125 / Logic 125",
      },
      {
        id: "C3MTR2",
        name: "מטריקס 125",
        russianName: "Матрикс 125 / Matrix 125",
      },
      {
        id: "C3SLV2",
        name: "סילבר בלייד 250",
        russianName: "Сильвер Блейд 250 / Silver Blade 250",
      },
    ],
  },

  // 44) קימקו
  KMC001: {
    id: "KMC001",
    name: "קימקו",
    russianName: "Каймко / Kymco",
    models: [
      { id: "D4AK55", name: "AK 550", russianName: "AK 550" },
      { id: "D4BW15", name: "Bַ&W 150", russianName: "B&W 150" },
      { id: "D4BW25", name: "Bַ&W 250", russianName: "B&W 250" },
      { id: "D4CX50", name: "CX50", russianName: "CX 50" },
      { id: "D4DJXR", name: "DJX/R50", russianName: "DJX/R 50" },
      { id: "D4DT36", name: "DTX 360", russianName: "DTX 360" },
      { id: "D4GD12", name: "G-DINK 125", russianName: "G-Dink 125" },
      { id: "D4GD25", name: "G-DINK 250", russianName: "G-Dink 250" },
      { id: "D4KB50", name: "KB50", russianName: "KB 50" },
      {
        id: "D4XCI3",
        name: "Xciting 300i",
        russianName: "Иксайтинг 300i / Xciting 300i",
      },
      { id: "D4ZX50", name: "ZX50", russianName: "ZX 50" },
      {
        id: "D4AG12",
        name: "אג'יליטי 125",
        russianName: "Аджилити 125 / Agility 125",
      },
      {
        id: "D4AGC1",
        name: "אג'יליטי סיטי 125",
        russianName: "Agility City 125",
      },
      { id: "D4OTHR", name: "אחר", russianName: "Другое" },
      { id: "D4XT12", name: "איקס טאון 125I", russianName: "X-Town 125i" },
      { id: "D4XT30", name: "איקס טאון 300I", russianName: "X-Town 300i" },
      { id: "D4XTCT", name: "איקס טאון CT 125", russianName: "X-Town CT 125" },
      { id: "D4XT25", name: "איקס-טאון 250I", russianName: "X-Town 250i" },
      { id: "D4EX25", name: "אקסייטינג 250", russianName: "Xciting 250" },
      { id: "D4EX2R", name: "אקסייטינג 250Ri", russianName: "Xciting 250Ri" },
      { id: "D4EX30", name: "אקסייטינג 300R", russianName: "Xciting 300R" },
      {
        id: "D4EX4A",
        name: "אקסייטינג 400I ABS",
        russianName: "Xciting 400i ABS",
      },
      { id: "D4EX50", name: "אקסייטינג 500", russianName: "Xciting 500" },
      {
        id: "D4GD12",
        name: "גראנד דינק 125",
        russianName: "Гранд Динк 125 / Grand Dink 125",
      },
      { id: "D4GD15", name: "גראנד דינק 150", russianName: "Grand Dink 150" },
      { id: "D4GD25", name: "גראנד דינק 250", russianName: "Grand Dink 250" },
      {
        id: "D4DT12",
        name: "דאון טאון 125",
        russianName: "Даунтаун 125 / Downtown 125",
      },
      { id: "D4DT20", name: "דאון טאון 200", russianName: "Downtown 200" },
      { id: "D4DT25", name: "דאון טאון 250", russianName: "Downtown 250" },
      { id: "D4DT30", name: "דאון טאון 300", russianName: "Downtown 300" },
      { id: "D4DT35", name: "דאון טאון 350", russianName: "Downtown 350" },
      { id: "D4DN15", name: "דינק 150", russianName: "Dink 150" },
      { id: "D4DN20", name: "דינק 200", russianName: "Dink 200" },
      { id: "D4DN50", name: "דינק 50", russianName: "Dink 50" },
      { id: "D4HR12", name: "הרואיזם 125", russianName: "Heroism 125" },
      { id: "D4HR15", name: "הרואיזם 150", russianName: "Heroism 150" },
      { id: "D4HR50", name: "הרואיזם 50", russianName: "Heroism 50" },
      { id: "D4VIV1", name: "ויויו 125", russianName: "Vivio 125" },
      { id: "D4VT50", name: "ויטאליטי 50", russianName: "Vitality 50" },
      { id: "D4TOP5", name: "טופ בוי 50", russianName: "Top Boy 50" },
      { id: "D4LIKE", name: "לייק 125", russianName: "Like 125" },
      { id: "D4MOBX", name: "מובי 125XL", russianName: "Movie 125 XL" },
      { id: "D4MOB1", name: "מובי 150", russianName: "Movie 150" },
      { id: "D4ND12", name: "ניו דינק 125E", russianName: "New Dink 125 E" },
      { id: "D4ND20", name: "ניו דינק 200i", russianName: "New Dink 200i" },
      { id: "D4SJ12", name: "סופר ג'וקי 125", russianName: "Super Jockey 125" },
      { id: "D4SN10", name: "סנטו 100", russianName: "Sento 100" },
      { id: "D4PPLS", name: "פיפל 125S", russianName: "People 125 S" },
      {
        id: "D4PRJV",
        name: "פריוואיו/ג'וקי 125/150",
        russianName: "People / Jockey 125/150",
      },
    ],
  },

  // 45) קסינג-יו
  XING01: {
    id: "XING01",
    name: "קסינג-יו",
    russianName: "Синью / Xingyue",
    models: [
      { id: "E5XY11", name: "XY125T-11", russianName: "XY125T-11" },
      { id: "E5XY13", name: "XY125T-13", russianName: "XY125T-13" },
      {
        id: "E5XYSC",
        name: "XY125ZK (סייף סיטי) 125",
        russianName: "XY125ZK Safe City 125",
      },
      { id: "E5XY15", name: "XY150T", russianName: "XY150T" },
      { id: "E5OTHR", name: "אחר", russianName: "Другое" },
    ],
  },
} satisfies Record<ScooterManufacturerId, ScooterManufacturer>;
