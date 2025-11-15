import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/vehicleManufacturer.schema";

const vehicleManufacturersMap = {
  "1": {
    "id": "1",
    "name": "אאודי",
    "russianName": "Ауди",
    "models": [
      {
        "id": "1784",
        "name": "A1",
        "russianName": "A1"
      },
      {
        "id": "4",
        "name": "A3",
        "russianName": "A3"
      },
      {
        "id": "5",
        "name": "A4",
        "russianName": "A4"
      },
      {
        "id": "6",
        "name": "A6",
        "russianName": "A6"
      },
      {
        "id": "1323",
        "name": "A5",
        "russianName": "A5"
      },
      {
        "id": "89266",
        "name": "Q3",
        "russianName": "Q3"
      },
      {
        "id": "91052",
        "name": "Q5",
        "russianName": "Q5"
      },
      {
        "id": "8",
        "name": "TT",
        "russianName": "TT"
      },
      {
        "id": "2",
        "name": "100",
        "russianName": "100"
      },
      {
        "id": "3",
        "name": "80",
        "russianName": "80"
      },
      {
        "id": "89264",
        "name": "A2",
        "russianName": "A2"
      },
      {
        "id": "1322",
        "name": "A3 ספורטבק",
        "russianName": "А3 Спортбэк"
      },
      {
        "id": "1712",
        "name": "A5",
        "russianName": "A5"
      },
      {
        "id": "91060",
        "name": "A6 E-tron",
        "russianName": "A6 E-tron"
      },
      {
        "id": "38400",
        "name": "A7",
        "russianName": "A7"
      },
      {
        "id": "7",
        "name": "A8",
        "russianName": "A8"
      },
      {
        "id": "91058",
        "name": "E-tron",
        "russianName": "E-tron"
      },
      {
        "id": "91059",
        "name": "E-tron GT",
        "russianName": "E-tron GT"
      },
      {
        "id": "91051",
        "name": "Q2",
        "russianName": "Q2"
      },
      {
        "id": "91061",
        "name": "Q4 E-tron",
        "russianName": "Q4 E-tron"
      },
      {
        "id": "91062",
        "name": "Q6 E-tron",
        "russianName": "Q6 E-tron"
      },
      {
        "id": "91053",
        "name": "Q7",
        "russianName": "Q7"
      },
      {
        "id": "91054",
        "name": "Q8",
        "russianName": "Q8"
      },
      {
        "id": "91063",
        "name": "Q8 E-tron",
        "russianName": "Q8 E-tron"
      },
      {
        "id": "1478",
        "name": "R8",
        "russianName": "R8"
      },
      {
        "id": "91064",
        "name": "RS E-tron GT",
        "russianName": "RS E-tron GT"
      },
      {
        "id": "89267",
        "name": "RS3",
        "russianName": "RS3"
      },
      {
        "id": "89268",
        "name": "RS5",
        "russianName": "RS5"
      },
      {
        "id": "89269",
        "name": "RS7",
        "russianName": "RS7"
      },
      {
        "id": "91055",
        "name": "RSQ3",
        "russianName": "RSQ3"
      },
      {
        "id": "91056",
        "name": "RSQ5",
        "russianName": "RSQ5"
      },
      {
        "id": "91057",
        "name": "RSQ8",
        "russianName": "RSQ8"
      },
      {
        "id": "91065",
        "name": "S1",
        "russianName": "S1"
      },
      {
        "id": "995",
        "name": "S3",
        "russianName": "S3"
      },
      {
        "id": "1324",
        "name": "S4",
        "russianName": "S4"
      },
      {
        "id": "1354",
        "name": "S5",
        "russianName": "S5"
      },
      {
        "id": "1325",
        "name": "S6",
        "russianName": "S6"
      },
      {
        "id": "89270",
        "name": "S7",
        "russianName": "S7"
      },
      {
        "id": "9",
        "name": "S8",
        "russianName": "S8"
      },
      {
        "id": "91066",
        "name": "SQ2",
        "russianName": "SQ2"
      },
      {
        "id": "91067",
        "name": "SQ5",
        "russianName": "SQ5"
      },
      {
        "id": "91068",
        "name": "SQ7",
        "russianName": "SQ7"
      },
      {
        "id": "91069",
        "name": "SQ8",
        "russianName": "SQ8"
      },
      {
        "id": "10",
        "name": "TT קופה",
        "russianName": "ТТ купе"
      },
      {
        "id": "11",
        "name": "TT רודסטר",
        "russianName": "ТТ Родстер"
      },
      {
        "id": "1713",
        "name": "TTS",
        "russianName": "TTS"
      },
      {
        "id": "1326",
        "name": "אולרוד",
        "russianName": "Олрод"
      }
    ]
  },
  "2": {
    "id": "2",
    "name": "אוטוביאנקי",
    "russianName": "Оттобианки",
    "models": [
      {
        "id": "1327",
        "name": "JUNIOR",
        "russianName": "JUNIOR"
      },
      {
        "id": "15",
        "name": "Y10",
        "russianName": "Y10"
      }
    ]
  },
  "3": {
    "id": "3",
    "name": "אולדסמוביל",
    "russianName": "Олдсмобиль",
    "models": [
      {
        "id": "18",
        "name": "אומגה",
        "russianName": "Омега"
      },
      {
        "id": "89277",
        "name": "אורורה",
        "russianName": "Аврора"
      },
      {
        "id": "17",
        "name": "דלתא",
        "russianName": "Дельта"
      },
      {
        "id": "19",
        "name": "קטלס",
        "russianName": "Каракатица"
      }
    ]
  },
  "4": {
    "id": "4",
    "name": "אוסטין",
    "russianName": "Остин",
    "models": [
      {
        "id": "1480",
        "name": "A35",
        "russianName": "A35"
      },
      {
        "id": "22",
        "name": "מאסטרו",
        "russianName": "Маэстро"
      },
      {
        "id": "23",
        "name": "מונטגו",
        "russianName": "Монтегю"
      },
      {
        "id": "21",
        "name": "מטרו",
        "russianName": "Метро"
      },
      {
        "id": "24",
        "name": "מיני",
        "russianName": "Мини"
      }
    ]
  },
  "5": {
    "id": "5",
    "name": "אופל",
    "russianName": "Опель",
    "models": [
      {
        "id": "89278",
        "name": "מוקה",
        "russianName": "Мокка"
      },
      {
        "id": "35",
        "name": "קורסה",
        "russianName": "Корса"
      },
      {
        "id": "1556",
        "name": "אסטרה החדשה",
        "russianName": "Новая Астра"
      },
      {
        "id": "38402",
        "name": "אדם",
        "russianName": "Адам"
      },
      {
        "id": "90419",
        "name": "קרוסלנד X",
        "russianName": "Кросланд Х"
      },
      {
        "id": "38403",
        "name": "אינסיגניה",
        "russianName": "Знаки отличия"
      },
      {
        "id": "29",
        "name": "אומגה",
        "russianName": "Омега"
      },
      {
        "id": "26",
        "name": "אסטרה",
        "russianName": "Астра"
      },
      {
        "id": "31",
        "name": "אסקונה",
        "russianName": "Аскона"
      },
      {
        "id": "90418",
        "name": "גרנדלנד X",
        "russianName": "Гренландия X"
      },
      {
        "id": "1481",
        "name": "ויורו",
        "russianName": "Вектра"
      },
      {
        "id": "28",
        "name": "וקטרה",
        "russianName": "Вектра"
      },
      {
        "id": "34",
        "name": "זאפירה",
        "russianName": "Зафира"
      },
      {
        "id": "30",
        "name": "טיגרה",
        "russianName": "Тигра"
      },
      {
        "id": "89279",
        "name": "מוקה X",
        "russianName": "Мокко Х"
      },
      {
        "id": "38404",
        "name": "מנטה",
        "russianName": "Манта"
      },
      {
        "id": "1483",
        "name": "מנטה",
        "russianName": "Манта"
      },
      {
        "id": "64171",
        "name": "מריבה",
        "russianName": "Мерива"
      },
      {
        "id": "91070",
        "name": "פרונטרה",
        "russianName": "Фронтера"
      },
      {
        "id": "32",
        "name": "קדט",
        "russianName": "Кадет"
      },
      {
        "id": "1482",
        "name": "קורסה החדשה",
        "russianName": "Новая Корса"
      },
      {
        "id": "89280",
        "name": "קסקדה",
        "russianName": "Каскад"
      },
      {
        "id": "1484",
        "name": "קפיטן",
        "russianName": "Капитан"
      },
      {
        "id": "1328",
        "name": "רקורד",
        "russianName": "Рекорд"
      }
    ]
  },
  "7": {
    "id": "7",
    "name": "איסוזו",
    "russianName": "исудзу",
    "models": [
      {
        "id": "91080",
        "name": "טרופר",
        "russianName": "Солдат"
      },
      {
        "id": "91081",
        "name": "רודאו",
        "russianName": "родео"
      }
    ]
  },
  "8": {
    "id": "8",
    "name": "אלפא רומיאו",
    "russianName": "Альфа Ромео",
    "models": [
      {
        "id": "89288",
        "name": "ג`וליה",
        "russianName": "Юлия"
      },
      {
        "id": "38406",
        "name": "ג`ולייטה",
        "russianName": "Джульета"
      },
      {
        "id": "91082",
        "name": "סטלביו",
        "russianName": "Стельвио"
      },
      {
        "id": "90988",
        "name": "ג`וניור",
        "russianName": "Джуниор"
      },
      {
        "id": "90989",
        "name": "טונלה",
        "russianName": "Тонелла"
      },
      {
        "id": "1555",
        "name": "מיטו",
        "russianName": "Мито"
      },
      {
        "id": "55",
        "name": "145",
        "russianName": "145"
      },
      {
        "id": "56",
        "name": "146",
        "russianName": "146"
      },
      {
        "id": "52",
        "name": "147",
        "russianName": "147"
      },
      {
        "id": "54",
        "name": "156",
        "russianName": "156"
      },
      {
        "id": "1249",
        "name": "159",
        "russianName": "159"
      },
      {
        "id": "64",
        "name": "164",
        "russianName": "164"
      },
      {
        "id": "53",
        "name": "166",
        "russianName": "166"
      },
      {
        "id": "51",
        "name": "33",
        "russianName": "33"
      },
      {
        "id": "89287",
        "name": "4C",
        "russianName": "4C"
      },
      {
        "id": "57",
        "name": "75",
        "russianName": "75"
      },
      {
        "id": "58",
        "name": "90",
        "russianName": "90"
      },
      {
        "id": "1250",
        "name": "GT",
        "russianName": "GT"
      },
      {
        "id": "59",
        "name": "GTV",
        "russianName": "GTV"
      },
      {
        "id": "89286",
        "name": "JTS.159.3.2",
        "russianName": "JTS.159.3.2"
      },
      {
        "id": "1355",
        "name": "בררה",
        "russianName": "Брера"
      },
      {
        "id": "61",
        "name": "סוד",
        "russianName": "Суд"
      },
      {
        "id": "62",
        "name": "ספיידר",
        "russianName": "Паук"
      },
      {
        "id": "63",
        "name": "ספרינט",
        "russianName": "Спринт"
      }
    ]
  },
  "11": {
    "id": "11",
    "name": "ב.מ.וו",
    "russianName": "БМВ",
    "models": [
      {
        "id": "110",
        "name": "סדרה 3",
        "russianName": "Серия 3"
      },
      {
        "id": "89296",
        "name": "X1",
        "russianName": "X1"
      },
      {
        "id": "1332",
        "name": "סדרה 5",
        "russianName": "Серия 5"
      },
      {
        "id": "90877",
        "name": "118i",
        "russianName": "118i"
      },
      {
        "id": "90951",
        "name": "iX2",
        "russianName": "iX2"
      },
      {
        "id": "91085",
        "name": "X3",
        "russianName": "X3"
      },
      {
        "id": "91087",
        "name": "X5",
        "russianName": "X5"
      },
      {
        "id": "1126",
        "name": "120i",
        "russianName": "120i"
      },
      {
        "id": "104",
        "name": "315",
        "russianName": "315"
      },
      {
        "id": "103",
        "name": "316",
        "russianName": "316"
      },
      {
        "id": "102",
        "name": "318",
        "russianName": "318"
      },
      {
        "id": "105",
        "name": "320",
        "russianName": "320"
      },
      {
        "id": "101",
        "name": "323",
        "russianName": "323"
      },
      {
        "id": "106",
        "name": "325",
        "russianName": "325"
      },
      {
        "id": "100",
        "name": "328",
        "russianName": "328"
      },
      {
        "id": "107",
        "name": "330",
        "russianName": "330"
      },
      {
        "id": "99",
        "name": "518",
        "russianName": "518"
      },
      {
        "id": "98",
        "name": "520",
        "russianName": "520"
      },
      {
        "id": "97",
        "name": "523",
        "russianName": "523"
      },
      {
        "id": "96",
        "name": "525",
        "russianName": "525"
      },
      {
        "id": "95",
        "name": "528",
        "russianName": "528"
      },
      {
        "id": "94",
        "name": "530",
        "russianName": "530"
      },
      {
        "id": "93",
        "name": "535",
        "russianName": "535"
      },
      {
        "id": "92",
        "name": "540",
        "russianName": "540"
      },
      {
        "id": "91",
        "name": "728",
        "russianName": "728"
      },
      {
        "id": "90",
        "name": "730",
        "russianName": "730"
      },
      {
        "id": "89",
        "name": "732",
        "russianName": "732"
      },
      {
        "id": "88",
        "name": "735",
        "russianName": "735"
      },
      {
        "id": "87",
        "name": "740",
        "russianName": "740"
      },
      {
        "id": "112",
        "name": "745",
        "russianName": "745"
      },
      {
        "id": "108",
        "name": "750",
        "russianName": "750"
      },
      {
        "id": "86",
        "name": "840",
        "russianName": "840"
      },
      {
        "id": "89298",
        "name": "i3",
        "russianName": "i3"
      },
      {
        "id": "90949",
        "name": "i4",
        "russianName": "i4"
      },
      {
        "id": "90948",
        "name": "I5",
        "russianName": "I5"
      },
      {
        "id": "90950",
        "name": "i7",
        "russianName": "i7"
      },
      {
        "id": "89299",
        "name": "i8",
        "russianName": "i8"
      },
      {
        "id": "90953",
        "name": "iX",
        "russianName": "iX"
      },
      {
        "id": "90947",
        "name": "iX1",
        "russianName": "iX1"
      },
      {
        "id": "90952",
        "name": "iX3",
        "russianName": "iX3"
      },
      {
        "id": "38407",
        "name": "M1",
        "russianName": "M1"
      },
      {
        "id": "89294",
        "name": "M2",
        "russianName": "M2"
      },
      {
        "id": "1335",
        "name": "M3",
        "russianName": "M3"
      },
      {
        "id": "89295",
        "name": "M4",
        "russianName": "M4"
      },
      {
        "id": "1336",
        "name": "M5",
        "russianName": "M5"
      },
      {
        "id": "1337",
        "name": "M6",
        "russianName": "M6"
      },
      {
        "id": "90417",
        "name": "M8",
        "russianName": "M8"
      },
      {
        "id": "38408",
        "name": "TI",
        "russianName": "TI"
      },
      {
        "id": "91084",
        "name": "X2",
        "russianName": "X2"
      },
      {
        "id": "91086",
        "name": "X4",
        "russianName": "X4"
      },
      {
        "id": "91088",
        "name": "X6",
        "russianName": "X6"
      },
      {
        "id": "91089",
        "name": "X7",
        "russianName": "X7"
      },
      {
        "id": "90954",
        "name": "XM",
        "russianName": "XM"
      },
      {
        "id": "85",
        "name": "Z3",
        "russianName": "Z3"
      },
      {
        "id": "1136",
        "name": "Z4",
        "russianName": "Z4"
      },
      {
        "id": "109",
        "name": "מיני קופר",
        "russianName": "мини купер"
      },
      {
        "id": "1329",
        "name": "סדרה 1",
        "russianName": "Серия 1"
      },
      {
        "id": "1330",
        "name": "סדרה 2",
        "russianName": "Серия 2"
      },
      {
        "id": "64176",
        "name": "סדרה 3 קופה/ קבריולט",
        "russianName": "Серия 3 Купе/Кабриолет"
      },
      {
        "id": "1331",
        "name": "סדרה 4",
        "russianName": "Серия 4"
      },
      {
        "id": "1333",
        "name": "סדרה 6",
        "russianName": "Серия 6"
      },
      {
        "id": "1334",
        "name": "סדרה 7",
        "russianName": "Серия 7"
      },
      {
        "id": "38409",
        "name": "סדרה 8",
        "russianName": "Серия 8"
      }
    ]
  },
  "13": {
    "id": "13",
    "name": "ביואיק",
    "russianName": "Бьюик",
    "models": [
      {
        "id": "91091",
        "name": "אנקלייב",
        "russianName": "Анклав"
      },
      {
        "id": "120",
        "name": "לה סייבר",
        "russianName": "ЛаСейбер"
      },
      {
        "id": "1236",
        "name": "לה קרוס",
        "russianName": "Лакросс"
      },
      {
        "id": "1338",
        "name": "לוצרן",
        "russianName": "Люцерн"
      },
      {
        "id": "1485",
        "name": "לימיטד",
        "russianName": "Лимитед"
      },
      {
        "id": "121",
        "name": "סנצורי",
        "russianName": "Сенчури"
      },
      {
        "id": "118",
        "name": "סקיילרק",
        "russianName": "Скайларк"
      },
      {
        "id": "122",
        "name": "פארק אבניו",
        "russianName": "Парк Авеню"
      },
      {
        "id": "1486",
        "name": "רוד מאסטר",
        "russianName": "Роудмастер"
      },
      {
        "id": "1339",
        "name": "ריביירה",
        "russianName": "Ривьера"
      },
      {
        "id": "119",
        "name": "ריגל",
        "russianName": "Ригал"
      },
      {
        "id": "91090",
        "name": "רנדוו",
        "russianName": "Рандеву"
      }
    ]
  },
  "14": {
    "id": "14",
    "name": "בנטלי",
    "russianName": "Бентли",
    "models": [
      {
        "id": "91092",
        "name": "בנטיאגה",
        "russianName": "Бентиага"
      },
      {
        "id": "91093",
        "name": "פליינג ספור",
        "russianName": "Флайинг Спур"
      },
      {
        "id": "91094",
        "name": "קונטיננטל",
        "russianName": "Континентальный"
      },
      {
        "id": "91095",
        "name": "קונטיננטל GT",
        "russianName": "Континентальный ГТ"
      }
    ]
  },
  "15": {
    "id": "15",
    "name": "ג`י.אם.סי",
    "russianName": "ГМК",
    "models": [
      {
        "id": "91132",
        "name": "יוקון",
        "russianName": "Юкон"
      }
    ]
  },
  "16": {
    "id": "16",
    "name": "ג`יאו",
    "russianName": "Гео",
    "models": [
      {
        "id": "137",
        "name": "פריזם",
        "russianName": "Призма"
      }
    ]
  },
  "18": {
    "id": "18",
    "name": "ג`יפ",
    "russianName": "Джип",
    "models": [
      {
        "id": "91107",
        "name": "רנגלר",
        "russianName": "Рэнглер"
      },
      {
        "id": "91099",
        "name": "גרנד צ`ירוקי",
        "russianName": "Гранд Чероки"
      },
      {
        "id": "91105",
        "name": "קומפאס",
        "russianName": "Компас"
      },
      {
        "id": "89309",
        "name": "אוונג`ר",
        "russianName": "Мститель"
      },
      {
        "id": "91097",
        "name": "גלדיאטור",
        "russianName": "Гладиатор"
      },
      {
        "id": "91098",
        "name": "גראנד וואגוניר",
        "russianName": "Гранд Вагонер"
      },
      {
        "id": "91101",
        "name": "וגוניר",
        "russianName": "Вагонер"
      },
      {
        "id": "91102",
        "name": "פטריוט",
        "russianName": "Патриот"
      },
      {
        "id": "91103",
        "name": "צ`ירוקי",
        "russianName": "Чероки"
      },
      {
        "id": "91104",
        "name": "קומנדר",
        "russianName": "Командир"
      },
      {
        "id": "91106",
        "name": "רנגייד",
        "russianName": "Отступник"
      }
    ]
  },
  "19": {
    "id": "19",
    "name": "דודג`",
    "russianName": "Додж",
    "models": [
      {
        "id": "1487",
        "name": "אוונג`ר",
        "russianName": "Мститель"
      },
      {
        "id": "145",
        "name": "אריס",
        "russianName": "Арис"
      },
      {
        "id": "89308",
        "name": "גראנד קראוון",
        "russianName": "Гранд Караван"
      },
      {
        "id": "1720",
        "name": "ג'רני",
        "russianName": "Джурни"
      },
      {
        "id": "91117",
        "name": "דורנגו",
        "russianName": "Дуранго"
      },
      {
        "id": "1721",
        "name": "וייפר",
        "russianName": "Вайпер"
      },
      {
        "id": "976",
        "name": "ולי",
        "russianName": "Уолли"
      },
      {
        "id": "91116",
        "name": "ניטרו",
        "russianName": "Нитро"
      },
      {
        "id": "1341",
        "name": "צ'ארגר",
        "russianName": "Чарджер"
      },
      {
        "id": "89307",
        "name": "צ'לנג'ר",
        "russianName": "Челленджер"
      },
      {
        "id": "1342",
        "name": "קאליבר",
        "russianName": "Калибр"
      }
    ]
  },
  "21": {
    "id": "21",
    "name": "דייהו",
    "russianName": "Дэу",
    "models": [
      {
        "id": "154",
        "name": "אספרו",
        "russianName": "Эсперо"
      },
      {
        "id": "1343",
        "name": "טאקומה",
        "russianName": "Такома"
      },
      {
        "id": "155",
        "name": "לאנוס",
        "russianName": "Ланос"
      },
      {
        "id": "156",
        "name": "לגנצה",
        "russianName": "Леганза"
      },
      {
        "id": "157",
        "name": "מאטיס",
        "russianName": "Мэттис"
      },
      {
        "id": "91127",
        "name": "מוסו",
        "russianName": "Муссо"
      },
      {
        "id": "158",
        "name": "נובירה",
        "russianName": "Нувира"
      },
      {
        "id": "159",
        "name": "נקסיה",
        "russianName": "Нексия"
      },
      {
        "id": "160",
        "name": "סופר סלון",
        "russianName": "Супер салон"
      },
      {
        "id": "161",
        "name": "סופר רייסר",
        "russianName": "Супер Рейсер"
      },
      {
        "id": "162",
        "name": "פרינס",
        "russianName": "Принц"
      },
      {
        "id": "163",
        "name": "רייסר",
        "russianName": "Гонщик"
      },
      {
        "id": "1344",
        "name": "שיירמן",
        "russianName": "Ширман"
      }
    ]
  },
  "22": {
    "id": "22",
    "name": "דייהטסו",
    "russianName": "Дайхатсу",
    "models": [
      {
        "id": "175",
        "name": "YRV",
        "russianName": "YRV"
      },
      {
        "id": "173",
        "name": "אפלאוז",
        "russianName": "Аплодисменты"
      },
      {
        "id": "167",
        "name": "גראנד מוב",
        "russianName": "Гранд Моб"
      },
      {
        "id": "176",
        "name": "טריוס",
        "russianName": "Трио"
      },
      {
        "id": "1549",
        "name": "טריוס החדשה",
        "russianName": "Новые трио"
      },
      {
        "id": "1489",
        "name": "מאטריה",
        "russianName": "Материя"
      },
      {
        "id": "174",
        "name": "סיריון",
        "russianName": "Сирион"
      },
      {
        "id": "91128",
        "name": "פרוזה",
        "russianName": "Проза"
      },
      {
        "id": "170",
        "name": "קורה",
        "russianName": "Кора"
      },
      {
        "id": "171",
        "name": "שרייד",
        "russianName": "Осколок"
      },
      {
        "id": "172",
        "name": "שרמנט",
        "russianName": "Очарование"
      }
    ]
  },
  "24": {
    "id": "24",
    "name": "הונדה",
    "russianName": "Хонда",
    "models": [
      {
        "id": "229",
        "name": "סיוויק",
        "russianName": "Гражданский"
      },
      {
        "id": "1113",
        "name": "ג`אז",
        "russianName": "Джаз"
      },
      {
        "id": "226",
        "name": "אקורד",
        "russianName": "Аккорд"
      },
      {
        "id": "38413",
        "name": "אינסייט",
        "russianName": "Понимание"
      },
      {
        "id": "91135",
        "name": "CR-V",
        "russianName": "CR-V"
      },
      {
        "id": "38411",
        "name": "CR-Z",
        "russianName": "CR-Z"
      },
      {
        "id": "1346",
        "name": "FR-V",
        "russianName": "FR-V"
      },
      {
        "id": "91136",
        "name": "HR-V",
        "russianName": "HR-V"
      },
      {
        "id": "225",
        "name": "S-2000",
        "russianName": "S-2000"
      },
      {
        "id": "38412",
        "name": "אודיסיי",
        "russianName": "Одиссея"
      },
      {
        "id": "1493",
        "name": "ג'אז הייבריד",
        "russianName": "Гибридный джаз"
      },
      {
        "id": "235",
        "name": "האצ`בק",
        "russianName": "Хэтчбек"
      },
      {
        "id": "232",
        "name": "לג`נד",
        "russianName": "Легенда"
      },
      {
        "id": "234",
        "name": "סטרים",
        "russianName": "Стрим"
      },
      {
        "id": "1495",
        "name": "סיוויק (עד 2006)",
        "russianName": "Гражданский (до 2006 г.)"
      },
      {
        "id": "1491",
        "name": "סיוויק 4D",
        "russianName": "Гражданский 4Д"
      },
      {
        "id": "1492",
        "name": "סיוויק 5D",
        "russianName": "Гражданский 5Д"
      },
      {
        "id": "231",
        "name": "סיוויק Type R",
        "russianName": "Гражданский Тип R"
      },
      {
        "id": "1345",
        "name": "סיוויק האצ'בק החדשה",
        "russianName": "Новый хэтчбек Civic"
      },
      {
        "id": "1490",
        "name": "סיוויק הייבריד",
        "russianName": "Гражданский гибрид"
      },
      {
        "id": "64051",
        "name": "סיוויק סדאן",
        "russianName": "Гражданский седан"
      },
      {
        "id": "1347",
        "name": "סיוויק סדאן החדשה",
        "russianName": "Новый седан Civic"
      },
      {
        "id": "89310",
        "name": "סיוויק סטיישן",
        "russianName": "Гражданский вокзал"
      },
      {
        "id": "89311",
        "name": "סיוויק קופה / האצ'בק",
        "russianName": "Гражданское купе/хэтчбек"
      },
      {
        "id": "91138",
        "name": "פיילוט",
        "russianName": "Пилот"
      },
      {
        "id": "227",
        "name": "פרלוד",
        "russianName": "Прелюдия"
      },
      {
        "id": "91137",
        "name": "קלריטי",
        "russianName": "Ясность"
      },
      {
        "id": "1557",
        "name": "רודסטאר S2000",
        "russianName": "Родстар С2000"
      },
      {
        "id": "228",
        "name": "שאטל",
        "russianName": "Трансфер"
      }
    ]
  },
  "27": {
    "id": "27",
    "name": "וולוו",
    "russianName": "Вольво",
    "models": [
      {
        "id": "250",
        "name": "264",
        "russianName": "264"
      },
      {
        "id": "251",
        "name": "340",
        "russianName": "340"
      },
      {
        "id": "252",
        "name": "344",
        "russianName": "344"
      },
      {
        "id": "253",
        "name": "40",
        "russianName": "40"
      },
      {
        "id": "254",
        "name": "70",
        "russianName": "70"
      },
      {
        "id": "255",
        "name": "740",
        "russianName": "740"
      },
      {
        "id": "256",
        "name": "745",
        "russianName": "745"
      },
      {
        "id": "257",
        "name": "760",
        "russianName": "760"
      },
      {
        "id": "258",
        "name": "80",
        "russianName": "80"
      },
      {
        "id": "259",
        "name": "850",
        "russianName": "850"
      },
      {
        "id": "264",
        "name": "850T",
        "russianName": "850T"
      },
      {
        "id": "64175",
        "name": "855",
        "russianName": "855"
      },
      {
        "id": "260",
        "name": "90",
        "russianName": "90"
      },
      {
        "id": "261",
        "name": "940",
        "russianName": "940"
      },
      {
        "id": "262",
        "name": "945",
        "russianName": "945"
      },
      {
        "id": "263",
        "name": "960",
        "russianName": "960"
      },
      {
        "id": "1356",
        "name": "C30",
        "russianName": "C30"
      },
      {
        "id": "91147",
        "name": "C40",
        "russianName": "C40"
      },
      {
        "id": "265",
        "name": "C70",
        "russianName": "C70"
      },
      {
        "id": "91142",
        "name": "EX30",
        "russianName": "EX30"
      },
      {
        "id": "271",
        "name": "S40",
        "russianName": "S40"
      },
      {
        "id": "266",
        "name": "S60",
        "russianName": "S60"
      },
      {
        "id": "267",
        "name": "S70",
        "russianName": "S70"
      },
      {
        "id": "268",
        "name": "S80",
        "russianName": "S80"
      },
      {
        "id": "269",
        "name": "S90",
        "russianName": "S90"
      },
      {
        "id": "1349",
        "name": "V30",
        "russianName": "V30"
      },
      {
        "id": "272",
        "name": "V40",
        "russianName": "V40"
      },
      {
        "id": "64173",
        "name": "v40 הישנה",
        "russianName": "Старый v40"
      },
      {
        "id": "64174",
        "name": "v40cc",
        "russianName": "v40cc"
      },
      {
        "id": "1350",
        "name": "V50",
        "russianName": "V50"
      },
      {
        "id": "38414",
        "name": "V60",
        "russianName": "V60"
      },
      {
        "id": "270",
        "name": "V70",
        "russianName": "V70"
      },
      {
        "id": "89342",
        "name": "V90",
        "russianName": "V90"
      },
      {
        "id": "91143",
        "name": "XC40",
        "russianName": "XC40"
      },
      {
        "id": "91144",
        "name": "XC60",
        "russianName": "XC60"
      },
      {
        "id": "1357",
        "name": "XC70",
        "russianName": "XC70"
      },
      {
        "id": "91146",
        "name": "XC90",
        "russianName": "XC90"
      },
      {
        "id": "90423",
        "name": "קרוס קאנטרי V40",
        "russianName": "Кросс-кантри V40"
      },
      {
        "id": "90424",
        "name": "קרוס קאנטרי V90",
        "russianName": "Кросс-кантри V90"
      }
    ]
  },
  "29": {
    "id": "29",
    "name": "טויוטה",
    "russianName": "Тойота",
    "models": [
      {
        "id": "281",
        "name": "יאריס",
        "russianName": "Ярис"
      },
      {
        "id": "284",
        "name": "קורולה",
        "russianName": "Королла"
      },
      {
        "id": "1570",
        "name": "C-HR",
        "russianName": "C-HR"
      },
      {
        "id": "91154",
        "name": "לנד קרוזר",
        "russianName": "Ленд Крузер"
      },
      {
        "id": "295",
        "name": "קאמרי",
        "russianName": "камера"
      },
      {
        "id": "90996",
        "name": "קורולה קרוס",
        "russianName": "Королла Кросс"
      },
      {
        "id": "1169",
        "name": "פריוס",
        "russianName": "Приус"
      },
      {
        "id": "38417",
        "name": "אייגו",
        "russianName": "Яго"
      },
      {
        "id": "90998",
        "name": "אייגו X",
        "russianName": "Яго Х"
      },
      {
        "id": "91155",
        "name": "4 ראנר",
        "russianName": "4 бегун"
      },
      {
        "id": "90963",
        "name": "bZ4X",
        "russianName": "bZ4X"
      },
      {
        "id": "91148",
        "name": "FJ קרוזר",
        "russianName": "ФДж Крейсер"
      },
      {
        "id": "38415",
        "name": "GT86",
        "russianName": "GT86"
      },
      {
        "id": "1568",
        "name": "IQ",
        "russianName": "IQ"
      },
      {
        "id": "1002",
        "name": "MR2",
        "russianName": "MR2"
      },
      {
        "id": "91030",
        "name": "RAV4",
        "russianName": "RAV4"
      },
      {
        "id": "38416",
        "name": "אבלון",
        "russianName": "Авалон"
      },
      {
        "id": "90425",
        "name": "אבלון הייבריד",
        "russianName": "Морское ушко гибридное"
      },
      {
        "id": "89312",
        "name": "אוונסיס ורסו",
        "russianName": "Авенсис Версо"
      },
      {
        "id": "280",
        "name": "אונסיס",
        "russianName": "Онсис"
      },
      {
        "id": "1358",
        "name": "אוריס",
        "russianName": "Орис"
      },
      {
        "id": "89313",
        "name": "אוריס TS הייבריד",
        "russianName": "Аурис ТС Гибрид"
      },
      {
        "id": "91150",
        "name": "ונזה",
        "russianName": "Венза"
      },
      {
        "id": "1496",
        "name": "ורסו",
        "russianName": "Версо"
      },
      {
        "id": "91151",
        "name": "ורסו-S",
        "russianName": "Версо-С"
      },
      {
        "id": "91153",
        "name": "יאריס GR",
        "russianName": "Ярис ГР"
      },
      {
        "id": "64165",
        "name": "יאריס הייבריד",
        "russianName": "Ярис Гибрид"
      },
      {
        "id": "90995",
        "name": "יאריס קרוס",
        "russianName": "Ярис Кросс"
      },
      {
        "id": "89314",
        "name": "לנד קרוזר LC 100",
        "russianName": "Ленд Крузер ЛК 100"
      },
      {
        "id": "282",
        "name": "לקסוס",
        "russianName": "Лексус"
      },
      {
        "id": "1567",
        "name": "סולרה קבריולט",
        "russianName": "Солара Кабриолет"
      },
      {
        "id": "90997",
        "name": "סופרה",
        "russianName": "Писатель"
      },
      {
        "id": "283",
        "name": "סטארלט",
        "russianName": "Старлетка"
      },
      {
        "id": "1359",
        "name": "סיינה",
        "russianName": "Сиена"
      },
      {
        "id": "287",
        "name": "סליקה",
        "russianName": "оформление"
      },
      {
        "id": "38418",
        "name": "ספייס ורסו",
        "russianName": "Спайс Версо"
      },
      {
        "id": "1429",
        "name": "סקויה",
        "russianName": "красное дерево"
      },
      {
        "id": "90426",
        "name": "פריוס C הייבריד",
        "russianName": "Приус С Гибрид"
      },
      {
        "id": "89315",
        "name": "פריוס C",
        "russianName": "Приус С"
      },
      {
        "id": "90427",
        "name": "פריוס פלאג-אין",
        "russianName": "плагин приуса"
      },
      {
        "id": "64166",
        "name": "פריוס פלוס",
        "russianName": "Приус Плюс"
      },
      {
        "id": "90428",
        "name": "פריוס פלוס הייבריד",
        "russianName": "Приус Плюс Гибрид"
      },
      {
        "id": "1569",
        "name": "קאמרי הייבריד",
        "russianName": "Камри Гибрид"
      },
      {
        "id": "1185",
        "name": "קורולה RunX",
        "russianName": "Королла РанХ"
      },
      {
        "id": "91157",
        "name": "קורולה ורסו",
        "russianName": "Королла Версо"
      },
      {
        "id": "91158",
        "name": "קראון",
        "russianName": "Корона"
      },
      {
        "id": "285",
        "name": "קרינה",
        "russianName": "радиация"
      }
    ]
  },
  "31": {
    "id": "31",
    "name": "טלבו סימקה",
    "russianName": "Тальбо Симка",
    "models": [
      {
        "id": "299",
        "name": "הורייזן",
        "russianName": "Горизонт"
      },
      {
        "id": "301",
        "name": "טלבו 1510/1500",
        "russianName": "Тальбо 1510/1500"
      },
      {
        "id": "300",
        "name": "טלבוLS",
        "russianName": "ТелбоLS"
      },
      {
        "id": "302",
        "name": "סמבה",
        "russianName": "самба"
      }
    ]
  },
  "33": {
    "id": "33",
    "name": "יגואר",
    "russianName": "ягуар",
    "models": [
      {
        "id": "1362",
        "name": "AK8",
        "russianName": "AK8"
      },
      {
        "id": "91161",
        "name": "E-Pace",
        "russianName": "E-Pace"
      },
      {
        "id": "38419",
        "name": "F Type",
        "russianName": "F Type"
      },
      {
        "id": "91162",
        "name": "F-Pace",
        "russianName": "F-Pace"
      },
      {
        "id": "91163",
        "name": "I-Pace",
        "russianName": "I-Pace"
      },
      {
        "id": "316",
        "name": "S TYPE",
        "russianName": "S TYPE"
      },
      {
        "id": "318",
        "name": "X TYPE",
        "russianName": "X TYPE"
      },
      {
        "id": "89317",
        "name": "XE",
        "russianName": "XE"
      },
      {
        "id": "1498",
        "name": "XF",
        "russianName": "XF"
      },
      {
        "id": "1363",
        "name": "XGR",
        "russianName": "XGR"
      },
      {
        "id": "308",
        "name": "XJ",
        "russianName": "XJ"
      },
      {
        "id": "317",
        "name": "XJ/XK8",
        "russianName": "XJ/XK8"
      },
      {
        "id": "312",
        "name": "XJ6",
        "russianName": "XJ6"
      },
      {
        "id": "313",
        "name": "XJ8",
        "russianName": "XJ8"
      },
      {
        "id": "1361",
        "name": "XJR",
        "russianName": "XJR"
      },
      {
        "id": "309",
        "name": "XJS",
        "russianName": "XJS"
      },
      {
        "id": "310",
        "name": "XK",
        "russianName": "XK"
      },
      {
        "id": "314",
        "name": "XK8",
        "russianName": "XK8"
      },
      {
        "id": "307",
        "name": "XKR",
        "russianName": "XKR"
      },
      {
        "id": "311",
        "name": "דיימלר",
        "russianName": "Даймлер"
      },
      {
        "id": "315",
        "name": "סוברין",
        "russianName": "Собрин"
      }
    ]
  },
  "34": {
    "id": "34",
    "name": "יונדאי",
    "russianName": "Хюндай",
    "models": [
      {
        "id": "1575",
        "name": "i10",
        "russianName": "i10"
      },
      {
        "id": "1576",
        "name": "i20",
        "russianName": "i20"
      },
      {
        "id": "91168",
        "name": "טוסון",
        "russianName": "Тусон"
      },
      {
        "id": "90834",
        "name": "איוניק 5",
        "russianName": "Ионический 5"
      },
      {
        "id": "89320",
        "name": "איוניק",
        "russianName": "ионный"
      },
      {
        "id": "1364",
        "name": "i30",
        "russianName": "i30"
      },
      {
        "id": "323",
        "name": "סונטה",
        "russianName": "сонет"
      },
      {
        "id": "90955",
        "name": "איוניק 6",
        "russianName": "Ионический 6"
      },
      {
        "id": "322",
        "name": "לנטרה",
        "russianName": "Лантра"
      },
      {
        "id": "91169",
        "name": "סנטה פה",
        "russianName": "Санта здесь"
      },
      {
        "id": "38420",
        "name": "H-1",
        "russianName": "H-1"
      },
      {
        "id": "89318",
        "name": "i20 קרוס",
        "russianName": "i20 Кросс"
      },
      {
        "id": "91164",
        "name": "I20N",
        "russianName": "I20N"
      },
      {
        "id": "64047",
        "name": "i25",
        "russianName": "i25"
      },
      {
        "id": "38421",
        "name": "i30 CW",
        "russianName": "i30 CW"
      },
      {
        "id": "91165",
        "name": "I30N",
        "russianName": "I30N"
      },
      {
        "id": "64050",
        "name": "i35 / אלנטרה",
        "russianName": "i35 / Элантра"
      },
      {
        "id": "38422",
        "name": "i40",
        "russianName": "i40"
      },
      {
        "id": "38423",
        "name": "ix20",
        "russianName": "ix20"
      },
      {
        "id": "91166",
        "name": "ix35",
        "russianName": "ix35"
      },
      {
        "id": "91167",
        "name": "ix55",
        "russianName": "ix55"
      },
      {
        "id": "320",
        "name": "אטוס",
        "russianName": "я буду летать"
      },
      {
        "id": "91171",
        "name": "איוניק 5 N",
        "russianName": "Ионный 5 Н"
      },
      {
        "id": "326",
        "name": "אלנטרה",
        "russianName": "Элантра"
      },
      {
        "id": "329",
        "name": "אנטרקולר",
        "russianName": "Интеркулер"
      },
      {
        "id": "321",
        "name": "אקסנט",
        "russianName": "Акцент"
      },
      {
        "id": "90976",
        "name": "באיון",
        "russianName": "Байон"
      },
      {
        "id": "91172",
        "name": "גאלופר",
        "russianName": "Галопер"
      },
      {
        "id": "1134",
        "name": "גטס",
        "russianName": "Гетц"
      },
      {
        "id": "1500",
        "name": "גטס החדשה FUN",
        "russianName": "Новые Гейтс FUN"
      },
      {
        "id": "89319",
        "name": "ג'נסיס / G90",
        "russianName": "Бытие / G90"
      },
      {
        "id": "38424",
        "name": "ג'נסיס",
        "russianName": "Бытие"
      },
      {
        "id": "64054",
        "name": "ולוסטר",
        "russianName": "Велостер"
      },
      {
        "id": "91173",
        "name": "וניו",
        "russianName": "Веню"
      },
      {
        "id": "91174",
        "name": "טאראקן",
        "russianName": "Туксон"
      },
      {
        "id": "1711",
        "name": "טרג'ט",
        "russianName": "Цель"
      },
      {
        "id": "1499",
        "name": "מטריקס",
        "russianName": "Матрица"
      },
      {
        "id": "1501",
        "name": "סונטה החדשה",
        "russianName": "Новая Соната"
      },
      {
        "id": "90833",
        "name": "סונטה הייבריד",
        "russianName": "Соната Гибрид"
      },
      {
        "id": "90999",
        "name": "סטאריה",
        "russianName": "Стария"
      },
      {
        "id": "91175",
        "name": "פליסדה",
        "russianName": "Палисейд"
      },
      {
        "id": "91170",
        "name": "קונה",
        "russianName": "Кона"
      },
      {
        "id": "324",
        "name": "קופה",
        "russianName": "Купе"
      }
    ]
  },
  "37": {
    "id": "37",
    "name": "לאדה",
    "russianName": "Лада",
    "models": [
      {
        "id": "91176",
        "name": "2108",
        "russianName": "2108"
      },
      {
        "id": "91177",
        "name": "2109",
        "russianName": "2109"
      },
      {
        "id": "91178",
        "name": "ניבה",
        "russianName": "Нива"
      },
      {
        "id": "381",
        "name": "סמרה",
        "russianName": "Самара"
      }
    ]
  },
  "38": {
    "id": "38",
    "name": "לנדרובר",
    "russianName": "Ленд Ровер",
    "models": [
      {
        "id": "91181",
        "name": "דיסקברי",
        "russianName": "Открытие"
      },
      {
        "id": "91182",
        "name": "דיסקברי ספורט",
        "russianName": "Дискавери Спорт"
      },
      {
        "id": "91183",
        "name": "דיפנדר",
        "russianName": "Защитник"
      },
      {
        "id": "91184",
        "name": "פרילנדר",
        "russianName": "фрилендер"
      },
      {
        "id": "91185",
        "name": "ריינג` רובר",
        "russianName": "Рендж Ровер"
      },
      {
        "id": "91186",
        "name": "ריינג` רובר איווק",
        "russianName": "Рендж Ровер Эвок"
      },
      {
        "id": "91187",
        "name": "ריינג` רובר וולאר",
        "russianName": "Рендж Ровер Волар"
      },
      {
        "id": "91188",
        "name": "ריינג` רובר ספורט",
        "russianName": "Рендж Ровер Спорт"
      }
    ]
  },
  "39": {
    "id": "39",
    "name": "לנציה",
    "russianName": "Лансия",
    "models": [
      {
        "id": "38425",
        "name": "אפסילון",
        "russianName": "Эпсилон"
      },
      {
        "id": "1187",
        "name": "בטא",
        "russianName": "Бета"
      },
      {
        "id": "391",
        "name": "דדרה",
        "russianName": "Дедра"
      },
      {
        "id": "388",
        "name": "דלתא",
        "russianName": "Дельта"
      },
      {
        "id": "392",
        "name": "פריזמה",
        "russianName": "Призма"
      },
      {
        "id": "389",
        "name": "קאפה",
        "russianName": "Каппа"
      },
      {
        "id": "390",
        "name": "תמה",
        "russianName": "тема"
      }
    ]
  },
  "46": {
    "id": "46",
    "name": "מאזדה",
    "russianName": "Мазда",
    "models": [
      {
        "id": "1365",
        "name": "2",
        "russianName": "2"
      },
      {
        "id": "1170",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "91196",
        "name": "CX-5",
        "russianName": "CX-5"
      },
      {
        "id": "91315",
        "name": "CX-3",
        "russianName": "CX-3"
      },
      {
        "id": "1227",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "1007",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "90430",
        "name": "CX-30",
        "russianName": "CX-30"
      },
      {
        "id": "91001",
        "name": "CX-50",
        "russianName": "CX-50"
      },
      {
        "id": "1744",
        "name": "החדשה  3",
        "russianName": "Новый 3"
      },
      {
        "id": "424",
        "name": "121",
        "russianName": "121"
      },
      {
        "id": "89333",
        "name": "2 דמיו",
        "russianName": "2 его изображение"
      },
      {
        "id": "425",
        "name": "323",
        "russianName": "323"
      },
      {
        "id": "1502",
        "name": "6 החדשה",
        "russianName": "Новый 6"
      },
      {
        "id": "426",
        "name": "626",
        "russianName": "626"
      },
      {
        "id": "91197",
        "name": "CX-60",
        "russianName": "CX-60"
      },
      {
        "id": "91198",
        "name": "CX-9",
        "russianName": "CX-9"
      },
      {
        "id": "91000",
        "name": "CX-90",
        "russianName": "CX-90"
      },
      {
        "id": "418",
        "name": "MPV",
        "russianName": "MPV"
      },
      {
        "id": "427",
        "name": "MX3",
        "russianName": "MX3"
      },
      {
        "id": "91199",
        "name": "MX-30",
        "russianName": "MX-30"
      },
      {
        "id": "428",
        "name": "MX5",
        "russianName": "MX5"
      },
      {
        "id": "1103",
        "name": "MX6",
        "russianName": "MX6"
      },
      {
        "id": "38429",
        "name": "MX-8",
        "russianName": "MX-8"
      },
      {
        "id": "1366",
        "name": "RX8",
        "russianName": "RX8"
      },
      {
        "id": "419",
        "name": "דמיו",
        "russianName": "его кровь"
      },
      {
        "id": "91200",
        "name": "טריביוט",
        "russianName": "Дань"
      },
      {
        "id": "429",
        "name": "לאנטיס",
        "russianName": "Антис"
      },
      {
        "id": "420",
        "name": "פרמסי",
        "russianName": "Аптека"
      },
      {
        "id": "430",
        "name": "קסדוס",
        "russianName": "Касд"
      }
    ]
  },
  "47": {
    "id": "47",
    "name": "מיצובישי",
    "russianName": "Мицубиси",
    "models": [
      {
        "id": "90836",
        "name": "אאוטלנדר",
        "russianName": "Чужестранка"
      },
      {
        "id": "38439",
        "name": "ספייס סטאר",
        "russianName": "Спайс Стар"
      },
      {
        "id": "89338",
        "name": "ASX",
        "russianName": "ASX"
      },
      {
        "id": "1367",
        "name": "אקליפס",
        "russianName": "Затмение"
      },
      {
        "id": "89339",
        "name": "אטראז`",
        "russianName": "Атрац"
      },
      {
        "id": "436",
        "name": "לנסר",
        "russianName": "пила"
      },
      {
        "id": "91206",
        "name": "פאג`רו",
        "russianName": "Паджеро"
      },
      {
        "id": "435",
        "name": "כריזמה",
        "russianName": "харизма"
      },
      {
        "id": "1504",
        "name": "GT3000",
        "russianName": "GT3000"
      },
      {
        "id": "38438",
        "name": "I-MIEV",
        "russianName": "I-MIEV"
      },
      {
        "id": "1119",
        "name": "איבו טורבו",
        "russianName": "Эво Турбо"
      },
      {
        "id": "91205",
        "name": "אקליפס קרוס",
        "russianName": "Крест Затмения"
      },
      {
        "id": "434",
        "name": "גאלאנט",
        "russianName": "Галантный"
      },
      {
        "id": "1171",
        "name": "גרנדיס",
        "russianName": "Грандис"
      },
      {
        "id": "64167",
        "name": "לנסר איוולושן",
        "russianName": "Лансер Эволюция"
      },
      {
        "id": "1583",
        "name": "לנסר הדור החדש",
        "russianName": "Лансер нового поколения"
      },
      {
        "id": "1172",
        "name": "לנסר החדשה",
        "russianName": "Новый Лансер"
      },
      {
        "id": "1581",
        "name": "לנסר ספורטבק",
        "russianName": "Лансер Спортбэк"
      },
      {
        "id": "1503",
        "name": "לנסר פרמיום",
        "russianName": "Премиум Лансер"
      },
      {
        "id": "1582",
        "name": "לנסר קלאסיק",
        "russianName": "Лансер Классик"
      },
      {
        "id": "437",
        "name": "סופר לנסר",
        "russianName": "Супер Лансер"
      },
      {
        "id": "438",
        "name": "סיגמא",
        "russianName": "Сигма"
      },
      {
        "id": "439",
        "name": "ספייס וואגן",
        "russianName": "Вагон специй"
      },
      {
        "id": "448",
        "name": "ספייס ראנר",
        "russianName": "Бегун со специями"
      },
      {
        "id": "443",
        "name": "צ`אמפ",
        "russianName": "Чемпион"
      },
      {
        "id": "440",
        "name": "קולט",
        "russianName": "рецептор"
      }
    ]
  },
  "48": {
    "id": "48",
    "name": "מרצדס",
    "russianName": "Мерседес",
    "models": [
      {
        "id": "451",
        "name": "180",
        "russianName": "180"
      },
      {
        "id": "459",
        "name": "190",
        "russianName": "190"
      },
      {
        "id": "460",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "461",
        "name": "220",
        "russianName": "220"
      },
      {
        "id": "462",
        "name": "230",
        "russianName": "230"
      },
      {
        "id": "463",
        "name": "240",
        "russianName": "240"
      },
      {
        "id": "464",
        "name": "250",
        "russianName": "250"
      },
      {
        "id": "465",
        "name": "260",
        "russianName": "260"
      },
      {
        "id": "466",
        "name": "270",
        "russianName": "270"
      },
      {
        "id": "467",
        "name": "280",
        "russianName": "280"
      },
      {
        "id": "468",
        "name": "300",
        "russianName": "300"
      },
      {
        "id": "469",
        "name": "320",
        "russianName": "320"
      },
      {
        "id": "1373",
        "name": "350",
        "russianName": "350"
      },
      {
        "id": "470",
        "name": "420",
        "russianName": "420"
      },
      {
        "id": "471",
        "name": "430",
        "russianName": "430"
      },
      {
        "id": "472",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "1370",
        "name": "55",
        "russianName": "55"
      },
      {
        "id": "1368",
        "name": "550",
        "russianName": "550"
      },
      {
        "id": "1369",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "1371",
        "name": "63",
        "russianName": "63"
      },
      {
        "id": "1372",
        "name": "65",
        "russianName": "65"
      },
      {
        "id": "1588",
        "name": "A-CLASS",
        "russianName": "A-CLASS"
      },
      {
        "id": "91207",
        "name": "AMG GT",
        "russianName": "AMG GT"
      },
      {
        "id": "1590",
        "name": "B-CLASS",
        "russianName": "B-CLASS"
      },
      {
        "id": "1591",
        "name": "C-CLASS",
        "russianName": "C-CLASS"
      },
      {
        "id": "38440",
        "name": "C-CLASS קופה",
        "russianName": "C-КЛАСС Купе"
      },
      {
        "id": "1601",
        "name": "CE",
        "russianName": "CE"
      },
      {
        "id": "1598",
        "name": "CL",
        "russianName": "CL"
      },
      {
        "id": "89343",
        "name": "CLA",
        "russianName": "CLA"
      },
      {
        "id": "1589",
        "name": "CLC",
        "russianName": "CLC"
      },
      {
        "id": "91209",
        "name": "CLE",
        "russianName": "CLE"
      },
      {
        "id": "1596",
        "name": "CLK",
        "russianName": "CLK"
      },
      {
        "id": "1595",
        "name": "CLS",
        "russianName": "CLS"
      },
      {
        "id": "1592",
        "name": "E- CLASS",
        "russianName": "E- CLASS"
      },
      {
        "id": "38441",
        "name": "E-CLASS קופה",
        "russianName": "Е-КЛАСС Купе"
      },
      {
        "id": "90880",
        "name": "EQA",
        "russianName": "EQA"
      },
      {
        "id": "90881",
        "name": "EQB",
        "russianName": "EQB"
      },
      {
        "id": "91208",
        "name": "EQC",
        "russianName": "EQC"
      },
      {
        "id": "90941",
        "name": "EQE",
        "russianName": "EQE"
      },
      {
        "id": "91210",
        "name": "EQE SUV",
        "russianName": "EQE SUV"
      },
      {
        "id": "90882",
        "name": "EQS",
        "russianName": "EQS"
      },
      {
        "id": "91211",
        "name": "EQS SUV",
        "russianName": "EQS SUV"
      },
      {
        "id": "91212",
        "name": "G-class",
        "russianName": "G-class"
      },
      {
        "id": "91214",
        "name": "GL",
        "russianName": "GL"
      },
      {
        "id": "89344",
        "name": "GLA",
        "russianName": "GLA"
      },
      {
        "id": "91215",
        "name": "GLB",
        "russianName": "GLB"
      },
      {
        "id": "91216",
        "name": "GLC",
        "russianName": "GLC"
      },
      {
        "id": "91217",
        "name": "GLC קופה",
        "russianName": "ГЛЦ Купе"
      },
      {
        "id": "91219",
        "name": "GLE",
        "russianName": "GLE"
      },
      {
        "id": "91218",
        "name": "GLE Coupe",
        "russianName": "GLE Coupe"
      },
      {
        "id": "91220",
        "name": "GLK",
        "russianName": "GLK"
      },
      {
        "id": "91221",
        "name": "GLS",
        "russianName": "GLS"
      },
      {
        "id": "89345",
        "name": "GT AMG",
        "russianName": "GT AMG"
      },
      {
        "id": "91222",
        "name": "ML",
        "russianName": "ML"
      },
      {
        "id": "1593",
        "name": "R-CLASS",
        "russianName": "R-CLASS"
      },
      {
        "id": "89346",
        "name": "S- CLASS קבריולט",
        "russianName": "S-КЛАСС Кабриолет"
      },
      {
        "id": "89347",
        "name": "S- CLASS קופה",
        "russianName": "S-КЛАСС Купе"
      },
      {
        "id": "1594",
        "name": "S-CLASS",
        "russianName": "S-CLASS"
      },
      {
        "id": "1600",
        "name": "SE",
        "russianName": "SE"
      },
      {
        "id": "38442",
        "name": "SL",
        "russianName": "SL"
      },
      {
        "id": "89348",
        "name": "SLC",
        "russianName": "SLC"
      },
      {
        "id": "1597",
        "name": "SLK",
        "russianName": "SLK"
      },
      {
        "id": "38443",
        "name": "SLS",
        "russianName": "SLS"
      },
      {
        "id": "91223",
        "name": "SLS AMG",
        "russianName": "SLS AMG"
      },
      {
        "id": "89349",
        "name": "V- CLASS",
        "russianName": "V- CLASS"
      }
    ]
  },
  "50": {
    "id": "50",
    "name": "ניסאן",
    "russianName": "Ниссан",
    "models": [
      {
        "id": "89353",
        "name": "קשקאי",
        "russianName": "Кашкай"
      },
      {
        "id": "38447",
        "name": "ג`וק",
        "russianName": "Джок"
      },
      {
        "id": "1235",
        "name": "מיקרה",
        "russianName": "микра"
      },
      {
        "id": "91227",
        "name": "איקס טרייל",
        "russianName": "Икс Трейл"
      },
      {
        "id": "487",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "38445",
        "name": "GT-R",
        "russianName": "GT-R"
      },
      {
        "id": "38446",
        "name": "SX200",
        "russianName": "SX200"
      },
      {
        "id": "38444",
        "name": "X370",
        "russianName": "X370"
      },
      {
        "id": "1605",
        "name": "Z350",
        "russianName": "Z350"
      },
      {
        "id": "1602",
        "name": "אלטימה",
        "russianName": "Алтима"
      },
      {
        "id": "488",
        "name": "אלמרה",
        "russianName": "Альмера"
      },
      {
        "id": "1604",
        "name": "טידה",
        "russianName": "Тида"
      },
      {
        "id": "38448",
        "name": "ליף",
        "russianName": "Лист"
      },
      {
        "id": "489",
        "name": "מקסימה",
        "russianName": "прекрасный"
      },
      {
        "id": "1375",
        "name": "נווארה",
        "russianName": "Наварра"
      },
      {
        "id": "1374",
        "name": "נוט / NOTE",
        "russianName": "Примечание/ПРИМЕЧАНИЕ"
      },
      {
        "id": "491",
        "name": "סאני",
        "russianName": "Солнечно"
      },
      {
        "id": "89352",
        "name": "סנטרה",
        "russianName": "Подбородок"
      },
      {
        "id": "91225",
        "name": "פאת`פיינדר",
        "russianName": "Следопыт"
      },
      {
        "id": "89351",
        "name": "פולסר",
        "russianName": "пульсар"
      },
      {
        "id": "91226",
        "name": "פטרול",
        "russianName": "патруль"
      },
      {
        "id": "485",
        "name": "פרימרה",
        "russianName": "Примера"
      },
      {
        "id": "1603",
        "name": "קווסט",
        "russianName": "Квест"
      }
    ]
  },
  "51": {
    "id": "51",
    "name": "סאאב",
    "russianName": "Сааб",
    "models": [
      {
        "id": "498",
        "name": "900",
        "russianName": "900"
      },
      {
        "id": "500",
        "name": "9000",
        "russianName": "9000"
      },
      {
        "id": "1173",
        "name": "9-3",
        "russianName": "9-3"
      },
      {
        "id": "497",
        "name": "9-5",
        "russianName": "9-5"
      },
      {
        "id": "1174",
        "name": "קונברטיבל",
        "russianName": "Кабриолет"
      }
    ]
  },
  "52": {
    "id": "52",
    "name": "סאנגיונג",
    "russianName": "Ссангёнг",
    "models": [
      {
        "id": "91228",
        "name": "אקטיון",
        "russianName": "Действие"
      },
      {
        "id": "91229",
        "name": "טיבולי",
        "russianName": "Тиволи"
      },
      {
        "id": "91230",
        "name": "מוסו",
        "russianName": "Муссо"
      },
      {
        "id": "91231",
        "name": "צ`רמן",
        "russianName": "Чарман"
      },
      {
        "id": "91232",
        "name": "קורנדו",
        "russianName": "Коронадо"
      },
      {
        "id": "89355",
        "name": "רודיוס",
        "russianName": "Родео"
      },
      {
        "id": "91233",
        "name": "רקסטון",
        "russianName": "Рекстон"
      }
    ]
  },
  "54": {
    "id": "54",
    "name": "סובארו",
    "russianName": "Субару",
    "models": [
      {
        "id": "38451",
        "name": "XV",
        "russianName": "XV"
      },
      {
        "id": "38449",
        "name": "BRZ",
        "russianName": "BRZ"
      },
      {
        "id": "91234",
        "name": "פורסטר",
        "russianName": "Лесник"
      },
      {
        "id": "91003",
        "name": "קרוסטרק",
        "russianName": "Перекресток"
      },
      {
        "id": "1189",
        "name": "B4",
        "russianName": "B4"
      },
      {
        "id": "89358",
        "name": "אימפרזה החדשה",
        "russianName": "Новая Импреза"
      },
      {
        "id": "91004",
        "name": "סולטרה",
        "russianName": "Солтра"
      },
      {
        "id": "1004",
        "name": "1300",
        "russianName": "1300"
      },
      {
        "id": "1005",
        "name": "1600",
        "russianName": "1600"
      },
      {
        "id": "1006",
        "name": "1800",
        "russianName": "1800"
      },
      {
        "id": "1376",
        "name": "B3",
        "russianName": "B3"
      },
      {
        "id": "64052",
        "name": "B3 האצ'בק",
        "russianName": "Б3 хэтчбек"
      },
      {
        "id": "64053",
        "name": "B3 סדאן",
        "russianName": "Б3 седан"
      },
      {
        "id": "1190",
        "name": "DL",
        "russianName": "DL"
      },
      {
        "id": "64168",
        "name": "GLF",
        "russianName": "GLF"
      },
      {
        "id": "38450",
        "name": "Outback",
        "russianName": "Outback"
      },
      {
        "id": "531",
        "name": "SVX",
        "russianName": "SVX"
      },
      {
        "id": "89357",
        "name": "אאוטבק החדשה",
        "russianName": "Новый Аутбек"
      },
      {
        "id": "89356",
        "name": "אאוטבק",
        "russianName": "глубинка"
      },
      {
        "id": "91235",
        "name": "אבולטיס/אסנט",
        "russianName": "Аволтис/Согласие"
      },
      {
        "id": "1608",
        "name": "אימפרזה STI",
        "russianName": "Импреза СТИ"
      },
      {
        "id": "532",
        "name": "אימפרזה גרנד לאונה",
        "russianName": "Импреза Гранд Леоне"
      },
      {
        "id": "1109",
        "name": "אימפרזה טורבו",
        "russianName": "Импреза Турбо"
      },
      {
        "id": "1607",
        "name": "אימפרזה ניו אייג`",
        "russianName": "Импреза Нью Эйдж"
      },
      {
        "id": "521",
        "name": "ג`אסטי",
        "russianName": "Джасти"
      },
      {
        "id": "533",
        "name": "האצ`בק",
        "russianName": "хэтчбек"
      },
      {
        "id": "524",
        "name": "טורבו ספורט",
        "russianName": "Турбо Спорт"
      },
      {
        "id": "91236",
        "name": "טריבקה",
        "russianName": "Трибека"
      },
      {
        "id": "535",
        "name": "לאונה",
        "russianName": "Леона"
      },
      {
        "id": "89359",
        "name": "לבורג",
        "russianName": "до винтика"
      },
      {
        "id": "536",
        "name": "לגאסי",
        "russianName": "Наследие"
      },
      {
        "id": "537",
        "name": "מיני סטיישן",
        "russianName": "Мини станция"
      },
      {
        "id": "539",
        "name": "קאסטום",
        "russianName": "Обычай"
      },
      {
        "id": "540",
        "name": "רקס",
        "russianName": "Рекс"
      }
    ]
  },
  "55": {
    "id": "55",
    "name": "סוזוקי",
    "russianName": "Сузуки",
    "models": [
      {
        "id": "559",
        "name": "סוויפט",
        "russianName": "Быстрый"
      },
      {
        "id": "546",
        "name": "איגניס",
        "russianName": "Игнис"
      },
      {
        "id": "91239",
        "name": "ג`ימני",
        "russianName": "Джимни"
      },
      {
        "id": "544",
        "name": "בלנו",
        "russianName": "в нас"
      },
      {
        "id": "553",
        "name": "אלטו",
        "russianName": "Альт"
      },
      {
        "id": "1377",
        "name": "SX4",
        "russianName": "SX4"
      },
      {
        "id": "89361",
        "name": "סלריו",
        "russianName": "Сельдерей"
      },
      {
        "id": "38453",
        "name": "ספלאש",
        "russianName": "Всплеск"
      },
      {
        "id": "91242",
        "name": "S-Cross",
        "russianName": "S-Cross"
      },
      {
        "id": "91241",
        "name": "XL7",
        "russianName": "XL7"
      },
      {
        "id": "91240",
        "name": "גרנד ויטרה",
        "russianName": "Гранд Витра"
      },
      {
        "id": "547",
        "name": "וואגון R+",
        "russianName": "Вагон Р+"
      },
      {
        "id": "91237",
        "name": "ויטרה",
        "russianName": "Витра"
      },
      {
        "id": "38452",
        "name": "יורו",
        "russianName": "евро"
      },
      {
        "id": "556",
        "name": "יורו סוויפט",
        "russianName": "Евро Свифт"
      },
      {
        "id": "548",
        "name": "ליאנה",
        "russianName": "Лиана"
      },
      {
        "id": "557",
        "name": "מרוטי",
        "russianName": "Марути"
      },
      {
        "id": "558",
        "name": "סדן",
        "russianName": "наковальня"
      },
      {
        "id": "1610",
        "name": "סוויפט החדשה",
        "russianName": "Новый Свифт"
      },
      {
        "id": "560",
        "name": "סופר בלנו",
        "russianName": "Супер Бельно"
      },
      {
        "id": "91238",
        "name": "סמוראי",
        "russianName": "Самурай"
      },
      {
        "id": "89360",
        "name": "קרוסאובר",
        "russianName": "Кроссовер"
      }
    ]
  },
  "59": {
    "id": "59",
    "name": "סיאט",
    "russianName": "Сиденье",
    "models": [
      {
        "id": "599",
        "name": "איביזה",
        "russianName": "Ибица"
      },
      {
        "id": "89363",
        "name": "ארונה",
        "russianName": "Арона"
      },
      {
        "id": "604",
        "name": "לאון",
        "russianName": "Леон"
      },
      {
        "id": "597",
        "name": "טולדו",
        "russianName": "Толедо"
      },
      {
        "id": "90433",
        "name": "לאון קופרה",
        "russianName": "Леон Купра"
      },
      {
        "id": "91243",
        "name": "אטקה",
        "russianName": "Атка"
      },
      {
        "id": "38454",
        "name": "אלהמברה",
        "russianName": "Альгамбра"
      },
      {
        "id": "1378",
        "name": "אלתיאה",
        "russianName": "Алтея"
      },
      {
        "id": "89362",
        "name": "אלתיאה XL",
        "russianName": "Алтея XL"
      },
      {
        "id": "91244",
        "name": "טראקו",
        "russianName": "Трако"
      },
      {
        "id": "38455",
        "name": "מי / Mii",
        "russianName": "Кто/Мии"
      },
      {
        "id": "600",
        "name": "מלגה",
        "russianName": "стипендия"
      },
      {
        "id": "601",
        "name": "מרבלה",
        "russianName": "Марбелья"
      },
      {
        "id": "602",
        "name": "קורדובה",
        "russianName": "Кордова"
      },
      {
        "id": "603",
        "name": "רונדה",
        "russianName": "Ронда"
      }
    ]
  },
  "61": {
    "id": "61",
    "name": "סיטרואן",
    "russianName": "Ситроен",
    "models": [
      {
        "id": "611",
        "name": "AX",
        "russianName": "AX"
      },
      {
        "id": "608",
        "name": "BX",
        "russianName": "BX"
      },
      {
        "id": "38456",
        "name": "C אליזה",
        "russianName": "С Элиза"
      },
      {
        "id": "91247",
        "name": "C קרוסר",
        "russianName": "С Кроссер"
      },
      {
        "id": "1746",
        "name": "C1",
        "russianName": "C1"
      },
      {
        "id": "38457",
        "name": "C15",
        "russianName": "C15"
      },
      {
        "id": "1612",
        "name": "C2",
        "russianName": "C2"
      },
      {
        "id": "1108",
        "name": "C3",
        "russianName": "C3"
      },
      {
        "id": "90434",
        "name": "C3 איירקרוס",
        "russianName": "C3 Аиркросс"
      },
      {
        "id": "38458",
        "name": "C3 פיקאסו",
        "russianName": "C3 Пикассо"
      },
      {
        "id": "1192",
        "name": "C4",
        "russianName": "C4"
      },
      {
        "id": "90435",
        "name": "C4 ספייסטורר",
        "russianName": "C4 Спидорер"
      },
      {
        "id": "1613",
        "name": "C4 פיקאסו",
        "russianName": "C4 Пикассо"
      },
      {
        "id": "89364",
        "name": "C4 קקטוס",
        "russianName": "C4 кактус"
      },
      {
        "id": "620",
        "name": "C5",
        "russianName": "C5"
      },
      {
        "id": "91248",
        "name": "C5 איירקרוס",
        "russianName": "C5 Аиркросс"
      },
      {
        "id": "1379",
        "name": "C6",
        "russianName": "C6"
      },
      {
        "id": "1147",
        "name": "C8",
        "russianName": "C8"
      },
      {
        "id": "612",
        "name": "CX",
        "russianName": "CX"
      },
      {
        "id": "38459",
        "name": "C-זירו",
        "russianName": "C-ноль"
      },
      {
        "id": "38460",
        "name": "DS3",
        "russianName": "DS3"
      },
      {
        "id": "38461",
        "name": "DS4",
        "russianName": "DS4"
      },
      {
        "id": "38462",
        "name": "DS5",
        "russianName": "DS5"
      },
      {
        "id": "90843",
        "name": "E-C4",
        "russianName": "E-C4"
      },
      {
        "id": "91249",
        "name": "E-C4 X",
        "russianName": "E-C4 X"
      },
      {
        "id": "614",
        "name": "XM",
        "russianName": "XM"
      },
      {
        "id": "615",
        "name": "ZX",
        "russianName": "ZX"
      },
      {
        "id": "616",
        "name": "ויזה",
        "russianName": "виза"
      },
      {
        "id": "617",
        "name": "סקסו",
        "russianName": "сексо"
      },
      {
        "id": "609",
        "name": "פיקסו",
        "russianName": "Пикассо"
      },
      {
        "id": "618",
        "name": "קסנטיה",
        "russianName": "Ксанта"
      },
      {
        "id": "619",
        "name": "קסרה",
        "russianName": "Касара"
      },
      {
        "id": "1614",
        "name": "קסרה פיקאסו",
        "russianName": "Ксерра Пикассо"
      }
    ]
  },
  "62": {
    "id": "62",
    "name": "סקודה",
    "russianName": "Шкода",
    "models": [
      {
        "id": "626",
        "name": "אוקטביה",
        "russianName": "Октавия"
      },
      {
        "id": "1013",
        "name": "סופרב",
        "russianName": "превосходно"
      },
      {
        "id": "91251",
        "name": "קודיאק",
        "russianName": "Кадьяк"
      },
      {
        "id": "627",
        "name": "פאביה",
        "russianName": "Фабия"
      },
      {
        "id": "91250",
        "name": "קארוק",
        "russianName": "Караоке"
      },
      {
        "id": "38467",
        "name": "ראפיד",
        "russianName": "Стремительный"
      },
      {
        "id": "90942",
        "name": "אניאק",
        "russianName": "Аньяк"
      },
      {
        "id": "91002",
        "name": "סקאלה",
        "russianName": "Скала"
      },
      {
        "id": "38464",
        "name": "אוקטביה ספייס",
        "russianName": "Октавия Спайс"
      },
      {
        "id": "1747",
        "name": "ייטי",
        "russianName": "Йети"
      },
      {
        "id": "632",
        "name": "ניו פליסיה",
        "russianName": "Новая Фелиция"
      },
      {
        "id": "38465",
        "name": "סיטיגו / Citygo",
        "russianName": "Ситиго / Ситиго"
      },
      {
        "id": "89367",
        "name": "ספייסבק",
        "russianName": "Космосбэк"
      },
      {
        "id": "38466",
        "name": "פאביה ספייס",
        "russianName": "Фабия Спайс"
      },
      {
        "id": "631",
        "name": "פורמן",
        "russianName": "Бригадир"
      },
      {
        "id": "630",
        "name": "פייבוריט",
        "russianName": "Любимый"
      },
      {
        "id": "625",
        "name": "פליסיה",
        "russianName": "Фелисия"
      },
      {
        "id": "91252",
        "name": "קאמיק",
        "russianName": "комикс"
      },
      {
        "id": "90436",
        "name": "ראפיד ספייסבק",
        "russianName": "Быстрый космос"
      },
      {
        "id": "1380",
        "name": "רומסטר",
        "russianName": "Румстер"
      }
    ]
  },
  "63": {
    "id": "63",
    "name": "פיג'ו",
    "russianName": "Пежо",
    "models": [
      {
        "id": "89384",
        "name": "108",
        "russianName": "108"
      },
      {
        "id": "1397",
        "name": "107",
        "russianName": "107"
      },
      {
        "id": "38474",
        "name": "5008",
        "russianName": "5008"
      },
      {
        "id": "38469",
        "name": "208",
        "russianName": "208"
      },
      {
        "id": "90987",
        "name": "408",
        "russianName": "408"
      },
      {
        "id": "1551",
        "name": "308",
        "russianName": "308"
      },
      {
        "id": "89385",
        "name": "2008",
        "russianName": "2008"
      },
      {
        "id": "38471",
        "name": "3008",
        "russianName": "3008"
      },
      {
        "id": "638",
        "name": "104",
        "russianName": "104"
      },
      {
        "id": "639",
        "name": "106",
        "russianName": "106"
      },
      {
        "id": "1398",
        "name": "204",
        "russianName": "204"
      },
      {
        "id": "640",
        "name": "205",
        "russianName": "205"
      },
      {
        "id": "641",
        "name": "206",
        "russianName": "206"
      },
      {
        "id": "38468",
        "name": "206+",
        "russianName": "206+"
      },
      {
        "id": "89386",
        "name": "206CC",
        "russianName": "206CC"
      },
      {
        "id": "1399",
        "name": "207",
        "russianName": "207"
      },
      {
        "id": "38470",
        "name": "208 GTI",
        "russianName": "208 GTI"
      },
      {
        "id": "38472",
        "name": "301",
        "russianName": "301"
      },
      {
        "id": "635",
        "name": "305",
        "russianName": "305"
      },
      {
        "id": "637",
        "name": "306",
        "russianName": "306"
      },
      {
        "id": "651",
        "name": "307",
        "russianName": "307"
      },
      {
        "id": "38473",
        "name": "308CC",
        "russianName": "308CC"
      },
      {
        "id": "646",
        "name": "309",
        "russianName": "309"
      },
      {
        "id": "636",
        "name": "405",
        "russianName": "405"
      },
      {
        "id": "647",
        "name": "406",
        "russianName": "406"
      },
      {
        "id": "1176",
        "name": "407",
        "russianName": "407"
      },
      {
        "id": "648",
        "name": "504",
        "russianName": "504"
      },
      {
        "id": "649",
        "name": "505",
        "russianName": "505"
      },
      {
        "id": "38475",
        "name": "508",
        "russianName": "508"
      },
      {
        "id": "650",
        "name": "605",
        "russianName": "605"
      },
      {
        "id": "642",
        "name": "607",
        "russianName": "607"
      },
      {
        "id": "38476",
        "name": "iOn",
        "russianName": "iOn"
      },
      {
        "id": "38477",
        "name": "RCZ",
        "russianName": "RCZ"
      }
    ]
  },
  "65": {
    "id": "65",
    "name": "פולקסווגן",
    "russianName": "Фольксваген",
    "models": [
      {
        "id": "89372",
        "name": "CADDY COMBI",
        "russianName": "CADDY COMBI"
      },
      {
        "id": "90984",
        "name": "ID.3",
        "russianName": "ID.3"
      },
      {
        "id": "91256",
        "name": "ID.4",
        "russianName": "ID.4"
      },
      {
        "id": "90957",
        "name": "ID.5",
        "russianName": "ID.5"
      },
      {
        "id": "90958",
        "name": "ID.6",
        "russianName": "ID.6"
      },
      {
        "id": "91257",
        "name": "ID.7",
        "russianName": "ID.7"
      },
      {
        "id": "91258",
        "name": "ID.Buzz",
        "russianName": "ID.Buzz"
      },
      {
        "id": "91261",
        "name": "אטלס",
        "russianName": "атлас"
      },
      {
        "id": "1382",
        "name": "איוס",
        "russianName": "Иос"
      },
      {
        "id": "89371",
        "name": "אפ / UP",
        "russianName": "ВВЕРХ"
      },
      {
        "id": "90437",
        "name": "ארטאון",
        "russianName": "Артаун"
      },
      {
        "id": "670",
        "name": "בורה",
        "russianName": "Невежественный"
      },
      {
        "id": "663",
        "name": "ג`טה",
        "russianName": "Джетта"
      },
      {
        "id": "671",
        "name": "גולף",
        "russianName": "гольф"
      },
      {
        "id": "1751",
        "name": "גולף GTI",
        "russianName": "Гольф ГТИ"
      },
      {
        "id": "89370",
        "name": "גולף R",
        "russianName": "Гольф Р"
      },
      {
        "id": "1618",
        "name": "גולף החדשה",
        "russianName": "Новый Гольф"
      },
      {
        "id": "1619",
        "name": "גולף החדשה 6",
        "russianName": "Новый Гольф 6"
      },
      {
        "id": "89369",
        "name": "גולף ספורטסוואן",
        "russianName": "Гольф Спортвэн"
      },
      {
        "id": "1381",
        "name": "גולף פלוס",
        "russianName": "Гольф Плюс"
      },
      {
        "id": "672",
        "name": "דרבי",
        "russianName": "дерби"
      },
      {
        "id": "673",
        "name": "ונטו",
        "russianName": "и нетто"
      },
      {
        "id": "674",
        "name": "חיפושית",
        "russianName": "жук"
      },
      {
        "id": "679",
        "name": "חיפושית חדשה",
        "russianName": "Новый жук"
      },
      {
        "id": "91259",
        "name": "טוארג",
        "russianName": "Туареги"
      },
      {
        "id": "38478",
        "name": "טוראן",
        "russianName": "Туран"
      },
      {
        "id": "91255",
        "name": "טי קרוס",
        "russianName": "Т. Кросс"
      },
      {
        "id": "91262",
        "name": "טי רוק",
        "russianName": "Ти Рок"
      },
      {
        "id": "91260",
        "name": "טיגואן",
        "russianName": "Тигуан"
      },
      {
        "id": "91263",
        "name": "טיגואן אולספייס",
        "russianName": "Тигуан Оллспейс"
      },
      {
        "id": "1384",
        "name": "ניו-טוראן",
        "russianName": "Новый Туран"
      },
      {
        "id": "675",
        "name": "פאסאט",
        "russianName": "Пассат"
      },
      {
        "id": "1623",
        "name": "פאסאט CC",
        "russianName": "Пассат СС"
      },
      {
        "id": "1622",
        "name": "פאסאט החדשה",
        "russianName": "Новый Пассат"
      },
      {
        "id": "676",
        "name": "פולו",
        "russianName": "поло"
      },
      {
        "id": "89368",
        "name": "פולו GTI",
        "russianName": "Поло ГТИ"
      },
      {
        "id": "1620",
        "name": "פולו החדשה",
        "russianName": "Новый Поло"
      },
      {
        "id": "1621",
        "name": "פולו קלאסיק",
        "russianName": "Поло Классик"
      },
      {
        "id": "1383",
        "name": "פייטון",
        "russianName": "Пейтон"
      },
      {
        "id": "677",
        "name": "קוראדו",
        "russianName": "Коррадо"
      },
      {
        "id": "678",
        "name": "שירוקו",
        "russianName": "Широко"
      }
    ]
  },
  "67": {
    "id": "67",
    "name": "פונטיאק",
    "russianName": "Понтиак",
    "models": [
      {
        "id": "1617",
        "name": "G6",
        "russianName": "G6"
      },
      {
        "id": "690",
        "name": "LE 6000",
        "russianName": "LE 6000"
      },
      {
        "id": "89373",
        "name": "אזטק",
        "russianName": "ацтекский"
      },
      {
        "id": "687",
        "name": "בונוביל",
        "russianName": "Боновиль"
      },
      {
        "id": "1385",
        "name": "גרנד אם",
        "russianName": "Гранд Ам"
      },
      {
        "id": "688",
        "name": "גרנד פרי",
        "russianName": "Гран-при"
      },
      {
        "id": "689",
        "name": "טמפסט",
        "russianName": "Буря"
      },
      {
        "id": "1121",
        "name": "טרנס אם",
        "russianName": "транс-мать"
      },
      {
        "id": "1386",
        "name": "סולסטיס",
        "russianName": "Солнцестояние"
      },
      {
        "id": "691",
        "name": "סנבירד",
        "russianName": "Солнечная птица"
      },
      {
        "id": "1387",
        "name": "פיירבירד",
        "russianName": "Жар-птица"
      }
    ]
  },
  "68": {
    "id": "68",
    "name": "פורד",
    "russianName": "Форд",
    "models": [
      {
        "id": "90944",
        "name": "מוסטנג Mach-E",
        "russianName": "Мустанг Мах-Э"
      },
      {
        "id": "706",
        "name": "פיאסטה",
        "russianName": "Фиеста"
      },
      {
        "id": "705",
        "name": "פוקוס",
        "russianName": "сосредоточиться"
      },
      {
        "id": "701",
        "name": "מונדאו",
        "russianName": "Мондео"
      },
      {
        "id": "702",
        "name": "מוסטנג",
        "russianName": "мустанг"
      },
      {
        "id": "700",
        "name": "טאורוס",
        "russianName": "Телец"
      },
      {
        "id": "89374",
        "name": "GT-R",
        "russianName": "GT-R"
      },
      {
        "id": "1216",
        "name": "Rs2000",
        "russianName": "Rs2000"
      },
      {
        "id": "1389",
        "name": "S MAX",
        "russianName": "S MAX"
      },
      {
        "id": "91265",
        "name": "אדג`",
        "russianName": "Край"
      },
      {
        "id": "695",
        "name": "אוריון",
        "russianName": "Орион"
      },
      {
        "id": "696",
        "name": "אסקורט אריקה",
        "russianName": "Эскорт Эрика"
      },
      {
        "id": "1014",
        "name": "אסקורט",
        "russianName": "Эскорт"
      },
      {
        "id": "91276",
        "name": "אסקייפ",
        "russianName": "Побег"
      },
      {
        "id": "91266",
        "name": "אקספדישן",
        "russianName": "Экспедиция"
      },
      {
        "id": "91264",
        "name": "אקספלורר",
        "russianName": "Исследователь"
      },
      {
        "id": "91267",
        "name": "ברונקו",
        "russianName": "Бронко"
      },
      {
        "id": "91270",
        "name": "ברונקו ספורט",
        "russianName": "Бронко Спорт"
      },
      {
        "id": "693",
        "name": "ברנדה",
        "russianName": "Бренда"
      },
      {
        "id": "1392",
        "name": "גלאקסי",
        "russianName": "Галактика"
      },
      {
        "id": "698",
        "name": "דינמיק",
        "russianName": "Динамический"
      },
      {
        "id": "699",
        "name": "וינדסטאר",
        "russianName": "Ветрозвезда"
      },
      {
        "id": "89375",
        "name": "טורר",
        "russianName": "Торр"
      },
      {
        "id": "708",
        "name": "טרייסר",
        "russianName": "Трейсер"
      },
      {
        "id": "89377",
        "name": "לינקולן - MKC",
        "russianName": "Линкольн - МКЦ"
      },
      {
        "id": "89378",
        "name": "לינקולן - MKS",
        "russianName": "Линкольн - МКС"
      },
      {
        "id": "89379",
        "name": "לינקולן - MKZ",
        "russianName": "Линкольн - МКЗ"
      },
      {
        "id": "1624",
        "name": "מוסטנג GT500",
        "russianName": "Мустанг GT500"
      },
      {
        "id": "1388",
        "name": "מרקורי",
        "russianName": "Меркурий"
      },
      {
        "id": "703",
        "name": "סיארה",
        "russianName": "Сиара"
      },
      {
        "id": "704",
        "name": "סקורפיו",
        "russianName": "Скорпион"
      },
      {
        "id": "91273",
        "name": "פומה",
        "russianName": "пума"
      },
      {
        "id": "89376",
        "name": "פיוז`ן",
        "russianName": "Слияние"
      },
      {
        "id": "91274",
        "name": "קוגה",
        "russianName": "Куга"
      },
      {
        "id": "64162",
        "name": "קונקט",
        "russianName": "Соединять"
      },
      {
        "id": "707",
        "name": "קורטינה",
        "russianName": "Кортина"
      },
      {
        "id": "1625",
        "name": "ת`נדרבירד",
        "russianName": "Тандерберд"
      }
    ]
  },
  "70": {
    "id": "70",
    "name": "פורשה",
    "russianName": "Порше",
    "models": [
      {
        "id": "717",
        "name": "בוקסטר",
        "russianName": "Бокстер"
      },
      {
        "id": "1754",
        "name": "פאנאמרה",
        "russianName": "Панамера"
      },
      {
        "id": "89403",
        "name": "מקאן GTS",
        "russianName": "Макан ГТС"
      },
      {
        "id": "89396",
        "name": "718 בוקסטר",
        "russianName": "718 Бокстер"
      },
      {
        "id": "64170",
        "name": "718 קיימן",
        "russianName": "718 Кайман"
      },
      {
        "id": "89397",
        "name": "911 GT2 RS",
        "russianName": "911 GT2 RS"
      },
      {
        "id": "89398",
        "name": "911 GT3",
        "russianName": "911 GT3"
      },
      {
        "id": "89399",
        "name": "911 GTS",
        "russianName": "911 GTS"
      },
      {
        "id": "89400",
        "name": "911 טארגה",
        "russianName": "911 Тарга"
      },
      {
        "id": "89401",
        "name": "911 טורבו",
        "russianName": "911 Турбо"
      },
      {
        "id": "89402",
        "name": "911 קאררה T",
        "russianName": "911 Каррера Т"
      },
      {
        "id": "718",
        "name": "911 קאררה",
        "russianName": "911 Каррера"
      },
      {
        "id": "91279",
        "name": "טייקן",
        "russianName": "забрали"
      },
      {
        "id": "91277",
        "name": "מקאן",
        "russianName": "из Канн"
      },
      {
        "id": "1393",
        "name": "קאיימן",
        "russianName": "Кайман"
      },
      {
        "id": "91278",
        "name": "קאיין",
        "russianName": "Кайенна"
      }
    ]
  },
  "73": {
    "id": "73",
    "name": "פיאט",
    "russianName": "Фиат",
    "models": [
      {
        "id": "760",
        "name": "פונטו",
        "russianName": "Пунто"
      },
      {
        "id": "1107",
        "name": "פנדה",
        "russianName": "Панда"
      },
      {
        "id": "756",
        "name": "טיפו",
        "russianName": "типо"
      },
      {
        "id": "89380",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "742",
        "name": "אונו",
        "russianName": "оно"
      },
      {
        "id": "746",
        "name": "127",
        "russianName": "127"
      },
      {
        "id": "747",
        "name": "131",
        "russianName": "131"
      },
      {
        "id": "748",
        "name": "132",
        "russianName": "132"
      },
      {
        "id": "1626",
        "name": "500 החדשה",
        "russianName": "Новые 500"
      },
      {
        "id": "64163",
        "name": "500C",
        "russianName": "500C"
      },
      {
        "id": "90981",
        "name": "500E",
        "russianName": "500E"
      },
      {
        "id": "89381",
        "name": "500L",
        "russianName": "500L"
      },
      {
        "id": "89382",
        "name": "500X",
        "russianName": "500X"
      },
      {
        "id": "91281",
        "name": "Matrix",
        "russianName": "Matrix"
      },
      {
        "id": "89383",
        "name": "אבארת",
        "russianName": "Абарт"
      },
      {
        "id": "749",
        "name": "אונו סיליקטה",
        "russianName": "уно силикат"
      },
      {
        "id": "750",
        "name": "בראבה",
        "russianName": "Брава"
      },
      {
        "id": "754",
        "name": "בראבו",
        "russianName": "Браво"
      },
      {
        "id": "755",
        "name": "דונה",
        "russianName": "Донна"
      },
      {
        "id": "757",
        "name": "טמפרה",
        "russianName": "Темпера"
      },
      {
        "id": "1265",
        "name": "יוליסה",
        "russianName": "Улиса"
      },
      {
        "id": "1396",
        "name": "כרומה",
        "russianName": "хром"
      },
      {
        "id": "1120",
        "name": "מולטיפלה",
        "russianName": "многогранный"
      },
      {
        "id": "759",
        "name": "מריאה",
        "russianName": "взлетает"
      },
      {
        "id": "64169",
        "name": "סדיצ'י",
        "russianName": "Садичи"
      },
      {
        "id": "1395",
        "name": "סקודו",
        "russianName": "Скудо"
      },
      {
        "id": "90439",
        "name": "פונוטו איבו",
        "russianName": "Поното Ибо"
      },
      {
        "id": "1394",
        "name": "פונטו גרנדה",
        "russianName": "Понто-Гранде"
      },
      {
        "id": "1175",
        "name": "פונטו ספייס",
        "russianName": "Пунто Спайс"
      },
      {
        "id": "64164",
        "name": "קובו / QUBO",
        "russianName": "КУБО"
      },
      {
        "id": "762",
        "name": "קופה",
        "russianName": "Театральная касса"
      },
      {
        "id": "743",
        "name": "רגאטה",
        "russianName": "Регата"
      },
      {
        "id": "761",
        "name": "ריטמו",
        "russianName": "Ритм"
      }
    ]
  },
  "75": {
    "id": "75",
    "name": "קאדילק",
    "russianName": "Кадиллак",
    "models": [
      {
        "id": "38481",
        "name": "ATS",
        "russianName": "ATS"
      },
      {
        "id": "91292",
        "name": "CT5",
        "russianName": "CT5"
      },
      {
        "id": "89395",
        "name": "CT6",
        "russianName": "CT6"
      },
      {
        "id": "1016",
        "name": "CTS",
        "russianName": "CTS"
      },
      {
        "id": "91293",
        "name": "DTS",
        "russianName": "DTS"
      },
      {
        "id": "91291",
        "name": "SRX",
        "russianName": "SRX"
      },
      {
        "id": "1759",
        "name": "STS",
        "russianName": "STS"
      },
      {
        "id": "89394",
        "name": "XLR",
        "russianName": "XLR"
      },
      {
        "id": "91289",
        "name": "XT4",
        "russianName": "XT4"
      },
      {
        "id": "91290",
        "name": "XT5",
        "russianName": "XT5"
      },
      {
        "id": "90445",
        "name": "XT6",
        "russianName": "XT6"
      },
      {
        "id": "89393",
        "name": "XTS",
        "russianName": "XTS"
      },
      {
        "id": "91288",
        "name": "אסקלייד",
        "russianName": "Эскалада"
      },
      {
        "id": "1400",
        "name": "סוויל",
        "russianName": "Севилья"
      },
      {
        "id": "775",
        "name": "סוויל",
        "russianName": "Севилья"
      }
    ]
  },
  "76": {
    "id": "76",
    "name": "קיה",
    "russianName": "Киа",
    "models": [
      {
        "id": "1403",
        "name": "פיקנטו",
        "russianName": "Пиканто"
      },
      {
        "id": "91294",
        "name": "ספורטאז`",
        "russianName": "Спортейдж"
      },
      {
        "id": "786",
        "name": "ריו",
        "russianName": "Рио"
      },
      {
        "id": "1760",
        "name": "פורטה",
        "russianName": "форте"
      },
      {
        "id": "90447",
        "name": "סטוניק",
        "russianName": "Стоник"
      },
      {
        "id": "90945",
        "name": "EV6",
        "russianName": "EV6"
      },
      {
        "id": "90446",
        "name": "נירו EV",
        "russianName": "Неро ЕВ"
      },
      {
        "id": "1627",
        "name": "סיד",
        "russianName": "лайм"
      },
      {
        "id": "91298",
        "name": "EV9",
        "russianName": "EV9"
      },
      {
        "id": "91299",
        "name": "K9",
        "russianName": "K9"
      },
      {
        "id": "779",
        "name": "KT900",
        "russianName": "KT900"
      },
      {
        "id": "91300",
        "name": "XCeed",
        "russianName": "XCeed"
      },
      {
        "id": "38482",
        "name": "אופטימה",
        "russianName": "Оптима"
      },
      {
        "id": "1401",
        "name": "אופירוס",
        "russianName": "Офир"
      },
      {
        "id": "784",
        "name": "ג`ויס",
        "russianName": "Джойс"
      },
      {
        "id": "91297",
        "name": "טלורייד",
        "russianName": "Теллурайд"
      },
      {
        "id": "777",
        "name": "לאו",
        "russianName": "Нет"
      },
      {
        "id": "1402",
        "name": "מג'נטיס",
        "russianName": "Маджентис"
      },
      {
        "id": "778",
        "name": "מנטור",
        "russianName": "Наставник"
      },
      {
        "id": "89406",
        "name": "נירו הייבריד",
        "russianName": "Неро Гибрид"
      },
      {
        "id": "90964",
        "name": "נירו פלוס",
        "russianName": "Неро Плюс"
      },
      {
        "id": "38483",
        "name": "סול",
        "russianName": "Г"
      },
      {
        "id": "91296",
        "name": "סורנטו",
        "russianName": "Сорренто"
      },
      {
        "id": "89405",
        "name": "סטינגר",
        "russianName": "Жало"
      },
      {
        "id": "91295",
        "name": "סלטוס",
        "russianName": "Кельтус"
      },
      {
        "id": "780",
        "name": "ספיה",
        "russianName": "Сепия"
      },
      {
        "id": "1270",
        "name": "סראטו",
        "russianName": "Серато"
      },
      {
        "id": "781",
        "name": "פרייד",
        "russianName": "Жареный"
      },
      {
        "id": "1404",
        "name": "קארנס",
        "russianName": "Каренс"
      },
      {
        "id": "89404",
        "name": "קדנזה",
        "russianName": "каденция"
      },
      {
        "id": "782",
        "name": "קלארוס",
        "russianName": "Кларос"
      },
      {
        "id": "1405",
        "name": "קריאטו",
        "russianName": "Креато"
      },
      {
        "id": "1041",
        "name": "קרניבל",
        "russianName": "Карнавал"
      },
      {
        "id": "783",
        "name": "שומה",
        "russianName": "оценка"
      }
    ]
  },
  "80": {
    "id": "80",
    "name": "קרייזלר",
    "russianName": "Крайслер",
    "models": [
      {
        "id": "89407",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "1177",
        "name": "300C",
        "russianName": "300C"
      },
      {
        "id": "1636",
        "name": "300C SRT",
        "russianName": "300C SRT"
      },
      {
        "id": "829",
        "name": "300M",
        "russianName": "300M"
      },
      {
        "id": "838",
        "name": "PT קרוזר",
        "russianName": "ПТ Крейсер"
      },
      {
        "id": "1406",
        "name": "אימפיריאל",
        "russianName": "Империал"
      },
      {
        "id": "38484",
        "name": "גראנד וויאג`ר",
        "russianName": "Гранд Вояджер"
      },
      {
        "id": "836",
        "name": "וויאג`ר",
        "russianName": "Вояджер"
      },
      {
        "id": "828",
        "name": "ויז'ן",
        "russianName": "Зрение"
      },
      {
        "id": "89408",
        "name": "טאון קאנטרי",
        "russianName": "Город Страна"
      },
      {
        "id": "830",
        "name": "נאון",
        "russianName": "неон"
      },
      {
        "id": "834",
        "name": "סברינג",
        "russianName": "Себринг"
      },
      {
        "id": "831",
        "name": "סטרטוס",
        "russianName": "Стратос"
      },
      {
        "id": "832",
        "name": "סרטוגה",
        "russianName": "Саратога"
      },
      {
        "id": "91301",
        "name": "פסיפיקה",
        "russianName": "Пасифика"
      },
      {
        "id": "89409",
        "name": "קאליבר",
        "russianName": "Калибр"
      },
      {
        "id": "1407",
        "name": "קומנדר",
        "russianName": "Командир"
      },
      {
        "id": "1408",
        "name": "קרוספייר",
        "russianName": "Перекрестный огонь"
      }
    ]
  },
  "81": {
    "id": "81",
    "name": "רובר",
    "russianName": "Ровер",
    "models": [
      {
        "id": "841",
        "name": "214",
        "russianName": "214"
      },
      {
        "id": "840",
        "name": "216",
        "russianName": "216"
      },
      {
        "id": "847",
        "name": "223",
        "russianName": "223"
      },
      {
        "id": "842",
        "name": "414",
        "russianName": "414"
      },
      {
        "id": "843",
        "name": "416",
        "russianName": "416"
      },
      {
        "id": "844",
        "name": "420",
        "russianName": "420"
      },
      {
        "id": "845",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "846",
        "name": "620",
        "russianName": "620"
      },
      {
        "id": "854",
        "name": "620/600",
        "russianName": "620/600"
      },
      {
        "id": "858",
        "name": "623",
        "russianName": "623"
      },
      {
        "id": "848",
        "name": "75",
        "russianName": "75"
      },
      {
        "id": "849",
        "name": "825",
        "russianName": "825"
      },
      {
        "id": "850",
        "name": "827",
        "russianName": "827"
      },
      {
        "id": "1017",
        "name": "MG",
        "russianName": "MG"
      },
      {
        "id": "38485",
        "name": "MG VVS",
        "russianName": "MG VVS"
      },
      {
        "id": "1633",
        "name": "MG ZR",
        "russianName": "MG ZR"
      },
      {
        "id": "1634",
        "name": "MG ZS",
        "russianName": "MG ZS"
      },
      {
        "id": "1635",
        "name": "MG ZT",
        "russianName": "MG ZT"
      },
      {
        "id": "851",
        "name": "MGF",
        "russianName": "MGF"
      },
      {
        "id": "852",
        "name": "MGVVC",
        "russianName": "MGVVC"
      },
      {
        "id": "1410",
        "name": "MGZ",
        "russianName": "MGZ"
      },
      {
        "id": "856",
        "name": "R25",
        "russianName": "R25"
      },
      {
        "id": "855",
        "name": "R45",
        "russianName": "R45"
      },
      {
        "id": "862",
        "name": "R75",
        "russianName": "R75"
      },
      {
        "id": "853",
        "name": "פרילנד",
        "russianName": "Фриланд"
      }
    ]
  },
  "83": {
    "id": "83",
    "name": "רנו",
    "russianName": "Рено",
    "models": [
      {
        "id": "90990",
        "name": "ארקנה",
        "russianName": "арканы"
      },
      {
        "id": "884",
        "name": "קליאו",
        "russianName": "Клео"
      },
      {
        "id": "89412",
        "name": "קפצ`ור",
        "russianName": "Капчаур"
      },
      {
        "id": "90991",
        "name": "אוסטרל",
        "russianName": "австралийский"
      },
      {
        "id": "90992",
        "name": "מגאן E-Tech",
        "russianName": "Меган И-Тек"
      },
      {
        "id": "38491",
        "name": "זואי",
        "russianName": "Зои"
      },
      {
        "id": "873",
        "name": "11",
        "russianName": "11"
      },
      {
        "id": "870",
        "name": "18",
        "russianName": "18"
      },
      {
        "id": "874",
        "name": "19",
        "russianName": "19"
      },
      {
        "id": "875",
        "name": "21",
        "russianName": "21"
      },
      {
        "id": "876",
        "name": "25",
        "russianName": "25"
      },
      {
        "id": "38486",
        "name": "4",
        "russianName": "4"
      },
      {
        "id": "877",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "878",
        "name": "9",
        "russianName": "9"
      },
      {
        "id": "38487",
        "name": "אספאס",
        "russianName": "Эспас"
      },
      {
        "id": "1775",
        "name": "גרנד סניק",
        "russianName": "Гранд Сценик"
      },
      {
        "id": "1776",
        "name": "וול סאטיס",
        "russianName": "Стена Сатис"
      },
      {
        "id": "879",
        "name": "טווינגו",
        "russianName": "Твинго"
      },
      {
        "id": "1632",
        "name": "טליה",
        "russianName": "Талия"
      },
      {
        "id": "880",
        "name": "לגונה",
        "russianName": "лагуна"
      },
      {
        "id": "1777",
        "name": "לוגאן MCV",
        "russianName": "Логан MCV"
      },
      {
        "id": "38488",
        "name": "לטיטוד",
        "russianName": "Титоду"
      },
      {
        "id": "881",
        "name": "מגאן 1",
        "russianName": "Меган 1"
      },
      {
        "id": "1412",
        "name": "מגאן 2",
        "russianName": "Меган 2"
      },
      {
        "id": "90451",
        "name": "מגאן 3",
        "russianName": "Меган 3"
      },
      {
        "id": "90450",
        "name": "מגאן אסטייט / גראנד טור",
        "russianName": "Меган Эстейт / Гранд Тур"
      },
      {
        "id": "38489",
        "name": "מגאן החדשה",
        "russianName": "Новый Меган"
      },
      {
        "id": "1774",
        "name": "מגאן קופה / ספורט",
        "russianName": "Меган Купе / Спорт"
      },
      {
        "id": "1772",
        "name": "סימבול",
        "russianName": "символ"
      },
      {
        "id": "882",
        "name": "סניק",
        "russianName": "Сник"
      },
      {
        "id": "1413",
        "name": "סניק 2",
        "russianName": "Живописный 2"
      },
      {
        "id": "38490",
        "name": "סניק 3",
        "russianName": "Живописный 3"
      },
      {
        "id": "1414",
        "name": "ספרן",
        "russianName": "библиотекарь"
      },
      {
        "id": "883",
        "name": "פואגו",
        "russianName": "Фуэго"
      },
      {
        "id": "1773",
        "name": "פלואנס",
        "russianName": "беглость"
      },
      {
        "id": "38492",
        "name": "פלואנס חשמלי",
        "russianName": "электрический флюенс"
      },
      {
        "id": "91311",
        "name": "קליאו  RS-Line",
        "russianName": "Клио RS-линия"
      },
      {
        "id": "1629",
        "name": "קליאו B2",
        "russianName": "Клео Б2"
      },
      {
        "id": "89410",
        "name": "קליאו אסטייט",
        "russianName": "Клео Эстейт"
      },
      {
        "id": "90448",
        "name": "קליאו דור 4",
        "russianName": "Клео 4 поколение"
      },
      {
        "id": "90449",
        "name": "קליאו דור 5",
        "russianName": "Клео поколение 5"
      },
      {
        "id": "89411",
        "name": "קליאו החדשה",
        "russianName": "Новая Клео"
      },
      {
        "id": "1183",
        "name": "קליאו קלאסיק",
        "russianName": "Клео Классик"
      },
      {
        "id": "91302",
        "name": "RX4",
        "russianName": "RX4"
      },
      {
        "id": "91303",
        "name": "קדג`אר",
        "russianName": "Каджар"
      },
      {
        "id": "91304",
        "name": "קוליאוס",
        "russianName": "Колеус"
      },
      {
        "id": "1628",
        "name": "קליאו B",
        "russianName": "Клео Б"
      },
      {
        "id": "91314",
        "name": "קליאו Ex Pack Plus",
        "russianName": "Клио Ex Pack Plus"
      },
      {
        "id": "91313",
        "name": "קליאו LIFE",
        "russianName": "Клио ЖИЗНЬ"
      },
      {
        "id": "91312",
        "name": "קליאו ZEN",
        "russianName": "Клео ЗЕН"
      }
    ]
  },
  "84": {
    "id": "84",
    "name": "שברולט",
    "russianName": "Шевроле",
    "models": [
      {
        "id": "38495",
        "name": "ספארק",
        "russianName": "Искра"
      },
      {
        "id": "91306",
        "name": "טראוורס",
        "russianName": "Трэверс"
      },
      {
        "id": "38494",
        "name": "סוניק",
        "russianName": "Соник"
      },
      {
        "id": "893",
        "name": "מאליבו",
        "russianName": "Малибу"
      },
      {
        "id": "1639",
        "name": "קרוז",
        "russianName": "Круиз"
      },
      {
        "id": "89413",
        "name": "אקווינוקס",
        "russianName": "Равноденствие"
      },
      {
        "id": "89415",
        "name": "טראקס",
        "russianName": "Тракс"
      },
      {
        "id": "890",
        "name": "אימפלה",
        "russianName": "Импала"
      },
      {
        "id": "1122",
        "name": "אוואו",
        "russianName": "Ух ты"
      },
      {
        "id": "1637",
        "name": "אוואו 5 החדשה",
        "russianName": "Новый Авао 5"
      },
      {
        "id": "1415",
        "name": "אוואו ביג",
        "russianName": "Вау, большой"
      },
      {
        "id": "1127",
        "name": "אופטרה",
        "russianName": "Офтра"
      },
      {
        "id": "38493",
        "name": "אורלנדו",
        "russianName": "Орландо"
      },
      {
        "id": "889",
        "name": "אלרו",
        "russianName": "Элро"
      },
      {
        "id": "1416",
        "name": "אמפריאל",
        "russianName": "Империал"
      },
      {
        "id": "1129",
        "name": "אפיקה",
        "russianName": "Апика"
      },
      {
        "id": "1247",
        "name": "אפלנדר",
        "russianName": "горный житель"
      },
      {
        "id": "90895",
        "name": "בולט",
        "russianName": "видный"
      },
      {
        "id": "91305",
        "name": "בלייזר",
        "russianName": "Блейзер"
      },
      {
        "id": "891",
        "name": "ברטה",
        "russianName": "Берта"
      },
      {
        "id": "89414",
        "name": "וולט",
        "russianName": "вольт"
      },
      {
        "id": "1128",
        "name": "ויואנט",
        "russianName": "Живой"
      },
      {
        "id": "91307",
        "name": "טאהו",
        "russianName": "Тахо"
      },
      {
        "id": "91308",
        "name": "טרייל בלייזר",
        "russianName": "Трейл Блейзер"
      },
      {
        "id": "892",
        "name": "לומינה",
        "russianName": "Люмина"
      },
      {
        "id": "894",
        "name": "מונטה קרלו",
        "russianName": "Монте-Карло"
      },
      {
        "id": "91309",
        "name": "סוברבן",
        "russianName": "пригородный"
      },
      {
        "id": "895",
        "name": "סלבריטי",
        "russianName": "знаменитость"
      },
      {
        "id": "899",
        "name": "קאמארו",
        "russianName": "Камаро"
      },
      {
        "id": "896",
        "name": "קוואליר",
        "russianName": "Кавалер"
      },
      {
        "id": "1417",
        "name": "קורבט",
        "russianName": "Корвет"
      },
      {
        "id": "1638",
        "name": "קורבט Z06",
        "russianName": "Корвет Z06"
      },
      {
        "id": "897",
        "name": "קורסיקה",
        "russianName": "Корсика"
      },
      {
        "id": "91310",
        "name": "קפטיבה",
        "russianName": "Каптива"
      },
      {
        "id": "898",
        "name": "קפריס",
        "russianName": "Каприз"
      },
      {
        "id": "89416",
        "name": "קרוז החדשה",
        "russianName": "Новый Круз"
      }
    ]
  },
  "105": {
    "id": "105",
    "name": "סמארט",
    "russianName": "Умный",
    "models": [
      {
        "id": "91029",
        "name": "#1",
        "russianName": "#1"
      },
      {
        "id": "90965",
        "name": "#3",
        "russianName": "#3"
      },
      {
        "id": "91028",
        "name": "EQ פורטו",
        "russianName": "Подробный эквалайзер"
      },
      {
        "id": "89366",
        "name": "ברבוס",
        "russianName": "Барбус"
      },
      {
        "id": "1012",
        "name": "פולס",
        "russianName": "водопад"
      },
      {
        "id": "38463",
        "name": "פורטו",
        "russianName": "подробный"
      },
      {
        "id": "89365",
        "name": "פורפור",
        "russianName": "пурпура"
      },
      {
        "id": "1010",
        "name": "פיור",
        "russianName": "Чистый"
      },
      {
        "id": "1011",
        "name": "פיור סיטי",
        "russianName": "Чистый город"
      },
      {
        "id": "1615",
        "name": "פשיין",
        "russianName": "Мода"
      },
      {
        "id": "1616",
        "name": "רודסטר",
        "russianName": "Родстер"
      }
    ]
  },
  "125": {
    "id": "125",
    "name": "האמר",
    "russianName": "Хаммер сказал",
    "models": [
      {
        "id": "91134",
        "name": "EV",
        "russianName": "EV"
      },
      {
        "id": "91129",
        "name": "H1",
        "russianName": "H1"
      },
      {
        "id": "91130",
        "name": "H2",
        "russianName": "H2"
      },
      {
        "id": "91131",
        "name": "H3",
        "russianName": "H3"
      }
    ]
  },
  "132": {
    "id": "132",
    "name": "לקסוס",
    "russianName": "Лексус",
    "models": [
      {
        "id": "38426",
        "name": "CT200H",
        "russianName": "CT200H"
      },
      {
        "id": "1273",
        "name": "CS",
        "russianName": "CS"
      },
      {
        "id": "89325",
        "name": "ES300H",
        "russianName": "ES300H"
      },
      {
        "id": "38427",
        "name": "GS250",
        "russianName": "GS250"
      },
      {
        "id": "1274",
        "name": "GS300",
        "russianName": "GS300"
      },
      {
        "id": "89324",
        "name": "GS300H",
        "russianName": "GS300H"
      },
      {
        "id": "1742",
        "name": "GS450H",
        "russianName": "GS450H"
      },
      {
        "id": "91189",
        "name": "GX",
        "russianName": "GX"
      },
      {
        "id": "38428",
        "name": "ILF",
        "russianName": "ILF"
      },
      {
        "id": "1275",
        "name": "IS250",
        "russianName": "IS250"
      },
      {
        "id": "89326",
        "name": "IS300H",
        "russianName": "IS300H"
      },
      {
        "id": "89327",
        "name": "LC500",
        "russianName": "LC500"
      },
      {
        "id": "91190",
        "name": "LM350H",
        "russianName": "LM350H"
      },
      {
        "id": "1550",
        "name": "LS400",
        "russianName": "LS400"
      },
      {
        "id": "1276",
        "name": "LS430",
        "russianName": "LS430"
      },
      {
        "id": "1277",
        "name": "LS460",
        "russianName": "LS460"
      },
      {
        "id": "89330",
        "name": "LS500",
        "russianName": "LS500"
      },
      {
        "id": "1743",
        "name": "LS600HL",
        "russianName": "LS600HL"
      },
      {
        "id": "91191",
        "name": "LX",
        "russianName": "LX"
      },
      {
        "id": "89331",
        "name": "NX",
        "russianName": "NX"
      },
      {
        "id": "89332",
        "name": "RC",
        "russianName": "RC"
      },
      {
        "id": "91192",
        "name": "RX",
        "russianName": "RX"
      },
      {
        "id": "91193",
        "name": "RZ",
        "russianName": "RZ"
      },
      {
        "id": "64172",
        "name": "SC430",
        "russianName": "SC430"
      },
      {
        "id": "91194",
        "name": "TX",
        "russianName": "TX"
      },
      {
        "id": "91195",
        "name": "UX",
        "russianName": "UX"
      },
      {
        "id": "1297",
        "name": "אחר",
        "russianName": "другой"
      },
      {
        "id": "1278",
        "name": "קבריולט SC",
        "russianName": "Кабриолет СК"
      }
    ]
  },
  "133": {
    "id": "133",
    "name": "לינקולן",
    "russianName": "Линкольн",
    "models": [
      {
        "id": "1280",
        "name": "LS",
        "russianName": "LS"
      },
      {
        "id": "91179",
        "name": "MKC",
        "russianName": "MKC"
      },
      {
        "id": "89322",
        "name": "MKS",
        "russianName": "MKS"
      },
      {
        "id": "91180",
        "name": "MKT",
        "russianName": "MKT"
      },
      {
        "id": "89321",
        "name": "MKZ",
        "russianName": "MKZ"
      },
      {
        "id": "1279",
        "name": "אביאטור",
        "russianName": "летчик"
      },
      {
        "id": "1283",
        "name": "זפיר",
        "russianName": "Зефир"
      },
      {
        "id": "1282",
        "name": "טאון קאר",
        "russianName": "Городской автомобиль"
      },
      {
        "id": "1281",
        "name": "נביגטור",
        "russianName": "Навигатор"
      }
    ]
  },
  "146": {
    "id": "146",
    "name": "אינפיניטי",
    "russianName": "Бесконечность",
    "models": [
      {
        "id": "89284",
        "name": "Q60",
        "russianName": "Q60"
      },
      {
        "id": "89283",
        "name": "Q50",
        "russianName": "Q50"
      },
      {
        "id": "89282",
        "name": "Q30",
        "russianName": "Q30"
      },
      {
        "id": "91079",
        "name": "EX37",
        "russianName": "EX37"
      },
      {
        "id": "91073",
        "name": "FX35",
        "russianName": "FX35"
      },
      {
        "id": "91078",
        "name": "FX37",
        "russianName": "FX37"
      },
      {
        "id": "91074",
        "name": "FX45",
        "russianName": "FX45"
      },
      {
        "id": "91075",
        "name": "FX50",
        "russianName": "FX50"
      },
      {
        "id": "1715",
        "name": "G37 קופה",
        "russianName": "G37 Купе"
      },
      {
        "id": "1714",
        "name": "G37\n סדאן",
        "russianName": "G37 Седан"
      },
      {
        "id": "89285",
        "name": "Q70",
        "russianName": "Q70"
      },
      {
        "id": "89281",
        "name": "QX50",
        "russianName": "QX50"
      },
      {
        "id": "91076",
        "name": "QX55",
        "russianName": "QX55"
      },
      {
        "id": "91071",
        "name": "QX56",
        "russianName": "QX56"
      },
      {
        "id": "91077",
        "name": "QX60",
        "russianName": "QX60"
      }
    ]
  },
  "149": {
    "id": "149",
    "name": "אם ג`י MG",
    "russianName": "ЕСЛИ МГ",
    "models": [
      {
        "id": "38398",
        "name": "350",
        "russianName": "350"
      },
      {
        "id": "38399",
        "name": "550",
        "russianName": "550"
      },
      {
        "id": "91005",
        "name": "EHS PHEV",
        "russianName": "EHS PHEV"
      },
      {
        "id": "89271",
        "name": "MG3",
        "russianName": "MG3"
      },
      {
        "id": "90943",
        "name": "MG4",
        "russianName": "MG4"
      },
      {
        "id": "90420",
        "name": "RX5",
        "russianName": "RX5"
      },
      {
        "id": "90421",
        "name": "ZS",
        "russianName": "ZS"
      },
      {
        "id": "90973",
        "name": "מארוול R",
        "russianName": "Марвел Р"
      }
    ]
  },
  "150": {
    "id": "150",
    "name": "גרייט וול",
    "russianName": "Великая стена",
    "models": [
      {
        "id": "89300",
        "name": "C10",
        "russianName": "C10"
      },
      {
        "id": "91108",
        "name": "הובר H6",
        "russianName": "Наведите H6"
      },
      {
        "id": "91109",
        "name": "סטיד",
        "russianName": "Стид"
      },
      {
        "id": "89302",
        "name": "פלוריד",
        "russianName": "Флорида"
      },
      {
        "id": "89301",
        "name": "קול בר",
        "russianName": "дикий голос"
      }
    ]
  },
  "151": {
    "id": "151",
    "name": "מזראטי",
    "russianName": "Мазерати",
    "models": [
      {
        "id": "89336",
        "name": "גיבלי",
        "russianName": "Гибли"
      },
      {
        "id": "89335",
        "name": "גראן-טוריסמו",
        "russianName": "Гран Туризмо"
      },
      {
        "id": "89334",
        "name": "גראן-קבריו",
        "russianName": "Гран-Кабрио"
      },
      {
        "id": "91204",
        "name": "גרקאלה",
        "russianName": "Гракала"
      },
      {
        "id": "91203",
        "name": "לבנטה",
        "russianName": "Леванте"
      },
      {
        "id": "38430",
        "name": "קוואטרופורטה",
        "russianName": "Кватропорте"
      }
    ]
  },
  "152": {
    "id": "152",
    "name": "מיני",
    "russianName": "мини",
    "models": [
      {
        "id": "38435",
        "name": "קופר",
        "russianName": "Купер"
      },
      {
        "id": "38433",
        "name": "קאנטרימן",
        "russianName": "Земляк"
      },
      {
        "id": "89337",
        "name": "JCW",
        "russianName": "JCW"
      },
      {
        "id": "38431",
        "name": "one",
        "russianName": "one"
      },
      {
        "id": "90983",
        "name": "SE",
        "russianName": "SE"
      },
      {
        "id": "38432",
        "name": "פייסמן",
        "russianName": "Пейсмен"
      },
      {
        "id": "38434",
        "name": "קופה",
        "russianName": "Театральная касса"
      },
      {
        "id": "90431",
        "name": "קופר קבריולט",
        "russianName": "Купер Кабриолет"
      },
      {
        "id": "38436",
        "name": "קלאבמן",
        "russianName": "член клуба"
      },
      {
        "id": "38437",
        "name": "רודסטר",
        "russianName": "Родстер"
      }
    ]
  },
  "153": {
    "id": "153",
    "name": "פרארי",
    "russianName": "Феррари",
    "models": [
      {
        "id": "89387",
        "name": "458",
        "russianName": "458"
      },
      {
        "id": "89388",
        "name": "488 GTB",
        "russianName": "488 GTB"
      },
      {
        "id": "89389",
        "name": "488 ספיידר",
        "russianName": "488 Паук"
      },
      {
        "id": "90441",
        "name": "488 פיסטה",
        "russianName": "488 Писта"
      },
      {
        "id": "89390",
        "name": "575 מאראנלו",
        "russianName": "575 из Аранелло"
      },
      {
        "id": "90442",
        "name": "812 סופרפאסט",
        "russianName": "812 Суперфаст"
      },
      {
        "id": "89391",
        "name": "F12 ברלינטה",
        "russianName": "F12 Берлинетта"
      },
      {
        "id": "90443",
        "name": "F8 טריבוטו",
        "russianName": "F8 Дань"
      },
      {
        "id": "38479",
        "name": "FF",
        "russianName": "FF"
      },
      {
        "id": "89392",
        "name": "GTC4Lusso",
        "russianName": "GTC4Lusso"
      },
      {
        "id": "90444",
        "name": "פורטופינו",
        "russianName": "Портофино"
      },
      {
        "id": "38480",
        "name": "קליפורניה",
        "russianName": "Калифорния"
      }
    ]
  },
  "161": {
    "id": "161",
    "name": "אברת'",
    "russianName": "Эберт",
    "models": [
      {
        "id": "89272",
        "name": "124 ספיידר",
        "russianName": "124 Паук"
      },
      {
        "id": "64712",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "89273",
        "name": "500c",
        "russianName": "500c"
      },
      {
        "id": "90986",
        "name": "500E",
        "russianName": "500E"
      },
      {
        "id": "89274",
        "name": "595",
        "russianName": "595"
      },
      {
        "id": "89275",
        "name": "595c",
        "russianName": "595c"
      },
      {
        "id": "89276",
        "name": "Punto Evo",
        "russianName": "Punto Evo"
      }
    ]
  },
  "164": {
    "id": "164",
    "name": "אסטון מרטין",
    "russianName": "Астон Мартин",
    "models": [
      {
        "id": "89289",
        "name": "DB11",
        "russianName": "DB11"
      },
      {
        "id": "89290",
        "name": "DB9",
        "russianName": "DB9"
      },
      {
        "id": "90422",
        "name": "DBS",
        "russianName": "DBS"
      },
      {
        "id": "91083",
        "name": "DBX",
        "russianName": "DBX"
      },
      {
        "id": "89292",
        "name": "ואנטיג'",
        "russianName": "винтаж"
      },
      {
        "id": "89291",
        "name": "וואנקוויש",
        "russianName": "Побеждать"
      },
      {
        "id": "89293",
        "name": "ראפיד",
        "russianName": "Стремительный"
      }
    ]
  },
  "166": {
    "id": "166",
    "name": "דאצ'יה",
    "russianName": "Дакия",
    "models": [
      {
        "id": "91111",
        "name": "ביגסטר",
        "russianName": "Бигстер"
      },
      {
        "id": "91112",
        "name": "ג׳וגר",
        "russianName": "Джоггер"
      },
      {
        "id": "91110",
        "name": "דאסטר",
        "russianName": "Дастер"
      },
      {
        "id": "89303",
        "name": "לוגאן",
        "russianName": "Логан"
      },
      {
        "id": "89304",
        "name": "לודג'י",
        "russianName": "Лоджи"
      },
      {
        "id": "89306",
        "name": "סנדרו Stepway",
        "russianName": "Сандро Степвей"
      },
      {
        "id": "89305",
        "name": "סנדרו",
        "russianName": "Сандро"
      },
      {
        "id": "91113",
        "name": "ספרינג",
        "russianName": "Весна"
      }
    ]
  },
  "167": {
    "id": "167",
    "name": "למבורגיני",
    "russianName": "Ламборджини",
    "models": [
      {
        "id": "90842",
        "name": "אורוס",
        "russianName": "Орос"
      },
      {
        "id": "89323",
        "name": "הורקן",
        "russianName": "Хоркан"
      }
    ]
  },
  "168": {
    "id": "168",
    "name": "דונגפנג",
    "russianName": "Дунфэн",
    "models": [
      {
        "id": "91118",
        "name": "C31",
        "russianName": "C31"
      },
      {
        "id": "91119",
        "name": "C32",
        "russianName": "C32"
      },
      {
        "id": "91120",
        "name": "C35",
        "russianName": "C35"
      },
      {
        "id": "91124",
        "name": "MHERO 1",
        "russianName": "MHERO 1"
      },
      {
        "id": "91125",
        "name": "בוקס",
        "russianName": "бокс"
      },
      {
        "id": "91126",
        "name": "גלורי 580",
        "russianName": "Слава 580"
      }
    ]
  },
  "201": {
    "id": "201",
    "name": "די.אס",
    "russianName": "ДС",
    "models": [
      {
        "id": "90376",
        "name": "DS3",
        "russianName": "DS3"
      },
      {
        "id": "90844",
        "name": "DS3  CROSSBACK E- TENSE",
        "russianName": "DS3  CROSSBACK E- TENSE"
      },
      {
        "id": "90377",
        "name": "DS3 Cabrio",
        "russianName": "DS3 Cabrio"
      },
      {
        "id": "90845",
        "name": "DS4",
        "russianName": "DS4"
      },
      {
        "id": "90378",
        "name": "DS5",
        "russianName": "DS5"
      },
      {
        "id": "90379",
        "name": "DS7",
        "russianName": "DS7"
      }
    ]
  },
  "204": {
    "id": "204",
    "name": "טסלה",
    "russianName": "Тесла",
    "models": [
      {
        "id": "90395",
        "name": "מודל 3",
        "russianName": "Модель 3"
      },
      {
        "id": "90399",
        "name": "מודל S",
        "russianName": "Модель С"
      },
      {
        "id": "91159",
        "name": "מודל X",
        "russianName": "Модель Х"
      },
      {
        "id": "90946",
        "name": "מודל Y",
        "russianName": "Модель Y"
      },
      {
        "id": "91160",
        "name": "סייברטראק",
        "russianName": "кибертрек"
      }
    ]
  },
  "205": {
    "id": "205",
    "name": "ליצ`י",
    "russianName": "Личи",
    "models": [
      {
        "id": "90429",
        "name": "A01",
        "russianName": "A01"
      }
    ]
  },
  "206": {
    "id": "206",
    "name": "ננג`ינג",
    "russianName": "Нанкин",
    "models": [
      {
        "id": "90432",
        "name": "סיטי ספיריט",
        "russianName": "Городской дух"
      }
    ]
  },
  "209": {
    "id": "209",
    "name": "מקסוס",
    "russianName": "Максус",
    "models": [
      {
        "id": "91019",
        "name": "אי דליברי 7",
        "russianName": "Остров доставки 7"
      },
      {
        "id": "91020",
        "name": "אי דליברי 9",
        "russianName": "Остров доставки 9"
      },
      {
        "id": "91021",
        "name": "אי-דליוור 3",
        "russianName": "Недоставка 3"
      },
      {
        "id": "91022",
        "name": "אי-דליוור 5",
        "russianName": "Недоставка 5"
      },
      {
        "id": "91023",
        "name": "איוניק 5",
        "russianName": "Ионический 5"
      },
      {
        "id": "91024",
        "name": "איוניק 6",
        "russianName": "Ионический 6"
      },
      {
        "id": "91025",
        "name": "מיפה 7",
        "russianName": "Мипа 7"
      },
      {
        "id": "91026",
        "name": "מיפה 9",
        "russianName": "карта 9"
      }
    ]
  },
  "225": {
    "id": "225",
    "name": "אל.אי.וי.סי",
    "russianName": "ЛЕВСИ",
    "models": [
      {
        "id": "90839",
        "name": "e-Camper",
        "russianName": "e-Camper"
      }
    ]
  },
  "226": {
    "id": "226",
    "name": "ג`ילי",
    "russianName": "Джилли",
    "models": [
      {
        "id": "91010",
        "name": "EX5",
        "russianName": "EX5"
      },
      {
        "id": "90849",
        "name": "Geometry C pro 350",
        "russianName": "Geometry C pro 350"
      },
      {
        "id": "90848",
        "name": "Geometry C pro 460",
        "russianName": "Geometry C pro 460"
      },
      {
        "id": "91009",
        "name": "גלקסי E5",
        "russianName": "Галактика Е5"
      }
    ]
  },
  "229": {
    "id": "229",
    "name": "ג`נסיס",
    "russianName": "Бытие",
    "models": [
      {
        "id": "90850",
        "name": "G70",
        "russianName": "G70"
      },
      {
        "id": "90851",
        "name": "G80",
        "russianName": "G80"
      },
      {
        "id": "90852",
        "name": "G90",
        "russianName": "G90"
      },
      {
        "id": "90853",
        "name": "GLS",
        "russianName": "GLS"
      },
      {
        "id": "90854",
        "name": "GV60",
        "russianName": "GV60"
      },
      {
        "id": "90855",
        "name": "GV70",
        "russianName": "GV70"
      },
      {
        "id": "90856",
        "name": "GV80",
        "russianName": "GV80"
      }
    ]
  },
  "230": {
    "id": "230",
    "name": "הונגצ`י",
    "russianName": "Хунчи",
    "models": [
      {
        "id": "90967",
        "name": "EHS7",
        "russianName": "EHS7"
      },
      {
        "id": "90857",
        "name": "E-HS9",
        "russianName": "E-HS9"
      },
      {
        "id": "90968",
        "name": "הוסדו",
        "russianName": "были созданы"
      }
    ]
  },
  "231": {
    "id": "231",
    "name": "ליפמוטור",
    "russianName": "Липомотор",
    "models": [
      {
        "id": "90858",
        "name": "T03",
        "russianName": "T03"
      }
    ]
  },
  "233": {
    "id": "233",
    "name": "איווייז",
    "russianName": "Эвейс",
    "models": [
      {
        "id": "90860",
        "name": "U5",
        "russianName": "U5"
      },
      {
        "id": "90884",
        "name": "U6",
        "russianName": "U6"
      }
    ]
  },
  "234": {
    "id": "234",
    "name": "קופרה",
    "russianName": "копра",
    "models": [
      {
        "id": "91246",
        "name": "אטקה",
        "russianName": "Атка"
      },
      {
        "id": "90863",
        "name": "בורן",
        "russianName": "Борн"
      },
      {
        "id": "91245",
        "name": "טווסקאן",
        "russianName": "Тосканский"
      },
      {
        "id": "90862",
        "name": "לאון",
        "russianName": "Леон"
      },
      {
        "id": "90861",
        "name": "פורמנטור",
        "russianName": "Форментор"
      }
    ]
  },
  "235": {
    "id": "235",
    "name": "בי.ווי.די",
    "russianName": "БВД",
    "models": [
      {
        "id": "90892",
        "name": "דולפין",
        "russianName": "дельфин"
      },
      {
        "id": "90893",
        "name": "סיל",
        "russianName": "Сил"
      },
      {
        "id": "90978",
        "name": "סיל U",
        "russianName": "Печать U"
      },
      {
        "id": "90867",
        "name": "האן",
        "russianName": "Хан"
      },
      {
        "id": "90980",
        "name": "ETP3",
        "russianName": "ETP3"
      },
      {
        "id": "91011",
        "name": "אטו 3",
        "russianName": "Это 3"
      },
      {
        "id": "91050",
        "name": "טאנג",
        "russianName": "Тан"
      }
    ]
  },
  "237": {
    "id": "237",
    "name": "ג`י.איי.סי",
    "russianName": "Джи Эй Си",
    "models": [
      {
        "id": "91096",
        "name": "E-S2",
        "russianName": "E-S2"
      },
      {
        "id": "90870",
        "name": "GE3",
        "russianName": "GE3"
      }
    ]
  },
  "238": {
    "id": "238",
    "name": "צ`רי",
    "russianName": "Чери",
    "models": [
      {
        "id": "91283",
        "name": "FX",
        "russianName": "FX"
      },
      {
        "id": "91284",
        "name": "אריזו 8",
        "russianName": "Аризо 8"
      },
      {
        "id": "91285",
        "name": "טיאגו 4 פרו",
        "russianName": "Тьяго 4 Про"
      },
      {
        "id": "91286",
        "name": "טיגו 7 פרו",
        "russianName": "Тиго 7 Про"
      },
      {
        "id": "91287",
        "name": "טיגו 8 פרו",
        "russianName": "Тиго 8 Про"
      }
    ]
  },
  "239": {
    "id": "239",
    "name": "סרס",
    "russianName": "Серес",
    "models": [
      {
        "id": "91253",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "91254",
        "name": "EV-3",
        "russianName": "EV-3"
      }
    ]
  },
  "241": {
    "id": "241",
    "name": "אורה",
    "russianName": "свет",
    "models": [
      {
        "id": "90885",
        "name": "Funky Cat",
        "russianName": "Funky Cat"
      },
      {
        "id": "90970",
        "name": "03",
        "russianName": "03"
      }
    ]
  },
  "242": {
    "id": "242",
    "name": "זיקר",
    "russianName": "упомянул",
    "models": [
      {
        "id": "90886",
        "name": "001",
        "russianName": "001"
      },
      {
        "id": "90887",
        "name": "X",
        "russianName": "X"
      }
    ]
  },
  "243": {
    "id": "243",
    "name": "אקספנג",
    "russianName": "Икспенг",
    "models": [
      {
        "id": "90891",
        "name": "G3i",
        "russianName": "G3i"
      },
      {
        "id": "90959",
        "name": "G6",
        "russianName": "G6"
      },
      {
        "id": "90890",
        "name": "G9",
        "russianName": "G9"
      },
      {
        "id": "90888",
        "name": "P5",
        "russianName": "P5"
      },
      {
        "id": "90889",
        "name": "P7",
        "russianName": "P7"
      }
    ]
  },
  "249": {
    "id": "249",
    "name": "פולסטאר",
    "russianName": "Полярная звезда",
    "models": [
      {
        "id": "90956",
        "name": "2",
        "russianName": "2"
      }
    ]
  },
  "250": {
    "id": "250",
    "name": "יודו",
    "russianName": "признаю",
    "models": [
      {
        "id": "90966",
        "name": "3",
        "russianName": "3"
      }
    ]
  },
  "251": {
    "id": "251",
    "name": "פורתינג",
    "russianName": "Фортинг",
    "models": [
      {
        "id": "90969",
        "name": "פריידי",
        "russianName": "Пятница"
      }
    ]
  },
  "255": {
    "id": "255",
    "name": "וויה",
    "russianName": "С помощью",
    "models": [
      {
        "id": "91140",
        "name": "דרים",
        "russianName": "Мечтать"
      },
      {
        "id": "91139",
        "name": "פרי",
        "russianName": "фрукты"
      },
      {
        "id": "91141",
        "name": "קוראג`",
        "russianName": "Храбрость"
      }
    ]
  },
  "256": {
    "id": "256",
    "name": "ג`אקו",
    "russianName": "Джако",
    "models": [
      {
        "id": "90994",
        "name": "J7",
        "russianName": "J7"
      }
    ]
  },
  "257": {
    "id": "257",
    "name": "דיפאל",
    "russianName": "Дипал",
    "models": [
      {
        "id": "91012",
        "name": "S07",
        "russianName": "S07"
      }
    ]
  },
  "259": {
    "id": "259",
    "name": "אי.וי איזי",
    "russianName": "Э. В. Легко",
    "models": [
      {
        "id": "91013",
        "name": "לימו",
        "russianName": "лимузин"
      }
    ]
  },
  "260": {
    "id": "260",
    "name": "ויי",
    "russianName": "и крошечный",
    "models": [
      {
        "id": "91014",
        "name": "קופי 01",
        "russianName": "Кофи 01"
      },
      {
        "id": "91015",
        "name": "קופי 02",
        "russianName": "Кофи 02"
      }
    ]
  },
  "261": {
    "id": "261",
    "name": "לינק אנד קו",
    "russianName": "Линк и Ко",
    "models": [
      {
        "id": "91016",
        "name": "01",
        "russianName": "01"
      },
      {
        "id": "91017",
        "name": "02",
        "russianName": "02"
      }
    ]
  },
  "262": {
    "id": "262",
    "name": "סאנשיין",
    "russianName": "Саншайн",
    "models": [
      {
        "id": "91027",
        "name": "M2",
        "russianName": "M2"
      }
    ]
  }
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;

export const vehicleManufacturers: Record<
  VehicleManufacturerId,
  VehicleManufacturer
> = vehicleManufacturersMap;
