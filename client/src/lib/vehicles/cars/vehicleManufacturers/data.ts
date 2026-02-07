import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/vehicleManufacturer.schema";

const vehicleManufacturersMap = {
  "1": {
    id: "1",
    name: "אאודי",
    russianName: "Ауди",
    models: [
      {
        id: "1784",
        name: "A1",
        russianName: "A1"
      },
      {
        id: "4",
        name: "A3",
        russianName: "A3"
      },
      {
        id: "5",
        name: "A4",
        russianName: "A4"
      },
      {
        id: "6",
        name: "A6",
        russianName: "A6"
      },
      {
        id: "1323",
        name: "A5",
        russianName: "A5"
      },
      {
        id: "89266",
        name: "Q3",
        russianName: "Q3"
      },
      {
        id: "91052",
        name: "Q5",
        russianName: "Q5"
      },
      {
        id: "8",
        name: "TT",
        russianName: "TT"
      },
      {
        id: "2",
        name: "100",
        russianName: "100"
      },
      {
        id: "3",
        name: "80",
        russianName: "80"
      },
      {
        id: "89264",
        name: "A2",
        russianName: "A2"
      },
      {
        id: "1322",
        name: "A3 ספורטבק",
        russianName: "A3 Спортбэк"
      },
      {
        id: "1712",
        name: "A5",
        russianName: "A5"
      },
      {
        id: "91060",
        name: "A6 E-tron",
        russianName: "A6 E-tron"
      },
      {
        id: "38400",
        name: "A7",
        russianName: "A7"
      },
      {
        id: "7",
        name: "A8",
        russianName: "A8"
      },
      {
        id: "91058",
        name: "E-tron",
        russianName: "E-tron"
      },
      {
        id: "91059",
        name: "E-tron GT",
        russianName: "E-tron GT"
      },
      {
        id: "91051",
        name: "Q2",
        russianName: "Q2"
      },
      {
        id: "91061",
        name: "Q4 E-tron",
        russianName: "Q4 E-tron"
      },
      {
        id: "91062",
        name: "Q6 E-tron",
        russianName: "Q6 E-tron"
      },
      {
        id: "91053",
        name: "Q7",
        russianName: "Q7"
      },
      {
        id: "91054",
        name: "Q8",
        russianName: "Q8"
      },
      {
        id: "91063",
        name: "Q8 E-tron",
        russianName: "Q8 E-tron"
      },
      {
        id: "1478",
        name: "R8",
        russianName: "R8"
      },
      {
        id: "91064",
        name: "RS E-tron GT",
        russianName: "RS E-tron GT"
      },
      {
        id: "89267",
        name: "RS3",
        russianName: "RS3"
      },
      {
        id: "89268",
        name: "RS5",
        russianName: "RS5"
      },
      {
        id: "89269",
        name: "RS7",
        russianName: "RS7"
      },
      {
        id: "91055",
        name: "RSQ3",
        russianName: "RSQ3"
      },
      {
        id: "91056",
        name: "RSQ5",
        russianName: "RSQ5"
      },
      {
        id: "91057",
        name: "RSQ8",
        russianName: "RSQ8"
      },
      {
        id: "91065",
        name: "S1",
        russianName: "S1"
      },
      {
        id: "995",
        name: "S3",
        russianName: "S3"
      },
      {
        id: "1324",
        name: "S4",
        russianName: "S4"
      },
      {
        id: "1354",
        name: "S5",
        russianName: "S5"
      },
      {
        id: "1325",
        name: "S6",
        russianName: "S6"
      },
      {
        id: "89270",
        name: "S7",
        russianName: "S7"
      },
      {
        id: "9",
        name: "S8",
        russianName: "S8"
      },
      {
        id: "91066",
        name: "SQ2",
        russianName: "SQ2"
      },
      {
        id: "91067",
        name: "SQ5",
        russianName: "SQ5"
      },
      {
        id: "91068",
        name: "SQ7",
        russianName: "SQ7"
      },
      {
        id: "91069",
        name: "SQ8",
        russianName: "SQ8"
      },
      {
        id: "10",
        name: "TT קופה",
        russianName: "TT Купе"
      },
      {
        id: "11",
        name: "TT רודסטר",
        russianName: "TT Родстер"
      },
      {
        id: "1713",
        name: "TTS",
        russianName: "TTS"
      },
      {
        id: "1326",
        name: "אולרוד",
        russianName: "Олроуд"
      }
    ]
  },
  "161": {
    id: "161",
    name: "אברת'",
    russianName: "Абарт",
    models: [
      {
        id: "89272",
        name: "124 ספיידר",
        russianName: "124 Спайдер"
      },
      {
        id: "64712",
        name: "500",
        russianName: "500"
      },
      {
        id: "89273",
        name: "500c",
        russianName: "500c"
      },
      {
        id: "90986",
        name: "500E",
        russianName: "500E"
      },
      {
        id: "89274",
        name: "595",
        russianName: "595"
      },
      {
        id: "89275",
        name: "595c",
        russianName: "595c"
      },
      {
        id: "89276",
        name: "Punto Evo",
        russianName: "Punto Evo"
      }
    ]
  },
  "2": {
    id: "2",
    name: "אוטוביאנקי",
    russianName: "Автобьянки",
    models: [
      {
        id: "1327",
        name: "JUNIOR",
        russianName: "Junior"
      },
      {
        id: "15",
        name: "Y10",
        russianName: "Y10"
      }
    ]
  },
  "3": {
    id: "3",
    name: "אולדסמוביל",
    russianName: "Олдсмобиль",
    models: [
      {
        id: "1327",
        name: "JUNIOR",
        russianName: "Junior"
      },
      {
        id: "15",
        name: "Y10",
        russianName: "Y10"
      },
      {
        id: "18",
        name: "אומגה",
        russianName: "Омега"
      },
      {
        id: "89277",
        name: "אורורה",
        russianName: "Аврора"
      },
      {
        id: "17",
        name: "דלתא",
        russianName: "Дельта"
      },
      {
        id: "19",
        name: "קטלס",
        russianName: "Катласс"
      }
    ]
  },
  "4": {
    id: "4",
    name: "אוסטין",
    russianName: "Остин",
    models: [
      {
        id: "1327",
        name: "JUNIOR",
        russianName: "Junior"
      },
      {
        id: "15",
        name: "Y10",
        russianName: "Y10"
      },
      {
        id: "18",
        name: "אומגה",
        russianName: "Омега"
      },
      {
        id: "89277",
        name: "אורורה",
        russianName: "Аврора"
      },
      {
        id: "17",
        name: "דלתא",
        russianName: "Дельта"
      },
      {
        id: "19",
        name: "קטלס",
        russianName: "Катласс"
      },
      {
        id: "1480",
        name: "A35",
        russianName: "A35"
      },
      {
        id: "22",
        name: "מאסטרו",
        russianName: "Маэстро"
      },
      {
        id: "23",
        name: "מונטגו",
        russianName: "Монтего"
      },
      {
        id: "21",
        name: "מטרו",
        russianName: "Метро"
      },
      {
        id: "24",
        name: "מיני",
        russianName: "Мини"
      }
    ]
  },
  "5": {
    id: "5",
    name: "אופל",
    russianName: "Опель",
    models: [
      {
        id: "89278",
        name: "מוקה",
        russianName: "Мокка"
      },
      {
        id: "35",
        name: "קורסה",
        russianName: "Корса"
      },
      {
        id: "1556",
        name: "אסטרה החדשה",
        russianName: "Астра новая"
      },
      {
        id: "38402",
        name: "אדם",
        russianName: "Адам"
      },
      {
        id: "90419",
        name: "קרוסלנד X",
        russianName: "Кроссланд X"
      },
      {
        id: "38403",
        name: "אינסיגניה",
        russianName: "Инсигния"
      },
      {
        id: "1327",
        name: "JUNIOR",
        russianName: "Junior"
      },
      {
        id: "15",
        name: "Y10",
        russianName: "Y10"
      },
      {
        id: "18",
        name: "אומגה",
        russianName: "Омега"
      },
      {
        id: "89277",
        name: "אורורה",
        russianName: "Аврора"
      },
      {
        id: "17",
        name: "דלתא",
        russianName: "Дельта"
      },
      {
        id: "19",
        name: "קטלס",
        russianName: "Катласс"
      },
      {
        id: "1480",
        name: "A35",
        russianName: "A35"
      },
      {
        id: "22",
        name: "מאסטרו",
        russianName: "Маэстро"
      },
      {
        id: "23",
        name: "מונטגו",
        russianName: "Монтего"
      },
      {
        id: "21",
        name: "מטרו",
        russianName: "Метро"
      },
      {
        id: "24",
        name: "מיני",
        russianName: "Мини"
      },
      {
        id: "29",
        name: "אומגה",
        russianName: "Омега"
      },
      {
        id: "26",
        name: "אסטרה",
        russianName: "Астра"
      },
      {
        id: "31",
        name: "אסקונה",
        russianName: "Аскона"
      },
      {
        id: "90418",
        name: "גרנדלנד X",
        russianName: "Грандланд X"
      },
      {
        id: "1481",
        name: "ויורו",
        russianName: "Виваро"
      },
      {
        id: "28",
        name: "וקטרה",
        russianName: "Вектра"
      },
      {
        id: "34",
        name: "זאפירה",
        russianName: "Зафира"
      },
      {
        id: "30",
        name: "טיגרה",
        russianName: "Тигра"
      },
      {
        id: "89279",
        name: "מוקה X",
        russianName: "Мокка X"
      },
      {
        id: "38404",
        name: "מנטה",
        russianName: "Манта"
      },
      {
        id: "1483",
        name: "מנטה",
        russianName: "Манта"
      },
      {
        id: "64171",
        name: "מריבה",
        russianName: "Мерива"
      },
      {
        id: "91070",
        name: "פרונטרה",
        russianName: "Фронтера"
      },
      {
        id: "32",
        name: "קדט",
        russianName: "Кадет"
      },
      {
        id: "1482",
        name: "קורסה החדשה",
        russianName: "Корса новая"
      },
      {
        id: "89280",
        name: "קסקדה",
        russianName: "Каскада"
      },
      {
        id: "1484",
        name: "קפיטן",
        russianName: "Капитан"
      },
      {
        id: "1328",
        name: "רקורד",
        russianName: "Рекорд"
      }
    ]
  },
  "241": {
    id: "241",
    name: "אורה",
    russianName: "Ора",
    models: []
  },
  "259": {
    id: "259",
    name: "אי.וי איזי",
    russianName: "Ай.Ви Изи",
    models: []
  },
  "233": {
    id: "233",
    name: "איווייז",
    russianName: "Айвейс",
    models: []
  },
  "146": {
    id: "146",
    name: "אינפיניטי",
    russianName: "Инфинити",
    models: []
  },
  "7": {
    id: "7",
    name: "איסוזו",
    russianName: "Исузу",
    models: []
  },
  "225": {
    id: "225",
    name: "אל.אי.וי.סי",
    russianName: "Эл.Ай.Ви.Си",
    models: []
  },
  "8": {
    id: "8",
    name: "אלפא רומיאו",
    russianName: "Альфа Ромео",
    models: []
  },
  "149": {
    id: "149",
    name: "אם ג`י MG",
    russianName: "МГ",
    models: []
  },
  "164": {
    id: "164",
    name: "אסטון מרטין",
    russianName: "Астон Мартин",
    models: []
  },
  "243": {
    id: "243",
    name: "אקספנג",
    russianName: "Экспенг",
    models: []
  },
  "11": {
    id: "11",
    name: "ב.מ.וו",
    russianName: "БМВ",
    models: []
  },
  "235": {
    id: "235",
    name: "בי.ווי.די",
    russianName: "БИД",
    models: []
  },
  "13": {
    id: "13",
    name: "ביואיק",
    russianName: "Бьюик",
    models: []
  },
  "14": {
    id: "14",
    name: "בנטלי",
    russianName: "Бентли",
    models: []
  },
  "256": {
    id: "256",
    name: "ג`אקו",
    russianName: "Джако",
    models: []
  },
  "237": {
    id: "237",
    name: "ג`י.איי.סי",
    russianName: "Джи.Эй.Си",
    models: []
  },
  "15": {
    id: "15",
    name: "ג`י.אם.סי",
    russianName: "Джи.Эм.Си",
    models: []
  },
  "16": {
    id: "16",
    name: "ג`יאו",
    russianName: "Джио",
    models: []
  },
  "226": {
    id: "226",
    name: "ג`ילי",
    russianName: "Джили",
    models: []
  },
  "18": {
    id: "18",
    name: "ג`יפ",
    russianName: "Джип",
    models: []
  },
  "229": {
    id: "229",
    name: "ג`נסיס",
    russianName: "Дженезис",
    models: []
  },
  "150": {
    id: "150",
    name: "גרייט וול",
    russianName: "Грейт Волл",
    models: []
  },
  "166": {
    id: "166",
    name: "דאצ'יה",
    russianName: "Дачия",
    models: []
  },
  "19": {
    id: "19",
    name: "דודג`",
    russianName: "Додж",
    models: []
  },
  "168": {
    id: "168",
    name: "דונגפנג",
    russianName: "Донгфенг",
    models: []
  },
  "201": {
    id: "201",
    name: "די.אס",
    russianName: "Ди.Эс",
    models: []
  },
  "21": {
    id: "21",
    name: "דייהו",
    russianName: "Дэу",
    models: []
  },
  "22": {
    id: "22",
    name: "דייהטסו",
    russianName: "Дайхатсу",
    models: []
  },
  "257": {
    id: "257",
    name: "דיפאל",
    russianName: "Дипал",
    models: []
  },
  "125": {
    id: "125",
    name: "האמר",
    russianName: "Хаммер",
    models: []
  },
  "230": {
    id: "230",
    name: "הונגצ`י",
    russianName: "Хунци",
    models: []
  },
  "24": {
    id: "24",
    name: "הונדה",
    russianName: "Хонда",
    models: []
  },
  "255": {
    id: "255",
    name: "וויה",
    russianName: "Вия",
    models: []
  },
  "27": {
    id: "27",
    name: "וולוו",
    russianName: "Вольво",
    models: []
  },
  "260": {
    id: "260",
    name: "ויי",
    russianName: "Вэй",
    models: []
  },
  "242": {
    id: "242",
    name: "זיקר",
    russianName: "Зикр",
    models: []
  },
  "29": {
    id: "29",
    name: "טויוטה",
    russianName: "Тойота",
    models: []
  },
  "31": {
    id: "31",
    name: "טלבו סימקה",
    russianName: "Талбот Симка",
    models: []
  },
  "204": {
    id: "204",
    name: "טסלה",
    russianName: "Тесла",
    models: []
  },
  "33": {
    id: "33",
    name: "יגואר",
    russianName: "Ягуар",
    models: []
  },
  "250": {
    id: "250",
    name: "יודו",
    russianName: "Юду",
    models: []
  },
  "34": {
    id: "34",
    name: "יונדאי",
    russianName: "Хендэ",
    models: []
  },
  "37": {
    id: "37",
    name: "לאדה",
    russianName: "Лада",
    models: []
  },
  "261": {
    id: "261",
    name: "לינק אנד קו",
    russianName: "Линк энд Ко",
    models: []
  },
  "133": {
    id: "133",
    name: "לינקולן",
    russianName: "Линкольн",
    models: []
  },
  "231": {
    id: "231",
    name: "ליפמוטור",
    russianName: "Липмотор",
    models: []
  },
  "205": {
    id: "205",
    name: "ליצ`י",
    russianName: "Личи",
    models: []
  },
  "167": {
    id: "167",
    name: "למבורגיני",
    russianName: "Ламборгини",
    models: []
  },
  "38": {
    id: "38",
    name: "לנדרובר",
    russianName: "Ленд Ровер",
    models: []
  },
  "39": {
    id: "39",
    name: "לנציה",
    russianName: "Лянча",
    models: []
  },
  "132": {
    id: "132",
    name: "לקסוס",
    russianName: "Лексус",
    models: []
  },
  "46": {
    id: "46",
    name: "מאזדה",
    russianName: "Мазда",
    models: []
  },
  "151": {
    id: "151",
    name: "מזראטי",
    russianName: "Мазерати",
    models: []
  },
  "152": {
    id: "152",
    name: "מיני",
    russianName: "Мини",
    models: []
  },
  "47": {
    id: "47",
    name: "מיצובישי",
    russianName: "Митсубиси",
    models: []
  },
  "209": {
    id: "209",
    name: "מקסוס",
    russianName: "Максус",
    models: []
  },
  "48": {
    id: "48",
    name: "מרצדס",
    russianName: "Мерседес",
    models: []
  },
  "50": {
    id: "50",
    name: "ניסאן",
    russianName: "Ниссан",
    models: []
  },
  "206": {
    id: "206",
    name: "ננג`ינג",
    russianName: "Нанкин",
    models: []
  },
  "51": {
    id: "51",
    name: "סאאב",
    russianName: "Сааб",
    models: []
  },
  "52": {
    id: "52",
    name: "סאנגיונג",
    russianName: "Ссанг Йонг",
    models: []
  },
  "262": {
    id: "262",
    name: "סאנשיין",
    russianName: "Саншайн",
    models: []
  },
  "54": {
    id: "54",
    name: "סובארו",
    russianName: "Субару",
    models: []
  },
  "55": {
    id: "55",
    name: "סוזוקי",
    russianName: "Сузуки",
    models: []
  },
  "59": {
    id: "59",
    name: "סיאט",
    russianName: "Сеат",
    models: []
  },
  "61": {
    id: "61",
    name: "סיטרואן",
    russianName: "Ситроен",
    models: []
  },
  "105": {
    id: "105",
    name: "סמארט",
    russianName: "Смарт",
    models: []
  },
  "62": {
    id: "62",
    name: "סקודה",
    russianName: "Шкода",
    models: []
  },
  "239": {
    id: "239",
    name: "סרס",
    russianName: "Серес",
    models: []
  },
  "249": {
    id: "249",
    name: "פולסטאר",
    russianName: "Полстар",
    models: []
  },
  "65": {
    id: "65",
    name: "פולקסווגן",
    russianName: "Фольксваген",
    models: []
  },
  "67": {
    id: "67",
    name: "פונטיאק",
    russianName: "Понтиак",
    models: []
  },
  "68": {
    id: "68",
    name: "פורד",
    russianName: "Форд",
    models: []
  },
  "70": {
    id: "70",
    name: "פורשה",
    russianName: "Порше",
    models: []
  },
  "251": {
    id: "251",
    name: "פורתינג",
    russianName: "Фортинг",
    models: []
  },
  "73": {
    id: "73",
    name: "פיאט",
    russianName: "Фиат",
    models: []
  },
  "63": {
    id: "63",
    name: "פיג'ו",
    russianName: "Пежо",
    models: []
  },
  "153": {
    id: "153",
    name: "פרארי",
    russianName: "Феррари",
    models: []
  },
  "238": {
    id: "238",
    name: "צ`רי",
    russianName: "Чери",
    models: []
  },
  "75": {
    id: "75",
    name: "קאדילק",
    russianName: "Кадиллак",
    models: []
  },
  "234": {
    id: "234",
    name: "קופרה",
    russianName: "Купра",
    models: []
  },
  "76": {
    id: "76",
    name: "קיה",
    russianName: "Киа",
    models: []
  },
  "80": {
    id: "80",
    name: "קרייזלר",
    russianName: "Крайслер",
    models: []
  },
  "81": {
    id: "81",
    name: "רובר",
    russianName: "Ровер",
    models: []
  },
  "83": {
    id: "83",
    name: "רנו",
    russianName: "Рено",
    models: []
  },
  "84": {
    id: "84",
    name: "שברולט",
    russianName: "Шевроле",
    models: []
  },
  "85": {
    id: "85",
    name: "אחר",
    russianName: "Другое",
    models: []
  }
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;

export const vehicleManufacturers: Record<
  VehicleManufacturerId,
  VehicleManufacturer
> = vehicleManufacturersMap;



