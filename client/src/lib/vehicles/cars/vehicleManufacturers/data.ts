import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/vehicleManufacturer.schema";

const vehicleManufacturersMap = {
  "ABARTH": {
    "id": "ABARTH",
    "name": "אבארת",
    "russianName": "Абарт",
    "models": [
      {
        "id": "ABARTH_124_SPIDER",
        "name": "124 Spider",
        "russianName": "124 спайдер"
      },
      {
        "id": "ABARTH_500",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "ABARTH_600E",
        "name": "600e",
        "russianName": "600е"
      }
    ]
  },
  "AC": {
    "id": "AC",
    "name": "א.סי",
    "russianName": "АС",
    "models": [
      {
        "id": "AC_378_GT",
        "name": "378 GT Zagato",
        "russianName": "378 ДжиТи Загато"
      },
      {
        "id": "AC_ACE",
        "name": "Ace",
        "russianName": "асе"
      },
      {
        "id": "AC_ACECA",
        "name": "Aceca",
        "russianName": "Асека"
      },
      {
        "id": "AC_COBRA",
        "name": "Cobra",
        "russianName": "Кобра"
      },
      {
        "id": "AC_COBRA_GT",
        "name": "Cobra GT",
        "russianName": "Кобра ГТ"
      }
    ]
  },
  "ACURA": {
    "id": "ACURA",
    "name": "אקורה",
    "russianName": "Акура",
    "models": [
      {
        "id": "ACURA_ADX",
        "name": "ADX",
        "russianName": "АДИкс"
      },
      {
        "id": "ACURA_CDX",
        "name": "CDX",
        "russianName": "сдх"
      },
      {
        "id": "ACURA_CL",
        "name": "CL",
        "russianName": "сл"
      },
      {
        "id": "ACURA_CSX",
        "name": "CSX",
        "russianName": "цсх"
      },
      {
        "id": "ACURA_EL",
        "name": "EL",
        "russianName": "ЕЛ"
      },
      {
        "id": "ACURA_ILX",
        "name": "ILX",
        "russianName": "ИЛХ"
      },
      {
        "id": "ACURA_INTEGRA",
        "name": "Integra",
        "russianName": "интегра"
      },
      {
        "id": "ACURA_LEGEND",
        "name": "Legend",
        "russianName": "легенд"
      },
      {
        "id": "ACURA_MDX",
        "name": "MDX",
        "russianName": "мдх"
      },
      {
        "id": "ACURA_NSX",
        "name": "NSX",
        "russianName": "нсх"
      },
      {
        "id": "ACURA_RDX",
        "name": "RDX",
        "russianName": "РДХ"
      },
      {
        "id": "ACURA_RL",
        "name": "RL",
        "russianName": "рл"
      },
      {
        "id": "ACURA_RLX",
        "name": "RLX",
        "russianName": "рлх"
      },
      {
        "id": "ACURA_RSX",
        "name": "RSX",
        "russianName": "рсх"
      },
      {
        "id": "ACURA_SLX",
        "name": "SLX",
        "russianName": "слх"
      },
      {
        "id": "ACURA_TL",
        "name": "TL",
        "russianName": "тл"
      },
      {
        "id": "ACURA_TLX",
        "name": "TLX",
        "russianName": "тлх"
      },
      {
        "id": "ACURA_TSX",
        "name": "TSX",
        "russianName": "тсх"
      },
      {
        "id": "ACURA_ZDX",
        "name": "ZDX",
        "russianName": "здх"
      }
    ]
  },
  "ADAM": {
    "id": "ADAM",
    "name": "אדם",
    "russianName": "Адам",
    "models": [
      {
        "id": "ADAM_REVO",
        "name": "Revo",
        "russianName": "Рево"
      }
    ]
  },
  "ADLER": {
    "id": "ADLER",
    "name": "אדלר",
    "russianName": "Адлер",
    "models": [
      {
        "id": "ADLER_DIPLOMAT",
        "name": "Diplomat",
        "russianName": "Дипломат"
      },
      {
        "id": "ADLER_TRUMPF_JUNIOR",
        "name": "Trumpf Junior",
        "russianName": "Трумф Джуниор"
      }
    ]
  },
  "AION": {
    "id": "AION",
    "name": "GAC Aion",
    "russianName": "ГАК Аион",
    "models": [
      {
        "id": "AION_HYPER_GT",
        "name": "Hyptec GT (Hyper GT)",
        "russianName": "Гипер Джи Ти"
      },
      {
        "id": "AION_HYPER_HT",
        "name": "Hyptec HT (Hyper HT)",
        "russianName": "Гипер Аш Ти"
      },
      {
        "id": "AION_HYPER_SSR",
        "name": "Hyptec SSR (Hyper SSR)",
        "russianName": "Гипер Эс Эс Эр"
      },
      {
        "id": "AION_HYPTEC_HL",
        "name": "Hyptec HL",
        "russianName": "Хиптек Аш Эл"
      },
      {
        "id": "AION_LX",
        "name": "LX",
        "russianName": "ЛХ"
      },
      {
        "id": "AION_LX_PLUS",
        "name": "LX Plus",
        "russianName": "ЛХ Плюс"
      },
      {
        "id": "AION_RT",
        "name": "RT",
        "russianName": "РТ"
      },
      {
        "id": "AION_S",
        "name": "S",
        "russianName": "С"
      },
      {
        "id": "AION_S_PLUS",
        "name": "S Plus",
        "russianName": "С Плюс"
      },
      {
        "id": "AION_UT",
        "name": "UT",
        "russianName": "ЮТ"
      },
      {
        "id": "AION_V",
        "name": "V",
        "russianName": "Ви"
      },
      {
        "id": "AION_Y",
        "name": "Y",
        "russianName": "игрек"
      },
      {
        "id": "AION_Y_PLUS",
        "name": "Y Plus",
        "russianName": "У Плюс"
      }
    ]
  },
  "AITO": {
    "id": "AITO",
    "name": "איטו",
    "russianName": "Аито",
    "models": [
      {
        "id": "AITO_M5",
        "name": "M5",
        "russianName": "м5"
      },
      {
        "id": "AITO_M7",
        "name": "M7",
        "russianName": "м7"
      },
      {
        "id": "AITO_M8",
        "name": "M8",
        "russianName": "М8"
      },
      {
        "id": "AITO_M9",
        "name": "M9",
        "russianName": "м9"
      }
    ]
  },
  "AIWAYS": {
    "id": "AIWAYS",
    "name": "אייווייז",
    "russianName": "Айвэйс",
    "models": [
      {
        "id": "AIWAYS_U5",
        "name": "U5",
        "russianName": "Ю5"
      },
      {
        "id": "AIWAYS_U6",
        "name": "U6",
        "russianName": "Ю6"
      }
    ]
  },
  "AIXAM": {
    "id": "AIXAM",
    "name": "איקסם",
    "russianName": "Аиксам",
    "models": [
      {
        "id": "AIXAM_500",
        "name": "500",
        "russianName": "500"
      }
    ]
  },
  "ALFA_ROMEO": {
    "id": "ALFA_ROMEO",
    "name": "אלפא רומיאו",
    "russianName": "Альфа Ромео",
    "models": [
      {
        "id": "ALFA_ROMEO_105_115",
        "name": "105/115",
        "russianName": "105/115"
      },
      {
        "id": "ALFA_ROMEO_145",
        "name": "145",
        "russianName": "145"
      },
      {
        "id": "ALFA_ROMEO_146",
        "name": "146",
        "russianName": "146"
      },
      {
        "id": "ALFA_ROMEO_147",
        "name": "147",
        "russianName": "147"
      },
      {
        "id": "ALFA_ROMEO_155",
        "name": "155",
        "russianName": "155"
      },
      {
        "id": "ALFA_ROMEO_156",
        "name": "156",
        "russianName": "156"
      },
      {
        "id": "ALFA_ROMEO_159",
        "name": "159",
        "russianName": "159"
      },
      {
        "id": "ALFA_ROMEO_164",
        "name": "164",
        "russianName": "164"
      },
      {
        "id": "ALFA_ROMEO_166",
        "name": "166",
        "russianName": "166"
      },
      {
        "id": "ALFA_ROMEO_1900",
        "name": "1900",
        "russianName": "1900"
      },
      {
        "id": "ALFA_ROMEO_2600",
        "name": "2600",
        "russianName": "2600"
      },
      {
        "id": "ALFA_ROMEO_33",
        "name": "33",
        "russianName": "33"
      },
      {
        "id": "ALFA_ROMEO_33_STRADALE",
        "name": "33 Stradale",
        "russianName": "33 Страдале"
      },
      {
        "id": "ALFA_ROMEO_4C",
        "name": "4C",
        "russianName": "4с"
      },
      {
        "id": "ALFA_ROMEO_6",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "ALFA_ROMEO_6C",
        "name": "6C",
        "russianName": "6с"
      },
      {
        "id": "ALFA_ROMEO_75",
        "name": "75",
        "russianName": "75"
      },
      {
        "id": "ALFA_ROMEO_8C_COMPETIZIONE",
        "name": "8C Competizione",
        "russianName": "8с компетизион"
      },
      {
        "id": "ALFA_ROMEO_90",
        "name": "90",
        "russianName": "90"
      },
      {
        "id": "ALFA_ROMEO_ALFASUD",
        "name": "Alfasud",
        "russianName": "Альфасуд"
      },
      {
        "id": "ALFA_ROMEO_ALFETTA",
        "name": "Alfetta",
        "russianName": "Альфетта"
      },
      {
        "id": "ALFA_ROMEO_ARNA",
        "name": "Arna",
        "russianName": "Арна"
      },
      {
        "id": "ALFA_ROMEO_BRERA",
        "name": "Brera",
        "russianName": "Брера"
      },
      {
        "id": "ALFA_ROMEO_DISCO_VOLANTE",
        "name": "Disco Volante",
        "russianName": "диско воланте"
      },
      {
        "id": "ALFA_ROMEO_GIULIA",
        "name": "Giulia",
        "russianName": "Джулия"
      },
      {
        "id": "ALFA_ROMEO_GIULIETTA",
        "name": "Giulietta",
        "russianName": "Джульетта"
      },
      {
        "id": "ALFA_ROMEO_GT",
        "name": "GT",
        "russianName": "GT"
      },
      {
        "id": "ALFA_ROMEO_GTA",
        "name": "GTA Coupe",
        "russianName": "гта купе"
      },
      {
        "id": "ALFA_ROMEO_GTV",
        "name": "GTV",
        "russianName": "GTV"
      },
      {
        "id": "ALFA_ROMEO_JUNIOR",
        "name": "Junior",
        "russianName": "Джуниор"
      },
      {
        "id": "ALFA_ROMEO_MITO",
        "name": "MiTo",
        "russianName": "Мито"
      },
      {
        "id": "ALFA_ROMEO_MONTREAL",
        "name": "Montreal",
        "russianName": "Монреаль"
      },
      {
        "id": "ALFA_ROMEO_RZ",
        "name": "RZ",
        "russianName": "RZ"
      },
      {
        "id": "ALFA_ROMEO_SPIDER",
        "name": "Spider",
        "russianName": "Спайдер"
      },
      {
        "id": "ALFA_ROMEO_SPRINT",
        "name": "Sprint",
        "russianName": "Спринт"
      },
      {
        "id": "ALFA_ROMEO_STELVIO",
        "name": "Stelvio",
        "russianName": "Стелвио"
      },
      {
        "id": "ALFA_ROMEO_SZ",
        "name": "SZ",
        "russianName": "SZ"
      },
      {
        "id": "ALFA_ROMEO_TONALE",
        "name": "Tonale",
        "russianName": "Тонале"
      }
    ]
  },
  "ALPINA": {
    "id": "ALPINA",
    "name": "אלפינה",
    "russianName": "Альпина",
    "models": [
      {
        "id": "ALPINA_B10",
        "name": "B10",
        "russianName": "б10"
      },
      {
        "id": "ALPINA_B11",
        "name": "B11",
        "russianName": "б11"
      },
      {
        "id": "ALPINA_B12",
        "name": "B12",
        "russianName": "б12"
      },
      {
        "id": "ALPINA_B3",
        "name": "B3",
        "russianName": "б3"
      },
      {
        "id": "ALPINA_B4",
        "name": "B4",
        "russianName": "б4"
      },
      {
        "id": "ALPINA_B5",
        "name": "B5",
        "russianName": "б5"
      },
      {
        "id": "ALPINA_B6",
        "name": "B6",
        "russianName": "б6"
      },
      {
        "id": "ALPINA_B7",
        "name": "B7",
        "russianName": "б7"
      },
      {
        "id": "ALPINA_B8",
        "name": "B8",
        "russianName": "б8"
      },
      {
        "id": "ALPINA_B9",
        "name": "B9",
        "russianName": "б9"
      },
      {
        "id": "ALPINA_C1",
        "name": "C1",
        "russianName": "с1"
      },
      {
        "id": "ALPINA_C2",
        "name": "C2",
        "russianName": "с2"
      },
      {
        "id": "ALPINA_D10",
        "name": "D10",
        "russianName": "д10"
      },
      {
        "id": "ALPINA_D3",
        "name": "D3",
        "russianName": "д3"
      },
      {
        "id": "ALPINA_D4",
        "name": "D4",
        "russianName": "Д4"
      },
      {
        "id": "ALPINA_D5",
        "name": "D5",
        "russianName": "д5"
      },
      {
        "id": "ALPINA_ROADSTER",
        "name": "Roadster",
        "russianName": "родстер"
      },
      {
        "id": "ALPINA_XB7",
        "name": "XB7",
        "russianName": "ИксБ7"
      },
      {
        "id": "ALPINA_XD3",
        "name": "XD3",
        "russianName": "хд3"
      },
      {
        "id": "ALPINA_XD4",
        "name": "XD4",
        "russianName": "хд4"
      }
    ]
  },
  "ALPINE": {
    "id": "ALPINE",
    "name": "אלפין",
    "russianName": "Альпин",
    "models": [
      {
        "id": "ALPINE_A110",
        "name": "A110",
        "russianName": "а110"
      },
      {
        "id": "ALPINE_A290",
        "name": "A290",
        "russianName": "А290"
      },
      {
        "id": "ALPINE_A310",
        "name": "A310",
        "russianName": "а310"
      },
      {
        "id": "ALPINE_A390",
        "name": "A390",
        "russianName": "А390"
      },
      {
        "id": "ALPINE_A610",
        "name": "A610",
        "russianName": "а610"
      },
      {
        "id": "ALPINE_GTA",
        "name": "GTA",
        "russianName": "гта"
      }
    ]
  },
  "AMBERAUTO": {
    "id": "AMBERAUTO",
    "name": "Амберавто",
    "russianName": "Амберавто",
    "models": [
      {
        "id": "AMBERAUTO_A5",
        "name": "А5",
        "russianName": "А5"
      }
    ]
  },
  "AMBERTRUCK": {
    "id": "AMBERTRUCK",
    "name": "אמברטראק",
    "russianName": "Амбертрак",
    "models": [
      {
        "id": "AMBERTRUCK_WORK",
        "name": "Work",
        "russianName": "Ворк"
      }
    ]
  },
  "AMC": {
    "id": "AMC",
    "name": "א.מ.סי",
    "russianName": "АМС",
    "models": [
      {
        "id": "AMC_EAGLE",
        "name": "איגל",
        "russianName": "Игл"
      },
      {
        "id": "AMC_GREMLIN",
        "name": "Gremlin",
        "russianName": "Гремлин"
      },
      {
        "id": "AMC_HORNET",
        "name": "Hornet",
        "russianName": "Хорнет"
      },
      {
        "id": "AMC_MATADOR",
        "name": "Matador",
        "russianName": "Матадор"
      },
      {
        "id": "AMC_RAMBLER_AMBASSADOR",
        "name": "Rambler Ambassador",
        "russianName": "Рамблер Амбассадор"
      },
      {
        "id": "AMC_RAMBLER_CLASSIC",
        "name": "Rambler Classic",
        "russianName": "Рамблер Классик"
      }
    ]
  },
  "AM_GENERAL": {
    "id": "AM_GENERAL",
    "name": "א.מ. ג'נרל",
    "russianName": "АМ Дженерал",
    "models": [
      {
        "id": "AM_GENERAL_HUMVEE",
        "name": "HMMWV (Humvee)",
        "russianName": "Хамви"
      }
    ]
  },
  "APAL": {
    "id": "APAL",
    "name": "אפאל",
    "russianName": "Апал",
    "models": [
      {
        "id": "APAL_21541",
        "name": "21541 Stalker",
        "russianName": "21541 Сталкер"
      }
    ]
  },
  "ARCFOX": {
    "id": "ARCFOX",
    "name": "ארק פוקס",
    "russianName": "Аркфокс",
    "models": [
      {
        "id": "ARCFOX_ALPHA_S",
        "name": "Alpha S",
        "russianName": "Альфа С"
      },
      {
        "id": "ARCFOX_ALPHA_S5",
        "name": "Alpha S5",
        "russianName": "Альфа С5"
      },
      {
        "id": "ARCFOX_ALPHA_S6",
        "name": "Alpha S6",
        "russianName": "Альфа С6"
      },
      {
        "id": "ARCFOX_ALPHA_T",
        "name": "Alpha T",
        "russianName": "Альфа Т"
      },
      {
        "id": "ARCFOX_ALPHA_T5",
        "name": "Alpha T5",
        "russianName": "Альфа Т5"
      },
      {
        "id": "ARCFOX_ALPHA_T6",
        "name": "Alpha T6",
        "russianName": "Альфа Т6"
      },
      {
        "id": "ARCFOX_KAOLA",
        "name": "Kaola",
        "russianName": "Каола"
      },
      {
        "id": "ARCFOX_T1",
        "name": "T1",
        "russianName": "Т1"
      }
    ]
  },
  "ARIEL": {
    "id": "ARIEL",
    "name": "אריאל",
    "russianName": "Ариэль",
    "models": [
      {
        "id": "ARIEL_ATOM",
        "name": "Atom",
        "russianName": "Атом"
      },
      {
        "id": "ARIEL_NOMAD",
        "name": "Nomad",
        "russianName": "Номад"
      }
    ]
  },
  "ARO": {
    "id": "ARO",
    "name": "ארו",
    "russianName": "Аро",
    "models": [
      {
        "id": "ARO_10",
        "name": "10",
        "russianName": "10"
      },
      {
        "id": "ARO_24",
        "name": "24",
        "russianName": "24"
      }
    ]
  },
  "ASIA": {
    "id": "ASIA",
    "name": "אסיה",
    "russianName": "Эйша",
    "models": [
      {
        "id": "ASIA_RETONA",
        "name": "Retona",
        "russianName": "Ретона"
      },
      {
        "id": "ASIA_ROCSTA",
        "name": "Rocsta",
        "russianName": "Рокста"
      },
      {
        "id": "ASIA_TOPIC",
        "name": "Topic",
        "russianName": "Топик"
      },
      {
        "id": "ASIA_TOWNER",
        "name": "Towner",
        "russianName": "таунер"
      }
    ]
  },
  "ASTON_MARTIN": {
    "id": "ASTON_MARTIN",
    "name": "אסטון מרטין",
    "russianName": "Астон Мартин",
    "models": [
      {
        "id": "ASTON_MARTIN_BULLDOG",
        "name": "Bulldog",
        "russianName": "бульдог"
      },
      {
        "id": "ASTON_MARTIN_CYGNET",
        "name": "Cygnet",
        "russianName": "сигнет"
      },
      {
        "id": "ASTON_MARTIN_DB11",
        "name": "DB11",
        "russianName": "дб11"
      },
      {
        "id": "ASTON_MARTIN_DB12",
        "name": "DB12",
        "russianName": "ДБ12"
      },
      {
        "id": "ASTON_MARTIN_DB5",
        "name": "DB5",
        "russianName": "дб5"
      },
      {
        "id": "ASTON_MARTIN_DB6",
        "name": "DB6",
        "russianName": "дб6"
      },
      {
        "id": "ASTON_MARTIN_DB7",
        "name": "DB7",
        "russianName": "дб7"
      },
      {
        "id": "ASTON_MARTIN_DB9",
        "name": "DB9",
        "russianName": "дб9"
      },
      {
        "id": "ASTON_MARTIN_DBS",
        "name": "DBS",
        "russianName": "дбс"
      },
      {
        "id": "ASTON_MARTIN_DBX",
        "name": "DBX",
        "russianName": "ДБХ"
      },
      {
        "id": "ASTON_MARTIN_DB_AR_1",
        "name": "DB AR1",
        "russianName": "ДБ АР1"
      },
      {
        "id": "ASTON_MARTIN_LAGONDA",
        "name": "Lagonda",
        "russianName": "лагонда"
      },
      {
        "id": "ASTON_MARTIN_LAGONDA_TARAF",
        "name": "Lagonda Taraf",
        "russianName": "Лагонда Тараф"
      },
      {
        "id": "ASTON_MARTIN_ONE_77",
        "name": "One-77",
        "russianName": "ван-77"
      },
      {
        "id": "ASTON_MARTIN_RAPIDE",
        "name": "Rapide",
        "russianName": "Рапиде"
      },
      {
        "id": "ASTON_MARTIN_TICKFORD_CAPRI",
        "name": "Tickford Capri",
        "russianName": "тикфорд капри"
      },
      {
        "id": "ASTON_MARTIN_V12",
        "name": "Vanquish",
        "russianName": "ванквиш"
      },
      {
        "id": "ASTON_MARTIN_V12_SPEEDSTER",
        "name": "V12 Speedster",
        "russianName": "В12 Спидстер"
      },
      {
        "id": "ASTON_MARTIN_V12_VANTAGE",
        "name": "V12 Vantage",
        "russianName": "в12 вантаж"
      },
      {
        "id": "ASTON_MARTIN_V12_ZAGATO",
        "name": "V12 Zagato",
        "russianName": "в12 загато"
      },
      {
        "id": "ASTON_MARTIN_V8",
        "name": "V8 Vantage",
        "russianName": "в8 вантаж"
      },
      {
        "id": "ASTON_MARTIN_V8_ZAGATO",
        "name": "V8 Zagato",
        "russianName": "в8 загато"
      },
      {
        "id": "ASTON_MARTIN_VALHALLA",
        "name": "Valhalla",
        "russianName": "Вальхалла"
      },
      {
        "id": "ASTON_MARTIN_VALIANT",
        "name": "Valiant",
        "russianName": "Валиант"
      },
      {
        "id": "ASTON_MARTIN_VALKYRIE",
        "name": "Valkyrie",
        "russianName": "Валькирия"
      },
      {
        "id": "ASTON_MARTIN_VALOUR",
        "name": "Valour",
        "russianName": "Валур"
      },
      {
        "id": "ASTON_MARTIN_VIRAGE",
        "name": "Virage",
        "russianName": "Вираж"
      },
      {
        "id": "ASTON_MARTIN_VULCAN",
        "name": "Vulcan",
        "russianName": "Вулкан"
      }
    ]
  },
  "ATOM": {
    "id": "ATOM",
    "name": "Атом",
    "russianName": "Атом",
    "models": [
      {
        "id": "ATOM_01",
        "name": "01",
        "russianName": "01"
      }
    ]
  },
  "AUBURN": {
    "id": "AUBURN",
    "name": "אובורן",
    "russianName": "Оберн",
    "models": [
      {
        "id": "AUBURN_SPEEDSTER",
        "name": "Speedster",
        "russianName": "Спидстер"
      }
    ]
  },
  "AUDI": {
    "id": "AUDI",
    "name": "אאודי",
    "russianName": "Ауди",
    "models": [
      {
        "id": "AUDI_100",
        "name": "100",
        "russianName": "100"
      },
      {
        "id": "AUDI_200",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "AUDI_50",
        "name": "50",
        "russianName": "50"
      },
      {
        "id": "AUDI_80",
        "name": "80",
        "russianName": "80"
      },
      {
        "id": "AUDI_90",
        "name": "90",
        "russianName": "90"
      },
      {
        "id": "AUDI_920",
        "name": "920",
        "russianName": "920"
      },
      {
        "id": "AUDI_A1",
        "name": "A1",
        "russianName": "А1"
      },
      {
        "id": "AUDI_A2",
        "name": "A2",
        "russianName": "А2"
      },
      {
        "id": "AUDI_A3",
        "name": "A3",
        "russianName": "А3"
      },
      {
        "id": "AUDI_A4",
        "name": "A4",
        "russianName": "А4"
      },
      {
        "id": "AUDI_A4_ALLROAD",
        "name": "A4 allroad",
        "russianName": "А4 Олроуд"
      },
      {
        "id": "AUDI_A5",
        "name": "A5",
        "russianName": "А5"
      },
      {
        "id": "AUDI_A6",
        "name": "A6",
        "russianName": "А6"
      },
      {
        "id": "AUDI_A6_E_TRON",
        "name": "A6 e-tron",
        "russianName": "А6 е-трон"
      },
      {
        "id": "AUDI_A7",
        "name": "A7",
        "russianName": "А7"
      },
      {
        "id": "AUDI_A8",
        "name": "A8",
        "russianName": "А8"
      },
      {
        "id": "AUDI_ALLROAD",
        "name": "A6 allroad",
        "russianName": "А6 Олроуд"
      },
      {
        "id": "AUDI_CABRIOLET",
        "name": "Cabriolet",
        "russianName": "Cabriolet"
      },
      {
        "id": "AUDI_COUPE",
        "name": "Coupe",
        "russianName": "Купе"
      },
      {
        "id": "AUDI_E5",
        "name": "E5",
        "russianName": "E5"
      },
      {
        "id": "AUDI_E_TRON",
        "name": "e-tron",
        "russianName": "И-трон"
      },
      {
        "id": "AUDI_E_TRON_GT",
        "name": "e-tron GT",
        "russianName": "И-трон ГТ"
      },
      {
        "id": "AUDI_E_TRON_S",
        "name": "e-tron S",
        "russianName": "И-трон Эс"
      },
      {
        "id": "AUDI_E_TRON_SPORTBACK",
        "name": "e-tron Sportback",
        "russianName": "И-трон Спортбэк"
      },
      {
        "id": "AUDI_E_TRON_S_SPORTBACK",
        "name": "e-tron S Sportback",
        "russianName": "И-трон Эс Спортбэк"
      },
      {
        "id": "AUDI_FRONT",
        "name": "Front",
        "russianName": "Фронт"
      },
      {
        "id": "AUDI_NSU_RO_80",
        "name": "NSU RO 80",
        "russianName": "NSU RO 80"
      },
      {
        "id": "AUDI_Q2",
        "name": "Q2",
        "russianName": "Ку2"
      },
      {
        "id": "AUDI_Q3",
        "name": "Q3",
        "russianName": "Ку3"
      },
      {
        "id": "AUDI_Q3_SPORTBACK",
        "name": "Q3 Sportback",
        "russianName": "Ку3 Спортбек"
      },
      {
        "id": "AUDI_Q4",
        "name": "Q4 e-tron",
        "russianName": "Ку4"
      },
      {
        "id": "AUDI_Q4_SPORTBACK",
        "name": "Q4 Sportback e-tron",
        "russianName": "Ку4 Спортбек"
      },
      {
        "id": "AUDI_Q5",
        "name": "Q5",
        "russianName": "Ку5"
      },
      {
        "id": "AUDI_Q5_E_TRON",
        "name": "Q5 e-tron",
        "russianName": "Ку5 е-трон"
      },
      {
        "id": "AUDI_Q5_SPORTBACK",
        "name": "Q5 Sportback",
        "russianName": "Кью5 Спортбек"
      },
      {
        "id": "AUDI_Q6",
        "name": "Q6",
        "russianName": "Кью6"
      },
      {
        "id": "AUDI_Q6_E_TRON",
        "name": "Q6 e-tron",
        "russianName": "Ку6 е-трон"
      },
      {
        "id": "AUDI_Q6_SPORTBACK_E_TRON",
        "name": "Q6 Sportback e-tron",
        "russianName": "Ку6 Спортбек е-трон"
      },
      {
        "id": "AUDI_Q7",
        "name": "Q7",
        "russianName": "Ку7"
      },
      {
        "id": "AUDI_Q8",
        "name": "Q8",
        "russianName": "Ку8"
      },
      {
        "id": "AUDI_Q8_E_TRON",
        "name": "Q8 e-tron",
        "russianName": "Ку8 е-трон"
      },
      {
        "id": "AUDI_Q8_SPORTBACK_E_TRON",
        "name": "Q8 Sportback e-tron",
        "russianName": "Ку8 Спортбек е-трон"
      },
      {
        "id": "AUDI_QUATTRO",
        "name": "Quattro",
        "russianName": "Кватро"
      },
      {
        "id": "AUDI_R8",
        "name": "R8",
        "russianName": "Р8"
      },
      {
        "id": "AUDI_R8_LMP",
        "name": "R8 LMP",
        "russianName": "ЭР8 ЛМП"
      },
      {
        "id": "AUDI_RS2",
        "name": "RS 2",
        "russianName": "RS2"
      },
      {
        "id": "AUDI_RS3",
        "name": "RS 3",
        "russianName": "РС3"
      },
      {
        "id": "AUDI_RS4",
        "name": "RS 4",
        "russianName": "РС4"
      },
      {
        "id": "AUDI_RS5",
        "name": "RS 5",
        "russianName": "РС5"
      },
      {
        "id": "AUDI_RS6",
        "name": "RS 6",
        "russianName": "РС6"
      },
      {
        "id": "AUDI_RS7",
        "name": "RS 7",
        "russianName": "РС7"
      },
      {
        "id": "AUDI_RSQ3",
        "name": "RS Q3",
        "russianName": "РС Ку3"
      },
      {
        "id": "AUDI_RS_E_TRON_GT",
        "name": "RS e-tron GT",
        "russianName": "РС и-трон ГТ"
      },
      {
        "id": "AUDI_RS_Q3_SPORTBACK",
        "name": "RS Q3 Sportback",
        "russianName": "РС Ку3 Спортбек"
      },
      {
        "id": "AUDI_RS_Q8",
        "name": "RS Q8",
        "russianName": "РС Ку8"
      },
      {
        "id": "AUDI_S1",
        "name": "S1",
        "russianName": "S1"
      },
      {
        "id": "AUDI_S2",
        "name": "S2",
        "russianName": "S2"
      },
      {
        "id": "AUDI_S3",
        "name": "S3",
        "russianName": "S3"
      },
      {
        "id": "AUDI_S4",
        "name": "S4",
        "russianName": "S4"
      },
      {
        "id": "AUDI_S5",
        "name": "S5",
        "russianName": "S5"
      },
      {
        "id": "AUDI_S6",
        "name": "S6",
        "russianName": "S6"
      },
      {
        "id": "AUDI_S6_E_TRON",
        "name": "S6 e-tron",
        "russianName": "С6 е-трон"
      },
      {
        "id": "AUDI_S7",
        "name": "S7",
        "russianName": "S7"
      },
      {
        "id": "AUDI_S8",
        "name": "S8",
        "russianName": "S8"
      },
      {
        "id": "AUDI_SQ2",
        "name": "SQ2",
        "russianName": "ску2"
      },
      {
        "id": "AUDI_SQ5",
        "name": "SQ5",
        "russianName": "ску5"
      },
      {
        "id": "AUDI_SQ5_SPORTBACK",
        "name": "SQ5 Sportback",
        "russianName": "ЭсКью5 Спортбек"
      },
      {
        "id": "AUDI_SQ6_E_TRON",
        "name": "SQ6 e-tron",
        "russianName": "СКу6 е-трон"
      },
      {
        "id": "AUDI_SQ6_SPORTBACK_E_TRON",
        "name": "SQ6 Sportback e-tron",
        "russianName": "СКу6 Спортбек е-трон"
      },
      {
        "id": "AUDI_SQ7",
        "name": "SQ7",
        "russianName": "ску7"
      },
      {
        "id": "AUDI_SQ8",
        "name": "SQ8",
        "russianName": "ску8"
      },
      {
        "id": "AUDI_SQ8_E_TRON",
        "name": "SQ8 e-tron",
        "russianName": "СКу8 е-трон"
      },
      {
        "id": "AUDI_SQ8_SPORTBACK_E_TRON",
        "name": "SQ8 Sportback e-tron",
        "russianName": "СКу8 Спортбек е-трон"
      },
      {
        "id": "AUDI_S_E_TRON_GT",
        "name": "S e-tron GT",
        "russianName": "С и-трон ГТ"
      },
      {
        "id": "AUDI_TT",
        "name": "TT",
        "russianName": "ТТ"
      },
      {
        "id": "AUDI_TTS",
        "name": "TTS",
        "russianName": "ТТС"
      },
      {
        "id": "AUDI_TT_RS",
        "name": "TT RS",
        "russianName": "ТТ РС"
      },
      {
        "id": "AUDI_TYP_R",
        "name": "Typ R",
        "russianName": "Тип-Р"
      },
      {
        "id": "AUDI_V8",
        "name": "V8",
        "russianName": "V8"
      }
    ]
  },
  "AURUS": {
    "id": "AURUS",
    "name": "אורוס",
    "russianName": "Аурус",
    "models": [
      {
        "id": "AURUS_KOMENDANT",
        "name": "Komendant",
        "russianName": "Комендант"
      },
      {
        "id": "AURUS_LAFET",
        "name": "Lafet",
        "russianName": "Лафет"
      },
      {
        "id": "AURUS_SENAT",
        "name": "Senat",
        "russianName": "Сенат"
      }
    ]
  },
  "AUSTIN": {
    "id": "AUSTIN",
    "name": "אוסטין",
    "russianName": "Остин",
    "models": [
      {
        "id": "AUSTIN_ALLEGRO",
        "name": "Allegro",
        "russianName": "Аллегро"
      },
      {
        "id": "AUSTIN_AMBASSADOR",
        "name": "Ambassador",
        "russianName": "Амбассадор"
      },
      {
        "id": "AUSTIN_FL2",
        "name": "FL2",
        "russianName": "ФЛ2"
      },
      {
        "id": "AUSTIN_FX4",
        "name": "FX4",
        "russianName": "ФХ4"
      },
      {
        "id": "AUSTIN_MAESTRO",
        "name": "Maestro",
        "russianName": "Маэстро"
      },
      {
        "id": "AUSTIN_MAXI",
        "name": "Maxi",
        "russianName": "Макси"
      },
      {
        "id": "AUSTIN_METRO",
        "name": "Metro",
        "russianName": "метро"
      },
      {
        "id": "AUSTIN_MINI",
        "name": "מיני",
        "russianName": "Мини"
      },
      {
        "id": "AUSTIN_MONTEGO",
        "name": "Montego",
        "russianName": "Монтего"
      },
      {
        "id": "AUSTIN_PRINCESS",
        "name": "Princess",
        "russianName": "Принцес"
      },
      {
        "id": "AUSTIN_SPRITE",
        "name": "Sprite",
        "russianName": "Спрайт"
      }
    ]
  },
  "AUSTIN_HEALEY": {
    "id": "AUSTIN_HEALEY",
    "name": "אוסטין הילי",
    "russianName": "Остин Хэйли",
    "models": [
      {
        "id": "AUSTIN_HEALEY_100",
        "name": "100",
        "russianName": "100"
      },
      {
        "id": "AUSTIN_HEALEY_3000",
        "name": "3000",
        "russianName": "3000"
      }
    ]
  },
  "AUTOBIANCHI": {
    "id": "AUTOBIANCHI",
    "name": "אוטוביאנקי",
    "russianName": "Аутобьянки",
    "models": [
      {
        "id": "AUTOBIANCHI_A_112",
        "name": "A 112",
        "russianName": "а 112"
      }
    ]
  },
  "AUTO_UNION": {
    "id": "AUTO_UNION",
    "name": "אוטו יוניון",
    "russianName": "Авто Юнион",
    "models": [
      {
        "id": "AUTO_UNION_1000_SP",
        "name": "1000 Sp",
        "russianName": "1000 Сп"
      }
    ]
  },
  "AVATR": {
    "id": "AVATR",
    "name": "אבאטר",
    "russianName": "Аватр",
    "models": [
      {
        "id": "AVATR_06",
        "name": "06",
        "russianName": "06"
      },
      {
        "id": "AVATR_07",
        "name": "07",
        "russianName": "07"
      },
      {
        "id": "AVATR_11",
        "name": "11",
        "russianName": "11"
      },
      {
        "id": "AVATR_12",
        "name": "12",
        "russianName": "12"
      }
    ]
  },
  "AVTOKAM": {
    "id": "AVTOKAM",
    "name": "Автокам",
    "russianName": "Автокам",
    "models": [
      {
        "id": "AVTOKAM_2160",
        "name": "2160",
        "russianName": "2160"
      },
      {
        "id": "AVTOKAM_2163",
        "name": "2163",
        "russianName": "2163"
      },
      {
        "id": "AVTOKAM_3101",
        "name": "3101",
        "russianName": "3101"
      }
    ]
  },
  "BAIC": {
    "id": "BAIC",
    "name": "ב.א.י.סי",
    "russianName": "БАИК",
    "models": [
      {
        "id": "BAIC_A1",
        "name": "A1",
        "russianName": "А1"
      },
      {
        "id": "BAIC_BJ2021",
        "name": "BJ2021",
        "russianName": "БЖ2021"
      },
      {
        "id": "BAIC_BJ2025F",
        "name": "BJ2025F",
        "russianName": "БЖ2025F"
      },
      {
        "id": "BAIC_BJ2030",
        "name": "BJ2030",
        "russianName": "БДЖ2030"
      },
      {
        "id": "BAIC_BJ30",
        "name": "BJ30",
        "russianName": "БЖ30"
      },
      {
        "id": "BAIC_BJ40",
        "name": "BJ40",
        "russianName": "бджей40"
      },
      {
        "id": "BAIC_BJ60",
        "name": "BJ60",
        "russianName": "БЖ60"
      },
      {
        "id": "BAIC_BJ80",
        "name": "BJ80",
        "russianName": "БЖ80"
      },
      {
        "id": "BAIC_BJ90",
        "name": "BJ90",
        "russianName": "БЖ90"
      },
      {
        "id": "BAIC_BJ_2020",
        "name": "BJ2020",
        "russianName": "бж2020"
      },
      {
        "id": "BAIC_BJ_2026",
        "name": "BJ2026",
        "russianName": "бж2026"
      },
      {
        "id": "BAIC_BJ_212",
        "name": "BJ212",
        "russianName": "бж212"
      },
      {
        "id": "BAIC_EC3",
        "name": "EC3",
        "russianName": "ЕС3"
      },
      {
        "id": "BAIC_EU",
        "name": "EU",
        "russianName": "ЭУ"
      },
      {
        "id": "BAIC_EU5",
        "name": "EU5",
        "russianName": "ЕУ5"
      },
      {
        "id": "BAIC_EU7",
        "name": "EU7",
        "russianName": "ЕУ7"
      },
      {
        "id": "BAIC_EX3",
        "name": "EX3",
        "russianName": "ЕИкс3"
      },
      {
        "id": "BAIC_EX5",
        "name": "EX5",
        "russianName": "Икс5"
      },
      {
        "id": "BAIC_JEEP_CHEROKEE_2500",
        "name": "Jeep 2500",
        "russianName": "джип чероки 2500"
      },
      {
        "id": "BAIC_KENBO_600",
        "name": "Kenbo 600",
        "russianName": "Кэнбо 600"
      },
      {
        "id": "BAIC_LUBA",
        "name": "Luba (XB624)",
        "russianName": "луба (хб624)"
      },
      {
        "id": "BAIC_RUIXIANG_X5",
        "name": "Ruixiang X5",
        "russianName": "Русианг Икс 5"
      },
      {
        "id": "BAIC_U5",
        "name": "U5",
        "russianName": "У5"
      },
      {
        "id": "BAIC_U5_PLUS",
        "name": "U5 Plus",
        "russianName": "У5 Плюс"
      },
      {
        "id": "BAIC_U7",
        "name": "U7",
        "russianName": "у7"
      },
      {
        "id": "BAIC_X3",
        "name": "X3",
        "russianName": "Икс3"
      },
      {
        "id": "BAIC_X35",
        "name": "X35",
        "russianName": "Икс35"
      },
      {
        "id": "BAIC_X5",
        "name": "X5",
        "russianName": "Икс5"
      },
      {
        "id": "BAIC_X55",
        "name": "X55",
        "russianName": "Икс55"
      },
      {
        "id": "BAIC_X7",
        "name": "X7",
        "russianName": "Икс7"
      },
      {
        "id": "BAIC_X75",
        "name": "X75",
        "russianName": "Икс75"
      }
    ]
  },
  "BAJAJ": {
    "id": "BAJAJ",
    "name": "באג'אג'",
    "russianName": "Баджадж",
    "models": [
      {
        "id": "BAJAJ_QUTE",
        "name": "Qute",
        "russianName": "Кьют"
      }
    ]
  },
  "BALTIJAS_DZIPS": {
    "id": "BALTIJAS_DZIPS",
    "name": "בלטיאס דזיפס",
    "russianName": "Балтиас Джипс",
    "models": [
      {
        "id": "BALTIJAS_DZIPS_BD_1322",
        "name": "BD-1322",
        "russianName": "бд-1322"
      }
    ]
  },
  "BAOJUN": {
    "id": "BAOJUN",
    "name": "באוג'ון",
    "russianName": "Баоджун",
    "models": [
      {
        "id": "BAOJUN_510",
        "name": "510",
        "russianName": "510"
      },
      {
        "id": "BAOJUN_530",
        "name": "530",
        "russianName": "530"
      },
      {
        "id": "BAOJUN_E100",
        "name": "E100",
        "russianName": "е100"
      },
      {
        "id": "BAOJUN_E300",
        "name": "E300",
        "russianName": "Е300"
      },
      {
        "id": "BAOJUN_KIWI_EV",
        "name": "Kiwi EV",
        "russianName": "Киви ЕВ"
      },
      {
        "id": "BAOJUN_RC_5",
        "name": "RC-5",
        "russianName": "РЦ-5"
      },
      {
        "id": "BAOJUN_RC_6",
        "name": "RC-6",
        "russianName": "РЦ-6"
      },
      {
        "id": "BAOJUN_RM_5",
        "name": "RM-5",
        "russianName": "РМ-5"
      },
      {
        "id": "BAOJUN_RS_3",
        "name": "RS-3",
        "russianName": "РС-3"
      },
      {
        "id": "BAOJUN_RS_5",
        "name": "RS-5",
        "russianName": "РС-5"
      },
      {
        "id": "BAOJUN_VALLI",
        "name": "Valli",
        "russianName": "Валли"
      },
      {
        "id": "BAOJUN_XIANGJING",
        "name": "Xiangjing",
        "russianName": "Ксиангджинг"
      },
      {
        "id": "BAOJUN_YEP",
        "name": "Yep",
        "russianName": "Еп"
      },
      {
        "id": "BAOJUN_YEP_PLUS",
        "name": "Yep Plus",
        "russianName": "Еп Плюс"
      },
      {
        "id": "BAOJUN_YUNDUO",
        "name": "Yunduo",
        "russianName": "Юньдуо"
      },
      {
        "id": "BAOJUN_YUNHAI",
        "name": "Yunhai",
        "russianName": "Юньхай"
      }
    ]
  },
  "BATMOBILE": {
    "id": "BATMOBILE",
    "name": "באטמוביל",
    "russianName": "Бэтмобиль",
    "models": [
      {
        "id": "BATMOBILE_1989",
        "name": "1989",
        "russianName": "1989"
      },
      {
        "id": "BATMOBILE_2018",
        "name": "2018",
        "russianName": "2018"
      }
    ]
  },
  "BAW": {
    "id": "BAW",
    "name": "ב.א.וו",
    "russianName": "БАВ",
    "models": [
      {
        "id": "BAW_212",
        "name": "212",
        "russianName": "212"
      },
      {
        "id": "BAW_212_T01",
        "name": "212 T01",
        "russianName": "212 Т01"
      },
      {
        "id": "BAW_ACE_M7",
        "name": "Ace M7",
        "russianName": "Эйс Эм 7"
      },
      {
        "id": "BAW_F7",
        "name": "Calorie F7",
        "russianName": "Калория Ф7"
      },
      {
        "id": "BAW_JIABAO",
        "name": "Jiabao",
        "russianName": "Джиабао"
      },
      {
        "id": "BAW_M8",
        "name": "M8",
        "russianName": "М8"
      },
      {
        "id": "BAW_MPV",
        "name": "MPV",
        "russianName": "МПВ"
      },
      {
        "id": "BAW_YUANBAO",
        "name": "Pony (Yuanbao)",
        "russianName": "Пони (Янбао)"
      }
    ]
  },
  "BELGEE": {
    "id": "BELGEE",
    "name": "בלגי",
    "russianName": "Белджи",
    "models": [
      {
        "id": "BELGEE_S50",
        "name": "S50",
        "russianName": "С50"
      },
      {
        "id": "BELGEE_X50",
        "name": "X50",
        "russianName": "Икс 50"
      },
      {
        "id": "BELGEE_X70",
        "name": "X70",
        "russianName": "Икс 70"
      },
      {
        "id": "BELGEE_X80",
        "name": "X80",
        "russianName": "Икс 80"
      }
    ]
  },
  "BENTLEY": {
    "id": "BENTLEY",
    "name": "בנטלי",
    "russianName": "Бентли",
    "models": [
      {
        "id": "BENTLEY_ARNAGE",
        "name": "Arnage",
        "russianName": "арнаж"
      },
      {
        "id": "BENTLEY_AZURE",
        "name": "Azure",
        "russianName": "азур"
      },
      {
        "id": "BENTLEY_BENTAYGA",
        "name": "Bentayga",
        "russianName": "бентайга"
      },
      {
        "id": "BENTLEY_BROOKLANDS",
        "name": "Brooklands",
        "russianName": "брукландс"
      },
      {
        "id": "BENTLEY_CONTINENTAL",
        "name": "Continental",
        "russianName": "Континенталь"
      },
      {
        "id": "BENTLEY_CONTINENTAL_FLYING_SPUR",
        "name": "Continental Flying Spur",
        "russianName": "континенталь флаинг спур"
      },
      {
        "id": "BENTLEY_CONTINENTAL_GT",
        "name": "Continental GT",
        "russianName": "континенталь гт"
      },
      {
        "id": "BENTLEY_EIGHT",
        "name": "Eight",
        "russianName": "Эйт"
      },
      {
        "id": "BENTLEY_FLYING_SPUR",
        "name": "Flying Spur",
        "russianName": "Флайн Спур"
      },
      {
        "id": "BENTLEY_MARK_VI",
        "name": "Mark VI",
        "russianName": "марк 6"
      },
      {
        "id": "BENTLEY_MULLINER_BACALAR",
        "name": "Mulliner Bacalar",
        "russianName": "Муллинер Бакалар"
      },
      {
        "id": "BENTLEY_MULLINER_BATUR",
        "name": "Mulliner Batur",
        "russianName": "Муллинер Батур"
      },
      {
        "id": "BENTLEY_MULSANNE",
        "name": "Mulsanne",
        "russianName": "мульсан"
      },
      {
        "id": "BENTLEY_R_TYPE",
        "name": "R Type",
        "russianName": "р тайп"
      },
      {
        "id": "BENTLEY_S",
        "name": "S",
        "russianName": "с"
      },
      {
        "id": "BENTLEY_TURBO_R",
        "name": "Turbo R",
        "russianName": "турбо р"
      },
      {
        "id": "BENTLEY_T_SERIES",
        "name": "T-Series",
        "russianName": "Т-Сериес"
      }
    ]
  },
  "BERTONE": {
    "id": "BERTONE",
    "name": "ברטונה",
    "russianName": "Бертоне",
    "models": [
      {
        "id": "BERTONE_FREECLIMBER",
        "name": "Freeclimber",
        "russianName": "Фриклаймбер"
      }
    ]
  },
  "BESTUNE": {
    "id": "BESTUNE",
    "name": "בסטון",
    "russianName": "Бестюн",
    "models": [
      {
        "id": "BESTUNE_B70",
        "name": "B70",
        "russianName": "Б70"
      },
      {
        "id": "BESTUNE_T55",
        "name": "T55",
        "russianName": "Т55"
      },
      {
        "id": "BESTUNE_T77",
        "name": "T77",
        "russianName": "Т77"
      },
      {
        "id": "BESTUNE_T90",
        "name": "T90",
        "russianName": "Т90"
      }
    ]
  },
  "BILENKIN": {
    "id": "BILENKIN",
    "name": "בילנקין",
    "russianName": "Биленкин",
    "models": [
      {
        "id": "BILENKIN_VINTAGE",
        "name": "Vintage",
        "russianName": "винтаж"
      }
    ]
  },
  "BIO_AUTO": {
    "id": "BIO_AUTO",
    "name": "ביו אוטו",
    "russianName": "Био Авто",
    "models": [
      {
        "id": "BIO_AUTO_EVA_4",
        "name": "evA-4",
        "russianName": "эвА-4"
      }
    ]
  },
  "BITTER": {
    "id": "BITTER",
    "name": "ביטר",
    "russianName": "Биттер",
    "models": [
      {
        "id": "BITTER_CD",
        "name": "CD",
        "russianName": "сд"
      },
      {
        "id": "BITTER_TYPE_3",
        "name": "Type 3",
        "russianName": "Тайп 3"
      }
    ]
  },
  "BLAVAL": {
    "id": "BLAVAL",
    "name": "בלאבל",
    "russianName": "Блавал",
    "models": [
      {
        "id": "BLAVAL_FH_EQ",
        "name": "FH-EQ",
        "russianName": "ФХ-ЕКУ"
      }
    ]
  },
  "BMW": {
    "id": "BMW",
    "name": "ב.מ.וו",
    "russianName": "БМВ",
    "models": [
      {
        "id": "BMW_02",
        "name": "02 (E10)",
        "russianName": "02"
      },
      {
        "id": "BMW_1ER",
        "name": "1 серии",
        "russianName": "1 серии"
      },
      {
        "id": "BMW_1M",
        "name": "1M",
        "russianName": "1М"
      },
      {
        "id": "BMW_2ACTIVETOURER",
        "name": "2 серии Active Tourer",
        "russianName": "2 серии Актив Турер"
      },
      {
        "id": "BMW_2ER",
        "name": "2 серии",
        "russianName": "2 серии"
      },
      {
        "id": "BMW_2GRANDTOURER",
        "name": "2 серии Gran Tourer",
        "russianName": "2 серии гран турер"
      },
      {
        "id": "BMW_315",
        "name": "315",
        "russianName": "315"
      },
      {
        "id": "BMW_3200",
        "name": "3200",
        "russianName": "3200"
      },
      {
        "id": "BMW_321",
        "name": "321",
        "russianName": "321"
      },
      {
        "id": "BMW_326",
        "name": "326",
        "russianName": "326"
      },
      {
        "id": "BMW_327",
        "name": "327",
        "russianName": "327"
      },
      {
        "id": "BMW_340",
        "name": "340",
        "russianName": "340"
      },
      {
        "id": "BMW_3ER",
        "name": "3 серии",
        "russianName": "3 серии"
      },
      {
        "id": "BMW_3_15",
        "name": "3/15",
        "russianName": "3/15"
      },
      {
        "id": "BMW_4",
        "name": "4 серии",
        "russianName": "4 серии"
      },
      {
        "id": "BMW_501",
        "name": "501",
        "russianName": "501"
      },
      {
        "id": "BMW_502",
        "name": "502",
        "russianName": "502"
      },
      {
        "id": "BMW_503",
        "name": "503",
        "russianName": "503"
      },
      {
        "id": "BMW_507",
        "name": "507",
        "russianName": "507"
      },
      {
        "id": "BMW_5ER",
        "name": "5 серии",
        "russianName": "5 серии"
      },
      {
        "id": "BMW_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "BMW_6ER",
        "name": "6 серии",
        "russianName": "6 серии"
      },
      {
        "id": "BMW_700",
        "name": "700",
        "russianName": "700"
      },
      {
        "id": "BMW_7ER",
        "name": "7 серии",
        "russianName": "7 серии"
      },
      {
        "id": "BMW_8ER",
        "name": "8 серии",
        "russianName": "8 серии"
      },
      {
        "id": "BMW_E3",
        "name": "E3",
        "russianName": "е3"
      },
      {
        "id": "BMW_E9",
        "name": "E9",
        "russianName": "е9"
      },
      {
        "id": "BMW_I3",
        "name": "i3",
        "russianName": "и3"
      },
      {
        "id": "BMW_I4",
        "name": "i4",
        "russianName": "и4"
      },
      {
        "id": "BMW_I5",
        "name": "i5",
        "russianName": "и5"
      },
      {
        "id": "BMW_I7",
        "name": "i7",
        "russianName": "и7"
      },
      {
        "id": "BMW_I8",
        "name": "i8",
        "russianName": "и8"
      },
      {
        "id": "BMW_ISETTA",
        "name": "Isetta",
        "russianName": "Изетта"
      },
      {
        "id": "BMW_IX",
        "name": "iX",
        "russianName": "ИХ"
      },
      {
        "id": "BMW_IX1",
        "name": "iX1",
        "russianName": "ИХ1"
      },
      {
        "id": "BMW_IX2",
        "name": "iX2",
        "russianName": "иХ2"
      },
      {
        "id": "BMW_IX3",
        "name": "iX3",
        "russianName": "ИХ3"
      },
      {
        "id": "BMW_IX5",
        "name": "iX5",
        "russianName": "ИХ5"
      },
      {
        "id": "BMW_M2",
        "name": "M2",
        "russianName": "М2"
      },
      {
        "id": "BMW_M3",
        "name": "M3",
        "russianName": "М3"
      },
      {
        "id": "BMW_M4",
        "name": "M4",
        "russianName": "М4"
      },
      {
        "id": "BMW_M5",
        "name": "M5",
        "russianName": "М5"
      },
      {
        "id": "BMW_M6",
        "name": "M6",
        "russianName": "М6"
      },
      {
        "id": "BMW_M8",
        "name": "M8",
        "russianName": "М8"
      },
      {
        "id": "BMW_M_1",
        "name": "M1",
        "russianName": "м1"
      },
      {
        "id": "BMW_NAZCA",
        "name": "Nazca",
        "russianName": "Назка"
      },
      {
        "id": "BMW_NEW_CLASS",
        "name": "New Class",
        "russianName": "нью класс"
      },
      {
        "id": "BMW_X1",
        "name": "X1",
        "russianName": "Х1"
      },
      {
        "id": "BMW_X2",
        "name": "X2",
        "russianName": "Х2"
      },
      {
        "id": "BMW_X3",
        "name": "X3",
        "russianName": "Х3"
      },
      {
        "id": "BMW_X3_M",
        "name": "X3 M",
        "russianName": "Х3 М"
      },
      {
        "id": "BMW_X4",
        "name": "X4",
        "russianName": "Х4"
      },
      {
        "id": "BMW_X4_M",
        "name": "X4 M",
        "russianName": "Х4 М"
      },
      {
        "id": "BMW_X5",
        "name": "X5",
        "russianName": "Х5"
      },
      {
        "id": "BMW_X5_M",
        "name": "X5 M",
        "russianName": "Х5 М"
      },
      {
        "id": "BMW_X6",
        "name": "X6",
        "russianName": "Х6"
      },
      {
        "id": "BMW_X6_M",
        "name": "X6 M",
        "russianName": "Х6 М"
      },
      {
        "id": "BMW_X7",
        "name": "X7",
        "russianName": "Х7"
      },
      {
        "id": "BMW_XM",
        "name": "XM",
        "russianName": "ХМ"
      },
      {
        "id": "BMW_Z1",
        "name": "Z1",
        "russianName": "з1"
      },
      {
        "id": "BMW_Z3",
        "name": "Z3",
        "russianName": "з3"
      },
      {
        "id": "BMW_Z3M",
        "name": "Z3 M",
        "russianName": "з3м"
      },
      {
        "id": "BMW_Z4",
        "name": "Z4",
        "russianName": "З4"
      },
      {
        "id": "BMW_Z4_M",
        "name": "Z4 M",
        "russianName": "з4м"
      },
      {
        "id": "BMW_Z8",
        "name": "Z8",
        "russianName": "з8"
      }
    ]
  },
  "BORGWARD": {
    "id": "BORGWARD",
    "name": "בורגוורד",
    "russianName": "Боргвард",
    "models": [
      {
        "id": "BORGWARD_2000",
        "name": "2000",
        "russianName": "2000"
      },
      {
        "id": "BORGWARD_BX5",
        "name": "BX5",
        "russianName": "БиИкс5"
      },
      {
        "id": "BORGWARD_HANSA_1100",
        "name": "Hansa 1100",
        "russianName": "ханса 1100"
      }
    ]
  },
  "BRABUS": {
    "id": "BRABUS",
    "name": "בראבוס",
    "russianName": "Брабус",
    "models": [
      {
        "id": "BRABUS_73_S",
        "name": "7.3S",
        "russianName": "7.3с"
      },
      {
        "id": "BRABUS_CRAWLER",
        "name": "Crawler",
        "russianName": "Кроулер"
      },
      {
        "id": "BRABUS_E_V12",
        "name": "E V12",
        "russianName": "Е В12"
      },
      {
        "id": "BRABUS_G_V12",
        "name": "G V12",
        "russianName": "Г В12"
      },
      {
        "id": "BRABUS_ML_63_BITURBO",
        "name": "ML 63 Biturbo",
        "russianName": "мл 63 битурбо"
      },
      {
        "id": "BRABUS_M_V12",
        "name": "M V12",
        "russianName": "м в12"
      },
      {
        "id": "BRABUS_ROCKET_GTS",
        "name": "Rocket GTS",
        "russianName": "Рокет ГТС"
      },
      {
        "id": "BRABUS_SV12",
        "name": "SV12",
        "russianName": "св12"
      }
    ]
  },
  "BRILLIANCE": {
    "id": "BRILLIANCE",
    "name": "בריליאנס",
    "russianName": "Бриллианс",
    "models": [
      {
        "id": "BRILLIANCE_FRV_BS2",
        "name": "FRV (BS2)",
        "russianName": "фрв (бс2)"
      },
      {
        "id": "BRILLIANCE_H230",
        "name": "H230",
        "russianName": "н230"
      },
      {
        "id": "BRILLIANCE_H530",
        "name": "H530",
        "russianName": "н530"
      },
      {
        "id": "BRILLIANCE_M1",
        "name": "M1 (BS6)",
        "russianName": "М1"
      },
      {
        "id": "BRILLIANCE_M2_BS4",
        "name": "M2 (BS4)",
        "russianName": "М2"
      },
      {
        "id": "BRILLIANCE_M3_BC3",
        "name": "M3 (BC3)",
        "russianName": "М3"
      },
      {
        "id": "BRILLIANCE_V3",
        "name": "V3",
        "russianName": "в3"
      },
      {
        "id": "BRILLIANCE_V5",
        "name": "V5",
        "russianName": "в5"
      }
    ]
  },
  "BRISTOL": {
    "id": "BRISTOL",
    "name": "בריסטול",
    "russianName": "Бристоль",
    "models": [
      {
        "id": "BRISTOL_BLENHEIM",
        "name": "Blenheim",
        "russianName": "Бленхейм"
      },
      {
        "id": "BRISTOL_BLENHEIM_SPEEDSTER",
        "name": "Blenheim Speedster",
        "russianName": "Бленхейм Спидстер"
      },
      {
        "id": "BRISTOL_FIGHTER",
        "name": "Fighter",
        "russianName": "Файтер"
      }
    ]
  },
  "BUFORI": {
    "id": "BUFORI",
    "name": "בופורי",
    "russianName": "Буфори",
    "models": [
      {
        "id": "BUFORI_GENEVA",
        "name": "Geneva",
        "russianName": "Женева"
      },
      {
        "id": "BUFORI_LA_JOYA",
        "name": "La Joya",
        "russianName": "Ла Джойа"
      }
    ]
  },
  "BUGATTI": {
    "id": "BUGATTI",
    "name": "בוגאטי",
    "russianName": "Бугатти",
    "models": [
      {
        "id": "BUGATTI_BOLIDE",
        "name": "Bolide",
        "russianName": "Болид"
      },
      {
        "id": "BUGATTI_CENTODIECI",
        "name": "Centodieci",
        "russianName": "Сентодиечи"
      },
      {
        "id": "BUGATTI_CHIRON",
        "name": "Chiron",
        "russianName": "Широн"
      },
      {
        "id": "BUGATTI_DIVO",
        "name": "Divo",
        "russianName": "Диво"
      },
      {
        "id": "BUGATTI_EB_110",
        "name": "EB 110",
        "russianName": "еб 110"
      },
      {
        "id": "BUGATTI_EB_112",
        "name": "EB 112",
        "russianName": "еб 112"
      },
      {
        "id": "BUGATTI_EB_VEYRON",
        "name": "EB Veyron 16.4",
        "russianName": "Вейрон"
      },
      {
        "id": "BUGATTI_TOURBILLON",
        "name": "Tourbillon",
        "russianName": "Турбийон"
      },
      {
        "id": "BUGATTI_TYPE_55",
        "name": "Type 55",
        "russianName": "тайп 55"
      },
      {
        "id": "BUGATTI_W16_MISTRAL",
        "name": "W16 Mistral",
        "russianName": "В16 Мистрал"
      }
    ]
  },
  "BUICK": {
    "id": "BUICK",
    "name": "בואיק",
    "russianName": "Бьюик",
    "models": [
      {
        "id": "BUICK_CASCADA",
        "name": "Cascada",
        "russianName": "Каскада"
      },
      {
        "id": "BUICK_CENTURY",
        "name": "Century",
        "russianName": "сенчури"
      },
      {
        "id": "BUICK_ELECTRA",
        "name": "Electra",
        "russianName": "Электра"
      },
      {
        "id": "BUICK_ELECTRA_E4",
        "name": "Electra E4",
        "russianName": "Электра Е4"
      },
      {
        "id": "BUICK_ELECTRA_E5",
        "name": "Electra E5",
        "russianName": "Электра Е5"
      },
      {
        "id": "BUICK_ELECTRA_L7",
        "name": "Electra L7",
        "russianName": "Электра Л7"
      },
      {
        "id": "BUICK_ENCLAVE",
        "name": "Enclave",
        "russianName": "анклав"
      },
      {
        "id": "BUICK_ENCORE",
        "name": "Encore",
        "russianName": "Энкор"
      },
      {
        "id": "BUICK_ENCORE_GX",
        "name": "Encore GX",
        "russianName": "Энкор ДжиИкс"
      },
      {
        "id": "BUICK_ENCORE_PLUS",
        "name": "Encore Plus",
        "russianName": "Энкор Плюс"
      },
      {
        "id": "BUICK_ENVISION",
        "name": "Envision",
        "russianName": "энвижн"
      },
      {
        "id": "BUICK_ENVISTA",
        "name": "Envista",
        "russianName": "Энвиста"
      },
      {
        "id": "BUICK_ESTATE_WAGON",
        "name": "Estate Wagon",
        "russianName": "истейт вагон"
      },
      {
        "id": "BUICK_EXCELLE",
        "name": "Excelle",
        "russianName": "Эксель"
      },
      {
        "id": "BUICK_GL6",
        "name": "GL6",
        "russianName": "ГЛ6"
      },
      {
        "id": "BUICK_GL8",
        "name": "GL8",
        "russianName": "гл8"
      },
      {
        "id": "BUICK_GS",
        "name": "GS",
        "russianName": "ГС"
      },
      {
        "id": "BUICK_LA_CROSSE",
        "name": "LaCrosse",
        "russianName": "ЛаКросс"
      },
      {
        "id": "BUICK_LE_SABRE",
        "name": "LeSabre",
        "russianName": "лесабре"
      },
      {
        "id": "BUICK_LIMITED",
        "name": "Limited",
        "russianName": "лимитед"
      },
      {
        "id": "BUICK_LUCERNE",
        "name": "Lucerne",
        "russianName": "Люцерн"
      },
      {
        "id": "BUICK_PARK_AVENUE",
        "name": "Park Avenue",
        "russianName": "Парк Авеню"
      },
      {
        "id": "BUICK_RAINIER",
        "name": "Rainier",
        "russianName": "Рейнер"
      },
      {
        "id": "BUICK_REATTA",
        "name": "Reatta",
        "russianName": "Риатта"
      },
      {
        "id": "BUICK_REGAL",
        "name": "Regal",
        "russianName": "Регал"
      },
      {
        "id": "BUICK_RENDEZVOUS",
        "name": "Rendezvous",
        "russianName": "Рандеву"
      },
      {
        "id": "BUICK_RIVIERA",
        "name": "Riviera",
        "russianName": "Ривьера"
      },
      {
        "id": "BUICK_ROADMASTER",
        "name": "Roadmaster",
        "russianName": "Роадмастер"
      },
      {
        "id": "BUICK_SKYHAWK",
        "name": "Skyhawk",
        "russianName": "скайхок"
      },
      {
        "id": "BUICK_SKYLARK",
        "name": "Skylark",
        "russianName": "Скайларк"
      },
      {
        "id": "BUICK_SPECIAL",
        "name": "Special",
        "russianName": "спешиал"
      },
      {
        "id": "BUICK_SUPER",
        "name": "Super",
        "russianName": "супер"
      },
      {
        "id": "BUICK_TERRAZA",
        "name": "Terraza",
        "russianName": "Терраза"
      },
      {
        "id": "BUICK_VELITE_6",
        "name": "Velite 6",
        "russianName": "Велит 6"
      },
      {
        "id": "BUICK_VERANO",
        "name": "Verano",
        "russianName": "Верано"
      },
      {
        "id": "BUICK_WILDCAT",
        "name": "Wildcat",
        "russianName": "вайлдкэт"
      }
    ]
  },
  "BYD": {
    "id": "BYD",
    "name": "ב.י.ד",
    "russianName": "БИД",
    "models": [
      {
        "id": "BYD_ATTO_2",
        "name": "Atto 2",
        "russianName": "Атто 2"
      },
      {
        "id": "BYD_CHAZOR",
        "name": "Chazor",
        "russianName": "Чазор"
      },
      {
        "id": "BYD_D1",
        "name": "D1",
        "russianName": "д1"
      },
      {
        "id": "BYD_DESTROYER_05",
        "name": "Destroyer 05",
        "russianName": "Дестройер 05"
      },
      {
        "id": "BYD_DOLPHIN",
        "name": "Dolphin",
        "russianName": "Дельфин"
      },
      {
        "id": "BYD_E1",
        "name": "E1",
        "russianName": "е1"
      },
      {
        "id": "BYD_E2",
        "name": "E2",
        "russianName": "Е2"
      },
      {
        "id": "BYD_E3",
        "name": "E3",
        "russianName": "Е3"
      },
      {
        "id": "BYD_E5",
        "name": "E5",
        "russianName": "е5"
      },
      {
        "id": "BYD_E6",
        "name": "E6",
        "russianName": "е6"
      },
      {
        "id": "BYD_E7",
        "name": "E7",
        "russianName": "е7"
      },
      {
        "id": "BYD_E9",
        "name": "E9",
        "russianName": "Е9"
      },
      {
        "id": "BYD_F0",
        "name": "F0",
        "russianName": "ф0"
      },
      {
        "id": "BYD_F3",
        "name": "F3",
        "russianName": "ф3"
      },
      {
        "id": "BYD_F5",
        "name": "F5",
        "russianName": "ф5"
      },
      {
        "id": "BYD_F6",
        "name": "F6",
        "russianName": "ф6"
      },
      {
        "id": "BYD_F8",
        "name": "F8 (S8)",
        "russianName": "Ф8"
      },
      {
        "id": "BYD_FANGCHENGBAO_LEOPARD_5",
        "name": "FangChengBao Leopard 5",
        "russianName": "ФенгЧенгбао Леопард 5"
      },
      {
        "id": "BYD_FANGCHENGBAO_LEOPARD_8",
        "name": "FangChengBao Leopard 8",
        "russianName": "ФенгЧенгбао Леопард 8"
      },
      {
        "id": "BYD_FANGCHENGBAO_TITANIUM_3",
        "name": "FangChengBao Titanium 3",
        "russianName": "ФенгЧенгбао Титаниум 3"
      },
      {
        "id": "BYD_FANGCHENGBAO_TITANIUM_7",
        "name": "FangChengBao Titanium 7",
        "russianName": "ФенгЧенгбао Титаниум 7"
      },
      {
        "id": "BYD_FLYER",
        "name": "Flyer",
        "russianName": "Флаер"
      },
      {
        "id": "BYD_FRIGATE_07",
        "name": "Frigate 07",
        "russianName": "Фригейт_07"
      },
      {
        "id": "BYD_G3",
        "name": "G3",
        "russianName": "Г3"
      },
      {
        "id": "BYD_G6",
        "name": "G6",
        "russianName": "г6"
      },
      {
        "id": "BYD_HAN",
        "name": "Han",
        "russianName": "Хан"
      },
      {
        "id": "BYD_HAN_L",
        "name": "Han L",
        "russianName": "Хан Л"
      },
      {
        "id": "BYD_L3",
        "name": "L3",
        "russianName": "л3"
      },
      {
        "id": "BYD_M6",
        "name": "M6",
        "russianName": "М6"
      },
      {
        "id": "BYD_QIN",
        "name": "Qin",
        "russianName": "Чин"
      },
      {
        "id": "BYD_S6",
        "name": "S6",
        "russianName": "С6"
      },
      {
        "id": "BYD_SEAGULL",
        "name": "Seagull",
        "russianName": "Сигал"
      },
      {
        "id": "BYD_SEAL",
        "name": "Seal",
        "russianName": "Сил"
      },
      {
        "id": "BYD_SEAL_05",
        "name": "Seal 05",
        "russianName": "Сиэл 05"
      },
      {
        "id": "BYD_SEAL_06",
        "name": "Seal 06",
        "russianName": "Сиэл 06"
      },
      {
        "id": "BYD_SEAL_06_GT",
        "name": "Seal 06 GT",
        "russianName": "Сиэл 06 гт"
      },
      {
        "id": "BYD_SEAL_07_DM_I",
        "name": "Seal 07",
        "russianName": "Сиэл 07"
      },
      {
        "id": "BYD_SEA_LION_05",
        "name": "Sea Lion 05",
        "russianName": "Сиа лион 05"
      },
      {
        "id": "BYD_SEA_LION_06",
        "name": "Sea Lion 06",
        "russianName": "Сиа лион 06"
      },
      {
        "id": "BYD_SEA_LION_07",
        "name": "Sea Lion 07",
        "russianName": "Сиа лион 07"
      },
      {
        "id": "BYD_SHARK",
        "name": "Shark",
        "russianName": "Шарк"
      },
      {
        "id": "BYD_SONG",
        "name": "Song",
        "russianName": "Сонг"
      },
      {
        "id": "BYD_SONG_EV",
        "name": "Song EV",
        "russianName": "Сонг ЕВ"
      },
      {
        "id": "BYD_SONG_L",
        "name": "Song L",
        "russianName": "Сонг Л"
      },
      {
        "id": "BYD_SONG_MAX",
        "name": "Song Max",
        "russianName": "сонг макс"
      },
      {
        "id": "BYD_SONG_PLUS",
        "name": "Song Plus",
        "russianName": "Сонг Плюс"
      },
      {
        "id": "BYD_SONG_PRO",
        "name": "Song Pro",
        "russianName": "Сонг Про"
      },
      {
        "id": "BYD_TANG",
        "name": "Tang",
        "russianName": "Тэнг"
      },
      {
        "id": "BYD_TANG_L",
        "name": "Tang L",
        "russianName": "Тэнг Л"
      },
      {
        "id": "BYD_XIA",
        "name": "Xia",
        "russianName": "Чиа"
      },
      {
        "id": "BYD_YANGWANG_U7",
        "name": "Yangwang U7",
        "russianName": "Янгвэнг Ю7"
      },
      {
        "id": "BYD_YANGWANG_U8",
        "name": "Yangwang U8",
        "russianName": "Янгвэнг Ю8"
      },
      {
        "id": "BYD_YANGWANG_U9",
        "name": "Yangwang U9",
        "russianName": "Янгвэнг Ю9"
      },
      {
        "id": "BYD_YUAN",
        "name": "Yuan",
        "russianName": "Юан"
      },
      {
        "id": "BYD_YUAN_PLUS",
        "name": "Yuan Plus",
        "russianName": "Юан Плюс"
      },
      {
        "id": "BYD_YUAN_UP",
        "name": "Yuan Up",
        "russianName": "Юан Ап"
      }
    ]
  },
  "BYVIN": {
    "id": "BYVIN",
    "name": "ביווין",
    "russianName": "Бивин",
    "models": [
      {
        "id": "BYVIN_BD_132J",
        "name": "BD132J (CoCo)",
        "russianName": "бд132ж (сосо)"
      },
      {
        "id": "BYVIN_BD_326J",
        "name": "BD326J (Moca)",
        "russianName": "бд326ж (мока)"
      }
    ]
  },
  "CADILLAC": {
    "id": "CADILLAC",
    "name": "קדילאק",
    "russianName": "Кадиллак",
    "models": [
      {
        "id": "CADILLAC_ALLANTE",
        "name": "Allante",
        "russianName": "Аланте"
      },
      {
        "id": "CADILLAC_ATS",
        "name": "ATS",
        "russianName": "АТС"
      },
      {
        "id": "CADILLAC_ATS_V",
        "name": "ATS-V",
        "russianName": "атс-в"
      },
      {
        "id": "CADILLAC_BLS",
        "name": "BLS",
        "russianName": "блс"
      },
      {
        "id": "CADILLAC_BROUGHAM",
        "name": "Brougham",
        "russianName": "Броугхэм"
      },
      {
        "id": "CADILLAC_CATERA",
        "name": "Catera",
        "russianName": "Катера"
      },
      {
        "id": "CADILLAC_CELESTIQ",
        "name": "Celestiq",
        "russianName": "Целестик"
      },
      {
        "id": "CADILLAC_CT4",
        "name": "CT4",
        "russianName": "СТ4"
      },
      {
        "id": "CADILLAC_CT4_V",
        "name": "CT4-V",
        "russianName": "СТ4-В"
      },
      {
        "id": "CADILLAC_CT5",
        "name": "CT5",
        "russianName": "СТ5"
      },
      {
        "id": "CADILLAC_CT5_V",
        "name": "CT5-V",
        "russianName": "СТ5-В"
      },
      {
        "id": "CADILLAC_CT6",
        "name": "CT6",
        "russianName": "СТ6"
      },
      {
        "id": "CADILLAC_CTS",
        "name": "CTS",
        "russianName": "цтс"
      },
      {
        "id": "CADILLAC_CTS_V",
        "name": "CTS-V",
        "russianName": "Си-Ти-Эс-Вэ"
      },
      {
        "id": "CADILLAC_DE_VILLE",
        "name": "DeVille",
        "russianName": "Девиль"
      },
      {
        "id": "CADILLAC_DTS",
        "name": "DTS",
        "russianName": "дтс"
      },
      {
        "id": "CADILLAC_ELDORADO",
        "name": "Eldorado",
        "russianName": "Эльдорадо"
      },
      {
        "id": "CADILLAC_ELR",
        "name": "ELR",
        "russianName": "елр"
      },
      {
        "id": "CADILLAC_ESCALADE",
        "name": "Escalade",
        "russianName": "Эскалейд"
      },
      {
        "id": "CADILLAC_ESCALADE_IQ",
        "name": "Escalade iQ",
        "russianName": "Эскалейд АйКью"
      },
      {
        "id": "CADILLAC_ESCALADE_V",
        "name": "Escalade-V",
        "russianName": "Эскалейд-В"
      },
      {
        "id": "CADILLAC_FLEETWOOD",
        "name": "Fleetwood",
        "russianName": "флитвуд"
      },
      {
        "id": "CADILLAC_GT4",
        "name": "GT4",
        "russianName": "ГТ4"
      },
      {
        "id": "CADILLAC_LIRIQ_V",
        "name": "Lyriq-V",
        "russianName": "Лирик-в"
      },
      {
        "id": "CADILLAC_LSE",
        "name": "LSE",
        "russianName": "лсе"
      },
      {
        "id": "CADILLAC_LYRIQ",
        "name": "Lyriq",
        "russianName": "Лирик"
      },
      {
        "id": "CADILLAC_MODEL_30",
        "name": "Model 30",
        "russianName": "Модель 30"
      },
      {
        "id": "CADILLAC_OPTIQ",
        "name": "Optiq",
        "russianName": "Оптик"
      },
      {
        "id": "CADILLAC_OPTIQ_V",
        "name": "Optiq-V",
        "russianName": "Оптик В"
      },
      {
        "id": "CADILLAC_SERIES_314",
        "name": "Series 314",
        "russianName": "Серия 314"
      },
      {
        "id": "CADILLAC_SERIES_341",
        "name": "Series 341",
        "russianName": "Серия 341"
      },
      {
        "id": "CADILLAC_SERIES_62",
        "name": "Series 62",
        "russianName": "серия 62"
      },
      {
        "id": "CADILLAC_SEVILLE",
        "name": "Seville",
        "russianName": "Севиль"
      },
      {
        "id": "CADILLAC_SIXTY_SPECIAL",
        "name": "Sixty Special",
        "russianName": "Сиксти Спешл"
      },
      {
        "id": "CADILLAC_SRX",
        "name": "SRX",
        "russianName": "срх"
      },
      {
        "id": "CADILLAC_STS",
        "name": "STS",
        "russianName": "стс"
      },
      {
        "id": "CADILLAC_STS_V",
        "name": "STS-V",
        "russianName": "СТС-В"
      },
      {
        "id": "CADILLAC_VISTIQ",
        "name": "Vistiq",
        "russianName": "Вистик"
      },
      {
        "id": "CADILLAC_XLR",
        "name": "XLR",
        "russianName": "хлр"
      },
      {
        "id": "CADILLAC_XT4",
        "name": "XT4",
        "russianName": "ХТ4"
      },
      {
        "id": "CADILLAC_XT5",
        "name": "XT5",
        "russianName": "ХТ5"
      },
      {
        "id": "CADILLAC_XT6",
        "name": "XT6",
        "russianName": "ХТ6"
      },
      {
        "id": "CADILLAC_XTS",
        "name": "XTS",
        "russianName": "хтс"
      }
    ]
  },
  "CALLAWAY": {
    "id": "CALLAWAY",
    "name": "קלאווי",
    "russianName": "Каллавей",
    "models": [
      {
        "id": "CALLAWAY_C12",
        "name": "C12",
        "russianName": "с12"
      }
    ]
  },
  "CARBODIES": {
    "id": "CARBODIES",
    "name": "קרבודיס",
    "russianName": "Карбодис",
    "models": [
      {
        "id": "CARBODIES_FX4",
        "name": "FX4",
        "russianName": "фх4"
      }
    ]
  },
  "CATERHAM": {
    "id": "CATERHAM",
    "name": "קתרהאם",
    "russianName": "Катерхем",
    "models": [
      {
        "id": "CATERHAM_C21",
        "name": "21",
        "russianName": "21"
      },
      {
        "id": "CATERHAM_CSR",
        "name": "CSR",
        "russianName": "цср"
      },
      {
        "id": "CATERHAM_SEVEN",
        "name": "Seven",
        "russianName": "Севен"
      }
    ]
  },
  "CHANA": {
    "id": "CHANA",
    "name": "צ'אנה",
    "russianName": "Чана",
    "models": [
      {
        "id": "CHANA_BENNI",
        "name": "Benni",
        "russianName": "Бенни"
      },
      {
        "id": "CHANA_SC_6390",
        "name": "SC6390",
        "russianName": "СЦ6390"
      },
      {
        "id": "CHANA_TAURUSTAR",
        "name": "Taurustar",
        "russianName": "Таурустар"
      }
    ]
  },
  "CHANGAN": {
    "id": "CHANGAN",
    "name": "צ'אנגאן",
    "russianName": "Чанган",
    "models": [
      {
        "id": "CHANGAN_A05",
        "name": "Qiyuan A05",
        "russianName": "Циюань А05"
      },
      {
        "id": "CHANGAN_A06",
        "name": "Qiyuan A06",
        "russianName": "Циюань А06"
      },
      {
        "id": "CHANGAN_A07",
        "name": "Qiyuan A07",
        "russianName": "Циюань А07"
      },
      {
        "id": "CHANGAN_ALSVIN",
        "name": "Alsvin",
        "russianName": "Алсвин"
      },
      {
        "id": "CHANGAN_ALSVIN_V7",
        "name": "Alsvin V7",
        "russianName": "Алсвин В7"
      },
      {
        "id": "CHANGAN_AUCHAN_A600EV",
        "name": "Auchan A600 EV",
        "russianName": "Ашан А600 ЕВ"
      },
      {
        "id": "CHANGAN_BENBEN_E_STAR",
        "name": "Benben E-Star",
        "russianName": "бенбен е-стар"
      },
      {
        "id": "CHANGAN_BENNI",
        "name": "Benni",
        "russianName": "Бенни"
      },
      {
        "id": "CHANGAN_BENNI_EC_EV",
        "name": "Benni EC/EV",
        "russianName": "Бенни ЕЦ/ЕВ"
      },
      {
        "id": "CHANGAN_CM_8",
        "name": "CM-8",
        "russianName": "см-8"
      },
      {
        "id": "CHANGAN_CS15",
        "name": "CS15",
        "russianName": "цс15"
      },
      {
        "id": "CHANGAN_CS35",
        "name": "CS35",
        "russianName": "цс35"
      },
      {
        "id": "CHANGAN_CS35PLUS",
        "name": "CS35 Plus",
        "russianName": "ЦС 35 плюс"
      },
      {
        "id": "CHANGAN_CS55",
        "name": "CS55",
        "russianName": "цс55"
      },
      {
        "id": "CHANGAN_CS55PLUS",
        "name": "CS55 Plus",
        "russianName": "ЦС55ПЛЮС"
      },
      {
        "id": "CHANGAN_CS75",
        "name": "CS75",
        "russianName": "ЦС75"
      },
      {
        "id": "CHANGAN_CS75PLUS",
        "name": "CS75 Plus",
        "russianName": "ЦС75Плюс"
      },
      {
        "id": "CHANGAN_CS75_PRO",
        "name": "CS75 Pro",
        "russianName": "ЦС75 Про"
      },
      {
        "id": "CHANGAN_CS85",
        "name": "CS85",
        "russianName": "ЦС85"
      },
      {
        "id": "CHANGAN_CS95",
        "name": "CS95",
        "russianName": "ЦС95"
      },
      {
        "id": "CHANGAN_CS95PLUS",
        "name": "CS95 Plus",
        "russianName": "ЦС95Плюс"
      },
      {
        "id": "CHANGAN_CX20",
        "name": "CX20",
        "russianName": "сх20"
      },
      {
        "id": "CHANGAN_CX70",
        "name": "Oshan CX70",
        "russianName": "ЦИкс70"
      },
      {
        "id": "CHANGAN_DEEPAL_G318",
        "name": "Deepal G318",
        "russianName": "Дипал Джи318"
      },
      {
        "id": "CHANGAN_DEEPAL_L06",
        "name": "Deepal L06",
        "russianName": "Дипал Л06"
      },
      {
        "id": "CHANGAN_DEEPAL_L07",
        "name": "Deepal L07",
        "russianName": "Дипал Л07"
      },
      {
        "id": "CHANGAN_DEEPAL_S05",
        "name": "Deepal S05",
        "russianName": "Дипал С05"
      },
      {
        "id": "CHANGAN_DEEPAL_S09",
        "name": "Deepal S09",
        "russianName": "Дипал С09"
      },
      {
        "id": "CHANGAN_E07",
        "name": "Qiyuan E07",
        "russianName": "Циюань Е07"
      },
      {
        "id": "CHANGAN_EADO",
        "name": "Eado",
        "russianName": "Еадо"
      },
      {
        "id": "CHANGAN_EADO_PLUS",
        "name": "Eado Plus",
        "russianName": "Еадо Плюс"
      },
      {
        "id": "CHANGAN_EXPLORER",
        "name": "Lantuozhe (Explorer)",
        "russianName": "Лантоуж (Эксплорер)"
      },
      {
        "id": "CHANGAN_HUNTER",
        "name": "Hunter",
        "russianName": "Хантер"
      },
      {
        "id": "CHANGAN_HUNTER_K50",
        "name": "Qiyuan Hunter K50",
        "russianName": "Циюань Хантер К50"
      },
      {
        "id": "CHANGAN_HUNTER_PLUS",
        "name": "Hunter Plus",
        "russianName": "Хантер Плюс"
      },
      {
        "id": "CHANGAN_KAICENE_F70",
        "name": "Kaicene F70",
        "russianName": "Кайсен Ф70"
      },
      {
        "id": "CHANGAN_LAMORE",
        "name": "Lamore",
        "russianName": "Ламоре"
      },
      {
        "id": "CHANGAN_LINMAX",
        "name": "Linmax",
        "russianName": "Линмакс"
      },
      {
        "id": "CHANGAN_LUMIN",
        "name": "Lumin",
        "russianName": "Люмин"
      },
      {
        "id": "CHANGAN_OUSHAN_CHANGXING",
        "name": "Oushan Changxing",
        "russianName": "Оушан Чанксин"
      },
      {
        "id": "CHANGAN_Q05",
        "name": "Qiyuan Q05",
        "russianName": "Циюань Ку05"
      },
      {
        "id": "CHANGAN_Q07",
        "name": "Qiyuan Q07",
        "russianName": "Циюань Ку07"
      },
      {
        "id": "CHANGAN_RAETON",
        "name": "Raeton",
        "russianName": "Раетон"
      },
      {
        "id": "CHANGAN_RAETON_CC",
        "name": "Raeton CC",
        "russianName": "Раетон СС"
      },
      {
        "id": "CHANGAN_RAETON_PLUS",
        "name": "Raeton Plus",
        "russianName": "Раетон Плюс"
      },
      {
        "id": "CHANGAN_SHENLAN_S7",
        "name": "Deepal S07 (S7)",
        "russianName": "Дипал С7"
      },
      {
        "id": "CHANGAN_SHENLAN_SL03",
        "name": "Deepal SL03",
        "russianName": "Дипал СЛ03"
      },
      {
        "id": "CHANGAN_UNI_K",
        "name": "UNI-K",
        "russianName": "УНИ-К"
      },
      {
        "id": "CHANGAN_UNI_L",
        "name": "UNI-L",
        "russianName": "Уни-Эл"
      },
      {
        "id": "CHANGAN_UNI_S",
        "name": "UNI-S (CS55 Plus)",
        "russianName": "Уни-С"
      },
      {
        "id": "CHANGAN_UNI_T",
        "name": "UNI-T",
        "russianName": "Уни-Т"
      },
      {
        "id": "CHANGAN_UNI_V",
        "name": "UNI-V",
        "russianName": "Уни-В"
      },
      {
        "id": "CHANGAN_UNI_Z",
        "name": "UNI-Z",
        "russianName": "Уни-Зед"
      },
      {
        "id": "CHANGAN_X5_PLUS",
        "name": "X5 Plus",
        "russianName": "икс 5 плюс"
      },
      {
        "id": "CHANGAN_X7_PLUS",
        "name": "X7 Plus",
        "russianName": "икс 7 плюс"
      },
      {
        "id": "CHANGAN_YIDA",
        "name": "Yida",
        "russianName": "Ида"
      },
      {
        "id": "CHANGAN_Z_SHINE",
        "name": "Z-Shine",
        "russianName": "зет-шайн"
      }
    ]
  },
  "CHANGFENG": {
    "id": "CHANGFENG",
    "name": "צ'אנגפנג",
    "russianName": "Чанфэн",
    "models": [
      {
        "id": "CHANGFENG_CS6",
        "name": "SUV (CS6)",
        "russianName": "СУВ"
      },
      {
        "id": "CHANGFENG_FLYING",
        "name": "Flying",
        "russianName": "Флаинг"
      },
      {
        "id": "CHANGFENG_LIEBAO_LEOPARD",
        "name": "Liebao Leopard",
        "russianName": "Лиебао Леопард"
      }
    ]
  },
  "CHANGHE": {
    "id": "CHANGHE",
    "name": "צ'אנגה",
    "russianName": "Чанхэ",
    "models": [
      {
        "id": "CHANGHE_FREEDOM",
        "name": "Freedom",
        "russianName": "Фридом"
      },
      {
        "id": "CHANGHE_IDEAL",
        "name": "Ideal",
        "russianName": "Идеал"
      }
    ]
  },
  "CHERY": {
    "id": "CHERY",
    "name": "צ'רי",
    "russianName": "Чери",
    "models": [
      {
        "id": "CHERY_AMULET",
        "name": "Amulet (A15)",
        "russianName": "Амулет"
      },
      {
        "id": "CHERY_ARRIZO6",
        "name": "Arrizo 6",
        "russianName": "Арризо 6"
      },
      {
        "id": "CHERY_ARRIZO7",
        "name": "Arrizo 7",
        "russianName": "Арризо 7"
      },
      {
        "id": "CHERY_ARRIZO_3",
        "name": "Arrizo 3",
        "russianName": "Арризо 3"
      },
      {
        "id": "CHERY_ARRIZO_5",
        "name": "Arrizo 5",
        "russianName": "Арризо 5"
      },
      {
        "id": "CHERY_ARRIZO_5_GT",
        "name": "Arrizo 5 GT",
        "russianName": "Арризо 5 ГТ"
      },
      {
        "id": "CHERY_ARRIZO_5_PLUS",
        "name": "Arrizo 5 Plus",
        "russianName": "Арризо 5 Плюс"
      },
      {
        "id": "CHERY_ARRIZO_8",
        "name": "Arrizo 8",
        "russianName": "Арризо 8"
      },
      {
        "id": "CHERY_ARRIZO_8_PRO",
        "name": "Arrizo 8 Pro",
        "russianName": "Арризо 8 Про"
      },
      {
        "id": "CHERY_B13",
        "name": "B13",
        "russianName": "Б13"
      },
      {
        "id": "CHERY_BONUS",
        "name": "Bonus (A13)",
        "russianName": "Бонус"
      },
      {
        "id": "CHERY_BONUS_3",
        "name": "Bonus 3 (E3/A19)",
        "russianName": "Бонус 3"
      },
      {
        "id": "CHERY_CROSS_EASTAR",
        "name": "CrossEastar (B14)",
        "russianName": "Кросс Эстар"
      },
      {
        "id": "CHERY_DOMI",
        "name": "Domi",
        "russianName": "Доми"
      },
      {
        "id": "CHERY_E5",
        "name": "E5",
        "russianName": "Е5"
      },
      {
        "id": "CHERY_EQ1",
        "name": "eQ1",
        "russianName": "ЕКу1"
      },
      {
        "id": "CHERY_EQ5",
        "name": "eQ5",
        "russianName": "еКу5"
      },
      {
        "id": "CHERY_EQ7",
        "name": "eQ7",
        "russianName": "еКу7"
      },
      {
        "id": "CHERY_EXPLORE_06",
        "name": "Explore 06",
        "russianName": "Эксплор 06"
      },
      {
        "id": "CHERY_FACE",
        "name": "Face",
        "russianName": "Фэйс"
      },
      {
        "id": "CHERY_FORA",
        "name": "Fora (A21)",
        "russianName": "Фора"
      },
      {
        "id": "CHERY_FULWIN_A8",
        "name": "Fulwin A8",
        "russianName": "Фулвин А8"
      },
      {
        "id": "CHERY_FULWIN_A9L",
        "name": "Fulwin A9L",
        "russianName": "Фулвин А9 Л"
      },
      {
        "id": "CHERY_FULWIN_T10",
        "name": "Fulwin T10",
        "russianName": "Фулвин Т10"
      },
      {
        "id": "CHERY_FULWIN_T11",
        "name": "Fulwin T11",
        "russianName": "Фулвин Т11"
      },
      {
        "id": "CHERY_FULWIN_T6",
        "name": "Fulwin T6",
        "russianName": "Фулвин Т6"
      },
      {
        "id": "CHERY_FULWIN_T8",
        "name": "Fulwin T8",
        "russianName": "Фулвин Т8"
      },
      {
        "id": "CHERY_FULWIN_T9",
        "name": "Fulwin T9",
        "russianName": "Фулвин Т9"
      },
      {
        "id": "CHERY_FULWIN_X3",
        "name": "Fulwin X3",
        "russianName": "Фулвин икс 3"
      },
      {
        "id": "CHERY_INDIS",
        "name": "IndiS (S18D)",
        "russianName": "Индис"
      },
      {
        "id": "CHERY_KARRY",
        "name": "Karry",
        "russianName": "Кари"
      },
      {
        "id": "CHERY_KIMO",
        "name": "Kimo (A1)",
        "russianName": "Кимо"
      },
      {
        "id": "CHERY_M11",
        "name": "M11 (A3)",
        "russianName": "M11"
      },
      {
        "id": "CHERY_OMODA_5",
        "name": "Omoda 5",
        "russianName": "Омода 5"
      },
      {
        "id": "CHERY_ORIENTAL_SON",
        "name": "Oriental Son (B11)",
        "russianName": "Ориентал Сон"
      },
      {
        "id": "CHERY_Q22",
        "name": "Q22",
        "russianName": "Ку22"
      },
      {
        "id": "CHERY_QQ",
        "name": "Sweet (QQ)",
        "russianName": "Свит"
      },
      {
        "id": "CHERY_QQ6",
        "name": "QQ6 (S21)",
        "russianName": "Куку6"
      },
      {
        "id": "CHERY_QQME",
        "name": "QQme",
        "russianName": "КьюКьюМи"
      },
      {
        "id": "CHERY_QQ_ICE_CREAM",
        "name": "QQ Ice Cream",
        "russianName": "КуКу Айс Крим"
      },
      {
        "id": "CHERY_RELAY_R08",
        "name": "Rely R08",
        "russianName": "Релай Р8"
      },
      {
        "id": "CHERY_TIGGO",
        "name": "Tiggo (T11)",
        "russianName": "Тиго"
      },
      {
        "id": "CHERY_TIGGO_2",
        "name": "Tiggo 2",
        "russianName": "Тиго 2"
      },
      {
        "id": "CHERY_TIGGO_2_PRO",
        "name": "Tiggo 2 Pro",
        "russianName": "Тигго 2 Про"
      },
      {
        "id": "CHERY_TIGGO_3",
        "name": "Tiggo 3",
        "russianName": "Тигго 3"
      },
      {
        "id": "CHERY_TIGGO_3X",
        "name": "Tiggo 3x",
        "russianName": "Тигго 3Х"
      },
      {
        "id": "CHERY_TIGGO_3XE",
        "name": "Tiggo 3xe",
        "russianName": "Тигго 3ИксЕ"
      },
      {
        "id": "CHERY_TIGGO_4",
        "name": "Tiggo 4",
        "russianName": "Тигго 4"
      },
      {
        "id": "CHERY_TIGGO_4_PRO",
        "name": "Tiggo 4 Pro",
        "russianName": "Тигго 4 про"
      },
      {
        "id": "CHERY_TIGGO_5",
        "name": "Tiggo 5",
        "russianName": "Тигго 5"
      },
      {
        "id": "CHERY_TIGGO_5X",
        "name": "Tiggo 5x",
        "russianName": "Тигго 5 икс"
      },
      {
        "id": "CHERY_TIGGO_7",
        "name": "Tiggo 7",
        "russianName": "Тигго 7"
      },
      {
        "id": "CHERY_TIGGO_7L",
        "name": "Tiggo 7L",
        "russianName": "Тигго 7Л"
      },
      {
        "id": "CHERY_TIGGO_7_PLUS",
        "name": "Tiggo 7 Plus",
        "russianName": "Тигго 7 плюс"
      },
      {
        "id": "CHERY_TIGGO_7_PRO",
        "name": "Tiggo 7 Pro",
        "russianName": "Тигго 7 Про"
      },
      {
        "id": "CHERY_TIGGO_7_PRO_MAX",
        "name": "Tiggo 7 Pro Max",
        "russianName": "Тигго 7 Про Макс"
      },
      {
        "id": "CHERY_TIGGO_7_PRO_PLUG_IN_HYBRID",
        "name": "Tiggo 7 Pro Plug-in Hybrid",
        "russianName": "Тигго 7 Про Плаг-ин Гибрид"
      },
      {
        "id": "CHERY_TIGGO_8",
        "name": "Tiggo 8",
        "russianName": "Тигго Восемь"
      },
      {
        "id": "CHERY_TIGGO_8L",
        "name": "Tiggo 8L",
        "russianName": "Тигго 8Л"
      },
      {
        "id": "CHERY_TIGGO_8_PLUS",
        "name": "Tiggo 8 Plus",
        "russianName": "Тигго 8 плюс"
      },
      {
        "id": "CHERY_TIGGO_8_PRO",
        "name": "Tiggo 8 Pro",
        "russianName": "Тигго 8 Про"
      },
      {
        "id": "CHERY_TIGGO_8_PRO_EPLUS",
        "name": "Tiggo 8 Pro e+",
        "russianName": "Тигго 8 Про е+"
      },
      {
        "id": "CHERY_TIGGO_8_PRO_MAX",
        "name": "Tiggo 8 Pro Max",
        "russianName": "Тигго 8 Про Макс"
      },
      {
        "id": "CHERY_TIGGO_8_PRO_PLUG_IN_HYBRID",
        "name": "Tiggo 8 Pro Plug-in Hybrid",
        "russianName": "Тигго 8 Про Плаг-ин Гибрид"
      },
      {
        "id": "CHERY_TIGGO_9",
        "name": "Tiggo 9",
        "russianName": "Тигго 9"
      },
      {
        "id": "CHERY_TIGGO_E",
        "name": "Tiggo E",
        "russianName": "Тигго Е"
      },
      {
        "id": "CHERY_VERY",
        "name": "Very (A13)",
        "russianName": "Вери"
      },
      {
        "id": "CHERY_WINDCLOUD",
        "name": "Windcloud (A11)",
        "russianName": "Виндклауд"
      }
    ]
  },
  "CHERYEXEED": {
    "id": "CHERYEXEED",
    "name": "Exeed",
    "russianName": "Эксид",
    "models": [
      {
        "id": "CHERYEXEED_ES",
        "name": "Sterra ES",
        "russianName": "Стерра ЕС"
      },
      {
        "id": "CHERYEXEED_ET8",
        "name": "ET8",
        "russianName": "ЕТ8"
      },
      {
        "id": "CHERYEXEED_EXLANTIX_ES",
        "name": "Exlantix ES",
        "russianName": "Экслантикс ЕС"
      },
      {
        "id": "CHERYEXEED_EXLANTIX_ET",
        "name": "Exlantix ET",
        "russianName": "Экслантикс ЕТ"
      },
      {
        "id": "CHERYEXEED_LX",
        "name": "LX",
        "russianName": "ЛХ"
      },
      {
        "id": "CHERYEXEED_RX",
        "name": "RX",
        "russianName": "ЭрИкс"
      },
      {
        "id": "CHERYEXEED_STERRA_ET",
        "name": "Sterra ET",
        "russianName": "Стерра ЕТ"
      },
      {
        "id": "CHERYEXEED_STERRA_ET5",
        "name": "Sterra ET5",
        "russianName": "Стерра ЕТ5"
      },
      {
        "id": "CHERYEXEED_TX",
        "name": "TX",
        "russianName": "ТХ"
      },
      {
        "id": "CHERYEXEED_TXL",
        "name": "TXL",
        "russianName": "ТХЛ"
      },
      {
        "id": "CHERYEXEED_VX",
        "name": "VX",
        "russianName": "ВХ"
      },
      {
        "id": "CHERYEXEED_YAOGUANG",
        "name": "Yaoguang",
        "russianName": "Яогуанг"
      }
    ]
  },
  "CHEVROLET": {
    "id": "CHEVROLET",
    "name": "שברולט",
    "russianName": "Шевроле",
    "models": [
      {
        "id": "CHEVROLET_3000_SERIES",
        "name": "3000-Series",
        "russianName": "3000 серия"
      },
      {
        "id": "CHEVROLET_ALERO",
        "name": "Alero",
        "russianName": "Алеро"
      },
      {
        "id": "CHEVROLET_APACHE",
        "name": "Apache",
        "russianName": "Апачи"
      },
      {
        "id": "CHEVROLET_ASTRA",
        "name": "Astra",
        "russianName": "Астра"
      },
      {
        "id": "CHEVROLET_ASTRO",
        "name": "Astro",
        "russianName": "Астро"
      },
      {
        "id": "CHEVROLET_AVALANCHE",
        "name": "Avalanche",
        "russianName": "Аваланч"
      },
      {
        "id": "CHEVROLET_AVEO",
        "name": "Aveo",
        "russianName": "Авео"
      },
      {
        "id": "CHEVROLET_BEL_AIR",
        "name": "Bel Air",
        "russianName": "Бел Эйр"
      },
      {
        "id": "CHEVROLET_BERETTA",
        "name": "Beretta",
        "russianName": "Беретта"
      },
      {
        "id": "CHEVROLET_BLAZER",
        "name": "Blazer",
        "russianName": "Блейзер"
      },
      {
        "id": "CHEVROLET_BLAZER_EV",
        "name": "Blazer EV",
        "russianName": "Блейзер ИВИ"
      },
      {
        "id": "CHEVROLET_BOLT",
        "name": "Bolt",
        "russianName": "болт"
      },
      {
        "id": "CHEVROLET_BOLT_EUV",
        "name": "Bolt EUV",
        "russianName": "Болт ЭУВ"
      },
      {
        "id": "CHEVROLET_CAMARO",
        "name": "Camaro",
        "russianName": "Камаро"
      },
      {
        "id": "CHEVROLET_CAPRICE",
        "name": "Caprice",
        "russianName": "Каприз"
      },
      {
        "id": "CHEVROLET_CAPTIVA",
        "name": "Captiva",
        "russianName": "Каптива"
      },
      {
        "id": "CHEVROLET_CAPTIVA_SPORT",
        "name": "Captiva Sport",
        "russianName": "Каптива Спорт"
      },
      {
        "id": "CHEVROLET_CAVALIER",
        "name": "Cavalier",
        "russianName": "Кавалер"
      },
      {
        "id": "CHEVROLET_CELEBRITY",
        "name": "Celebrity",
        "russianName": "Селебрити"
      },
      {
        "id": "CHEVROLET_CELTA",
        "name": "Celta",
        "russianName": "Сельта"
      },
      {
        "id": "CHEVROLET_CHEVELLE",
        "name": "Chevelle",
        "russianName": "чевелле"
      },
      {
        "id": "CHEVROLET_CHEVETTE",
        "name": "Chevette",
        "russianName": "Шевет"
      },
      {
        "id": "CHEVROLET_CITATION",
        "name": "Citation",
        "russianName": "сайтейшн"
      },
      {
        "id": "CHEVROLET_CK",
        "name": "C/K",
        "russianName": "Си/Кей"
      },
      {
        "id": "CHEVROLET_CLASSIC",
        "name": "Classic",
        "russianName": "Классик"
      },
      {
        "id": "CHEVROLET_CMATIZ",
        "name": "Matiz",
        "russianName": "Матиз"
      },
      {
        "id": "CHEVROLET_COBALT",
        "name": "Cobalt",
        "russianName": "Кобальт"
      },
      {
        "id": "CHEVROLET_COLORADO",
        "name": "Colorado",
        "russianName": "Колорадо"
      },
      {
        "id": "CHEVROLET_CORSA",
        "name": "Corsa",
        "russianName": "Корса"
      },
      {
        "id": "CHEVROLET_CORSICA",
        "name": "Corsica",
        "russianName": "Корсика"
      },
      {
        "id": "CHEVROLET_CORVAIR",
        "name": "Corvair",
        "russianName": "Корвейр"
      },
      {
        "id": "CHEVROLET_CORVETTE",
        "name": "Corvette",
        "russianName": "Корвет"
      },
      {
        "id": "CHEVROLET_CRUZE",
        "name": "Cruze",
        "russianName": "Круз"
      },
      {
        "id": "CHEVROLET_CRUZE_HR",
        "name": "Cruze (HR)",
        "russianName": "круз (эйчар)"
      },
      {
        "id": "CHEVROLET_CSV_CR8",
        "name": "CSV CR8",
        "russianName": "ЦСВ-ЦР8"
      },
      {
        "id": "CHEVROLET_C_10",
        "name": "C-10",
        "russianName": "C-10"
      },
      {
        "id": "CHEVROLET_DAMAS",
        "name": "Damas",
        "russianName": "Дамас"
      },
      {
        "id": "CHEVROLET_DELUXE",
        "name": "Deluxe",
        "russianName": "Делюкс"
      },
      {
        "id": "CHEVROLET_EL_CAMINO",
        "name": "El Camino",
        "russianName": "эль камино"
      },
      {
        "id": "CHEVROLET_EPICA",
        "name": "Epica",
        "russianName": "Эпика"
      },
      {
        "id": "CHEVROLET_EQUINOX",
        "name": "Equinox",
        "russianName": "Эквинокс"
      },
      {
        "id": "CHEVROLET_EVANDA",
        "name": "Evanda",
        "russianName": "Эванда"
      },
      {
        "id": "CHEVROLET_EXPRESS",
        "name": "Express",
        "russianName": "Экспресс"
      },
      {
        "id": "CHEVROLET_FLEETMASTER",
        "name": "Fleetmaster",
        "russianName": "флитмастер"
      },
      {
        "id": "CHEVROLET_GROOVE",
        "name": "Groove",
        "russianName": "Грув"
      },
      {
        "id": "CHEVROLET_HHR",
        "name": "HHR",
        "russianName": "HHR"
      },
      {
        "id": "CHEVROLET_IMPALA",
        "name": "Impala",
        "russianName": "Импала"
      },
      {
        "id": "CHEVROLET_K5_BLAZER",
        "name": "Blazer K5",
        "russianName": "Блейзер K5"
      },
      {
        "id": "CHEVROLET_KALOS",
        "name": "Kalos",
        "russianName": "калос"
      },
      {
        "id": "CHEVROLET_LACETTI",
        "name": "Lacetti",
        "russianName": "Лачетти"
      },
      {
        "id": "CHEVROLET_LANOS",
        "name": "Lanos",
        "russianName": "Ланос"
      },
      {
        "id": "CHEVROLET_LUMINA",
        "name": "Lumina",
        "russianName": "Люмина"
      },
      {
        "id": "CHEVROLET_LUMINA_APV",
        "name": "Lumina APV",
        "russianName": "люмина апв"
      },
      {
        "id": "CHEVROLET_LUV_DMAX",
        "name": "LUV D-MAX",
        "russianName": "Лув Д-Макс"
      },
      {
        "id": "CHEVROLET_MALIBU",
        "name": "Malibu",
        "russianName": "Малибу"
      },
      {
        "id": "CHEVROLET_MASTER",
        "name": "Master",
        "russianName": "мастер"
      },
      {
        "id": "CHEVROLET_MENLO",
        "name": "Menlo",
        "russianName": "Менло"
      },
      {
        "id": "CHEVROLET_METRO",
        "name": "Metro",
        "russianName": "Метро"
      },
      {
        "id": "CHEVROLET_MONTE_CARLO",
        "name": "Monte Carlo",
        "russianName": "Монте Карло"
      },
      {
        "id": "CHEVROLET_MONZA",
        "name": "Monza",
        "russianName": "Монца"
      },
      {
        "id": "CHEVROLET_MW",
        "name": "MW",
        "russianName": "мв"
      },
      {
        "id": "CHEVROLET_NEXIA",
        "name": "Nexia",
        "russianName": "Нексия"
      },
      {
        "id": "CHEVROLET_NIVA",
        "name": "Niva",
        "russianName": "Нива"
      },
      {
        "id": "CHEVROLET_NOVA",
        "name": "Nova",
        "russianName": "Нова"
      },
      {
        "id": "CHEVROLET_NUBIRA",
        "name": "Nubira",
        "russianName": "Нубира"
      },
      {
        "id": "CHEVROLET_OMEGA",
        "name": "Omega",
        "russianName": "Омега"
      },
      {
        "id": "CHEVROLET_ONIX",
        "name": "Onix",
        "russianName": "Оникс"
      },
      {
        "id": "CHEVROLET_ORLANDO",
        "name": "Orlando",
        "russianName": "Орландо"
      },
      {
        "id": "CHEVROLET_PRIZM",
        "name": "Prizm",
        "russianName": "Призм"
      },
      {
        "id": "CHEVROLET_REZZO",
        "name": "Rezzo",
        "russianName": "Реззо"
      },
      {
        "id": "CHEVROLET_SAIL",
        "name": "Sail",
        "russianName": "Сейл"
      },
      {
        "id": "CHEVROLET_SEEKER",
        "name": "Seeker",
        "russianName": "Сикер"
      },
      {
        "id": "CHEVROLET_SILVERADO",
        "name": "Silverado",
        "russianName": "сильверадо"
      },
      {
        "id": "CHEVROLET_SONIC",
        "name": "Sonic",
        "russianName": "Соник"
      },
      {
        "id": "CHEVROLET_SPARK",
        "name": "Spark",
        "russianName": "Спарк"
      },
      {
        "id": "CHEVROLET_SPARK_EUV",
        "name": "Spark EUV",
        "russianName": "Спарк ИЮВи"
      },
      {
        "id": "CHEVROLET_SPECIAL_DELUXE",
        "name": "Special DeLuxe",
        "russianName": "спешиал делюкс"
      },
      {
        "id": "CHEVROLET_SPIN",
        "name": "Spin",
        "russianName": "Спин"
      },
      {
        "id": "CHEVROLET_SS",
        "name": "SS",
        "russianName": "СС"
      },
      {
        "id": "CHEVROLET_SSR",
        "name": "SSR",
        "russianName": "SSR"
      },
      {
        "id": "CHEVROLET_STANDARD",
        "name": "Standard",
        "russianName": "Стандард"
      },
      {
        "id": "CHEVROLET_STARCRAFT",
        "name": "Starcraft",
        "russianName": "Старкрафт"
      },
      {
        "id": "CHEVROLET_SUBURBAN",
        "name": "Suburban",
        "russianName": "Субурбан"
      },
      {
        "id": "CHEVROLET_S_10",
        "name": "S-10 Pickup",
        "russianName": "С-10 Пикап"
      },
      {
        "id": "CHEVROLET_TACUMA",
        "name": "Tacuma",
        "russianName": "Такума"
      },
      {
        "id": "CHEVROLET_TAHOE",
        "name": "Tahoe",
        "russianName": "Тахо"
      },
      {
        "id": "CHEVROLET_TAVERA",
        "name": "Tavera",
        "russianName": "Тавера"
      },
      {
        "id": "CHEVROLET_TRACKER",
        "name": "Tracker",
        "russianName": "Трекер"
      },
      {
        "id": "CHEVROLET_TRAILBLAZER",
        "name": "TrailBlazer",
        "russianName": "Трейл блейзер"
      },
      {
        "id": "CHEVROLET_TRANSSPORT",
        "name": "Trans Sport",
        "russianName": "Транс Спорт"
      },
      {
        "id": "CHEVROLET_TRAVERSE",
        "name": "Traverse",
        "russianName": "Траверс"
      },
      {
        "id": "CHEVROLET_TRAX",
        "name": "Trax",
        "russianName": "Тракс"
      },
      {
        "id": "CHEVROLET_UPLANDER",
        "name": "Uplander",
        "russianName": "Аплендер"
      },
      {
        "id": "CHEVROLET_VAN",
        "name": "Van",
        "russianName": "Ван"
      },
      {
        "id": "CHEVROLET_VECTRA",
        "name": "Vectra",
        "russianName": "Вектра"
      },
      {
        "id": "CHEVROLET_VENTURE",
        "name": "Venture",
        "russianName": "Вентура"
      },
      {
        "id": "CHEVROLET_VIVA",
        "name": "Viva",
        "russianName": "Вива"
      },
      {
        "id": "CHEVROLET_VOLT",
        "name": "Volt",
        "russianName": "Вольт"
      },
      {
        "id": "CHEVROLET_ZAFIRA",
        "name": "Zafira",
        "russianName": "Зафира"
      }
    ]
  },
  "CHRYSLER": {
    "id": "CHRYSLER",
    "name": "קרייזלר",
    "russianName": "Крайслер",
    "models": [
      {
        "id": "CHRYSLER_180",
        "name": "180",
        "russianName": "180"
      },
      {
        "id": "CHRYSLER_200",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "CHRYSLER_300",
        "name": "300",
        "russianName": "300"
      },
      {
        "id": "CHRYSLER_300C",
        "name": "300C",
        "russianName": "300Ц"
      },
      {
        "id": "CHRYSLER_300M",
        "name": "300M",
        "russianName": "300М"
      },
      {
        "id": "CHRYSLER_300_LETTER_SERIES",
        "name": "300 Letter Series",
        "russianName": "300 Леттер Сериес"
      },
      {
        "id": "CHRYSLER_ASPEN",
        "name": "Aspen",
        "russianName": "Аспен"
      },
      {
        "id": "CHRYSLER_CIRRUS",
        "name": "Cirrus",
        "russianName": "Цирус"
      },
      {
        "id": "CHRYSLER_CONCORDE",
        "name": "Concorde",
        "russianName": "Конкорд"
      },
      {
        "id": "CHRYSLER_CORDOBA",
        "name": "Cordoba",
        "russianName": "кордоба"
      },
      {
        "id": "CHRYSLER_CROSSFIRE",
        "name": "Crossfire",
        "russianName": "Кроссфаер"
      },
      {
        "id": "CHRYSLER_DAYTONA",
        "name": "Daytona",
        "russianName": "Дайтона"
      },
      {
        "id": "CHRYSLER_DYNASTY",
        "name": "Dynasty",
        "russianName": "династия"
      },
      {
        "id": "CHRYSLER_ES",
        "name": "ES",
        "russianName": "ЕС"
      },
      {
        "id": "CHRYSLER_FIFTH_AVENUE",
        "name": "Fifth Avenue",
        "russianName": "5-е Авеню"
      },
      {
        "id": "CHRYSLER_IMPERIAL",
        "name": "Imperial",
        "russianName": "Империал"
      },
      {
        "id": "CHRYSLER_IMPERIAL_CROWN",
        "name": "Imperial Crown",
        "russianName": "Империал Краун"
      },
      {
        "id": "CHRYSLER_INTREPID",
        "name": "Intrepid",
        "russianName": "Интерпид"
      },
      {
        "id": "CHRYSLER_LE_BARON",
        "name": "LeBaron",
        "russianName": "Ле Барон"
      },
      {
        "id": "CHRYSLER_LHS",
        "name": "LHS",
        "russianName": "LHS"
      },
      {
        "id": "CHRYSLER_NASSAU",
        "name": "Nassau",
        "russianName": "Нассау"
      },
      {
        "id": "CHRYSLER_NEON",
        "name": "Neon",
        "russianName": "Неон"
      },
      {
        "id": "CHRYSLER_NEWPORT",
        "name": "Newport",
        "russianName": "Ньюпорт"
      },
      {
        "id": "CHRYSLER_NEW_YORKER",
        "name": "New Yorker",
        "russianName": "Нью Йоркер"
      },
      {
        "id": "CHRYSLER_PACIFICA",
        "name": "Pacifica",
        "russianName": "Пацифика"
      },
      {
        "id": "CHRYSLER_PROWLER",
        "name": "Prowler",
        "russianName": "Праулер"
      },
      {
        "id": "CHRYSLER_PT_CRUISER",
        "name": "PT Cruiser",
        "russianName": "ПТ Крузер"
      },
      {
        "id": "CHRYSLER_SARATOGA",
        "name": "Saratoga",
        "russianName": "Саратога"
      },
      {
        "id": "CHRYSLER_SEBRING",
        "name": "Sebring",
        "russianName": "Себринг"
      },
      {
        "id": "CHRYSLER_SIX",
        "name": "Six",
        "russianName": "сикс"
      },
      {
        "id": "CHRYSLER_STRATUS",
        "name": "Stratus",
        "russianName": "Стратус"
      },
      {
        "id": "CHRYSLER_TC_BY_MASERATI",
        "name": "TC by Maserati",
        "russianName": "ТЦ бай Мазерати"
      },
      {
        "id": "CHRYSLER_TOWN_AND_COUNTRY",
        "name": "Town & Country",
        "russianName": "Таун Кантри"
      },
      {
        "id": "CHRYSLER_VIPER",
        "name": "Viper",
        "russianName": "Вайпер"
      },
      {
        "id": "CHRYSLER_VISION",
        "name": "Vision",
        "russianName": "Вижн"
      },
      {
        "id": "CHRYSLER_VOYAGER",
        "name": "Voyager",
        "russianName": "Вояджер"
      },
      {
        "id": "CHRYSLER_WINDSOR",
        "name": "Windsor",
        "russianName": "виндсор"
      },
      {
        "id": "CHRYSLER_YPSILON",
        "name": "Ypsilon",
        "russianName": "Ипсилон"
      }
    ]
  },
  "CIIMO": {
    "id": "CIIMO",
    "name": "סימו (דונגפנג-הונדה)",
    "russianName": "Циимо",
    "models": [
      {
        "id": "CIIMO_M_NV",
        "name": "M-NV",
        "russianName": "М-НВ"
      },
      {
        "id": "CIIMO_X_NV",
        "name": "X-NV",
        "russianName": "X-NV"
      }
    ]
  },
  "CITROEN": {
    "id": "CITROEN",
    "name": "סיטרואן",
    "russianName": "Ситроен",
    "models": [
      {
        "id": "CITROEN_2CV",
        "name": "2 CV",
        "russianName": "Де Шво"
      },
      {
        "id": "CITROEN_AMI",
        "name": "Ami",
        "russianName": "AMI"
      },
      {
        "id": "CITROEN_AMI_EV",
        "name": "Ami EV",
        "russianName": "Ами ЕВ"
      },
      {
        "id": "CITROEN_AX",
        "name": "AX",
        "russianName": "Ax"
      },
      {
        "id": "CITROEN_BASALT",
        "name": "Basalt",
        "russianName": "Базальт"
      },
      {
        "id": "CITROEN_BERLINGO",
        "name": "Berlingo",
        "russianName": "Берлинго"
      },
      {
        "id": "CITROEN_BX",
        "name": "BX",
        "russianName": "Bx"
      },
      {
        "id": "CITROEN_C1",
        "name": "C1",
        "russianName": "C1"
      },
      {
        "id": "CITROEN_C2",
        "name": "C2",
        "russianName": "C2"
      },
      {
        "id": "CITROEN_C3",
        "name": "C3",
        "russianName": "C3"
      },
      {
        "id": "CITROEN_C3L",
        "name": "C3L",
        "russianName": "с3л"
      },
      {
        "id": "CITROEN_C3_AIRCROSS",
        "name": "C3 Aircross",
        "russianName": "C3 Аиркросс"
      },
      {
        "id": "CITROEN_C3_PICASSO",
        "name": "C3 Picasso",
        "russianName": "C3 Пикассо"
      },
      {
        "id": "CITROEN_C3_XR",
        "name": "C3-XR",
        "russianName": "С3-ИксР"
      },
      {
        "id": "CITROEN_C4",
        "name": "C4",
        "russianName": "C4"
      },
      {
        "id": "CITROEN_C4_AIRCROSS",
        "name": "C4 Aircross",
        "russianName": "с4 аиркросс"
      },
      {
        "id": "CITROEN_C4_CACTUS",
        "name": "C4 Cactus",
        "russianName": "C4 Кактус"
      },
      {
        "id": "CITROEN_C4_PICASSO",
        "name": "C4 Picasso",
        "russianName": "C4 Пикассо"
      },
      {
        "id": "CITROEN_C4_SPACETOURER",
        "name": "C4 SpaceTourer",
        "russianName": "С4 Спейстурер"
      },
      {
        "id": "CITROEN_C5",
        "name": "C5",
        "russianName": "C5"
      },
      {
        "id": "CITROEN_C5_AIRCROSS",
        "name": "C5 Aircross",
        "russianName": "C5 Аиркросс"
      },
      {
        "id": "CITROEN_C5_X",
        "name": "C5 X",
        "russianName": "C5 Икс"
      },
      {
        "id": "CITROEN_C6",
        "name": "C6",
        "russianName": "C6"
      },
      {
        "id": "CITROEN_C8",
        "name": "C8",
        "russianName": "C8"
      },
      {
        "id": "CITROEN_CX",
        "name": "CX",
        "russianName": "Cx"
      },
      {
        "id": "CITROEN_C_CROSSER",
        "name": "C-Crosser",
        "russianName": "Си кроссер"
      },
      {
        "id": "CITROEN_C_ELYSEE",
        "name": "C-Elysee",
        "russianName": "Си Элизи"
      },
      {
        "id": "CITROEN_C_QUATRE",
        "name": "C-Quatre",
        "russianName": "ц-куатре"
      },
      {
        "id": "CITROEN_C_TRIOMPHE",
        "name": "C-Triomphe",
        "russianName": "ц-триомфе"
      },
      {
        "id": "CITROEN_C_ZERO",
        "name": "C-ZERO",
        "russianName": "ц-зеро"
      },
      {
        "id": "CITROEN_DS",
        "name": "ד.ס",
        "russianName": "дс"
      },
      {
        "id": "CITROEN_DS3",
        "name": "DS3",
        "russianName": "DS3"
      },
      {
        "id": "CITROEN_DS4",
        "name": "DS4",
        "russianName": "DS4"
      },
      {
        "id": "CITROEN_DS5",
        "name": "DS5",
        "russianName": "дс5"
      },
      {
        "id": "CITROEN_DYANE",
        "name": "Dyane",
        "russianName": "Дайан"
      },
      {
        "id": "CITROEN_EVASION",
        "name": "Evasion",
        "russianName": "Эвазион"
      },
      {
        "id": "CITROEN_E_MEHARI",
        "name": "E-Mehari",
        "russianName": "Е-Мехари"
      },
      {
        "id": "CITROEN_GS",
        "name": "GS",
        "russianName": "GS"
      },
      {
        "id": "CITROEN_JUMPY",
        "name": "Jumpy",
        "russianName": "Джампи"
      },
      {
        "id": "CITROEN_LN",
        "name": "LN",
        "russianName": "лн"
      },
      {
        "id": "CITROEN_NEMO",
        "name": "Nemo",
        "russianName": "немо"
      },
      {
        "id": "CITROEN_SAXO",
        "name": "Saxo",
        "russianName": "Саксо"
      },
      {
        "id": "CITROEN_SM",
        "name": "SM",
        "russianName": "см"
      },
      {
        "id": "CITROEN_SPACETOURER",
        "name": "SpaceTourer",
        "russianName": "Спейс турер"
      },
      {
        "id": "CITROEN_TRACTION_AVANT",
        "name": "Traction Avant",
        "russianName": "трекшн авант"
      },
      {
        "id": "CITROEN_VISA",
        "name": "Visa",
        "russianName": "Виза"
      },
      {
        "id": "CITROEN_XANTIA",
        "name": "Xantia",
        "russianName": "Ксантия"
      },
      {
        "id": "CITROEN_XM",
        "name": "XM",
        "russianName": "XM"
      },
      {
        "id": "CITROEN_XSARA",
        "name": "Xsara",
        "russianName": "Ксара"
      },
      {
        "id": "CITROEN_XSARA_PICASSO",
        "name": "Xsara Picasso",
        "russianName": "Ксара Пикассо"
      },
      {
        "id": "CITROEN_ZX",
        "name": "ZX",
        "russianName": "ZX"
      }
    ]
  },
  "CIZETA": {
    "id": "CIZETA",
    "name": "סיזטה",
    "russianName": "Чизета",
    "models": [
      {
        "id": "CIZETA_V16T",
        "name": "V16t",
        "russianName": "в16т"
      }
    ]
  },
  "CODA": {
    "id": "CODA",
    "name": "קודה",
    "russianName": "Кода",
    "models": [
      {
        "id": "CODA_EV",
        "name": "EV",
        "russianName": "ЕВ"
      }
    ]
  },
  "COGGIOLA": {
    "id": "COGGIOLA",
    "name": "קוגיולה",
    "russianName": "Коджиола",
    "models": [
      {
        "id": "COGGIOLA_T_REX",
        "name": "T Rex",
        "russianName": "т рекс"
      }
    ]
  },
  "CORD": {
    "id": "CORD",
    "name": "קורד",
    "russianName": "Корд",
    "models": [
      {
        "id": "CORD_L_29",
        "name": "L-29",
        "russianName": "Л-29"
      }
    ]
  },
  "COWIN": {
    "id": "COWIN",
    "name": "קווין",
    "russianName": "Ковин",
    "models": [
      {
        "id": "COWIN_SHOWJET",
        "name": "Showjet",
        "russianName": "Шоуджет"
      }
    ]
  },
  "CUPRA": {
    "id": "CUPRA",
    "name": "קופרה",
    "russianName": "Купра",
    "models": [
      {
        "id": "CUPRA_ATECA",
        "name": "Ateca",
        "russianName": "Атека"
      },
      {
        "id": "CUPRA_BORN",
        "name": "Born",
        "russianName": "борн"
      },
      {
        "id": "CUPRA_FORMENTOR",
        "name": "Formentor",
        "russianName": "Форментор"
      },
      {
        "id": "CUPRA_LEON",
        "name": "Leon",
        "russianName": "леон"
      },
      {
        "id": "CUPRA_TAVASCAN",
        "name": "Tavascan",
        "russianName": "Таваскан"
      },
      {
        "id": "CUPRA_TERRAMAR",
        "name": "Terramar",
        "russianName": "Террамар"
      }
    ]
  },
  "DACIA": {
    "id": "DACIA",
    "name": "דאצ'יה",
    "russianName": "Дачия",
    "models": [
      {
        "id": "DACIA_1300",
        "name": "1300",
        "russianName": "1300"
      },
      {
        "id": "DACIA_1310",
        "name": "1310",
        "russianName": "1310"
      },
      {
        "id": "DACIA_1410",
        "name": "1410",
        "russianName": "1410"
      },
      {
        "id": "DACIA_BIGSTER",
        "name": "Bigster",
        "russianName": "Бигстер"
      },
      {
        "id": "DACIA_DOKKER",
        "name": "Dokker",
        "russianName": "Доккер"
      },
      {
        "id": "DACIA_DUSTER",
        "name": "Duster",
        "russianName": "Дастер"
      },
      {
        "id": "DACIA_JOGGER",
        "name": "Jogger",
        "russianName": "Джоггер"
      },
      {
        "id": "DACIA_LODGY",
        "name": "Lodgy",
        "russianName": "Лоджи"
      },
      {
        "id": "DACIA_LOGAN",
        "name": "Logan",
        "russianName": "Логан"
      },
      {
        "id": "DACIA_NOVA",
        "name": "Nova",
        "russianName": "Нова"
      },
      {
        "id": "DACIA_PICK_UP",
        "name": "Pick-Up",
        "russianName": "Пик-Ап"
      },
      {
        "id": "DACIA_SANDERO",
        "name": "Sandero",
        "russianName": "Сандэро"
      },
      {
        "id": "DACIA_SOLENZA",
        "name": "Solenza",
        "russianName": "Соленза"
      },
      {
        "id": "DACIA_SPRING",
        "name": "Spring",
        "russianName": "Спринг"
      },
      {
        "id": "DACIA_SUPERNOVA",
        "name": "SuperNova",
        "russianName": "СуперНова"
      }
    ]
  },
  "DADI": {
    "id": "DADI",
    "name": "דאדי",
    "russianName": "Дади",
    "models": [
      {
        "id": "DADI_CITY_LEADING",
        "name": "City Leading",
        "russianName": "Сити Лидин"
      },
      {
        "id": "DADI_SHUTTLE",
        "name": "Shuttle",
        "russianName": "Шаттл"
      },
      {
        "id": "DADI_SMOOTHING",
        "name": "Smoothing",
        "russianName": "Смуфин"
      }
    ]
  },
  "DAEWOO": {
    "id": "DAEWOO",
    "name": "דאיוו",
    "russianName": "Дэу",
    "models": [
      {
        "id": "DAEWOO_ALPHEON",
        "name": "Alpheon",
        "russianName": "Алфеон"
      },
      {
        "id": "DAEWOO_ARCADIA",
        "name": "Arcadia",
        "russianName": "Аркадия"
      },
      {
        "id": "DAEWOO_CHAIRMAN",
        "name": "Chairman",
        "russianName": "Чаирман"
      },
      {
        "id": "DAEWOO_DAMAS",
        "name": "Damas",
        "russianName": "Дамас"
      },
      {
        "id": "DAEWOO_ESPERO",
        "name": "Espero",
        "russianName": "Эсперо"
      },
      {
        "id": "DAEWOO_EVANDA",
        "name": "Evanda",
        "russianName": "Эванда"
      },
      {
        "id": "DAEWOO_G2X",
        "name": "G2X",
        "russianName": "G2X"
      },
      {
        "id": "DAEWOO_GENTRA",
        "name": "Gentra",
        "russianName": "Джентра"
      },
      {
        "id": "DAEWOO_KALOS",
        "name": "Kalos",
        "russianName": "Калос"
      },
      {
        "id": "DAEWOO_KORANDO",
        "name": "Korando",
        "russianName": "Корандо"
      },
      {
        "id": "DAEWOO_LACETTI",
        "name": "Lacetti",
        "russianName": "Лачетти"
      },
      {
        "id": "DAEWOO_LACETTI_PREMIERE",
        "name": "Lacetti Premiere",
        "russianName": "Лачетти Премьер"
      },
      {
        "id": "DAEWOO_LANOS",
        "name": "Lanos",
        "russianName": "Ланос"
      },
      {
        "id": "DAEWOO_LEGANZA",
        "name": "Leganza",
        "russianName": "Леганза"
      },
      {
        "id": "DAEWOO_LE_MANS",
        "name": "LeMans",
        "russianName": "Леманс"
      },
      {
        "id": "DAEWOO_MAGNUS",
        "name": "Magnus",
        "russianName": "Магнус"
      },
      {
        "id": "DAEWOO_MATIZ",
        "name": "Matiz",
        "russianName": "Матиз"
      },
      {
        "id": "DAEWOO_MATIZ_CREATIVE",
        "name": "Matiz Creative",
        "russianName": "Матиз Криэйтив"
      },
      {
        "id": "DAEWOO_MUSSO",
        "name": "Musso",
        "russianName": "Муссо"
      },
      {
        "id": "DAEWOO_NEXIA",
        "name": "Nexia",
        "russianName": "Нексия"
      },
      {
        "id": "DAEWOO_NUBIRA",
        "name": "Nubira",
        "russianName": "Нубира"
      },
      {
        "id": "DAEWOO_PRINCE",
        "name": "Prince",
        "russianName": "Принц"
      },
      {
        "id": "DAEWOO_RACER",
        "name": "Racer",
        "russianName": "Рейсер"
      },
      {
        "id": "DAEWOO_REZZO",
        "name": "Rezzo",
        "russianName": "Реззо"
      },
      {
        "id": "DAEWOO_ROYALE",
        "name": "Royale",
        "russianName": "Роял"
      },
      {
        "id": "DAEWOO_SENS",
        "name": "Sens",
        "russianName": "Сенс"
      },
      {
        "id": "DAEWOO_TACUMA",
        "name": "Tacuma",
        "russianName": "Такума"
      },
      {
        "id": "DAEWOO_TICO",
        "name": "Tico",
        "russianName": "Тико"
      },
      {
        "id": "DAEWOO_TOSCA",
        "name": "Tosca",
        "russianName": "Тоска"
      },
      {
        "id": "DAEWOO_WINDSTORM",
        "name": "Winstorm",
        "russianName": "Винсторм"
      }
    ]
  },
  "DAIHATSU": {
    "id": "DAIHATSU",
    "name": "דייהטסו",
    "russianName": "Дайхатсу",
    "models": [
      {
        "id": "DAIHATSU_ALTIS",
        "name": "Altis",
        "russianName": "Алтис"
      },
      {
        "id": "DAIHATSU_APPLAUSE",
        "name": "Applause",
        "russianName": "Апплаус"
      },
      {
        "id": "DAIHATSU_ATRAI",
        "name": "Atrai",
        "russianName": "Атрай"
      },
      {
        "id": "DAIHATSU_BEE",
        "name": "Bee",
        "russianName": "би"
      },
      {
        "id": "DAIHATSU_BE_GO",
        "name": "Be-go",
        "russianName": "Бе-го"
      },
      {
        "id": "DAIHATSU_BOON",
        "name": "Boon",
        "russianName": "Бун"
      },
      {
        "id": "DAIHATSU_BOON_LUMINAS",
        "name": "Boon Luminas",
        "russianName": "Бун Луминас"
      },
      {
        "id": "DAIHATSU_CAST",
        "name": "Cast",
        "russianName": "Каст"
      },
      {
        "id": "DAIHATSU_CERIA",
        "name": "Ceria",
        "russianName": "Цериа"
      },
      {
        "id": "DAIHATSU_CHARADE",
        "name": "Charade",
        "russianName": "Шарад"
      },
      {
        "id": "DAIHATSU_CHARMANT",
        "name": "Charmant",
        "russianName": "Шармант"
      },
      {
        "id": "DAIHATSU_COO",
        "name": "Coo",
        "russianName": "Ку"
      },
      {
        "id": "DAIHATSU_COPEN",
        "name": "Copen",
        "russianName": "Копен"
      },
      {
        "id": "DAIHATSU_CUORE",
        "name": "Cuore",
        "russianName": "Куоре"
      },
      {
        "id": "DAIHATSU_DELTA_WAGON",
        "name": "Delta Wagon",
        "russianName": "дельта вагон"
      },
      {
        "id": "DAIHATSU_ESSE",
        "name": "Esse",
        "russianName": "Эссе"
      },
      {
        "id": "DAIHATSU_EXTOL",
        "name": "Extol",
        "russianName": "Экстол"
      },
      {
        "id": "DAIHATSU_FELLOW",
        "name": "Fellow",
        "russianName": "феллов"
      },
      {
        "id": "DAIHATSU_FEROZA",
        "name": "Feroza",
        "russianName": "Фероза"
      },
      {
        "id": "DAIHATSU_GRAN_MOVE",
        "name": "Gran Move",
        "russianName": "Гран Мув"
      },
      {
        "id": "DAIHATSU_HIJET",
        "name": "Hijet",
        "russianName": "Хайджет"
      },
      {
        "id": "DAIHATSU_HIJET_CADDIE",
        "name": "Hijet Caddie",
        "russianName": "хайджет кадди"
      },
      {
        "id": "DAIHATSU_LEEZA",
        "name": "Leeza",
        "russianName": "Лиза"
      },
      {
        "id": "DAIHATSU_MATERIA",
        "name": "Materia",
        "russianName": "Материя"
      },
      {
        "id": "DAIHATSU_MAX",
        "name": "MAX",
        "russianName": "МАКС"
      },
      {
        "id": "DAIHATSU_MEBIUS",
        "name": "Mebius",
        "russianName": "Мебиус"
      },
      {
        "id": "DAIHATSU_MIDGET_II",
        "name": "Midget",
        "russianName": "Миджет"
      },
      {
        "id": "DAIHATSU_MIRA",
        "name": "Mira",
        "russianName": "Мира"
      },
      {
        "id": "DAIHATSU_MIRA_COCOA",
        "name": "Mira Cocoa",
        "russianName": "Мира Кокоа"
      },
      {
        "id": "DAIHATSU_MIRA_E_S",
        "name": "Mira e:S",
        "russianName": "Мира е:С"
      },
      {
        "id": "DAIHATSU_MIRA_GINO",
        "name": "Mira Gino",
        "russianName": "мира джино"
      },
      {
        "id": "DAIHATSU_MIRA_TOCOT",
        "name": "Mira Tocot",
        "russianName": "Мира Токот"
      },
      {
        "id": "DAIHATSU_MOVE",
        "name": "Move",
        "russianName": "Мув"
      },
      {
        "id": "DAIHATSU_MOVE_CANBUS",
        "name": "Move Canbus",
        "russianName": "Мове Канбус"
      },
      {
        "id": "DAIHATSU_MOVE_CONTE",
        "name": "Move Conte",
        "russianName": "Мове Конте"
      },
      {
        "id": "DAIHATSU_MOVE_LATTE",
        "name": "Move Latte",
        "russianName": "мове латте"
      },
      {
        "id": "DAIHATSU_NAKED",
        "name": "Naked",
        "russianName": "нейкед"
      },
      {
        "id": "DAIHATSU_OPTI",
        "name": "Opti",
        "russianName": "Опти"
      },
      {
        "id": "DAIHATSU_PYZAR",
        "name": "Pyzar",
        "russianName": "Пизар"
      },
      {
        "id": "DAIHATSU_ROCKY",
        "name": "Rocky",
        "russianName": "Роки"
      },
      {
        "id": "DAIHATSU_RUGGER",
        "name": "Rugger",
        "russianName": "Раггер"
      },
      {
        "id": "DAIHATSU_SIRION",
        "name": "Sirion",
        "russianName": "Сирион"
      },
      {
        "id": "DAIHATSU_SONICA",
        "name": "Sonica",
        "russianName": "Соника"
      },
      {
        "id": "DAIHATSU_STORIA",
        "name": "Storia",
        "russianName": "Стория"
      },
      {
        "id": "DAIHATSU_TAFT",
        "name": "Taft",
        "russianName": "Тафт"
      },
      {
        "id": "DAIHATSU_TANTO",
        "name": "Tanto",
        "russianName": "Танто"
      },
      {
        "id": "DAIHATSU_TANTO_EXE",
        "name": "Tanto Exe",
        "russianName": "Танто Экзе"
      },
      {
        "id": "DAIHATSU_TERIOS",
        "name": "Terios",
        "russianName": "Териос"
      },
      {
        "id": "DAIHATSU_THOR",
        "name": "Thor",
        "russianName": "Тор"
      },
      {
        "id": "DAIHATSU_TREVIS",
        "name": "Trevis",
        "russianName": "Тревис"
      },
      {
        "id": "DAIHATSU_WAKE",
        "name": "Wake",
        "russianName": "Вэйк"
      },
      {
        "id": "DAIHATSU_WILDCAT",
        "name": "Wildcat",
        "russianName": "Вайлдкет"
      },
      {
        "id": "DAIHATSU_XENIA",
        "name": "Xenia",
        "russianName": "Ксения"
      },
      {
        "id": "DAIHATSU_YRV",
        "name": "YRV",
        "russianName": "ЮРВ"
      }
    ]
  },
  "DAIMLER": {
    "id": "DAIMLER",
    "name": "דיימלר",
    "russianName": "Даймлер",
    "models": [
      {
        "id": "DAIMLER_DS_420",
        "name": "DS420",
        "russianName": "дс420"
      },
      {
        "id": "DAIMLER_REGENCY",
        "name": "Regency",
        "russianName": "Редженси"
      },
      {
        "id": "DAIMLER_SOVEREIGN",
        "name": "Sovereign (XJ6)",
        "russianName": "соврин (хж6)"
      },
      {
        "id": "DAIMLER_SP250",
        "name": "SP250",
        "russianName": "сп250"
      },
      {
        "id": "DAIMLER_XJ40",
        "name": "XJ40",
        "russianName": "хж40"
      },
      {
        "id": "DAIMLER_XJS",
        "name": "XJS",
        "russianName": "хжс"
      },
      {
        "id": "DAIMLER_X_300",
        "name": "X300",
        "russianName": "х300"
      },
      {
        "id": "DAIMLER_X_308",
        "name": "X308",
        "russianName": "х308"
      },
      {
        "id": "DAIMLER_X_350",
        "name": "X350",
        "russianName": "х350"
      }
    ]
  },
  "DALLARA": {
    "id": "DALLARA",
    "name": "דלרה",
    "russianName": "Даллара",
    "models": [
      {
        "id": "DALLARA_STRADALE",
        "name": "Stradale",
        "russianName": "Страдале"
      }
    ]
  },
  "DATSUN": {
    "id": "DATSUN",
    "name": "דאטסון",
    "russianName": "Датсун",
    "models": [
      {
        "id": "DATSUN_200_220_260_280C",
        "name": "200/220/260/280C",
        "russianName": "200/220/260/280С"
      },
      {
        "id": "DATSUN_240Z",
        "name": "240Z",
        "russianName": "240з"
      },
      {
        "id": "DATSUN_280Z",
        "name": "280Z",
        "russianName": "280з"
      },
      {
        "id": "DATSUN_280ZX",
        "name": "280ZX",
        "russianName": "280зх"
      },
      {
        "id": "DATSUN_620",
        "name": "620",
        "russianName": "620"
      },
      {
        "id": "DATSUN_720",
        "name": "720",
        "russianName": "720"
      },
      {
        "id": "DATSUN_BLUEBIRD",
        "name": "Bluebird",
        "russianName": "Блюбёрд"
      },
      {
        "id": "DATSUN_CHERRY",
        "name": "Cherry",
        "russianName": "Черри"
      },
      {
        "id": "DATSUN_GO",
        "name": "GO",
        "russianName": "Го"
      },
      {
        "id": "DATSUN_GO_PLUS",
        "name": "GO+",
        "russianName": "Го+"
      },
      {
        "id": "DATSUN_LAUREL",
        "name": "Laurel",
        "russianName": "Лаурель"
      },
      {
        "id": "DATSUN_MI_DO",
        "name": "mi-DO",
        "russianName": "ми-ДО"
      },
      {
        "id": "DATSUN_ON_DO",
        "name": "on-DO",
        "russianName": "он-ДО"
      },
      {
        "id": "DATSUN_STANZA",
        "name": "Stanza",
        "russianName": "Станза"
      },
      {
        "id": "DATSUN_SUNNY",
        "name": "Sunny",
        "russianName": "Санни"
      },
      {
        "id": "DATSUN_URVAN",
        "name": "Urvan",
        "russianName": "урван"
      },
      {
        "id": "DATSUN_VIOLET",
        "name": "Violet",
        "russianName": "Виолет"
      }
    ]
  },
  "DAYUN": {
    "id": "DAYUN",
    "name": "דאיון",
    "russianName": "Даюн",
    "models": [
      {
        "id": "DAYUN_PICKUP",
        "name": "Pickup",
        "russianName": "Пикап"
      },
      {
        "id": "DAYUN_YUANZHI_M1",
        "name": "Yuanzhi M1",
        "russianName": "Юаньчжи М1"
      },
      {
        "id": "DAYUN_YUEHU",
        "name": "Yuehu",
        "russianName": "Юэху"
      }
    ]
  },
  "DECO_RIDES": {
    "id": "DECO_RIDES",
    "name": "דקו רידס",
    "russianName": "Деко Райдс",
    "models": [
      {
        "id": "DECO_RIDES_ZEPHYR",
        "name": "Zephyr",
        "russianName": "Зефир"
      }
    ]
  },
  "DELAGE": {
    "id": "DELAGE",
    "name": "דלאג'",
    "russianName": "Делаж",
    "models": [
      {
        "id": "DELAGE_D12",
        "name": "D12",
        "russianName": "Д12"
      },
      {
        "id": "DELAGE_D6",
        "name": "D6",
        "russianName": "Д6"
      },
      {
        "id": "DELAGE_DI",
        "name": "DI",
        "russianName": "ДИ"
      }
    ]
  },
  "DELOREAN": {
    "id": "DELOREAN",
    "name": "דלוריאן",
    "russianName": "ДеЛориан",
    "models": [
      {
        "id": "DELOREAN_DMC_12",
        "name": "DMC-12",
        "russianName": "дмс-12"
      }
    ]
  },
  "DENZA": {
    "id": "DENZA",
    "name": "דנזה",
    "russianName": "Денза",
    "models": [
      {
        "id": "DENZA_500",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "DENZA_D9",
        "name": "D9",
        "russianName": "Д9"
      },
      {
        "id": "DENZA_N7",
        "name": "N7",
        "russianName": "Н7"
      },
      {
        "id": "DENZA_N8",
        "name": "N8",
        "russianName": "Н8"
      },
      {
        "id": "DENZA_N8L",
        "name": "N8L",
        "russianName": "Н8Л"
      },
      {
        "id": "DENZA_N9",
        "name": "N9",
        "russianName": "Н9"
      },
      {
        "id": "DENZA_X",
        "name": "X",
        "russianName": "Икс"
      },
      {
        "id": "DENZA_Z9",
        "name": "Z9",
        "russianName": "З9"
      }
    ]
  },
  "DERWAYS": {
    "id": "DERWAYS",
    "name": "דרוייז",
    "russianName": "Дервейс",
    "models": [
      {
        "id": "DERWAYS_ANTELOPE",
        "name": "Antelope",
        "russianName": "Антилопа"
      },
      {
        "id": "DERWAYS_AURORA",
        "name": "Aurora",
        "russianName": "Аврора"
      },
      {
        "id": "DERWAYS_COWBOY",
        "name": "Cowboy",
        "russianName": "Ковбой"
      },
      {
        "id": "DERWAYS_LAND_CROWN",
        "name": "Land Crown",
        "russianName": "Ленд Краун"
      },
      {
        "id": "DERWAYS_PLUTUS",
        "name": "Plutus",
        "russianName": "Плутус"
      },
      {
        "id": "DERWAYS_SALADIN",
        "name": "Saladin",
        "russianName": "Саладин"
      },
      {
        "id": "DERWAYS_SHUTTLE",
        "name": "Shuttle",
        "russianName": "Шатл"
      }
    ]
  },
  "DESOTO": {
    "id": "DESOTO",
    "name": "דה סוטו",
    "russianName": "Десото",
    "models": [
      {
        "id": "DESOTO_CUSTOM",
        "name": "Custom",
        "russianName": "кастом"
      },
      {
        "id": "DESOTO_DELUXE",
        "name": "Deluxe",
        "russianName": "Делюкс"
      },
      {
        "id": "DESOTO_FIREDOME",
        "name": "Firedome",
        "russianName": "Файрдом"
      },
      {
        "id": "DESOTO_FIREFLITE",
        "name": "Fireflite",
        "russianName": "Файрфлит"
      }
    ]
  },
  "DE_TOMASO": {
    "id": "DE_TOMASO",
    "name": "דה טומאסו",
    "russianName": "Де Томазо",
    "models": [
      {
        "id": "DE_TOMASO_BIGUA",
        "name": "Bigua",
        "russianName": "бигуа"
      },
      {
        "id": "DE_TOMASO_GUARA",
        "name": "Guara",
        "russianName": "Гуара"
      },
      {
        "id": "DE_TOMASO_LONGCHAMP",
        "name": "Longchamp",
        "russianName": "Лоншан"
      },
      {
        "id": "DE_TOMASO_MANGUSTA",
        "name": "Mangusta",
        "russianName": "Мангуста"
      },
      {
        "id": "DE_TOMASO_PANTERA",
        "name": "Pantera",
        "russianName": "Пантера"
      },
      {
        "id": "DE_TOMASO_VALLELUNGA",
        "name": "Vallelunga",
        "russianName": "Валлелунга"
      }
    ]
  },
  "DKW": {
    "id": "DKW",
    "name": "ד.ק.וו",
    "russianName": "ДКВ",
    "models": [
      {
        "id": "DKW_3_6",
        "name": "3=6",
        "russianName": "3=6"
      }
    ]
  },
  "DODGE": {
    "id": "DODGE",
    "name": "דודג'",
    "russianName": "Додж",
    "models": [
      {
        "id": "DODGE_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "DODGE_ARIES",
        "name": "Aries",
        "russianName": "Ариес"
      },
      {
        "id": "DODGE_AVENGER",
        "name": "Avenger",
        "russianName": "Авенджер"
      },
      {
        "id": "DODGE_CALIBER",
        "name": "Caliber",
        "russianName": "Калибр"
      },
      {
        "id": "DODGE_CARAVAN",
        "name": "Caravan",
        "russianName": "Караван"
      },
      {
        "id": "DODGE_CHALLENGER",
        "name": "Challenger",
        "russianName": "Челленджер"
      },
      {
        "id": "DODGE_CHARGER",
        "name": "Charger",
        "russianName": "Чарджер"
      },
      {
        "id": "DODGE_CHARGER_DAYTONA",
        "name": "Charger Daytona",
        "russianName": "Чарджер Дайтона"
      },
      {
        "id": "DODGE_COLT",
        "name": "Colt",
        "russianName": "Кольт"
      },
      {
        "id": "DODGE_CORONET",
        "name": "Coronet",
        "russianName": "Коронет"
      },
      {
        "id": "DODGE_CUSTOM_ROYAL",
        "name": "Custom Royal",
        "russianName": "Кастом Роял"
      },
      {
        "id": "DODGE_D8",
        "name": "D8",
        "russianName": "Д8"
      },
      {
        "id": "DODGE_DAKOTA",
        "name": "Dakota",
        "russianName": "Дакота"
      },
      {
        "id": "DODGE_DART",
        "name": "Dart",
        "russianName": "дарт"
      },
      {
        "id": "DODGE_DAYTONA",
        "name": "Daytona",
        "russianName": "Дайтона"
      },
      {
        "id": "DODGE_DIPLOMAT",
        "name": "Diplomat",
        "russianName": "Дипломат"
      },
      {
        "id": "DODGE_DURANGO",
        "name": "Durango",
        "russianName": "Дуранго"
      },
      {
        "id": "DODGE_DW_SERIES",
        "name": "D/W Series",
        "russianName": "д/в серия"
      },
      {
        "id": "DODGE_DYNASTY",
        "name": "Dynasty",
        "russianName": "династия"
      },
      {
        "id": "DODGE_HORNET",
        "name": "Hornet",
        "russianName": "Хорнет"
      },
      {
        "id": "DODGE_INTREPID",
        "name": "Intrepid",
        "russianName": "Интерпид"
      },
      {
        "id": "DODGE_JOURNEY",
        "name": "Journey",
        "russianName": "Джорней"
      },
      {
        "id": "DODGE_LANCER",
        "name": "Lancer",
        "russianName": "Лансер"
      },
      {
        "id": "DODGE_MAGNUM",
        "name": "Magnum",
        "russianName": "Магнум"
      },
      {
        "id": "DODGE_MAYFAIR",
        "name": "Mayfair",
        "russianName": "майфер"
      },
      {
        "id": "DODGE_MONACO",
        "name": "Monaco",
        "russianName": "Монако"
      },
      {
        "id": "DODGE_NEON",
        "name": "Neon",
        "russianName": "Неон"
      },
      {
        "id": "DODGE_NITRO",
        "name": "Nitro",
        "russianName": "Нитро"
      },
      {
        "id": "DODGE_OMNI",
        "name": "Omni",
        "russianName": "Омни"
      },
      {
        "id": "DODGE_POLARA",
        "name": "Polara",
        "russianName": "Полара"
      },
      {
        "id": "DODGE_RAIDER",
        "name": "Raider",
        "russianName": "райдер"
      },
      {
        "id": "DODGE_RAM",
        "name": "RAM",
        "russianName": "РАМ"
      },
      {
        "id": "DODGE_RAMCHARGER",
        "name": "Ramcharger",
        "russianName": "Рамчарджер"
      },
      {
        "id": "DODGE_RAM_VAN",
        "name": "RAM Van",
        "russianName": "РАМ Ван"
      },
      {
        "id": "DODGE_SHADOW",
        "name": "Shadow",
        "russianName": "Шадоу"
      },
      {
        "id": "DODGE_SPIRIT",
        "name": "Spirit",
        "russianName": "Спирит"
      },
      {
        "id": "DODGE_STEALTH",
        "name": "Stealth",
        "russianName": "Стелс"
      },
      {
        "id": "DODGE_STRATUS",
        "name": "Stratus",
        "russianName": "Стратус"
      },
      {
        "id": "DODGE_SUPER_BEE",
        "name": "Super Bee",
        "russianName": "Супер Би"
      },
      {
        "id": "DODGE_VIPER",
        "name": "Viper",
        "russianName": "Вайпер"
      },
      {
        "id": "DODGE_WC",
        "name": "WC series",
        "russianName": "вс"
      }
    ]
  },
  "DONGFENG": {
    "id": "DONGFENG",
    "name": "דונגפנג",
    "russianName": "ДонгФенг",
    "models": [
      {
        "id": "DONGFENG_370",
        "name": "370",
        "russianName": "370"
      },
      {
        "id": "DONGFENG_580",
        "name": "580",
        "russianName": "580"
      },
      {
        "id": "DONGFENG_A30",
        "name": "A30",
        "russianName": "А30"
      },
      {
        "id": "DONGFENG_A9",
        "name": "A9",
        "russianName": "а9"
      },
      {
        "id": "DONGFENG_AEOLUS_E70",
        "name": "Aeolus E70",
        "russianName": "Аеолус Е70"
      },
      {
        "id": "DONGFENG_AEOLUS_HAOHAN",
        "name": "Aeolus Haohan",
        "russianName": "Аеолус Хаохан"
      },
      {
        "id": "DONGFENG_AEOLUS_HAOJI",
        "name": "Aeolus Haoji",
        "russianName": "Аеолус Хаоджи"
      },
      {
        "id": "DONGFENG_AEOLUS_L7",
        "name": "Aeolus L7",
        "russianName": "Аеолус Л7"
      },
      {
        "id": "DONGFENG_AEOLUS_YIXUAN",
        "name": "Aeolus Yixuan",
        "russianName": "Иэлес Исюань"
      },
      {
        "id": "DONGFENG_AEOLUS_YIXUAN_MAX",
        "name": "Aeolus Yixuan Max",
        "russianName": "Иэлес Исюань Макс"
      },
      {
        "id": "DONGFENG_AX4",
        "name": "AX4",
        "russianName": "АХ4"
      },
      {
        "id": "DONGFENG_AX7",
        "name": "AX7",
        "russianName": "АХ7"
      },
      {
        "id": "DONGFENG_BOX",
        "name": "Box",
        "russianName": "Бокс"
      },
      {
        "id": "DONGFENG_C36",
        "name": "C36",
        "russianName": "С36"
      },
      {
        "id": "DONGFENG_DF6",
        "name": "DF6",
        "russianName": "дф6"
      },
      {
        "id": "DONGFENG_DFSK_500",
        "name": "DFSK 500",
        "russianName": "ДФСК 500"
      },
      {
        "id": "DONGFENG_DFSK_IX5",
        "name": "DFSK ix5",
        "russianName": "ДФСК АйИкс5"
      },
      {
        "id": "DONGFENG_DFSK_IX7",
        "name": "DFSK ix7",
        "russianName": "ДФСК АйИкс7"
      },
      {
        "id": "DONGFENG_E11K",
        "name": "E11K",
        "russianName": "Е11К"
      },
      {
        "id": "DONGFENG_EC36",
        "name": "EC36",
        "russianName": "ЕС36"
      },
      {
        "id": "DONGFENG_FENGON_500",
        "name": "Fengon 500",
        "russianName": "Фенгон 500"
      },
      {
        "id": "DONGFENG_FENGON_560",
        "name": "Fengon 560",
        "russianName": "Фенгон 560"
      },
      {
        "id": "DONGFENG_FENGON_E5",
        "name": "Fengon E5",
        "russianName": "Фенгон Е5"
      },
      {
        "id": "DONGFENG_FENGON_IX5",
        "name": "Fengon ix5",
        "russianName": "Фенгон айикс5"
      },
      {
        "id": "DONGFENG_FENGON_IX7",
        "name": "Fengon ix7",
        "russianName": "Фенгон айикс7"
      },
      {
        "id": "DONGFENG_FUKANG_ES600",
        "name": "Fukang ES600",
        "russianName": "Фуканг ЕС600"
      },
      {
        "id": "DONGFENG_H30_CROSS",
        "name": "H30 Cross",
        "russianName": "Н30 Кросс"
      },
      {
        "id": "DONGFENG_HUGE",
        "name": "Huge",
        "russianName": "Хьюдж"
      },
      {
        "id": "DONGFENG_MAGE",
        "name": "Mage",
        "russianName": "Маге"
      },
      {
        "id": "DONGFENG_MENGSHI_800",
        "name": "Mengshi M-Hero 800",
        "russianName": "Менгши М-Хиро 800"
      },
      {
        "id": "DONGFENG_MENGSHI_817",
        "name": "Mengshi M-Hero 817",
        "russianName": "Менгши М-Хиро 817"
      },
      {
        "id": "DONGFENG_MENGSHI_917",
        "name": "Mengshi M-Hero 917",
        "russianName": "Менгши М-Хиро 917"
      },
      {
        "id": "DONGFENG_MPV",
        "name": "MPV",
        "russianName": "мпв"
      },
      {
        "id": "DONGFENG_NAMMI_01",
        "name": "Nammi 01",
        "russianName": "Намми 01"
      },
      {
        "id": "DONGFENG_NAMMI_06",
        "name": "Nammi 06",
        "russianName": "Намми 06"
      },
      {
        "id": "DONGFENG_NANO_EX1",
        "name": "Nano EX1",
        "russianName": "Нано Е-икс1"
      },
      {
        "id": "DONGFENG_OTING",
        "name": "Oting",
        "russianName": "Отинг"
      },
      {
        "id": "DONGFENG_PALADIN",
        "name": "Paladin",
        "russianName": "Паладин"
      },
      {
        "id": "DONGFENG_RICH",
        "name": "Rich",
        "russianName": "Рич"
      },
      {
        "id": "DONGFENG_RICH_7",
        "name": "Rich 7",
        "russianName": "Рич 7"
      },
      {
        "id": "DONGFENG_S30",
        "name": "S30",
        "russianName": "С30"
      },
      {
        "id": "DONGFENG_SHINE",
        "name": "Shine",
        "russianName": "Шайн"
      },
      {
        "id": "DONGFENG_SHINE_GS",
        "name": "Shine GS",
        "russianName": "Шайн ГС"
      },
      {
        "id": "DONGFENG_SHINE_MAX",
        "name": "Shine Max",
        "russianName": "Шайн Макс"
      },
      {
        "id": "DONGFENG_SKY_EV01",
        "name": "Sky EV01",
        "russianName": "Скай ЕВ01"
      },
      {
        "id": "DONGFENG_YIXUAN_GS",
        "name": "Aeolus Yixuan GS",
        "russianName": "Исюань ГС"
      },
      {
        "id": "DONGFENG_Z9",
        "name": "Z9",
        "russianName": "З9"
      }
    ]
  },
  "DONINVEST": {
    "id": "DONINVEST",
    "name": "דונינווסט",
    "russianName": "Донинвест",
    "models": [
      {
        "id": "DONINVEST_ASSOL",
        "name": "Assol",
        "russianName": "Ассоль"
      },
      {
        "id": "DONINVEST_KONDOR",
        "name": "Kondor",
        "russianName": "Кондор"
      },
      {
        "id": "DONINVEST_ORION",
        "name": "Orion",
        "russianName": "Орион"
      },
      {
        "id": "DONINVEST_ORION_M",
        "name": "Orion M",
        "russianName": "Орион М"
      }
    ]
  },
  "DONKERVOORT": {
    "id": "DONKERVOORT",
    "name": "דונקרוורט",
    "russianName": "Донкервурт",
    "models": [
      {
        "id": "DONKERVOORT_D8",
        "name": "D8",
        "russianName": "д8"
      },
      {
        "id": "DONKERVOORT_D8_COSWORTH",
        "name": "D8 Cosworth",
        "russianName": "д8 косворт"
      },
      {
        "id": "DONKERVOORT_D8_GT",
        "name": "D8 GT",
        "russianName": "Д8 ГТ"
      },
      {
        "id": "DONKERVOORT_D8_GTO",
        "name": "D8 GTO",
        "russianName": "д8 гто"
      },
      {
        "id": "DONKERVOORT_D8_ZETEC",
        "name": "D8 Zetec",
        "russianName": "д8 зетек"
      },
      {
        "id": "DONKERVOORT_F22",
        "name": "F22",
        "russianName": "Ф22"
      }
    ]
  },
  "DR": {
    "id": "DR",
    "name": "ד.ר",
    "russianName": "Дэ Эр",
    "models": [
      {
        "id": "DR_1_0",
        "name": "1.0",
        "russianName": "1.0"
      },
      {
        "id": "DR_3_0",
        "name": "3.0",
        "russianName": "Три Ноль"
      },
      {
        "id": "DR_5_0",
        "name": "5.0",
        "russianName": "Пять Ноль"
      },
      {
        "id": "DR_6_0",
        "name": "6.0",
        "russianName": "Шесть Ноль"
      },
      {
        "id": "DR_7_0",
        "name": "7.0",
        "russianName": "Семь Ноль"
      },
      {
        "id": "DR_PK8",
        "name": "PK8",
        "russianName": "ПК8"
      }
    ]
  },
  "DS": {
    "id": "DS",
    "name": "ד.ס",
    "russianName": "ДС",
    "models": [
      {
        "id": "DS_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "DS_3_CROSSBACK",
        "name": "3 Crossback",
        "russianName": "3 Кроссбэк"
      },
      {
        "id": "DS_4",
        "name": "4",
        "russianName": "4"
      },
      {
        "id": "DS_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "DS_7_CROSSBACK",
        "name": "7 Crossback",
        "russianName": "7 Кроссбэк"
      },
      {
        "id": "DS_9",
        "name": "9",
        "russianName": "9"
      },
      {
        "id": "DS_NO4",
        "name": "No4",
        "russianName": "Номер 4"
      },
      {
        "id": "DS_NO8",
        "name": "No8",
        "russianName": "Н8"
      }
    ]
  },
  "DW_HOWER": {
    "id": "DW_HOWER",
    "name": "ד.וו האוור",
    "russianName": "ДВ Ховер",
    "models": [
      {
        "id": "DW_HOWER_H3",
        "name": "H3",
        "russianName": "Х3"
      },
      {
        "id": "DW_HOWER_H5",
        "name": "H5",
        "russianName": "н5"
      }
    ]
  },
  "EAGLE": {
    "id": "EAGLE",
    "name": "איגל",
    "russianName": "Игл",
    "models": [
      {
        "id": "EAGLE_PREMIER",
        "name": "Premier",
        "russianName": "Премьер"
      },
      {
        "id": "EAGLE_SUMMIT",
        "name": "Summit",
        "russianName": "Саммит"
      },
      {
        "id": "EAGLE_TALON",
        "name": "Talon",
        "russianName": "Тэлон"
      },
      {
        "id": "EAGLE_VISION",
        "name": "Vision",
        "russianName": "Вижн"
      },
      {
        "id": "EAGLE_VISTA",
        "name": "Vista",
        "russianName": "Виста"
      }
    ]
  },
  "EAGLE_CARS": {
    "id": "EAGLE_CARS",
    "name": "איגל קארס",
    "russianName": "Игл Карс",
    "models": [
      {
        "id": "EAGLE_CARS_SS",
        "name": "SS",
        "russianName": "СС"
      }
    ]
  },
  "ENOVATE": {
    "id": "ENOVATE",
    "name": "אנובט (אנורב)",
    "russianName": "Эновате",
    "models": [
      {
        "id": "ENOVATE_ME5",
        "name": "ME5",
        "russianName": "МЕ5"
      },
      {
        "id": "ENOVATE_ME7",
        "name": "ME7",
        "russianName": "ме7"
      }
    ]
  },
  "EONYX": {
    "id": "EONYX",
    "name": "אוניקס",
    "russianName": "Еоникс",
    "models": [
      {
        "id": "EONYX_M2",
        "name": "M2",
        "russianName": "М2"
      }
    ]
  },
  "EVERUS": {
    "id": "EVERUS",
    "name": "אוורוס",
    "russianName": "Эверус",
    "models": [
      {
        "id": "EVERUS_VE_1",
        "name": "VE-1",
        "russianName": "ВЕ-1"
      }
    ]
  },
  "EVOLUTE": {
    "id": "EVOLUTE",
    "name": "Evolute",
    "russianName": "Эволют",
    "models": [
      {
        "id": "EVOLUTE_I_JET",
        "name": "i-JET",
        "russianName": "ай-ДЖЕТ"
      },
      {
        "id": "EVOLUTE_I_JOY",
        "name": "i-JOY",
        "russianName": "ай-ДЖОЙ"
      },
      {
        "id": "EVOLUTE_I_PRO",
        "name": "i-PRO",
        "russianName": "ай-ПРО"
      },
      {
        "id": "EVOLUTE_I_SKY",
        "name": "i-SKY",
        "russianName": "АйСкай"
      },
      {
        "id": "EVOLUTE_I_SPACE",
        "name": "i-SPACE",
        "russianName": "ай-Спэйс"
      },
      {
        "id": "EVOLUTE_I_VAN",
        "name": "i-VAN",
        "russianName": "ай-ВЭН"
      }
    ]
  },
  "EXCALIBUR": {
    "id": "EXCALIBUR",
    "name": "Excalibur",
    "russianName": "Экскалибур",
    "models": [
      {
        "id": "EXCALIBUR_SERIES_IV",
        "name": "Series IV",
        "russianName": "серия 4"
      },
      {
        "id": "EXCALIBUR_SERIES_V",
        "name": "Series V",
        "russianName": "серия 5"
      }
    ]
  },
  "E_CAR": {
    "id": "E_CAR",
    "name": "א.קר",
    "russianName": "Е-Кар",
    "models": [
      {
        "id": "E_CAR_GD04B",
        "name": "GD04B",
        "russianName": "гд04б"
      }
    ]
  },
  "E_MOBIL": {
    "id": "E_MOBIL",
    "name": "Ё-мобиль",
    "russianName": "Ё-мобиль",
    "models": [
      {
        "id": "E_MOBIL_E_CROSSOVER",
        "name": "Ё-Кроссовер",
        "russianName": "Ё-Кроссовер"
      }
    ]
  },
  "FACEL_VEGA": {
    "id": "FACEL_VEGA",
    "name": "Facel Vega",
    "russianName": "Фэйсл Вега",
    "models": [
      {
        "id": "FACEL_VEGA_FV",
        "name": "FV",
        "russianName": "ФВ"
      }
    ]
  },
  "FAW": {
    "id": "FAW",
    "name": "FAW",
    "russianName": "ФАВ",
    "models": [
      {
        "id": "FAW_BESTUNE_B70",
        "name": "Bestune B70",
        "russianName": "Бестюн Б70"
      },
      {
        "id": "FAW_BESTUNE_B70S",
        "name": "Bestune B70S",
        "russianName": "Бестюн Б70С"
      },
      {
        "id": "FAW_BESTUNE_M9",
        "name": "Bestune M9",
        "russianName": "Бестун М9"
      },
      {
        "id": "FAW_BESTUNE_NAT",
        "name": "Bestune NAT",
        "russianName": "Бестюн НАТ"
      },
      {
        "id": "FAW_BESTUNE_PONY",
        "name": "Bestune Pony",
        "russianName": "Бестюн Пони"
      },
      {
        "id": "FAW_BESTUNE_T33",
        "name": "Bestune T33",
        "russianName": "Бестюн Т33"
      },
      {
        "id": "FAW_BESTUNE_T55",
        "name": "Bestune T55",
        "russianName": "Бестюн Т55"
      },
      {
        "id": "FAW_BESTUNE_T77",
        "name": "Bestune T77",
        "russianName": "Бестюн Т77"
      },
      {
        "id": "FAW_BESTUNE_T90",
        "name": "Bestune T90",
        "russianName": "Бестюн Т90"
      },
      {
        "id": "FAW_BESTUNE_T99",
        "name": "Bestune T99",
        "russianName": "Бестюн Т99"
      },
      {
        "id": "FAW_BESTUNE_YUEYI_03",
        "name": "Bestune Yueyi 03",
        "russianName": "Бестюн юи 03"
      },
      {
        "id": "FAW_BESTUNE_YUEYI_07",
        "name": "Bestune Yueyi 07",
        "russianName": "Бестюн юи 07"
      },
      {
        "id": "FAW_BESTURN_B30",
        "name": "Besturn B30",
        "russianName": "Бестёрн Б30"
      },
      {
        "id": "FAW_BESTURN_B50",
        "name": "Besturn B50",
        "russianName": "Бестёрн Б50"
      },
      {
        "id": "FAW_BESTURN_B70",
        "name": "Besturn B70",
        "russianName": "Бестёрн Б70"
      },
      {
        "id": "FAW_BESTURN_X40",
        "name": "Besturn X40",
        "russianName": "Бестурн Х40"
      },
      {
        "id": "FAW_CA6420",
        "name": "CA6420",
        "russianName": "ЦА6420"
      },
      {
        "id": "FAW_D60",
        "name": "D60",
        "russianName": "Д60"
      },
      {
        "id": "FAW_JINN",
        "name": "Jinn",
        "russianName": "Джин"
      },
      {
        "id": "FAW_OLEY",
        "name": "Oley",
        "russianName": "Оли"
      },
      {
        "id": "FAW_V2",
        "name": "V2",
        "russianName": "в2"
      },
      {
        "id": "FAW_V5",
        "name": "V5",
        "russianName": "в5"
      },
      {
        "id": "FAW_VITA",
        "name": "Vita",
        "russianName": "вита"
      },
      {
        "id": "FAW_X80",
        "name": "Besturn X80",
        "russianName": "Бестёрн Икс80"
      }
    ]
  },
  "FERRARI": {
    "id": "FERRARI",
    "name": "פרארי",
    "russianName": "Феррари",
    "models": [
      {
        "id": "FERRARI_12CILINDRI",
        "name": "12Cilindri",
        "russianName": "12Цилиндри"
      },
      {
        "id": "FERRARI_208_308",
        "name": "208/308",
        "russianName": "208/308"
      },
      {
        "id": "FERRARI_250_GTO",
        "name": "250 GTO",
        "russianName": "250 гто"
      },
      {
        "id": "FERRARI_250_GT_BERLINETTA",
        "name": "250 GT Berlinetta",
        "russianName": "250 ГТ Берлинетта"
      },
      {
        "id": "FERRARI_288_GTO",
        "name": "288 GTO",
        "russianName": "288 гто"
      },
      {
        "id": "FERRARI_296_GTB",
        "name": "296",
        "russianName": "296"
      },
      {
        "id": "FERRARI_328",
        "name": "328",
        "russianName": "328"
      },
      {
        "id": "FERRARI_348",
        "name": "348",
        "russianName": "348"
      },
      {
        "id": "FERRARI_360_MODENA",
        "name": "360",
        "russianName": "360"
      },
      {
        "id": "FERRARI_365_GTC",
        "name": "365 GTC",
        "russianName": "365 гтс"
      },
      {
        "id": "FERRARI_400",
        "name": "400",
        "russianName": "400"
      },
      {
        "id": "FERRARI_412",
        "name": "412",
        "russianName": "412"
      },
      {
        "id": "FERRARI_456",
        "name": "456",
        "russianName": "456"
      },
      {
        "id": "FERRARI_458_ITALIA",
        "name": "458",
        "russianName": "458"
      },
      {
        "id": "FERRARI_488",
        "name": "488",
        "russianName": "488"
      },
      {
        "id": "FERRARI_512M",
        "name": "512 M",
        "russianName": "512 М"
      },
      {
        "id": "FERRARI_512_BB",
        "name": "512 BB",
        "russianName": "512 бб"
      },
      {
        "id": "FERRARI_512_TR",
        "name": "512 TR",
        "russianName": "512 тр"
      },
      {
        "id": "FERRARI_550",
        "name": "550",
        "russianName": "550"
      },
      {
        "id": "FERRARI_575_MARANELLO",
        "name": "575M",
        "russianName": "575М"
      },
      {
        "id": "FERRARI_599",
        "name": "599",
        "russianName": "599"
      },
      {
        "id": "FERRARI_612_SCAGLIETTI",
        "name": "612",
        "russianName": "612"
      },
      {
        "id": "FERRARI_812_SUPERFAST",
        "name": "812",
        "russianName": "812"
      },
      {
        "id": "FERRARI_849_TESTAROSSA",
        "name": "849 Testarossa",
        "russianName": "849 Теста Росса"
      },
      {
        "id": "FERRARI_AMALFI",
        "name": "Amalfi",
        "russianName": "Амалфи"
      },
      {
        "id": "FERRARI_CALIFORNIA",
        "name": "California",
        "russianName": "калифорния"
      },
      {
        "id": "FERRARI_DAYTONA_SP3",
        "name": "Daytona SP3",
        "russianName": "Дайтона СП3"
      },
      {
        "id": "FERRARI_DINO_206_GT",
        "name": "Dino 206 GT",
        "russianName": "Дино 206 ГТ"
      },
      {
        "id": "FERRARI_DINO_208_308_GT4",
        "name": "Dino 208/308 GT4",
        "russianName": "Дино 208/308 джити"
      },
      {
        "id": "FERRARI_DINO_246_GT",
        "name": "Dino 246 GT",
        "russianName": "Дино 246 ГТ"
      },
      {
        "id": "FERRARI_ENZO",
        "name": "Enzo",
        "russianName": "Энцо"
      },
      {
        "id": "FERRARI_F12",
        "name": "F12",
        "russianName": "Ф12"
      },
      {
        "id": "FERRARI_F355",
        "name": "F355",
        "russianName": "ф355"
      },
      {
        "id": "FERRARI_F40",
        "name": "F40",
        "russianName": "ф40"
      },
      {
        "id": "FERRARI_F430",
        "name": "F430",
        "russianName": "ф430"
      },
      {
        "id": "FERRARI_F50",
        "name": "F50",
        "russianName": "ф50"
      },
      {
        "id": "FERRARI_F80",
        "name": "F80",
        "russianName": "Ф80"
      },
      {
        "id": "FERRARI_F8_TRIBUTO",
        "name": "F8",
        "russianName": "Ф8"
      },
      {
        "id": "FERRARI_FF",
        "name": "FF",
        "russianName": "фф"
      },
      {
        "id": "FERRARI_FXX_K",
        "name": "FXX K",
        "russianName": "фхх к"
      },
      {
        "id": "FERRARI_GTC4LUSSO",
        "name": "GTC4Lusso",
        "russianName": "гтц4люссо"
      },
      {
        "id": "FERRARI_LAFERRARI",
        "name": "LaFerrari",
        "russianName": "ЛаФеррари"
      },
      {
        "id": "FERRARI_MONDIAL",
        "name": "Mondial",
        "russianName": "Мондиаль"
      },
      {
        "id": "FERRARI_MONZA_SP",
        "name": "Monza SP",
        "russianName": "Монза СП"
      },
      {
        "id": "FERRARI_PORTOFINO",
        "name": "Portofino",
        "russianName": "Портофино"
      },
      {
        "id": "FERRARI_PUROSANGUE",
        "name": "Purosangue",
        "russianName": "Пуросанг"
      },
      {
        "id": "FERRARI_ROMA",
        "name": "Roma",
        "russianName": "Рома"
      },
      {
        "id": "FERRARI_SC40",
        "name": "SC40",
        "russianName": "Эс Си 40"
      },
      {
        "id": "FERRARI_SF90_STRADALE",
        "name": "SF90",
        "russianName": "СФ90 Штрадале"
      },
      {
        "id": "FERRARI_TESTAROSSA",
        "name": "Testarossa",
        "russianName": "Теста Росса"
      }
    ]
  },
  "FIAT": {
    "id": "FIAT",
    "name": "פיאט",
    "russianName": "Фиат",
    "models": [
      {
        "id": "FIAT_1100",
        "name": "1100",
        "russianName": "1100"
      },
      {
        "id": "FIAT_124",
        "name": "124",
        "russianName": "124"
      },
      {
        "id": "FIAT_124_SPIDER",
        "name": "124 Spider",
        "russianName": "124 спайдер"
      },
      {
        "id": "FIAT_124_SPORT_SPIDER",
        "name": "124 Sport ספיידר",
        "russianName": "124 Спорт Спайдер"
      },
      {
        "id": "FIAT_125",
        "name": "125",
        "russianName": "125"
      },
      {
        "id": "FIAT_126",
        "name": "126",
        "russianName": "126"
      },
      {
        "id": "FIAT_127",
        "name": "127",
        "russianName": "127"
      },
      {
        "id": "FIAT_128",
        "name": "128",
        "russianName": "128"
      },
      {
        "id": "FIAT_130",
        "name": "130",
        "russianName": "130"
      },
      {
        "id": "FIAT_131",
        "name": "131",
        "russianName": "131"
      },
      {
        "id": "FIAT_132",
        "name": "132",
        "russianName": "132"
      },
      {
        "id": "FIAT_1500",
        "name": "1500",
        "russianName": "1500"
      },
      {
        "id": "FIAT_2300",
        "name": "2300",
        "russianName": "2300"
      },
      {
        "id": "FIAT_238",
        "name": "238",
        "russianName": "238"
      },
      {
        "id": "FIAT_500",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "FIAT_500L",
        "name": "500L",
        "russianName": "500Л"
      },
      {
        "id": "FIAT_500X",
        "name": "500X",
        "russianName": "500Х"
      },
      {
        "id": "FIAT_508",
        "name": "508",
        "russianName": "508"
      },
      {
        "id": "FIAT_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "FIAT_600E",
        "name": "600e",
        "russianName": "600е"
      },
      {
        "id": "FIAT_850",
        "name": "850",
        "russianName": "850"
      },
      {
        "id": "FIAT_900T",
        "name": "900T",
        "russianName": "900т"
      },
      {
        "id": "FIAT_ALBEA",
        "name": "Albea",
        "russianName": "Альбеа"
      },
      {
        "id": "FIAT_ARGENTA",
        "name": "Argenta",
        "russianName": "Аргента"
      },
      {
        "id": "FIAT_BARCHETTA",
        "name": "Barchetta",
        "russianName": "Барчетта"
      },
      {
        "id": "FIAT_BRAVA",
        "name": "Brava",
        "russianName": "Брава"
      },
      {
        "id": "FIAT_BRAVO",
        "name": "Bravo",
        "russianName": "Браво"
      },
      {
        "id": "FIAT_CINQUECENTO",
        "name": "Cinquecento",
        "russianName": "Чинквеченто"
      },
      {
        "id": "FIAT_COUPE",
        "name": "Coupe",
        "russianName": "Купе"
      },
      {
        "id": "FIAT_CROMA",
        "name": "Croma",
        "russianName": "Крома"
      },
      {
        "id": "FIAT_DOBLO",
        "name": "Doblo",
        "russianName": "Добло"
      },
      {
        "id": "FIAT_DUNA",
        "name": "Duna",
        "russianName": "Дюна"
      },
      {
        "id": "FIAT_EGEA",
        "name": "Egea",
        "russianName": "Егеа"
      },
      {
        "id": "FIAT_FIORINO",
        "name": "Fiorino",
        "russianName": "Фиорино"
      },
      {
        "id": "FIAT_FREEMONT",
        "name": "Freemont",
        "russianName": "Фримонт"
      },
      {
        "id": "FIAT_FULLBACK",
        "name": "Fullback",
        "russianName": "Фулбек"
      },
      {
        "id": "FIAT_GRANDE_PANDA",
        "name": "Grande Panda",
        "russianName": "Гранд Панда"
      },
      {
        "id": "FIAT_IDEA",
        "name": "Idea",
        "russianName": "Идеа"
      },
      {
        "id": "FIAT_LINEA",
        "name": "Linea",
        "russianName": "Линеа"
      },
      {
        "id": "FIAT_MAREA",
        "name": "Marea",
        "russianName": "Мареа"
      },
      {
        "id": "FIAT_MULTIPLA",
        "name": "Multipla",
        "russianName": "Мультипла"
      },
      {
        "id": "FIAT_PALIO",
        "name": "Palio",
        "russianName": "Палио"
      },
      {
        "id": "FIAT_PANDA",
        "name": "Panda",
        "russianName": "Панда"
      },
      {
        "id": "FIAT_PUNTO",
        "name": "Punto",
        "russianName": "Пунто"
      },
      {
        "id": "FIAT_QUBO",
        "name": "Qubo",
        "russianName": "Кубо"
      },
      {
        "id": "FIAT_REGATA",
        "name": "Regata",
        "russianName": "Регата"
      },
      {
        "id": "FIAT_RITMO",
        "name": "Ritmo",
        "russianName": "Ритмо"
      },
      {
        "id": "FIAT_SCUDO",
        "name": "Scudo",
        "russianName": "Скудо"
      },
      {
        "id": "FIAT_SEDICI",
        "name": "Sedici",
        "russianName": "Седичи"
      },
      {
        "id": "FIAT_SEICENTO",
        "name": "Seicento",
        "russianName": "Сейеченто"
      },
      {
        "id": "FIAT_SIENA",
        "name": "Siena",
        "russianName": "Сиена"
      },
      {
        "id": "FIAT_STILO",
        "name": "Stilo",
        "russianName": "Стило"
      },
      {
        "id": "FIAT_STRADA",
        "name": "Strada",
        "russianName": "Страда"
      },
      {
        "id": "FIAT_TEMPRA",
        "name": "Tempra",
        "russianName": "Темпра"
      },
      {
        "id": "FIAT_TIPO",
        "name": "Tipo",
        "russianName": "Типо"
      },
      {
        "id": "FIAT_TOPOLINO",
        "name": "Topolino",
        "russianName": "Тополино"
      },
      {
        "id": "FIAT_ULYSSE",
        "name": "Ulysse",
        "russianName": "Улисс"
      },
      {
        "id": "FIAT_UNO",
        "name": "Uno",
        "russianName": "Уно"
      },
      {
        "id": "FIAT_X_1_9",
        "name": "X 1/9",
        "russianName": "X 1/9"
      }
    ]
  },
  "FISKER": {
    "id": "FISKER",
    "name": "Fisker",
    "russianName": "Фискер",
    "models": [
      {
        "id": "FISKER_KARMA",
        "name": "Karma",
        "russianName": "Карма"
      },
      {
        "id": "FISKER_OCEAN",
        "name": "Ocean",
        "russianName": "Океан"
      }
    ]
  },
  "FLANKER": {
    "id": "FLANKER",
    "name": "Flanker",
    "russianName": "Фланкер",
    "models": [
      {
        "id": "FLANKER_F",
        "name": "F",
        "russianName": "Ф"
      }
    ]
  },
  "FORD": {
    "id": "FORD",
    "name": "פורד",
    "russianName": "Форд",
    "models": [
      {
        "id": "FORD_300",
        "name": "300",
        "russianName": "300"
      },
      {
        "id": "FORD_AEROSTAR",
        "name": "Aerostar",
        "russianName": "Аэростар"
      },
      {
        "id": "FORD_ANGLIA",
        "name": "Anglia",
        "russianName": "Англиа"
      },
      {
        "id": "FORD_ASPIRE",
        "name": "Aspire",
        "russianName": "Эспайр"
      },
      {
        "id": "FORD_BRONCO",
        "name": "Bronco",
        "russianName": "Бронко"
      },
      {
        "id": "FORD_BRONCO_II",
        "name": "Bronco-II",
        "russianName": "Бронко-2"
      },
      {
        "id": "FORD_BRONCO_SPORT",
        "name": "Bronco Sport",
        "russianName": "Бронко Спорт"
      },
      {
        "id": "FORD_B_MAX",
        "name": "B-MAX",
        "russianName": "Б-МАКС"
      },
      {
        "id": "FORD_CAPRI",
        "name": "Capri",
        "russianName": "Капри"
      },
      {
        "id": "FORD_CONSUL",
        "name": "Consul",
        "russianName": "Консул"
      },
      {
        "id": "FORD_CONTOUR",
        "name": "Contour",
        "russianName": "Контур"
      },
      {
        "id": "FORD_CORTINA",
        "name": "Cortina",
        "russianName": "Кортина"
      },
      {
        "id": "FORD_COUGAR",
        "name": "Cougar",
        "russianName": "Кугар"
      },
      {
        "id": "FORD_COUNTRY_SQUIRE",
        "name": "Country Squire",
        "russianName": "Кантри Сквайр"
      },
      {
        "id": "FORD_CRESTLINE",
        "name": "Crestline",
        "russianName": "Крестлайн"
      },
      {
        "id": "FORD_CROWN_VICTORIA",
        "name": "Crown Victoria",
        "russianName": "Краун Виктория"
      },
      {
        "id": "FORD_CUSTOM",
        "name": "Custom",
        "russianName": "Кастом"
      },
      {
        "id": "FORD_C_MAX",
        "name": "C-MAX",
        "russianName": "C-MAX"
      },
      {
        "id": "FORD_ECONOLINE",
        "name": "Econoline",
        "russianName": "Эконолайн"
      },
      {
        "id": "FORD_ECONOVAN",
        "name": "Econovan",
        "russianName": "Эконован"
      },
      {
        "id": "FORD_ECOSPORT",
        "name": "EcoSport",
        "russianName": "ЭкоСпорт"
      },
      {
        "id": "FORD_EDGE",
        "name": "Edge",
        "russianName": "Эйдж"
      },
      {
        "id": "FORD_EQUATOR",
        "name": "Equator",
        "russianName": "Экватор"
      },
      {
        "id": "FORD_EQUATOR_SPORT",
        "name": "Equator Sport",
        "russianName": "Экватор Спорт"
      },
      {
        "id": "FORD_ESCAPE",
        "name": "Escape",
        "russianName": "Эскейп"
      },
      {
        "id": "FORD_ESCORT",
        "name": "Escort",
        "russianName": "Эскорт"
      },
      {
        "id": "FORD_ESCORT_NA",
        "name": "Escort (North America)",
        "russianName": "Эскорт"
      },
      {
        "id": "FORD_EVEREST",
        "name": "Everest",
        "russianName": "Эверест"
      },
      {
        "id": "FORD_EVOS",
        "name": "Evos",
        "russianName": "Эвос"
      },
      {
        "id": "FORD_EXCURSION",
        "name": "Excursion",
        "russianName": "Экскьюршн"
      },
      {
        "id": "FORD_EXPEDITION",
        "name": "Expedition",
        "russianName": "Экспедишн"
      },
      {
        "id": "FORD_EXPLORER",
        "name": "Explorer",
        "russianName": "Эксплорер"
      },
      {
        "id": "FORD_EXPLORER_EV",
        "name": "Explorer EV",
        "russianName": "Эксплорер Эв"
      },
      {
        "id": "FORD_EXPLORER_SPORT_TRAC",
        "name": "Explorer Sport Trac",
        "russianName": "Эксплорер Спорт Трак"
      },
      {
        "id": "FORD_FAIRLANE",
        "name": "Fairlane",
        "russianName": "Фейрлайн"
      },
      {
        "id": "FORD_FAIRMONT",
        "name": "Fairmont",
        "russianName": "Фейрмонт"
      },
      {
        "id": "FORD_FALCON",
        "name": "Falcon",
        "russianName": "Фалкон"
      },
      {
        "id": "FORD_FESTIVA",
        "name": "Festiva",
        "russianName": "Фестива"
      },
      {
        "id": "FORD_FIESTA",
        "name": "Fiesta",
        "russianName": "Фиеста"
      },
      {
        "id": "FORD_FIESTA_ST",
        "name": "Fiesta ST",
        "russianName": "Фиеста СТ"
      },
      {
        "id": "FORD_FIGO",
        "name": "Figo",
        "russianName": "Фиго"
      },
      {
        "id": "FORD_FIVE_HUNDRED",
        "name": "Five Hundred",
        "russianName": "файв хандред"
      },
      {
        "id": "FORD_FLEX",
        "name": "Flex",
        "russianName": "Флекс"
      },
      {
        "id": "FORD_FOCUS",
        "name": "Focus",
        "russianName": "Фокус"
      },
      {
        "id": "FORD_FOCUS_RS",
        "name": "Focus RS",
        "russianName": "Фокус РС"
      },
      {
        "id": "FORD_FOCUS_ST",
        "name": "Focus ST",
        "russianName": "Фокус СТ"
      },
      {
        "id": "FORD_FREDA",
        "name": "Freda",
        "russianName": "фреда"
      },
      {
        "id": "FORD_FREESTAR",
        "name": "Freestar",
        "russianName": "Фристар"
      },
      {
        "id": "FORD_FREESTYLE",
        "name": "Freestyle",
        "russianName": "Фристайл"
      },
      {
        "id": "FORD_FUSION",
        "name": "Fusion",
        "russianName": "Фьюжн"
      },
      {
        "id": "FORD_FUSION_NA",
        "name": "Fusion (North America)",
        "russianName": "фьюжн (северная америка)"
      },
      {
        "id": "FORD_F_100",
        "name": "F-100",
        "russianName": "F-100"
      },
      {
        "id": "FORD_F_150",
        "name": "F-150",
        "russianName": "F-150"
      },
      {
        "id": "FORD_F_2",
        "name": "F-2",
        "russianName": "Ф-2"
      },
      {
        "id": "FORD_GALAXIE",
        "name": "Galaxie",
        "russianName": "Гэлаксье"
      },
      {
        "id": "FORD_GALAXY",
        "name": "Galaxy",
        "russianName": "Гэлакси"
      },
      {
        "id": "FORD_GPA",
        "name": "GPA",
        "russianName": "ГПА"
      },
      {
        "id": "FORD_GRANADA",
        "name": "Granada",
        "russianName": "Гранада"
      },
      {
        "id": "FORD_GRANADA_NA",
        "name": "Granada (North America)",
        "russianName": "Гранада"
      },
      {
        "id": "FORD_GT",
        "name": "GT",
        "russianName": "GT"
      },
      {
        "id": "FORD_GT40",
        "name": "GT40",
        "russianName": "GT40"
      },
      {
        "id": "FORD_IKON",
        "name": "Ikon",
        "russianName": "икон"
      },
      {
        "id": "FORD_IXION",
        "name": "Ixion",
        "russianName": "Иксион"
      },
      {
        "id": "FORD_KA",
        "name": "KA",
        "russianName": "Ка"
      },
      {
        "id": "FORD_KUGA",
        "name": "Kuga",
        "russianName": "Куга"
      },
      {
        "id": "FORD_LASER",
        "name": "Laser",
        "russianName": "Лазер"
      },
      {
        "id": "FORD_LTD",
        "name": "LTD",
        "russianName": "ЛТД"
      },
      {
        "id": "FORD_LTD_COUNTRY_SQUIRE",
        "name": "LTD Country Squire",
        "russianName": "ЛТД Кантри Сквайр"
      },
      {
        "id": "FORD_LTD_CROWN_VICTORIA",
        "name": "LTD Crown Victoria",
        "russianName": "LTD Краун Виктория"
      },
      {
        "id": "FORD_M151",
        "name": "M151",
        "russianName": "М151"
      },
      {
        "id": "FORD_MAINLINE",
        "name": "Mainline",
        "russianName": "Майнлайн"
      },
      {
        "id": "FORD_MAVERICK",
        "name": "Maverick",
        "russianName": "Маверик"
      },
      {
        "id": "FORD_MODEL_A",
        "name": "Model A",
        "russianName": "Модель А"
      },
      {
        "id": "FORD_MODEL_T",
        "name": "Model T",
        "russianName": "Модель Т"
      },
      {
        "id": "FORD_MONDEO",
        "name": "Mondeo",
        "russianName": "Мондео"
      },
      {
        "id": "FORD_MONDEO_ST",
        "name": "Mondeo ST",
        "russianName": "Мондео СТ"
      },
      {
        "id": "FORD_MUSTANG",
        "name": "Mustang",
        "russianName": "Мустанг"
      },
      {
        "id": "FORD_MUSTANG_MACH_E",
        "name": "Mustang Mach-E",
        "russianName": "Мустанг Мач-Е"
      },
      {
        "id": "FORD_ORION",
        "name": "Orion",
        "russianName": "Орион"
      },
      {
        "id": "FORD_PROBE",
        "name": "Probe",
        "russianName": "Проб"
      },
      {
        "id": "FORD_PUMA",
        "name": "Puma",
        "russianName": "Пума"
      },
      {
        "id": "FORD_PUMA_ST",
        "name": "Puma ST",
        "russianName": "Пума СТ"
      },
      {
        "id": "FORD_RANCHERO",
        "name": "Ranchero",
        "russianName": "Ранчеро"
      },
      {
        "id": "FORD_RANGER",
        "name": "Ranger",
        "russianName": "Рейнджер"
      },
      {
        "id": "FORD_RANGER_NA",
        "name": "Ranger (North America)",
        "russianName": "Рейнджер"
      },
      {
        "id": "FORD_SCORPIO",
        "name": "Scorpio",
        "russianName": "Скорпио"
      },
      {
        "id": "FORD_SIERRA",
        "name": "Sierra",
        "russianName": "Сиерра"
      },
      {
        "id": "FORD_SPECTRON",
        "name": "Spectron",
        "russianName": "спектрон"
      },
      {
        "id": "FORD_S_MAX",
        "name": "S-MAX",
        "russianName": "S-MAX"
      },
      {
        "id": "FORD_TAUNUS",
        "name": "Taunus",
        "russianName": "Таунус"
      },
      {
        "id": "FORD_TAURUS",
        "name": "Taurus",
        "russianName": "Таурус"
      },
      {
        "id": "FORD_TAURUS_X",
        "name": "Taurus X",
        "russianName": "Таурус X"
      },
      {
        "id": "FORD_TELSTAR",
        "name": "Telstar",
        "russianName": "тельстар"
      },
      {
        "id": "FORD_TEMPO",
        "name": "Tempo",
        "russianName": "Темпо"
      },
      {
        "id": "FORD_TERRITORY",
        "name": "Territory",
        "russianName": "территори"
      },
      {
        "id": "FORD_THUNDERBIRD",
        "name": "Thunderbird",
        "russianName": "Тандербёрд"
      },
      {
        "id": "FORD_TORINO",
        "name": "Torino",
        "russianName": "Торино"
      },
      {
        "id": "FORD_TOURNEO_CONNECT",
        "name": "Tourneo Connect",
        "russianName": "Турнео Коннект"
      },
      {
        "id": "FORD_TOURNEO_COURIER",
        "name": "Tourneo Courier",
        "russianName": "турнео курьер"
      },
      {
        "id": "FORD_TOURNEO_CUSTOM",
        "name": "Tourneo Custom",
        "russianName": "Турнео Кастом"
      },
      {
        "id": "FORD_TRANSIT",
        "name": "Transit",
        "russianName": "Транзит"
      },
      {
        "id": "FORD_TRANSIT_CONNECT",
        "name": "Transit Connect",
        "russianName": "Транзит Коннект"
      },
      {
        "id": "FORD_TRANSIT_CUSTOM",
        "name": "Transit Custom",
        "russianName": "Транзит Кастом"
      },
      {
        "id": "FORD_V8",
        "name": "V8",
        "russianName": "в8"
      },
      {
        "id": "FORD_WINDSTAR",
        "name": "Windstar",
        "russianName": "Виндстар"
      },
      {
        "id": "FORD_ZEPHYR",
        "name": "Zephyr",
        "russianName": "Зефир"
      }
    ]
  },
  "FORTHING": {
    "id": "FORTHING",
    "name": "Forthing",
    "russianName": "Форфинг",
    "models": [
      {
        "id": "FORTHING_CM7",
        "name": "CM7",
        "russianName": "СМ7"
      },
      {
        "id": "FORTHING_FRIDAY",
        "name": "Friday",
        "russianName": "Пятница"
      },
      {
        "id": "FORTHING_LINGZHI_M5",
        "name": "Lingzhi M5",
        "russianName": "Лингжи М5"
      },
      {
        "id": "FORTHING_LINGZHI_PLUS",
        "name": "Lingzhi Plus",
        "russianName": "Лингжи плюс"
      },
      {
        "id": "FORTHING_M7",
        "name": "M7",
        "russianName": "М7"
      },
      {
        "id": "FORTHING_T5",
        "name": "T5",
        "russianName": "Т5"
      },
      {
        "id": "FORTHING_T5L",
        "name": "T5L",
        "russianName": "Т5Л"
      },
      {
        "id": "FORTHING_T5_EVO",
        "name": "T5 EVO",
        "russianName": "Т5 ЭВО"
      },
      {
        "id": "FORTHING_THUNDER",
        "name": "Thunder",
        "russianName": "Тандер"
      },
      {
        "id": "FORTHING_U_TOUR_M4",
        "name": "U-Tour M4",
        "russianName": "Ю-Тур М4"
      },
      {
        "id": "FORTHING_V9",
        "name": "V9",
        "russianName": "В9"
      },
      {
        "id": "FORTHING_XINGHAI_S7",
        "name": "Xinghai S7",
        "russianName": "Синхай С7"
      },
      {
        "id": "FORTHING_YACHT",
        "name": "Yacht",
        "russianName": "Яхт"
      }
    ]
  },
  "FOTON": {
    "id": "FOTON",
    "name": "Foton",
    "russianName": "Фотон",
    "models": [
      {
        "id": "FOTON_MARS_7",
        "name": "Mars 7",
        "russianName": "Марс 7"
      },
      {
        "id": "FOTON_MARS_9",
        "name": "Mars 9",
        "russianName": "Марс 9"
      },
      {
        "id": "FOTON_MIDI",
        "name": "Midi",
        "russianName": "Миди"
      },
      {
        "id": "FOTON_SAUVANA",
        "name": "Sauvana",
        "russianName": "Савана"
      },
      {
        "id": "FOTON_TUNLAND",
        "name": "Tunland",
        "russianName": "Тунланд"
      },
      {
        "id": "FOTON_TUNLAND_G7",
        "name": "Tunland G7",
        "russianName": "Тунланд Г7"
      },
      {
        "id": "FOTON_TUNLAND_G9",
        "name": "Tunland G9",
        "russianName": "Тунланд Г9"
      },
      {
        "id": "FOTON_TUNLAND_V7",
        "name": "Tunland V7",
        "russianName": "Тунланд В7"
      },
      {
        "id": "FOTON_TUNLAND_V9",
        "name": "Tunland V9",
        "russianName": "Тунланд В9"
      }
    ]
  },
  "FRANKLIN": {
    "id": "FRANKLIN",
    "name": "Franklin",
    "russianName": "Франклин",
    "models": [
      {
        "id": "FRANKLIN_SERIES_15",
        "name": "Series 15",
        "russianName": "Серис 15"
      }
    ]
  },
  "FSO": {
    "id": "FSO",
    "name": "FSO",
    "russianName": "ФСО",
    "models": [
      {
        "id": "FSO_125_P",
        "name": "125p",
        "russianName": "125р"
      },
      {
        "id": "FSO_126P",
        "name": "126p",
        "russianName": "126р"
      },
      {
        "id": "FSO_127P",
        "name": "127p",
        "russianName": "127р"
      },
      {
        "id": "FSO_132P",
        "name": "132p",
        "russianName": "132р"
      },
      {
        "id": "FSO_LANOS",
        "name": "Lanos",
        "russianName": "Ланос"
      },
      {
        "id": "FSO_POLONEZ",
        "name": "Polonez",
        "russianName": "Полонез"
      },
      {
        "id": "FSO_WARSZAWA",
        "name": "Warszawa",
        "russianName": "Варшава"
      }
    ]
  },
  "FSR": {
    "id": "FSR",
    "name": "FSR",
    "russianName": "ФСР",
    "models": [
      {
        "id": "FSR_TARPAN",
        "name": "Tarpan",
        "russianName": "Тарпан"
      }
    ]
  },
  "FUQI": {
    "id": "FUQI",
    "name": "Fuqi",
    "russianName": "Фучи",
    "models": [
      {
        "id": "FUQI_LAND_KING",
        "name": "6500 (Land King)",
        "russianName": "6500"
      }
    ]
  },
  "GAC": {
    "id": "GAC",
    "name": "GAC",
    "russianName": "ГАК",
    "models": [
      {
        "id": "GAC_EMPOW",
        "name": "Empow",
        "russianName": "Емпоу"
      },
      {
        "id": "GAC_GN8",
        "name": "GN8",
        "russianName": "ГН8"
      },
      {
        "id": "GAC_GS3",
        "name": "GS3",
        "russianName": "ГС3"
      },
      {
        "id": "GAC_GS4",
        "name": "GS4",
        "russianName": "ГС4"
      },
      {
        "id": "GAC_GS5",
        "name": "GS5",
        "russianName": "ГС5"
      },
      {
        "id": "GAC_GS8",
        "name": "GS8",
        "russianName": "ГС8"
      },
      {
        "id": "GAC_IA5",
        "name": "iA5",
        "russianName": "иА5"
      },
      {
        "id": "GAC_M8",
        "name": "M8",
        "russianName": "М8"
      }
    ]
  },
  "GAZ": {
    "id": "GAZ",
    "name": "ГАЗ",
    "russianName": "ГАЗ",
    "models": [
      {
        "id": "GAZ_12",
        "name": "12 ЗИМ",
        "russianName": "12 ЗИМ"
      },
      {
        "id": "GAZ_13",
        "name": "13 «Чайка»",
        "russianName": "13 «Чайка»"
      },
      {
        "id": "GAZ_14",
        "name": "14 «Чайка»",
        "russianName": "14 «Чайка»"
      },
      {
        "id": "GAZ_18",
        "name": "18",
        "russianName": "18"
      },
      {
        "id": "GAZ_21",
        "name": "21 «Волга»",
        "russianName": "21 «Волга»"
      },
      {
        "id": "GAZ_22",
        "name": "22 «Волга»",
        "russianName": "22 «Волга»"
      },
      {
        "id": "GAZ_2308_ATAMAN",
        "name": "2308 «Атаман»",
        "russianName": "2308 Атаман"
      },
      {
        "id": "GAZ_2330_TIGR",
        "name": "2330 «Тигр»",
        "russianName": "2330 Тигр"
      },
      {
        "id": "GAZ_24",
        "name": "24 «Волга»",
        "russianName": "24 «Волга»"
      },
      {
        "id": "GAZ_25",
        "name": "25",
        "russianName": "25"
      },
      {
        "id": "GAZ_3102",
        "name": "3102 «Волга»",
        "russianName": "3102 Волга"
      },
      {
        "id": "GAZ_31022",
        "name": "31022 «Волга»",
        "russianName": "31022 Волга"
      },
      {
        "id": "GAZ_310221",
        "name": "310221 «Волга»",
        "russianName": "310221 Волга"
      },
      {
        "id": "GAZ_31029",
        "name": "31029 «Волга»",
        "russianName": "31029 Волга"
      },
      {
        "id": "GAZ_3103_VOLGA",
        "name": "3103 «Волга»",
        "russianName": "3103 Волга"
      },
      {
        "id": "GAZ_3105",
        "name": "3105 «Волга»",
        "russianName": "3105 Волга"
      },
      {
        "id": "GAZ_3110",
        "name": "3110 «Волга»",
        "russianName": "31 10 Волга"
      },
      {
        "id": "GAZ_31105",
        "name": "31105 «Волга»",
        "russianName": "31 10 5 Волга"
      },
      {
        "id": "GAZ_3111",
        "name": "3111 «Волга»",
        "russianName": "3111 Волга"
      },
      {
        "id": "GAZ_46",
        "name": "46",
        "russianName": "46"
      },
      {
        "id": "GAZ_61",
        "name": "61",
        "russianName": "61"
      },
      {
        "id": "GAZ_64",
        "name": "64",
        "russianName": "64"
      },
      {
        "id": "GAZ_67",
        "name": "ГАЗ 67",
        "russianName": "67"
      },
      {
        "id": "GAZ_69",
        "name": "69",
        "russianName": "69"
      },
      {
        "id": "GAZ_A",
        "name": "А",
        "russianName": "А"
      },
      {
        "id": "GAZ_M1",
        "name": "М1",
        "russianName": "М1"
      },
      {
        "id": "GAZ_M_20",
        "name": "М-20 «Победа»",
        "russianName": "М-20 «Победа»"
      },
      {
        "id": "GAZ_M_72",
        "name": "М-72",
        "russianName": "М-72"
      },
      {
        "id": "GAZ_VOLGA_SIBER",
        "name": "Volga Siber",
        "russianName": "Волга Сайбер"
      }
    ]
  },
  "GEELY": {
    "id": "GEELY",
    "name": "גילי",
    "russianName": "Джили",
    "models": [
      {
        "id": "GEELY_ATLAS",
        "name": "Atlas",
        "russianName": "Атлас"
      },
      {
        "id": "GEELY_ATLAS_PRO",
        "name": "Atlas Pro",
        "russianName": "Атлас Про"
      },
      {
        "id": "GEELY_AZKARRA",
        "name": "Azkarra",
        "russianName": "Азкарра"
      },
      {
        "id": "GEELY_BEAUTY_LEOPARD",
        "name": "Beauty Leopard",
        "russianName": "бьюти леопард"
      },
      {
        "id": "GEELY_BINRUI",
        "name": "Binrui",
        "russianName": "Бинруй"
      },
      {
        "id": "GEELY_BINRUI_COOL",
        "name": "Binrui Cool",
        "russianName": "Бинруй Кул"
      },
      {
        "id": "GEELY_BINYUE",
        "name": "Binyue",
        "russianName": "Бинью"
      },
      {
        "id": "GEELY_BINYUE_COOL",
        "name": "Binyue Cool",
        "russianName": "Биную Кул"
      },
      {
        "id": "GEELY_BINYUE_L",
        "name": "Binyue L",
        "russianName": "Бинью Эл"
      },
      {
        "id": "GEELY_BOYUE",
        "name": "Boyue",
        "russianName": "Боую"
      },
      {
        "id": "GEELY_BOYUE_COOL",
        "name": "Boyue Cool",
        "russianName": "Бойе Кул"
      },
      {
        "id": "GEELY_BOYUE_PRO",
        "name": "Boyue Pro",
        "russianName": "Бойе Про"
      },
      {
        "id": "GEELY_CITYRAY",
        "name": "Cityray",
        "russianName": "Ситирэй"
      },
      {
        "id": "GEELY_CK",
        "name": "CK (Otaka)",
        "russianName": "ЦК Отака"
      },
      {
        "id": "GEELY_COOLRAY",
        "name": "Coolray",
        "russianName": "Кулрей"
      },
      {
        "id": "GEELY_COWBOY",
        "name": "Cowboy",
        "russianName": "Ковбой"
      },
      {
        "id": "GEELY_EMGRAND",
        "name": "Emgrand",
        "russianName": "Эмгранд"
      },
      {
        "id": "GEELY_EMGRAND_7",
        "name": "Emgrand 7",
        "russianName": "Эмгранд 7"
      },
      {
        "id": "GEELY_EMGRAND_8",
        "name": "Emgrand EC8",
        "russianName": "Эмгранд EC8"
      },
      {
        "id": "GEELY_EMGRAND_EC7",
        "name": "Emgrand EC7",
        "russianName": "Эмгранд EC7"
      },
      {
        "id": "GEELY_EMGRAND_GL",
        "name": "Emgrand GL",
        "russianName": "Эмгранд ГЛ"
      },
      {
        "id": "GEELY_EMGRAND_GT",
        "name": "Emgrand GT",
        "russianName": "Эмгранд ГТ"
      },
      {
        "id": "GEELY_EMGRAND_L",
        "name": "Emgrand L",
        "russianName": "Эмгранд Л"
      },
      {
        "id": "GEELY_EMGRAND_S",
        "name": "Emgrand S",
        "russianName": "Эмгранд C"
      },
      {
        "id": "GEELY_EMGRAND_X7",
        "name": "Emgrand X7",
        "russianName": "Эмгранд X7"
      },
      {
        "id": "GEELY_EX2",
        "name": "EX2",
        "russianName": "ЕИкс2"
      },
      {
        "id": "GEELY_EX5",
        "name": "EX5",
        "russianName": "ЕИкс5"
      },
      {
        "id": "GEELY_EX5_EM_I",
        "name": "EX5 EM-i",
        "russianName": "ЕИкс5 ЕМ-ай"
      },
      {
        "id": "GEELY_GALAXY_A7",
        "name": "Galaxy A7",
        "russianName": "Гелекси А7"
      },
      {
        "id": "GEELY_GALAXY_E5",
        "name": "Galaxy E5",
        "russianName": "Гелекси Е5"
      },
      {
        "id": "GEELY_GALAXY_E8",
        "name": "Galaxy E8",
        "russianName": "Гелекси Е8"
      },
      {
        "id": "GEELY_GALAXY_L6",
        "name": "Galaxy L6",
        "russianName": "Гелекси Л6"
      },
      {
        "id": "GEELY_GALAXY_L7",
        "name": "Galaxy L7",
        "russianName": "Гелекси Л7"
      },
      {
        "id": "GEELY_GALAXY_LEVC_L380",
        "name": "Galaxy LEVC L380",
        "russianName": "Гелекси ЛЕВК Л380"
      },
      {
        "id": "GEELY_GALAXY_M9",
        "name": "Galaxy M9",
        "russianName": "Гелекси М9"
      },
      {
        "id": "GEELY_GALAXY_STARSHINE_6",
        "name": "Galaxy Starshine 6",
        "russianName": "Гэлакси Старшайн 6"
      },
      {
        "id": "GEELY_GALAXY_STARSHINE_8",
        "name": "Galaxy Starshine 8",
        "russianName": "Гэлакси Старшайн 8"
      },
      {
        "id": "GEELY_GALAXY_STARSHIP_7",
        "name": "Galaxy Starship 7",
        "russianName": "Гэлэкси Старшип 7"
      },
      {
        "id": "GEELY_GC5",
        "name": "GC5",
        "russianName": "ДжиСи5"
      },
      {
        "id": "GEELY_GC6",
        "name": "GC6",
        "russianName": "гс6"
      },
      {
        "id": "GEELY_GC7",
        "name": "GC7",
        "russianName": "Джи-Си семь"
      },
      {
        "id": "GEELY_GC9",
        "name": "GC9",
        "russianName": "гс9"
      },
      {
        "id": "GEELY_GEOMETRY_A",
        "name": "Geometry A",
        "russianName": "Геометрия А"
      },
      {
        "id": "GEELY_GEOMETRY_C",
        "name": "Geometry C",
        "russianName": "Геометрия Ц"
      },
      {
        "id": "GEELY_GEOMETRY_E",
        "name": "Geometry E",
        "russianName": "Геометрия Е"
      },
      {
        "id": "GEELY_GEOMETRY_G6",
        "name": "Geometry G6",
        "russianName": "Геометрия Г6"
      },
      {
        "id": "GEELY_GEOMETRY_M6",
        "name": "Geometry M6",
        "russianName": "Геометрия М6"
      },
      {
        "id": "GEELY_GEOME_XINGYUAN",
        "name": "Geome Xingyuan",
        "russianName": "Джиом Синьюань"
      },
      {
        "id": "GEELY_GS",
        "name": "GS",
        "russianName": "ГС"
      },
      {
        "id": "GEELY_GX3_PRO",
        "name": "GX3 Pro",
        "russianName": "ДиИкс3 Про"
      },
      {
        "id": "GEELY_HAOQING",
        "name": "Haoqing",
        "russianName": "хаокинг"
      },
      {
        "id": "GEELY_HAOYUE",
        "name": "Haoyue",
        "russianName": "Хаоюэ"
      },
      {
        "id": "GEELY_HAOYUE_L",
        "name": "Haoyue L",
        "russianName": "Хаоюэ Л"
      },
      {
        "id": "GEELY_HAOYUE_PRO",
        "name": "Haoyue Pro",
        "russianName": "Хаоюэ Про"
      },
      {
        "id": "GEELY_ICON",
        "name": "Icon",
        "russianName": "Айкон"
      },
      {
        "id": "GEELY_JIAJI",
        "name": "Jiaji",
        "russianName": "Джиаджи"
      },
      {
        "id": "GEELY_KANDI_EX3",
        "name": "Kandi EX3",
        "russianName": "Канди ЕИкс3"
      },
      {
        "id": "GEELY_LC",
        "name": "LC (Panda)",
        "russianName": "LC"
      },
      {
        "id": "GEELY_LC_CROSS",
        "name": "LC (Panda) Cross",
        "russianName": "LC Кросс"
      },
      {
        "id": "GEELY_MK",
        "name": "MK",
        "russianName": "МК"
      },
      {
        "id": "GEELY_MK_CROSS",
        "name": "MK Cross",
        "russianName": "МК Кросс"
      },
      {
        "id": "GEELY_MONJARO",
        "name": "Monjaro",
        "russianName": "Монжаро"
      },
      {
        "id": "GEELY_MR",
        "name": "MR",
        "russianName": "MR"
      },
      {
        "id": "GEELY_OKAVANGO",
        "name": "Okavango",
        "russianName": "Окаванго"
      },
      {
        "id": "GEELY_PANDA",
        "name": "Panda",
        "russianName": "Панда"
      },
      {
        "id": "GEELY_PREFACE",
        "name": "Preface",
        "russianName": "Префейс"
      },
      {
        "id": "GEELY_RADAR_KING_KONG",
        "name": "Radar King Kong",
        "russianName": "Радар Кинг Конг"
      },
      {
        "id": "GEELY_SC7",
        "name": "SC7",
        "russianName": "SC7"
      },
      {
        "id": "GEELY_TUGELLA",
        "name": "Tugella",
        "russianName": "Тугелла"
      },
      {
        "id": "GEELY_TX4",
        "name": "TX4",
        "russianName": "ТХ4"
      },
      {
        "id": "GEELY_VISION",
        "name": "FC (Vision)",
        "russianName": "фс (вижн)"
      },
      {
        "id": "GEELY_VISION_X3",
        "name": "Vision X3",
        "russianName": "Вижн Икс3"
      },
      {
        "id": "GEELY_VISION_X3_PRO",
        "name": "Vision X3 Pro",
        "russianName": "Вижн Икс3 Про"
      },
      {
        "id": "GEELY_VISION_X6",
        "name": "Vision X6",
        "russianName": "Вижн Икс 6"
      },
      {
        "id": "GEELY_VISION_X6_PRO",
        "name": "Vision X6 Pro",
        "russianName": "Вижн Икс 6 Про"
      },
      {
        "id": "GEELY_XINGYUE",
        "name": "Xingyue",
        "russianName": "Синьюэ"
      },
      {
        "id": "GEELY_XINGYUE_L",
        "name": "Xingyue L",
        "russianName": "Синьюэ Л"
      },
      {
        "id": "GEELY_YUANCHENG_FARIZON_FX",
        "name": "Yuancheng (Farizon) FX",
        "russianName": "Юаньченг Фаризон ФХ"
      }
    ]
  },
  "GENESIS": {
    "id": "GENESIS",
    "name": "ג'נסיס",
    "russianName": "Генезис",
    "models": [
      {
        "id": "GENESIS_G70",
        "name": "G70",
        "russianName": "Г70"
      },
      {
        "id": "GENESIS_G80",
        "name": "G80",
        "russianName": "Г80"
      },
      {
        "id": "GENESIS_G90",
        "name": "G90",
        "russianName": "Г90"
      },
      {
        "id": "GENESIS_GV60",
        "name": "GV60",
        "russianName": "ГВ60"
      },
      {
        "id": "GENESIS_GV70",
        "name": "GV70",
        "russianName": "ГВ70"
      },
      {
        "id": "GENESIS_GV80",
        "name": "GV80",
        "russianName": "ГВ80"
      },
      {
        "id": "GENESIS_GV80_COUPE",
        "name": "GV80 Coupe",
        "russianName": "ГВ80 Купе"
      }
    ]
  },
  "GEO": {
    "id": "GEO",
    "name": "Geo",
    "russianName": "Гео",
    "models": [
      {
        "id": "GEO_METRO",
        "name": "Metro",
        "russianName": "метро"
      },
      {
        "id": "GEO_PRIZM",
        "name": "Prizm",
        "russianName": "призм"
      },
      {
        "id": "GEO_SPECTRUM",
        "name": "Spectrum",
        "russianName": "спектрум"
      },
      {
        "id": "GEO_STORM",
        "name": "Storm",
        "russianName": "шторм"
      },
      {
        "id": "GEO_TRACKER",
        "name": "Tracker",
        "russianName": "трекер"
      }
    ]
  },
  "GMA": {
    "id": "GMA",
    "name": "GMA",
    "russianName": "Джи-Эм-Эй",
    "models": [
      {
        "id": "GMA_T33",
        "name": "T.33",
        "russianName": "Т.33"
      },
      {
        "id": "GMA_T50",
        "name": "T.50",
        "russianName": "Т.50"
      }
    ]
  },
  "GMC": {
    "id": "GMC",
    "name": "ג'י.אם.סי",
    "russianName": "Джи-Эм-Си",
    "models": [
      {
        "id": "GMC_100",
        "name": "100",
        "russianName": "100"
      },
      {
        "id": "GMC_ACADIA",
        "name": "Acadia",
        "russianName": "акадия"
      },
      {
        "id": "GMC_CANYON",
        "name": "Canyon",
        "russianName": "Каньон"
      },
      {
        "id": "GMC_C_K",
        "name": "C/K",
        "russianName": "ЭсКа"
      },
      {
        "id": "GMC_ENVOY",
        "name": "Envoy",
        "russianName": "Энвой"
      },
      {
        "id": "GMC_HUMMER_EV",
        "name": "Hummer EV",
        "russianName": "Хаммер ЕВ"
      },
      {
        "id": "GMC_JIMMY",
        "name": "Jimmy",
        "russianName": "Джимми"
      },
      {
        "id": "GMC_SAFARI",
        "name": "Safari",
        "russianName": "Сафари"
      },
      {
        "id": "GMC_SAVANA",
        "name": "Savana",
        "russianName": "Савана"
      },
      {
        "id": "GMC_SIERRA",
        "name": "Sierra",
        "russianName": "Сьерра"
      },
      {
        "id": "GMC_SONOMA",
        "name": "Sonoma",
        "russianName": "Сонома"
      },
      {
        "id": "GMC_SUBURBAN",
        "name": "Suburban",
        "russianName": "Субурбан"
      },
      {
        "id": "GMC_SYCLONE",
        "name": "Syclone",
        "russianName": "Циклон"
      },
      {
        "id": "GMC_TERRAIN",
        "name": "Terrain",
        "russianName": "Террейн"
      },
      {
        "id": "GMC_TYPHOON",
        "name": "Typhoon",
        "russianName": "Тайфун"
      },
      {
        "id": "GMC_VANDURA",
        "name": "Vandura",
        "russianName": "Вандура"
      },
      {
        "id": "GMC_YUKON",
        "name": "Yukon",
        "russianName": "Юкон"
      }
    ]
  },
  "GOGGOMOBIL": {
    "id": "GOGGOMOBIL",
    "name": "Goggomobil",
    "russianName": "Гоггомобил",
    "models": [
      {
        "id": "GOGGOMOBIL_T",
        "name": "T",
        "russianName": "Т"
      },
      {
        "id": "GOGGOMOBIL_TS",
        "name": "TS",
        "russianName": "ТС"
      }
    ]
  },
  "GONOW": {
    "id": "GONOW",
    "name": "Gonow",
    "russianName": "Гонов",
    "models": [
      {
        "id": "GONOW_AOOSED_G5",
        "name": "Aoosed G5",
        "russianName": "Аусид Г5"
      },
      {
        "id": "GONOW_GX6",
        "name": "GX6",
        "russianName": "ГИкс6"
      },
      {
        "id": "GONOW_TROY",
        "name": "Troy",
        "russianName": "Трой"
      }
    ]
  },
  "GORDON": {
    "id": "GORDON",
    "name": "Gordon",
    "russianName": "Гордон",
    "models": [
      {
        "id": "GORDON_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "GP": {
    "id": "GP",
    "name": "GP",
    "russianName": "ГП",
    "models": [
      {
        "id": "GP_MADISON",
        "name": "Madison",
        "russianName": "Мейдисон"
      }
    ]
  },
  "GREAT_WALL": {
    "id": "GREAT_WALL",
    "name": "גרייט וול",
    "russianName": "Грейт Вол",
    "models": [
      {
        "id": "GREAT_WALL_COOLBEAR",
        "name": "Coolbear",
        "russianName": "Кулбир"
      },
      {
        "id": "GREAT_WALL_COWRY",
        "name": "Cowry (V80)",
        "russianName": "Каури"
      },
      {
        "id": "GREAT_WALL_DEER",
        "name": "Deer",
        "russianName": "Дир"
      },
      {
        "id": "GREAT_WALL_FLORID",
        "name": "Florid",
        "russianName": "Флорид"
      },
      {
        "id": "GREAT_WALL_HOVERH3",
        "name": "Hover H3",
        "russianName": "Ховер H3"
      },
      {
        "id": "GREAT_WALL_HOVERH5",
        "name": "Hover H5",
        "russianName": "Ховер H5"
      },
      {
        "id": "GREAT_WALL_HOVERH6",
        "name": "Hover H6",
        "russianName": "Ховер H6"
      },
      {
        "id": "GREAT_WALL_HOVER_2005",
        "name": "Hover",
        "russianName": "Ховер"
      },
      {
        "id": "GREAT_WALL_HOVER_M1",
        "name": "Hover M1 (Peri 4x4)",
        "russianName": "Ховер М1"
      },
      {
        "id": "GREAT_WALL_HOVER_M2",
        "name": "Hover M2",
        "russianName": "Ховер М2"
      },
      {
        "id": "GREAT_WALL_HOVER_M4",
        "name": "Hover M4",
        "russianName": "Ховер М4"
      },
      {
        "id": "GREAT_WALL_HOVER_PI",
        "name": "Hover Pi",
        "russianName": "Ховер Пи"
      },
      {
        "id": "GREAT_WALL_PEGASUS",
        "name": "Pegasus",
        "russianName": "Пегасус"
      },
      {
        "id": "GREAT_WALL_PERI",
        "name": "Peri",
        "russianName": "Пери"
      },
      {
        "id": "GREAT_WALL_POER",
        "name": "Poer",
        "russianName": "Поер"
      },
      {
        "id": "GREAT_WALL_POER_KING_KONG",
        "name": "Poer King Kong",
        "russianName": "Кинг Конг"
      },
      {
        "id": "GREAT_WALL_SAFE",
        "name": "Safe",
        "russianName": "Сэйф"
      },
      {
        "id": "GREAT_WALL_SAILOR",
        "name": "Sailor",
        "russianName": "Сейлор"
      },
      {
        "id": "GREAT_WALL_SHANHAI_POER",
        "name": "Shanhai Poer",
        "russianName": "Шанхай Поер"
      },
      {
        "id": "GREAT_WALL_SING",
        "name": "Sing RUV",
        "russianName": "Синг"
      },
      {
        "id": "GREAT_WALL_SOCOOL",
        "name": "Socool",
        "russianName": "Сокул"
      },
      {
        "id": "GREAT_WALL_VOLEEXC10",
        "name": "Voleex C10 (Phenom)",
        "russianName": "Воликс C10"
      },
      {
        "id": "GREAT_WALL_VOLEEXC30",
        "name": "Voleex C30",
        "russianName": "Воликс C30"
      },
      {
        "id": "GREAT_WALL_VOLEEXC50",
        "name": "Voleex C50",
        "russianName": "Воликс С50"
      },
      {
        "id": "GREAT_WALL_WINGLE_7",
        "name": "Wingle 7",
        "russianName": "Вингл 7"
      },
      {
        "id": "GREAT_WALL_WINGLE_UP",
        "name": "Wingle",
        "russianName": "Вингл"
      }
    ]
  },
  "HAFEI": {
    "id": "HAFEI",
    "name": "Hafei",
    "russianName": "Хафэй",
    "models": [
      {
        "id": "HAFEI_BRIO",
        "name": "Brio",
        "russianName": "брио"
      },
      {
        "id": "HAFEI_MINYI",
        "name": "Minyi",
        "russianName": "Миньи"
      },
      {
        "id": "HAFEI_PRINCIP",
        "name": "Princip",
        "russianName": "принцип"
      },
      {
        "id": "HAFEI_SAIBAO",
        "name": "Saibao",
        "russianName": "сайбао"
      },
      {
        "id": "HAFEI_SIGMA",
        "name": "Sigma",
        "russianName": "сигма"
      },
      {
        "id": "HAFEI_SIMBO",
        "name": "Simbo",
        "russianName": "симбо"
      }
    ]
  },
  "HAIMA": {
    "id": "HAIMA",
    "name": "Haima",
    "russianName": "Хайма",
    "models": [
      {
        "id": "HAIMA_2",
        "name": "2",
        "russianName": "2"
      },
      {
        "id": "HAIMA_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "HAIMA_6P",
        "name": "6P",
        "russianName": "6Пи"
      },
      {
        "id": "HAIMA_7",
        "name": "7",
        "russianName": "7"
      },
      {
        "id": "HAIMA_7X",
        "name": "7X",
        "russianName": "7Икс"
      },
      {
        "id": "HAIMA_8S",
        "name": "8S",
        "russianName": "8С"
      },
      {
        "id": "HAIMA_AISHANG_EV",
        "name": "Aishang EV",
        "russianName": "Аишанг ЕВ"
      },
      {
        "id": "HAIMA_E3",
        "name": "E3",
        "russianName": "Е3"
      },
      {
        "id": "HAIMA_FAMILY",
        "name": "Family",
        "russianName": "фемели"
      },
      {
        "id": "HAIMA_FAMILY_F7",
        "name": "Family F7",
        "russianName": "фемели-ф7"
      },
      {
        "id": "HAIMA_FREEMA",
        "name": "Freema",
        "russianName": "фрима"
      },
      {
        "id": "HAIMA_M3",
        "name": "M3",
        "russianName": "М3"
      },
      {
        "id": "HAIMA_S5",
        "name": "S5",
        "russianName": "С5"
      },
      {
        "id": "HAIMA_S5_YOUNG",
        "name": "S5 Young",
        "russianName": "С5 Янг"
      }
    ]
  },
  "HANOMAG": {
    "id": "HANOMAG",
    "name": "Hanomag",
    "russianName": "Ханомаг",
    "models": [
      {
        "id": "HANOMAG_REKORD",
        "name": "Rekord",
        "russianName": "Рекорд"
      },
      {
        "id": "HANOMAG_TYP_13",
        "name": "Typ 13",
        "russianName": "Тип 13"
      }
    ]
  },
  "HANTENG": {
    "id": "HANTENG",
    "name": "Hanteng",
    "russianName": "Хантенг",
    "models": [
      {
        "id": "HANTENG_X7",
        "name": "X7",
        "russianName": "Х7"
      }
    ]
  },
  "HAVAL": {
    "id": "HAVAL",
    "name": "האבל",
    "russianName": "Хавэйл",
    "models": [
      {
        "id": "HAVAL_CHITU",
        "name": "Chitu",
        "russianName": "Читу"
      },
      {
        "id": "HAVAL_DAGOU",
        "name": "DaGou (Big Dog)",
        "russianName": "Дагоу (Биг Дог)"
      },
      {
        "id": "HAVAL_DARGO",
        "name": "Dargo",
        "russianName": "Дарго"
      },
      {
        "id": "HAVAL_F5",
        "name": "F5",
        "russianName": "Ф5"
      },
      {
        "id": "HAVAL_F7",
        "name": "F7",
        "russianName": "Ф7"
      },
      {
        "id": "HAVAL_F7X",
        "name": "F7x",
        "russianName": "Ф7х"
      },
      {
        "id": "HAVAL_F8",
        "name": "F8",
        "russianName": "Ф8"
      },
      {
        "id": "HAVAL_H1",
        "name": "H1",
        "russianName": "Эйч1"
      },
      {
        "id": "HAVAL_H2",
        "name": "H2",
        "russianName": "Н2"
      },
      {
        "id": "HAVAL_H2S",
        "name": "H2s",
        "russianName": "Х2с"
      },
      {
        "id": "HAVAL_H3",
        "name": "H3",
        "russianName": "Х3"
      },
      {
        "id": "HAVAL_H4",
        "name": "H4",
        "russianName": "Эйч4"
      },
      {
        "id": "HAVAL_H5",
        "name": "H5",
        "russianName": "Эйч5"
      },
      {
        "id": "HAVAL_H6",
        "name": "H6",
        "russianName": "Н6"
      },
      {
        "id": "HAVAL_H6L",
        "name": "H6L",
        "russianName": "Х6Л"
      },
      {
        "id": "HAVAL_H6S",
        "name": "H6S",
        "russianName": "Х6С"
      },
      {
        "id": "HAVAL_H6_COUPE",
        "name": "H6 Coupe",
        "russianName": "Н6 Купе"
      },
      {
        "id": "HAVAL_H7",
        "name": "H7",
        "russianName": "Эйч7"
      },
      {
        "id": "HAVAL_H8",
        "name": "H8",
        "russianName": "Н8"
      },
      {
        "id": "HAVAL_H9",
        "name": "H9",
        "russianName": "Н9"
      },
      {
        "id": "HAVAL_JOLION",
        "name": "Jolion",
        "russianName": "Джолион"
      },
      {
        "id": "HAVAL_KUGOU",
        "name": "KuGou",
        "russianName": "КуГоу"
      },
      {
        "id": "HAVAL_M6",
        "name": "M6",
        "russianName": "М6"
      },
      {
        "id": "HAVAL_MENGLONG",
        "name": "Menglong (Raptor)",
        "russianName": "Менглонг"
      },
      {
        "id": "HAVAL_SHENSHOU",
        "name": "Shenshou",
        "russianName": "Шеншу"
      },
      {
        "id": "HAVAL_XIAOLONG",
        "name": "Xiaolong",
        "russianName": "Сяолонг"
      },
      {
        "id": "HAVAL_XIAOLONG_MAX",
        "name": "Xiaolong Max",
        "russianName": "Сяолонг Макс"
      }
    ]
  },
  "HAWTAI": {
    "id": "HAWTAI",
    "name": "Hawtai",
    "russianName": "Хаутай",
    "models": [
      {
        "id": "HAWTAI_BOLIGER",
        "name": "Boliger",
        "russianName": "Болигер"
      },
      {
        "id": "HAWTAI_B_21",
        "name": "B21",
        "russianName": "б21"
      },
      {
        "id": "HAWTAI_LAVILLE",
        "name": "Laville",
        "russianName": "Лавиль"
      }
    ]
  },
  "HEDMOS": {
    "id": "HEDMOS",
    "name": "Hedmos",
    "russianName": "Хэдмос",
    "models": [
      {
        "id": "HEDMOS_06",
        "name": "06",
        "russianName": "06"
      }
    ]
  },
  "HEINKEL": {
    "id": "HEINKEL",
    "name": "Heinkel",
    "russianName": "Хейнкель",
    "models": [
      {
        "id": "HEINKEL_TYP_154",
        "name": "Typ 154",
        "russianName": "Тип 154"
      }
    ]
  },
  "HENNESSEY": {
    "id": "HENNESSEY",
    "name": "Hennessey",
    "russianName": "Хеннесси",
    "models": [
      {
        "id": "HENNESSEY_VENOM_F5",
        "name": "Venom F5",
        "russianName": "Веном Ф5"
      },
      {
        "id": "HENNESSEY_VENOM_GT",
        "name": "Venom GT",
        "russianName": "Веном ГТ"
      }
    ]
  },
  "HINDUSTAN": {
    "id": "HINDUSTAN",
    "name": "Hindustan",
    "russianName": "Хиндустан",
    "models": [
      {
        "id": "HINDUSTAN_AMBASSADOR",
        "name": "Ambassador",
        "russianName": "Амбассадор"
      },
      {
        "id": "HINDUSTAN_CONTESSA",
        "name": "Contessa",
        "russianName": "Контесса"
      }
    ]
  },
  "HIPHI": {
    "id": "HIPHI",
    "name": "HiPhi",
    "russianName": "Хипхи",
    "models": [
      {
        "id": "HIPHI_X",
        "name": "X",
        "russianName": "Икс"
      },
      {
        "id": "HIPHI_Y",
        "name": "Y",
        "russianName": "Уай"
      },
      {
        "id": "HIPHI_Z",
        "name": "Z",
        "russianName": "З"
      }
    ]
  },
  "HISPANO_SUIZA": {
    "id": "HISPANO_SUIZA",
    "name": "Hispano-Suiza",
    "russianName": "Испано-Сюиза",
    "models": [
      {
        "id": "HISPANO_SUIZA_K6",
        "name": "K6",
        "russianName": "К6"
      }
    ]
  },
  "HOLDEN": {
    "id": "HOLDEN",
    "name": "Holden",
    "russianName": "Холден",
    "models": [
      {
        "id": "HOLDEN_APOLLO",
        "name": "Apollo",
        "russianName": "Аполло"
      },
      {
        "id": "HOLDEN_ASTRA",
        "name": "Astra",
        "russianName": "Астра"
      },
      {
        "id": "HOLDEN_BARINA",
        "name": "Barina",
        "russianName": "Барина"
      },
      {
        "id": "HOLDEN_CALAIS",
        "name": "Calais",
        "russianName": "Кале"
      },
      {
        "id": "HOLDEN_CAPRICE",
        "name": "Caprice",
        "russianName": "Каприс"
      },
      {
        "id": "HOLDEN_COMMODORE",
        "name": "Commodore",
        "russianName": "Коммодор"
      },
      {
        "id": "HOLDEN_CRUZE",
        "name": "Cruze",
        "russianName": "круз"
      },
      {
        "id": "HOLDEN_FRONTERA",
        "name": "Frontera",
        "russianName": "Фронтера"
      },
      {
        "id": "HOLDEN_JACKAROO",
        "name": "Jackaroo",
        "russianName": "Джакару"
      },
      {
        "id": "HOLDEN_MONARO",
        "name": "Monaro",
        "russianName": "Монаро"
      },
      {
        "id": "HOLDEN_RODEO",
        "name": "Rodeo",
        "russianName": "Родео"
      },
      {
        "id": "HOLDEN_STATESMAN",
        "name": "Statesman",
        "russianName": "Стэйтсман"
      },
      {
        "id": "HOLDEN_UTE",
        "name": "UTE",
        "russianName": "Ю Т Е"
      },
      {
        "id": "HOLDEN_VECTRA",
        "name": "Vectra",
        "russianName": "Вектра"
      },
      {
        "id": "HOLDEN_ZAFIRA",
        "name": "Zafira",
        "russianName": "Зафира"
      }
    ]
  },
  "HONDA": {
    "id": "HONDA",
    "name": "הונדה",
    "russianName": "Хонда",
    "models": [
      {
        "id": "HONDA_145",
        "name": "145",
        "russianName": "145"
      },
      {
        "id": "HONDA_ACCORD",
        "name": "Accord",
        "russianName": "Аккорд"
      },
      {
        "id": "HONDA_ACTY",
        "name": "Acty",
        "russianName": "акти"
      },
      {
        "id": "HONDA_AIRWAVE",
        "name": "Airwave",
        "russianName": "Эйрвэйв"
      },
      {
        "id": "HONDA_ASCOT",
        "name": "Ascot",
        "russianName": "Аскот"
      },
      {
        "id": "HONDA_ASCOT_INNOVA",
        "name": "Ascot Innova",
        "russianName": "Аскот Иннова"
      },
      {
        "id": "HONDA_AVANCIER",
        "name": "Avancier",
        "russianName": "Авансьер"
      },
      {
        "id": "HONDA_BALLADE",
        "name": "Ballade",
        "russianName": "баллада"
      },
      {
        "id": "HONDA_BEAT",
        "name": "Beat",
        "russianName": "Бит"
      },
      {
        "id": "HONDA_BREEZE",
        "name": "Breeze",
        "russianName": "Бриз"
      },
      {
        "id": "HONDA_BRIO",
        "name": "Brio",
        "russianName": "Брио"
      },
      {
        "id": "HONDA_CAPA",
        "name": "Capa",
        "russianName": "Капа"
      },
      {
        "id": "HONDA_CITY",
        "name": "City",
        "russianName": "Сити"
      },
      {
        "id": "HONDA_CIVIC",
        "name": "Civic",
        "russianName": "Цивик"
      },
      {
        "id": "HONDA_CIVIC_FERIO",
        "name": "Civic Ferio",
        "russianName": "Цивик Ферио"
      },
      {
        "id": "HONDA_CIVIC_TYPE_R",
        "name": "Civic Type R",
        "russianName": "Сивик Тайп Р"
      },
      {
        "id": "HONDA_CONCERTO",
        "name": "Concerto",
        "russianName": "Концерто"
      },
      {
        "id": "HONDA_CRIDER",
        "name": "Crider",
        "russianName": "Кридер"
      },
      {
        "id": "HONDA_CROSSROAD",
        "name": "Crossroad",
        "russianName": "Кроссроуд"
      },
      {
        "id": "HONDA_CROSSTOUR",
        "name": "Crosstour",
        "russianName": "Кросстур"
      },
      {
        "id": "HONDA_CR_V",
        "name": "CR-V",
        "russianName": "CR-V"
      },
      {
        "id": "HONDA_CR_X",
        "name": "CR-X",
        "russianName": "CR-X"
      },
      {
        "id": "HONDA_CR_Z",
        "name": "CR-Z",
        "russianName": "CR-Z"
      },
      {
        "id": "HONDA_DOMANI",
        "name": "Domani",
        "russianName": "Домани"
      },
      {
        "id": "HONDA_E",
        "name": "e",
        "russianName": "е"
      },
      {
        "id": "HONDA_EDIX",
        "name": "Edix",
        "russianName": "Эдикс"
      },
      {
        "id": "HONDA_ELEMENT",
        "name": "Element",
        "russianName": "Элемент"
      },
      {
        "id": "HONDA_ELEVATE",
        "name": "Elevate",
        "russianName": "Елевате"
      },
      {
        "id": "HONDA_ELYSION",
        "name": "Elysion",
        "russianName": "Элюзион"
      },
      {
        "id": "HONDA_ENVIX",
        "name": "Envix",
        "russianName": "Енвикс"
      },
      {
        "id": "HONDA_E_NP1",
        "name": "e:NP1",
        "russianName": "И:НП1"
      },
      {
        "id": "HONDA_E_NP2",
        "name": "e:NP2",
        "russianName": "И:НП2"
      },
      {
        "id": "HONDA_E_NS1",
        "name": "e:NS1",
        "russianName": "Е:НС1"
      },
      {
        "id": "HONDA_E_NS2",
        "name": "e:NS2",
        "russianName": "Е:НС2"
      },
      {
        "id": "HONDA_E_NY1",
        "name": "e:Ny1",
        "russianName": "и:Эн-Вай один"
      },
      {
        "id": "HONDA_FCX_CLARITY",
        "name": "Clarity",
        "russianName": "Кларити"
      },
      {
        "id": "HONDA_FIT",
        "name": "Fit",
        "russianName": "Фит"
      },
      {
        "id": "HONDA_FIT_ARIA",
        "name": "Fit Aria",
        "russianName": "Фит Ариа"
      },
      {
        "id": "HONDA_FIT_SHUTTLE",
        "name": "Fit Shuttle",
        "russianName": "Фит Шатл"
      },
      {
        "id": "HONDA_FREED",
        "name": "Freed",
        "russianName": "Фрид"
      },
      {
        "id": "HONDA_FR_V",
        "name": "FR-V",
        "russianName": "FR-V"
      },
      {
        "id": "HONDA_GRACE",
        "name": "Grace",
        "russianName": "Грейс"
      },
      {
        "id": "HONDA_HORIZON",
        "name": "Horizon",
        "russianName": "хорайзон"
      },
      {
        "id": "HONDA_HR_V",
        "name": "HR-V",
        "russianName": "HR-V"
      },
      {
        "id": "HONDA_INSIGHT",
        "name": "Insight",
        "russianName": "Инсайт"
      },
      {
        "id": "HONDA_INSPIRE",
        "name": "Inspire",
        "russianName": "инспаер"
      },
      {
        "id": "HONDA_INTEGRA",
        "name": "Integra",
        "russianName": "Интегра"
      },
      {
        "id": "HONDA_INTEGRA_SJ",
        "name": "Integra SJ",
        "russianName": "Интегра SJ"
      },
      {
        "id": "HONDA_JADE",
        "name": "Jade",
        "russianName": "джейд"
      },
      {
        "id": "HONDA_JAZZ",
        "name": "Jazz",
        "russianName": "Джаз"
      },
      {
        "id": "HONDA_LAGREAT",
        "name": "Lagreat",
        "russianName": "Лагрейт"
      },
      {
        "id": "HONDA_LEGEND",
        "name": "Legend",
        "russianName": "Легенд"
      },
      {
        "id": "HONDA_LIFE",
        "name": "Life",
        "russianName": "Лайф"
      },
      {
        "id": "HONDA_LOGO",
        "name": "Logo",
        "russianName": "Лого"
      },
      {
        "id": "HONDA_MDX",
        "name": "MDX",
        "russianName": "MDX"
      },
      {
        "id": "HONDA_MOBILIO",
        "name": "Mobilio",
        "russianName": "Мобилио"
      },
      {
        "id": "HONDA_MOBILIO_SPIKE",
        "name": "Mobilio Spike",
        "russianName": "Мобилио Спайк"
      },
      {
        "id": "HONDA_N360",
        "name": "N360",
        "russianName": "н360"
      },
      {
        "id": "HONDA_NSX",
        "name": "NSX",
        "russianName": "NSX"
      },
      {
        "id": "HONDA_N_BOX",
        "name": "N-BOX",
        "russianName": "н-бокс"
      },
      {
        "id": "HONDA_N_BOXPLUS",
        "name": "N-BOX+",
        "russianName": "н-бокс+"
      },
      {
        "id": "HONDA_N_BOX_SLASH",
        "name": "N-BOX Slash",
        "russianName": "Н-БОКС Слэш"
      },
      {
        "id": "HONDA_N_ONE",
        "name": "N-One",
        "russianName": "Н-Уан"
      },
      {
        "id": "HONDA_N_VAN",
        "name": "N-VAN",
        "russianName": "Н-ВЭН"
      },
      {
        "id": "HONDA_N_WGN",
        "name": "N-WGN",
        "russianName": "Н-Вгн"
      },
      {
        "id": "HONDA_ODYSSEY",
        "name": "Odyssey",
        "russianName": "Одисей"
      },
      {
        "id": "HONDA_ODYSSEY_NA",
        "name": "Odyssey (North America)",
        "russianName": "Одиссей (Северная Америка)"
      },
      {
        "id": "HONDA_ORTHIA",
        "name": "Orthia",
        "russianName": "ортхия"
      },
      {
        "id": "HONDA_PARTNER",
        "name": "Partner",
        "russianName": "Партнер"
      },
      {
        "id": "HONDA_PASSPORT",
        "name": "Passport",
        "russianName": "Пасспорт"
      },
      {
        "id": "HONDA_PILOT",
        "name": "Pilot",
        "russianName": "Пилот"
      },
      {
        "id": "HONDA_PRELUDE",
        "name": "Prelude",
        "russianName": "Прелюд"
      },
      {
        "id": "HONDA_PROLOGUE",
        "name": "Prologue",
        "russianName": "Пролог"
      },
      {
        "id": "HONDA_QUINT",
        "name": "Quint",
        "russianName": "Квинт"
      },
      {
        "id": "HONDA_RAFAGA",
        "name": "Rafaga",
        "russianName": "Рафага"
      },
      {
        "id": "HONDA_RIDGELINE",
        "name": "Ridgeline",
        "russianName": "Риджлайн"
      },
      {
        "id": "HONDA_S2000",
        "name": "S2000",
        "russianName": "S2000"
      },
      {
        "id": "HONDA_S500",
        "name": "S500",
        "russianName": "с500"
      },
      {
        "id": "HONDA_S600",
        "name": "S600",
        "russianName": "с600"
      },
      {
        "id": "HONDA_S660",
        "name": "S660",
        "russianName": "С660"
      },
      {
        "id": "HONDA_SABER",
        "name": "Saber",
        "russianName": "Сабер"
      },
      {
        "id": "HONDA_SHUTTLE",
        "name": "Shuttle",
        "russianName": "Шатл"
      },
      {
        "id": "HONDA_STEPWAGON",
        "name": "Stepwgn",
        "russianName": "Степвагон"
      },
      {
        "id": "HONDA_STREAM",
        "name": "Stream",
        "russianName": "Стрим"
      },
      {
        "id": "HONDA_STREET",
        "name": "Street",
        "russianName": "Стрит"
      },
      {
        "id": "HONDA_S_MX",
        "name": "S-MX",
        "russianName": "СМИкс"
      },
      {
        "id": "HONDA_THATS",
        "name": "That'S",
        "russianName": "That S"
      },
      {
        "id": "HONDA_TODAY",
        "name": "Today",
        "russianName": "Тудей"
      },
      {
        "id": "HONDA_TORNEO",
        "name": "Torneo",
        "russianName": "Торнео"
      },
      {
        "id": "HONDA_UR_V",
        "name": "UR-V",
        "russianName": "ЮР-В"
      },
      {
        "id": "HONDA_VAMOS",
        "name": "Vamos",
        "russianName": "Вамос"
      },
      {
        "id": "HONDA_VEZEL",
        "name": "Vezel",
        "russianName": "Везел"
      },
      {
        "id": "HONDA_VIGOR",
        "name": "Vigor",
        "russianName": "Вигор"
      },
      {
        "id": "HONDA_WRV",
        "name": "WR-V",
        "russianName": "ВР-В"
      },
      {
        "id": "HONDA_XR_V",
        "name": "XR-V",
        "russianName": "ХР-В"
      },
      {
        "id": "HONDA_YE_P7",
        "name": "Ye P7",
        "russianName": "Ё П7"
      },
      {
        "id": "HONDA_YE_S7",
        "name": "Ye S7",
        "russianName": "Ё С7"
      },
      {
        "id": "HONDA_Z",
        "name": "Z",
        "russianName": "Z"
      },
      {
        "id": "HONDA_ZEST",
        "name": "Zest",
        "russianName": "Зест"
      },
      {
        "id": "HONDA_ZR_V",
        "name": "ZR-V",
        "russianName": "ЗР-В"
      }
    ]
  },
  "HONGQI": {
    "id": "HONGQI",
    "name": "Hongqi",
    "russianName": "Хончи",
    "models": [
      {
        "id": "HONGQI_EH7",
        "name": "EH7",
        "russianName": "ЕХ7"
      },
      {
        "id": "HONGQI_E_HS3",
        "name": "E-HS3",
        "russianName": "Е-ХС3"
      },
      {
        "id": "HONGQI_E_HS7",
        "name": "E-HS7",
        "russianName": "Е-ХС7"
      },
      {
        "id": "HONGQI_E_HS9",
        "name": "E-HS9",
        "russianName": "Е-ХС9"
      },
      {
        "id": "HONGQI_E_QM5",
        "name": "E-QM5",
        "russianName": "Е-КьюМ5"
      },
      {
        "id": "HONGQI_H5",
        "name": "H5",
        "russianName": "Х5"
      },
      {
        "id": "HONGQI_H6",
        "name": "H6",
        "russianName": "Эйч6"
      },
      {
        "id": "HONGQI_H7",
        "name": "H7",
        "russianName": "Х7"
      },
      {
        "id": "HONGQI_H9",
        "name": "H9",
        "russianName": "Х9"
      },
      {
        "id": "HONGQI_HQ9",
        "name": "HQ9",
        "russianName": "ЭйчКью 9"
      },
      {
        "id": "HONGQI_HS3",
        "name": "HS3",
        "russianName": "ХС3"
      },
      {
        "id": "HONGQI_HS5",
        "name": "HS5",
        "russianName": "ХС5"
      },
      {
        "id": "HONGQI_HS6",
        "name": "HS6",
        "russianName": "ХС6"
      },
      {
        "id": "HONGQI_HS7",
        "name": "HS7",
        "russianName": "хс7"
      },
      {
        "id": "HONGQI_L1",
        "name": "L1 (Guoya)",
        "russianName": "Л1"
      },
      {
        "id": "HONGQI_L5",
        "name": "L5",
        "russianName": "Л5"
      },
      {
        "id": "HONGQI_LS7",
        "name": "LS7",
        "russianName": "ЛС7"
      },
      {
        "id": "HONGQI_TIANGONG_05",
        "name": "Tiangong 05",
        "russianName": "Тиангонг 05"
      },
      {
        "id": "HONGQI_TIANGONG_06",
        "name": "Tiangong 06",
        "russianName": "Тиангонг 06"
      },
      {
        "id": "HONGQI_TIANGONG_08",
        "name": "Tiangong 08",
        "russianName": "Тиангонг 08"
      }
    ]
  },
  "HORCH": {
    "id": "HORCH",
    "name": "Horch",
    "russianName": "Хорьх",
    "models": [
      {
        "id": "HORCH_830",
        "name": "830",
        "russianName": "830"
      },
      {
        "id": "HORCH_853",
        "name": "853",
        "russianName": "853"
      },
      {
        "id": "HORCH_901",
        "name": "901",
        "russianName": "901"
      }
    ]
  },
  "HOZON": {
    "id": "HOZON",
    "name": "Hozon",
    "russianName": "Хозон",
    "models": [
      {
        "id": "HOZON_NETA_GT",
        "name": "Neta GT",
        "russianName": "Нета ГТ"
      },
      {
        "id": "HOZON_NETA_L",
        "name": "Neta L",
        "russianName": "Нета Л"
      },
      {
        "id": "HOZON_NETA_S",
        "name": "Neta S",
        "russianName": "Нета С"
      },
      {
        "id": "HOZON_NETA_U",
        "name": "Neta U",
        "russianName": "Нета Ю"
      },
      {
        "id": "HOZON_NETA_U_II",
        "name": "Neta U-II",
        "russianName": "Нета Ю-2"
      },
      {
        "id": "HOZON_NETA_V",
        "name": "Neta V",
        "russianName": "Нета Ви"
      },
      {
        "id": "HOZON_NETA_X",
        "name": "Neta X",
        "russianName": "Нета Икс"
      }
    ]
  },
  "HSV": {
    "id": "HSV",
    "name": "HSV",
    "russianName": "ХСВ",
    "models": [
      {
        "id": "HSV_MALOO",
        "name": "Maloo",
        "russianName": "Малу"
      }
    ]
  },
  "HUAIHAI_HOANN": {
    "id": "HUAIHAI_HOANN",
    "name": "Huaihai (Hoann)",
    "russianName": "Хуайхай (Хоанн)",
    "models": [
      {
        "id": "HUAIHAI_HOANN_EK01",
        "name": "EK01",
        "russianName": "ЕК01"
      }
    ]
  },
  "HUANGHAI": {
    "id": "HUANGHAI",
    "name": "HuangHai",
    "russianName": "ХуангХай",
    "models": [
      {
        "id": "HUANGHAI_ANTELOPE",
        "name": "Antelope",
        "russianName": "Антелоп"
      },
      {
        "id": "HUANGHAI_LANDSCAPE",
        "name": "Landscape",
        "russianName": "Лендскейп"
      },
      {
        "id": "HUANGHAI_N1",
        "name": "N1",
        "russianName": "Н1"
      },
      {
        "id": "HUANGHAI_N7",
        "name": "N7",
        "russianName": "Н7"
      },
      {
        "id": "HUANGHAI_PLUTUS",
        "name": "Plutus",
        "russianName": "Плютус"
      }
    ]
  },
  "HUAZI": {
    "id": "HUAZI",
    "name": "Huazi",
    "russianName": "Хуацзы",
    "models": [
      {
        "id": "HUAZI_OMEGA",
        "name": "Omega",
        "russianName": "Омега"
      }
    ]
  },
  "HUDSON": {
    "id": "HUDSON",
    "name": "Hudson",
    "russianName": "Хадсон",
    "models": [
      {
        "id": "HUDSON_CUSTOM_EIGHT",
        "name": "Custom Eight",
        "russianName": "Кастом Эйт"
      },
      {
        "id": "HUDSON_DELUXE_EIGHT",
        "name": "Deluxe Eight",
        "russianName": "Делюкс Эйт"
      },
      {
        "id": "HUDSON_SUPER_SIX",
        "name": "Super Six",
        "russianName": "супер сикс"
      }
    ]
  },
  "HUMBER": {
    "id": "HUMBER",
    "name": "Humber",
    "russianName": "Хамбер",
    "models": [
      {
        "id": "HUMBER_HAWK",
        "name": "Hawk",
        "russianName": "Хок"
      }
    ]
  },
  "HUMMER": {
    "id": "HUMMER",
    "name": "Hummer",
    "russianName": "Хаммер",
    "models": [
      {
        "id": "HUMMER_H1",
        "name": "H1",
        "russianName": "н1"
      },
      {
        "id": "HUMMER_H2",
        "name": "H2",
        "russianName": "н2"
      },
      {
        "id": "HUMMER_H3",
        "name": "H3",
        "russianName": "н3"
      }
    ]
  },
  "HYCAN": {
    "id": "HYCAN",
    "name": "Hycan",
    "russianName": "Хикан",
    "models": [
      {
        "id": "HYCAN_007",
        "name": "007",
        "russianName": "007"
      },
      {
        "id": "HYCAN_A06",
        "name": "A06",
        "russianName": "А06"
      },
      {
        "id": "HYCAN_V09",
        "name": "V09",
        "russianName": "B09"
      },
      {
        "id": "HYCAN_Z03",
        "name": "Z03",
        "russianName": "З03"
      }
    ]
  },
  "HYPERION": {
    "id": "HYPERION",
    "name": "Hyperion",
    "russianName": "Гиперион",
    "models": [
      {
        "id": "HYPERION_XP_1",
        "name": "XP-1",
        "russianName": "ИксП-1"
      }
    ]
  },
  "HYUNDAI": {
    "id": "HYUNDAI",
    "name": "יונדאי",
    "russianName": "Хендэ",
    "models": [
      {
        "id": "HYUNDAI_ACCENT",
        "name": "Accent",
        "russianName": "Акцент"
      },
      {
        "id": "HYUNDAI_ALCAZAR",
        "name": "Alcazar",
        "russianName": "Алказар"
      },
      {
        "id": "HYUNDAI_ASLAN",
        "name": "Aslan",
        "russianName": "Аслан"
      },
      {
        "id": "HYUNDAI_ATOS",
        "name": "Atos",
        "russianName": "Атос"
      },
      {
        "id": "HYUNDAI_AVANTE",
        "name": "Avante",
        "russianName": "Авант"
      },
      {
        "id": "HYUNDAI_AVANTE_N",
        "name": "Avante N",
        "russianName": "Аванте Н"
      },
      {
        "id": "HYUNDAI_AZERA",
        "name": "Azera",
        "russianName": "азера"
      },
      {
        "id": "HYUNDAI_BAYON",
        "name": "Bayon",
        "russianName": "Байон"
      },
      {
        "id": "HYUNDAI_CASPER",
        "name": "Casper",
        "russianName": "Каспер"
      },
      {
        "id": "HYUNDAI_CELESTA",
        "name": "Celesta",
        "russianName": "Селеста"
      },
      {
        "id": "HYUNDAI_CENTENNIAL",
        "name": "Centennial",
        "russianName": "Сентенниал"
      },
      {
        "id": "HYUNDAI_CLICK",
        "name": "Click",
        "russianName": "Клик"
      },
      {
        "id": "HYUNDAI_COUPE",
        "name": "Coupe",
        "russianName": "Купе"
      },
      {
        "id": "HYUNDAI_CRETA",
        "name": "Creta",
        "russianName": "Крета"
      },
      {
        "id": "HYUNDAI_CUSTIN",
        "name": "Custin",
        "russianName": "Кустин"
      },
      {
        "id": "HYUNDAI_CUSTO",
        "name": "Custo",
        "russianName": "Касто"
      },
      {
        "id": "HYUNDAI_DYNASTY",
        "name": "Dynasty",
        "russianName": "Династи"
      },
      {
        "id": "HYUNDAI_ELANTRA",
        "name": "Elantra",
        "russianName": "Элантра"
      },
      {
        "id": "HYUNDAI_ELANTRA_N",
        "name": "Elantra N",
        "russianName": "Элантра Н"
      },
      {
        "id": "HYUNDAI_ELEXIO",
        "name": "Elexio",
        "russianName": "Илексио"
      },
      {
        "id": "HYUNDAI_ENCINO",
        "name": "Encino",
        "russianName": "Инсино"
      },
      {
        "id": "HYUNDAI_ENTOURAGE",
        "name": "Entourage",
        "russianName": "Энтураж"
      },
      {
        "id": "HYUNDAI_EON",
        "name": "EON",
        "russianName": "еон"
      },
      {
        "id": "HYUNDAI_EQUUS",
        "name": "Equus",
        "russianName": "Экус"
      },
      {
        "id": "HYUNDAI_EXCEL",
        "name": "Excel",
        "russianName": "Эксель"
      },
      {
        "id": "HYUNDAI_EXTER",
        "name": "Exter",
        "russianName": "Экстер"
      },
      {
        "id": "HYUNDAI_GALLOPER",
        "name": "Galloper",
        "russianName": "Галлопер"
      },
      {
        "id": "HYUNDAI_GENESIS",
        "name": "ג'נסיס",
        "russianName": "Дженесис"
      },
      {
        "id": "HYUNDAI_GENESIS_COUPE",
        "name": "Genesis Coupe",
        "russianName": "Дженесис Купе"
      },
      {
        "id": "HYUNDAI_GETZ",
        "name": "Getz",
        "russianName": "Гетц"
      },
      {
        "id": "HYUNDAI_GRACE",
        "name": "Grace",
        "russianName": "Грейс"
      },
      {
        "id": "HYUNDAI_GRANDEUR",
        "name": "Grandeur",
        "russianName": "Грандер"
      },
      {
        "id": "HYUNDAI_GRAND_STAREX",
        "name": "Grand Starex",
        "russianName": "Гранд Старекс"
      },
      {
        "id": "HYUNDAI_H200",
        "name": "H200",
        "russianName": "н200"
      },
      {
        "id": "HYUNDAI_HB20",
        "name": "HB20",
        "russianName": "ЭйчБ20"
      },
      {
        "id": "HYUNDAI_H_1_STAREX",
        "name": "H-1",
        "russianName": "Н-1"
      },
      {
        "id": "HYUNDAI_I10",
        "name": "i10",
        "russianName": "i10"
      },
      {
        "id": "HYUNDAI_I20",
        "name": "i20",
        "russianName": "i20"
      },
      {
        "id": "HYUNDAI_I20_N",
        "name": "i20 N",
        "russianName": "Ай20 Н"
      },
      {
        "id": "HYUNDAI_I30",
        "name": "i30",
        "russianName": "i30"
      },
      {
        "id": "HYUNDAI_I30_N",
        "name": "i30 N",
        "russianName": "i30 N"
      },
      {
        "id": "HYUNDAI_I40",
        "name": "i40",
        "russianName": "i40"
      },
      {
        "id": "HYUNDAI_INSTER",
        "name": "Inster",
        "russianName": "Инстер"
      },
      {
        "id": "HYUNDAI_IONIQ",
        "name": "IONIQ",
        "russianName": "Ионик"
      },
      {
        "id": "HYUNDAI_IONIQ_5",
        "name": "IONIQ 5",
        "russianName": "ИОНИК 5"
      },
      {
        "id": "HYUNDAI_IONIQ_5_N",
        "name": "IONIQ 5 N",
        "russianName": "ИОНИК 5 Н"
      },
      {
        "id": "HYUNDAI_IONIQ_6",
        "name": "IONIQ 6",
        "russianName": "ИОНИК 6"
      },
      {
        "id": "HYUNDAI_IONIQ_9",
        "name": "IONIQ 9",
        "russianName": "ИОНИК 9"
      },
      {
        "id": "HYUNDAI_IX20",
        "name": "ix20",
        "russianName": "ix20"
      },
      {
        "id": "HYUNDAI_IX25",
        "name": "ix25",
        "russianName": "АйИкс25"
      },
      {
        "id": "HYUNDAI_IX35",
        "name": "ix35",
        "russianName": "ix35"
      },
      {
        "id": "HYUNDAI_IX55",
        "name": "ix55",
        "russianName": "ix55"
      },
      {
        "id": "HYUNDAI_KONA",
        "name": "Kona",
        "russianName": "Кона"
      },
      {
        "id": "HYUNDAI_KONA_N",
        "name": "Kona N",
        "russianName": "Кона Н"
      },
      {
        "id": "HYUNDAI_LAFESTA",
        "name": "Lafesta",
        "russianName": "Лафеста"
      },
      {
        "id": "HYUNDAI_LANTRA",
        "name": "Lantra",
        "russianName": "Лантра"
      },
      {
        "id": "HYUNDAI_LAVITA",
        "name": "Lavita",
        "russianName": "Лавита"
      },
      {
        "id": "HYUNDAI_MARCIA",
        "name": "Marcia",
        "russianName": "Марсиа"
      },
      {
        "id": "HYUNDAI_MATRIX",
        "name": "Matrix",
        "russianName": "Матрикс"
      },
      {
        "id": "HYUNDAI_MAXCRUZ",
        "name": "Maxcruz",
        "russianName": "Макскруз"
      },
      {
        "id": "HYUNDAI_MISTRA",
        "name": "Mistra",
        "russianName": "Мистра"
      },
      {
        "id": "HYUNDAI_MUFASA",
        "name": "Mufasa",
        "russianName": "Муфаса"
      },
      {
        "id": "HYUNDAI_NEXO",
        "name": "Nexo",
        "russianName": "Нексо"
      },
      {
        "id": "HYUNDAI_PALISADE",
        "name": "Palisade",
        "russianName": "Палисад"
      },
      {
        "id": "HYUNDAI_PONY",
        "name": "Pony",
        "russianName": "Пони"
      },
      {
        "id": "HYUNDAI_SANTAMO",
        "name": "Santamo",
        "russianName": "Сантамо"
      },
      {
        "id": "HYUNDAI_SANTA_CRUZ",
        "name": "Santa Cruz",
        "russianName": "Санта Круз"
      },
      {
        "id": "HYUNDAI_SANTA_FE",
        "name": "Santa Fe",
        "russianName": "Санта Фе"
      },
      {
        "id": "HYUNDAI_SANTRO",
        "name": "Santro",
        "russianName": "Сантро"
      },
      {
        "id": "HYUNDAI_SCOUPE",
        "name": "Scoupe",
        "russianName": "С купе"
      },
      {
        "id": "HYUNDAI_SOLARIS",
        "name": "Solaris",
        "russianName": "Солярис"
      },
      {
        "id": "HYUNDAI_SONATA",
        "name": "Sonata",
        "russianName": "Соната"
      },
      {
        "id": "HYUNDAI_STAREX",
        "name": "Starex",
        "russianName": "Старекс"
      },
      {
        "id": "HYUNDAI_STARGAZER",
        "name": "Stargazer",
        "russianName": "Старгейзер"
      },
      {
        "id": "HYUNDAI_STARIA",
        "name": "Staria",
        "russianName": "Стария"
      },
      {
        "id": "HYUNDAI_STELLAR",
        "name": "Stellar",
        "russianName": "Стеллар"
      },
      {
        "id": "HYUNDAI_TERRACAN",
        "name": "Terracan",
        "russianName": "Терракан"
      },
      {
        "id": "HYUNDAI_TIBURON",
        "name": "Tiburon",
        "russianName": "Тибурон"
      },
      {
        "id": "HYUNDAI_TRAJET",
        "name": "Trajet",
        "russianName": "Траджет"
      },
      {
        "id": "HYUNDAI_TUCSON",
        "name": "Tucson",
        "russianName": "Туксон"
      },
      {
        "id": "HYUNDAI_TUSCANI",
        "name": "Tuscani",
        "russianName": "Тускани"
      },
      {
        "id": "HYUNDAI_VELOSTER",
        "name": "Veloster",
        "russianName": "Велостер"
      },
      {
        "id": "HYUNDAI_VENUE",
        "name": "Venue",
        "russianName": "Венуе"
      },
      {
        "id": "HYUNDAI_VERACRUZ",
        "name": "Veracruz",
        "russianName": "Веракруз"
      },
      {
        "id": "HYUNDAI_VERNA",
        "name": "Verna",
        "russianName": "Верна"
      },
      {
        "id": "HYUNDAI_XG",
        "name": "XG",
        "russianName": "XG"
      }
    ]
  },
  "ICAR": {
    "id": "ICAR",
    "name": "iCar",
    "russianName": "ИКар",
    "models": [
      {
        "id": "ICAR_03",
        "name": "03",
        "russianName": "03"
      },
      {
        "id": "ICAR_V23",
        "name": "V23",
        "russianName": "В23"
      }
    ]
  },
  "ICAUR": {
    "id": "ICAUR",
    "name": "iCaur",
    "russianName": "айКаур",
    "models": [
      {
        "id": "ICAUR_V27",
        "name": "V27",
        "russianName": "В27"
      }
    ]
  },
  "IG": {
    "id": "IG",
    "name": "Иж",
    "russianName": "ИЖ",
    "models": [
      {
        "id": "IG_2125",
        "name": "2125 «Комби»",
        "russianName": "2125 Комби"
      },
      {
        "id": "IG_2126",
        "name": "2126 «Ода»",
        "russianName": "2126 Ода"
      },
      {
        "id": "IG_21261_FABULA",
        "name": "21261 «Фабула»",
        "russianName": "21261 Фабула"
      },
      {
        "id": "IG_2715",
        "name": "2715",
        "russianName": "2715"
      },
      {
        "id": "IG_2717",
        "name": "2717",
        "russianName": "2717"
      },
      {
        "id": "IG_27175",
        "name": "27175",
        "russianName": "27175"
      },
      {
        "id": "IG_412",
        "name": "Москвич-412",
        "russianName": "412"
      }
    ]
  },
  "IM_MOTORS": {
    "id": "IM_MOTORS",
    "name": "IM Motors (Zhiji)",
    "russianName": "Им Моторс",
    "models": [
      {
        "id": "IM_MOTORS_L6",
        "name": "L6",
        "russianName": "Л6"
      },
      {
        "id": "IM_MOTORS_L7",
        "name": "L7",
        "russianName": "Л7"
      },
      {
        "id": "IM_MOTORS_LS6",
        "name": "LS6",
        "russianName": "ЛС6"
      },
      {
        "id": "IM_MOTORS_LS7",
        "name": "LS7",
        "russianName": "ЛС7"
      },
      {
        "id": "IM_MOTORS_LS9",
        "name": "LS9",
        "russianName": "ЛС9"
      }
    ]
  },
  "INEOS": {
    "id": "INEOS",
    "name": "Ineos",
    "russianName": "Инеос",
    "models": [
      {
        "id": "INEOS_GRENADIER",
        "name": "Grenadier",
        "russianName": "Гренадер"
      }
    ]
  },
  "INFINITI": {
    "id": "INFINITI",
    "name": "אינפיניטי",
    "russianName": "Инфинити",
    "models": [
      {
        "id": "INFINITI_EX",
        "name": "EX",
        "russianName": "EX"
      },
      {
        "id": "INFINITI_FX",
        "name": "FX",
        "russianName": "FX"
      },
      {
        "id": "INFINITI_G35",
        "name": "G",
        "russianName": "G"
      },
      {
        "id": "INFINITI_I",
        "name": "I",
        "russianName": "I"
      },
      {
        "id": "INFINITI_J30",
        "name": "J",
        "russianName": "J"
      },
      {
        "id": "INFINITI_JX",
        "name": "JX",
        "russianName": "джей икс"
      },
      {
        "id": "INFINITI_M",
        "name": "M",
        "russianName": "M"
      },
      {
        "id": "INFINITI_Q",
        "name": "Q",
        "russianName": "Q"
      },
      {
        "id": "INFINITI_Q30",
        "name": "Q30",
        "russianName": "ку 30"
      },
      {
        "id": "INFINITI_Q40",
        "name": "Q40",
        "russianName": "ку 40"
      },
      {
        "id": "INFINITI_Q50",
        "name": "Q50",
        "russianName": "Q50"
      },
      {
        "id": "INFINITI_Q60",
        "name": "Q60",
        "russianName": "ку 60"
      },
      {
        "id": "INFINITI_Q70",
        "name": "Q70",
        "russianName": "ку 70"
      },
      {
        "id": "INFINITI_QX30",
        "name": "QX30",
        "russianName": "ку икс 30"
      },
      {
        "id": "INFINITI_QX4",
        "name": "QX4",
        "russianName": "Ку Икс 4"
      },
      {
        "id": "INFINITI_QX50",
        "name": "QX50",
        "russianName": "ку икс 50"
      },
      {
        "id": "INFINITI_QX55",
        "name": "QX55",
        "russianName": "КуИкс55"
      },
      {
        "id": "INFINITI_QX56",
        "name": "QX56",
        "russianName": "QX56"
      },
      {
        "id": "INFINITI_QX60",
        "name": "QX60",
        "russianName": "ку икс 60"
      },
      {
        "id": "INFINITI_QX70",
        "name": "QX70",
        "russianName": "ку икс 70"
      },
      {
        "id": "INFINITI_QX80",
        "name": "QX80",
        "russianName": "ку икс 80"
      }
    ]
  },
  "INNOCENTI": {
    "id": "INNOCENTI",
    "name": "Innocenti",
    "russianName": "Инноченти",
    "models": [
      {
        "id": "INNOCENTI_ELBA",
        "name": "Elba",
        "russianName": "ельба"
      },
      {
        "id": "INNOCENTI_MILLE",
        "name": "Mille",
        "russianName": "милле"
      },
      {
        "id": "INNOCENTI_MINI",
        "name": "מיני",
        "russianName": "мини"
      }
    ]
  },
  "INTERNATIONAL": {
    "id": "INTERNATIONAL",
    "name": "International Harvester",
    "russianName": "Интернейшионал Харвестер",
    "models": [
      {
        "id": "INTERNATIONAL_SCOUT",
        "name": "Scout",
        "russianName": "Скаут"
      },
      {
        "id": "INTERNATIONAL_TRAVELALL",
        "name": "Travelall",
        "russianName": "Трэйвелолл"
      }
    ]
  },
  "INVICTA": {
    "id": "INVICTA",
    "name": "Invicta",
    "russianName": "Инвикта",
    "models": [
      {
        "id": "INVICTA_S1",
        "name": "S1",
        "russianName": "с1"
      }
    ]
  },
  "IRAN_KHODRO": {
    "id": "IRAN_KHODRO",
    "name": "Iran Khodro",
    "russianName": "Иран Ходро",
    "models": [
      {
        "id": "IRAN_KHODRO_ARISUN",
        "name": "Arisun",
        "russianName": "арисун"
      },
      {
        "id": "IRAN_KHODRO_DENA",
        "name": "Dena",
        "russianName": "дена"
      },
      {
        "id": "IRAN_KHODRO_PAYKAN",
        "name": "Paykan",
        "russianName": "Пайкан"
      },
      {
        "id": "IRAN_KHODRO_RUNNA",
        "name": "Runna",
        "russianName": "рунна"
      },
      {
        "id": "IRAN_KHODRO_SAHRA",
        "name": "Sahra",
        "russianName": "Сахра"
      },
      {
        "id": "IRAN_KHODRO_SAMAND",
        "name": "Samand",
        "russianName": "саманд"
      },
      {
        "id": "IRAN_KHODRO_SARIR",
        "name": "Sarir",
        "russianName": "сарир"
      },
      {
        "id": "IRAN_KHODRO_SOREN",
        "name": "Soren",
        "russianName": "сорен"
      },
      {
        "id": "IRAN_KHODRO_TARA",
        "name": "Tara",
        "russianName": "Тара"
      }
    ]
  },
  "ISDERA": {
    "id": "ISDERA",
    "name": "Isdera",
    "russianName": "Исдера",
    "models": [
      {
        "id": "ISDERA_COMMENDATORE_112I",
        "name": "Commendatore 112i",
        "russianName": "Коммендаторе 112i"
      },
      {
        "id": "ISDERA_IMPERATOR_108I",
        "name": "Imperator 108i",
        "russianName": "Император 108i"
      },
      {
        "id": "ISDERA_SPYDER",
        "name": "Spyder",
        "russianName": "спайдер"
      }
    ]
  },
  "ISUZU": {
    "id": "ISUZU",
    "name": "איסוזו",
    "russianName": "Исузу",
    "models": [
      {
        "id": "ISUZU_117",
        "name": "117",
        "russianName": "117"
      },
      {
        "id": "ISUZU_AMIGO",
        "name": "Amigo",
        "russianName": "амиго"
      },
      {
        "id": "ISUZU_ASCENDER",
        "name": "Ascender",
        "russianName": "Асендер"
      },
      {
        "id": "ISUZU_ASKA",
        "name": "Aska",
        "russianName": "Аска"
      },
      {
        "id": "ISUZU_AXIOM",
        "name": "Axiom",
        "russianName": "аксиом"
      },
      {
        "id": "ISUZU_BELLETT",
        "name": "Bellett",
        "russianName": "Беллетт"
      },
      {
        "id": "ISUZU_BIGHORN",
        "name": "Bighorn",
        "russianName": "Бигхорн"
      },
      {
        "id": "ISUZU_D_MAX",
        "name": "D-Max",
        "russianName": "Д-Макс"
      },
      {
        "id": "ISUZU_FARGO",
        "name": "Fargo",
        "russianName": "Фарго"
      },
      {
        "id": "ISUZU_FARGO_FILLY",
        "name": "Fargo Filly",
        "russianName": "Фарго Филли"
      },
      {
        "id": "ISUZU_FLORIAN",
        "name": "Florian",
        "russianName": "Флориан"
      },
      {
        "id": "ISUZU_GEMINI",
        "name": "Gemini",
        "russianName": "Джемини"
      },
      {
        "id": "ISUZU_HOMBRE",
        "name": "Hombre",
        "russianName": "Хомбрэ"
      },
      {
        "id": "ISUZU_IMPULSE",
        "name": "Impulse",
        "russianName": "Импульс"
      },
      {
        "id": "ISUZU_KB",
        "name": "KB",
        "russianName": "КБ"
      },
      {
        "id": "ISUZU_LINGTUO",
        "name": "Lingtuo",
        "russianName": "Лингтуо"
      },
      {
        "id": "ISUZU_MIDI",
        "name": "Midi",
        "russianName": "Миди"
      },
      {
        "id": "ISUZU_MU",
        "name": "MU",
        "russianName": "му"
      },
      {
        "id": "ISUZU_MU_7",
        "name": "MU-7",
        "russianName": "му-7"
      },
      {
        "id": "ISUZU_MU_X",
        "name": "MU-X",
        "russianName": "му-х"
      },
      {
        "id": "ISUZU_OASIS",
        "name": "Oasis",
        "russianName": "Оазис"
      },
      {
        "id": "ISUZU_PIAZZA",
        "name": "Piazza",
        "russianName": "пиаза"
      },
      {
        "id": "ISUZU_RODEO",
        "name": "Rodeo",
        "russianName": "родео"
      },
      {
        "id": "ISUZU_STYLUS",
        "name": "Stylus",
        "russianName": "Стилус"
      },
      {
        "id": "ISUZU_T17",
        "name": "T17",
        "russianName": "Т17"
      },
      {
        "id": "ISUZU_T30_EXPLORER",
        "name": "T30 Explorer",
        "russianName": "Е30 Эксплорер"
      },
      {
        "id": "ISUZU_TF",
        "name": "TF (Pickup)",
        "russianName": "ТФ"
      },
      {
        "id": "ISUZU_TROOPER",
        "name": "Trooper",
        "russianName": "Трупер"
      },
      {
        "id": "ISUZU_VEHI_CROSS",
        "name": "VehiCross",
        "russianName": "Викросс"
      },
      {
        "id": "ISUZU_WIZARD",
        "name": "Wizard",
        "russianName": "Визард"
      }
    ]
  },
  "IVECO": {
    "id": "IVECO",
    "name": "Iveco",
    "russianName": "Ивеко",
    "models": [
      {
        "id": "IVECO_MASSIF",
        "name": "Massif",
        "russianName": "Массиф"
      }
    ]
  },
  "JAC": {
    "id": "JAC",
    "name": "JAC",
    "russianName": "Джак",
    "models": [
      {
        "id": "JAC_A5",
        "name": "A5",
        "russianName": "А5"
      },
      {
        "id": "JAC_E30X",
        "name": "E30X",
        "russianName": "Е30Икс"
      },
      {
        "id": "JAC_HUNTER",
        "name": "Hunter",
        "russianName": "Хантер"
      },
      {
        "id": "JAC_IEV7L",
        "name": "iEV7L",
        "russianName": "Айев7л"
      },
      {
        "id": "JAC_IEV7S",
        "name": "iEV7S",
        "russianName": "иев7с"
      },
      {
        "id": "JAC_IEVA50",
        "name": "iEVA50",
        "russianName": "Айева50"
      },
      {
        "id": "JAC_IEVS4",
        "name": "iEVS4",
        "russianName": "ИЕВС4"
      },
      {
        "id": "JAC_J2",
        "name": "J2 (Yueyue)",
        "russianName": "J2"
      },
      {
        "id": "JAC_J3",
        "name": "J3 (Tongyue,Tojoy)",
        "russianName": "J3"
      },
      {
        "id": "JAC_J4",
        "name": "J4 (Heyue A30)",
        "russianName": "J4"
      },
      {
        "id": "JAC_J5",
        "name": "J5 (Heyue)",
        "russianName": "J5"
      },
      {
        "id": "JAC_J6",
        "name": "J6 (Heyue RS)",
        "russianName": "J6"
      },
      {
        "id": "JAC_J7",
        "name": "J7",
        "russianName": "J7"
      },
      {
        "id": "JAC_J7_BINYUE",
        "name": "J7 (Binyue)",
        "russianName": "J7 Биньюэ"
      },
      {
        "id": "JAC_JIAYUE_X7",
        "name": "Jiayue X7",
        "russianName": "Цзяюе"
      },
      {
        "id": "JAC_JS2",
        "name": "JS2",
        "russianName": "ДжейЭс2"
      },
      {
        "id": "JAC_JS2_PRO",
        "name": "JS2 Pro",
        "russianName": "ДжейЭс2 Про"
      },
      {
        "id": "JAC_JS3",
        "name": "JS3",
        "russianName": "ДжейЭс3"
      },
      {
        "id": "JAC_JS4",
        "name": "JS4",
        "russianName": "ДжиЭс4"
      },
      {
        "id": "JAC_JS5",
        "name": "JS5",
        "russianName": "ДжиЭс5"
      },
      {
        "id": "JAC_JS6",
        "name": "JS6",
        "russianName": "ДжиЭс6"
      },
      {
        "id": "JAC_JS9",
        "name": "JS9",
        "russianName": "ДжейЭс9"
      },
      {
        "id": "JAC_M4",
        "name": "M4",
        "russianName": "Эм4"
      },
      {
        "id": "JAC_M5",
        "name": "M5",
        "russianName": "м5"
      },
      {
        "id": "JAC_REFINE",
        "name": "M1 (Refine)",
        "russianName": "M1 Рефайн"
      },
      {
        "id": "JAC_REFINE_L6_MAX",
        "name": "Refine L6 Max",
        "russianName": "Рефин Л6 Макс"
      },
      {
        "id": "JAC_REFINE_M3",
        "name": "Refine M3",
        "russianName": "Рефин М3"
      },
      {
        "id": "JAC_REFINE_RF8",
        "name": "Refine RF8",
        "russianName": "Рефайн РФ8"
      },
      {
        "id": "JAC_S1_REIN",
        "name": "S1 (Rein)",
        "russianName": "С1 (Рейн)"
      },
      {
        "id": "JAC_S3_PRO",
        "name": "S3 Pro",
        "russianName": "Эс 3 Про"
      },
      {
        "id": "JAC_S4",
        "name": "S4",
        "russianName": "C4"
      },
      {
        "id": "JAC_S5",
        "name": "S5 (Eagle)",
        "russianName": "С5 (Игл)"
      },
      {
        "id": "JAC_S6",
        "name": "S6",
        "russianName": "С6"
      },
      {
        "id": "JAC_S7",
        "name": "S7",
        "russianName": "С7"
      },
      {
        "id": "JAC_SEHOL_A5_PLUS",
        "name": "Sehol A5 Plus",
        "russianName": "Сехол А5 Плюс"
      },
      {
        "id": "JAC_SEHOL_AIPAO",
        "name": "Sehol Aipao",
        "russianName": "Сехол Айпао"
      },
      {
        "id": "JAC_SEHOL_E20X",
        "name": "Sehol E20X",
        "russianName": "Сехол Е20Х"
      },
      {
        "id": "JAC_SEHOL_X6",
        "name": "Sehol X6",
        "russianName": "Сехол Икс6"
      },
      {
        "id": "JAC_SEHOL_X8",
        "name": "Sehol X8",
        "russianName": "Сехол Икс8"
      },
      {
        "id": "JAC_SEHOL_X8_PLUS",
        "name": "Sehol X8 Plus",
        "russianName": "Сехол Икс8 плюс"
      },
      {
        "id": "JAC_S_2",
        "name": "S2",
        "russianName": "с2"
      },
      {
        "id": "JAC_S_3",
        "name": "S3",
        "russianName": "с3"
      },
      {
        "id": "JAC_T6",
        "name": "T6",
        "russianName": "Т6"
      },
      {
        "id": "JAC_T8",
        "name": "T8",
        "russianName": "т8"
      },
      {
        "id": "JAC_T8_PRO",
        "name": "T8 Pro",
        "russianName": "т8 про"
      },
      {
        "id": "JAC_T9",
        "name": "T9",
        "russianName": "Т9"
      }
    ]
  },
  "JAECOO": {
    "id": "JAECOO",
    "name": "Jaecoo",
    "russianName": "Джейку",
    "models": [
      {
        "id": "JAECOO_J5",
        "name": "J5",
        "russianName": "Джей5"
      },
      {
        "id": "JAECOO_J7",
        "name": "J7",
        "russianName": "Джей7"
      },
      {
        "id": "JAECOO_J8",
        "name": "J8",
        "russianName": "Джей8"
      }
    ]
  },
  "JAGUAR": {
    "id": "JAGUAR",
    "name": "יגואר",
    "russianName": "Ягуар",
    "models": [
      {
        "id": "JAGUAR_E_PACE",
        "name": "E-Pace",
        "russianName": "Е-Пейс"
      },
      {
        "id": "JAGUAR_E_TYPE",
        "name": "E-type",
        "russianName": "Е-Тайп"
      },
      {
        "id": "JAGUAR_F_PACE",
        "name": "F-Pace",
        "russianName": "F-Pace"
      },
      {
        "id": "JAGUAR_F_TYPE",
        "name": "F-Type",
        "russianName": "Ф-Тайп"
      },
      {
        "id": "JAGUAR_I_PACE",
        "name": "I-Pace",
        "russianName": "Ай-Пейс"
      },
      {
        "id": "JAGUAR_MARK_2",
        "name": "Mark 2",
        "russianName": "Марк 2"
      },
      {
        "id": "JAGUAR_MARK_IX",
        "name": "Mark IX",
        "russianName": "Марк 9"
      },
      {
        "id": "JAGUAR_S_TYPE",
        "name": "S-Type",
        "russianName": "S-type"
      },
      {
        "id": "JAGUAR_XE",
        "name": "XE",
        "russianName": "XE"
      },
      {
        "id": "JAGUAR_XF",
        "name": "XF",
        "russianName": "XF"
      },
      {
        "id": "JAGUAR_XFR",
        "name": "XFR",
        "russianName": "XFR"
      },
      {
        "id": "JAGUAR_XJ",
        "name": "XJ",
        "russianName": "XJ"
      },
      {
        "id": "JAGUAR_XJ220",
        "name": "XJ220",
        "russianName": "XJ220"
      },
      {
        "id": "JAGUAR_XJR",
        "name": "XJR",
        "russianName": "XJR"
      },
      {
        "id": "JAGUAR_XJS",
        "name": "XJS",
        "russianName": "XJS"
      },
      {
        "id": "JAGUAR_XK",
        "name": "XK",
        "russianName": "XK"
      },
      {
        "id": "JAGUAR_XKR",
        "name": "XKR",
        "russianName": "XKR"
      },
      {
        "id": "JAGUAR_X_TYPE",
        "name": "X-Type",
        "russianName": "X-type"
      }
    ]
  },
  "JEEP": {
    "id": "JEEP",
    "name": "ג'יפ",
    "russianName": "Джип",
    "models": [
      {
        "id": "JEEP_AVENGER",
        "name": "Avenger",
        "russianName": "Авенджер"
      },
      {
        "id": "JEEP_CHEROKEE",
        "name": "Cherokee",
        "russianName": "Чероки"
      },
      {
        "id": "JEEP_CJ",
        "name": "CJ",
        "russianName": "CJ"
      },
      {
        "id": "JEEP_COMANCHE",
        "name": "Comanche",
        "russianName": "Команч"
      },
      {
        "id": "JEEP_COMMANDER",
        "name": "Commander",
        "russianName": "Коммандер"
      },
      {
        "id": "JEEP_COMPASS",
        "name": "Compass",
        "russianName": "Компас"
      },
      {
        "id": "JEEP_GLADIATOR",
        "name": "Gladiator",
        "russianName": "Гладиатор"
      },
      {
        "id": "JEEP_GRAND_CHEROKEE",
        "name": "Grand Cherokee",
        "russianName": "Гранд Чероки"
      },
      {
        "id": "JEEP_GRAND_COMMANDER",
        "name": "Grand Commander",
        "russianName": "Гранд Коммандер"
      },
      {
        "id": "JEEP_GRAND_WAGONEER",
        "name": "Wagoneer",
        "russianName": "Вагонер"
      },
      {
        "id": "JEEP_LIBETY_NA",
        "name": "Liberty (North America)",
        "russianName": "Либерти"
      },
      {
        "id": "JEEP_PATRIOT",
        "name": "Liberty (Patriot)",
        "russianName": "Патриот"
      },
      {
        "id": "JEEP_RENEGADE",
        "name": "Renegade",
        "russianName": "Ренегейд"
      },
      {
        "id": "JEEP_WAGONEER_S",
        "name": "Wagoneer S",
        "russianName": "Вагонер С"
      },
      {
        "id": "JEEP_WRANGLER",
        "name": "Wrangler",
        "russianName": "Рэнглер"
      }
    ]
  },
  "JENSEN": {
    "id": "JENSEN",
    "name": "Jensen",
    "russianName": "Дженсен",
    "models": [
      {
        "id": "JENSEN_INTERCEPTOR",
        "name": "Interceptor",
        "russianName": "Интерцептор"
      },
      {
        "id": "JENSEN_S_V8",
        "name": "S-V8",
        "russianName": "с-в8"
      }
    ]
  },
  "JETOUR": {
    "id": "JETOUR",
    "name": "JETOUR",
    "russianName": "Джитур",
    "models": [
      {
        "id": "JETOUR_DASHING",
        "name": "DASHING",
        "russianName": "Дашинг"
      },
      {
        "id": "JETOUR_FREEDOM",
        "name": "Freedom",
        "russianName": "Фридом"
      },
      {
        "id": "JETOUR_G700",
        "name": "G700",
        "russianName": "Джи 700"
      },
      {
        "id": "JETOUR_SHANHAI_L6",
        "name": "Shanhai L6",
        "russianName": "Шанхай Л6"
      },
      {
        "id": "JETOUR_SHANHAI_L7",
        "name": "Shanhai L7",
        "russianName": "Шанхай Л7"
      },
      {
        "id": "JETOUR_SHANHAI_L9",
        "name": "Shanhai L9",
        "russianName": "Шанхай Л9"
      },
      {
        "id": "JETOUR_SHANHAI_T1",
        "name": "Shanhai T1",
        "russianName": "Шанхай Т1"
      },
      {
        "id": "JETOUR_SHANHAI_T2",
        "name": "Shanhai T2",
        "russianName": "Шанхай Т2"
      },
      {
        "id": "JETOUR_T1",
        "name": "T1",
        "russianName": "Т1"
      },
      {
        "id": "JETOUR_T2",
        "name": "T2",
        "russianName": "Т2"
      },
      {
        "id": "JETOUR_TRAVELLER",
        "name": "Traveller",
        "russianName": "Трэвэллер"
      },
      {
        "id": "JETOUR_X50",
        "name": "X50",
        "russianName": "Икс50"
      },
      {
        "id": "JETOUR_X70",
        "name": "X70",
        "russianName": "Икс70"
      },
      {
        "id": "JETOUR_X70L",
        "name": "X70L",
        "russianName": "Икс70Л"
      },
      {
        "id": "JETOUR_X70_PLUS",
        "name": "X70 PLUS",
        "russianName": "Х70 Плюс"
      },
      {
        "id": "JETOUR_X70_PRO",
        "name": "X70 Pro",
        "russianName": "Х70 Про"
      },
      {
        "id": "JETOUR_X90",
        "name": "X90",
        "russianName": "Икс90"
      },
      {
        "id": "JETOUR_X90_PLUS",
        "name": "X90 PLUS",
        "russianName": "Х90 Плюс"
      },
      {
        "id": "JETOUR_X90_PRO",
        "name": "X90 Pro",
        "russianName": "X90 Про"
      },
      {
        "id": "JETOUR_X95",
        "name": "X95",
        "russianName": "Икс95"
      }
    ]
  },
  "JETTA": {
    "id": "JETTA",
    "name": "Jetta",
    "russianName": "Джетта",
    "models": [
      {
        "id": "JETTA_VA3",
        "name": "VA3",
        "russianName": "ВА3"
      },
      {
        "id": "JETTA_VA7",
        "name": "VA7",
        "russianName": "ВА7"
      },
      {
        "id": "JETTA_VS5",
        "name": "VS5",
        "russianName": "ВС5"
      },
      {
        "id": "JETTA_VS7",
        "name": "VS7",
        "russianName": "ВС7"
      },
      {
        "id": "JETTA_VS8",
        "name": "VS8",
        "russianName": "ВС8"
      }
    ]
  },
  "JIANGNAN": {
    "id": "JIANGNAN",
    "name": "Jiangnan",
    "russianName": "Цзяннань",
    "models": [
      {
        "id": "JIANGNAN_CHUANQI",
        "name": "Chuanqi",
        "russianName": "Чуанчи"
      }
    ]
  },
  "JIDU": {
    "id": "JIDU",
    "name": "Jidu",
    "russianName": "Джиду",
    "models": [
      {
        "id": "JIDU_01",
        "name": "01",
        "russianName": "01"
      },
      {
        "id": "JIDU_07",
        "name": "07",
        "russianName": "07"
      }
    ]
  },
  "JINBEI": {
    "id": "JINBEI",
    "name": "Jinbei",
    "russianName": "Джинбей",
    "models": [
      {
        "id": "JINBEI_HAISE",
        "name": "Haise",
        "russianName": "хайс"
      },
      {
        "id": "JINBEI_HAISE_S",
        "name": "Haise S",
        "russianName": "Хайс С"
      }
    ]
  },
  "JMC": {
    "id": "JMC",
    "name": "JMC",
    "russianName": "Джей Эм Си",
    "models": [
      {
        "id": "JMC_BAODIAN",
        "name": "Baodian",
        "russianName": "баодиан"
      },
      {
        "id": "JMC_DADAO",
        "name": "Dadao",
        "russianName": "Дадао"
      },
      {
        "id": "JMC_VIGUS",
        "name": "Vigus",
        "russianName": "Вигус"
      },
      {
        "id": "JMC_VIGUS_WORK",
        "name": "Vigus Work",
        "russianName": "Вигус Ворк"
      },
      {
        "id": "JMC_YUHU_7",
        "name": "Yuhu 7",
        "russianName": "Юху 7"
      }
    ]
  },
  "JMEV": {
    "id": "JMEV",
    "name": "JMEV",
    "russianName": "Джмев",
    "models": [
      {
        "id": "JMEV_01",
        "name": "01",
        "russianName": "01"
      },
      {
        "id": "JMEV_EV3",
        "name": "EV3",
        "russianName": "EB3"
      },
      {
        "id": "JMEV_GSE_YI",
        "name": "GSE (Yi)",
        "russianName": "Гсе (Йи)"
      }
    ]
  },
  "JONWAY": {
    "id": "JONWAY",
    "name": "Jonway",
    "russianName": "Джонвэй",
    "models": [
      {
        "id": "JONWAY_UFO_A380",
        "name": "UFO A380",
        "russianName": "Уфо а380"
      }
    ]
  },
  "KAIYI": {
    "id": "KAIYI",
    "name": "Kaiyi",
    "russianName": "Каи",
    "models": [
      {
        "id": "KAIYI_E5",
        "name": "E5",
        "russianName": "е5"
      },
      {
        "id": "KAIYI_SHIYUE",
        "name": "Shiyue",
        "russianName": "Кхия"
      },
      {
        "id": "KAIYI_X3",
        "name": "X3",
        "russianName": "Икс3"
      },
      {
        "id": "KAIYI_X3_PRO",
        "name": "X3 Pro",
        "russianName": "Икс3 Про"
      },
      {
        "id": "KAIYI_X7",
        "name": "X7 Kunlun",
        "russianName": "Икс7 Кунлун"
      }
    ]
  },
  "KANONIR": {
    "id": "KANONIR",
    "name": "Канонир",
    "russianName": "Канонир",
    "models": [
      {
        "id": "KANONIR_2317",
        "name": "2317",
        "russianName": "2317"
      }
    ]
  },
  "KARMA": {
    "id": "KARMA",
    "name": "Karma",
    "russianName": "Карма",
    "models": [
      {
        "id": "KARMA_REVERO",
        "name": "Revero",
        "russianName": "реверо"
      },
      {
        "id": "KARMA_REVERO_GT",
        "name": "Revero GT",
        "russianName": "Реверо ГТ"
      }
    ]
  },
  "KAWEI": {
    "id": "KAWEI",
    "name": "Kawei",
    "russianName": "Кавэй",
    "models": [
      {
        "id": "KAWEI_K1",
        "name": "K1",
        "russianName": "К1"
      },
      {
        "id": "KAWEI_K150",
        "name": "K150",
        "russianName": "К150"
      },
      {
        "id": "KAWEI_K150GT",
        "name": "K150GT",
        "russianName": "к150гт"
      }
    ]
  },
  "KGM": {
    "id": "KGM",
    "name": "KGM",
    "russianName": "Кей-Джи-Эм",
    "models": [
      {
        "id": "KGM_ACTYON",
        "name": "Actyon",
        "russianName": "Актион"
      },
      {
        "id": "KGM_KORANDO",
        "name": "Korando",
        "russianName": "Корандо"
      },
      {
        "id": "KGM_REXTON",
        "name": "Rexton",
        "russianName": "Рекстон"
      },
      {
        "id": "KGM_REXTON_SPORTS",
        "name": "Rexton Sports",
        "russianName": "Рекстон Спортс"
      },
      {
        "id": "KGM_TIVOLI",
        "name": "Tivoli",
        "russianName": "Тиволи"
      },
      {
        "id": "KGM_TORRES",
        "name": "Torres",
        "russianName": "Торрес"
      }
    ]
  },
  "KIA": {
    "id": "KIA",
    "name": "קיה",
    "russianName": "Киа",
    "models": [
      {
        "id": "KIA_AVELLA",
        "name": "Avella",
        "russianName": "Авелла"
      },
      {
        "id": "KIA_BORREGO",
        "name": "Borrego",
        "russianName": "Боррего"
      },
      {
        "id": "KIA_CACHET",
        "name": "Cachet",
        "russianName": "Качет"
      },
      {
        "id": "KIA_CADENZA",
        "name": "Cadenza",
        "russianName": "Каденза"
      },
      {
        "id": "KIA_CAPITAL",
        "name": "Capital",
        "russianName": "Капитал"
      },
      {
        "id": "KIA_CARENS",
        "name": "Carens",
        "russianName": "Каренс"
      },
      {
        "id": "KIA_CARNIVAL",
        "name": "Carnival",
        "russianName": "Карнивал"
      },
      {
        "id": "KIA_CARSTAR",
        "name": "Carstar",
        "russianName": "Карстар"
      },
      {
        "id": "KIA_CEED",
        "name": "Ceed",
        "russianName": "Сид"
      },
      {
        "id": "KIA_CEED_GT",
        "name": "Ceed GT",
        "russianName": "Сид GT"
      },
      {
        "id": "KIA_CERATO",
        "name": "Cerato",
        "russianName": "Церато"
      },
      {
        "id": "KIA_CLARUS",
        "name": "Clarus",
        "russianName": "Кларус"
      },
      {
        "id": "KIA_CONCORD",
        "name": "Concord",
        "russianName": "Конкорд"
      },
      {
        "id": "KIA_ELAN",
        "name": "Elan",
        "russianName": "Элан"
      },
      {
        "id": "KIA_ENTERPRISE",
        "name": "Enterprise",
        "russianName": "Энтерпрайз"
      },
      {
        "id": "KIA_EV3",
        "name": "EV3",
        "russianName": "ев3"
      },
      {
        "id": "KIA_EV4",
        "name": "EV4",
        "russianName": "ев4"
      },
      {
        "id": "KIA_EV5",
        "name": "EV5",
        "russianName": "ев5"
      },
      {
        "id": "KIA_EV6",
        "name": "EV6",
        "russianName": "ЕВ6"
      },
      {
        "id": "KIA_EV9",
        "name": "EV9",
        "russianName": "ЕВ9"
      },
      {
        "id": "KIA_FORTE",
        "name": "Forte",
        "russianName": "Форте"
      },
      {
        "id": "KIA_JOICE",
        "name": "Joice",
        "russianName": "Джойс"
      },
      {
        "id": "KIA_K3",
        "name": "K3",
        "russianName": "к3"
      },
      {
        "id": "KIA_K4",
        "name": "K4",
        "russianName": "К4"
      },
      {
        "id": "KIA_K5",
        "name": "K5",
        "russianName": "к5"
      },
      {
        "id": "KIA_K7",
        "name": "K7",
        "russianName": "K7"
      },
      {
        "id": "KIA_K8",
        "name": "K8",
        "russianName": "К8"
      },
      {
        "id": "KIA_K9",
        "name": "K9",
        "russianName": "К9"
      },
      {
        "id": "KIA_K900",
        "name": "K900",
        "russianName": "К900"
      },
      {
        "id": "KIA_KX1",
        "name": "KX1",
        "russianName": "КаИкс1"
      },
      {
        "id": "KIA_KX3",
        "name": "KX3",
        "russianName": "КаИкс3"
      },
      {
        "id": "KIA_KX5",
        "name": "KX5",
        "russianName": "КаИкс5"
      },
      {
        "id": "KIA_KX7",
        "name": "KX7",
        "russianName": "КаИкс7"
      },
      {
        "id": "KIA_LOTZE",
        "name": "Lotze",
        "russianName": "Лотз"
      },
      {
        "id": "KIA_MAGENTIS",
        "name": "Magentis",
        "russianName": "Маджентис"
      },
      {
        "id": "KIA_MENTOR",
        "name": "Mentor",
        "russianName": "ментор"
      },
      {
        "id": "KIA_MOHAVES",
        "name": "Mohave",
        "russianName": "Мохав"
      },
      {
        "id": "KIA_MORNING",
        "name": "Morning",
        "russianName": "морнинг"
      },
      {
        "id": "KIA_NIRO",
        "name": "Niro",
        "russianName": "Ниро"
      },
      {
        "id": "KIA_OPIRUS",
        "name": "Opirus",
        "russianName": "Опирус"
      },
      {
        "id": "KIA_OPTIMA",
        "name": "Optima",
        "russianName": "Оптима"
      },
      {
        "id": "KIA_PEGAS",
        "name": "Pegas",
        "russianName": "Пегас"
      },
      {
        "id": "KIA_PICANTO",
        "name": "Picanto",
        "russianName": "Пиканто"
      },
      {
        "id": "KIA_POTENTIA",
        "name": "Potentia",
        "russianName": "Потентиа"
      },
      {
        "id": "KIA_PREGIO",
        "name": "Pregio",
        "russianName": "Преджио"
      },
      {
        "id": "KIA_PRIDE",
        "name": "Pride",
        "russianName": "Прайд"
      },
      {
        "id": "KIA_PROCEED",
        "name": "Proceed",
        "russianName": "Просид"
      },
      {
        "id": "KIA_PV5",
        "name": "PV5",
        "russianName": "Пи Ви пять"
      },
      {
        "id": "KIA_QUANLIMA",
        "name": "Quanlima",
        "russianName": "кванлима"
      },
      {
        "id": "KIA_QUORIS",
        "name": "Quoris",
        "russianName": "Кворис"
      },
      {
        "id": "KIA_RAY",
        "name": "Ray",
        "russianName": "Рэй"
      },
      {
        "id": "KIA_RETONA",
        "name": "Retona",
        "russianName": "Ретона"
      },
      {
        "id": "KIA_RIO",
        "name": "Rio",
        "russianName": "Рио"
      },
      {
        "id": "KIA_SEDONA",
        "name": "Sedona",
        "russianName": "Седона"
      },
      {
        "id": "KIA_SELTOS",
        "name": "Seltos",
        "russianName": "Селтос"
      },
      {
        "id": "KIA_SEPHIA",
        "name": "Sephia",
        "russianName": "Сефия"
      },
      {
        "id": "KIA_SHUMA",
        "name": "Shuma",
        "russianName": "Шума"
      },
      {
        "id": "KIA_SONET",
        "name": "Sonet",
        "russianName": "Сонет"
      },
      {
        "id": "KIA_SORENTO",
        "name": "Sorento",
        "russianName": "Соренто"
      },
      {
        "id": "KIA_SOUL",
        "name": "Soul",
        "russianName": "Соул"
      },
      {
        "id": "KIA_SOUL_EV",
        "name": "Soul EV",
        "russianName": "Соул ИВ"
      },
      {
        "id": "KIA_SPECTRA",
        "name": "Spectra",
        "russianName": "Спектра"
      },
      {
        "id": "KIA_SPORTAGE",
        "name": "Sportage",
        "russianName": "Спортейдж"
      },
      {
        "id": "KIA_SPORTAGE_CHINA",
        "name": "Sportage (China)",
        "russianName": "Спортейдж Китай"
      },
      {
        "id": "KIA_STINGER",
        "name": "Stinger",
        "russianName": "Стингер"
      },
      {
        "id": "KIA_STONIC",
        "name": "Stonic",
        "russianName": "Стоник"
      },
      {
        "id": "KIA_SYROS",
        "name": "Syros",
        "russianName": "Сирос"
      },
      {
        "id": "KIA_TASMAN",
        "name": "Tasman",
        "russianName": "Тасман"
      },
      {
        "id": "KIA_TELLURIDE",
        "name": "Telluride",
        "russianName": "Телюрайд"
      },
      {
        "id": "KIA_TOWNER",
        "name": "Towner",
        "russianName": "тоунер"
      },
      {
        "id": "KIA_VENGA",
        "name": "Venga",
        "russianName": "Венга"
      },
      {
        "id": "KIA_VISTO",
        "name": "Visto",
        "russianName": "Висто"
      },
      {
        "id": "KIA_XCEED",
        "name": "XCeed",
        "russianName": "Икс Сид"
      },
      {
        "id": "KIA_X_TREK",
        "name": "X-Trek",
        "russianName": "X-трек"
      }
    ]
  },
  "KNEWSTAR": {
    "id": "KNEWSTAR",
    "name": "Knewstar",
    "russianName": "Ньюстар",
    "models": [
      {
        "id": "KNEWSTAR_001",
        "name": "001",
        "russianName": "001"
      }
    ]
  },
  "KOENIGSEGG": {
    "id": "KOENIGSEGG",
    "name": "Koenigsegg",
    "russianName": "Кёнигсегг",
    "models": [
      {
        "id": "KOENIGSEGG_AGERA",
        "name": "Agera",
        "russianName": "агера"
      },
      {
        "id": "KOENIGSEGG_CC850",
        "name": "CC850",
        "russianName": "СС850"
      },
      {
        "id": "KOENIGSEGG_CC8S",
        "name": "CC8S",
        "russianName": "цц8с"
      },
      {
        "id": "KOENIGSEGG_CCR",
        "name": "CCR",
        "russianName": "сср"
      },
      {
        "id": "KOENIGSEGG_CCX",
        "name": "CCX",
        "russianName": "ссх"
      },
      {
        "id": "KOENIGSEGG_GEMERA",
        "name": "Gemera",
        "russianName": "Джемера"
      },
      {
        "id": "KOENIGSEGG_JESKO",
        "name": "Jesko",
        "russianName": "Джеско"
      },
      {
        "id": "KOENIGSEGG_ONE_1",
        "name": "One:1",
        "russianName": "уан:1"
      },
      {
        "id": "KOENIGSEGG_REGERA",
        "name": "Regera",
        "russianName": "Регера"
      }
    ]
  },
  "KOMBAT": {
    "id": "KOMBAT",
    "name": "Комбат",
    "russianName": "Комбат",
    "models": [
      {
        "id": "KOMBAT_T98",
        "name": "Т98",
        "russianName": "Т98"
      }
    ]
  },
  "KTM": {
    "id": "KTM",
    "name": "KTM AG",
    "russianName": "КТМ АГ",
    "models": [
      {
        "id": "KTM_XBOW",
        "name": "X-Bow",
        "russianName": "икс-боу"
      }
    ]
  },
  "KYC": {
    "id": "KYC",
    "name": "KYC",
    "russianName": "КУС",
    "models": [
      {
        "id": "KYC_F3",
        "name": "F3",
        "russianName": "Ф3"
      }
    ]
  },
  "LAMBORGHINI": {
    "id": "LAMBORGHINI",
    "name": "למבורגיני",
    "russianName": "Ламборгини",
    "models": [
      {
        "id": "LAMBORGHINI_350_400_GT",
        "name": "350/400 GT",
        "russianName": "350/400 гт"
      },
      {
        "id": "LAMBORGHINI_AVENTADOR",
        "name": "Aventador",
        "russianName": "авентадор"
      },
      {
        "id": "LAMBORGHINI_CENTANARIO",
        "name": "Centenario",
        "russianName": "Сентeнарио"
      },
      {
        "id": "LAMBORGHINI_COUNTACH",
        "name": "Countach",
        "russianName": "каунтач"
      },
      {
        "id": "LAMBORGHINI_COUNTACH_LPI_800_4",
        "name": "Countach LPI 800-4",
        "russianName": "Каунтач ЛПИ 800-4"
      },
      {
        "id": "LAMBORGHINI_DIABLO",
        "name": "Diablo",
        "russianName": "Диабло"
      },
      {
        "id": "LAMBORGHINI_EGOISTA",
        "name": "Egoista",
        "russianName": "Эгоиста"
      },
      {
        "id": "LAMBORGHINI_ESPADA",
        "name": "Espada",
        "russianName": "эспада"
      },
      {
        "id": "LAMBORGHINI_FENOMENO",
        "name": "Fenomeno",
        "russianName": "Феномено"
      },
      {
        "id": "LAMBORGHINI_GALLARDO",
        "name": "Gallardo",
        "russianName": "галлардо"
      },
      {
        "id": "LAMBORGHINI_HURACAN",
        "name": "Huracán",
        "russianName": "Хуракан"
      },
      {
        "id": "LAMBORGHINI_ISLERO",
        "name": "Islero",
        "russianName": "ислеро"
      },
      {
        "id": "LAMBORGHINI_JALPA",
        "name": "Jalpa",
        "russianName": "ялпа"
      },
      {
        "id": "LAMBORGHINI_JARAMA",
        "name": "Jarama",
        "russianName": "джарама"
      },
      {
        "id": "LAMBORGHINI_LM001",
        "name": "LM001",
        "russianName": "лм001"
      },
      {
        "id": "LAMBORGHINI_LM002",
        "name": "LM002",
        "russianName": "лм002"
      },
      {
        "id": "LAMBORGHINI_MIURA",
        "name": "Miura",
        "russianName": "миура"
      },
      {
        "id": "LAMBORGHINI_MURCIELAGO",
        "name": "Murcielago",
        "russianName": "мурселаго"
      },
      {
        "id": "LAMBORGHINI_REVENTON",
        "name": "Reventon",
        "russianName": "Ревентон"
      },
      {
        "id": "LAMBORGHINI_REVUELTO",
        "name": "Revuelto",
        "russianName": "Ревуэлто"
      },
      {
        "id": "LAMBORGHINI_SESTO_ELEMENTO",
        "name": "Sesto Elemento",
        "russianName": "Сесто Элементо"
      },
      {
        "id": "LAMBORGHINI_SIAN",
        "name": "Sián",
        "russianName": "Сиан"
      },
      {
        "id": "LAMBORGHINI_SILHOUETTE",
        "name": "Silhouette",
        "russianName": "силуэт"
      },
      {
        "id": "LAMBORGHINI_TEMERARIO",
        "name": "Temerario",
        "russianName": "Темерарио"
      },
      {
        "id": "LAMBORGHINI_URRACO",
        "name": "Urraco",
        "russianName": "уррако"
      },
      {
        "id": "LAMBORGHINI_URUS",
        "name": "Urus",
        "russianName": "урус"
      },
      {
        "id": "LAMBORGHINI_VENENO",
        "name": "Veneno",
        "russianName": "Венено"
      }
    ]
  },
  "LANCIA": {
    "id": "LANCIA",
    "name": "Lancia",
    "russianName": "Лянча",
    "models": [
      {
        "id": "LANCIA_APPIA",
        "name": "Appia",
        "russianName": "аппия"
      },
      {
        "id": "LANCIA_AURELIA",
        "name": "Aurelia",
        "russianName": "аурелия"
      },
      {
        "id": "LANCIA_A_112",
        "name": "A 112",
        "russianName": "а 112"
      },
      {
        "id": "LANCIA_BETA",
        "name": "Beta",
        "russianName": "Бета"
      },
      {
        "id": "LANCIA_DEDRA",
        "name": "Dedra",
        "russianName": "Дедра"
      },
      {
        "id": "LANCIA_DELTA",
        "name": "Delta",
        "russianName": "Дэльта"
      },
      {
        "id": "LANCIA_FLAMINIA",
        "name": "Flaminia",
        "russianName": "фламиния"
      },
      {
        "id": "LANCIA_FLAVIA",
        "name": "Flavia",
        "russianName": "Флавия"
      },
      {
        "id": "LANCIA_FULVIA",
        "name": "Fulvia",
        "russianName": "Фульвия"
      },
      {
        "id": "LANCIA_GAMMA",
        "name": "Gamma",
        "russianName": "Гамма"
      },
      {
        "id": "LANCIA_HYUENA",
        "name": "Hyena",
        "russianName": "Гиена"
      },
      {
        "id": "LANCIA_KAPPA",
        "name": "Kappa",
        "russianName": "Каппа"
      },
      {
        "id": "LANCIA_LAMBDA",
        "name": "Lambda",
        "russianName": "лямбда"
      },
      {
        "id": "LANCIA_LYBRA",
        "name": "Lybra",
        "russianName": "Либра"
      },
      {
        "id": "LANCIA_MONTECARLO",
        "name": "Monte Carlo",
        "russianName": "Монте Карло"
      },
      {
        "id": "LANCIA_MUSA",
        "name": "Musa",
        "russianName": "Муса"
      },
      {
        "id": "LANCIA_PHEDRA",
        "name": "Phedra",
        "russianName": "Федра"
      },
      {
        "id": "LANCIA_PRISMA",
        "name": "Prisma",
        "russianName": "Призма"
      },
      {
        "id": "LANCIA_RALLY_037",
        "name": "Rally 037",
        "russianName": "ралли 037"
      },
      {
        "id": "LANCIA_STRATOS",
        "name": "Stratos",
        "russianName": "стратос"
      },
      {
        "id": "LANCIA_THEMA",
        "name": "Thema",
        "russianName": "Тема"
      },
      {
        "id": "LANCIA_THESIS",
        "name": "Thesis",
        "russianName": "Тезис"
      },
      {
        "id": "LANCIA_TREVI",
        "name": "Trevi",
        "russianName": "Треви"
      },
      {
        "id": "LANCIA_VOYAGER",
        "name": "Voyager",
        "russianName": "вояджер"
      },
      {
        "id": "LANCIA_Y10",
        "name": "Y10",
        "russianName": "Ю 10"
      },
      {
        "id": "LANCIA_YPSILON",
        "name": "Ypsilon",
        "russianName": "Ипсилон"
      },
      {
        "id": "LANCIA_ZETA",
        "name": "Zeta",
        "russianName": "Зета"
      }
    ]
  },
  "LANDWIND": {
    "id": "LANDWIND",
    "name": "Landwind",
    "russianName": "Лендвинд",
    "models": [
      {
        "id": "LANDWIND_CV9",
        "name": "Fashion (CV9)",
        "russianName": "Фэшн"
      },
      {
        "id": "LANDWIND_FORWARD",
        "name": "Forward",
        "russianName": "Форвард"
      },
      {
        "id": "LANDWIND_LW_X9",
        "name": "Х9",
        "russianName": "х9"
      },
      {
        "id": "LANDWIND_X5",
        "name": "X5",
        "russianName": "Х5"
      },
      {
        "id": "LANDWIND_X6",
        "name": "X6",
        "russianName": "X6"
      },
      {
        "id": "LANDWIND_X7",
        "name": "X7",
        "russianName": "Х7"
      }
    ]
  },
  "LAND_ROVER": {
    "id": "LAND_ROVER",
    "name": "לנד רובר",
    "russianName": "Ленд Ровер",
    "models": [
      {
        "id": "LAND_ROVER_DEFENDER",
        "name": "Defender",
        "russianName": "Дефендер"
      },
      {
        "id": "LAND_ROVER_DISCOVERY",
        "name": "Discovery",
        "russianName": "Дискавери"
      },
      {
        "id": "LAND_ROVER_DISCOVERY_SPORT",
        "name": "Discovery Sport",
        "russianName": "Дискавери Спорт"
      },
      {
        "id": "LAND_ROVER_EVOQUE",
        "name": "Range Rover Evoque",
        "russianName": "Рендж Ровер Эвок"
      },
      {
        "id": "LAND_ROVER_FREELANDER",
        "name": "Freelander",
        "russianName": "Фрилендер"
      },
      {
        "id": "LAND_ROVER_RANGE_ROVER",
        "name": "ריינג' רובר",
        "russianName": "Рендж Ровер"
      },
      {
        "id": "LAND_ROVER_RANGE_ROVER_SPORT",
        "name": "Range Rover Sport",
        "russianName": "Рендж Ровер Спорт"
      },
      {
        "id": "LAND_ROVER_RANGE_ROVER_VELAR",
        "name": "Range Rover Velar",
        "russianName": "Рендж Ровер Велар"
      },
      {
        "id": "LAND_ROVER_SERIES_I",
        "name": "Series I",
        "russianName": "Серия 1"
      },
      {
        "id": "LAND_ROVER_SERIES_II",
        "name": "Series II",
        "russianName": "серия 2"
      },
      {
        "id": "LAND_ROVER_SERIES_III",
        "name": "Series III",
        "russianName": "серия 3"
      }
    ]
  },
  "LEAPMOTOR": {
    "id": "LEAPMOTOR",
    "name": "Leapmotor",
    "russianName": "Липмотор",
    "models": [
      {
        "id": "LEAPMOTOR_B01",
        "name": "B01",
        "russianName": "Б01"
      },
      {
        "id": "LEAPMOTOR_B05_LAFA_5",
        "name": "B05 (Lafa 5)",
        "russianName": "Б05 Лафа 5"
      },
      {
        "id": "LEAPMOTOR_B10",
        "name": "B10",
        "russianName": "Б10"
      },
      {
        "id": "LEAPMOTOR_C01",
        "name": "C01",
        "russianName": "Си01"
      },
      {
        "id": "LEAPMOTOR_C10",
        "name": "C10",
        "russianName": "С10"
      },
      {
        "id": "LEAPMOTOR_C11",
        "name": "C11",
        "russianName": "С11"
      },
      {
        "id": "LEAPMOTOR_C16",
        "name": "C16",
        "russianName": "Си16"
      },
      {
        "id": "LEAPMOTOR_S01",
        "name": "S01",
        "russianName": "С01"
      },
      {
        "id": "LEAPMOTOR_T03",
        "name": "T03",
        "russianName": "Т03"
      }
    ]
  },
  "LETIN": {
    "id": "LETIN",
    "name": "Letin",
    "russianName": "Летин",
    "models": [
      {
        "id": "LETIN_MENGO",
        "name": "Mengo",
        "russianName": "Менго"
      },
      {
        "id": "LETIN_MENGO_PRO",
        "name": "Mengo Pro",
        "russianName": "Менго про"
      }
    ]
  },
  "LEVC": {
    "id": "LEVC",
    "name": "LEVC",
    "russianName": "ЛЕВК",
    "models": [
      {
        "id": "LEVC_L380",
        "name": "L380",
        "russianName": "Л380"
      },
      {
        "id": "LEVC_TX",
        "name": "TX",
        "russianName": "ТХ"
      }
    ]
  },
  "LEXUS": {
    "id": "LEXUS",
    "name": "לקסוס",
    "russianName": "Лексус",
    "models": [
      {
        "id": "LEXUS_CT",
        "name": "CT",
        "russianName": "CT"
      },
      {
        "id": "LEXUS_ES",
        "name": "ES",
        "russianName": "ЕС"
      },
      {
        "id": "LEXUS_GS",
        "name": "GS",
        "russianName": "ГС"
      },
      {
        "id": "LEXUS_GS_F",
        "name": "GS F",
        "russianName": "Джи Эс Эф"
      },
      {
        "id": "LEXUS_GX",
        "name": "GX",
        "russianName": "ГХ"
      },
      {
        "id": "LEXUS_HS",
        "name": "HS",
        "russianName": "ХС"
      },
      {
        "id": "LEXUS_IS",
        "name": "IS",
        "russianName": "ИС"
      },
      {
        "id": "LEXUS_IS_F",
        "name": "IS F",
        "russianName": "ис ф"
      },
      {
        "id": "LEXUS_LBX",
        "name": "LBX",
        "russianName": "Лбх"
      },
      {
        "id": "LEXUS_LC",
        "name": "LC",
        "russianName": "лц"
      },
      {
        "id": "LEXUS_LFA",
        "name": "LFA",
        "russianName": "Лфа"
      },
      {
        "id": "LEXUS_LM",
        "name": "LM",
        "russianName": "ЛМ"
      },
      {
        "id": "LEXUS_LS",
        "name": "LS",
        "russianName": "лс"
      },
      {
        "id": "LEXUS_LX",
        "name": "LX",
        "russianName": "ЛХ"
      },
      {
        "id": "LEXUS_NX",
        "name": "NX",
        "russianName": "Н-Икс"
      },
      {
        "id": "LEXUS_RC",
        "name": "RC",
        "russianName": "РС"
      },
      {
        "id": "LEXUS_RC_F",
        "name": "RC F",
        "russianName": "РС Ф"
      },
      {
        "id": "LEXUS_RX",
        "name": "RX",
        "russianName": "рх"
      },
      {
        "id": "LEXUS_RZ",
        "name": "RZ",
        "russianName": "РЗ"
      },
      {
        "id": "LEXUS_SC",
        "name": "SC",
        "russianName": "сц"
      },
      {
        "id": "LEXUS_TX",
        "name": "TX",
        "russianName": "ТХ"
      },
      {
        "id": "LEXUS_UX",
        "name": "UX",
        "russianName": "ЮХ"
      }
    ]
  },
  "LIEBAO": {
    "id": "LIEBAO",
    "name": "Liebao Motor",
    "russianName": "Лиебао Мотор",
    "models": [
      {
        "id": "LIEBAO_LEOPARD",
        "name": "Leopard",
        "russianName": "Леопард"
      }
    ]
  },
  "LIFAN": {
    "id": "LIFAN",
    "name": "Lifan",
    "russianName": "Лифан",
    "models": [
      {
        "id": "LIFAN_650_EV",
        "name": "650 EV",
        "russianName": "650 ЕВ"
      },
      {
        "id": "LIFAN_BREEZ",
        "name": "Breez (520)",
        "russianName": "бриз"
      },
      {
        "id": "LIFAN_CEBRIUM",
        "name": "Cebrium (720)",
        "russianName": "Цебриум"
      },
      {
        "id": "LIFAN_CELLIYA",
        "name": "Celliya (530)",
        "russianName": "Селия"
      },
      {
        "id": "LIFAN_MURMAN",
        "name": "Murman (820)",
        "russianName": "Мурман"
      },
      {
        "id": "LIFAN_MYWAY",
        "name": "Myway",
        "russianName": "Майвей"
      },
      {
        "id": "LIFAN_SMILY",
        "name": "Smily",
        "russianName": "Смайли"
      },
      {
        "id": "LIFAN_SOLANO",
        "name": "Solano",
        "russianName": "Солано"
      },
      {
        "id": "LIFAN_X50",
        "name": "X50",
        "russianName": "х50"
      },
      {
        "id": "LIFAN_X60",
        "name": "X60",
        "russianName": "Х60"
      },
      {
        "id": "LIFAN_X70",
        "name": "X70",
        "russianName": "Х70"
      }
    ]
  },
  "LIGIER": {
    "id": "LIGIER",
    "name": "Ligier",
    "russianName": "Лижье",
    "models": [
      {
        "id": "LIGIER_JS_51",
        "name": "JS 51",
        "russianName": "Джи Эс 51"
      }
    ]
  },
  "LINCOLN": {
    "id": "LINCOLN",
    "name": "לינקולן",
    "russianName": "Линкольн",
    "models": [
      {
        "id": "LINCOLN_AVIATOR",
        "name": "Aviator",
        "russianName": "авиатор"
      },
      {
        "id": "LINCOLN_BLACKWOOD",
        "name": "Blackwood",
        "russianName": "блэквуд"
      },
      {
        "id": "LINCOLN_CAPRI",
        "name": "Capri",
        "russianName": "капри"
      },
      {
        "id": "LINCOLN_CONTINENTAL",
        "name": "Continental",
        "russianName": "континенталь"
      },
      {
        "id": "LINCOLN_CONTINENTAL_MARK",
        "name": "Continental Mark",
        "russianName": "Континентал Марк"
      },
      {
        "id": "LINCOLN_CORSAIR",
        "name": "Corsair",
        "russianName": "Корсэйр"
      },
      {
        "id": "LINCOLN_LS",
        "name": "LS",
        "russianName": "лс"
      },
      {
        "id": "LINCOLN_MARK_III",
        "name": "Mark III",
        "russianName": "Марк III"
      },
      {
        "id": "LINCOLN_MARK_IV",
        "name": "Mark IV",
        "russianName": "Марк IV"
      },
      {
        "id": "LINCOLN_MARK_LT",
        "name": "Mark LT",
        "russianName": "марк лт"
      },
      {
        "id": "LINCOLN_MARK_VII",
        "name": "Mark VII",
        "russianName": "Марк VII"
      },
      {
        "id": "LINCOLN_MARK_VIII",
        "name": "Mark VIII",
        "russianName": "Марк VIII"
      },
      {
        "id": "LINCOLN_MKC",
        "name": "MKC",
        "russianName": "мкц"
      },
      {
        "id": "LINCOLN_MKS",
        "name": "MKS",
        "russianName": "мкс"
      },
      {
        "id": "LINCOLN_MKT",
        "name": "MKT",
        "russianName": "мкт"
      },
      {
        "id": "LINCOLN_MKX",
        "name": "MKX",
        "russianName": "мкх"
      },
      {
        "id": "LINCOLN_MKZ",
        "name": "MKZ",
        "russianName": "мкз"
      },
      {
        "id": "LINCOLN_NAUTILUS",
        "name": "Nautilus",
        "russianName": "Наутилус"
      },
      {
        "id": "LINCOLN_NAVIGATOR",
        "name": "Navigator",
        "russianName": "навигатор"
      },
      {
        "id": "LINCOLN_PREMIERE",
        "name": "Premiere",
        "russianName": "премьер"
      },
      {
        "id": "LINCOLN_TOWN_CAR",
        "name": "Town Car",
        "russianName": "таун кар"
      },
      {
        "id": "LINCOLN_VERSAILLES",
        "name": "Versailles",
        "russianName": "Версайлс"
      },
      {
        "id": "LINCOLN_Z",
        "name": "Z",
        "russianName": "Зет"
      },
      {
        "id": "LINCOLN_ZEPHYR",
        "name": "Zephyr",
        "russianName": "Зефир"
      }
    ]
  },
  "LINGXI": {
    "id": "LINGXI",
    "name": "Lingxi",
    "russianName": "Лингкси",
    "models": [
      {
        "id": "LINGXI_L",
        "name": "L",
        "russianName": "Л"
      }
    ]
  },
  "LIVAN": {
    "id": "LIVAN",
    "name": "Livan",
    "russianName": "Ливан",
    "models": [
      {
        "id": "LIVAN_7",
        "name": "7",
        "russianName": "7"
      },
      {
        "id": "LIVAN_9",
        "name": "9",
        "russianName": "9"
      },
      {
        "id": "LIVAN_S6_PRO",
        "name": "S6 Pro",
        "russianName": "C6 Про"
      },
      {
        "id": "LIVAN_SMURF",
        "name": "Smurf",
        "russianName": "Смурф"
      },
      {
        "id": "LIVAN_X3_PRO",
        "name": "X3 Pro",
        "russianName": "Икс3 Про"
      },
      {
        "id": "LIVAN_X6_PRO",
        "name": "X6 Pro",
        "russianName": "Икс6 Про"
      }
    ]
  },
  "LIXIANG": {
    "id": "LIXIANG",
    "name": "Lixiang",
    "russianName": "Лисян",
    "models": [
      {
        "id": "LIXIANG_I6",
        "name": "i6",
        "russianName": "Ай 6"
      },
      {
        "id": "LIXIANG_I8",
        "name": "i8",
        "russianName": "Ай8"
      },
      {
        "id": "LIXIANG_L6",
        "name": "L6",
        "russianName": "Л6"
      },
      {
        "id": "LIXIANG_L7",
        "name": "L7",
        "russianName": "Л7"
      },
      {
        "id": "LIXIANG_L8",
        "name": "L8",
        "russianName": "Л8"
      },
      {
        "id": "LIXIANG_L9",
        "name": "L9",
        "russianName": "Л9"
      },
      {
        "id": "LIXIANG_MEGA",
        "name": "Mega",
        "russianName": "Мега"
      },
      {
        "id": "LIXIANG_ONE",
        "name": "One",
        "russianName": "Ван"
      }
    ]
  },
  "LOGEM": {
    "id": "LOGEM",
    "name": "Logem",
    "russianName": "Логем",
    "models": [
      {
        "id": "LOGEM_EC30",
        "name": "EC30",
        "russianName": "ЕС30"
      }
    ]
  },
  "LOTUS": {
    "id": "LOTUS",
    "name": "Lotus",
    "russianName": "Лотус",
    "models": [
      {
        "id": "LOTUS_2_ELEVEN",
        "name": "2-Eleven",
        "russianName": "2-Элевен"
      },
      {
        "id": "LOTUS_340R",
        "name": "340R",
        "russianName": "340р"
      },
      {
        "id": "LOTUS_3_ELEVEN",
        "name": "3-Eleven",
        "russianName": "3-Элевен"
      },
      {
        "id": "LOTUS_ECLAT",
        "name": "Eclat",
        "russianName": "Эклат"
      },
      {
        "id": "LOTUS_ELAN",
        "name": "Elan",
        "russianName": "Илан"
      },
      {
        "id": "LOTUS_ELETRE",
        "name": "Eletre",
        "russianName": "Элетре"
      },
      {
        "id": "LOTUS_ELISE",
        "name": "Elise",
        "russianName": "Элис"
      },
      {
        "id": "LOTUS_ELITE",
        "name": "Elite",
        "russianName": "Элит"
      },
      {
        "id": "LOTUS_EMEYA",
        "name": "Emeya",
        "russianName": "Эмея"
      },
      {
        "id": "LOTUS_EMIRA",
        "name": "Emira",
        "russianName": "Эмира"
      },
      {
        "id": "LOTUS_ESPRIT",
        "name": "Esprit",
        "russianName": "Эсприт"
      },
      {
        "id": "LOTUS_EUROPA",
        "name": "Europa",
        "russianName": "Европа"
      },
      {
        "id": "LOTUS_EUROPA_S",
        "name": "Europa S",
        "russianName": "Европа С"
      },
      {
        "id": "LOTUS_EVIJA",
        "name": "Evija",
        "russianName": "Эвия"
      },
      {
        "id": "LOTUS_EVORA",
        "name": "Evora",
        "russianName": "Эвора"
      },
      {
        "id": "LOTUS_EXCEL",
        "name": "Excel",
        "russianName": "Эксель"
      },
      {
        "id": "LOTUS_EXIGE",
        "name": "Exige",
        "russianName": "Эксиж"
      }
    ]
  },
  "LTI": {
    "id": "LTI",
    "name": "LTI",
    "russianName": "ЛТИ",
    "models": [
      {
        "id": "LTI_FX4",
        "name": "FX4",
        "russianName": "фх4"
      },
      {
        "id": "LTI_TX",
        "name": "TX",
        "russianName": "тх"
      }
    ]
  },
  "LUAZ": {
    "id": "LUAZ",
    "name": "ЛуАЗ",
    "russianName": "ЛУАЗ",
    "models": [
      {
        "id": "LUAZ_1302",
        "name": "1302 Волынь",
        "russianName": "1302 Волынь"
      },
      {
        "id": "LUAZ_967",
        "name": "967",
        "russianName": "967"
      },
      {
        "id": "LUAZ_969",
        "name": "969",
        "russianName": "969"
      }
    ]
  },
  "LUCID": {
    "id": "LUCID",
    "name": "Lucid",
    "russianName": "Люсид",
    "models": [
      {
        "id": "LUCID_AIR",
        "name": "Air",
        "russianName": "Эир"
      },
      {
        "id": "LUCID_GRAVITY",
        "name": "Gravity",
        "russianName": "Гравити"
      }
    ]
  },
  "LUXEED": {
    "id": "LUXEED",
    "name": "Luxeed",
    "russianName": "Люксид",
    "models": [
      {
        "id": "LUXEED_R7",
        "name": "R7",
        "russianName": "Р7"
      },
      {
        "id": "LUXEED_S7",
        "name": "S7",
        "russianName": "С7"
      }
    ]
  },
  "LUXGEN": {
    "id": "LUXGEN",
    "name": "Luxgen",
    "russianName": "Люксген",
    "models": [
      {
        "id": "LUXGEN_7_MPV",
        "name": "Luxgen7 MPV",
        "russianName": "люксген7 мпв"
      },
      {
        "id": "LUXGEN_7_SUV",
        "name": "Luxgen7 SUV",
        "russianName": "люксген7 сув"
      },
      {
        "id": "LUXGEN_LUXGEN5",
        "name": "Luxgen5",
        "russianName": "люксген5"
      },
      {
        "id": "LUXGEN_U6_TURBO",
        "name": "U6 Turbo",
        "russianName": "Ю6-Турбо"
      },
      {
        "id": "LUXGEN_U7_TURBO",
        "name": "U7 Turbo",
        "russianName": "у7 турбо"
      }
    ]
  },
  "LYNK_CO": {
    "id": "LYNK_CO",
    "name": "Lynk & Co",
    "russianName": "Линк и ко",
    "models": [
      {
        "id": "LYNK_CO_01",
        "name": "01",
        "russianName": "01"
      },
      {
        "id": "LYNK_CO_02",
        "name": "02",
        "russianName": "02"
      },
      {
        "id": "LYNK_CO_03",
        "name": "03",
        "russianName": "03"
      },
      {
        "id": "LYNK_CO_05",
        "name": "05",
        "russianName": "05"
      },
      {
        "id": "LYNK_CO_06",
        "name": "06",
        "russianName": "06"
      },
      {
        "id": "LYNK_CO_07",
        "name": "07",
        "russianName": "07"
      },
      {
        "id": "LYNK_CO_08",
        "name": "08",
        "russianName": "08"
      },
      {
        "id": "LYNK_CO_09",
        "name": "09",
        "russianName": "09"
      },
      {
        "id": "LYNK_CO_10",
        "name": "10",
        "russianName": "10"
      },
      {
        "id": "LYNK_CO_900",
        "name": "900",
        "russianName": "900"
      },
      {
        "id": "LYNK_CO_Z10",
        "name": "Z10",
        "russianName": "З10"
      },
      {
        "id": "LYNK_CO_Z20",
        "name": "Z20",
        "russianName": "З20"
      }
    ]
  },
  "MAEXTRO": {
    "id": "MAEXTRO",
    "name": "Maextro",
    "russianName": "Маэкстро",
    "models": [
      {
        "id": "MAEXTRO_S800",
        "name": "S800",
        "russianName": "С800"
      }
    ]
  },
  "MAHINDRA": {
    "id": "MAHINDRA",
    "name": "Mahindra",
    "russianName": "Махиндра",
    "models": [
      {
        "id": "MAHINDRA_ARMADA",
        "name": "Armada",
        "russianName": "Армада"
      },
      {
        "id": "MAHINDRA_BOLERO",
        "name": "Bolero",
        "russianName": "Болеро"
      },
      {
        "id": "MAHINDRA_CJ_3",
        "name": "CJ-3",
        "russianName": "Си-Джей 3"
      },
      {
        "id": "MAHINDRA_CL",
        "name": "CL",
        "russianName": "сл"
      },
      {
        "id": "MAHINDRA_COMMANDER",
        "name": "Commander",
        "russianName": "Коммандер"
      },
      {
        "id": "MAHINDRA_MARSHAL",
        "name": "Marshal",
        "russianName": "Маршал"
      },
      {
        "id": "MAHINDRA_MM",
        "name": "MM",
        "russianName": "ММ"
      },
      {
        "id": "MAHINDRA_NC_640_DP",
        "name": "NC 640 DP",
        "russianName": "нс640дп"
      },
      {
        "id": "MAHINDRA_SCORPIO",
        "name": "Scorpio",
        "russianName": "Скорпио"
      },
      {
        "id": "MAHINDRA_THAR",
        "name": "Thar",
        "russianName": "Тар"
      },
      {
        "id": "MAHINDRA_VERITO",
        "name": "Verito",
        "russianName": "Верито"
      },
      {
        "id": "MAHINDRA_VOYAGER",
        "name": "Voyager",
        "russianName": "вояджер"
      },
      {
        "id": "MAHINDRA_XYLO",
        "name": "Xylo",
        "russianName": "Ксило"
      }
    ]
  },
  "MAPLE": {
    "id": "MAPLE",
    "name": "Maple",
    "russianName": "Мэйпл",
    "models": [
      {
        "id": "MAPLE_30X",
        "name": "30X",
        "russianName": "30 Икс"
      },
      {
        "id": "MAPLE_X3_PRO",
        "name": "X3 Pro",
        "russianName": "Икс 3 Про"
      }
    ]
  },
  "MARCOS": {
    "id": "MARCOS",
    "name": "Marcos",
    "russianName": "Маркос",
    "models": [
      {
        "id": "MARCOS_GTS",
        "name": "GTS",
        "russianName": "гтс"
      },
      {
        "id": "MARCOS_LM400",
        "name": "LM 400",
        "russianName": "лм400"
      },
      {
        "id": "MARCOS_LM500",
        "name": "LM 500",
        "russianName": "лм500"
      },
      {
        "id": "MARCOS_MANTIS_GT",
        "name": "Mantis",
        "russianName": "мантис"
      },
      {
        "id": "MARCOS_MARCASITE",
        "name": "Marcasite",
        "russianName": "маркасит"
      }
    ]
  },
  "MARLIN": {
    "id": "MARLIN",
    "name": "Marlin",
    "russianName": "Марлин",
    "models": [
      {
        "id": "MARLIN_5EXI",
        "name": "5EXi",
        "russianName": "файвэкси"
      },
      {
        "id": "MARLIN_SPORTSTER",
        "name": "Sportster",
        "russianName": "Спортстер"
      }
    ]
  },
  "MARUSSIA": {
    "id": "MARUSSIA",
    "name": "Marussia",
    "russianName": "Маруся",
    "models": [
      {
        "id": "MARUSSIA_B1",
        "name": "B1",
        "russianName": "б1"
      },
      {
        "id": "MARUSSIA_B2",
        "name": "B2",
        "russianName": "б2"
      }
    ]
  },
  "MARUTI": {
    "id": "MARUTI",
    "name": "Maruti",
    "russianName": "Марути",
    "models": [
      {
        "id": "MARUTI_1000",
        "name": "1000",
        "russianName": "1000"
      },
      {
        "id": "MARUTI_800",
        "name": "800",
        "russianName": "800"
      },
      {
        "id": "MARUTI_ALTO",
        "name": "Alto",
        "russianName": "альто"
      },
      {
        "id": "MARUTI_BALENO",
        "name": "Baleno",
        "russianName": "Балено"
      },
      {
        "id": "MARUTI_ESTEEM",
        "name": "Esteem",
        "russianName": "эстим"
      },
      {
        "id": "MARUTI_GYPSY",
        "name": "Gypsy",
        "russianName": "джипси"
      },
      {
        "id": "MARUTI_OMNI",
        "name": "Omni",
        "russianName": "омни"
      },
      {
        "id": "MARUTI_VERSA",
        "name": "Versa",
        "russianName": "верса"
      },
      {
        "id": "MARUTI_WAGON_R",
        "name": "Wagon R",
        "russianName": "вагон р"
      },
      {
        "id": "MARUTI_ZEN",
        "name": "Zen",
        "russianName": "зен"
      }
    ]
  },
  "MASERATI": {
    "id": "MASERATI",
    "name": "Maserati",
    "russianName": "Мазерати",
    "models": [
      {
        "id": "MASERATI_228",
        "name": "228",
        "russianName": "228"
      },
      {
        "id": "MASERATI_3200GT",
        "name": "3200 GT",
        "russianName": "3200гт"
      },
      {
        "id": "MASERATI_420",
        "name": "420",
        "russianName": "420"
      },
      {
        "id": "MASERATI_4200_GT",
        "name": "4200 GT",
        "russianName": "4200 гт"
      },
      {
        "id": "MASERATI_BARCHETTA_STRADALE",
        "name": "Barchetta Stradale",
        "russianName": "барчетта страдале"
      },
      {
        "id": "MASERATI_BITURBO",
        "name": "Biturbo",
        "russianName": "битурбо"
      },
      {
        "id": "MASERATI_BORA",
        "name": "Bora",
        "russianName": "бора"
      },
      {
        "id": "MASERATI_CHUBASCO",
        "name": "Chubasco",
        "russianName": "чубаско"
      },
      {
        "id": "MASERATI_GHIBLI",
        "name": "Ghibli",
        "russianName": "Гибли"
      },
      {
        "id": "MASERATI_GRAN_CABRIO",
        "name": "GranCabrio",
        "russianName": "ГранКабрио"
      },
      {
        "id": "MASERATI_GRAN_TURISMO",
        "name": "GranTurismo",
        "russianName": "ГранТуризмо"
      },
      {
        "id": "MASERATI_GRECALE",
        "name": "Grecale",
        "russianName": "Грекале"
      },
      {
        "id": "MASERATI_GT2_STRADALE",
        "name": "GT2 Stradale",
        "russianName": "ГТ2 Страдэйл"
      },
      {
        "id": "MASERATI_INDY",
        "name": "Indy",
        "russianName": "инди"
      },
      {
        "id": "MASERATI_KARIF",
        "name": "Karif",
        "russianName": "кариф"
      },
      {
        "id": "MASERATI_KHAMSIN",
        "name": "Khamsin",
        "russianName": "хамсин"
      },
      {
        "id": "MASERATI_KYALAMI",
        "name": "Kyalami",
        "russianName": "кьялами"
      },
      {
        "id": "MASERATI_LEVANTE",
        "name": "Levante",
        "russianName": "Леванте"
      },
      {
        "id": "MASERATI_MC12",
        "name": "MC12",
        "russianName": "мс12"
      },
      {
        "id": "MASERATI_MC20",
        "name": "MC20",
        "russianName": "мс20"
      },
      {
        "id": "MASERATI_MCPURA",
        "name": "MCPura",
        "russianName": "МСПура"
      },
      {
        "id": "MASERATI_MERAK",
        "name": "Merak",
        "russianName": "мерак"
      },
      {
        "id": "MASERATI_MEXICO",
        "name": "Mexico",
        "russianName": "мехико"
      },
      {
        "id": "MASERATI_QUATTROPORTE",
        "name": "Quattroporte",
        "russianName": "Кваттропорте"
      },
      {
        "id": "MASERATI_ROYALE",
        "name": "Royale",
        "russianName": "рояле"
      },
      {
        "id": "MASERATI_SHAMAL",
        "name": "Shamal",
        "russianName": "шамаль"
      }
    ]
  },
  "MATRA": {
    "id": "MATRA",
    "name": "Matra",
    "russianName": "Матра",
    "models": [
      {
        "id": "MATRA_MURENA",
        "name": "Murena",
        "russianName": "Мурена"
      }
    ]
  },
  "MAXUS": {
    "id": "MAXUS",
    "name": "Maxus",
    "russianName": "Максус",
    "models": [
      {
        "id": "MAXUS_D60",
        "name": "D60",
        "russianName": "Д60"
      },
      {
        "id": "MAXUS_D90_PRO",
        "name": "D90",
        "russianName": "Д90 Про"
      },
      {
        "id": "MAXUS_EUNIQ_5",
        "name": "EUNIQ 5",
        "russianName": "ЮНИК 5"
      },
      {
        "id": "MAXUS_EUNIQ_6",
        "name": "EUNIQ 6",
        "russianName": "ЮНИК 6"
      },
      {
        "id": "MAXUS_G10",
        "name": "G10",
        "russianName": "Г10"
      },
      {
        "id": "MAXUS_G20",
        "name": "G20",
        "russianName": "Джи20"
      },
      {
        "id": "MAXUS_G50",
        "name": "G50",
        "russianName": "Джи50"
      },
      {
        "id": "MAXUS_G50_MAX",
        "name": "G50 Max",
        "russianName": "Джи50 Макс"
      },
      {
        "id": "MAXUS_G50_PLUS",
        "name": "G50 Plus",
        "russianName": "Джи50 Плюс"
      },
      {
        "id": "MAXUS_G70",
        "name": "G70",
        "russianName": "Г70"
      },
      {
        "id": "MAXUS_G90",
        "name": "G90",
        "russianName": "Джи90"
      },
      {
        "id": "MAXUS_INTERSTELLAR",
        "name": "Interstellar",
        "russianName": "Интерстеллар"
      },
      {
        "id": "MAXUS_MIFA_5",
        "name": "MIFA 5",
        "russianName": "МИФА 5"
      },
      {
        "id": "MAXUS_MIFA_7",
        "name": "MIFA 7",
        "russianName": "МИФА 7"
      },
      {
        "id": "MAXUS_MIFA_9",
        "name": "MIFA 9",
        "russianName": "МИФА 9"
      },
      {
        "id": "MAXUS_T70",
        "name": "T70",
        "russianName": "Т70"
      },
      {
        "id": "MAXUS_T90",
        "name": "T90",
        "russianName": "Т90"
      },
      {
        "id": "MAXUS_TERRITORY",
        "name": "Territory",
        "russianName": "территори"
      },
      {
        "id": "MAXUS_V70",
        "name": "V70",
        "russianName": "В70"
      }
    ]
  },
  "MAYBACH": {
    "id": "MAYBACH",
    "name": "Maybach",
    "russianName": "Майбах",
    "models": [
      {
        "id": "MAYBACH_57",
        "name": "57",
        "russianName": "57"
      },
      {
        "id": "MAYBACH_62",
        "name": "62",
        "russianName": "62"
      },
      {
        "id": "MAYBACH_EXELERO",
        "name": "Exelero",
        "russianName": "Экселеро"
      },
      {
        "id": "MAYBACH_SW38",
        "name": "SW38",
        "russianName": "СВ38"
      }
    ]
  },
  "MAZDA": {
    "id": "MAZDA",
    "name": "מזדה",
    "russianName": "Мазда",
    "models": [
      {
        "id": "MAZDA_1000",
        "name": "1000",
        "russianName": "1000"
      },
      {
        "id": "MAZDA_121",
        "name": "121",
        "russianName": "121"
      },
      {
        "id": "MAZDA_1300",
        "name": "1300",
        "russianName": "1300"
      },
      {
        "id": "MAZDA_2",
        "name": "2",
        "russianName": "2"
      },
      {
        "id": "MAZDA_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "MAZDA_323",
        "name": "323",
        "russianName": "323"
      },
      {
        "id": "MAZDA_3MPS",
        "name": "3 MPS",
        "russianName": "3 МПС"
      },
      {
        "id": "MAZDA_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "MAZDA_6",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "MAZDA_616",
        "name": "616",
        "russianName": "616"
      },
      {
        "id": "MAZDA_626",
        "name": "626",
        "russianName": "626"
      },
      {
        "id": "MAZDA_6E",
        "name": "6e",
        "russianName": "6е"
      },
      {
        "id": "MAZDA_6_MPS",
        "name": "6 MPS",
        "russianName": "6 МПС"
      },
      {
        "id": "MAZDA_818",
        "name": "818",
        "russianName": "818"
      },
      {
        "id": "MAZDA_929",
        "name": "929",
        "russianName": "929"
      },
      {
        "id": "MAZDA_ATENZA",
        "name": "Atenza",
        "russianName": "Атенза"
      },
      {
        "id": "MAZDA_AUTOZAM_AZ1",
        "name": "Autozam AZ-1",
        "russianName": "Аутозам АЗ-1"
      },
      {
        "id": "MAZDA_AUTOZAM_AZ3",
        "name": "Autozam AZ-3",
        "russianName": "Автозам АЗ-3"
      },
      {
        "id": "MAZDA_AUTOZAM_CLEF",
        "name": "Autozam Clef",
        "russianName": "Автозам Клиф"
      },
      {
        "id": "MAZDA_AXELA",
        "name": "Axela",
        "russianName": "Аксела"
      },
      {
        "id": "MAZDA_AZ_OFFROAD",
        "name": "AZ-Offroad",
        "russianName": "AZ-offroad"
      },
      {
        "id": "MAZDA_AZ_WAGON",
        "name": "AZ-Wagon",
        "russianName": "AZ-wagon"
      },
      {
        "id": "MAZDA_BIANTE",
        "name": "Biante",
        "russianName": "Бианте"
      },
      {
        "id": "MAZDA_BONGO",
        "name": "Bongo",
        "russianName": "Бонго"
      },
      {
        "id": "MAZDA_BONGO_FRIENDEE",
        "name": "Bongo Friendee",
        "russianName": "Бонго Френди"
      },
      {
        "id": "MAZDA_BT_50",
        "name": "BT-50",
        "russianName": "БТ-50"
      },
      {
        "id": "MAZDA_B_SERIES",
        "name": "B-series",
        "russianName": "Б-серия"
      },
      {
        "id": "MAZDA_CAPELLA",
        "name": "Capella",
        "russianName": "Капелла"
      },
      {
        "id": "MAZDA_CAROL",
        "name": "Carol",
        "russianName": "Карол"
      },
      {
        "id": "MAZDA_CHANTEZ",
        "name": "Chantez",
        "russianName": "шантез"
      },
      {
        "id": "MAZDA_COSMO",
        "name": "Cosmo",
        "russianName": "Космо"
      },
      {
        "id": "MAZDA_CRONOS",
        "name": "Cronos",
        "russianName": "Кронос"
      },
      {
        "id": "MAZDA_CX90",
        "name": "CX-90",
        "russianName": "ЦИкс90"
      },
      {
        "id": "MAZDA_CX_3",
        "name": "CX-3",
        "russianName": "сх-3"
      },
      {
        "id": "MAZDA_CX_30",
        "name": "CX-30",
        "russianName": "сх-30"
      },
      {
        "id": "MAZDA_CX_4",
        "name": "CX-4",
        "russianName": "СХ-4"
      },
      {
        "id": "MAZDA_CX_5",
        "name": "CX-5",
        "russianName": "CX-5"
      },
      {
        "id": "MAZDA_CX_50",
        "name": "CX-50",
        "russianName": "ЦИкс-50"
      },
      {
        "id": "MAZDA_CX_60",
        "name": "CX-60",
        "russianName": "ЦИкс-60"
      },
      {
        "id": "MAZDA_CX_7",
        "name": "CX-7",
        "russianName": "CX-7"
      },
      {
        "id": "MAZDA_CX_70",
        "name": "CX-70",
        "russianName": "СХ-70"
      },
      {
        "id": "MAZDA_CX_8",
        "name": "CX-8",
        "russianName": "CX-8"
      },
      {
        "id": "MAZDA_CX_80",
        "name": "CX-80",
        "russianName": "СХ-80"
      },
      {
        "id": "MAZDA_CX_9",
        "name": "CX-9",
        "russianName": "CX-9"
      },
      {
        "id": "MAZDA_DEMIO",
        "name": "Demio",
        "russianName": "Демио"
      },
      {
        "id": "MAZDA_EFINI_MS_6",
        "name": "Efini MS-6",
        "russianName": "Ефини МС-6"
      },
      {
        "id": "MAZDA_EFINI_MS_8",
        "name": "Efini MS-8",
        "russianName": "Ефини МС-8"
      },
      {
        "id": "MAZDA_EFINI_MS_9",
        "name": "Efini MS-9",
        "russianName": "Ефини МС-9"
      },
      {
        "id": "MAZDA_ETUDE",
        "name": "Etude",
        "russianName": "этюд"
      },
      {
        "id": "MAZDA_EUNOS_100",
        "name": "Eunos 100",
        "russianName": "еунос 100"
      },
      {
        "id": "MAZDA_EUNOS_300",
        "name": "Eunos 300",
        "russianName": "Еунос 300"
      },
      {
        "id": "MAZDA_EUNOS_500",
        "name": "Eunos 500",
        "russianName": "Еунос 500"
      },
      {
        "id": "MAZDA_EUNOS_800",
        "name": "Eunos 800",
        "russianName": "Еунос 800"
      },
      {
        "id": "MAZDA_EUNOS_COSMO",
        "name": "Eunos Cosmo",
        "russianName": "Космо"
      },
      {
        "id": "MAZDA_EUNOS_PRESSO",
        "name": "Eunos Presso",
        "russianName": "Эунос Прессо"
      },
      {
        "id": "MAZDA_EZ_6",
        "name": "EZ-6",
        "russianName": "Изи 6"
      },
      {
        "id": "MAZDA_EZ_60",
        "name": "EZ-60",
        "russianName": "Изи 60"
      },
      {
        "id": "MAZDA_E_SERIES",
        "name": "E-Series",
        "russianName": "Е-Серия"
      },
      {
        "id": "MAZDA_FAMILIA",
        "name": "Familia",
        "russianName": "Фамилия"
      },
      {
        "id": "MAZDA_FLAIR",
        "name": "Flair",
        "russianName": "флэир"
      },
      {
        "id": "MAZDA_FLAIR_CROSSOVER",
        "name": "Flair Crossover",
        "russianName": "флэир кроссовер"
      },
      {
        "id": "MAZDA_FLAIR_WAGON",
        "name": "Flair Wagon",
        "russianName": "Флэир Вэгон"
      },
      {
        "id": "MAZDA_LANTIS",
        "name": "Lantis",
        "russianName": "Лантис"
      },
      {
        "id": "MAZDA_LAPUTA",
        "name": "Laputa",
        "russianName": "Лапута"
      },
      {
        "id": "MAZDA_LUCE",
        "name": "Luce",
        "russianName": "Люси"
      },
      {
        "id": "MAZDA_MILLENIA",
        "name": "Millenia",
        "russianName": "Милления"
      },
      {
        "id": "MAZDA_MPV",
        "name": "MPV",
        "russianName": "MPV"
      },
      {
        "id": "MAZDA_MX_3",
        "name": "MX-3",
        "russianName": "MX-3"
      },
      {
        "id": "MAZDA_MX_30",
        "name": "MX-30",
        "russianName": "МХ-30"
      },
      {
        "id": "MAZDA_MX_5",
        "name": "MX-5",
        "russianName": "MX-5"
      },
      {
        "id": "MAZDA_MX_6",
        "name": "MX-6",
        "russianName": "MX-6"
      },
      {
        "id": "MAZDA_NAVAJO",
        "name": "Navajo",
        "russianName": "Навайо"
      },
      {
        "id": "MAZDA_PERSONA",
        "name": "Persona",
        "russianName": "Персона"
      },
      {
        "id": "MAZDA_PREMACY",
        "name": "Premacy",
        "russianName": "Примаси"
      },
      {
        "id": "MAZDA_PROCEED",
        "name": "Proceed",
        "russianName": "просид"
      },
      {
        "id": "MAZDA_PROCEED_LEVANTE",
        "name": "Proceed Levante",
        "russianName": "Просид Леванте"
      },
      {
        "id": "MAZDA_PROCEED_MARVIE",
        "name": "Proceed Marvie",
        "russianName": "Просид Марви"
      },
      {
        "id": "MAZDA_PROTEGE",
        "name": "Protege",
        "russianName": "Протеж"
      },
      {
        "id": "MAZDA_REVUE",
        "name": "Revue",
        "russianName": "Ревю"
      },
      {
        "id": "MAZDA_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      },
      {
        "id": "MAZDA_RX_5",
        "name": "RX-5",
        "russianName": "РХ-5"
      },
      {
        "id": "MAZDA_RX_7",
        "name": "RX-7",
        "russianName": "RX-7"
      },
      {
        "id": "MAZDA_RX_8",
        "name": "RX-8",
        "russianName": "RX-8"
      },
      {
        "id": "MAZDA_R_360",
        "name": "R360",
        "russianName": "р360"
      },
      {
        "id": "MAZDA_SAVANNA_RX7",
        "name": "Savanna RX-7",
        "russianName": "Саванна RX-7"
      },
      {
        "id": "MAZDA_SCRUM",
        "name": "Scrum",
        "russianName": "Скрум"
      },
      {
        "id": "MAZDA_SENTIA",
        "name": "Sentia",
        "russianName": "Сентия"
      },
      {
        "id": "MAZDA_SPIANO",
        "name": "Spiano",
        "russianName": "Спиано"
      },
      {
        "id": "MAZDA_TRIBUTE",
        "name": "Tribute",
        "russianName": "Трибьют"
      },
      {
        "id": "MAZDA_VERISA",
        "name": "Verisa",
        "russianName": "Вериса"
      },
      {
        "id": "MAZDA_XEDOS_6",
        "name": "Xedos 6",
        "russianName": "Кседос 6"
      },
      {
        "id": "MAZDA_XEDOS_9",
        "name": "Xedos 9",
        "russianName": "Кседос 9"
      }
    ]
  },
  "MCLAREN": {
    "id": "MCLAREN",
    "name": "McLaren",
    "russianName": "МакЛарен",
    "models": [
      {
        "id": "MCLAREN_12C",
        "name": "MP4-12C",
        "russianName": "мп4-12с"
      },
      {
        "id": "MCLAREN_540C",
        "name": "540C",
        "russianName": "540с"
      },
      {
        "id": "MCLAREN_570GT",
        "name": "570GT",
        "russianName": "570гт"
      },
      {
        "id": "MCLAREN_570S",
        "name": "570S",
        "russianName": "570с"
      },
      {
        "id": "MCLAREN_600LT",
        "name": "600LT",
        "russianName": "600лт"
      },
      {
        "id": "MCLAREN_650S",
        "name": "650S",
        "russianName": "650с"
      },
      {
        "id": "MCLAREN_675LT",
        "name": "675LT",
        "russianName": "657лт"
      },
      {
        "id": "MCLAREN_720S",
        "name": "720S",
        "russianName": "720С"
      },
      {
        "id": "MCLAREN_750S",
        "name": "750S",
        "russianName": "750С"
      },
      {
        "id": "MCLAREN_765LT",
        "name": "765LT",
        "russianName": "765лт"
      },
      {
        "id": "MCLAREN_ARTURA",
        "name": "Artura",
        "russianName": "Артура"
      },
      {
        "id": "MCLAREN_ELVA",
        "name": "Elva",
        "russianName": "Элва"
      },
      {
        "id": "MCLAREN_F1",
        "name": "F1",
        "russianName": "ф1"
      },
      {
        "id": "MCLAREN_GT",
        "name": "GT",
        "russianName": "ГТ"
      },
      {
        "id": "MCLAREN_GTS",
        "name": "GTS",
        "russianName": "ГТС"
      },
      {
        "id": "MCLAREN_P1",
        "name": "P1",
        "russianName": "П1"
      },
      {
        "id": "MCLAREN_SENNA",
        "name": "Senna",
        "russianName": "Сенна"
      },
      {
        "id": "MCLAREN_W1",
        "name": "W1",
        "russianName": "В1"
      }
    ]
  },
  "MEGA": {
    "id": "MEGA",
    "name": "Mega",
    "russianName": "Мега",
    "models": [
      {
        "id": "MEGA_CLUB",
        "name": "Club",
        "russianName": "клаб"
      },
      {
        "id": "MEGA_MONTE_CARLO",
        "name": "Monte Carlo",
        "russianName": "монте карло"
      },
      {
        "id": "MEGA_TRACK",
        "name": "Track",
        "russianName": "трек"
      }
    ]
  },
  "MERCEDES": {
    "id": "MERCEDES",
    "name": "מרצדס-בנץ",
    "russianName": "Мерседес-Бенц",
    "models": [
      {
        "id": "MERCEDES_190_SL",
        "name": "190 SL",
        "russianName": "190 сл"
      },
      {
        "id": "MERCEDES_220_W187",
        "name": "220 (W187)",
        "russianName": "220 (В187)"
      },
      {
        "id": "MERCEDES_300_SLR",
        "name": "300 SLR",
        "russianName": "300 СЛР"
      },
      {
        "id": "MERCEDES_AMG_GLC_COUPE",
        "name": "GLC Coupe AMG",
        "russianName": "глц купе амг"
      },
      {
        "id": "MERCEDES_AMG_GT",
        "name": "AMG GT",
        "russianName": "АМГ GT"
      },
      {
        "id": "MERCEDES_AMG_ONE",
        "name": "AMG ONE",
        "russianName": "АМГ УАН"
      },
      {
        "id": "MERCEDES_AMG_PURESPEED",
        "name": "AMG PureSpeed",
        "russianName": "АМГ ПьюрСпид"
      },
      {
        "id": "MERCEDES_A_KLASSE",
        "name": "A-Класс",
        "russianName": "А-класс"
      },
      {
        "id": "MERCEDES_A_KLASSE_AMG",
        "name": "A-Класс AMG",
        "russianName": "А-класс АМГ"
      },
      {
        "id": "MERCEDES_B_KLASSE",
        "name": "B-Класс",
        "russianName": "B-класс"
      },
      {
        "id": "MERCEDES_CITAN",
        "name": "Citan",
        "russianName": "Цитан"
      },
      {
        "id": "MERCEDES_CLA_KLASSE",
        "name": "CLA",
        "russianName": "ЦЛА-класс"
      },
      {
        "id": "MERCEDES_CLA_KLASSE_AMG",
        "name": "CLA AMG",
        "russianName": "ЦЛА-класс АМГ"
      },
      {
        "id": "MERCEDES_CLC_KLASSE",
        "name": "CLC-Класс",
        "russianName": "ЦЛЦ-класс"
      },
      {
        "id": "MERCEDES_CLE_KLASSE",
        "name": "CLE",
        "russianName": "ЦЛЕ-класс"
      },
      {
        "id": "MERCEDES_CLE_KLASSE_AMG",
        "name": "CLE AMG",
        "russianName": "ЦЛЕ-класс АМГ"
      },
      {
        "id": "MERCEDES_CLK_AMG_GTR",
        "name": "CLK AMG GTR",
        "russianName": "ЦЛК АМГ ГТР"
      },
      {
        "id": "MERCEDES_CLK_KLASSE",
        "name": "CLK-Класс",
        "russianName": "ЦЛК-класс"
      },
      {
        "id": "MERCEDES_CLK_KLASSE_AMG",
        "name": "CLK-Класс AMG",
        "russianName": "ЦЛК-класс АМГ"
      },
      {
        "id": "MERCEDES_CLS_KLASSE",
        "name": "CLS",
        "russianName": "ЦЛС-класс"
      },
      {
        "id": "MERCEDES_CLS_KLASSE_AMG",
        "name": "CLS AMG",
        "russianName": "ЦЛС-класс АМГ"
      },
      {
        "id": "MERCEDES_CL_KLASSE",
        "name": "CL-Класс",
        "russianName": "ЦЛ-класс"
      },
      {
        "id": "MERCEDES_CL_KLASSE_AMG",
        "name": "CL-Класс AMG",
        "russianName": "ЦЛ-класс АМГ"
      },
      {
        "id": "MERCEDES_C_KLASSE",
        "name": "C-Класс",
        "russianName": "Ц-класс"
      },
      {
        "id": "MERCEDES_C_KLASSE_AMG",
        "name": "C-Класс AMG",
        "russianName": "Ц-класс АМГ"
      },
      {
        "id": "MERCEDES_EQA",
        "name": "EQA",
        "russianName": "ЕКьюА"
      },
      {
        "id": "MERCEDES_EQB",
        "name": "EQB",
        "russianName": "ЕКьюБ"
      },
      {
        "id": "MERCEDES_EQC",
        "name": "EQC",
        "russianName": "ЕКьюС"
      },
      {
        "id": "MERCEDES_EQE",
        "name": "EQE",
        "russianName": "ЕКьюЕ"
      },
      {
        "id": "MERCEDES_EQE_AMG",
        "name": "EQE AMG",
        "russianName": "ЕКьюЕ АМГ"
      },
      {
        "id": "MERCEDES_EQE_SUV",
        "name": "EQE SUV",
        "russianName": "ЕКьюЕ СУВ"
      },
      {
        "id": "MERCEDES_EQE_SUV_AMG",
        "name": "EQE SUV AMG",
        "russianName": "ЕКьюЕ СУВ АМГ"
      },
      {
        "id": "MERCEDES_EQS",
        "name": "EQS",
        "russianName": "ЕКьюЭс"
      },
      {
        "id": "MERCEDES_EQS_AMG",
        "name": "EQS AMG",
        "russianName": "ЕКьюЭс АМГ"
      },
      {
        "id": "MERCEDES_EQS_SUV",
        "name": "EQS SUV",
        "russianName": "ЕКьюЭс СУВ"
      },
      {
        "id": "MERCEDES_EQT",
        "name": "EQT",
        "russianName": "ЕКьюТи"
      },
      {
        "id": "MERCEDES_EQV",
        "name": "EQV",
        "russianName": "ЕКьюВ"
      },
      {
        "id": "MERCEDES_E_KLASSE",
        "name": "E-Класс",
        "russianName": "Е-класс"
      },
      {
        "id": "MERCEDES_E_KLASSE_AMG",
        "name": "E-Класс AMG",
        "russianName": "Е-класс АМГ"
      },
      {
        "id": "MERCEDES_GLA_CLASS",
        "name": "GLA",
        "russianName": "ГЛА-класс"
      },
      {
        "id": "MERCEDES_GLA_CLASS_AMG",
        "name": "GLA AMG",
        "russianName": "ГЛА-класс АМГ"
      },
      {
        "id": "MERCEDES_GLB_AMG",
        "name": "GLB AMG",
        "russianName": "ГЛБ АМГ"
      },
      {
        "id": "MERCEDES_GLB_KLASSE",
        "name": "GLB",
        "russianName": "ГЛБ"
      },
      {
        "id": "MERCEDES_GLC_COUPE",
        "name": "GLC Coupe",
        "russianName": "ГЛЦ Купе"
      },
      {
        "id": "MERCEDES_GLC_EQ",
        "name": "GLC EQ",
        "russianName": "ГЛЦ ЕКью"
      },
      {
        "id": "MERCEDES_GLC_KLASSE",
        "name": "GLC",
        "russianName": "ГЛЦ"
      },
      {
        "id": "MERCEDES_GLC_KLASSE_AMG",
        "name": "GLC AMG",
        "russianName": "ГЛЦ АМГ"
      },
      {
        "id": "MERCEDES_GLE_KLASSE",
        "name": "GLE",
        "russianName": "ГЛЕ"
      },
      {
        "id": "MERCEDES_GLE_KLASSE_AMG",
        "name": "GLE AMG",
        "russianName": "ГЛЕ АМГ"
      },
      {
        "id": "MERCEDES_GLE_KLASSE_COUPE",
        "name": "GLE Coupe",
        "russianName": "ГЛЕ Купе"
      },
      {
        "id": "MERCEDES_GLE_KLASSE_COUPE_AMG",
        "name": "GLE Coupe AMG",
        "russianName": "ГЛЕ Купе АМГ"
      },
      {
        "id": "MERCEDES_GLK_KLASSE",
        "name": "GLK-Класс",
        "russianName": "GLK-класс"
      },
      {
        "id": "MERCEDES_GLS_KLASSE",
        "name": "GLS",
        "russianName": "GLS-класс"
      },
      {
        "id": "MERCEDES_GLS_KLASSE_AMG",
        "name": "GLS AMG",
        "russianName": "GLS-класс АМГ"
      },
      {
        "id": "MERCEDES_GL_KLASSE",
        "name": "GL-Класс",
        "russianName": "GL-класс"
      },
      {
        "id": "MERCEDES_GL_KLASSE_AMG",
        "name": "GL-Класс AMG",
        "russianName": "GL-класс АМГ"
      },
      {
        "id": "MERCEDES_G_KLASSE",
        "name": "G-Класс",
        "russianName": "G-класс"
      },
      {
        "id": "MERCEDES_G_KLASSE_AMG",
        "name": "G-Класс AMG",
        "russianName": "G-класс АМГ"
      },
      {
        "id": "MERCEDES_G_KLASSE_AMG_6X6",
        "name": "G-Класс AMG 6x6",
        "russianName": "G-класс АМГ 6x6"
      },
      {
        "id": "MERCEDES_MARCO_POLO",
        "name": "Marco Polo",
        "russianName": "Марко Поло"
      },
      {
        "id": "MERCEDES_MAYBACH_EQS_SUV",
        "name": "Maybach EQS SUV",
        "russianName": "Майбах ЕКьюэС СУВ"
      },
      {
        "id": "MERCEDES_MAYBACH_GLS",
        "name": "Maybach GLS",
        "russianName": "Майбах ГЛС"
      },
      {
        "id": "MERCEDES_MAYBACH_G_650",
        "name": "Maybach G 650 Landaulet",
        "russianName": "Майбах Джи 650"
      },
      {
        "id": "MERCEDES_MAYBACH_SL",
        "name": "Maybach SL",
        "russianName": "Майбах СЛ"
      },
      {
        "id": "MERCEDES_METRIS",
        "name": "Metris",
        "russianName": "Метрис"
      },
      {
        "id": "MERCEDES_M_KLASSE",
        "name": "M-Класс",
        "russianName": "M-класс"
      },
      {
        "id": "MERCEDES_M_KLASSE_AMG",
        "name": "M-Класс AMG",
        "russianName": "М-класс АМГ"
      },
      {
        "id": "MERCEDES_R_KLASSE",
        "name": "R-Класс",
        "russianName": "Р-класс"
      },
      {
        "id": "MERCEDES_R_KLASSE_AMG",
        "name": "R-Класс AMG",
        "russianName": "Р-класс АМГ"
      },
      {
        "id": "MERCEDES_SIMPLEX",
        "name": "Simplex",
        "russianName": "Симплекс"
      },
      {
        "id": "MERCEDES_SLC_KLASSE",
        "name": "SLC",
        "russianName": "CЛЦ-класс"
      },
      {
        "id": "MERCEDES_SLC_KLASSE_AMG",
        "name": "SLC AMG",
        "russianName": "CЛЦ-класс AMG"
      },
      {
        "id": "MERCEDES_SLK_KLASSE",
        "name": "SLK-Класс",
        "russianName": "СЛК-класс"
      },
      {
        "id": "MERCEDES_SLK_KLASSE_AMG",
        "name": "SLK-Класс AMG",
        "russianName": "СЛК-класс АМГ"
      },
      {
        "id": "MERCEDES_SLR_KLASSE",
        "name": "SLR McLaren",
        "russianName": "SLR Макларен"
      },
      {
        "id": "MERCEDES_SLS_AMG",
        "name": "SLS AMG",
        "russianName": "SLS AMG"
      },
      {
        "id": "MERCEDES_SL_KLASSE",
        "name": "SL-Класс",
        "russianName": "SL-класс"
      },
      {
        "id": "MERCEDES_SL_KLASSE_AMG",
        "name": "SL-Класс AMG",
        "russianName": "СЛ-класс АМГ"
      },
      {
        "id": "MERCEDES_S_CLASS_MAYBACH",
        "name": "Maybach S-Класс",
        "russianName": "Майбах Эс-Класс"
      },
      {
        "id": "MERCEDES_S_KLASSE",
        "name": "S-Класс",
        "russianName": "S-класс"
      },
      {
        "id": "MERCEDES_S_KLASSE_AMG",
        "name": "S-Класс AMG",
        "russianName": "S-класс АМГ"
      },
      {
        "id": "MERCEDES_TYP_630",
        "name": "Typ 630",
        "russianName": "Тип 630"
      },
      {
        "id": "MERCEDES_T_KLASSE",
        "name": "T-Класс",
        "russianName": "Т-класс"
      },
      {
        "id": "MERCEDES_VANEO",
        "name": "Vaneo",
        "russianName": "Ванео"
      },
      {
        "id": "MERCEDES_VIANO",
        "name": "Viano",
        "russianName": "Виано"
      },
      {
        "id": "MERCEDES_VITO",
        "name": "Vito",
        "russianName": "вито"
      },
      {
        "id": "MERCEDES_V_KLASSE",
        "name": "V-Класс",
        "russianName": "V-класс"
      },
      {
        "id": "MERCEDES_W100",
        "name": "W100",
        "russianName": "в100"
      },
      {
        "id": "MERCEDES_W105",
        "name": "W105",
        "russianName": "в105"
      },
      {
        "id": "MERCEDES_W108",
        "name": "W108",
        "russianName": "в108"
      },
      {
        "id": "MERCEDES_W110",
        "name": "W110",
        "russianName": "в110"
      },
      {
        "id": "MERCEDES_W111",
        "name": "W111",
        "russianName": "W111"
      },
      {
        "id": "MERCEDES_W114",
        "name": "W114",
        "russianName": "W114"
      },
      {
        "id": "MERCEDES_W115",
        "name": "W115",
        "russianName": "W115"
      },
      {
        "id": "MERCEDES_W120",
        "name": "W120",
        "russianName": "в120"
      },
      {
        "id": "MERCEDES_W121",
        "name": "W121",
        "russianName": "W121"
      },
      {
        "id": "MERCEDES_W123",
        "name": "W123",
        "russianName": "W123"
      },
      {
        "id": "MERCEDES_W124",
        "name": "W124",
        "russianName": "W124"
      },
      {
        "id": "MERCEDES_W128",
        "name": "W128",
        "russianName": "W128"
      },
      {
        "id": "MERCEDES_W136",
        "name": "W136",
        "russianName": "в136"
      },
      {
        "id": "MERCEDES_W138",
        "name": "W138",
        "russianName": "В138"
      },
      {
        "id": "MERCEDES_W142",
        "name": "W142",
        "russianName": "в142"
      },
      {
        "id": "MERCEDES_W180",
        "name": "W180",
        "russianName": "В180"
      },
      {
        "id": "MERCEDES_W186",
        "name": "W186",
        "russianName": "в186"
      },
      {
        "id": "MERCEDES_W188",
        "name": "W188",
        "russianName": "в188"
      },
      {
        "id": "MERCEDES_W189",
        "name": "W189",
        "russianName": "в189"
      },
      {
        "id": "MERCEDES_W191",
        "name": "W191",
        "russianName": "в191"
      },
      {
        "id": "MERCEDES_W201",
        "name": "190 (W201)",
        "russianName": "190"
      },
      {
        "id": "MERCEDES_W21",
        "name": "W21",
        "russianName": "в21"
      },
      {
        "id": "MERCEDES_W29",
        "name": "W29",
        "russianName": "в29"
      },
      {
        "id": "MERCEDES_X_KLASSE",
        "name": "X-Класс",
        "russianName": "X-класс"
      }
    ]
  },
  "MERCURY": {
    "id": "MERCURY",
    "name": "Mercury",
    "russianName": "Меркури",
    "models": [
      {
        "id": "MERCURY_CAPRI",
        "name": "Capri",
        "russianName": "Капри"
      },
      {
        "id": "MERCURY_COLONY_PARK",
        "name": "Colony Park",
        "russianName": "Колони Парк"
      },
      {
        "id": "MERCURY_COUGAR",
        "name": "Cougar",
        "russianName": "Когуар"
      },
      {
        "id": "MERCURY_EIGHT",
        "name": "Eight",
        "russianName": "Эйт"
      },
      {
        "id": "MERCURY_GRAND_MARQUIS",
        "name": "Grand Marquis",
        "russianName": "Гранд Маркиз"
      },
      {
        "id": "MERCURY_MARAUDER",
        "name": "Marauder",
        "russianName": "Марадер"
      },
      {
        "id": "MERCURY_MARINER",
        "name": "Mariner",
        "russianName": "Маринер"
      },
      {
        "id": "MERCURY_MARQUIES",
        "name": "Marquis",
        "russianName": "Маркиз"
      },
      {
        "id": "MERCURY_MILAN",
        "name": "Milan",
        "russianName": "Милан"
      },
      {
        "id": "MERCURY_MONTEGO",
        "name": "Montego",
        "russianName": "Монтего"
      },
      {
        "id": "MERCURY_MONTEREY",
        "name": "Monterey",
        "russianName": "Монтерей"
      },
      {
        "id": "MERCURY_MOUNTAINEER",
        "name": "Mountaineer",
        "russianName": "Моунтайнер"
      },
      {
        "id": "MERCURY_MYSTIQUE",
        "name": "Mystique",
        "russianName": "Мистик"
      },
      {
        "id": "MERCURY_SABLE",
        "name": "Sable",
        "russianName": "Сабл"
      },
      {
        "id": "MERCURY_TOPAZ",
        "name": "Topaz",
        "russianName": "Топаз"
      },
      {
        "id": "MERCURY_TRACER",
        "name": "Tracer",
        "russianName": "Трейсер"
      },
      {
        "id": "MERCURY_VILLAGER",
        "name": "Villager",
        "russianName": "Виладжер"
      }
    ]
  },
  "MERKUR": {
    "id": "MERKUR",
    "name": "Merkur",
    "russianName": "Меркур",
    "models": [
      {
        "id": "MERKUR_XR4TI",
        "name": "XR4Ti",
        "russianName": "ИксР4ТИ"
      }
    ]
  },
  "MESSERSCHMITT": {
    "id": "MESSERSCHMITT",
    "name": "Messerschmitt",
    "russianName": "Мессершмитт",
    "models": [
      {
        "id": "MESSERSCHMITT_KR200",
        "name": "KR200",
        "russianName": "КР200"
      }
    ]
  },
  "METROCAB": {
    "id": "METROCAB",
    "name": "Metrocab",
    "russianName": "Метрокэб",
    "models": [
      {
        "id": "METROCAB_METROCAB_1",
        "name": "Metrocab I",
        "russianName": "Метрокаб 1"
      },
      {
        "id": "METROCAB_METROCAB_II_TTT",
        "name": "Metrocab II (TTT)",
        "russianName": "Метрокаб 2"
      }
    ]
  },
  "MG": {
    "id": "MG",
    "name": "אמ.ג'י",
    "russianName": "Эм-Джи",
    "models": [
      {
        "id": "MG_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "MG_350",
        "name": "350",
        "russianName": "350"
      },
      {
        "id": "MG_4_EV",
        "name": "4 EV",
        "russianName": "4 ЕВ"
      },
      {
        "id": "MG_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "MG_550",
        "name": "550",
        "russianName": "550"
      },
      {
        "id": "MG_5_EV",
        "name": "5 EV",
        "russianName": "5 ЕВ"
      },
      {
        "id": "MG_5_SCORPIO",
        "name": "5 Scorpio",
        "russianName": "5 Скорпио"
      },
      {
        "id": "MG_6",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "MG_6_PRO",
        "name": "6 Pro",
        "russianName": "6 Про"
      },
      {
        "id": "MG_7",
        "name": "7",
        "russianName": "7"
      },
      {
        "id": "MG_750",
        "name": "750",
        "russianName": "750"
      },
      {
        "id": "MG_8",
        "name": "8",
        "russianName": "8"
      },
      {
        "id": "MG_CYBERSTER",
        "name": "Cyberster",
        "russianName": "Киберстер"
      },
      {
        "id": "MG_ES5",
        "name": "ES5",
        "russianName": "ЕС5"
      },
      {
        "id": "MG_F",
        "name": "F",
        "russianName": "ф"
      },
      {
        "id": "MG_GS",
        "name": "GS",
        "russianName": "Джи Эс"
      },
      {
        "id": "MG_HS",
        "name": "HS",
        "russianName": "ХС"
      },
      {
        "id": "MG_MAESTRO",
        "name": "Maestro",
        "russianName": "Маэстро"
      },
      {
        "id": "MG_METRO",
        "name": "Metro",
        "russianName": "Метро"
      },
      {
        "id": "MG_MGA",
        "name": "MGA",
        "russianName": "МГА"
      },
      {
        "id": "MG_MGB",
        "name": "MGB",
        "russianName": "мгб"
      },
      {
        "id": "MG_MIDGET",
        "name": "Midget",
        "russianName": "Миджет"
      },
      {
        "id": "MG_MONTEGO",
        "name": "Montego",
        "russianName": "Монтего"
      },
      {
        "id": "MG_MULAN",
        "name": "Mulan",
        "russianName": "Мулан"
      },
      {
        "id": "MG_ONE",
        "name": "One",
        "russianName": "Уан"
      },
      {
        "id": "MG_PILOT",
        "name": "Pilot",
        "russianName": "Пилот"
      },
      {
        "id": "MG_RV8",
        "name": "RV8",
        "russianName": "рв8"
      },
      {
        "id": "MG_RX5",
        "name": "RX5",
        "russianName": "РХ5"
      },
      {
        "id": "MG_RX8",
        "name": "RX8",
        "russianName": "РИкс8"
      },
      {
        "id": "MG_RX9",
        "name": "RX9",
        "russianName": "rx9"
      },
      {
        "id": "MG_T60",
        "name": "T60",
        "russianName": "Т60"
      },
      {
        "id": "MG_TD_MIDGET",
        "name": "TD Midget",
        "russianName": "ТД-Миджет"
      },
      {
        "id": "MG_TF",
        "name": "TF",
        "russianName": "тф"
      },
      {
        "id": "MG_XPOWER_SV",
        "name": "Xpower SV",
        "russianName": "хпауер св"
      },
      {
        "id": "MG_ZR",
        "name": "ZR",
        "russianName": "зр"
      },
      {
        "id": "MG_ZS",
        "name": "ZS",
        "russianName": "зс"
      },
      {
        "id": "MG_ZT",
        "name": "ZT",
        "russianName": "ЗТ"
      }
    ]
  },
  "MICRO": {
    "id": "MICRO",
    "name": "Micro",
    "russianName": "Микро",
    "models": [
      {
        "id": "MICRO_MICROLINO",
        "name": "Microlino",
        "russianName": "Микролино"
      }
    ]
  },
  "MICROCAR": {
    "id": "MICROCAR",
    "name": "Microcar",
    "russianName": "Микрокар",
    "models": [
      {
        "id": "MICROCAR_F8C",
        "name": "F8C",
        "russianName": "ф8с"
      },
      {
        "id": "MICROCAR_M8",
        "name": "M8",
        "russianName": "м8"
      },
      {
        "id": "MICROCAR_MC",
        "name": "MC",
        "russianName": "мс"
      },
      {
        "id": "MICROCAR_MGO",
        "name": "M.Go",
        "russianName": "м.го"
      },
      {
        "id": "MICROCAR_VIRGO",
        "name": "Virgo",
        "russianName": "вирго"
      }
    ]
  },
  "MINELLI": {
    "id": "MINELLI",
    "name": "Minelli",
    "russianName": "Минелли",
    "models": [
      {
        "id": "MINELLI_TF_1800",
        "name": "TF 1800",
        "russianName": "тф 1800"
      }
    ]
  },
  "MINI": {
    "id": "MINI",
    "name": "מיני",
    "russianName": "Мини",
    "models": [
      {
        "id": "MINI_ACEMAN",
        "name": "Aceman",
        "russianName": "Эйсмэн"
      },
      {
        "id": "MINI_CABRIO",
        "name": "Cabrio",
        "russianName": "Cabrio"
      },
      {
        "id": "MINI_CLUBMAN",
        "name": "Clubman",
        "russianName": "Клубмэн"
      },
      {
        "id": "MINI_COUNTRYMAN",
        "name": "Countryman",
        "russianName": "Кантримэн"
      },
      {
        "id": "MINI_COUPE",
        "name": "Coupe",
        "russianName": "Купе"
      },
      {
        "id": "MINI_HATCH",
        "name": "Hatch",
        "russianName": "Хэтч"
      },
      {
        "id": "MINI_PACEMAN",
        "name": "Paceman",
        "russianName": "Пейсмэн"
      },
      {
        "id": "MINI_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "MITSUBISHI": {
    "id": "MITSUBISHI",
    "name": "מיצובישי",
    "russianName": "Митсубиси",
    "models": [
      {
        "id": "MITSUBISHI_3000_GT",
        "name": "3000 GT",
        "russianName": "3000"
      },
      {
        "id": "MITSUBISHI_500",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "MITSUBISHI_AIRTREK",
        "name": "Airtrek",
        "russianName": "Аиртрек"
      },
      {
        "id": "MITSUBISHI_ASPIRE",
        "name": "Aspire",
        "russianName": "Аспайр"
      },
      {
        "id": "MITSUBISHI_ASX",
        "name": "ASX",
        "russianName": "ASX"
      },
      {
        "id": "MITSUBISHI_ATTRAGE",
        "name": "Attrage",
        "russianName": "Аттраж"
      },
      {
        "id": "MITSUBISHI_BRABO",
        "name": "Bravo",
        "russianName": "Браво"
      },
      {
        "id": "MITSUBISHI_CARISMA",
        "name": "Carisma",
        "russianName": "Каризма"
      },
      {
        "id": "MITSUBISHI_CELESTE",
        "name": "Celeste",
        "russianName": "Селест"
      },
      {
        "id": "MITSUBISHI_CHALLENGER",
        "name": "Challenger",
        "russianName": "Челленджер"
      },
      {
        "id": "MITSUBISHI_CHARIOT",
        "name": "Chariot",
        "russianName": "Шариот"
      },
      {
        "id": "MITSUBISHI_COLT",
        "name": "Colt",
        "russianName": "Кольт"
      },
      {
        "id": "MITSUBISHI_CORDIA",
        "name": "Cordia",
        "russianName": "Кордия"
      },
      {
        "id": "MITSUBISHI_DEBONAIR",
        "name": "Debonair",
        "russianName": "дебонаир"
      },
      {
        "id": "MITSUBISHI_DELICA",
        "name": "Delica",
        "russianName": "Делика"
      },
      {
        "id": "MITSUBISHI_DELICA_D2",
        "name": "Delica D:2",
        "russianName": "Делика Д:2"
      },
      {
        "id": "MITSUBISHI_DELICA_D3",
        "name": "Delica D:3",
        "russianName": "Делика Д:3"
      },
      {
        "id": "MITSUBISHI_DELICA_D_5",
        "name": "Delica D:5",
        "russianName": "Дулика Д:5"
      },
      {
        "id": "MITSUBISHI_DELICA_MINI",
        "name": "Delica Mini",
        "russianName": "Делика Мини"
      },
      {
        "id": "MITSUBISHI_DESTINATOR",
        "name": "Destinator",
        "russianName": "Дестинатор"
      },
      {
        "id": "MITSUBISHI_DIAMANTE",
        "name": "Diamante",
        "russianName": "Диамант"
      },
      {
        "id": "MITSUBISHI_DIGNITY",
        "name": "Dignity",
        "russianName": "Дигнити"
      },
      {
        "id": "MITSUBISHI_DINGO",
        "name": "Dingo",
        "russianName": "Динго"
      },
      {
        "id": "MITSUBISHI_DION",
        "name": "Dion",
        "russianName": "Дион"
      },
      {
        "id": "MITSUBISHI_ECLIPSE",
        "name": "Eclipse",
        "russianName": "Эклипс"
      },
      {
        "id": "MITSUBISHI_ECLIPSE_CROSS",
        "name": "Eclipse Cross",
        "russianName": "Эклипс Кросс"
      },
      {
        "id": "MITSUBISHI_EK_ACTIVE",
        "name": "eK Active",
        "russianName": "еК Актив"
      },
      {
        "id": "MITSUBISHI_EK_CLASSIC",
        "name": "eK Classic",
        "russianName": "еК Классик"
      },
      {
        "id": "MITSUBISHI_EK_CUSTOM",
        "name": "eK Custom",
        "russianName": "еК Кастом"
      },
      {
        "id": "MITSUBISHI_EK_SPACE",
        "name": "eK Space",
        "russianName": "еК Спейс"
      },
      {
        "id": "MITSUBISHI_EK_SPORT",
        "name": "eK Sport",
        "russianName": "еК Спорт"
      },
      {
        "id": "MITSUBISHI_EK_WAGON",
        "name": "eK Wagon",
        "russianName": "eK Вагон"
      },
      {
        "id": "MITSUBISHI_EMERAUDE",
        "name": "Emeraude",
        "russianName": "Эмерауд"
      },
      {
        "id": "MITSUBISHI_ENDEAVOR",
        "name": "Endeavor",
        "russianName": "Эндевор"
      },
      {
        "id": "MITSUBISHI_ETERNA",
        "name": "Eterna",
        "russianName": "Этерна"
      },
      {
        "id": "MITSUBISHI_FREECA",
        "name": "Freeca",
        "russianName": "фриса"
      },
      {
        "id": "MITSUBISHI_FTO",
        "name": "FTO",
        "russianName": "FTO"
      },
      {
        "id": "MITSUBISHI_GALANT",
        "name": "Galant",
        "russianName": "Галант"
      },
      {
        "id": "MITSUBISHI_GALANT_FORTIS",
        "name": "Galant Fortis",
        "russianName": "Галант Фортис"
      },
      {
        "id": "MITSUBISHI_GRANDIS",
        "name": "Grandis",
        "russianName": "Грандис"
      },
      {
        "id": "MITSUBISHI_GTO",
        "name": "GTO",
        "russianName": "GTO"
      },
      {
        "id": "MITSUBISHI_I",
        "name": "i",
        "russianName": "i"
      },
      {
        "id": "MITSUBISHI_I_MIEV",
        "name": "i-MiEV",
        "russianName": "i-MiEV"
      },
      {
        "id": "MITSUBISHI_JEEP_J",
        "name": "Jeep J",
        "russianName": "Джип"
      },
      {
        "id": "MITSUBISHI_L200",
        "name": "L200",
        "russianName": "Л200"
      },
      {
        "id": "MITSUBISHI_L300",
        "name": "L300",
        "russianName": "л300"
      },
      {
        "id": "MITSUBISHI_L400",
        "name": "L400",
        "russianName": "л400"
      },
      {
        "id": "MITSUBISHI_LANCER",
        "name": "Lancer",
        "russianName": "Лансер"
      },
      {
        "id": "MITSUBISHI_LANCER_CARGO",
        "name": "Lancer Cargo",
        "russianName": "Лансер Карго"
      },
      {
        "id": "MITSUBISHI_LANCER_EVOLUTION",
        "name": "Lancer Evolution",
        "russianName": "Лансер Эволюшн"
      },
      {
        "id": "MITSUBISHI_LANCER_RALLIART",
        "name": "Lancer Ralliart",
        "russianName": "Лансер Раллиарт"
      },
      {
        "id": "MITSUBISHI_LEGNUM",
        "name": "Legnum",
        "russianName": "Легнум"
      },
      {
        "id": "MITSUBISHI_LIBERO",
        "name": "Libero",
        "russianName": "Либеро"
      },
      {
        "id": "MITSUBISHI_MINICA",
        "name": "Minica",
        "russianName": "Миника"
      },
      {
        "id": "MITSUBISHI_MINICAB",
        "name": "Minicab",
        "russianName": "Миникэб"
      },
      {
        "id": "MITSUBISHI_MIRAGE",
        "name": "Mirage",
        "russianName": "Мираж"
      },
      {
        "id": "MITSUBISHI_MONTERO",
        "name": "Montero",
        "russianName": "Монтеро"
      },
      {
        "id": "MITSUBISHI_MONTERO_SPORT",
        "name": "Montero Sport",
        "russianName": "Монтеро Спорт"
      },
      {
        "id": "MITSUBISHI_OUTLANDER",
        "name": "Outlander",
        "russianName": "Аутлендер"
      },
      {
        "id": "MITSUBISHI_OUTLANDER_SPORT",
        "name": "Outlander Sport",
        "russianName": "Аутлендер Спорт"
      },
      {
        "id": "MITSUBISHI_PAJERO",
        "name": "Pajero",
        "russianName": "Паджеро"
      },
      {
        "id": "MITSUBISHI_PAJERO_IO",
        "name": "Pajero iO",
        "russianName": "Паджеро iO"
      },
      {
        "id": "MITSUBISHI_PAJERO_JUNIOR",
        "name": "Pajero Junior",
        "russianName": "Паджеро Джуниор"
      },
      {
        "id": "MITSUBISHI_PAJERO_MINI",
        "name": "Pajero Mini",
        "russianName": "Паджеро Мини"
      },
      {
        "id": "MITSUBISHI_PAJERO_PININ",
        "name": "Pajero Pinin",
        "russianName": "Паджеро Пинин"
      },
      {
        "id": "MITSUBISHI_PAJERO_SPORT",
        "name": "Pajero Sport",
        "russianName": "Паджеро Спорт"
      },
      {
        "id": "MITSUBISHI_PISTACHIO",
        "name": "Pistachio",
        "russianName": "Писташио"
      },
      {
        "id": "MITSUBISHI_PROUDIA",
        "name": "Proudia",
        "russianName": "Прудия"
      },
      {
        "id": "MITSUBISHI_RAIDER",
        "name": "Raider",
        "russianName": "Рэйдер"
      },
      {
        "id": "MITSUBISHI_RVR",
        "name": "RVR",
        "russianName": "РВР"
      },
      {
        "id": "MITSUBISHI_SAPPORO",
        "name": "Sapporo",
        "russianName": "Саппоро"
      },
      {
        "id": "MITSUBISHI_SAVRIN",
        "name": "Savrin",
        "russianName": "саврин"
      },
      {
        "id": "MITSUBISHI_SIGMA",
        "name": "Sigma",
        "russianName": "Сигма"
      },
      {
        "id": "MITSUBISHI_SPACE_GEAR",
        "name": "Space Gear",
        "russianName": "Спайс Гир"
      },
      {
        "id": "MITSUBISHI_SPACE_RUNNER",
        "name": "Space Runner",
        "russianName": "Спайс Раннер"
      },
      {
        "id": "MITSUBISHI_SPACE_STAR",
        "name": "Space Star",
        "russianName": "Спайс Стар"
      },
      {
        "id": "MITSUBISHI_SPACE_WAGON",
        "name": "Space Wagon",
        "russianName": "Спайс Вагон"
      },
      {
        "id": "MITSUBISHI_STARION",
        "name": "Starion",
        "russianName": "Старион"
      },
      {
        "id": "MITSUBISHI_STRADA",
        "name": "Strada",
        "russianName": "Страда"
      },
      {
        "id": "MITSUBISHI_TOPPO",
        "name": "Toppo",
        "russianName": "Топпо"
      },
      {
        "id": "MITSUBISHI_TOWN_BOX",
        "name": "Town Box",
        "russianName": "Таун Бокс"
      },
      {
        "id": "MITSUBISHI_TREDIA",
        "name": "Tredia",
        "russianName": "Тредия"
      },
      {
        "id": "MITSUBISHI_TRITON",
        "name": "Triton",
        "russianName": "Тритон"
      },
      {
        "id": "MITSUBISHI_XFORCE",
        "name": "Xforce",
        "russianName": "Иксфорс"
      },
      {
        "id": "MITSUBISHI_XPANDER",
        "name": "Xpander",
        "russianName": "хпандер"
      }
    ]
  },
  "MITSUOKA": {
    "id": "MITSUOKA",
    "name": "Mitsuoka",
    "russianName": "Мицуока",
    "models": [
      {
        "id": "MITSUOKA_BUBU_CLASSIC_SSK",
        "name": "Bubu Classic SSK",
        "russianName": "Бубу Классик ССК"
      },
      {
        "id": "MITSUOKA_BUDDY",
        "name": "Buddy",
        "russianName": "Бадди"
      },
      {
        "id": "MITSUOKA_GALUE",
        "name": "Galue",
        "russianName": "Галю"
      },
      {
        "id": "MITSUOKA_GALUE_204",
        "name": "Galue 204",
        "russianName": "Галю 204"
      },
      {
        "id": "MITSUOKA_HIMIKO",
        "name": "Himiko",
        "russianName": "Химико"
      },
      {
        "id": "MITSUOKA_LE_SEYDE",
        "name": "Le-Seyde",
        "russianName": "Ле-Сейд"
      },
      {
        "id": "MITSUOKA_LIKE",
        "name": "Like",
        "russianName": "лайк"
      },
      {
        "id": "MITSUOKA_M55",
        "name": "M55",
        "russianName": "М55"
      },
      {
        "id": "MITSUOKA_MC_1",
        "name": "MC-1",
        "russianName": "мс 1"
      },
      {
        "id": "MITSUOKA_NOUERA",
        "name": "Nouera",
        "russianName": "Ноуера"
      },
      {
        "id": "MITSUOKA_OROCHI",
        "name": "Orochi",
        "russianName": "Орочи"
      },
      {
        "id": "MITSUOKA_RAY",
        "name": "Ray",
        "russianName": "Рэй"
      },
      {
        "id": "MITSUOKA_ROCK_STAR",
        "name": "Rock Star",
        "russianName": "Рок Стар"
      },
      {
        "id": "MITSUOKA_RYOGA",
        "name": "Ryoga",
        "russianName": "Риога"
      },
      {
        "id": "MITSUOKA_RYUGI",
        "name": "Ryugi",
        "russianName": "Рууги"
      },
      {
        "id": "MITSUOKA_VIEWT",
        "name": "Viewt",
        "russianName": "Вьювт"
      },
      {
        "id": "MITSUOKA_YUGA",
        "name": "Yuga",
        "russianName": "Юга"
      },
      {
        "id": "MITSUOKA_ZERO_ONE",
        "name": "Zero 1",
        "russianName": "зеро 1"
      }
    ]
  },
  "MOBILIZE": {
    "id": "MOBILIZE",
    "name": "Mobilize",
    "russianName": "Мобилайз",
    "models": [
      {
        "id": "MOBILIZE_LIMO",
        "name": "Limo",
        "russianName": "Лимо"
      }
    ]
  },
  "MORGAN": {
    "id": "MORGAN",
    "name": "Morgan",
    "russianName": "Морган",
    "models": [
      {
        "id": "MORGAN_3_WHEELER",
        "name": "3 Wheeler",
        "russianName": "3 вилер"
      },
      {
        "id": "MORGAN_4_4",
        "name": "4/4",
        "russianName": "4/4"
      },
      {
        "id": "MORGAN_4_SEATER",
        "name": "4 Seater",
        "russianName": "4 ситер"
      },
      {
        "id": "MORGAN_AEROMAX",
        "name": "AeroMax",
        "russianName": "Аэромакс"
      },
      {
        "id": "MORGAN_AERO_8",
        "name": "Aero 8",
        "russianName": "Аэро 8"
      },
      {
        "id": "MORGAN_AERO_COUPE",
        "name": "Aero Coupe",
        "russianName": "Аэрокупе"
      },
      {
        "id": "MORGAN_AERO_SUPERSPORTS",
        "name": "Aero SuperSports",
        "russianName": "Аэро Суперспорт"
      },
      {
        "id": "MORGAN_PLUS_4",
        "name": "Plus 4",
        "russianName": "Плюс 4"
      },
      {
        "id": "MORGAN_PLUS_8",
        "name": "Plus 8",
        "russianName": "Плюс 8"
      },
      {
        "id": "MORGAN_PLUS_SIX",
        "name": "Plus Six",
        "russianName": "Плюс Сикс"
      },
      {
        "id": "MORGAN_ROADSTER",
        "name": "Roadster",
        "russianName": "родстер"
      },
      {
        "id": "MORGAN_SUPERSPORT",
        "name": "Supersport",
        "russianName": "Суперспорт"
      }
    ]
  },
  "MORRIS": {
    "id": "MORRIS",
    "name": "Morris",
    "russianName": "Моррис",
    "models": [
      {
        "id": "MORRIS_EIGHT",
        "name": "Eight",
        "russianName": "Эйт"
      },
      {
        "id": "MORRIS_MARINA",
        "name": "Marina",
        "russianName": "Марина"
      }
    ]
  },
  "MOSCVICH": {
    "id": "MOSCVICH",
    "name": "Москвич",
    "russianName": "Москвич",
    "models": [
      {
        "id": "MOSCVICH_2136",
        "name": "2136",
        "russianName": "2136"
      },
      {
        "id": "MOSCVICH_2137",
        "name": "2137",
        "russianName": "2137"
      },
      {
        "id": "MOSCVICH_2138",
        "name": "2138",
        "russianName": "2138"
      },
      {
        "id": "MOSCVICH_2140",
        "name": "2140",
        "russianName": "2140"
      },
      {
        "id": "MOSCVICH_2141",
        "name": "2141",
        "russianName": "2141"
      },
      {
        "id": "MOSCVICH_2142",
        "name": "2142",
        "russianName": "2142"
      },
      {
        "id": "MOSCVICH_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "MOSCVICH_3E",
        "name": "3е",
        "russianName": "3е"
      },
      {
        "id": "MOSCVICH_400",
        "name": "400",
        "russianName": "400"
      },
      {
        "id": "MOSCVICH_401",
        "name": "401",
        "russianName": "401"
      },
      {
        "id": "MOSCVICH_402",
        "name": "402",
        "russianName": "402"
      },
      {
        "id": "MOSCVICH_403",
        "name": "403",
        "russianName": "403"
      },
      {
        "id": "MOSCVICH_407",
        "name": "407",
        "russianName": "407"
      },
      {
        "id": "MOSCVICH_408",
        "name": "408",
        "russianName": "408"
      },
      {
        "id": "MOSCVICH_410",
        "name": "410",
        "russianName": "410"
      },
      {
        "id": "MOSCVICH_411",
        "name": "411",
        "russianName": "411"
      },
      {
        "id": "MOSCVICH_412",
        "name": "412",
        "russianName": "412"
      },
      {
        "id": "MOSCVICH_423",
        "name": "423",
        "russianName": "423"
      },
      {
        "id": "MOSCVICH_424",
        "name": "424",
        "russianName": "424"
      },
      {
        "id": "MOSCVICH_426",
        "name": "426",
        "russianName": "426"
      },
      {
        "id": "MOSCVICH_427",
        "name": "427",
        "russianName": "427"
      },
      {
        "id": "MOSCVICH_430",
        "name": "430",
        "russianName": "430"
      },
      {
        "id": "MOSCVICH_434P",
        "name": "434П",
        "russianName": "434П"
      },
      {
        "id": "MOSCVICH_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "MOSCVICH_6",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "MOSCVICH_8",
        "name": "8",
        "russianName": "8"
      },
      {
        "id": "MOSCVICH_DUET",
        "name": "Дуэт",
        "russianName": "Дуэт"
      },
      {
        "id": "MOSCVICH_IVAN_KALITA",
        "name": "Иван Калита",
        "russianName": "Иван Калита"
      },
      {
        "id": "MOSCVICH_KNYAZ_VLADIMIR",
        "name": "Князь Владимир",
        "russianName": "Князь Владимир"
      },
      {
        "id": "MOSCVICH_M70",
        "name": "М70",
        "russianName": "М70"
      },
      {
        "id": "MOSCVICH_M90",
        "name": "M90",
        "russianName": "м90"
      },
      {
        "id": "MOSCVICH_SVYATOGOR",
        "name": "Святогор",
        "russianName": "Святогор"
      },
      {
        "id": "MOSCVICH_YURI_DOLGORUKIY",
        "name": "Юрий Долгорукий",
        "russianName": "Юрий Долгорукий"
      }
    ]
  },
  "M_HERO": {
    "id": "M_HERO",
    "name": "M-Hero",
    "russianName": "М-Хиро",
    "models": [
      {
        "id": "M_HERO_I",
        "name": "I",
        "russianName": "1"
      }
    ]
  },
  "NASH": {
    "id": "NASH",
    "name": "Nash",
    "russianName": "Нэш",
    "models": [
      {
        "id": "NASH_AMBASSADOR",
        "name": "Ambassador",
        "russianName": "Амбассадор"
      }
    ]
  },
  "NEVO": {
    "id": "NEVO",
    "name": "Nevo",
    "russianName": "Нево",
    "models": []
  },
  "NIO": {
    "id": "NIO",
    "name": "Nio",
    "russianName": "Нио",
    "models": [
      {
        "id": "NIO_EC6",
        "name": "EC6",
        "russianName": "ец6"
      },
      {
        "id": "NIO_EC7",
        "name": "EC7",
        "russianName": "ЕЦ7"
      },
      {
        "id": "NIO_EL6",
        "name": "EL6",
        "russianName": "ЕЛ6"
      },
      {
        "id": "NIO_ES6",
        "name": "ES6",
        "russianName": "ес6"
      },
      {
        "id": "NIO_ES7",
        "name": "ES7",
        "russianName": "ЕС7"
      },
      {
        "id": "NIO_ES8",
        "name": "ES8",
        "russianName": "ЕС8"
      },
      {
        "id": "NIO_ET5",
        "name": "ET5",
        "russianName": "ет5"
      },
      {
        "id": "NIO_ET7",
        "name": "ET7",
        "russianName": "ет7"
      },
      {
        "id": "NIO_ET9",
        "name": "ET9",
        "russianName": "ЕТ9"
      },
      {
        "id": "NIO_FIREFLY",
        "name": "Firefly",
        "russianName": "Фаерфлай"
      },
      {
        "id": "NIO_ONVO_L60",
        "name": "Onvo L60",
        "russianName": "Онво Л60"
      },
      {
        "id": "NIO_ONVO_L90",
        "name": "Onvo L90",
        "russianName": "Онво Л90"
      }
    ]
  },
  "NISSAN": {
    "id": "NISSAN",
    "name": "ניסאן",
    "russianName": "Ниссан",
    "models": [
      {
        "id": "NISSAN_100NX",
        "name": "100NX",
        "russianName": "100NX"
      },
      {
        "id": "NISSAN_180SX",
        "name": "180SX",
        "russianName": "180SX"
      },
      {
        "id": "NISSAN_200SX",
        "name": "200SX",
        "russianName": "200SX"
      },
      {
        "id": "NISSAN_240SX",
        "name": "240SX",
        "russianName": "240SX"
      },
      {
        "id": "NISSAN_280ZX",
        "name": "280ZX",
        "russianName": "280ZX"
      },
      {
        "id": "NISSAN_300ZX",
        "name": "300ZX",
        "russianName": "300ZX"
      },
      {
        "id": "NISSAN_350Z",
        "name": "350Z",
        "russianName": "350Z"
      },
      {
        "id": "NISSAN_370Z",
        "name": "370Z",
        "russianName": "370Z"
      },
      {
        "id": "NISSAN_AD",
        "name": "AD",
        "russianName": "AD"
      },
      {
        "id": "NISSAN_ALMERA",
        "name": "Almera",
        "russianName": "Альмера"
      },
      {
        "id": "NISSAN_ALMERA_CLASSIC",
        "name": "Almera Classic",
        "russianName": "Альмера Классик"
      },
      {
        "id": "NISSAN_ALMERA_TINO",
        "name": "Almera Tino",
        "russianName": "Альмера Тино"
      },
      {
        "id": "NISSAN_ALTIMA",
        "name": "Altima",
        "russianName": "Альтима"
      },
      {
        "id": "NISSAN_ARIYA",
        "name": "Ariya",
        "russianName": "Ария"
      },
      {
        "id": "NISSAN_ARMADA",
        "name": "Armada",
        "russianName": "Армада"
      },
      {
        "id": "NISSAN_AUSTER",
        "name": "Auster",
        "russianName": "Аустер"
      },
      {
        "id": "NISSAN_AVENIR",
        "name": "Avenir",
        "russianName": "Авенир"
      },
      {
        "id": "NISSAN_BASSARA",
        "name": "Bassara",
        "russianName": "Бассара"
      },
      {
        "id": "NISSAN_BE_1",
        "name": "BE-1",
        "russianName": "BE-1"
      },
      {
        "id": "NISSAN_BLUEBIRD",
        "name": "Bluebird",
        "russianName": "Блюбёрд"
      },
      {
        "id": "NISSAN_BLUEBIRD_MAXIMA",
        "name": "Bluebird Maxima",
        "russianName": "Блюберд Максима"
      },
      {
        "id": "NISSAN_BLUEBIRD_SYLPHY",
        "name": "Bluebird Sylphy",
        "russianName": "Блюбёрд Силфи"
      },
      {
        "id": "NISSAN_CARAVAN_COACH",
        "name": "Caravan",
        "russianName": "Караван"
      },
      {
        "id": "NISSAN_CEDRIC",
        "name": "Cedric",
        "russianName": "Цедрик"
      },
      {
        "id": "NISSAN_CEFIRO",
        "name": "Cefiro",
        "russianName": "Цефиро"
      },
      {
        "id": "NISSAN_CHERRY",
        "name": "Cherry",
        "russianName": "Черри"
      },
      {
        "id": "NISSAN_CIMA",
        "name": "Cima",
        "russianName": "Сима"
      },
      {
        "id": "NISSAN_CLIPPER",
        "name": "NV100 Clipper",
        "russianName": "клиппер"
      },
      {
        "id": "NISSAN_CLIPPER_RIO",
        "name": "Clipper Rio",
        "russianName": "клиппер рио"
      },
      {
        "id": "NISSAN_CREW",
        "name": "Crew",
        "russianName": "Крю"
      },
      {
        "id": "NISSAN_CUBE",
        "name": "Cube",
        "russianName": "Куб"
      },
      {
        "id": "NISSAN_DATSUN",
        "name": "דאטסון",
        "russianName": "Датсан"
      },
      {
        "id": "NISSAN_DAYZ",
        "name": "Dayz",
        "russianName": "Дайз"
      },
      {
        "id": "NISSAN_DAYZ_ROOX",
        "name": "Dayz Roox",
        "russianName": "Дейз Рукс"
      },
      {
        "id": "NISSAN_DUALIS",
        "name": "Dualis",
        "russianName": "Дуалис"
      },
      {
        "id": "NISSAN_ELGRAND",
        "name": "Elgrand",
        "russianName": "Элгранд"
      },
      {
        "id": "NISSAN_EXA",
        "name": "Exa",
        "russianName": "еха"
      },
      {
        "id": "NISSAN_EXPERT",
        "name": "Expert",
        "russianName": "Эксперт"
      },
      {
        "id": "NISSAN_FAIRLADY_Z",
        "name": "Fairlady Z",
        "russianName": "Файрледи"
      },
      {
        "id": "NISSAN_FIGARO",
        "name": "Figaro",
        "russianName": "Фигаро"
      },
      {
        "id": "NISSAN_FRONTIER",
        "name": "Frontier",
        "russianName": "Фронтир"
      },
      {
        "id": "NISSAN_FRONTIER_PRO",
        "name": "Frontier Pro",
        "russianName": "Фронтир про"
      },
      {
        "id": "NISSAN_FUGA",
        "name": "Fuga",
        "russianName": "Фуга"
      },
      {
        "id": "NISSAN_GLORIA",
        "name": "Gloria",
        "russianName": "Глория"
      },
      {
        "id": "NISSAN_GT_R",
        "name": "GT-R",
        "russianName": "GT-R"
      },
      {
        "id": "NISSAN_HOMY",
        "name": "Homy",
        "russianName": "Хоми"
      },
      {
        "id": "NISSAN_HYPERMINI",
        "name": "Hypermini",
        "russianName": "гипермини"
      },
      {
        "id": "NISSAN_JUKE",
        "name": "Juke",
        "russianName": "Джук"
      },
      {
        "id": "NISSAN_JUKE_NISMO",
        "name": "Juke Nismo",
        "russianName": "Джук Нисмо"
      },
      {
        "id": "NISSAN_KICKS",
        "name": "Kicks",
        "russianName": "Кикс"
      },
      {
        "id": "NISSAN_KIX",
        "name": "Kix",
        "russianName": "Кикс"
      },
      {
        "id": "NISSAN_KUBISTAR",
        "name": "Kubistar",
        "russianName": "Кубистар"
      },
      {
        "id": "NISSAN_LAFESTA",
        "name": "Lafesta",
        "russianName": "Лафеста"
      },
      {
        "id": "NISSAN_LANGLEY",
        "name": "Langley",
        "russianName": "Лэнгли"
      },
      {
        "id": "NISSAN_LANNIA",
        "name": "Lannia",
        "russianName": "Лания"
      },
      {
        "id": "NISSAN_LARGO",
        "name": "Largo",
        "russianName": "Ларго"
      },
      {
        "id": "NISSAN_LATIO",
        "name": "Latio",
        "russianName": "Латио"
      },
      {
        "id": "NISSAN_LAUREL",
        "name": "Laurel",
        "russianName": "Лаурель"
      },
      {
        "id": "NISSAN_LAUREL_SPIRIT",
        "name": "Laurel Spirit",
        "russianName": "Лаурель Спирит"
      },
      {
        "id": "NISSAN_LEAF",
        "name": "Leaf",
        "russianName": "лиф"
      },
      {
        "id": "NISSAN_LEOPARD",
        "name": "Leopard",
        "russianName": "Леопард"
      },
      {
        "id": "NISSAN_LIBERTA_VILLA",
        "name": "Liberta Villa",
        "russianName": "Либерта Вилла"
      },
      {
        "id": "NISSAN_LIBERTY",
        "name": "Liberty",
        "russianName": "Либерти"
      },
      {
        "id": "NISSAN_LIVINA",
        "name": "Livina",
        "russianName": "ливина"
      },
      {
        "id": "NISSAN_LUCINO",
        "name": "Lucino",
        "russianName": "Люсино"
      },
      {
        "id": "NISSAN_MAGNITE",
        "name": "Magnite",
        "russianName": "Магнит"
      },
      {
        "id": "NISSAN_MARCH",
        "name": "March",
        "russianName": "Марч"
      },
      {
        "id": "NISSAN_MAXIMA",
        "name": "Maxima",
        "russianName": "Максима"
      },
      {
        "id": "NISSAN_MICRA",
        "name": "Micra",
        "russianName": "Микра"
      },
      {
        "id": "NISSAN_MISTRAL",
        "name": "Mistral",
        "russianName": "Мистраль"
      },
      {
        "id": "NISSAN_MOCO",
        "name": "Moco",
        "russianName": "Моко"
      },
      {
        "id": "NISSAN_MURANO",
        "name": "Murano",
        "russianName": "Мурано"
      },
      {
        "id": "NISSAN_N6",
        "name": "N6",
        "russianName": "Н6"
      },
      {
        "id": "NISSAN_N7",
        "name": "N7",
        "russianName": "Н7"
      },
      {
        "id": "NISSAN_NAVARA",
        "name": "Navara (Frontier)",
        "russianName": "Навара"
      },
      {
        "id": "NISSAN_NOTE",
        "name": "Note",
        "russianName": "Ноут"
      },
      {
        "id": "NISSAN_NP200",
        "name": "NP200",
        "russianName": "НП200"
      },
      {
        "id": "NISSAN_NP300",
        "name": "NP300",
        "russianName": "NP 300"
      },
      {
        "id": "NISSAN_NV200",
        "name": "NV200",
        "russianName": "нв200"
      },
      {
        "id": "NISSAN_NV300",
        "name": "NV300",
        "russianName": "НВ300"
      },
      {
        "id": "NISSAN_NV350_CARAVAN",
        "name": "NV350 Caravan",
        "russianName": "NV350 Караван"
      },
      {
        "id": "NISSAN_NX_COUPE",
        "name": "NX Coupe",
        "russianName": "нх купе"
      },
      {
        "id": "NISSAN_OTTI",
        "name": "Otti",
        "russianName": "Отти"
      },
      {
        "id": "NISSAN_PAO",
        "name": "Pao",
        "russianName": "Пао"
      },
      {
        "id": "NISSAN_PATHFINDER",
        "name": "Pathfinder",
        "russianName": "Патфайндер"
      },
      {
        "id": "NISSAN_PATROL",
        "name": "Patrol",
        "russianName": "Патрол"
      },
      {
        "id": "NISSAN_PINO",
        "name": "Pino",
        "russianName": "Пино"
      },
      {
        "id": "NISSAN_PIXO",
        "name": "Pixo",
        "russianName": "пиксо"
      },
      {
        "id": "NISSAN_PRAIRIE",
        "name": "Prairie",
        "russianName": "Прэри"
      },
      {
        "id": "NISSAN_PRESAGE",
        "name": "Presage",
        "russianName": "Пресаж"
      },
      {
        "id": "NISSAN_PRESEA",
        "name": "Presea",
        "russianName": "Преси"
      },
      {
        "id": "NISSAN_PRESIDENT",
        "name": "President",
        "russianName": "Президент"
      },
      {
        "id": "NISSAN_PRIMASTAR",
        "name": "Primastar",
        "russianName": "примастар"
      },
      {
        "id": "NISSAN_PRIMERA",
        "name": "Primera",
        "russianName": "Примера"
      },
      {
        "id": "NISSAN_PULSAR",
        "name": "Pulsar",
        "russianName": "Пульсар"
      },
      {
        "id": "NISSAN_QASHQAI",
        "name": "Qashqai",
        "russianName": "Кашкай"
      },
      {
        "id": "NISSAN_QASHQAI_PLUS_2",
        "name": "Qashqai+2",
        "russianName": "Кашкай+2"
      },
      {
        "id": "NISSAN_QUEST",
        "name": "Quest",
        "russianName": "Квест"
      },
      {
        "id": "NISSAN_RASHEEN",
        "name": "Rasheen",
        "russianName": "Рашин"
      },
      {
        "id": "NISSAN_RNESSA",
        "name": "R'nessa",
        "russianName": "Р Несса"
      },
      {
        "id": "NISSAN_ROGUE",
        "name": "Rogue",
        "russianName": "Рог"
      },
      {
        "id": "NISSAN_ROGUE_SPORT",
        "name": "Rogue Sport",
        "russianName": "Рог Спорт"
      },
      {
        "id": "NISSAN_ROOX",
        "name": "Roox",
        "russianName": "Рукс"
      },
      {
        "id": "NISSAN_SAFARI",
        "name": "Safari",
        "russianName": "Сафари"
      },
      {
        "id": "NISSAN_SAKURA",
        "name": "Sakura",
        "russianName": "Сакура"
      },
      {
        "id": "NISSAN_SENTRA",
        "name": "Sentra",
        "russianName": "Сентра"
      },
      {
        "id": "NISSAN_SERENA",
        "name": "Serena",
        "russianName": "Серена"
      },
      {
        "id": "NISSAN_SILVIA",
        "name": "Silvia",
        "russianName": "Сильвия"
      },
      {
        "id": "NISSAN_SKYLINE",
        "name": "Skyline",
        "russianName": "Скайлайн"
      },
      {
        "id": "NISSAN_SKYLINE_CROSSOVER",
        "name": "Skyline Crossover",
        "russianName": "Скайлайн Кроссовер"
      },
      {
        "id": "NISSAN_STAGEA",
        "name": "Stagea",
        "russianName": "Стайджиа"
      },
      {
        "id": "NISSAN_STANZA",
        "name": "Stanza",
        "russianName": "Станза"
      },
      {
        "id": "NISSAN_SUNNY",
        "name": "Sunny",
        "russianName": "Санни"
      },
      {
        "id": "NISSAN_SYLPHY",
        "name": "Sylphy",
        "russianName": "Сильфи"
      },
      {
        "id": "NISSAN_S_CARGO",
        "name": "S-Cargo",
        "russianName": "Эс-Карго"
      },
      {
        "id": "NISSAN_TEANA",
        "name": "Teana",
        "russianName": "Тиана"
      },
      {
        "id": "NISSAN_TERRA",
        "name": "Terra",
        "russianName": "Терра"
      },
      {
        "id": "NISSAN_TERRANO",
        "name": "Terrano",
        "russianName": "Террано"
      },
      {
        "id": "NISSAN_TERRANO_REGULUS",
        "name": "Terrano Regulus",
        "russianName": "Террано Регулус"
      },
      {
        "id": "NISSAN_TIIDA",
        "name": "Tiida",
        "russianName": "Тиида"
      },
      {
        "id": "NISSAN_TINO",
        "name": "Tino",
        "russianName": "Тино"
      },
      {
        "id": "NISSAN_TITAN",
        "name": "Titan",
        "russianName": "Титан"
      },
      {
        "id": "NISSAN_URVAN",
        "name": "Urvan",
        "russianName": "урван"
      },
      {
        "id": "NISSAN_VANETTE",
        "name": "Vanette",
        "russianName": "Ванэт"
      },
      {
        "id": "NISSAN_VERSA",
        "name": "Versa",
        "russianName": "верса"
      },
      {
        "id": "NISSAN_VERSA_NOTE",
        "name": "Versa Note",
        "russianName": "Верса Нот"
      },
      {
        "id": "NISSAN_WINGROAD",
        "name": "Wingroad",
        "russianName": "Вингроуд"
      },
      {
        "id": "NISSAN_XTERRA",
        "name": "Xterra",
        "russianName": "X-терра"
      },
      {
        "id": "NISSAN_X_TERRA",
        "name": "X-Terra",
        "russianName": "Икс-Терра"
      },
      {
        "id": "NISSAN_X_TRAIL",
        "name": "X-Trail",
        "russianName": "X-трейл"
      },
      {
        "id": "NISSAN_Z",
        "name": "Z",
        "russianName": "зет"
      }
    ]
  },
  "NOBLE": {
    "id": "NOBLE",
    "name": "Noble",
    "russianName": "Нобл",
    "models": [
      {
        "id": "NOBLE_M12_GTO",
        "name": "M12 GTO",
        "russianName": "м12 гто"
      },
      {
        "id": "NOBLE_M15",
        "name": "M15",
        "russianName": "М15"
      },
      {
        "id": "NOBLE_M600",
        "name": "M600",
        "russianName": "м600"
      }
    ]
  },
  "NORDCROSS": {
    "id": "NORDCROSS",
    "name": "Nordcross",
    "russianName": "Нордкросс",
    "models": [
      {
        "id": "NORDCROSS_001",
        "name": "001",
        "russianName": "001"
      }
    ]
  },
  "OLDSMOBILE": {
    "id": "OLDSMOBILE",
    "name": "Oldsmobile",
    "russianName": "Олдсмобиль",
    "models": [
      {
        "id": "OLDSMOBILE_442",
        "name": "442",
        "russianName": "442"
      },
      {
        "id": "OLDSMOBILE_ACHIEVA",
        "name": "Achieva",
        "russianName": "Ачива"
      },
      {
        "id": "OLDSMOBILE_ALERO",
        "name": "Alero",
        "russianName": "Алеро"
      },
      {
        "id": "OLDSMOBILE_AURORA",
        "name": "Aurora",
        "russianName": "Аврора"
      },
      {
        "id": "OLDSMOBILE_BRAVADA",
        "name": "Bravada",
        "russianName": "Бравада"
      },
      {
        "id": "OLDSMOBILE_CUSTOM_CRUISER",
        "name": "Custom Cruiser",
        "russianName": "Кастом Круизер"
      },
      {
        "id": "OLDSMOBILE_CUTLASS",
        "name": "Cutlass",
        "russianName": "Катлас"
      },
      {
        "id": "OLDSMOBILE_CUTLASS_CALAIS",
        "name": "Cutlass Calais",
        "russianName": "Катлас Коле"
      },
      {
        "id": "OLDSMOBILE_CUTLASS_CIERA",
        "name": "Cutlass Ciera",
        "russianName": "Катлас  Цира"
      },
      {
        "id": "OLDSMOBILE_CUTLASS_SUPREME",
        "name": "Cutlass Supreme",
        "russianName": "Катлас Суприм"
      },
      {
        "id": "OLDSMOBILE_DELTA_88",
        "name": "Delta 88",
        "russianName": "Дельта 88"
      },
      {
        "id": "OLDSMOBILE_EIGHTY_EIGHT",
        "name": "Eighty-Eight",
        "russianName": "88"
      },
      {
        "id": "OLDSMOBILE_FIRENZA",
        "name": "Firenza",
        "russianName": "фиренца"
      },
      {
        "id": "OLDSMOBILE_INTRIGUE",
        "name": "Intrigue",
        "russianName": "Интриг"
      },
      {
        "id": "OLDSMOBILE_NINETY_EIGHT",
        "name": "Ninety-Eight",
        "russianName": "89"
      },
      {
        "id": "OLDSMOBILE_OMEGA",
        "name": "Omega",
        "russianName": "Омега"
      },
      {
        "id": "OLDSMOBILE_SERIES_60",
        "name": "Series 60",
        "russianName": "Серия 60"
      },
      {
        "id": "OLDSMOBILE_SERIES_70",
        "name": "Series 70",
        "russianName": "Серия 70"
      },
      {
        "id": "OLDSMOBILE_SILHOUETTE",
        "name": "Silhouette",
        "russianName": "Силуэт"
      },
      {
        "id": "OLDSMOBILE_STARFIRE",
        "name": "Starfire",
        "russianName": "Старфайер"
      },
      {
        "id": "OLDSMOBILE_TORONADO",
        "name": "Toronado",
        "russianName": "Торонадо"
      },
      {
        "id": "OLDSMOBILE_VISTA_CRUISER",
        "name": "Vista Cruiser",
        "russianName": "Виста Круизер"
      }
    ]
  },
  "OMODA": {
    "id": "OMODA",
    "name": "Omoda",
    "russianName": "Омода",
    "models": [
      {
        "id": "OMODA_C5",
        "name": "C5",
        "russianName": "С5"
      },
      {
        "id": "OMODA_C7",
        "name": "C7",
        "russianName": "С7"
      },
      {
        "id": "OMODA_C9",
        "name": "C9",
        "russianName": "С9"
      },
      {
        "id": "OMODA_E5",
        "name": "E5",
        "russianName": "Е5"
      },
      {
        "id": "OMODA_S5",
        "name": "S5",
        "russianName": "С5"
      },
      {
        "id": "OMODA_S5_GT",
        "name": "S5 GT",
        "russianName": "С5 ГТ"
      }
    ]
  },
  "OPEL": {
    "id": "OPEL",
    "name": "אופל",
    "russianName": "Опель",
    "models": [
      {
        "id": "OPEL_4_8_PS",
        "name": "4/8 PS",
        "russianName": "4/8 ПС"
      },
      {
        "id": "OPEL_ADAM",
        "name": "אדם",
        "russianName": "адам"
      },
      {
        "id": "OPEL_ADMIRAL",
        "name": "Admiral",
        "russianName": "Адмирал"
      },
      {
        "id": "OPEL_AGILA",
        "name": "Agila",
        "russianName": "Агила"
      },
      {
        "id": "OPEL_AMPERA",
        "name": "Ampera",
        "russianName": "Ампера"
      },
      {
        "id": "OPEL_ANTARA",
        "name": "Antara",
        "russianName": "Антара"
      },
      {
        "id": "OPEL_ASCONA",
        "name": "Ascona",
        "russianName": "Аскона"
      },
      {
        "id": "OPEL_ASTRA",
        "name": "Astra",
        "russianName": "Астра"
      },
      {
        "id": "OPEL_ASTRA_OPC",
        "name": "Astra OPC",
        "russianName": "астра опс"
      },
      {
        "id": "OPEL_CALIBRA",
        "name": "Calibra",
        "russianName": "Калибра"
      },
      {
        "id": "OPEL_CAMPO",
        "name": "Campo",
        "russianName": "Кэмпо"
      },
      {
        "id": "OPEL_CASCADA",
        "name": "Cascada",
        "russianName": "Каскада"
      },
      {
        "id": "OPEL_COMBO",
        "name": "Combo",
        "russianName": "Комбо"
      },
      {
        "id": "OPEL_COMMODORE",
        "name": "Commodore",
        "russianName": "Коммодор"
      },
      {
        "id": "OPEL_CORSA",
        "name": "Corsa",
        "russianName": "Корса"
      },
      {
        "id": "OPEL_CORSA_OPC",
        "name": "Corsa OPC",
        "russianName": "корса опс"
      },
      {
        "id": "OPEL_CROSSLAND_X",
        "name": "Crossland X",
        "russianName": "Кросленд Х"
      },
      {
        "id": "OPEL_DIPLOMAT",
        "name": "Diplomat",
        "russianName": "Дипломат"
      },
      {
        "id": "OPEL_FRONTERA",
        "name": "Frontera",
        "russianName": "Фронтера"
      },
      {
        "id": "OPEL_GRANDLAND_X",
        "name": "Grandland",
        "russianName": "Grandland X"
      },
      {
        "id": "OPEL_GT",
        "name": "GT",
        "russianName": "GT"
      },
      {
        "id": "OPEL_INSIGNIA",
        "name": "Insignia",
        "russianName": "Инсигния"
      },
      {
        "id": "OPEL_INSIGNIA_OPC",
        "name": "Insignia OPC",
        "russianName": "инсигния опс"
      },
      {
        "id": "OPEL_KADETT",
        "name": "Kadett",
        "russianName": "Кадет"
      },
      {
        "id": "OPEL_KAPITAN",
        "name": "Kapitan",
        "russianName": "Капитан"
      },
      {
        "id": "OPEL_KARL",
        "name": "Karl",
        "russianName": "карл"
      },
      {
        "id": "OPEL_LOTUS_OMEGA",
        "name": "Lotus Omega",
        "russianName": "Лотус Омега"
      },
      {
        "id": "OPEL_MANTA",
        "name": "Manta",
        "russianName": "Манта"
      },
      {
        "id": "OPEL_MERIVA",
        "name": "Meriva",
        "russianName": "Мерива"
      },
      {
        "id": "OPEL_MERIVA_OPC",
        "name": "Meriva OPC",
        "russianName": "Мерива OPC"
      },
      {
        "id": "OPEL_MOKKA",
        "name": "Mokka",
        "russianName": "Мокка"
      },
      {
        "id": "OPEL_MONTEREY",
        "name": "Monterey",
        "russianName": "Монтерей"
      },
      {
        "id": "OPEL_MONZA",
        "name": "Monza",
        "russianName": "монза"
      },
      {
        "id": "OPEL_OLYMPIA",
        "name": "Olympia",
        "russianName": "олимпия"
      },
      {
        "id": "OPEL_OMEGA",
        "name": "Omega",
        "russianName": "Омега"
      },
      {
        "id": "OPEL_P4",
        "name": "P4",
        "russianName": "П4"
      },
      {
        "id": "OPEL_REKORD",
        "name": "Rekord",
        "russianName": "Рекорд"
      },
      {
        "id": "OPEL_ROCKS_ELECTRIC",
        "name": "Rocks Electric",
        "russianName": "Рокс Электрик"
      },
      {
        "id": "OPEL_SENATOR",
        "name": "Senator",
        "russianName": "Сенатор"
      },
      {
        "id": "OPEL_SIGNUM",
        "name": "Signum",
        "russianName": "Сигнум"
      },
      {
        "id": "OPEL_SINTRA",
        "name": "Sintra",
        "russianName": "Синтра"
      },
      {
        "id": "OPEL_SPEEDSTER",
        "name": "Speedster",
        "russianName": "Спидстер"
      },
      {
        "id": "OPEL_SUPER_SIX",
        "name": "Super Six",
        "russianName": "Супер 6"
      },
      {
        "id": "OPEL_TIGRA",
        "name": "Tigra",
        "russianName": "Тигра"
      },
      {
        "id": "OPEL_VECTRA",
        "name": "Vectra",
        "russianName": "Вектра"
      },
      {
        "id": "OPEL_VECTRA_OPC",
        "name": "Vectra OPC",
        "russianName": "вектра опс"
      },
      {
        "id": "OPEL_VITA",
        "name": "Vita",
        "russianName": "Вита"
      },
      {
        "id": "OPEL_VIVARO",
        "name": "Vivaro",
        "russianName": "Виваро"
      },
      {
        "id": "OPEL_ZAFIRA",
        "name": "Zafira",
        "russianName": "Зафира"
      },
      {
        "id": "OPEL_ZAFIRA_LIFE",
        "name": "Zafira Life",
        "russianName": "Зафира Лайф"
      },
      {
        "id": "OPEL_ZAFIRA_OPC",
        "name": "Zafira OPC",
        "russianName": "зафира опс"
      }
    ]
  },
  "ORA": {
    "id": "ORA",
    "name": "Ora",
    "russianName": "Ора",
    "models": [
      {
        "id": "ORA_03",
        "name": "03",
        "russianName": "03"
      },
      {
        "id": "ORA_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "ORA_BALLET_CAT",
        "name": "Ballet Cat",
        "russianName": "Баллет Кэт"
      },
      {
        "id": "ORA_BLACK_CAT",
        "name": "Black Cat",
        "russianName": "Блэк Кэт"
      },
      {
        "id": "ORA_GOOD_CAT",
        "name": "Good Cat",
        "russianName": "Гуд Кэт"
      },
      {
        "id": "ORA_IQ",
        "name": "iQ",
        "russianName": "АйКью"
      },
      {
        "id": "ORA_LIGHTNING_CAT",
        "name": "Lightning Cat",
        "russianName": "Лайтнинг Кэт"
      },
      {
        "id": "ORA_SAR_SALOON_MECHA_DRAGON",
        "name": "SAR (Saloon) Mecha Dragon",
        "russianName": "САР (Салун) Меча Дрегон"
      },
      {
        "id": "ORA_WHITE_CAT",
        "name": "White Cat",
        "russianName": "Вайт Кэт"
      }
    ]
  },
  "ORANGE": {
    "id": "ORANGE",
    "name": "Orange",
    "russianName": "Оранж",
    "models": [
      {
        "id": "ORANGE_01",
        "name": "01",
        "russianName": "01"
      }
    ]
  },
  "OSCA": {
    "id": "OSCA",
    "name": "Osca",
    "russianName": "Оска",
    "models": [
      {
        "id": "OSCA_2500_GT",
        "name": "2500 GT",
        "russianName": "2500 гт"
      }
    ]
  },
  "OSHAN": {
    "id": "OSHAN",
    "name": "Oshan",
    "russianName": "Ошан",
    "models": [
      {
        "id": "OSHAN_COS1",
        "name": "COS1",
        "russianName": "кос1"
      },
      {
        "id": "OSHAN_COSMOS",
        "name": "Cosmos",
        "russianName": "Космос"
      },
      {
        "id": "OSHAN_X5",
        "name": "X5",
        "russianName": "Икс 5"
      },
      {
        "id": "OSHAN_X5_PLUS",
        "name": "X5 Plus",
        "russianName": "Икс 5 Плюс"
      },
      {
        "id": "OSHAN_X7",
        "name": "X7",
        "russianName": "Икс 7"
      },
      {
        "id": "OSHAN_X7_PLUS",
        "name": "X7 Plus",
        "russianName": "Икс 7 Плюс"
      },
      {
        "id": "OSHAN_Z6",
        "name": "Z6",
        "russianName": "Зет6"
      }
    ]
  },
  "OTING": {
    "id": "OTING",
    "name": "Oting",
    "russianName": "Отинг",
    "models": [
      {
        "id": "OTING_PALADIN",
        "name": "Paladin",
        "russianName": "Паладин"
      },
      {
        "id": "OTING_PALASSO",
        "name": "Palasso",
        "russianName": "Паласcо"
      },
      {
        "id": "OTING_RICH_7",
        "name": "Rich 7",
        "russianName": "Рич 7"
      },
      {
        "id": "OTING_Z9",
        "name": "Z9",
        "russianName": "З9"
      }
    ]
  },
  "OVERLAND": {
    "id": "OVERLAND",
    "name": "Overland",
    "russianName": "Оверлэнд",
    "models": [
      {
        "id": "OVERLAND_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "PACKARD": {
    "id": "PACKARD",
    "name": "Packard",
    "russianName": "Паккард",
    "models": [
      {
        "id": "PACKARD_200_250",
        "name": "200/250",
        "russianName": "200/250"
      },
      {
        "id": "PACKARD_CARIBBEAN",
        "name": "Caribbean",
        "russianName": "Каррибиан"
      },
      {
        "id": "PACKARD_CLIPPER",
        "name": "Clipper",
        "russianName": "клиппер"
      },
      {
        "id": "PACKARD_CUSTOM_EIGHT",
        "name": "Custom Eight",
        "russianName": "Кастом Эйт"
      },
      {
        "id": "PACKARD_ONE_TEN",
        "name": "One-Ten",
        "russianName": "уан-тен"
      },
      {
        "id": "PACKARD_ONE_TWENTY",
        "name": "One-Twenty",
        "russianName": "уан-твенти"
      },
      {
        "id": "PACKARD_SIX",
        "name": "Six",
        "russianName": "Сикс"
      },
      {
        "id": "PACKARD_SUPER_EIGHT",
        "name": "Super Eight",
        "russianName": "Супер Эйт"
      },
      {
        "id": "PACKARD_TWELVE",
        "name": "Twelve",
        "russianName": "твелв"
      }
    ]
  },
  "PAGANI": {
    "id": "PAGANI",
    "name": "Pagani",
    "russianName": "Пагани",
    "models": [
      {
        "id": "PAGANI_HUAYRA",
        "name": "Huayra",
        "russianName": "Уайра"
      },
      {
        "id": "PAGANI_UTOPIA",
        "name": "Utopia",
        "russianName": "Утопия"
      },
      {
        "id": "PAGANI_ZONDA",
        "name": "Zonda",
        "russianName": "Зонда"
      }
    ]
  },
  "PANOZ": {
    "id": "PANOZ",
    "name": "Panoz",
    "russianName": "Паноз",
    "models": [
      {
        "id": "PANOZ_ESPERANTE",
        "name": "Esperante",
        "russianName": "Эсперанте"
      },
      {
        "id": "PANOZ_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "PERODUA": {
    "id": "PERODUA",
    "name": "Perodua",
    "russianName": "Перодуа",
    "models": [
      {
        "id": "PERODUA_ALZA",
        "name": "Alza",
        "russianName": "Альза"
      },
      {
        "id": "PERODUA_KANCIL",
        "name": "Kancil",
        "russianName": "кансил"
      },
      {
        "id": "PERODUA_KELISA",
        "name": "Kelisa",
        "russianName": "Келиса"
      },
      {
        "id": "PERODUA_KEMBARA",
        "name": "Kembara",
        "russianName": "кембара"
      },
      {
        "id": "PERODUA_KENARI",
        "name": "Kenari",
        "russianName": "кенари"
      },
      {
        "id": "PERODUA_MYVI",
        "name": "MyVi",
        "russianName": "майви"
      },
      {
        "id": "PERODUA_NAUTICA",
        "name": "Nautica",
        "russianName": "наутика"
      },
      {
        "id": "PERODUA_VIVA",
        "name": "Viva",
        "russianName": "Вива"
      }
    ]
  },
  "PEUGEOT": {
    "id": "PEUGEOT",
    "name": "פגו",
    "russianName": "Пежо",
    "models": [
      {
        "id": "PEUGEOT_1007",
        "name": "1007",
        "russianName": "1007"
      },
      {
        "id": "PEUGEOT_104",
        "name": "104",
        "russianName": "104"
      },
      {
        "id": "PEUGEOT_106",
        "name": "106",
        "russianName": "106"
      },
      {
        "id": "PEUGEOT_107",
        "name": "107",
        "russianName": "107"
      },
      {
        "id": "PEUGEOT_108",
        "name": "108",
        "russianName": "108"
      },
      {
        "id": "PEUGEOT_2008",
        "name": "2008",
        "russianName": "2008"
      },
      {
        "id": "PEUGEOT_201",
        "name": "201",
        "russianName": "201"
      },
      {
        "id": "PEUGEOT_202",
        "name": "202",
        "russianName": "202"
      },
      {
        "id": "PEUGEOT_203",
        "name": "203",
        "russianName": "203"
      },
      {
        "id": "PEUGEOT_204",
        "name": "204",
        "russianName": "204"
      },
      {
        "id": "PEUGEOT_205",
        "name": "205",
        "russianName": "205"
      },
      {
        "id": "PEUGEOT_205_GTI",
        "name": "205 GTi",
        "russianName": "205 GTi"
      },
      {
        "id": "PEUGEOT_206",
        "name": "206",
        "russianName": "206"
      },
      {
        "id": "PEUGEOT_207",
        "name": "207",
        "russianName": "207"
      },
      {
        "id": "PEUGEOT_207I",
        "name": "207i (Iran Khodro)",
        "russianName": "207и (Иран Кходро)"
      },
      {
        "id": "PEUGEOT_208",
        "name": "208",
        "russianName": "208"
      },
      {
        "id": "PEUGEOT_208_GTI",
        "name": "208 GTi",
        "russianName": "208 GTi"
      },
      {
        "id": "PEUGEOT_3008",
        "name": "3008",
        "russianName": "3008"
      },
      {
        "id": "PEUGEOT_301",
        "name": "301",
        "russianName": "301"
      },
      {
        "id": "PEUGEOT_304",
        "name": "304",
        "russianName": "304"
      },
      {
        "id": "PEUGEOT_305",
        "name": "305",
        "russianName": "305"
      },
      {
        "id": "PEUGEOT_306",
        "name": "306",
        "russianName": "306"
      },
      {
        "id": "PEUGEOT_307",
        "name": "307",
        "russianName": "307"
      },
      {
        "id": "PEUGEOT_308",
        "name": "308",
        "russianName": "308"
      },
      {
        "id": "PEUGEOT_308_GTI",
        "name": "308 GTi",
        "russianName": "308 GTi"
      },
      {
        "id": "PEUGEOT_309",
        "name": "309",
        "russianName": "309"
      },
      {
        "id": "PEUGEOT_4007",
        "name": "4007",
        "russianName": "4007"
      },
      {
        "id": "PEUGEOT_4008",
        "name": "4008",
        "russianName": "4008"
      },
      {
        "id": "PEUGEOT_402",
        "name": "402",
        "russianName": "402"
      },
      {
        "id": "PEUGEOT_403",
        "name": "403",
        "russianName": "403"
      },
      {
        "id": "PEUGEOT_404",
        "name": "404",
        "russianName": "404"
      },
      {
        "id": "PEUGEOT_405",
        "name": "405",
        "russianName": "405"
      },
      {
        "id": "PEUGEOT_406",
        "name": "406",
        "russianName": "406"
      },
      {
        "id": "PEUGEOT_407",
        "name": "407",
        "russianName": "407"
      },
      {
        "id": "PEUGEOT_408",
        "name": "408",
        "russianName": "408"
      },
      {
        "id": "PEUGEOT_5008",
        "name": "5008",
        "russianName": "5008"
      },
      {
        "id": "PEUGEOT_504",
        "name": "504",
        "russianName": "504"
      },
      {
        "id": "PEUGEOT_505",
        "name": "505",
        "russianName": "505"
      },
      {
        "id": "PEUGEOT_508",
        "name": "508",
        "russianName": "508"
      },
      {
        "id": "PEUGEOT_604",
        "name": "604",
        "russianName": "604"
      },
      {
        "id": "PEUGEOT_605",
        "name": "605",
        "russianName": "605"
      },
      {
        "id": "PEUGEOT_607",
        "name": "607",
        "russianName": "607"
      },
      {
        "id": "PEUGEOT_806",
        "name": "806",
        "russianName": "806"
      },
      {
        "id": "PEUGEOT_807",
        "name": "807",
        "russianName": "807"
      },
      {
        "id": "PEUGEOT_BIPPER",
        "name": "Bipper",
        "russianName": "Биппер"
      },
      {
        "id": "PEUGEOT_EXPERT",
        "name": "Expert",
        "russianName": "Эксперт"
      },
      {
        "id": "PEUGEOT_ION",
        "name": "iOn",
        "russianName": "ион"
      },
      {
        "id": "PEUGEOT_LANDTREK",
        "name": "Landtrek",
        "russianName": "Ландтрек"
      },
      {
        "id": "PEUGEOT_PARTNER",
        "name": "Partner",
        "russianName": "Партнер"
      },
      {
        "id": "PEUGEOT_PICK_UP",
        "name": "Pick Up",
        "russianName": "Пик Ап"
      },
      {
        "id": "PEUGEOT_RCZ",
        "name": "RCZ",
        "russianName": "RCZ"
      },
      {
        "id": "PEUGEOT_RIFTER",
        "name": "Rifter",
        "russianName": "Рифтер"
      },
      {
        "id": "PEUGEOT_TRAVELLER",
        "name": "Traveller",
        "russianName": "Травелер"
      }
    ]
  },
  "PGO": {
    "id": "PGO",
    "name": "PGO",
    "russianName": "ПГО",
    "models": [
      {
        "id": "PGO_CEVENNES",
        "name": "Cevennes",
        "russianName": "Севеннес"
      },
      {
        "id": "PGO_HEMERA",
        "name": "Hemera",
        "russianName": "Хемера"
      },
      {
        "id": "PGO_SPEEDSTER_II",
        "name": "Speedster II",
        "russianName": "Спидстер 2"
      }
    ]
  },
  "PIAGGIO": {
    "id": "PIAGGIO",
    "name": "Piaggio",
    "russianName": "Пьяджо",
    "models": [
      {
        "id": "PIAGGIO_PORTER",
        "name": "Porter",
        "russianName": "Портер"
      }
    ]
  },
  "PIERCE_ARROW": {
    "id": "PIERCE_ARROW",
    "name": "Pierce-Arrow",
    "russianName": "Пирс-Арроу",
    "models": [
      {
        "id": "PIERCE_ARROW_TWELVE",
        "name": "Twelve",
        "russianName": "Твелв"
      }
    ]
  },
  "PLYMOUTH": {
    "id": "PLYMOUTH",
    "name": "Plymouth",
    "russianName": "Плимут",
    "models": [
      {
        "id": "PLYMOUTH_ACCLAIM",
        "name": "Acclaim",
        "russianName": "Эклайм"
      },
      {
        "id": "PLYMOUTH_BARRACUDA",
        "name": "Barracuda",
        "russianName": "барракуда"
      },
      {
        "id": "PLYMOUTH_BREEZE",
        "name": "Breeze",
        "russianName": "Бриз"
      },
      {
        "id": "PLYMOUTH_CARAVELLE",
        "name": "Caravelle",
        "russianName": "Каравелла"
      },
      {
        "id": "PLYMOUTH_COLT_VISTA",
        "name": "Colt Vista",
        "russianName": "Кольт Виста"
      },
      {
        "id": "PLYMOUTH_CRANBROOK",
        "name": "Cranbrook",
        "russianName": "Крэнбрук"
      },
      {
        "id": "PLYMOUTH_DE_LUXE",
        "name": "De Luxe",
        "russianName": "Де Люкс"
      },
      {
        "id": "PLYMOUTH_FURY",
        "name": "Fury",
        "russianName": "фьюри"
      },
      {
        "id": "PLYMOUTH_GRAN_FURY",
        "name": "Gran Fury",
        "russianName": "Гран Фьюри"
      },
      {
        "id": "PLYMOUTH_HORIZON",
        "name": "Horizon",
        "russianName": "Хорайзон"
      },
      {
        "id": "PLYMOUTH_LASER",
        "name": "Laser",
        "russianName": "Лазер"
      },
      {
        "id": "PLYMOUTH_NEON",
        "name": "Neon",
        "russianName": "Неон"
      },
      {
        "id": "PLYMOUTH_PROWLER",
        "name": "Prowler",
        "russianName": "Проулер"
      },
      {
        "id": "PLYMOUTH_RELIANT",
        "name": "Reliant",
        "russianName": "релиант"
      },
      {
        "id": "PLYMOUTH_ROAD_RUNNER",
        "name": "Road Runner",
        "russianName": "роад раннер"
      },
      {
        "id": "PLYMOUTH_SATELLITE",
        "name": "Satellite",
        "russianName": "Сателит"
      },
      {
        "id": "PLYMOUTH_SUNDANCE",
        "name": "Sundance",
        "russianName": "Сандэнс"
      },
      {
        "id": "PLYMOUTH_TURISMO",
        "name": "Turismo",
        "russianName": "Туризмо"
      },
      {
        "id": "PLYMOUTH_VALIANT",
        "name": "Valiant",
        "russianName": "валиант"
      },
      {
        "id": "PLYMOUTH_VOLARE",
        "name": "Volare",
        "russianName": "Волар"
      },
      {
        "id": "PLYMOUTH_VOYAGER",
        "name": "Voyager",
        "russianName": "Вояджер"
      }
    ]
  },
  "POLAR_STONE_JISHI": {
    "id": "POLAR_STONE_JISHI",
    "name": "Polar Stone (Jishi)",
    "russianName": "Полар Стоун",
    "models": [
      {
        "id": "POLAR_STONE_JISHI_01",
        "name": "01",
        "russianName": "01"
      }
    ]
  },
  "POLESTAR": {
    "id": "POLESTAR",
    "name": "Polestar",
    "russianName": "Полестар",
    "models": [
      {
        "id": "POLESTAR_1",
        "name": "1",
        "russianName": "1"
      },
      {
        "id": "POLESTAR_2",
        "name": "2",
        "russianName": "2"
      },
      {
        "id": "POLESTAR_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "POLESTAR_4",
        "name": "4",
        "russianName": "4"
      },
      {
        "id": "POLESTAR_5",
        "name": "5",
        "russianName": "5"
      }
    ]
  },
  "PONTIAC": {
    "id": "PONTIAC",
    "name": "Pontiac",
    "russianName": "Понтиак",
    "models": [
      {
        "id": "PONTIAC_6000",
        "name": "6000",
        "russianName": "6000"
      },
      {
        "id": "PONTIAC_AZTEK",
        "name": "Aztek",
        "russianName": "Ацтек"
      },
      {
        "id": "PONTIAC_BONNEVILLE",
        "name": "Bonneville",
        "russianName": "Бонневиль"
      },
      {
        "id": "PONTIAC_CATALINA",
        "name": "Catalina",
        "russianName": "Каталина"
      },
      {
        "id": "PONTIAC_FIERO",
        "name": "Fiero",
        "russianName": "Фиеро"
      },
      {
        "id": "PONTIAC_FIREBIRD",
        "name": "Firebird",
        "russianName": "Фаербёрд"
      },
      {
        "id": "PONTIAC_FIREFLY",
        "name": "Firefly",
        "russianName": "Файрфлай"
      },
      {
        "id": "PONTIAC_G4",
        "name": "G4",
        "russianName": "г4"
      },
      {
        "id": "PONTIAC_G5",
        "name": "G5",
        "russianName": "г5"
      },
      {
        "id": "PONTIAC_G6",
        "name": "G6",
        "russianName": "г6"
      },
      {
        "id": "PONTIAC_G8",
        "name": "G8",
        "russianName": "г8"
      },
      {
        "id": "PONTIAC_GRAND_AM",
        "name": "Grand AM",
        "russianName": "Гранд АМ"
      },
      {
        "id": "PONTIAC_GRAND_PRIX",
        "name": "Grand Prix",
        "russianName": "Гран При"
      },
      {
        "id": "PONTIAC_GTO",
        "name": "GTO",
        "russianName": "гто"
      },
      {
        "id": "PONTIAC_LAURENTIAN",
        "name": "Laurentian",
        "russianName": "Лаурентиан"
      },
      {
        "id": "PONTIAC_LEMANS",
        "name": "LeMans",
        "russianName": "ЛеМан"
      },
      {
        "id": "PONTIAC_MONTANA",
        "name": "Montana",
        "russianName": "Монтана"
      },
      {
        "id": "PONTIAC_PARISIENNE",
        "name": "Parisienne",
        "russianName": "паризьен"
      },
      {
        "id": "PONTIAC_PHOENIX",
        "name": "Phoenix",
        "russianName": "Феникс"
      },
      {
        "id": "PONTIAC_SOLSTICE",
        "name": "Solstice",
        "russianName": "Солстайс"
      },
      {
        "id": "PONTIAC_SUNBIRD",
        "name": "Sunbird",
        "russianName": "Санбёрд"
      },
      {
        "id": "PONTIAC_SUNFIRE",
        "name": "Sunfire",
        "russianName": "Санфаер"
      },
      {
        "id": "PONTIAC_SUNRUNNER",
        "name": "Sunrunner",
        "russianName": "Санраннер"
      },
      {
        "id": "PONTIAC_TEMPEST",
        "name": "Tempest",
        "russianName": "Темпест"
      },
      {
        "id": "PONTIAC_TORPEDO",
        "name": "Torpedo",
        "russianName": "Торпедо"
      },
      {
        "id": "PONTIAC_TORRENT",
        "name": "Torrent",
        "russianName": "Торрент"
      },
      {
        "id": "PONTIAC_TRANS_SPORT",
        "name": "Trans Sport",
        "russianName": "Транс Спорт"
      },
      {
        "id": "PONTIAC_VIBE",
        "name": "Vibe",
        "russianName": "Вайб"
      },
      {
        "id": "PONTIAC_WAVE",
        "name": "Wave",
        "russianName": "Вейв"
      }
    ]
  },
  "PORSCHE": {
    "id": "PORSCHE",
    "name": "פורשה",
    "russianName": "Порше",
    "models": [
      {
        "id": "PORSCHE_356",
        "name": "356",
        "russianName": "356"
      },
      {
        "id": "PORSCHE_718_SPYDER",
        "name": "718 Spyder",
        "russianName": "718 Спайдер"
      },
      {
        "id": "PORSCHE_911",
        "name": "911",
        "russianName": "911"
      },
      {
        "id": "PORSCHE_911_GT2",
        "name": "911 GT2",
        "russianName": "911 GT2"
      },
      {
        "id": "PORSCHE_911_GT3",
        "name": "911 GT3",
        "russianName": "911 GT3"
      },
      {
        "id": "PORSCHE_911_R",
        "name": "911 R",
        "russianName": "911 р"
      },
      {
        "id": "PORSCHE_911_ST",
        "name": "911 S/T",
        "russianName": "911 С/Т"
      },
      {
        "id": "PORSCHE_912",
        "name": "912",
        "russianName": "912"
      },
      {
        "id": "PORSCHE_914",
        "name": "914",
        "russianName": "914"
      },
      {
        "id": "PORSCHE_918_SPYDER",
        "name": "918 Spyder",
        "russianName": "918 Спайдер"
      },
      {
        "id": "PORSCHE_924",
        "name": "924",
        "russianName": "924"
      },
      {
        "id": "PORSCHE_928",
        "name": "928",
        "russianName": "928"
      },
      {
        "id": "PORSCHE_944",
        "name": "944",
        "russianName": "944"
      },
      {
        "id": "PORSCHE_959",
        "name": "959",
        "russianName": "959"
      },
      {
        "id": "PORSCHE_968",
        "name": "968",
        "russianName": "968"
      },
      {
        "id": "PORSCHE_BOXSTER",
        "name": "Boxster",
        "russianName": "Бокстер"
      },
      {
        "id": "PORSCHE_CARRERA_GT",
        "name": "Carrera GT",
        "russianName": "Каррера GT"
      },
      {
        "id": "PORSCHE_CAYENNE",
        "name": "Cayenne",
        "russianName": "Кайен"
      },
      {
        "id": "PORSCHE_CAYMAN",
        "name": "Cayman",
        "russianName": "Кайман"
      },
      {
        "id": "PORSCHE_CAYMAN_GT4",
        "name": "Cayman GT4",
        "russianName": "Кайман Джи-Ти 4"
      },
      {
        "id": "PORSCHE_MACAN",
        "name": "Macan",
        "russianName": "Макан"
      },
      {
        "id": "PORSCHE_PANAMERA",
        "name": "Panamera",
        "russianName": "Панамера"
      },
      {
        "id": "PORSCHE_TAYCAN",
        "name": "Taycan",
        "russianName": "Тайкан"
      }
    ]
  },
  "PREMIER": {
    "id": "PREMIER",
    "name": "Premier",
    "russianName": "Премьер",
    "models": [
      {
        "id": "PREMIER_118NE",
        "name": "118NE",
        "russianName": "118 не"
      },
      {
        "id": "PREMIER_PADMINI",
        "name": "Padmini",
        "russianName": "падмини"
      }
    ]
  },
  "PROMO_AUTO": {
    "id": "PROMO_AUTO",
    "name": "Спортивные авто и реплики",
    "russianName": "Спортивные авто и Реплики",
    "models": [
      {
        "id": "PROMO_AUTO_BEACH_BUGGY_TYPE1",
        "name": "Багги Type 1",
        "russianName": "Пляжный багги тип 1"
      },
      {
        "id": "PROMO_AUTO_DRAGSTER",
        "name": "Драгстер",
        "russianName": "Драгстер"
      },
      {
        "id": "PROMO_AUTO_DRIFT",
        "name": "Дрифт-кар",
        "russianName": "Дрифт"
      },
      {
        "id": "PROMO_AUTO_FORMULA",
        "name": "Формула",
        "russianName": "Формула"
      },
      {
        "id": "PROMO_AUTO_GT_TOURING",
        "name": "GT & Touring",
        "russianName": "ГТ и Туринг"
      },
      {
        "id": "PROMO_AUTO_HOT_ROD_CUSTOM",
        "name": "Хот-род и Кастом",
        "russianName": "Хот-род и Кастом"
      },
      {
        "id": "PROMO_AUTO_OFFROAD",
        "name": "Offroad",
        "russianName": "Оффроуд"
      },
      {
        "id": "PROMO_AUTO_PROTOTYPE",
        "name": "Спортпрототип",
        "russianName": "Спортпрототип"
      },
      {
        "id": "PROMO_AUTO_RALLY_CROSS",
        "name": "Rally/cross",
        "russianName": "Ралли/кросс"
      },
      {
        "id": "PROMO_AUTO_REPLICA_I_SAMODELKI",
        "name": "Самоделки",
        "russianName": "Самоделки"
      },
      {
        "id": "PROMO_AUTO_SHORTCUT",
        "name": "Shortcut",
        "russianName": "Шорткат"
      }
    ]
  },
  "PROTON": {
    "id": "PROTON",
    "name": "Proton",
    "russianName": "Протон",
    "models": [
      {
        "id": "PROTON_ARENA",
        "name": "Arena",
        "russianName": "арена"
      },
      {
        "id": "PROTON_EXORA",
        "name": "Exora",
        "russianName": "ехора"
      },
      {
        "id": "PROTON_GEN_2",
        "name": "Gen-2",
        "russianName": "ген-2"
      },
      {
        "id": "PROTON_INSPIRA",
        "name": "Inspira",
        "russianName": "инспира"
      },
      {
        "id": "PROTON_IRIZ",
        "name": "Iriz",
        "russianName": "ириз"
      },
      {
        "id": "PROTON_JUARA",
        "name": "Juara",
        "russianName": "жуара"
      },
      {
        "id": "PROTON_PERDANA",
        "name": "Perdana",
        "russianName": "пердана"
      },
      {
        "id": "PROTON_PERSONA",
        "name": "Persona",
        "russianName": "персона"
      },
      {
        "id": "PROTON_PREVE",
        "name": "Preve",
        "russianName": "преве"
      },
      {
        "id": "PROTON_PUTRA",
        "name": "Putra",
        "russianName": "путра"
      },
      {
        "id": "PROTON_SAGA",
        "name": "Saga",
        "russianName": "Сага"
      },
      {
        "id": "PROTON_SATRIA",
        "name": "Satria",
        "russianName": "сатрия"
      },
      {
        "id": "PROTON_SAVVY",
        "name": "Savvy",
        "russianName": "савви"
      },
      {
        "id": "PROTON_TIARA",
        "name": "Tiara",
        "russianName": "Тиара"
      },
      {
        "id": "PROTON_WAJA",
        "name": "Waja",
        "russianName": "важа"
      },
      {
        "id": "PROTON_WIRA",
        "name": "Wira (400 Series)",
        "russianName": "вира"
      },
      {
        "id": "PROTON_X50",
        "name": "X50",
        "russianName": "Икс50"
      },
      {
        "id": "PROTON_X70",
        "name": "X70",
        "russianName": "икс70"
      }
    ]
  },
  "PUCH": {
    "id": "PUCH",
    "name": "Puch",
    "russianName": "Пух",
    "models": [
      {
        "id": "PUCH_G_MODELL",
        "name": "G-modell",
        "russianName": "г-модель"
      },
      {
        "id": "PUCH_PINZGAUER",
        "name": "Pinzgauer",
        "russianName": "Пинцгауэр"
      }
    ]
  },
  "PUMA": {
    "id": "PUMA",
    "name": "Puma",
    "russianName": "Пума",
    "models": [
      {
        "id": "PUMA_GTB",
        "name": "GTB",
        "russianName": "гтб"
      },
      {
        "id": "PUMA_GTE",
        "name": "GTE",
        "russianName": "гте"
      }
    ]
  },
  "PUNK": {
    "id": "PUNK",
    "name": "Punk",
    "russianName": "Панк",
    "models": [
      {
        "id": "PUNK_DUODUO",
        "name": "Duoduo",
        "russianName": "Дуодуо"
      }
    ]
  },
  "QIANTU": {
    "id": "QIANTU",
    "name": "Qiantu",
    "russianName": "Кианту",
    "models": [
      {
        "id": "QIANTU_K50",
        "name": "K50",
        "russianName": "К50"
      }
    ]
  },
  "QINGLING": {
    "id": "QINGLING",
    "name": "Qingling",
    "russianName": "Цинлин",
    "models": [
      {
        "id": "QINGLING_TAGA_H",
        "name": "Taga H",
        "russianName": "Тага Эйч"
      }
    ]
  },
  "QOROS": {
    "id": "QOROS",
    "name": "Qoros",
    "russianName": "Куорос",
    "models": [
      {
        "id": "QOROS_3",
        "name": "3",
        "russianName": "3"
      },
      {
        "id": "QOROS_5",
        "name": "5",
        "russianName": "5"
      }
    ]
  },
  "QVALE": {
    "id": "QVALE",
    "name": "Qvale",
    "russianName": "Куали",
    "models": [
      {
        "id": "QVALE_MANGUSTA",
        "name": "Mangusta",
        "russianName": "Мангуста"
      }
    ]
  },
  "RADAR": {
    "id": "RADAR",
    "name": "Radar",
    "russianName": "Радар",
    "models": [
      {
        "id": "RADAR_RD6",
        "name": "RD6",
        "russianName": "РД6"
      }
    ]
  },
  "RADFORD": {
    "id": "RADFORD",
    "name": "Radford",
    "russianName": "Радфорд",
    "models": [
      {
        "id": "RADFORD_TYPE_62_2",
        "name": "Type 62-2",
        "russianName": "Тип 62-2"
      }
    ]
  },
  "RAM": {
    "id": "RAM",
    "name": "Ram",
    "russianName": "Рам",
    "models": [
      {
        "id": "RAM_1500",
        "name": "1500",
        "russianName": "1500"
      },
      {
        "id": "RAM_PROMASTER_CITY",
        "name": "ProMaster City",
        "russianName": "Промастер Сити"
      },
      {
        "id": "RAM_RAMPAGE",
        "name": "Rampage",
        "russianName": "Рэмпейдж"
      },
      {
        "id": "RAM_V_1000",
        "name": "V1000",
        "russianName": "Ви 1000"
      }
    ]
  },
  "RAVON": {
    "id": "RAVON",
    "name": "Ravon",
    "russianName": "Равон",
    "models": [
      {
        "id": "RAVON_GENTRA",
        "name": "Gentra",
        "russianName": "Джентра"
      },
      {
        "id": "RAVON_MATIZ",
        "name": "Matiz",
        "russianName": "Матиз"
      },
      {
        "id": "RAVON_NEXIA_R3",
        "name": "Nexia R3",
        "russianName": "Нексия Р3"
      },
      {
        "id": "RAVON_R2",
        "name": "R2",
        "russianName": "р2"
      },
      {
        "id": "RAVON_R4",
        "name": "R4",
        "russianName": "Р4"
      }
    ]
  },
  "RAYTON_FISSORE": {
    "id": "RAYTON_FISSORE",
    "name": "Rayton Fissore",
    "russianName": "Рэйтон Физзоре",
    "models": [
      {
        "id": "RAYTON_FISSORE_MAGNUM",
        "name": "Magnum",
        "russianName": "магнум"
      }
    ]
  },
  "RELIANT": {
    "id": "RELIANT",
    "name": "Reliant",
    "russianName": "Релайент",
    "models": [
      {
        "id": "RELIANT_SCIMITAR",
        "name": "Scimitar Sabre",
        "russianName": "скимитар сабре"
      }
    ]
  },
  "RENAISSANCE_CARS": {
    "id": "RENAISSANCE_CARS",
    "name": "Renaissance",
    "russianName": "Ренессанс",
    "models": [
      {
        "id": "RENAISSANCE_CARS_TROPICA_ROADSTER",
        "name": "Tropica Roadster",
        "russianName": "Тропика Родстер"
      }
    ]
  },
  "RENAULT": {
    "id": "RENAULT",
    "name": "רנו",
    "russianName": "Рено",
    "models": [
      {
        "id": "RENAULT_10",
        "name": "10",
        "russianName": "10"
      },
      {
        "id": "RENAULT_11",
        "name": "11",
        "russianName": "11"
      },
      {
        "id": "RENAULT_12",
        "name": "12",
        "russianName": "12"
      },
      {
        "id": "RENAULT_14",
        "name": "14",
        "russianName": "14"
      },
      {
        "id": "RENAULT_15",
        "name": "15",
        "russianName": "15"
      },
      {
        "id": "RENAULT_16",
        "name": "16",
        "russianName": "16"
      },
      {
        "id": "RENAULT_17",
        "name": "17",
        "russianName": "17"
      },
      {
        "id": "RENAULT_18",
        "name": "18",
        "russianName": "18"
      },
      {
        "id": "RENAULT_19",
        "name": "19",
        "russianName": "19"
      },
      {
        "id": "RENAULT_20",
        "name": "20",
        "russianName": "20"
      },
      {
        "id": "RENAULT_21",
        "name": "21",
        "russianName": "21"
      },
      {
        "id": "RENAULT_25",
        "name": "25",
        "russianName": "25"
      },
      {
        "id": "RENAULT_30",
        "name": "30",
        "russianName": "30"
      },
      {
        "id": "RENAULT_4",
        "name": "4",
        "russianName": "4"
      },
      {
        "id": "RENAULT_4CV",
        "name": "4CV",
        "russianName": "4св"
      },
      {
        "id": "RENAULT_5",
        "name": "5",
        "russianName": "5"
      },
      {
        "id": "RENAULT_6",
        "name": "6",
        "russianName": "6"
      },
      {
        "id": "RENAULT_8",
        "name": "8",
        "russianName": "8"
      },
      {
        "id": "RENAULT_9",
        "name": "9",
        "russianName": "9"
      },
      {
        "id": "RENAULT_ALASKAN",
        "name": "Alaskan",
        "russianName": "Аласкан"
      },
      {
        "id": "RENAULT_ARKANA",
        "name": "Arkana",
        "russianName": "Аркана"
      },
      {
        "id": "RENAULT_AUSTRAL",
        "name": "Austral",
        "russianName": "Аустрал"
      },
      {
        "id": "RENAULT_AVANTIME",
        "name": "Avantime",
        "russianName": "Авантайм"
      },
      {
        "id": "RENAULT_BOREAL",
        "name": "Boreal",
        "russianName": "Бореал"
      },
      {
        "id": "RENAULT_CAPTUR",
        "name": "Captur",
        "russianName": "Каптюр"
      },
      {
        "id": "RENAULT_CARAVELLE",
        "name": "Caravelle",
        "russianName": "Каравелла"
      },
      {
        "id": "RENAULT_CELTAQUATRE",
        "name": "Celtaquatre",
        "russianName": "Сельтакватр"
      },
      {
        "id": "RENAULT_CITY_K_ZE",
        "name": "City K-ZE",
        "russianName": "Сити К-ЗЕ"
      },
      {
        "id": "RENAULT_CLIO",
        "name": "Clio",
        "russianName": "Клио"
      },
      {
        "id": "RENAULT_CLIO_RS",
        "name": "Clio RS",
        "russianName": "Клио РС"
      },
      {
        "id": "RENAULT_CLIO_SYMBOL",
        "name": "Symbol",
        "russianName": "Симбол"
      },
      {
        "id": "RENAULT_CLIO_V6",
        "name": "Clio V6",
        "russianName": "Клио В6"
      },
      {
        "id": "RENAULT_DAUPHINE",
        "name": "Dauphine",
        "russianName": "дауфине"
      },
      {
        "id": "RENAULT_DOKKER",
        "name": "Dokker",
        "russianName": "доккер"
      },
      {
        "id": "RENAULT_DUSTER",
        "name": "Duster",
        "russianName": "Дастер"
      },
      {
        "id": "RENAULT_ESPACE",
        "name": "Espace",
        "russianName": "Эспэйс"
      },
      {
        "id": "RENAULT_EXPRESS",
        "name": "Express",
        "russianName": "Экспресс"
      },
      {
        "id": "RENAULT_FLORIDE",
        "name": "Floride",
        "russianName": "Флорид"
      },
      {
        "id": "RENAULT_FLUENCE",
        "name": "Fluence",
        "russianName": "Флюенс"
      },
      {
        "id": "RENAULT_FREGATE",
        "name": "Fregate",
        "russianName": "Фрегат"
      },
      {
        "id": "RENAULT_FUEGO",
        "name": "Fuego",
        "russianName": "Фуего"
      },
      {
        "id": "RENAULT_GRAND_KOLEOS",
        "name": "Grand Koleos",
        "russianName": "Гранд Колеос"
      },
      {
        "id": "RENAULT_KADJAR",
        "name": "Kadjar",
        "russianName": "Каджар"
      },
      {
        "id": "RENAULT_KANGOO",
        "name": "Kangoo",
        "russianName": "Кэнгу"
      },
      {
        "id": "RENAULT_KAPTUR",
        "name": "Kaptur",
        "russianName": "Каптюр"
      },
      {
        "id": "RENAULT_KARDIAN",
        "name": "Kardian",
        "russianName": "Кардиан"
      },
      {
        "id": "RENAULT_KIGER",
        "name": "Kiger",
        "russianName": "Кигер"
      },
      {
        "id": "RENAULT_KOLEOS",
        "name": "Koleos",
        "russianName": "Колеос"
      },
      {
        "id": "RENAULT_KWID",
        "name": "KWID",
        "russianName": "квид"
      },
      {
        "id": "RENAULT_LAGUNA",
        "name": "Laguna",
        "russianName": "Лагуна"
      },
      {
        "id": "RENAULT_LATITUDE",
        "name": "Latitude",
        "russianName": "Латитюд"
      },
      {
        "id": "RENAULT_LODGY",
        "name": "Lodgy",
        "russianName": "Лоджи"
      },
      {
        "id": "RENAULT_LOGAN",
        "name": "Logan",
        "russianName": "Логан"
      },
      {
        "id": "RENAULT_LUTECIA",
        "name": "Lutecia",
        "russianName": "Лютеция"
      },
      {
        "id": "RENAULT_MEGANE",
        "name": "Megane",
        "russianName": "Меган"
      },
      {
        "id": "RENAULT_MEGANE_E_TECH",
        "name": "Megane E-Tech",
        "russianName": "Меган Е Тех"
      },
      {
        "id": "RENAULT_MEGANE_RS",
        "name": "Megane RS",
        "russianName": "Меган РС"
      },
      {
        "id": "RENAULT_MODUS",
        "name": "Modus",
        "russianName": "Модус"
      },
      {
        "id": "RENAULT_QM6",
        "name": "QM6",
        "russianName": "КьюЭм6"
      },
      {
        "id": "RENAULT_RAFALE",
        "name": "Rafale",
        "russianName": "Рафаль"
      },
      {
        "id": "RENAULT_RODEO",
        "name": "Rodeo",
        "russianName": "Родео"
      },
      {
        "id": "RENAULT_SAFRANE",
        "name": "Safrane",
        "russianName": "Сафран"
      },
      {
        "id": "RENAULT_SANDERO",
        "name": "Sandero",
        "russianName": "Сандеро"
      },
      {
        "id": "RENAULT_SANDERO_RS",
        "name": "Sandero RS",
        "russianName": "Сандеро РС"
      },
      {
        "id": "RENAULT_SCENIC",
        "name": "Scenic",
        "russianName": "Сценик"
      },
      {
        "id": "RENAULT_SPORT_SPYDER",
        "name": "Sport ספיידר",
        "russianName": "Спорт Спайдер"
      },
      {
        "id": "RENAULT_SYMBIOZ",
        "name": "Symbioz",
        "russianName": "Симбиоз"
      },
      {
        "id": "RENAULT_TALIANT",
        "name": "Taliant",
        "russianName": "Талиант"
      },
      {
        "id": "RENAULT_TALISMAN",
        "name": "Talisman",
        "russianName": "Талисман"
      },
      {
        "id": "RENAULT_TRAFIC",
        "name": "Trafic",
        "russianName": "трафик"
      },
      {
        "id": "RENAULT_TRIBER",
        "name": "Triber",
        "russianName": "Трибер"
      },
      {
        "id": "RENAULT_TWINGO",
        "name": "Twingo",
        "russianName": "Твинго"
      },
      {
        "id": "RENAULT_TWIZY",
        "name": "Twizy",
        "russianName": "Твизи"
      },
      {
        "id": "RENAULT_VEL_SATIS",
        "name": "Vel Satis",
        "russianName": "Вел Сатиз"
      },
      {
        "id": "RENAULT_VIVASTELLA",
        "name": "Vivastella",
        "russianName": "вивастелла"
      },
      {
        "id": "RENAULT_WIND",
        "name": "Wind",
        "russianName": "Винд"
      },
      {
        "id": "RENAULT_ZOE",
        "name": "ZOE",
        "russianName": "ЗОЕ"
      }
    ]
  },
  "REZVANI": {
    "id": "REZVANI",
    "name": "Rezvani",
    "russianName": "резвани",
    "models": [
      {
        "id": "REZVANI_ARSENAL",
        "name": "Arsenal",
        "russianName": "Арсенал"
      },
      {
        "id": "REZVANI_BEAST",
        "name": "Beast",
        "russianName": "Бист"
      },
      {
        "id": "REZVANI_TANK",
        "name": "Tank",
        "russianName": "Танк"
      }
    ]
  },
  "RIMAC": {
    "id": "RIMAC",
    "name": "Rimac",
    "russianName": "Римак",
    "models": [
      {
        "id": "RIMAC_CONCEPT_ONE",
        "name": "Concept_One",
        "russianName": "концепт ван"
      },
      {
        "id": "RIMAC_C_TWO",
        "name": "C Two",
        "russianName": "си ту"
      },
      {
        "id": "RIMAC_NEVERA",
        "name": "Nevera",
        "russianName": "Невера"
      }
    ]
  },
  "RINSPEED": {
    "id": "RINSPEED",
    "name": "Rinspeed",
    "russianName": "Ринспид",
    "models": [
      {
        "id": "RINSPEED_CHOPSTER",
        "name": "Chopster",
        "russianName": "Чопстер"
      }
    ]
  },
  "RISING_AUTO": {
    "id": "RISING_AUTO",
    "name": "Rising Auto",
    "russianName": "Райзинг Авто",
    "models": [
      {
        "id": "RISING_AUTO_F7",
        "name": "F7",
        "russianName": "Ф7"
      },
      {
        "id": "RISING_AUTO_MARVEL_R",
        "name": "Marvel R",
        "russianName": "Марвел Р"
      },
      {
        "id": "RISING_AUTO_R7",
        "name": "R7",
        "russianName": "Р7"
      }
    ]
  },
  "RIVIAN": {
    "id": "RIVIAN",
    "name": "Rivian",
    "russianName": "Ривиан",
    "models": [
      {
        "id": "RIVIAN_R1S",
        "name": "R1S",
        "russianName": "Р1С"
      },
      {
        "id": "RIVIAN_R1T",
        "name": "R1T",
        "russianName": "Р1Т"
      }
    ]
  },
  "ROEWE": {
    "id": "ROEWE",
    "name": "Roewe",
    "russianName": "Роев",
    "models": [
      {
        "id": "ROEWE_750",
        "name": "750",
        "russianName": "Семьсот пятьдесят"
      },
      {
        "id": "ROEWE_CLEVER",
        "name": "Clever",
        "russianName": "Клевер"
      },
      {
        "id": "ROEWE_D6",
        "name": "D6",
        "russianName": "Д6"
      },
      {
        "id": "ROEWE_D7",
        "name": "D7",
        "russianName": "Д7"
      },
      {
        "id": "ROEWE_E50",
        "name": "E50",
        "russianName": "Е50"
      },
      {
        "id": "ROEWE_I5",
        "name": "i5",
        "russianName": "ай5"
      },
      {
        "id": "ROEWE_I6",
        "name": "i6",
        "russianName": "ай6"
      },
      {
        "id": "ROEWE_I6_MAX",
        "name": "i6 Max",
        "russianName": "ай6 макс"
      },
      {
        "id": "ROEWE_IMAX8",
        "name": "iMAX8",
        "russianName": "аймакс8"
      },
      {
        "id": "ROEWE_M7",
        "name": "M7",
        "russianName": "М7"
      },
      {
        "id": "ROEWE_MARVEL_X",
        "name": "Marvel X",
        "russianName": "Марвел Икс"
      },
      {
        "id": "ROEWE_RX3",
        "name": "RX3",
        "russianName": "РХ3"
      },
      {
        "id": "ROEWE_RX3_PRO",
        "name": "RX3 Pro",
        "russianName": "РХ3 Про"
      },
      {
        "id": "ROEWE_RX5",
        "name": "RX5",
        "russianName": "рикс5"
      },
      {
        "id": "ROEWE_RX5_MAX",
        "name": "RX5 Max",
        "russianName": "рикс5 макс"
      },
      {
        "id": "ROEWE_RX8",
        "name": "RX8",
        "russianName": "РХ8"
      },
      {
        "id": "ROEWE_RX9",
        "name": "RX9",
        "russianName": "rx9"
      },
      {
        "id": "ROEWE_WHALE",
        "name": "Whale",
        "russianName": "Вейл"
      }
    ]
  },
  "ROLLS_ROYCE": {
    "id": "ROLLS_ROYCE",
    "name": "Rolls-Royce",
    "russianName": "Роллс-Ройс",
    "models": [
      {
        "id": "ROLLS_ROYCE_20",
        "name": "20",
        "russianName": "20"
      },
      {
        "id": "ROLLS_ROYCE_20_25",
        "name": "20/25",
        "russianName": "20/25"
      },
      {
        "id": "ROLLS_ROYCE_BOAT_TAIL",
        "name": "Boat Tail",
        "russianName": "Бот Тэйл"
      },
      {
        "id": "ROLLS_ROYCE_CAMARGUE",
        "name": "Camargue",
        "russianName": "камарг"
      },
      {
        "id": "ROLLS_ROYCE_CORNICHE",
        "name": "Corniche",
        "russianName": "корниш"
      },
      {
        "id": "ROLLS_ROYCE_CULLINAN",
        "name": "Cullinan",
        "russianName": "Куллинан"
      },
      {
        "id": "ROLLS_ROYCE_DAWN",
        "name": "Dawn",
        "russianName": "давн"
      },
      {
        "id": "ROLLS_ROYCE_GHOST",
        "name": "Ghost",
        "russianName": "гост"
      },
      {
        "id": "ROLLS_ROYCE_PARK_WARD",
        "name": "Park Ward",
        "russianName": "парк вард"
      },
      {
        "id": "ROLLS_ROYCE_PHANTOM",
        "name": "Phantom",
        "russianName": "Фантом"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_CLOUD",
        "name": "Silver Cloud",
        "russianName": "сильвер клауд"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_GHOST",
        "name": "Silver Ghost",
        "russianName": "сильвер гост"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_SERAPH",
        "name": "Silver Seraph",
        "russianName": "сильвер сераф"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_SHADOW",
        "name": "Silver Shadow",
        "russianName": "Сильвер шедоу"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_SPIRIT",
        "name": "Silver Spirit",
        "russianName": "Сильвер Спирит"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_SPUR",
        "name": "Silver Spur",
        "russianName": "сильвер спур"
      },
      {
        "id": "ROLLS_ROYCE_SILVER_WRAITH",
        "name": "Silver Wraith",
        "russianName": "сильвер рейс"
      },
      {
        "id": "ROLLS_ROYCE_SPECTRE",
        "name": "Spectre",
        "russianName": "Спектр"
      },
      {
        "id": "ROLLS_ROYCE_WRAITH",
        "name": "Wraith",
        "russianName": "рейс"
      }
    ]
  },
  "RONART": {
    "id": "RONART",
    "name": "Ronart",
    "russianName": "Ронарт",
    "models": [
      {
        "id": "RONART_LIGHTING",
        "name": "Lightning",
        "russianName": "лайтнинг"
      }
    ]
  },
  "ROSSA": {
    "id": "ROSSA",
    "name": "Rossa",
    "russianName": "Росса",
    "models": [
      {
        "id": "ROSSA_CONCEPT",
        "name": "Concept",
        "russianName": "Концепт"
      }
    ]
  },
  "ROVER": {
    "id": "ROVER",
    "name": "Rover",
    "russianName": "Ровер",
    "models": [
      {
        "id": "ROVER_100",
        "name": "100",
        "russianName": "100"
      },
      {
        "id": "ROVER_14",
        "name": "14",
        "russianName": "14"
      },
      {
        "id": "ROVER_200",
        "name": "200",
        "russianName": "200"
      },
      {
        "id": "ROVER_25",
        "name": "25",
        "russianName": "25"
      },
      {
        "id": "ROVER_400",
        "name": "400",
        "russianName": "400"
      },
      {
        "id": "ROVER_45",
        "name": "45",
        "russianName": "45"
      },
      {
        "id": "ROVER_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "ROVER_75",
        "name": "75",
        "russianName": "75"
      },
      {
        "id": "ROVER_800",
        "name": "800",
        "russianName": "800"
      },
      {
        "id": "ROVER_MAESTRO",
        "name": "Maestro",
        "russianName": "Маэстро"
      },
      {
        "id": "ROVER_METRO",
        "name": "Metro",
        "russianName": "Метро"
      },
      {
        "id": "ROVER_MINI",
        "name": "מיני",
        "russianName": "мини"
      },
      {
        "id": "ROVER_MONTEGO",
        "name": "Montego",
        "russianName": "Монтего"
      },
      {
        "id": "ROVER_P3",
        "name": "P3",
        "russianName": "п3"
      },
      {
        "id": "ROVER_P4",
        "name": "P4",
        "russianName": "P4"
      },
      {
        "id": "ROVER_P6",
        "name": "P6",
        "russianName": "п6"
      },
      {
        "id": "ROVER_SD1",
        "name": "SD1",
        "russianName": "сд1"
      },
      {
        "id": "ROVER_STREETWISE",
        "name": "Streetwise",
        "russianName": "Стритвайз"
      }
    ]
  },
  "ROX": {
    "id": "ROX",
    "name": "Rox",
    "russianName": "Рокс",
    "models": [
      {
        "id": "ROX_01",
        "name": "01",
        "russianName": "01"
      },
      {
        "id": "ROX_ADAMAS",
        "name": "Adamas",
        "russianName": "Адамас"
      }
    ]
  },
  "RUSSO_BALTIQUE": {
    "id": "RUSSO_BALTIQUE",
    "name": "Руссо-Балт",
    "russianName": "Руссо-Балт",
    "models": [
      {
        "id": "RUSSO_BALTIQUE_C24",
        "name": "С24",
        "russianName": "С24"
      }
    ]
  },
  "SAAB": {
    "id": "SAAB",
    "name": "Saab",
    "russianName": "Сааб",
    "models": [
      {
        "id": "SAAB_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "SAAB_90",
        "name": "90",
        "russianName": "90"
      },
      {
        "id": "SAAB_900",
        "name": "900",
        "russianName": "900"
      },
      {
        "id": "SAAB_9000",
        "name": "9000",
        "russianName": "9000"
      },
      {
        "id": "SAAB_93",
        "name": "93",
        "russianName": "93"
      },
      {
        "id": "SAAB_95",
        "name": "95",
        "russianName": "95"
      },
      {
        "id": "SAAB_96",
        "name": "96",
        "russianName": "96"
      },
      {
        "id": "SAAB_99",
        "name": "99",
        "russianName": "99"
      },
      {
        "id": "SAAB_9_2X",
        "name": "9-2X",
        "russianName": "9-2X"
      },
      {
        "id": "SAAB_9_3",
        "name": "9-3",
        "russianName": "9-3"
      },
      {
        "id": "SAAB_9_4X",
        "name": "9-4X",
        "russianName": "9-4X"
      },
      {
        "id": "SAAB_9_5",
        "name": "9-5",
        "russianName": "9-5"
      },
      {
        "id": "SAAB_9_7X",
        "name": "9-7X",
        "russianName": "9-7X"
      },
      {
        "id": "SAAB_SONETT",
        "name": "Sonett",
        "russianName": "сонет"
      }
    ]
  },
  "SAIC": {
    "id": "SAIC",
    "name": "SAIC",
    "russianName": "САИК",
    "models": [
      {
        "id": "SAIC_H5",
        "name": "H5",
        "russianName": "Аш5"
      }
    ]
  },
  "SAIPA": {
    "id": "SAIPA",
    "name": "Saipa",
    "russianName": "Сайпа",
    "models": [
      {
        "id": "SAIPA_QUICK",
        "name": "Quick",
        "russianName": "Квик"
      },
      {
        "id": "SAIPA_SAINA",
        "name": "Saina",
        "russianName": "Сайна"
      },
      {
        "id": "SAIPA_SHAHIN",
        "name": "Shahin",
        "russianName": "шахин"
      },
      {
        "id": "SAIPA_TIBA",
        "name": "Tiba",
        "russianName": "Тиба"
      }
    ]
  },
  "SALEEN": {
    "id": "SALEEN",
    "name": "Saleen",
    "russianName": "Салин",
    "models": [
      {
        "id": "SALEEN_S7",
        "name": "S7",
        "russianName": "с7"
      },
      {
        "id": "SALEEN_S_281",
        "name": "S281",
        "russianName": "С281"
      }
    ]
  },
  "SAMSUNG": {
    "id": "SAMSUNG",
    "name": "Renault Samsung",
    "russianName": "Рено Самсунг",
    "models": [
      {
        "id": "SAMSUNG_QM3",
        "name": "QM3",
        "russianName": "куэм3"
      },
      {
        "id": "SAMSUNG_QM5",
        "name": "QM5",
        "russianName": "куэм5"
      },
      {
        "id": "SAMSUNG_QM6",
        "name": "QM6",
        "russianName": "куэм6"
      },
      {
        "id": "SAMSUNG_SM3",
        "name": "SM3",
        "russianName": "см3"
      },
      {
        "id": "SAMSUNG_SM5",
        "name": "SM5",
        "russianName": "см5"
      },
      {
        "id": "SAMSUNG_SM6",
        "name": "SM6",
        "russianName": "СМ6"
      },
      {
        "id": "SAMSUNG_SM7",
        "name": "SM7",
        "russianName": "см7"
      },
      {
        "id": "SAMSUNG_XM3",
        "name": "XM3",
        "russianName": "ИксЭм3"
      }
    ]
  },
  "SANDSTORM": {
    "id": "SANDSTORM",
    "name": "Sandstorm",
    "russianName": "Сандсторм",
    "models": [
      {
        "id": "SANDSTORM_ALREEM",
        "name": "Alreem",
        "russianName": "Алрим"
      },
      {
        "id": "SANDSTORM_S24",
        "name": "S24",
        "russianName": "с24"
      }
    ]
  },
  "SANTANA": {
    "id": "SANTANA",
    "name": "Santana",
    "russianName": "Сантана",
    "models": [
      {
        "id": "SANTANA_PS_10",
        "name": "PS-10",
        "russianName": "пс-10"
      }
    ]
  },
  "SATURN": {
    "id": "SATURN",
    "name": "Saturn",
    "russianName": "Сатурн",
    "models": [
      {
        "id": "SATURN_ASTRA",
        "name": "Astra",
        "russianName": "астра"
      },
      {
        "id": "SATURN_AURA",
        "name": "Aura",
        "russianName": "Аура"
      },
      {
        "id": "SATURN_ION",
        "name": "ION",
        "russianName": "Ион"
      },
      {
        "id": "SATURN_LS",
        "name": "LS",
        "russianName": "лс"
      },
      {
        "id": "SATURN_LW",
        "name": "LW",
        "russianName": "лв"
      },
      {
        "id": "SATURN_OUTLOOK",
        "name": "Outlook",
        "russianName": "Аутлук"
      },
      {
        "id": "SATURN_RELAY",
        "name": "Relay",
        "russianName": "Релей"
      },
      {
        "id": "SATURN_SC",
        "name": "SC",
        "russianName": "сц"
      },
      {
        "id": "SATURN_SKY",
        "name": "Sky",
        "russianName": "Скай"
      },
      {
        "id": "SATURN_SL",
        "name": "SL",
        "russianName": "сл"
      },
      {
        "id": "SATURN_SW",
        "name": "SW",
        "russianName": "св"
      },
      {
        "id": "SATURN_VUE",
        "name": "VUE",
        "russianName": "Вью"
      }
    ]
  },
  "SCION": {
    "id": "SCION",
    "name": "Scion",
    "russianName": "Сайон",
    "models": [
      {
        "id": "SCION_FR_S",
        "name": "FR-S",
        "russianName": "фр-с"
      },
      {
        "id": "SCION_IA",
        "name": "iA",
        "russianName": "айа"
      },
      {
        "id": "SCION_IM",
        "name": "iM",
        "russianName": "айм"
      },
      {
        "id": "SCION_IQQ",
        "name": "iQ",
        "russianName": "айку"
      },
      {
        "id": "SCION_TC",
        "name": "tC",
        "russianName": "тс"
      },
      {
        "id": "SCION_XA",
        "name": "xA",
        "russianName": "ха"
      },
      {
        "id": "SCION_XB",
        "name": "xB",
        "russianName": "хб"
      },
      {
        "id": "SCION_XD",
        "name": "xD",
        "russianName": "хд"
      }
    ]
  },
  "SCOUT": {
    "id": "SCOUT",
    "name": "Scout",
    "russianName": "Скаут",
    "models": [
      {
        "id": "SCOUT_TERRA",
        "name": "Terra",
        "russianName": "Тэрра"
      },
      {
        "id": "SCOUT_TRAVELER",
        "name": "Traveler",
        "russianName": "Трэвелер"
      }
    ]
  },
  "SEARS": {
    "id": "SEARS",
    "name": "Sears",
    "russianName": "Сирс",
    "models": [
      {
        "id": "SEARS_MODEL_J",
        "name": "Model J",
        "russianName": "Модел Джи"
      }
    ]
  },
  "SEAT": {
    "id": "SEAT",
    "name": "סיאט",
    "russianName": "Сеат",
    "models": [
      {
        "id": "SEAT_132",
        "name": "132",
        "russianName": "132"
      },
      {
        "id": "SEAT_133",
        "name": "133",
        "russianName": "133"
      },
      {
        "id": "SEAT_ALHAMBRA",
        "name": "Alhambra",
        "russianName": "Альхамбра"
      },
      {
        "id": "SEAT_ALTEA",
        "name": "Altea",
        "russianName": "Альтеа"
      },
      {
        "id": "SEAT_ARONA",
        "name": "Arona",
        "russianName": "Арона"
      },
      {
        "id": "SEAT_AROSA",
        "name": "Arosa",
        "russianName": "Ароса"
      },
      {
        "id": "SEAT_ATECA",
        "name": "Ateca",
        "russianName": "Атека"
      },
      {
        "id": "SEAT_CORDOBA",
        "name": "Cordoba",
        "russianName": "Кордоба"
      },
      {
        "id": "SEAT_EXEO",
        "name": "Exeo",
        "russianName": "Эксео"
      },
      {
        "id": "SEAT_FURA",
        "name": "Fura",
        "russianName": "Фура"
      },
      {
        "id": "SEAT_IBIZA",
        "name": "Ibiza",
        "russianName": "Ибица"
      },
      {
        "id": "SEAT_IBIZA_CUPRA",
        "name": "Ibiza Cupra",
        "russianName": "Ибица Купра"
      },
      {
        "id": "SEAT_INCA",
        "name": "Inca",
        "russianName": "ИНКА"
      },
      {
        "id": "SEAT_LEON",
        "name": "Leon",
        "russianName": "Леон"
      },
      {
        "id": "SEAT_LEON_CUPRA",
        "name": "Leon Cupra",
        "russianName": "Леон Купра"
      },
      {
        "id": "SEAT_MALAGA",
        "name": "Malaga",
        "russianName": "Малага"
      },
      {
        "id": "SEAT_MARBELLA",
        "name": "Marbella",
        "russianName": "Марбелла"
      },
      {
        "id": "SEAT_MII",
        "name": "Mii",
        "russianName": "мии"
      },
      {
        "id": "SEAT_RONDA",
        "name": "Ronda",
        "russianName": "Ронда"
      },
      {
        "id": "SEAT_TARRACO",
        "name": "Tarraco",
        "russianName": "Таррако"
      },
      {
        "id": "SEAT_TOLEDO",
        "name": "Toledo",
        "russianName": "Толедо"
      }
    ]
  },
  "SERES": {
    "id": "SERES",
    "name": "Seres",
    "russianName": "Серес",
    "models": [
      {
        "id": "SERES_M5",
        "name": "M5",
        "russianName": "м5"
      },
      {
        "id": "SERES_M7",
        "name": "M7",
        "russianName": "М7"
      },
      {
        "id": "SERES_M9",
        "name": "M9",
        "russianName": "м9"
      },
      {
        "id": "SERES_SF5",
        "name": "SF5",
        "russianName": "СФ5"
      }
    ]
  },
  "SHANGHAI_MAPLE": {
    "id": "SHANGHAI_MAPLE",
    "name": "Shanghai Maple",
    "russianName": "Шанхай Мапл",
    "models": [
      {
        "id": "SHANGHAI_MAPLE_C31",
        "name": "C31",
        "russianName": "Ц31"
      },
      {
        "id": "SHANGHAI_MAPLE_C32",
        "name": "C32",
        "russianName": "с32"
      },
      {
        "id": "SHANGHAI_MAPLE_C51",
        "name": "C51",
        "russianName": "Ц51"
      },
      {
        "id": "SHANGHAI_MAPLE_C52",
        "name": "C52",
        "russianName": "Ц52"
      },
      {
        "id": "SHANGHAI_MAPLE_C61",
        "name": "C61",
        "russianName": "с61"
      },
      {
        "id": "SHANGHAI_MAPLE_C81",
        "name": "C81",
        "russianName": "Ц81"
      }
    ]
  },
  "SHANGJIE": {
    "id": "SHANGJIE",
    "name": "Shangjie",
    "russianName": "Шанцзе",
    "models": []
  },
  "SHUANGHUAN": {
    "id": "SHUANGHUAN",
    "name": "ShuangHuan",
    "russianName": "Шунган",
    "models": [
      {
        "id": "SHUANGHUAN_NOBLE",
        "name": "Noble",
        "russianName": "Нобл"
      },
      {
        "id": "SHUANGHUAN_SCEO",
        "name": "Sceo",
        "russianName": "Сцео"
      }
    ]
  },
  "SIMCA": {
    "id": "SIMCA",
    "name": "Simca",
    "russianName": "Симка",
    "models": [
      {
        "id": "SIMCA_1300_1500",
        "name": "1300/1500",
        "russianName": "1300/1500"
      },
      {
        "id": "SIMCA_1307",
        "name": "1307",
        "russianName": "1307"
      }
    ]
  },
  "SKODA": {
    "id": "SKODA",
    "name": "סקודה",
    "russianName": "Шкода",
    "models": [
      {
        "id": "SKODA_100_SERIES",
        "name": "100 Series",
        "russianName": "100 серия"
      },
      {
        "id": "SKODA_120",
        "name": "105, 120",
        "russianName": "105, 120"
      },
      {
        "id": "SKODA_1200",
        "name": "1200",
        "russianName": "1200"
      },
      {
        "id": "SKODA_440",
        "name": "440",
        "russianName": "440"
      },
      {
        "id": "SKODA_445",
        "name": "445",
        "russianName": "445"
      },
      {
        "id": "SKODA_CITIGO",
        "name": "Citigo",
        "russianName": "Ситиго"
      },
      {
        "id": "SKODA_ELROQ",
        "name": "Elroq",
        "russianName": "Элрок"
      },
      {
        "id": "SKODA_ELROQ_RS",
        "name": "Elroq RS",
        "russianName": "Элрок РС"
      },
      {
        "id": "SKODA_ENYAQ",
        "name": "Enyaq",
        "russianName": "Эниак"
      },
      {
        "id": "SKODA_ENYAQ_COUPE",
        "name": "Enyaq Coupe",
        "russianName": "Эниак Купе"
      },
      {
        "id": "SKODA_ENYAQ_COUPE_RS",
        "name": "Enyaq Coupe RS",
        "russianName": "Эниак Купе РС"
      },
      {
        "id": "SKODA_ENYAQ_RS",
        "name": "Enyaq RS",
        "russianName": "Эниак РС"
      },
      {
        "id": "SKODA_FABIA",
        "name": "Fabia",
        "russianName": "Фабия"
      },
      {
        "id": "SKODA_FABIA_RS",
        "name": "Fabia RS",
        "russianName": "Фабия РС"
      },
      {
        "id": "SKODA_FAVORIT",
        "name": "Favorit",
        "russianName": "Фаворит"
      },
      {
        "id": "SKODA_FELICIA",
        "name": "Felicia",
        "russianName": "Фелиция"
      },
      {
        "id": "SKODA_FORMAN",
        "name": "Forman",
        "russianName": "форман"
      },
      {
        "id": "SKODA_KAMIQ",
        "name": "Kamiq",
        "russianName": "Камик"
      },
      {
        "id": "SKODA_KAROQ",
        "name": "Karoq",
        "russianName": "Карок"
      },
      {
        "id": "SKODA_KODIAQ",
        "name": "Kodiaq",
        "russianName": "Кодиак"
      },
      {
        "id": "SKODA_KODIAQ_GT",
        "name": "Kodiaq GT",
        "russianName": "Кодиак ГТ"
      },
      {
        "id": "SKODA_KODIAQ_RS",
        "name": "Kodiaq RS",
        "russianName": "Кодиак РС"
      },
      {
        "id": "SKODA_KUSHAQ",
        "name": "Kushaq",
        "russianName": "Кушак"
      },
      {
        "id": "SKODA_KYLAQ",
        "name": "Kylaq",
        "russianName": "Кайлак"
      },
      {
        "id": "SKODA_OCTAVIA",
        "name": "Octavia",
        "russianName": "Октавия"
      },
      {
        "id": "SKODA_OCTAVIA_RS",
        "name": "Octavia RS",
        "russianName": "Октавия РС"
      },
      {
        "id": "SKODA_POPULAR",
        "name": "Popular",
        "russianName": "популяр"
      },
      {
        "id": "SKODA_RAPID",
        "name": "Rapid",
        "russianName": "Рапид"
      },
      {
        "id": "SKODA_ROOMSTER",
        "name": "Roomster",
        "russianName": "Румстер"
      },
      {
        "id": "SKODA_SCALA",
        "name": "Scala",
        "russianName": "Скала"
      },
      {
        "id": "SKODA_SLAVIA",
        "name": "Slavia",
        "russianName": "Славия"
      },
      {
        "id": "SKODA_SUPERB",
        "name": "Superb",
        "russianName": "Суперб"
      },
      {
        "id": "SKODA_YETI",
        "name": "Yeti",
        "russianName": "Йети"
      }
    ]
  },
  "SKYWELL": {
    "id": "SKYWELL",
    "name": "Skywell",
    "russianName": "Скайвэлл",
    "models": [
      {
        "id": "SKYWELL_ET5",
        "name": "ET5",
        "russianName": "ЕТ5"
      },
      {
        "id": "SKYWELL_HT_I",
        "name": "HT-i",
        "russianName": "ХТ-И"
      }
    ]
  },
  "SKYWORTH": {
    "id": "SKYWORTH",
    "name": "Skyworth",
    "russianName": "Скайворт",
    "models": [
      {
        "id": "SKYWORTH_EV6",
        "name": "EV6",
        "russianName": "ЕВ6"
      }
    ]
  },
  "SMART": {
    "id": "SMART",
    "name": "סמארט",
    "russianName": "Смарт",
    "models": [
      {
        "id": "SMART_FORFOUR",
        "name": "Forfour",
        "russianName": "Фофо"
      },
      {
        "id": "SMART_FORTWO",
        "name": "Fortwo",
        "russianName": "Фоту"
      },
      {
        "id": "SMART_NUMBER_1",
        "name": "#1",
        "russianName": "Номер 1"
      },
      {
        "id": "SMART_NUMBER_3",
        "name": "#3",
        "russianName": "Номер 3"
      },
      {
        "id": "SMART_NUMBER_5",
        "name": "#5",
        "russianName": "Номер 5"
      },
      {
        "id": "SMART_ROADSTER",
        "name": "Roadster",
        "russianName": "роадстер"
      }
    ]
  },
  "SMZ": {
    "id": "SMZ",
    "name": "СМЗ",
    "russianName": "СМЗ",
    "models": [
      {
        "id": "SMZ_S1L",
        "name": "С-1Л",
        "russianName": "с-1л"
      },
      {
        "id": "SMZ_S3A",
        "name": "С-3А",
        "russianName": "с-3а"
      },
      {
        "id": "SMZ_S3D",
        "name": "С-3Д",
        "russianName": "с-3д"
      },
      {
        "id": "SMZ_S3L",
        "name": "С-3Л",
        "russianName": "с-3л"
      }
    ]
  },
  "SOLARIS": {
    "id": "SOLARIS",
    "name": "Solaris",
    "russianName": "Солярис",
    "models": [
      {
        "id": "SOLARIS_HC",
        "name": "HC",
        "russianName": "ХЦ"
      },
      {
        "id": "SOLARIS_HS",
        "name": "HS",
        "russianName": "ХС"
      },
      {
        "id": "SOLARIS_KRS",
        "name": "KRS",
        "russianName": "КРС"
      },
      {
        "id": "SOLARIS_KRX",
        "name": "KRX",
        "russianName": "КРИкс"
      }
    ]
  },
  "SOLLERS": {
    "id": "SOLLERS",
    "name": "Sollers",
    "russianName": "Соллерс",
    "models": [
      {
        "id": "SOLLERS_SP7",
        "name": "SP7",
        "russianName": "СП7"
      },
      {
        "id": "SOLLERS_ST6",
        "name": "ST6",
        "russianName": "СТ6"
      },
      {
        "id": "SOLLERS_ST8",
        "name": "ST8",
        "russianName": "СТ8"
      },
      {
        "id": "SOLLERS_ST9",
        "name": "ST9",
        "russianName": "СТ9"
      }
    ]
  },
  "SOUEAST": {
    "id": "SOUEAST",
    "name": "Soueast",
    "russianName": "Соуист",
    "models": [
      {
        "id": "SOUEAST_A5",
        "name": "A5",
        "russianName": "А5"
      },
      {
        "id": "SOUEAST_DX3",
        "name": "DX3",
        "russianName": "ДиИкс3"
      },
      {
        "id": "SOUEAST_DX5",
        "name": "DX5",
        "russianName": "ДиИкс5"
      },
      {
        "id": "SOUEAST_DX7",
        "name": "DX7",
        "russianName": "ДиИкс7"
      },
      {
        "id": "SOUEAST_DX8",
        "name": "DX8",
        "russianName": "ДиИкс8"
      },
      {
        "id": "SOUEAST_DX8S",
        "name": "DX8S",
        "russianName": "ДиИкс8С"
      },
      {
        "id": "SOUEAST_LIONCEL",
        "name": "Lioncel",
        "russianName": "Лайонсел"
      },
      {
        "id": "SOUEAST_S06",
        "name": "S06",
        "russianName": "С06"
      },
      {
        "id": "SOUEAST_S07",
        "name": "S07",
        "russianName": "С07"
      },
      {
        "id": "SOUEAST_S09",
        "name": "S09",
        "russianName": "С09"
      },
      {
        "id": "SOUEAST_SOVERAN",
        "name": "Soveran",
        "russianName": "Соверан"
      },
      {
        "id": "SOUEAST_V3",
        "name": "V3",
        "russianName": "В3"
      },
      {
        "id": "SOUEAST_V5",
        "name": "V5",
        "russianName": "В5"
      },
      {
        "id": "SOUEAST_V6_CROSS",
        "name": "V6 Cross",
        "russianName": "В6 Кросс"
      }
    ]
  },
  "SPECTRE": {
    "id": "SPECTRE",
    "name": "Spectre",
    "russianName": "Спектр",
    "models": [
      {
        "id": "SPECTRE_R42",
        "name": "R42",
        "russianName": "р42"
      }
    ]
  },
  "SPYKER": {
    "id": "SPYKER",
    "name": "Spyker",
    "russianName": "Спайкер",
    "models": [
      {
        "id": "SPYKER_C12",
        "name": "C12",
        "russianName": "с12"
      },
      {
        "id": "SPYKER_C8",
        "name": "C8",
        "russianName": "с8"
      }
    ]
  },
  "SSANG_YONG": {
    "id": "SSANG_YONG",
    "name": "סאנגיונג",
    "russianName": "Ссанъён",
    "models": [
      {
        "id": "SSANG_YONG_ACTYON",
        "name": "Actyon",
        "russianName": "Актион"
      },
      {
        "id": "SSANG_YONG_ACTYON_SPORT",
        "name": "Actyon Sports",
        "russianName": "Актион Спортс"
      },
      {
        "id": "SSANG_YONG_CHAIRMAN",
        "name": "Chairman",
        "russianName": "Чиамэн"
      },
      {
        "id": "SSANG_YONG_ISTANA",
        "name": "Istana",
        "russianName": "истана"
      },
      {
        "id": "SSANG_YONG_KALLISTA",
        "name": "Kallista",
        "russianName": "Калиста"
      },
      {
        "id": "SSANG_YONG_KORANDO",
        "name": "Korando",
        "russianName": "Корандо"
      },
      {
        "id": "SSANG_YONG_KORANDO_FAMILY",
        "name": "Korando Family",
        "russianName": "Корандо Фэмили"
      },
      {
        "id": "SSANG_YONG_KORANDO_SPORTS",
        "name": "Korando Sports",
        "russianName": "Корандо Спортс"
      },
      {
        "id": "SSANG_YONG_KORANDO_TURISMO",
        "name": "Korando Turismo",
        "russianName": "корандо туризмо"
      },
      {
        "id": "SSANG_YONG_KYRON",
        "name": "Kyron",
        "russianName": "Кайрон"
      },
      {
        "id": "SSANG_YONG_MUSSO",
        "name": "Musso",
        "russianName": "Муссо"
      },
      {
        "id": "SSANG_YONG_NOMAD",
        "name": "Nomad",
        "russianName": "Номад"
      },
      {
        "id": "SSANG_YONG_REXTON",
        "name": "Rexton",
        "russianName": "Рекстон"
      },
      {
        "id": "SSANG_YONG_REXTON_SPORTS",
        "name": "Rexton Sports",
        "russianName": "Рекстон Спортс"
      },
      {
        "id": "SSANG_YONG_RODIUS",
        "name": "Rodius",
        "russianName": "Родиус"
      },
      {
        "id": "SSANG_YONG_STAVIC",
        "name": "Stavic",
        "russianName": "Ставик"
      },
      {
        "id": "SSANG_YONG_TIVOLI",
        "name": "Tivoli",
        "russianName": "Тиволи"
      },
      {
        "id": "SSANG_YONG_TIVOLI_XLV",
        "name": "XLV",
        "russianName": "ХЛВ"
      },
      {
        "id": "SSANG_YONG_TORRES",
        "name": "Torres",
        "russianName": "Торрес"
      }
    ]
  },
  "STELATO": {
    "id": "STELATO",
    "name": "Stelato",
    "russianName": "стелато",
    "models": [
      {
        "id": "STELATO_S9",
        "name": "S9",
        "russianName": "с9"
      }
    ]
  },
  "STEYR": {
    "id": "STEYR",
    "name": "Steyr",
    "russianName": "Штайр",
    "models": [
      {
        "id": "STEYR_1500",
        "name": "1500",
        "russianName": "1500"
      },
      {
        "id": "STEYR_HAFLINGER",
        "name": "Haflinger",
        "russianName": "Хафлингер"
      }
    ]
  },
  "STUDEBAKER": {
    "id": "STUDEBAKER",
    "name": "Studebaker",
    "russianName": "Студебейкер",
    "models": [
      {
        "id": "STUDEBAKER_GOLDEN_HAWK",
        "name": "Golden Hawk",
        "russianName": "Голден Хоук"
      }
    ]
  },
  "SUBARU": {
    "id": "SUBARU",
    "name": "סובaru",
    "russianName": "Субару",
    "models": [
      {
        "id": "SUBARU_1000",
        "name": "1000",
        "russianName": "1000"
      },
      {
        "id": "SUBARU_360",
        "name": "360",
        "russianName": "360"
      },
      {
        "id": "SUBARU_ALCYONE",
        "name": "Alcyone",
        "russianName": "Альциона"
      },
      {
        "id": "SUBARU_ASCENT",
        "name": "Ascent",
        "russianName": "асцент"
      },
      {
        "id": "SUBARU_B9_TRIBECA",
        "name": "Tribeca",
        "russianName": "Трибека"
      },
      {
        "id": "SUBARU_BAJA",
        "name": "Baja",
        "russianName": "Байя"
      },
      {
        "id": "SUBARU_BIGHORN",
        "name": "Bighorn",
        "russianName": "бигхорн"
      },
      {
        "id": "SUBARU_BISTRO",
        "name": "Bistro",
        "russianName": "бистро"
      },
      {
        "id": "SUBARU_BRAT",
        "name": "Brat",
        "russianName": "брат"
      },
      {
        "id": "SUBARU_BRZ",
        "name": "BRZ",
        "russianName": "BRZ"
      },
      {
        "id": "SUBARU_CHIFFON",
        "name": "Chiffon",
        "russianName": "Чиффон"
      },
      {
        "id": "SUBARU_CROSSTREK",
        "name": "Crosstrek",
        "russianName": "Кросстрек"
      },
      {
        "id": "SUBARU_DEX",
        "name": "Dex",
        "russianName": "Декс"
      },
      {
        "id": "SUBARU_DIAS_WAGON",
        "name": "Dias Wagon",
        "russianName": "диас вагон"
      },
      {
        "id": "SUBARU_DOMINGO",
        "name": "Domingo",
        "russianName": "Доминго"
      },
      {
        "id": "SUBARU_EXIGA",
        "name": "Exiga",
        "russianName": "Эксига"
      },
      {
        "id": "SUBARU_FORESTER",
        "name": "Forester",
        "russianName": "Форестер"
      },
      {
        "id": "SUBARU_IMPREZA",
        "name": "Impreza",
        "russianName": "Импреза"
      },
      {
        "id": "SUBARU_IMPREZA_WRX",
        "name": "Impreza WRX",
        "russianName": "Импреза WRX"
      },
      {
        "id": "SUBARU_IMPREZA_WRX_STI",
        "name": "Impreza WRX STi",
        "russianName": "импреза врх сти"
      },
      {
        "id": "SUBARU_JUSTY",
        "name": "Justy",
        "russianName": "Джасти"
      },
      {
        "id": "SUBARU_LEGACY",
        "name": "Legacy",
        "russianName": "Легаси"
      },
      {
        "id": "SUBARU_LEGACY_LANCASTER",
        "name": "Legacy Lancaster",
        "russianName": "Легаси Ланкастер"
      },
      {
        "id": "SUBARU_LEONE",
        "name": "Leone",
        "russianName": "Леон"
      },
      {
        "id": "SUBARU_LEVORG",
        "name": "Levorg",
        "russianName": "Леворг"
      },
      {
        "id": "SUBARU_LIBERO",
        "name": "Libero",
        "russianName": "Либеро"
      },
      {
        "id": "SUBARU_LUCRA",
        "name": "Lucra",
        "russianName": "Лукра"
      },
      {
        "id": "SUBARU_OUTBACK",
        "name": "Outback",
        "russianName": "Аутбек"
      },
      {
        "id": "SUBARU_PLEO",
        "name": "Pleo",
        "russianName": "Плео"
      },
      {
        "id": "SUBARU_PLEO_PLUS",
        "name": "Pleo Plus",
        "russianName": "Плео Плюс"
      },
      {
        "id": "SUBARU_R1",
        "name": "R1",
        "russianName": "R1"
      },
      {
        "id": "SUBARU_R2",
        "name": "R2",
        "russianName": "R2"
      },
      {
        "id": "SUBARU_REX",
        "name": "Rex",
        "russianName": "REX"
      },
      {
        "id": "SUBARU_SAMBAR",
        "name": "Sambar",
        "russianName": "Самбар"
      },
      {
        "id": "SUBARU_SOLTERRA",
        "name": "Solterra",
        "russianName": "Солтерра"
      },
      {
        "id": "SUBARU_STELLA",
        "name": "Stella",
        "russianName": "Стелла"
      },
      {
        "id": "SUBARU_SVX",
        "name": "SVX",
        "russianName": "SVX"
      },
      {
        "id": "SUBARU_TRAILSEEKER",
        "name": "Trailseeker",
        "russianName": "Трейлсикер"
      },
      {
        "id": "SUBARU_TRAVIQ",
        "name": "Traviq",
        "russianName": "Трэвик"
      },
      {
        "id": "SUBARU_TREZIA",
        "name": "Trezia",
        "russianName": "Трэзия"
      },
      {
        "id": "SUBARU_UNCHARTED",
        "name": "Uncharted",
        "russianName": "Анчартед"
      },
      {
        "id": "SUBARU_VIVIO",
        "name": "Vivio",
        "russianName": "Вивио"
      },
      {
        "id": "SUBARU_WRX",
        "name": "WRX",
        "russianName": "WRX"
      },
      {
        "id": "SUBARU_WRX_STI",
        "name": "WRX STi",
        "russianName": "WRX STi"
      },
      {
        "id": "SUBARU_XT",
        "name": "XT",
        "russianName": "XT"
      },
      {
        "id": "SUBARU_XV",
        "name": "XV",
        "russianName": "XV"
      }
    ]
  },
  "SUZUKI": {
    "id": "SUZUKI",
    "name": "סוזוקי",
    "russianName": "Сузуки",
    "models": [
      {
        "id": "SUZUKI_ACROSS",
        "name": "Across",
        "russianName": "Акросс"
      },
      {
        "id": "SUZUKI_AERIO",
        "name": "Aerio",
        "russianName": "Аэрио"
      },
      {
        "id": "SUZUKI_ALTO",
        "name": "Alto",
        "russianName": "Альто"
      },
      {
        "id": "SUZUKI_ALTO_LAPIN",
        "name": "Alto Lapin",
        "russianName": "альто лапин"
      },
      {
        "id": "SUZUKI_APV",
        "name": "APV",
        "russianName": "АПВ"
      },
      {
        "id": "SUZUKI_BALENO",
        "name": "Baleno",
        "russianName": "Балено"
      },
      {
        "id": "SUZUKI_BEIDOUXING",
        "name": "Beidouxing",
        "russianName": "Бейдусинг"
      },
      {
        "id": "SUZUKI_CAPPUCCINO",
        "name": "Cappuccino",
        "russianName": "Каппучино"
      },
      {
        "id": "SUZUKI_CARA",
        "name": "Cara",
        "russianName": "кара"
      },
      {
        "id": "SUZUKI_CARRY",
        "name": "Carry",
        "russianName": "карри"
      },
      {
        "id": "SUZUKI_CELERIO",
        "name": "Celerio",
        "russianName": "Целерио"
      },
      {
        "id": "SUZUKI_CERVO_CLASSIC",
        "name": "Cervo",
        "russianName": "Серво"
      },
      {
        "id": "SUZUKI_CIAZ",
        "name": "Ciaz",
        "russianName": "Циаз"
      },
      {
        "id": "SUZUKI_CULTUS",
        "name": "Cultus",
        "russianName": "Культус"
      },
      {
        "id": "SUZUKI_DZIRE",
        "name": "DZire",
        "russianName": "ДЗайр"
      },
      {
        "id": "SUZUKI_EECO",
        "name": "Eeco",
        "russianName": "Ееко"
      },
      {
        "id": "SUZUKI_EQUATOR",
        "name": "Equator",
        "russianName": "Экватор"
      },
      {
        "id": "SUZUKI_ERTIGA",
        "name": "Ertiga",
        "russianName": "Эртига"
      },
      {
        "id": "SUZUKI_ESCUDO",
        "name": "Escudo",
        "russianName": "Эскудо"
      },
      {
        "id": "SUZUKI_ESTEEM",
        "name": "Esteem",
        "russianName": "эстим"
      },
      {
        "id": "SUZUKI_EVERY",
        "name": "Every",
        "russianName": "Эвери"
      },
      {
        "id": "SUZUKI_E_VITARA",
        "name": "e Vitara",
        "russianName": "е Витара"
      },
      {
        "id": "SUZUKI_FORENZA",
        "name": "Forenza",
        "russianName": "форенза"
      },
      {
        "id": "SUZUKI_FRONTE",
        "name": "Fronte",
        "russianName": "Фронт"
      },
      {
        "id": "SUZUKI_FRONX",
        "name": "Fronx",
        "russianName": "Фронкс"
      },
      {
        "id": "SUZUKI_GRAND_VITARA",
        "name": "Grand Vitara",
        "russianName": "Гранд Витара"
      },
      {
        "id": "SUZUKI_HUSTLER",
        "name": "Hustler",
        "russianName": "Хастлер"
      },
      {
        "id": "SUZUKI_IGNIS",
        "name": "Ignis",
        "russianName": "Игнис"
      },
      {
        "id": "SUZUKI_JIMNY",
        "name": "Jimny",
        "russianName": "Джимни"
      },
      {
        "id": "SUZUKI_KEI",
        "name": "Kei",
        "russianName": "Кей"
      },
      {
        "id": "SUZUKI_KIZASHI",
        "name": "Kizashi",
        "russianName": "Кизаши"
      },
      {
        "id": "SUZUKI_LANDY",
        "name": "Landy",
        "russianName": "Лэнди"
      },
      {
        "id": "SUZUKI_LIANA",
        "name": "Liana",
        "russianName": "Лиана"
      },
      {
        "id": "SUZUKI_MR_WAGON",
        "name": "MR Wagon",
        "russianName": "Мр Вагон"
      },
      {
        "id": "SUZUKI_PALETTE",
        "name": "Palette",
        "russianName": "Палетт"
      },
      {
        "id": "SUZUKI_RENO",
        "name": "Reno",
        "russianName": "Рено"
      },
      {
        "id": "SUZUKI_SAMURAI",
        "name": "Samurai",
        "russianName": "Самурай"
      },
      {
        "id": "SUZUKI_SIDEKICK",
        "name": "Sidekick",
        "russianName": "Сайдкик"
      },
      {
        "id": "SUZUKI_SOLIO",
        "name": "Solio",
        "russianName": "Солио"
      },
      {
        "id": "SUZUKI_SPACIA",
        "name": "Spacia",
        "russianName": "Спасиа"
      },
      {
        "id": "SUZUKI_SPLASH",
        "name": "Splash",
        "russianName": "Сплэш"
      },
      {
        "id": "SUZUKI_SWACE",
        "name": "Swace",
        "russianName": "Свайс"
      },
      {
        "id": "SUZUKI_SWIFT",
        "name": "Swift",
        "russianName": "Свифт"
      },
      {
        "id": "SUZUKI_SX4",
        "name": "SX4",
        "russianName": "SX4"
      },
      {
        "id": "SUZUKI_S_PRESSO",
        "name": "S-Presso",
        "russianName": "Эс-Прессо"
      },
      {
        "id": "SUZUKI_TWIN",
        "name": "Twin",
        "russianName": "Твин"
      },
      {
        "id": "SUZUKI_VERONA",
        "name": "Verona",
        "russianName": "Верона"
      },
      {
        "id": "SUZUKI_VICTORIS",
        "name": "Victoris",
        "russianName": "Викторис"
      },
      {
        "id": "SUZUKI_VITARA",
        "name": "Vitara",
        "russianName": "Витара"
      },
      {
        "id": "SUZUKI_WAGON_R",
        "name": "Wagon R",
        "russianName": "Вагон Р"
      },
      {
        "id": "SUZUKI_WAGON_R_PLUS",
        "name": "Wagon R+",
        "russianName": "Вагон Р+"
      },
      {
        "id": "SUZUKI_XBEE",
        "name": "Xbee",
        "russianName": "Иксби"
      },
      {
        "id": "SUZUKI_XL_7",
        "name": "XL7",
        "russianName": "XL7"
      },
      {
        "id": "SUZUKI_X_90",
        "name": "X-90",
        "russianName": "X-90"
      }
    ]
  },
  "SWM": {
    "id": "SWM",
    "name": "SWM",
    "russianName": "СВМ",
    "models": [
      {
        "id": "SWM_G01",
        "name": "G01",
        "russianName": "Г01"
      },
      {
        "id": "SWM_G01F",
        "name": "G01F",
        "russianName": "Г01Ф"
      },
      {
        "id": "SWM_G03F",
        "name": "G03F",
        "russianName": "Г03Ф"
      },
      {
        "id": "SWM_G05",
        "name": "G05",
        "russianName": "Г05"
      },
      {
        "id": "SWM_G05PRO",
        "name": "G05 Pro",
        "russianName": "г05про"
      },
      {
        "id": "SWM_TIGER",
        "name": "Tiger",
        "russianName": "Тайгер"
      },
      {
        "id": "SWM_X3",
        "name": "X3",
        "russianName": "Икс 3"
      },
      {
        "id": "SWM_X30",
        "name": "Shineray X30",
        "russianName": "Шайнрей Икс30"
      },
      {
        "id": "SWM_X7",
        "name": "X7",
        "russianName": "Икс7"
      }
    ]
  },
  "TAGAZ": {
    "id": "TAGAZ",
    "name": "ТагАЗ",
    "russianName": "ТагАЗ",
    "models": [
      {
        "id": "TAGAZ_AQUILA",
        "name": "Aquila",
        "russianName": "Аквила"
      },
      {
        "id": "TAGAZ_C10",
        "name": "C10",
        "russianName": "с10"
      },
      {
        "id": "TAGAZ_C190",
        "name": "C190",
        "russianName": "с190"
      },
      {
        "id": "TAGAZ_C30",
        "name": "C-30",
        "russianName": "с-30"
      },
      {
        "id": "TAGAZ_C_100",
        "name": "Vega",
        "russianName": "Вега"
      },
      {
        "id": "TAGAZ_ROAD_PARTNER",
        "name": "Road Partner",
        "russianName": "Роуд Партнер"
      },
      {
        "id": "TAGAZ_TAGER",
        "name": "Tager",
        "russianName": "Тагер"
      }
    ]
  },
  "TALBOT": {
    "id": "TALBOT",
    "name": "Talbot",
    "russianName": "Толбет",
    "models": [
      {
        "id": "TALBOT_1510",
        "name": "1510",
        "russianName": "1510"
      },
      {
        "id": "TALBOT_AVENGER",
        "name": "Avenger",
        "russianName": "Эвенджер"
      },
      {
        "id": "TALBOT_HORIZON",
        "name": "Horizon",
        "russianName": "Горизон"
      },
      {
        "id": "TALBOT_RANCHO",
        "name": "Rancho",
        "russianName": "ранчо"
      },
      {
        "id": "TALBOT_SAMBA",
        "name": "Samba",
        "russianName": "Самба"
      },
      {
        "id": "TALBOT_SOLARA",
        "name": "Solara",
        "russianName": "Солара"
      },
      {
        "id": "TALBOT_TAGORA",
        "name": "Tagora",
        "russianName": "Тагора"
      }
    ]
  },
  "TANK": {
    "id": "TANK",
    "name": "Tank",
    "russianName": "Танк",
    "models": [
      {
        "id": "TANK_300",
        "name": "300",
        "russianName": "300"
      },
      {
        "id": "TANK_400",
        "name": "400",
        "russianName": "400"
      },
      {
        "id": "TANK_500",
        "name": "500",
        "russianName": "500"
      },
      {
        "id": "TANK_700",
        "name": "700",
        "russianName": "700"
      }
    ]
  },
  "TATA": {
    "id": "TATA",
    "name": "Tata",
    "russianName": "ТАТА",
    "models": [
      {
        "id": "TATA_ARIA",
        "name": "Aria",
        "russianName": "Ария"
      },
      {
        "id": "TATA_CURVV",
        "name": "Curvv",
        "russianName": "Курвв"
      },
      {
        "id": "TATA_ESTATE",
        "name": "Estate",
        "russianName": "Эстейт"
      },
      {
        "id": "TATA_INDICA",
        "name": "Indica",
        "russianName": "Индика"
      },
      {
        "id": "TATA_INDIGO",
        "name": "Indigo",
        "russianName": "Индиго"
      },
      {
        "id": "TATA_NANO",
        "name": "Nano",
        "russianName": "Нано"
      },
      {
        "id": "TATA_SAFARI",
        "name": "Safari",
        "russianName": "Сафари"
      },
      {
        "id": "TATA_SIERRA",
        "name": "Sierra",
        "russianName": "Сьерра"
      },
      {
        "id": "TATA_SUMO",
        "name": "Sumo",
        "russianName": "Сумо"
      },
      {
        "id": "TATA_SUMO_GRANDE",
        "name": "Sumo Grande",
        "russianName": "сумо гранде"
      },
      {
        "id": "TATA_TELCOLINE",
        "name": "Telcoline",
        "russianName": "Тэлколайн"
      },
      {
        "id": "TATA_XENON",
        "name": "Xenon",
        "russianName": "Ксенон"
      }
    ]
  },
  "TATRA": {
    "id": "TATRA",
    "name": "Tatra",
    "russianName": "Татра",
    "models": [
      {
        "id": "TATRA_57",
        "name": "57",
        "russianName": "57"
      },
      {
        "id": "TATRA_77",
        "name": "77",
        "russianName": "77"
      },
      {
        "id": "TATRA_80",
        "name": "80",
        "russianName": "80"
      },
      {
        "id": "TATRA_87",
        "name": "87",
        "russianName": "87"
      },
      {
        "id": "TATRA_T600",
        "name": "T600",
        "russianName": "т600"
      },
      {
        "id": "TATRA_T603",
        "name": "T603",
        "russianName": "т603"
      },
      {
        "id": "TATRA_T613",
        "name": "T613",
        "russianName": "т613"
      },
      {
        "id": "TATRA_T700",
        "name": "T700",
        "russianName": "т700"
      }
    ]
  },
  "TAZZARI": {
    "id": "TAZZARI",
    "name": "Tazzari",
    "russianName": "Таззари",
    "models": [
      {
        "id": "TAZZARI_ZERO",
        "name": "Zero",
        "russianName": "зеро"
      }
    ]
  },
  "TENET": {
    "id": "TENET",
    "name": "Tenet",
    "russianName": "Тенет",
    "models": [
      {
        "id": "TENET_T4",
        "name": "T4",
        "russianName": "Т4"
      },
      {
        "id": "TENET_T7",
        "name": "T7",
        "russianName": "Т7"
      },
      {
        "id": "TENET_T8",
        "name": "T8",
        "russianName": "Т8"
      }
    ]
  },
  "TESLA": {
    "id": "TESLA",
    "name": "טסלה",
    "russianName": "Тесла",
    "models": [
      {
        "id": "TESLA_CYBERTRUCK",
        "name": "Cybertruck",
        "russianName": "Кибертрак"
      },
      {
        "id": "TESLA_MODEL_3",
        "name": "Model 3",
        "russianName": "Модел 3"
      },
      {
        "id": "TESLA_MODEL_S",
        "name": "Model S",
        "russianName": "Модел C"
      },
      {
        "id": "TESLA_MODEL_X",
        "name": "Model X",
        "russianName": "Модел Х"
      },
      {
        "id": "TESLA_MODEL_Y",
        "name": "Model Y",
        "russianName": "Модел Y"
      },
      {
        "id": "TESLA_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "THAIRUNG": {
    "id": "THAIRUNG",
    "name": "Thairung",
    "russianName": "Тайрунг",
    "models": [
      {
        "id": "THAIRUNG_TRANSFORMER",
        "name": "Transformer",
        "russianName": "Трансформер"
      }
    ]
  },
  "THINK": {
    "id": "THINK",
    "name": "Think",
    "russianName": "Синк",
    "models": [
      {
        "id": "THINK_CITY",
        "name": "City",
        "russianName": "Сити"
      }
    ]
  },
  "TIANMA": {
    "id": "TIANMA",
    "name": "Tianma",
    "russianName": "Тианма",
    "models": [
      {
        "id": "TIANMA_CENTURY",
        "name": "Century",
        "russianName": "Сенчури"
      },
      {
        "id": "TIANMA_DRAGON",
        "name": "Dragon",
        "russianName": "Дрэгон"
      }
    ]
  },
  "TIANYE": {
    "id": "TIANYE",
    "name": "Tianye",
    "russianName": "Тианье",
    "models": [
      {
        "id": "TIANYE_ADMIRAL",
        "name": "Admiral",
        "russianName": "адмирал"
      }
    ]
  },
  "TOFAS": {
    "id": "TOFAS",
    "name": "Tofas",
    "russianName": "Тофаш",
    "models": [
      {
        "id": "TOFAS_KARTAL",
        "name": "Kartal",
        "russianName": "Картал"
      },
      {
        "id": "TOFAS_MURAT_124",
        "name": "Murat 124",
        "russianName": "Мурат 124"
      },
      {
        "id": "TOFAS_MURAT_131",
        "name": "Murat 131",
        "russianName": "Мурат 131"
      },
      {
        "id": "TOFAS_SAHIN",
        "name": "Sahin",
        "russianName": "сахин"
      },
      {
        "id": "TOFAS_SERCE",
        "name": "Serce",
        "russianName": "серсе"
      }
    ]
  },
  "TOYOTA": {
    "id": "TOYOTA",
    "name": "טויוטה",
    "russianName": "Тойота",
    "models": [
      {
        "id": "TOYOTA_2000GT",
        "name": "2000GT",
        "russianName": "2000гт"
      },
      {
        "id": "TOYOTA_4RUNNER",
        "name": "4Runner",
        "russianName": "Фораннер"
      },
      {
        "id": "TOYOTA_AGYA",
        "name": "Agya",
        "russianName": "Агия"
      },
      {
        "id": "TOYOTA_ALLEX",
        "name": "Allex",
        "russianName": "Аллекс"
      },
      {
        "id": "TOYOTA_ALLION",
        "name": "Allion",
        "russianName": "Аллион"
      },
      {
        "id": "TOYOTA_ALPHARD",
        "name": "Alphard",
        "russianName": "Альфард"
      },
      {
        "id": "TOYOTA_ALTEZZA",
        "name": "Altezza",
        "russianName": "Альтеза"
      },
      {
        "id": "TOYOTA_AQUA",
        "name": "Aqua",
        "russianName": "Аква"
      },
      {
        "id": "TOYOTA_ARISTO",
        "name": "Aristo",
        "russianName": "Аристо"
      },
      {
        "id": "TOYOTA_AURION",
        "name": "Aurion",
        "russianName": "Аурион"
      },
      {
        "id": "TOYOTA_AURIS",
        "name": "Auris",
        "russianName": "Аурис"
      },
      {
        "id": "TOYOTA_AVALON",
        "name": "Avalon",
        "russianName": "Авалон"
      },
      {
        "id": "TOYOTA_AVANZA",
        "name": "Avanza",
        "russianName": "аванза"
      },
      {
        "id": "TOYOTA_AVENSIS",
        "name": "Avensis",
        "russianName": "Авенсис"
      },
      {
        "id": "TOYOTA_AVENSIS_VERSO",
        "name": "Avensis Verso",
        "russianName": "Авенсис Версо"
      },
      {
        "id": "TOYOTA_AYGO",
        "name": "Aygo",
        "russianName": "Айго"
      },
      {
        "id": "TOYOTA_AYGO_X",
        "name": "Aygo X",
        "russianName": "Айго Икс"
      },
      {
        "id": "TOYOTA_BB",
        "name": "bB",
        "russianName": "bB"
      },
      {
        "id": "TOYOTA_BELTA",
        "name": "Belta",
        "russianName": "Бельта"
      },
      {
        "id": "TOYOTA_BLADE",
        "name": "Blade",
        "russianName": "Блейд"
      },
      {
        "id": "TOYOTA_BLIZZARD",
        "name": "Blizzard",
        "russianName": "Близзард"
      },
      {
        "id": "TOYOTA_BREVIS",
        "name": "Brevis",
        "russianName": "Бревис"
      },
      {
        "id": "TOYOTA_BZ",
        "name": "bZ",
        "russianName": "БЗ"
      },
      {
        "id": "TOYOTA_BZ3",
        "name": "bZ3",
        "russianName": "бЗ3"
      },
      {
        "id": "TOYOTA_BZ3C",
        "name": "bZ3C",
        "russianName": "БЗ3С"
      },
      {
        "id": "TOYOTA_BZ3X",
        "name": "bZ3X",
        "russianName": "бЗ3Х"
      },
      {
        "id": "TOYOTA_BZ4X",
        "name": "bZ4X",
        "russianName": "бЗ4Х"
      },
      {
        "id": "TOYOTA_BZ5",
        "name": "bZ5",
        "russianName": "бЗ5"
      },
      {
        "id": "TOYOTA_BZ7",
        "name": "bZ7",
        "russianName": "БЗ7"
      },
      {
        "id": "TOYOTA_CALDINA",
        "name": "Caldina",
        "russianName": "Калдина"
      },
      {
        "id": "TOYOTA_CAMI",
        "name": "Cami",
        "russianName": "Ками"
      },
      {
        "id": "TOYOTA_CAMRY",
        "name": "Camry",
        "russianName": "Камри"
      },
      {
        "id": "TOYOTA_CAMRY_SOLARA",
        "name": "Camry Solara",
        "russianName": "Камри Соляра"
      },
      {
        "id": "TOYOTA_CARINA",
        "name": "Carina",
        "russianName": "Карина"
      },
      {
        "id": "TOYOTA_CARINA_E",
        "name": "Carina E",
        "russianName": "Карина Е"
      },
      {
        "id": "TOYOTA_CARINA_ED",
        "name": "Carina ED",
        "russianName": "Карина ED"
      },
      {
        "id": "TOYOTA_CAVALIER",
        "name": "Cavalier",
        "russianName": "Кавалер"
      },
      {
        "id": "TOYOTA_CELICA",
        "name": "Celica",
        "russianName": "Селика"
      },
      {
        "id": "TOYOTA_CELSIOR",
        "name": "Celsior",
        "russianName": "Целсиор"
      },
      {
        "id": "TOYOTA_CENTURY",
        "name": "Century",
        "russianName": "Сентури"
      },
      {
        "id": "TOYOTA_CHASER",
        "name": "Chaser",
        "russianName": "Чайзер"
      },
      {
        "id": "TOYOTA_CLASSIC",
        "name": "Classic",
        "russianName": "Классик"
      },
      {
        "id": "TOYOTA_COMFORT",
        "name": "Comfort",
        "russianName": "комфорт"
      },
      {
        "id": "TOYOTA_COMS",
        "name": "COMS",
        "russianName": "КОМС"
      },
      {
        "id": "TOYOTA_COPEN",
        "name": "Copen",
        "russianName": "Копен"
      },
      {
        "id": "TOYOTA_COROLLA",
        "name": "Corolla",
        "russianName": "Королла"
      },
      {
        "id": "TOYOTA_COROLLA_CROSS",
        "name": "Corolla Cross",
        "russianName": "Королла Кросс"
      },
      {
        "id": "TOYOTA_COROLLA_II",
        "name": "Corolla II",
        "russianName": "королла 2"
      },
      {
        "id": "TOYOTA_COROLLA_LEVIN",
        "name": "Corolla Levin",
        "russianName": "Королла Левин"
      },
      {
        "id": "TOYOTA_COROLLA_RUMION",
        "name": "Corolla Rumion",
        "russianName": "Королла Румион"
      },
      {
        "id": "TOYOTA_COROLLA_SPACIO",
        "name": "Corolla Spacio",
        "russianName": "Королла Спасио"
      },
      {
        "id": "TOYOTA_COROLLA_VERSO",
        "name": "Corolla Verso",
        "russianName": "Королла Версо"
      },
      {
        "id": "TOYOTA_CORONA",
        "name": "Corona",
        "russianName": "Корона"
      },
      {
        "id": "TOYOTA_CORONA_EXIV",
        "name": "Corona EXiV",
        "russianName": "корона эксив"
      },
      {
        "id": "TOYOTA_CORSA",
        "name": "Corsa",
        "russianName": "Корса"
      },
      {
        "id": "TOYOTA_CRESSIDA",
        "name": "Cressida",
        "russianName": "Крессида"
      },
      {
        "id": "TOYOTA_CRESTA",
        "name": "Cresta",
        "russianName": "Креста"
      },
      {
        "id": "TOYOTA_CROWN",
        "name": "Crown",
        "russianName": "Краун"
      },
      {
        "id": "TOYOTA_CROWN_KLUGER",
        "name": "Crown Kluger",
        "russianName": "Краун Клагер"
      },
      {
        "id": "TOYOTA_CROWN_MAJESTA",
        "name": "Crown Majesta",
        "russianName": "Краун Маджеста"
      },
      {
        "id": "TOYOTA_CURREN",
        "name": "Curren",
        "russianName": "Каррен"
      },
      {
        "id": "TOYOTA_CYNOS",
        "name": "Cynos",
        "russianName": "Цинос"
      },
      {
        "id": "TOYOTA_C_HR",
        "name": "C-HR",
        "russianName": "C-HR"
      },
      {
        "id": "TOYOTA_C_HR_PLUS",
        "name": "C-HR+",
        "russianName": "Си Эйч Ар Плюс"
      },
      {
        "id": "TOYOTA_DUET",
        "name": "Duet",
        "russianName": "Дуэт"
      },
      {
        "id": "TOYOTA_ECHO",
        "name": "Echo",
        "russianName": "Эхо"
      },
      {
        "id": "TOYOTA_ESQUIRE",
        "name": "Esquire",
        "russianName": "эсквайр"
      },
      {
        "id": "TOYOTA_ESTIMA",
        "name": "Estima",
        "russianName": "Эстима"
      },
      {
        "id": "TOYOTA_ETIOS",
        "name": "Etios",
        "russianName": "этиос"
      },
      {
        "id": "TOYOTA_FJ_CRUISER",
        "name": "FJ Cruiser",
        "russianName": "ФДжи Крузер"
      },
      {
        "id": "TOYOTA_FORTUNER",
        "name": "Fortuner",
        "russianName": "Фортунер"
      },
      {
        "id": "TOYOTA_FRONTLANDER",
        "name": "Frontlander",
        "russianName": "Фронтлендер"
      },
      {
        "id": "TOYOTA_FUNCARGO",
        "name": "FunCargo",
        "russianName": "Фанкарго"
      },
      {
        "id": "TOYOTA_GAIA",
        "name": "Gaia",
        "russianName": "Гайя"
      },
      {
        "id": "TOYOTA_GR86",
        "name": "GR86",
        "russianName": "ГР86"
      },
      {
        "id": "TOYOTA_GRAND_HIACE",
        "name": "Grand HiAce",
        "russianName": "гранд хайс"
      },
      {
        "id": "TOYOTA_GRAND_HIGHLANDER",
        "name": "Grand Highlander",
        "russianName": "Гранд Хайлендер"
      },
      {
        "id": "TOYOTA_GRANVIA",
        "name": "Granvia",
        "russianName": "Гранвиа"
      },
      {
        "id": "TOYOTA_GT86",
        "name": "GT86",
        "russianName": "GT86"
      },
      {
        "id": "TOYOTA_HARRIER",
        "name": "Harrier",
        "russianName": "Харриер"
      },
      {
        "id": "TOYOTA_HIACE",
        "name": "HiAce",
        "russianName": "Хайс"
      },
      {
        "id": "TOYOTA_HIGHLANDER",
        "name": "Highlander",
        "russianName": "Хайлендер"
      },
      {
        "id": "TOYOTA_HILUX",
        "name": "Hilux",
        "russianName": "Хайлюкс"
      },
      {
        "id": "TOYOTA_HILUX_SURF",
        "name": "Hilux Surf",
        "russianName": "Хайлюкс Сурф"
      },
      {
        "id": "TOYOTA_INNOVA",
        "name": "Innova",
        "russianName": "Иннова"
      },
      {
        "id": "TOYOTA_IPSUM",
        "name": "Ipsum",
        "russianName": "Ипсум"
      },
      {
        "id": "TOYOTA_IQ",
        "name": "iQ",
        "russianName": "iQ"
      },
      {
        "id": "TOYOTA_ISIS",
        "name": "ISis",
        "russianName": "ISis"
      },
      {
        "id": "TOYOTA_IST",
        "name": "Ist",
        "russianName": "Ист"
      },
      {
        "id": "TOYOTA_IZOA",
        "name": "Izoa",
        "russianName": "Изоа"
      },
      {
        "id": "TOYOTA_KLUGER",
        "name": "Kluger",
        "russianName": "Клюгер"
      },
      {
        "id": "TOYOTA_LAND_CRUISER",
        "name": "Land Cruiser",
        "russianName": "Ленд Крузер"
      },
      {
        "id": "TOYOTA_LAND_CRUISER_FJ",
        "name": "Land Cruiser FJ",
        "russianName": "Ленд Крузер ФДжи"
      },
      {
        "id": "TOYOTA_LAND_CRUISER_PRADO",
        "name": "Land Cruiser Prado",
        "russianName": "Ленд Крузер Прадо"
      },
      {
        "id": "TOYOTA_LEVIN",
        "name": "Levin",
        "russianName": "Левин"
      },
      {
        "id": "TOYOTA_LITE_ACE",
        "name": "Lite Ace",
        "russianName": "ЛайтЭйс"
      },
      {
        "id": "TOYOTA_MARK_II",
        "name": "Mark II",
        "russianName": "Марк 2"
      },
      {
        "id": "TOYOTA_MARK_X",
        "name": "Mark X",
        "russianName": "Марк X"
      },
      {
        "id": "TOYOTA_MARK_X_ZIO",
        "name": "Mark X ZiO",
        "russianName": "Марк X ZiO"
      },
      {
        "id": "TOYOTA_MASTER_ACE_SURF",
        "name": "MasterAce Surf",
        "russianName": "мастер айс сурф"
      },
      {
        "id": "TOYOTA_MATRIX",
        "name": "Matrix",
        "russianName": "Матрикс"
      },
      {
        "id": "TOYOTA_MEGA_CRUISER",
        "name": "Mega Cruiser",
        "russianName": "Мега Крузер"
      },
      {
        "id": "TOYOTA_MIRAI",
        "name": "Mirai",
        "russianName": "Мирай"
      },
      {
        "id": "TOYOTA_MODEL_F",
        "name": "Model F",
        "russianName": "модель ф"
      },
      {
        "id": "TOYOTA_MR2",
        "name": "MR2",
        "russianName": "МР 2"
      },
      {
        "id": "TOYOTA_MR_S",
        "name": "MR-S",
        "russianName": "МР-С"
      },
      {
        "id": "TOYOTA_NADIA",
        "name": "Nadia",
        "russianName": "Надя"
      },
      {
        "id": "TOYOTA_NOAH",
        "name": "Noah",
        "russianName": "Ноа"
      },
      {
        "id": "TOYOTA_OPA",
        "name": "Opa",
        "russianName": "Опа"
      },
      {
        "id": "TOYOTA_ORIGIN",
        "name": "Origin",
        "russianName": "Ориджин"
      },
      {
        "id": "TOYOTA_PASEO",
        "name": "Paseo",
        "russianName": "Пасео"
      },
      {
        "id": "TOYOTA_PASSO",
        "name": "Passo",
        "russianName": "Пассо"
      },
      {
        "id": "TOYOTA_PASSO_SETTE",
        "name": "Passo Sette",
        "russianName": "Пассо Сетте"
      },
      {
        "id": "TOYOTA_PICNIC",
        "name": "Picnic",
        "russianName": "Пикник"
      },
      {
        "id": "TOYOTA_PIXIS_EPOCH",
        "name": "Pixis Epoch",
        "russianName": "Пиксис Эпоч"
      },
      {
        "id": "TOYOTA_PIXIS_JOY",
        "name": "Pixis Joy",
        "russianName": "Пиксис Джой"
      },
      {
        "id": "TOYOTA_PIXIS_MEGA",
        "name": "Pixis Mega",
        "russianName": "Пиксис Мега"
      },
      {
        "id": "TOYOTA_PIXIS_SPACE",
        "name": "Pixis Space",
        "russianName": "Пиксис Спэйс"
      },
      {
        "id": "TOYOTA_PIXIS_VAN",
        "name": "Pixis Van",
        "russianName": "Пиксис Ван"
      },
      {
        "id": "TOYOTA_PLATZ",
        "name": "Platz",
        "russianName": "Платз"
      },
      {
        "id": "TOYOTA_PORTE",
        "name": "Porte",
        "russianName": "Порте"
      },
      {
        "id": "TOYOTA_PREMIO",
        "name": "Premio",
        "russianName": "Премио"
      },
      {
        "id": "TOYOTA_PREVIA",
        "name": "Previa",
        "russianName": "Превиа"
      },
      {
        "id": "TOYOTA_PRIUS",
        "name": "Prius",
        "russianName": "Приус"
      },
      {
        "id": "TOYOTA_PRIUSPLUS",
        "name": "Prius v (+)",
        "russianName": "Приус V (+)"
      },
      {
        "id": "TOYOTA_PRIUS_ALPHA",
        "name": "Prius Alpha",
        "russianName": "Приус Альфа"
      },
      {
        "id": "TOYOTA_PRIUS_C",
        "name": "Prius c",
        "russianName": "Приус си"
      },
      {
        "id": "TOYOTA_PROACE",
        "name": "ProAce",
        "russianName": "ПроЭйс"
      },
      {
        "id": "TOYOTA_PROACE_CITY",
        "name": "ProAce City",
        "russianName": "ПроЭйс Сити"
      },
      {
        "id": "TOYOTA_PROBOX",
        "name": "Probox",
        "russianName": "Пробокс"
      },
      {
        "id": "TOYOTA_PROGRES",
        "name": "Progres",
        "russianName": "Прогрес"
      },
      {
        "id": "TOYOTA_PRONARD",
        "name": "Pronard",
        "russianName": "Пронард"
      },
      {
        "id": "TOYOTA_PUBLICA",
        "name": "Publica",
        "russianName": "публика"
      },
      {
        "id": "TOYOTA_RACTIS",
        "name": "Ractis",
        "russianName": "Рактис"
      },
      {
        "id": "TOYOTA_RAIZE",
        "name": "Raize",
        "russianName": "Райз"
      },
      {
        "id": "TOYOTA_RAUM",
        "name": "Raum",
        "russianName": "Раум"
      },
      {
        "id": "TOYOTA_RAV_4",
        "name": "RAV4",
        "russianName": "Рав4"
      },
      {
        "id": "TOYOTA_REGIUS",
        "name": "Regius",
        "russianName": "Региус"
      },
      {
        "id": "TOYOTA_REGIUSACE",
        "name": "RegiusAce",
        "russianName": "Региус Эйс"
      },
      {
        "id": "TOYOTA_ROOMY",
        "name": "Roomy",
        "russianName": "Руми"
      },
      {
        "id": "TOYOTA_RUSH",
        "name": "Rush",
        "russianName": "Раш"
      },
      {
        "id": "TOYOTA_SAI",
        "name": "Sai",
        "russianName": "сай"
      },
      {
        "id": "TOYOTA_SCEPTER_SEDAN",
        "name": "Scepter",
        "russianName": "Сцептер"
      },
      {
        "id": "TOYOTA_SEQUOIA",
        "name": "Sequoia",
        "russianName": "Секвойя"
      },
      {
        "id": "TOYOTA_SERA",
        "name": "Sera",
        "russianName": "Сера"
      },
      {
        "id": "TOYOTA_SIENNA",
        "name": "Sienna",
        "russianName": "Сиенна"
      },
      {
        "id": "TOYOTA_SIENTA",
        "name": "Sienta",
        "russianName": "Сиента"
      },
      {
        "id": "TOYOTA_SOARER",
        "name": "Soarer",
        "russianName": "Соарер"
      },
      {
        "id": "TOYOTA_SOLUNA",
        "name": "Soluna",
        "russianName": "Солуна"
      },
      {
        "id": "TOYOTA_SPADE",
        "name": "Spade",
        "russianName": "Спейд"
      },
      {
        "id": "TOYOTA_SPARKY",
        "name": "Sparky",
        "russianName": "Спарки"
      },
      {
        "id": "TOYOTA_SPORTS_800",
        "name": "Sports 800",
        "russianName": "Спортс 800"
      },
      {
        "id": "TOYOTA_SPRINTER",
        "name": "Sprinter",
        "russianName": "Спринтер"
      },
      {
        "id": "TOYOTA_SPRINTER_CARIB",
        "name": "Sprinter Carib",
        "russianName": "Спринтер Кариб"
      },
      {
        "id": "TOYOTA_SPRINTER_MARINO",
        "name": "Sprinter Marino",
        "russianName": "Спринтер Марино"
      },
      {
        "id": "TOYOTA_SPRINTER_TRUENO",
        "name": "Sprinter Trueno",
        "russianName": "Спринтер Труэно"
      },
      {
        "id": "TOYOTA_STARLET",
        "name": "Starlet",
        "russianName": "Старлет"
      },
      {
        "id": "TOYOTA_STARLET_CROSS",
        "name": "Starlet Cross",
        "russianName": "Старлет Кросс"
      },
      {
        "id": "TOYOTA_SUCCEED",
        "name": "Succeed",
        "russianName": "Саксид"
      },
      {
        "id": "TOYOTA_SUPRA",
        "name": "Supra",
        "russianName": "Супра"
      },
      {
        "id": "TOYOTA_TACOMA",
        "name": "Tacoma",
        "russianName": "Такома"
      },
      {
        "id": "TOYOTA_TANK",
        "name": "Tank",
        "russianName": "Танк"
      },
      {
        "id": "TOYOTA_TERCEL",
        "name": "Tercel",
        "russianName": "Терсел"
      },
      {
        "id": "TOYOTA_TOURING_HIACE",
        "name": "Touring HiAce",
        "russianName": "Туринг Хайэс"
      },
      {
        "id": "TOYOTA_TOWN_ACE",
        "name": "Town Ace",
        "russianName": "Таун Эйс"
      },
      {
        "id": "TOYOTA_TUNDRA",
        "name": "Tundra",
        "russianName": "Тундра"
      },
      {
        "id": "TOYOTA_URBAN_CRUISER",
        "name": "Urban Cruiser",
        "russianName": "Урбан Крузер"
      },
      {
        "id": "TOYOTA_URBAN_CRUISER_TAISOR",
        "name": "Urban Cruiser Taisor",
        "russianName": "Урбан Крузер Тэйсор"
      },
      {
        "id": "TOYOTA_VANGUARD",
        "name": "Vanguard",
        "russianName": "Вангуард"
      },
      {
        "id": "TOYOTA_VELLFIRE",
        "name": "Vellfire",
        "russianName": "Веллфайр"
      },
      {
        "id": "TOYOTA_VELOZ",
        "name": "Veloz",
        "russianName": "Велоз"
      },
      {
        "id": "TOYOTA_VENZA",
        "name": "Venza",
        "russianName": "Венза"
      },
      {
        "id": "TOYOTA_VEROSSA",
        "name": "Verossa",
        "russianName": "Веросса"
      },
      {
        "id": "TOYOTA_VERSO",
        "name": "Verso",
        "russianName": "Версо"
      },
      {
        "id": "TOYOTA_VERSO_S",
        "name": "Verso-S",
        "russianName": "Версо-С"
      },
      {
        "id": "TOYOTA_VIOS",
        "name": "Vios",
        "russianName": "Виос"
      },
      {
        "id": "TOYOTA_VISTA",
        "name": "Vista",
        "russianName": "Виста"
      },
      {
        "id": "TOYOTA_VITZ",
        "name": "Vitz",
        "russianName": "Витц"
      },
      {
        "id": "TOYOTA_VOLTZ",
        "name": "Voltz",
        "russianName": "Вольтз"
      },
      {
        "id": "TOYOTA_VOXY",
        "name": "Voxy",
        "russianName": "Вокси"
      },
      {
        "id": "TOYOTA_WIGO",
        "name": "Wigo",
        "russianName": "Виго"
      },
      {
        "id": "TOYOTA_WILDLANDER",
        "name": "Wildlander",
        "russianName": "Вайлдлендер"
      },
      {
        "id": "TOYOTA_WILL",
        "name": "WiLL",
        "russianName": "Вилл"
      },
      {
        "id": "TOYOTA_WILL_CYPHA",
        "name": "WiLL Cypha",
        "russianName": "вилл сифа"
      },
      {
        "id": "TOYOTA_WINDOM",
        "name": "Windom",
        "russianName": "Виндом"
      },
      {
        "id": "TOYOTA_WISH",
        "name": "Wish",
        "russianName": "Виш"
      },
      {
        "id": "TOYOTA_XA",
        "name": "xA",
        "russianName": "ха"
      },
      {
        "id": "TOYOTA_YARIS",
        "name": "Yaris",
        "russianName": "Ярис"
      },
      {
        "id": "TOYOTA_YARIS_CROSS",
        "name": "Yaris Cross",
        "russianName": "Ярис Кросс"
      },
      {
        "id": "TOYOTA_YARIS_VERSO",
        "name": "Yaris Verso",
        "russianName": "Ярис Версо"
      },
      {
        "id": "TOYOTA_ZELAS",
        "name": "Zelas",
        "russianName": "Зелас"
      }
    ]
  },
  "TRABANT": {
    "id": "TRABANT",
    "name": "Trabant",
    "russianName": "Трабант",
    "models": [
      {
        "id": "TRABANT_1_1",
        "name": "1.1",
        "russianName": "1.1"
      },
      {
        "id": "TRABANT_600",
        "name": "600",
        "russianName": "600"
      },
      {
        "id": "TRABANT_601",
        "name": "P 601",
        "russianName": "П 601"
      },
      {
        "id": "TRABANT_P50",
        "name": "P50",
        "russianName": "п50"
      }
    ]
  },
  "TRAMONTANA": {
    "id": "TRAMONTANA",
    "name": "Tramontana",
    "russianName": "Трамонтана",
    "models": [
      {
        "id": "TRAMONTANA_TRAMONTANA",
        "name": "Tramontana",
        "russianName": "Трамонтана"
      }
    ]
  },
  "TRIUMPH": {
    "id": "TRIUMPH",
    "name": "Triumph",
    "russianName": "Триумф",
    "models": [
      {
        "id": "TRIUMPH_ACCLAIM",
        "name": "Acclaim",
        "russianName": "Акклейм"
      },
      {
        "id": "TRIUMPH_GT6",
        "name": "GT6",
        "russianName": "гт6"
      },
      {
        "id": "TRIUMPH_SPITFIRE",
        "name": "Spitfire",
        "russianName": "Спитфайр"
      },
      {
        "id": "TRIUMPH_STAG",
        "name": "Stag",
        "russianName": "стаг"
      },
      {
        "id": "TRIUMPH_TR3",
        "name": "TR3",
        "russianName": "тр3"
      },
      {
        "id": "TRIUMPH_TR4",
        "name": "TR4",
        "russianName": "тр4"
      },
      {
        "id": "TRIUMPH_TR6",
        "name": "TR6",
        "russianName": "тр6"
      },
      {
        "id": "TRIUMPH_TR7",
        "name": "TR7",
        "russianName": "тр7"
      },
      {
        "id": "TRIUMPH_TR8",
        "name": "TR8",
        "russianName": "тр8"
      }
    ]
  },
  "TRUMPCHI": {
    "id": "TRUMPCHI",
    "name": "GAC Trumpchi",
    "russianName": "Трампчи",
    "models": [
      {
        "id": "TRUMPCHI_E8",
        "name": "E8",
        "russianName": "е8"
      },
      {
        "id": "TRUMPCHI_E9",
        "name": "E9",
        "russianName": "Е9"
      },
      {
        "id": "TRUMPCHI_EMKOO",
        "name": "Emkoo",
        "russianName": "Эмку"
      },
      {
        "id": "TRUMPCHI_EMPOW",
        "name": "Empow",
        "russianName": "Эмпау"
      },
      {
        "id": "TRUMPCHI_ES9",
        "name": "ES9",
        "russianName": "ЕС9"
      },
      {
        "id": "TRUMPCHI_GA4_PLUS",
        "name": "GA4 Plus",
        "russianName": "ГА4 Плюс"
      },
      {
        "id": "TRUMPCHI_GA6",
        "name": "GA6",
        "russianName": "ГА6"
      },
      {
        "id": "TRUMPCHI_GA8",
        "name": "GA8",
        "russianName": "ГА8"
      },
      {
        "id": "TRUMPCHI_GE3",
        "name": "GE3",
        "russianName": "ГЕ3"
      },
      {
        "id": "TRUMPCHI_GM6",
        "name": "GM6",
        "russianName": "ГМ6"
      },
      {
        "id": "TRUMPCHI_GM8",
        "name": "GM8",
        "russianName": "ГМ8"
      },
      {
        "id": "TRUMPCHI_GS3",
        "name": "GS3",
        "russianName": "ГС3"
      },
      {
        "id": "TRUMPCHI_GS3_POWER",
        "name": "GS3 Power",
        "russianName": "ГС3 Пауэр"
      },
      {
        "id": "TRUMPCHI_GS4",
        "name": "GS4",
        "russianName": "ГС4"
      },
      {
        "id": "TRUMPCHI_GS4_MAX",
        "name": "GS4 Max",
        "russianName": "ГС4 Макс"
      },
      {
        "id": "TRUMPCHI_GS4_PLUS",
        "name": "GS4 Plus",
        "russianName": "ГС4 Плюс"
      },
      {
        "id": "TRUMPCHI_GS5",
        "name": "GS5",
        "russianName": "ГС5"
      },
      {
        "id": "TRUMPCHI_GS8",
        "name": "GS8",
        "russianName": "ГС8"
      },
      {
        "id": "TRUMPCHI_M6",
        "name": "M6",
        "russianName": "М6"
      },
      {
        "id": "TRUMPCHI_M6_MAX",
        "name": "M6 Max",
        "russianName": "М6 Макс"
      },
      {
        "id": "TRUMPCHI_M6_PRO",
        "name": "M6 Pro",
        "russianName": "М6 Про"
      },
      {
        "id": "TRUMPCHI_M8",
        "name": "M8",
        "russianName": "М8"
      },
      {
        "id": "TRUMPCHI_S7",
        "name": "S7",
        "russianName": "С7"
      },
      {
        "id": "TRUMPCHI_S9",
        "name": "S9",
        "russianName": "С9"
      }
    ]
  },
  "TVR": {
    "id": "TVR",
    "name": "TVR",
    "russianName": "ТВР",
    "models": [
      {
        "id": "TVR_280",
        "name": "280",
        "russianName": "280"
      },
      {
        "id": "TVR_350",
        "name": "350",
        "russianName": "350"
      },
      {
        "id": "TVR_390",
        "name": "390",
        "russianName": "390"
      },
      {
        "id": "TVR_400",
        "name": "400",
        "russianName": "400"
      },
      {
        "id": "TVR_420",
        "name": "420",
        "russianName": "420"
      },
      {
        "id": "TVR_450",
        "name": "450",
        "russianName": "450"
      },
      {
        "id": "TVR_CERBERA",
        "name": "Cerbera",
        "russianName": "цербера"
      },
      {
        "id": "TVR_CHIMAERA",
        "name": "Chimaera",
        "russianName": "химера"
      },
      {
        "id": "TVR_GRIFFITH",
        "name": "Griffith",
        "russianName": "гриффит"
      },
      {
        "id": "TVR_SAGARIS",
        "name": "Sagaris",
        "russianName": "сагарис"
      },
      {
        "id": "TVR_S_SERIES",
        "name": "S-Series",
        "russianName": "с-серия"
      },
      {
        "id": "TVR_TAIMAR",
        "name": "Taimar",
        "russianName": "таймар"
      },
      {
        "id": "TVR_TAMORA",
        "name": "Tamora",
        "russianName": "тамора"
      },
      {
        "id": "TVR_TASMIN",
        "name": "Tasmin",
        "russianName": "тасмин"
      },
      {
        "id": "TVR_TUSCAN",
        "name": "Tuscan",
        "russianName": "тускан"
      }
    ]
  },
  "UAZ": {
    "id": "UAZ",
    "name": "УАЗ",
    "russianName": "УАЗ",
    "models": [
      {
        "id": "UAZ_3151",
        "name": "3151",
        "russianName": "3151"
      },
      {
        "id": "UAZ_3153",
        "name": "3153",
        "russianName": "3153"
      },
      {
        "id": "UAZ_3159",
        "name": "3159",
        "russianName": "3159 Барс"
      },
      {
        "id": "UAZ_3160",
        "name": "3160",
        "russianName": "3160"
      },
      {
        "id": "UAZ_3162",
        "name": "3162 Simbir",
        "russianName": "3162 Симбир"
      },
      {
        "id": "UAZ_469",
        "name": "469",
        "russianName": "469"
      },
      {
        "id": "UAZ_ASTERO",
        "name": "Астеро",
        "russianName": "Астеро"
      },
      {
        "id": "UAZ_HUNTER",
        "name": "Hunter",
        "russianName": "Хантер"
      },
      {
        "id": "UAZ_PATRIOT",
        "name": "Patriot",
        "russianName": "Патриот"
      },
      {
        "id": "UAZ_PICKUP",
        "name": "Pickup",
        "russianName": "Пикап"
      }
    ]
  },
  "ULTIMA": {
    "id": "ULTIMA",
    "name": "Ultima",
    "russianName": "Ультима",
    "models": [
      {
        "id": "ULTIMA_CAN_AM",
        "name": "Can-Am",
        "russianName": "Кан-Ам"
      },
      {
        "id": "ULTIMA_GTR",
        "name": "GTR",
        "russianName": "ГТР"
      },
      {
        "id": "ULTIMA_RS",
        "name": "RS",
        "russianName": "РС"
      }
    ]
  },
  "VAUXHALL": {
    "id": "VAUXHALL",
    "name": "Vauxhall",
    "russianName": "Воксхолл",
    "models": [
      {
        "id": "VAUXHALL_ADAM",
        "name": "אדם",
        "russianName": "Адам"
      },
      {
        "id": "VAUXHALL_AMPERA",
        "name": "Ampera",
        "russianName": "Ампера"
      },
      {
        "id": "VAUXHALL_ASTRA",
        "name": "Astra",
        "russianName": "астра"
      },
      {
        "id": "VAUXHALL_CARLTON",
        "name": "Carlton",
        "russianName": "карлтон"
      },
      {
        "id": "VAUXHALL_CAVALIER",
        "name": "Cavalier",
        "russianName": "Кавалер"
      },
      {
        "id": "VAUXHALL_CHEVETTE",
        "name": "Chevette",
        "russianName": "шеветт"
      },
      {
        "id": "VAUXHALL_COMBO",
        "name": "Combo",
        "russianName": "Комбо"
      },
      {
        "id": "VAUXHALL_CORSA",
        "name": "Corsa",
        "russianName": "Корса"
      },
      {
        "id": "VAUXHALL_FIRENZA",
        "name": "Firenza",
        "russianName": "фиренза"
      },
      {
        "id": "VAUXHALL_FRONTERA",
        "name": "Frontera",
        "russianName": "Фронтера"
      },
      {
        "id": "VAUXHALL_INSIGNIA",
        "name": "Insignia",
        "russianName": "Инсигния"
      },
      {
        "id": "VAUXHALL_LOTUS_CARLTON",
        "name": "Lotus Carlton",
        "russianName": "Лотус Карлтон"
      },
      {
        "id": "VAUXHALL_MERIVA",
        "name": "Meriva",
        "russianName": "Мерива"
      },
      {
        "id": "VAUXHALL_MOKKA",
        "name": "Mokka",
        "russianName": "Мокка"
      },
      {
        "id": "VAUXHALL_MONARO",
        "name": "Monaro",
        "russianName": "Монаро"
      },
      {
        "id": "VAUXHALL_OMEGA",
        "name": "Omega",
        "russianName": "омега"
      },
      {
        "id": "VAUXHALL_ROYALE",
        "name": "Royale",
        "russianName": "рояле"
      },
      {
        "id": "VAUXHALL_TIGRA",
        "name": "Tigra",
        "russianName": "Тигра"
      },
      {
        "id": "VAUXHALL_VECTRA",
        "name": "Vectra",
        "russianName": "вектра"
      },
      {
        "id": "VAUXHALL_VELOX",
        "name": "Velox",
        "russianName": "Велокс"
      },
      {
        "id": "VAUXHALL_VENTORA",
        "name": "Ventora",
        "russianName": "вентора"
      },
      {
        "id": "VAUXHALL_VICEROY",
        "name": "Viceroy",
        "russianName": "Вайсрой"
      },
      {
        "id": "VAUXHALL_VICTOR",
        "name": "Victor",
        "russianName": "виктор"
      },
      {
        "id": "VAUXHALL_VIVA",
        "name": "Viva",
        "russianName": "вива"
      },
      {
        "id": "VAUXHALL_VIVARO",
        "name": "Vivaro",
        "russianName": "Виваро"
      },
      {
        "id": "VAUXHALL_VXR8",
        "name": "VXR8",
        "russianName": "вхр8"
      },
      {
        "id": "VAUXHALL_ZAFIRA",
        "name": "Zafira",
        "russianName": "Зафира"
      }
    ]
  },
  "VAZ": {
    "id": "VAZ",
    "name": "Lada (ВАЗ)",
    "russianName": "Лада",
    "models": [
      {
        "id": "VAZ_1111",
        "name": "1111 Ока",
        "russianName": "Ока"
      },
      {
        "id": "VAZ_2101",
        "name": "2101",
        "russianName": "2101"
      },
      {
        "id": "VAZ_2102",
        "name": "2102",
        "russianName": "2102"
      },
      {
        "id": "VAZ_2103",
        "name": "2103",
        "russianName": "2103"
      },
      {
        "id": "VAZ_2104",
        "name": "2104",
        "russianName": "2104"
      },
      {
        "id": "VAZ_2105",
        "name": "2105",
        "russianName": "2105"
      },
      {
        "id": "VAZ_2106",
        "name": "2106",
        "russianName": "2106"
      },
      {
        "id": "VAZ_2107",
        "name": "2107",
        "russianName": "2107"
      },
      {
        "id": "VAZ_2108",
        "name": "2108",
        "russianName": "2108"
      },
      {
        "id": "VAZ_2109",
        "name": "2109",
        "russianName": "2109"
      },
      {
        "id": "VAZ_21099",
        "name": "21099",
        "russianName": "21099"
      },
      {
        "id": "VAZ_2110",
        "name": "2110",
        "russianName": "2110"
      },
      {
        "id": "VAZ_2111",
        "name": "2111",
        "russianName": "2111"
      },
      {
        "id": "VAZ_2112",
        "name": "2112",
        "russianName": "2112"
      },
      {
        "id": "VAZ_2113",
        "name": "2113",
        "russianName": "2113"
      },
      {
        "id": "VAZ_2114",
        "name": "2114",
        "russianName": "2114"
      },
      {
        "id": "VAZ_2115",
        "name": "2115",
        "russianName": "2115"
      },
      {
        "id": "VAZ_2120",
        "name": "2120 Надежда",
        "russianName": "2120 Надежда"
      },
      {
        "id": "VAZ_2121",
        "name": "2121 (4x4)",
        "russianName": "2121 (4x4)"
      },
      {
        "id": "VAZ_2123",
        "name": "2123",
        "russianName": "2123"
      },
      {
        "id": "VAZ_2129",
        "name": "2129",
        "russianName": "2129"
      },
      {
        "id": "VAZ_2131_4X4",
        "name": "2131 (4x4)",
        "russianName": "2131 (4x4)"
      },
      {
        "id": "VAZ_2170",
        "name": "Priora",
        "russianName": "Приора"
      },
      {
        "id": "VAZ_2328",
        "name": "2328",
        "russianName": "2328"
      },
      {
        "id": "VAZ_2329",
        "name": "2329",
        "russianName": "2329"
      },
      {
        "id": "VAZ_AURA",
        "name": "Aura",
        "russianName": "Аура"
      },
      {
        "id": "VAZ_AZIMUT",
        "name": "Azimut",
        "russianName": "Азимут"
      },
      {
        "id": "VAZ_ELLADA",
        "name": "EL Lada",
        "russianName": "Эллада"
      },
      {
        "id": "VAZ_E_LARGUS",
        "name": "e-Largus",
        "russianName": "е-Ларгус"
      },
      {
        "id": "VAZ_GRANTA",
        "name": "Granta",
        "russianName": "Гранта"
      },
      {
        "id": "VAZ_ISKRA",
        "name": "Iskra",
        "russianName": "Искра"
      },
      {
        "id": "VAZ_KALINA",
        "name": "Kalina",
        "russianName": "Калина"
      },
      {
        "id": "VAZ_LARGUS",
        "name": "Largus",
        "russianName": "Ларгус"
      },
      {
        "id": "VAZ_NIVA",
        "name": "Niva",
        "russianName": "Нива"
      },
      {
        "id": "VAZ_NIVA_LEGEND",
        "name": "Niva לגדנד",
        "russianName": "Нива Легенд"
      },
      {
        "id": "VAZ_NIVA_TRAVEL",
        "name": "Niva Travel",
        "russianName": "Нива Тревел"
      },
      {
        "id": "VAZ_REVOLUTION",
        "name": "Revolution",
        "russianName": "Революшин"
      },
      {
        "id": "VAZ_VESTA",
        "name": "Vesta",
        "russianName": "Веста"
      },
      {
        "id": "VAZ_XRAY",
        "name": "XRAY",
        "russianName": "Икс-рэй"
      },
      {
        "id": "VAZ_X_CROSS_5",
        "name": "X-cross 5",
        "russianName": "Икс-кросс 5"
      }
    ]
  },
  "VECTOR": {
    "id": "VECTOR",
    "name": "Vector",
    "russianName": "Вектор",
    "models": [
      {
        "id": "VECTOR_M12",
        "name": "M12",
        "russianName": "м12"
      },
      {
        "id": "VECTOR_W8",
        "name": "W8 Twin Turbo",
        "russianName": "дабл ю 8 твин турбо"
      }
    ]
  },
  "VENTURI": {
    "id": "VENTURI",
    "name": "Venturi",
    "russianName": "Вентури",
    "models": [
      {
        "id": "VENTURI_210",
        "name": "210",
        "russianName": "210"
      },
      {
        "id": "VENTURI_260_LM",
        "name": "260 LM",
        "russianName": "260 лм"
      },
      {
        "id": "VENTURI_300_ATLANTIQUE",
        "name": "300 Atlantique",
        "russianName": "300 атлантик"
      },
      {
        "id": "VENTURI_400_GT",
        "name": "400 GT",
        "russianName": "400 gt"
      }
    ]
  },
  "VENUCIA": {
    "id": "VENUCIA",
    "name": "Venucia",
    "russianName": "Венуция",
    "models": [
      {
        "id": "VENUCIA_D60_PLUS",
        "name": "D60 Plus",
        "russianName": "Д60 Плюс"
      },
      {
        "id": "VENUCIA_VX6",
        "name": "VX6",
        "russianName": "ВХ6"
      },
      {
        "id": "VENUCIA_V_ONLINE",
        "name": "V-Online",
        "russianName": "Ви-Онлайн"
      }
    ]
  },
  "VGV": {
    "id": "VGV",
    "name": "VGV",
    "russianName": "ВГВ",
    "models": [
      {
        "id": "VGV_BOLDEN",
        "name": "Bolden",
        "russianName": "Болден"
      },
      {
        "id": "VGV_U70",
        "name": "U70",
        "russianName": "Ю70"
      },
      {
        "id": "VGV_U70_PRO",
        "name": "U70 Pro",
        "russianName": "Ю70 Про"
      },
      {
        "id": "VGV_U75PLUS",
        "name": "U75 Plus",
        "russianName": "Ю75 Плюс"
      },
      {
        "id": "VGV_VX7",
        "name": "VX7",
        "russianName": "ВХ7"
      }
    ]
  },
  "VINFAST": {
    "id": "VINFAST",
    "name": "VinFast",
    "russianName": "Винфаст",
    "models": [
      {
        "id": "VINFAST_LUX_A",
        "name": "LUX A2.0",
        "russianName": "Люкс А2.0"
      },
      {
        "id": "VINFAST_LUX_SA",
        "name": "LUX SA2.0",
        "russianName": "Люкс СА2.0"
      },
      {
        "id": "VINFAST_VF6",
        "name": "VF6",
        "russianName": "ВФ6"
      },
      {
        "id": "VINFAST_VF7",
        "name": "VF7",
        "russianName": "ВФ7"
      },
      {
        "id": "VINFAST_VF8",
        "name": "VF8",
        "russianName": "ВФ8"
      },
      {
        "id": "VINFAST_VF9",
        "name": "VF9",
        "russianName": "ВФ9"
      }
    ]
  },
  "VOLGA": {
    "id": "VOLGA",
    "name": "Volga",
    "russianName": "Волга",
    "models": [
      {
        "id": "VOLGA_C40",
        "name": "C40",
        "russianName": "Си40"
      },
      {
        "id": "VOLGA_K30",
        "name": "K30",
        "russianName": "К30"
      },
      {
        "id": "VOLGA_K40",
        "name": "K40",
        "russianName": "К40"
      }
    ]
  },
  "VOLKSWAGEN": {
    "id": "VOLKSWAGEN",
    "name": "פולקסווגן",
    "russianName": "Фольксваген",
    "models": [
      {
        "id": "VOLKSWAGEN_181",
        "name": "181",
        "russianName": "181"
      },
      {
        "id": "VOLKSWAGEN_AMAROK",
        "name": "Amarok",
        "russianName": "Амарок"
      },
      {
        "id": "VOLKSWAGEN_ARTEON",
        "name": "Arteon",
        "russianName": "Артеон"
      },
      {
        "id": "VOLKSWAGEN_ARTEON_R",
        "name": "Arteon R",
        "russianName": "Артеон Р"
      },
      {
        "id": "VOLKSWAGEN_ATLAS",
        "name": "Atlas",
        "russianName": "Атлас"
      },
      {
        "id": "VOLKSWAGEN_ATLAS_CROSS_SPORT",
        "name": "Atlas Cross Sport",
        "russianName": "Атлас Кросс Спорт"
      },
      {
        "id": "VOLKSWAGEN_BEETLE",
        "name": "Beetle",
        "russianName": "Битл"
      },
      {
        "id": "VOLKSWAGEN_BORA",
        "name": "Bora",
        "russianName": "Бора"
      },
      {
        "id": "VOLKSWAGEN_CADDY",
        "name": "Caddy",
        "russianName": "Кадди"
      },
      {
        "id": "VOLKSWAGEN_CALIFORNIA",
        "name": "California",
        "russianName": "Калифорния"
      },
      {
        "id": "VOLKSWAGEN_CARAVELLE",
        "name": "Caravelle",
        "russianName": "Каравелла"
      },
      {
        "id": "VOLKSWAGEN_CORRADO",
        "name": "Corrado",
        "russianName": "Коррадо"
      },
      {
        "id": "VOLKSWAGEN_C_TREK",
        "name": "C-Trek",
        "russianName": "Си-Трек"
      },
      {
        "id": "VOLKSWAGEN_DERBY",
        "name": "Derby",
        "russianName": "Дерби"
      },
      {
        "id": "VOLKSWAGEN_EOS",
        "name": "Eos",
        "russianName": "Эос"
      },
      {
        "id": "VOLKSWAGEN_EUROVAN",
        "name": "EuroVan",
        "russianName": "Евровэн"
      },
      {
        "id": "VOLKSWAGEN_FOX",
        "name": "Fox",
        "russianName": "Фокс"
      },
      {
        "id": "VOLKSWAGEN_GOL",
        "name": "Gol",
        "russianName": "гол"
      },
      {
        "id": "VOLKSWAGEN_GOLF",
        "name": "Golf",
        "russianName": "Гольф"
      },
      {
        "id": "VOLKSWAGEN_GOLF_COUNTRY",
        "name": "Golf Country",
        "russianName": "Гольф Кантри"
      },
      {
        "id": "VOLKSWAGEN_GOLF_GTI",
        "name": "Golf GTI",
        "russianName": "Гольф GTI"
      },
      {
        "id": "VOLKSWAGEN_GOLF_PLUS",
        "name": "Golf Plus",
        "russianName": "Гольф Плюс"
      },
      {
        "id": "VOLKSWAGEN_GOLF_R",
        "name": "Golf R",
        "russianName": "Гольф Р"
      },
      {
        "id": "VOLKSWAGEN_GOLF_R32",
        "name": "Golf R32",
        "russianName": "Гольф Р32"
      },
      {
        "id": "VOLKSWAGEN_GOLF_SPORTSVAN",
        "name": "Golf Sportsvan",
        "russianName": "Гольф Спортсвэн"
      },
      {
        "id": "VOLKSWAGEN_ID3",
        "name": "ID.3",
        "russianName": "ид3"
      },
      {
        "id": "VOLKSWAGEN_ID4",
        "name": "ID.4",
        "russianName": "ид4"
      },
      {
        "id": "VOLKSWAGEN_ID5",
        "name": "ID.5",
        "russianName": "Ид5"
      },
      {
        "id": "VOLKSWAGEN_ID6",
        "name": "ID.6",
        "russianName": "Ид6"
      },
      {
        "id": "VOLKSWAGEN_ID7",
        "name": "ID.7",
        "russianName": "ИД7"
      },
      {
        "id": "VOLKSWAGEN_IDBUZZ",
        "name": "ID.Buzz",
        "russianName": "идбузз"
      },
      {
        "id": "VOLKSWAGEN_IDUNYX",
        "name": "ID.Unyx",
        "russianName": "айдиюнэкс"
      },
      {
        "id": "VOLKSWAGEN_IDUNYX_06",
        "name": "ID.Unyx 06",
        "russianName": "айдиюнэкс 06"
      },
      {
        "id": "VOLKSWAGEN_IDUNYX_07",
        "name": "ID.Unyx 07",
        "russianName": "айдиюнэкс 07"
      },
      {
        "id": "VOLKSWAGEN_ILTIS",
        "name": "Iltis",
        "russianName": "Илтис"
      },
      {
        "id": "VOLKSWAGEN_JETTA",
        "name": "Jetta",
        "russianName": "Джетта"
      },
      {
        "id": "VOLKSWAGEN_K70",
        "name": "K70",
        "russianName": "к70"
      },
      {
        "id": "VOLKSWAGEN_KARMANN_GHIA",
        "name": "Karmann-Ghia",
        "russianName": "карманн-гиа"
      },
      {
        "id": "VOLKSWAGEN_LAMANDO",
        "name": "Lamando",
        "russianName": "Ламандо"
      },
      {
        "id": "VOLKSWAGEN_LAVIDA",
        "name": "Lavida",
        "russianName": "Лавида"
      },
      {
        "id": "VOLKSWAGEN_LAVIDA_XR",
        "name": "Lavida XR",
        "russianName": "Лавида ИксР"
      },
      {
        "id": "VOLKSWAGEN_LUPO",
        "name": "Lupo",
        "russianName": "Лупо"
      },
      {
        "id": "VOLKSWAGEN_LUPO_GTI",
        "name": "Lupo GTI",
        "russianName": "лупо гти"
      },
      {
        "id": "VOLKSWAGEN_MAGOTAN",
        "name": "Magotan",
        "russianName": "Маготан"
      },
      {
        "id": "VOLKSWAGEN_MULTIVAN",
        "name": "Multivan",
        "russianName": "Мультивэн"
      },
      {
        "id": "VOLKSWAGEN_PARATI",
        "name": "Parati",
        "russianName": "парати"
      },
      {
        "id": "VOLKSWAGEN_PASSAT",
        "name": "Passat",
        "russianName": "Пассат"
      },
      {
        "id": "VOLKSWAGEN_PASSAT_CC",
        "name": "Passat CC",
        "russianName": "Пассат СС"
      },
      {
        "id": "VOLKSWAGEN_PASSAT_NA",
        "name": "Passat (North America and China)",
        "russianName": "пассат (северная америка и китай)"
      },
      {
        "id": "VOLKSWAGEN_PHAETON",
        "name": "Phaeton",
        "russianName": "Фаетон"
      },
      {
        "id": "VOLKSWAGEN_PHIDEON",
        "name": "Phideon",
        "russianName": "Фидеон"
      },
      {
        "id": "VOLKSWAGEN_POINTER",
        "name": "Pointer",
        "russianName": "Поинтер"
      },
      {
        "id": "VOLKSWAGEN_POLO",
        "name": "Polo",
        "russianName": "Поло"
      },
      {
        "id": "VOLKSWAGEN_POLO_GTI",
        "name": "Polo GTI",
        "russianName": "поло гти"
      },
      {
        "id": "VOLKSWAGEN_POLO_R_WRC",
        "name": "Polo R WRC",
        "russianName": "Polo R WRC"
      },
      {
        "id": "VOLKSWAGEN_QUANTUM",
        "name": "Quantum",
        "russianName": "квантум"
      },
      {
        "id": "VOLKSWAGEN_RABBIT",
        "name": "Rabbit",
        "russianName": "Рэббит"
      },
      {
        "id": "VOLKSWAGEN_ROUTAN",
        "name": "Routan",
        "russianName": "Рутан"
      },
      {
        "id": "VOLKSWAGEN_SAGITAR",
        "name": "Sagitar",
        "russianName": "Сагитар"
      },
      {
        "id": "VOLKSWAGEN_SANTANA",
        "name": "Santana",
        "russianName": "Сантана"
      },
      {
        "id": "VOLKSWAGEN_SCIROCCO",
        "name": "Scirocco",
        "russianName": "Сирокко"
      },
      {
        "id": "VOLKSWAGEN_SCIROCCO_R",
        "name": "Scirocco R",
        "russianName": "Сирокко Р"
      },
      {
        "id": "VOLKSWAGEN_SHARAN",
        "name": "Sharan",
        "russianName": "Шаран"
      },
      {
        "id": "VOLKSWAGEN_SPACEFOX",
        "name": "SpaceFox",
        "russianName": "спейсфокс"
      },
      {
        "id": "VOLKSWAGEN_TACQUA",
        "name": "Tacqua",
        "russianName": "Таква"
      },
      {
        "id": "VOLKSWAGEN_TAIGO",
        "name": "Taigo",
        "russianName": "Тайго"
      },
      {
        "id": "VOLKSWAGEN_TAIGUN",
        "name": "Taigun",
        "russianName": "Тайгун"
      },
      {
        "id": "VOLKSWAGEN_TALAGON",
        "name": "Talagon",
        "russianName": "Талагон"
      },
      {
        "id": "VOLKSWAGEN_TAOS",
        "name": "Taos",
        "russianName": "Таос"
      },
      {
        "id": "VOLKSWAGEN_TARO",
        "name": "Taro",
        "russianName": "Таро"
      },
      {
        "id": "VOLKSWAGEN_TAVENDOR",
        "name": "Tavendor",
        "russianName": "Тавендор"
      },
      {
        "id": "VOLKSWAGEN_TAYRON",
        "name": "Tayron",
        "russianName": "Тайрон"
      },
      {
        "id": "VOLKSWAGEN_TERAMONT",
        "name": "Teramont",
        "russianName": "Терамонт"
      },
      {
        "id": "VOLKSWAGEN_THARU",
        "name": "Tharu",
        "russianName": "Тару"
      },
      {
        "id": "VOLKSWAGEN_THARU_XR",
        "name": "Tharu XR",
        "russianName": "Тару ИксЭр"
      },
      {
        "id": "VOLKSWAGEN_TIGUAN",
        "name": "Tiguan",
        "russianName": "Тигуан"
      },
      {
        "id": "VOLKSWAGEN_TIGUAN_R",
        "name": "Tiguan R",
        "russianName": "Тигуан Р"
      },
      {
        "id": "VOLKSWAGEN_TOUAREG",
        "name": "Touareg",
        "russianName": "Туарег"
      },
      {
        "id": "VOLKSWAGEN_TOUAREG_R",
        "name": "Touareg R",
        "russianName": "Туарег Р"
      },
      {
        "id": "VOLKSWAGEN_TOURAN",
        "name": "Touran",
        "russianName": "Туран"
      },
      {
        "id": "VOLKSWAGEN_TRANSPORTER",
        "name": "Transporter",
        "russianName": "Транспортер"
      },
      {
        "id": "VOLKSWAGEN_TYPE_1",
        "name": "Type 1",
        "russianName": "тайп 1"
      },
      {
        "id": "VOLKSWAGEN_TYPE_166",
        "name": "Type 166",
        "russianName": "Тайп 166"
      },
      {
        "id": "VOLKSWAGEN_TYPE_2",
        "name": "Type 2",
        "russianName": "тайп 2"
      },
      {
        "id": "VOLKSWAGEN_TYPE_3",
        "name": "Type 3",
        "russianName": "тайп 3"
      },
      {
        "id": "VOLKSWAGEN_TYPE_4",
        "name": "Type 4",
        "russianName": "тайп 4"
      },
      {
        "id": "VOLKSWAGEN_TYPE_82",
        "name": "Type 82",
        "russianName": "Тайп 82"
      },
      {
        "id": "VOLKSWAGEN_T_CROSS",
        "name": "T-Cross",
        "russianName": "Т-Кросс"
      },
      {
        "id": "VOLKSWAGEN_T_ROC",
        "name": "T-Roc",
        "russianName": "т-рок"
      },
      {
        "id": "VOLKSWAGEN_T_ROC_R",
        "name": "T-Roc R",
        "russianName": "Т-Рок Р"
      },
      {
        "id": "VOLKSWAGEN_UP",
        "name": "up!",
        "russianName": "Ап"
      },
      {
        "id": "VOLKSWAGEN_VENTO",
        "name": "Vento",
        "russianName": "Венто"
      },
      {
        "id": "VOLKSWAGEN_VILORAN",
        "name": "Viloran",
        "russianName": "Вилоран"
      },
      {
        "id": "VOLKSWAGEN_VOYAGE",
        "name": "Voyage",
        "russianName": "Вояж"
      },
      {
        "id": "VOLKSWAGEN_XL1",
        "name": "XL1",
        "russianName": "хл1"
      }
    ]
  },
  "VOLVO": {
    "id": "VOLVO",
    "name": "וולוו",
    "russianName": "Вольво",
    "models": [
      {
        "id": "VOLVO_120_SERIES",
        "name": "120 Series",
        "russianName": "120 Серия"
      },
      {
        "id": "VOLVO_140",
        "name": "140 Series",
        "russianName": "140 Серия"
      },
      {
        "id": "VOLVO_164",
        "name": "164",
        "russianName": "164"
      },
      {
        "id": "VOLVO_240_SERIES",
        "name": "240 Series",
        "russianName": "240 Серия"
      },
      {
        "id": "VOLVO_260",
        "name": "260 Series",
        "russianName": "260 Серия"
      },
      {
        "id": "VOLVO_300_SERIES",
        "name": "300 Series",
        "russianName": "300 Серия"
      },
      {
        "id": "VOLVO_440",
        "name": "440",
        "russianName": "440"
      },
      {
        "id": "VOLVO_460",
        "name": "460",
        "russianName": "460"
      },
      {
        "id": "VOLVO_480",
        "name": "480",
        "russianName": "480"
      },
      {
        "id": "VOLVO_66",
        "name": "66",
        "russianName": "66"
      },
      {
        "id": "VOLVO_740",
        "name": "740",
        "russianName": "740"
      },
      {
        "id": "VOLVO_760",
        "name": "760",
        "russianName": "760"
      },
      {
        "id": "VOLVO_780",
        "name": "780",
        "russianName": "780"
      },
      {
        "id": "VOLVO_850",
        "name": "850",
        "russianName": "850"
      },
      {
        "id": "VOLVO_940",
        "name": "940",
        "russianName": "940"
      },
      {
        "id": "VOLVO_960",
        "name": "960",
        "russianName": "960"
      },
      {
        "id": "VOLVO_C30",
        "name": "C30",
        "russianName": "C30"
      },
      {
        "id": "VOLVO_C40",
        "name": "C40",
        "russianName": "Си40"
      },
      {
        "id": "VOLVO_C70",
        "name": "C70",
        "russianName": "C70"
      },
      {
        "id": "VOLVO_EC40",
        "name": "EC40",
        "russianName": "ЕЦ40"
      },
      {
        "id": "VOLVO_EM90",
        "name": "EM90",
        "russianName": "ЕМ90"
      },
      {
        "id": "VOLVO_ES90",
        "name": "ES90",
        "russianName": "ЕС90"
      },
      {
        "id": "VOLVO_EX30",
        "name": "EX30",
        "russianName": "ех30"
      },
      {
        "id": "VOLVO_EX30_CROSS_COUNTRY",
        "name": "EX30 Cross Country",
        "russianName": "ех30 Кросс Кантри"
      },
      {
        "id": "VOLVO_EX40",
        "name": "EX40",
        "russianName": "ЕХ40"
      },
      {
        "id": "VOLVO_EX90",
        "name": "EX90",
        "russianName": "ЕХ90"
      },
      {
        "id": "VOLVO_LAPLANDER",
        "name": "Laplander",
        "russianName": "Лаплендер"
      },
      {
        "id": "VOLVO_P1800",
        "name": "P1800",
        "russianName": "Р1800"
      },
      {
        "id": "VOLVO_P1900",
        "name": "P1900",
        "russianName": "п1900"
      },
      {
        "id": "VOLVO_PV444",
        "name": "PV444",
        "russianName": "ПВ444"
      },
      {
        "id": "VOLVO_PV544",
        "name": "PV544",
        "russianName": "ПВ544"
      },
      {
        "id": "VOLVO_S40",
        "name": "S40",
        "russianName": "S40"
      },
      {
        "id": "VOLVO_S60",
        "name": "S60",
        "russianName": "S60"
      },
      {
        "id": "VOLVO_S60_CROSS_COUNTRY",
        "name": "S60 Cross Country",
        "russianName": "C60 Кросс Кантри"
      },
      {
        "id": "VOLVO_S70",
        "name": "S70",
        "russianName": "S70"
      },
      {
        "id": "VOLVO_S80",
        "name": "S80",
        "russianName": "S80"
      },
      {
        "id": "VOLVO_S90",
        "name": "S90",
        "russianName": "S90"
      },
      {
        "id": "VOLVO_V40",
        "name": "V40",
        "russianName": "V40"
      },
      {
        "id": "VOLVO_V40_CC",
        "name": "V40 Cross Country",
        "russianName": "V40 Кросс Кантри"
      },
      {
        "id": "VOLVO_V50",
        "name": "V50",
        "russianName": "V50"
      },
      {
        "id": "VOLVO_V60",
        "name": "V60",
        "russianName": "V60"
      },
      {
        "id": "VOLVO_V60_CROSS_COUNTRY",
        "name": "V60 Cross Country",
        "russianName": "В60 Кросс Кантри"
      },
      {
        "id": "VOLVO_V70",
        "name": "V70",
        "russianName": "V70"
      },
      {
        "id": "VOLVO_V90",
        "name": "V90",
        "russianName": "V90"
      },
      {
        "id": "VOLVO_V90_CROSS_COUNTRY",
        "name": "V90 Cross Country",
        "russianName": "В90 Кросс Кантри"
      },
      {
        "id": "VOLVO_XC40",
        "name": "XC40",
        "russianName": "XC40"
      },
      {
        "id": "VOLVO_XC60",
        "name": "XC60",
        "russianName": "XC60"
      },
      {
        "id": "VOLVO_XC70",
        "name": "XC70",
        "russianName": "XC70"
      },
      {
        "id": "VOLVO_XC90",
        "name": "XC90",
        "russianName": "XC90"
      }
    ]
  },
  "VORTEX": {
    "id": "VORTEX",
    "name": "Vortex",
    "russianName": "Вортекс",
    "models": [
      {
        "id": "VORTEX_CORDA",
        "name": "Corda",
        "russianName": "корда"
      },
      {
        "id": "VORTEX_ESTINA",
        "name": "Estina",
        "russianName": "эстина"
      },
      {
        "id": "VORTEX_TINGO",
        "name": "Tingo",
        "russianName": "Тинго"
      }
    ]
  },
  "VOYAH": {
    "id": "VOYAH",
    "name": "Voyah",
    "russianName": "Воя",
    "models": [
      {
        "id": "VOYAH_COURAGE",
        "name": "Courage",
        "russianName": "Кураж"
      },
      {
        "id": "VOYAH_DREAM",
        "name": "Dream",
        "russianName": "Дрим"
      },
      {
        "id": "VOYAH_FREE",
        "name": "Free",
        "russianName": "Фри"
      },
      {
        "id": "VOYAH_PASSION",
        "name": "Passion",
        "russianName": "Пассион"
      },
      {
        "id": "VOYAH_TAISHAN",
        "name": "Taishan",
        "russianName": "Тайшан"
      }
    ]
  },
  "VUHL": {
    "id": "VUHL",
    "name": "VUHL",
    "russianName": "Вухл",
    "models": [
      {
        "id": "VUHL_05",
        "name": "05",
        "russianName": "05"
      }
    ]
  },
  "WANDERER": {
    "id": "WANDERER",
    "name": "Wanderer",
    "russianName": "Вандерер",
    "models": [
      {
        "id": "WANDERER_W22",
        "name": "W22",
        "russianName": "ДаблЮ22"
      },
      {
        "id": "WANDERER_W23",
        "name": "W23",
        "russianName": "в23"
      },
      {
        "id": "WANDERER_W26",
        "name": "W26",
        "russianName": "В26"
      },
      {
        "id": "WANDERER_W50",
        "name": "W50",
        "russianName": "в50"
      }
    ]
  },
  "WARTBURG": {
    "id": "WARTBURG",
    "name": "Wartburg",
    "russianName": "Вартбург",
    "models": [
      {
        "id": "WARTBURG_1_3",
        "name": "1.3",
        "russianName": "1.3"
      },
      {
        "id": "WARTBURG_353",
        "name": "353",
        "russianName": "353"
      }
    ]
  },
  "WELTMEISTER": {
    "id": "WELTMEISTER",
    "name": "Weltmeister",
    "russianName": "Велтмейстер",
    "models": [
      {
        "id": "WELTMEISTER_E5",
        "name": "E5",
        "russianName": "е5"
      },
      {
        "id": "WELTMEISTER_EX5",
        "name": "EX5",
        "russianName": "Экс 5"
      },
      {
        "id": "WELTMEISTER_EX6_PLUS",
        "name": "EX6 Plus",
        "russianName": "ЕХ6 Плюс"
      },
      {
        "id": "WELTMEISTER_W6",
        "name": "W6",
        "russianName": "В6"
      }
    ]
  },
  "WESTFIELD": {
    "id": "WESTFIELD",
    "name": "Westfield",
    "russianName": "Вестфилд",
    "models": [
      {
        "id": "WESTFIELD_SEIGHT",
        "name": "SEiGHT",
        "russianName": "сейгт"
      },
      {
        "id": "WESTFIELD_SEI_SPORT",
        "name": "SEi & Sport",
        "russianName": "сей и спорт"
      }
    ]
  },
  "WEY": {
    "id": "WEY",
    "name": "Wey",
    "russianName": "Вей",
    "models": [
      {
        "id": "WEY_05",
        "name": "05",
        "russianName": "05"
      },
      {
        "id": "WEY_07",
        "name": "07",
        "russianName": "07"
      },
      {
        "id": "WEY_80",
        "name": "80",
        "russianName": "80"
      },
      {
        "id": "WEY_COFFEE_01",
        "name": "Coffee 01",
        "russianName": "Кофи 01"
      },
      {
        "id": "WEY_GAOSHAN",
        "name": "Gaoshan (High Mountain)",
        "russianName": "Гаошань"
      },
      {
        "id": "WEY_LANSHAN",
        "name": "Lanshan (Blue Mountain)",
        "russianName": "Ланшан"
      },
      {
        "id": "WEY_LATTE",
        "name": "Latte",
        "russianName": "Латте"
      },
      {
        "id": "WEY_MACCHIATO",
        "name": "Macchiato",
        "russianName": "Маккиато"
      },
      {
        "id": "WEY_MOCCA",
        "name": "Mocca",
        "russianName": "Мокка"
      },
      {
        "id": "WEY_VV5",
        "name": "VV5",
        "russianName": "ВВ5"
      },
      {
        "id": "WEY_VV6",
        "name": "VV6",
        "russianName": "ВВ6"
      },
      {
        "id": "WEY_VV7",
        "name": "VV7",
        "russianName": "ВВ7"
      }
    ]
  },
  "WIESMANN": {
    "id": "WIESMANN",
    "name": "Wiesmann",
    "russianName": "Вайсман",
    "models": [
      {
        "id": "WIESMANN_GT",
        "name": "GT",
        "russianName": "гт"
      },
      {
        "id": "WIESMANN_ROADSTER",
        "name": "Roadster",
        "russianName": "Родстер"
      }
    ]
  },
  "WILLIS": {
    "id": "WILLIS",
    "name": "Willys",
    "russianName": "Виллис",
    "models": [
      {
        "id": "WILLIS_CJ",
        "name": "CJ",
        "russianName": "СЖ"
      },
      {
        "id": "WILLIS_JEEPSTER",
        "name": "Jeepster",
        "russianName": "Джипстер"
      },
      {
        "id": "WILLIS_MB",
        "name": "MB",
        "russianName": "МБ"
      },
      {
        "id": "WILLIS_MODEL_20",
        "name": "Knight Model 20",
        "russianName": "кнайт модель 20"
      }
    ]
  },
  "WULING": {
    "id": "WULING",
    "name": "Wuling",
    "russianName": "Вулинг",
    "models": [
      {
        "id": "WULING_AISHANG_A100C",
        "name": "Aishang A100C",
        "russianName": "Айшанг А100С"
      },
      {
        "id": "WULING_BINGUO",
        "name": "Binguo",
        "russianName": "Бингуо"
      },
      {
        "id": "WULING_HONGGUANG",
        "name": "Hongguang",
        "russianName": "Хонгуан"
      },
      {
        "id": "WULING_HONGGUANG_PLUS",
        "name": "Hongguang Plus",
        "russianName": "Хонгуан Плюс"
      },
      {
        "id": "WULING_HONGGUANG_S",
        "name": "Hongguang S",
        "russianName": "Хонгуанг С"
      },
      {
        "id": "WULING_HONGGUANG_V",
        "name": "Hongguang V",
        "russianName": "Хонгуанг В"
      },
      {
        "id": "WULING_JIACHEN",
        "name": "Jiachen",
        "russianName": "Цзячен"
      },
      {
        "id": "WULING_MINI_EV",
        "name": "Mini EV",
        "russianName": "Мини ЕВ"
      },
      {
        "id": "WULING_NANO_EV",
        "name": "Nano EV",
        "russianName": "Нано ЕВ"
      },
      {
        "id": "WULING_STARLIGHT",
        "name": "Starlight",
        "russianName": "Старлайт"
      },
      {
        "id": "WULING_STARLIGHT_S",
        "name": "Starlight S",
        "russianName": "Старлайт С"
      },
      {
        "id": "WULING_STAR_ASTA",
        "name": "Star Asta",
        "russianName": "Стар Аста"
      },
      {
        "id": "WULING_SUNSHINE",
        "name": "Sunshine",
        "russianName": "Саншайн"
      },
      {
        "id": "WULING_VICTORY",
        "name": "Victory",
        "russianName": "Виктори"
      },
      {
        "id": "WULING_XINGCHI",
        "name": "Xingchi",
        "russianName": "Синчи"
      },
      {
        "id": "WULING_ZHIGUAN_EV",
        "name": "Zhiguan EV",
        "russianName": "Жигуан ЕВ"
      }
    ]
  },
  "W_MOTORS": {
    "id": "W_MOTORS",
    "name": "W Motors",
    "russianName": "дабл-ю моторс",
    "models": [
      {
        "id": "W_MOTORS_FENYR_SUPERSPORT",
        "name": "Fenyr Supersport",
        "russianName": "Фенир Суперспорт"
      },
      {
        "id": "W_MOTORS_LYKAN_HYPERSPORT",
        "name": "Lykan Hypersport",
        "russianName": "Ликан Гиперспорт"
      }
    ]
  },
  "XCITE": {
    "id": "XCITE",
    "name": "Xcite",
    "russianName": "Иксайт",
    "models": [
      {
        "id": "XCITE_X_CROSS_7",
        "name": "X-Cross 7",
        "russianName": "Икс-кросс 7"
      },
      {
        "id": "XCITE_X_CROSS_8",
        "name": "X-Cross 8",
        "russianName": "Икс-кросс 8"
      }
    ]
  },
  "XEV": {
    "id": "XEV",
    "name": "XEV",
    "russianName": "Ксев",
    "models": [
      {
        "id": "XEV_YOYO",
        "name": "Yoyo",
        "russianName": "Йойо"
      }
    ]
  },
  "XIAOMI": {
    "id": "XIAOMI",
    "name": "Xiaomi",
    "russianName": "Ксиоми",
    "models": [
      {
        "id": "XIAOMI_SU7",
        "name": "SU7",
        "russianName": "ЭсЮ7"
      },
      {
        "id": "XIAOMI_YU7",
        "name": "YU7",
        "russianName": "Ю7"
      }
    ]
  },
  "XINKAI": {
    "id": "XINKAI",
    "name": "Xin Kai",
    "russianName": "Ксин Кай",
    "models": [
      {
        "id": "XINKAI_PICKUP_X3",
        "name": "Pickup X3",
        "russianName": "Пикап Икс3"
      },
      {
        "id": "XINKAI_SR_V_X3",
        "name": "SR-V X3",
        "russianName": "СР-В Икс-3"
      },
      {
        "id": "XINKAI_SUV_X3",
        "name": "SUV X3",
        "russianName": "СУВ Икс-3"
      }
    ]
  },
  "XPENG": {
    "id": "XPENG",
    "name": "Xpeng",
    "russianName": "Икспенг",
    "models": [
      {
        "id": "XPENG_G3",
        "name": "G3",
        "russianName": "Г3"
      },
      {
        "id": "XPENG_G6",
        "name": "G6",
        "russianName": "Г6"
      },
      {
        "id": "XPENG_G7",
        "name": "G7",
        "russianName": "Г7"
      },
      {
        "id": "XPENG_G9",
        "name": "G9",
        "russianName": "Г9"
      },
      {
        "id": "XPENG_MONA_M03",
        "name": "Mona M03",
        "russianName": "Мона М03"
      },
      {
        "id": "XPENG_P5",
        "name": "P5",
        "russianName": "П5"
      },
      {
        "id": "XPENG_P7",
        "name": "P7",
        "russianName": "П7"
      },
      {
        "id": "XPENG_P7I",
        "name": "P7i",
        "russianName": "П7ай"
      },
      {
        "id": "XPENG_P7PLUS",
        "name": "P7+",
        "russianName": "П7+"
      },
      {
        "id": "XPENG_X9",
        "name": "X9",
        "russianName": "Икс9"
      }
    ]
  },
  "YANDEX_ROVER": {
    "id": "YANDEX_ROVER",
    "name": "Яндекс Ровер",
    "russianName": "Яндекс Ровер",
    "models": [
      {
        "id": "YANDEX_ROVER_R_3",
        "name": "R3",
        "russianName": "Р3"
      }
    ]
  },
  "YEMA": {
    "id": "YEMA",
    "name": "Yema",
    "russianName": "Йема",
    "models": [
      {
        "id": "YEMA_EC30",
        "name": "EC30",
        "russianName": "ЕС30"
      },
      {
        "id": "YEMA_SPICA",
        "name": "Spica",
        "russianName": "Спика"
      },
      {
        "id": "YEMA_T70",
        "name": "T70",
        "russianName": "Т70"
      }
    ]
  },
  "YIPAI": {
    "id": "YIPAI",
    "name": "Yipai",
    "russianName": "Ипай",
    "models": [
      {
        "id": "YIPAI_007",
        "name": "007",
        "russianName": "007"
      },
      {
        "id": "YIPAI_008",
        "name": "008",
        "russianName": "008"
      }
    ]
  },
  "YULON": {
    "id": "YULON",
    "name": "Yulon",
    "russianName": "Юлон",
    "models": [
      {
        "id": "YULON_FEELING",
        "name": "Feeling",
        "russianName": "Филлинг"
      }
    ]
  },
  "ZASTAVA": {
    "id": "ZASTAVA",
    "name": "Zastava",
    "russianName": "Застава",
    "models": [
      {
        "id": "ZASTAVA_10",
        "name": "10",
        "russianName": "10"
      },
      {
        "id": "ZASTAVA_FLORIDA",
        "name": "Florida",
        "russianName": "Флорида"
      },
      {
        "id": "ZASTAVA_SKALA",
        "name": "Skala",
        "russianName": "Скала"
      },
      {
        "id": "ZASTAVA_YUGO",
        "name": "Yugo",
        "russianName": "Юго"
      }
    ]
  },
  "ZAZ": {
    "id": "ZAZ",
    "name": "ЗАЗ",
    "russianName": "ЗАЗ",
    "models": [
      {
        "id": "ZAZ_965",
        "name": "965",
        "russianName": "965"
      },
      {
        "id": "ZAZ_966",
        "name": "966",
        "russianName": "966"
      },
      {
        "id": "ZAZ_968",
        "name": "968",
        "russianName": "968"
      },
      {
        "id": "ZAZ_CHANCE",
        "name": "Chance",
        "russianName": "шанс"
      },
      {
        "id": "ZAZ_DANA",
        "name": "1105 «Дана»",
        "russianName": "1105 Дана"
      },
      {
        "id": "ZAZ_FORZA",
        "name": "Forza",
        "russianName": "форза"
      },
      {
        "id": "ZAZ_SENS",
        "name": "Sens",
        "russianName": "сенс"
      },
      {
        "id": "ZAZ_SLAVUTA",
        "name": "1103 «Славута»",
        "russianName": "1103 Славута"
      },
      {
        "id": "ZAZ_TAVRIA",
        "name": "1102 «Таврия»",
        "russianName": "1102 Таврия"
      },
      {
        "id": "ZAZ_VIDA",
        "name": "Vida",
        "russianName": "Вида"
      },
      {
        "id": "ZAZ_ZAZ_LANOS",
        "name": "Lanos",
        "russianName": "ланос"
      }
    ]
  },
  "ZEEKR": {
    "id": "ZEEKR",
    "name": "Zeekr",
    "russianName": "Зикр",
    "models": [
      {
        "id": "ZEEKR_001",
        "name": "001",
        "russianName": "001"
      },
      {
        "id": "ZEEKR_007",
        "name": "007",
        "russianName": "007"
      },
      {
        "id": "ZEEKR_009",
        "name": "009",
        "russianName": "009"
      },
      {
        "id": "ZEEKR_7X",
        "name": "7X",
        "russianName": "7Х"
      },
      {
        "id": "ZEEKR_9X",
        "name": "9X",
        "russianName": "9Х"
      },
      {
        "id": "ZEEKR_MIX",
        "name": "Mix",
        "russianName": "Микс"
      },
      {
        "id": "ZEEKR_X",
        "name": "X",
        "russianName": "Икс"
      }
    ]
  },
  "ZENOS": {
    "id": "ZENOS",
    "name": "Zenos",
    "russianName": "Зенос",
    "models": [
      {
        "id": "ZENOS_E10",
        "name": "E10",
        "russianName": "Е10"
      }
    ]
  },
  "ZENVO": {
    "id": "ZENVO",
    "name": "Zenvo",
    "russianName": "Зенво",
    "models": [
      {
        "id": "ZENVO_AURORA",
        "name": "Aurora",
        "russianName": "Аврора"
      },
      {
        "id": "ZENVO_ST1",
        "name": "ST1",
        "russianName": "СТ1"
      },
      {
        "id": "ZENVO_TSR_S",
        "name": "TSR-S",
        "russianName": "ТСР-С"
      }
    ]
  },
  "ZHIDO": {
    "id": "ZHIDO",
    "name": "Zhido",
    "russianName": "Циду",
    "models": [
      {
        "id": "ZHIDO_RAINBOW",
        "name": "Rainbow",
        "russianName": "Рейнбоу"
      }
    ]
  },
  "ZIBAR": {
    "id": "ZIBAR",
    "name": "Zibar",
    "russianName": "Зибар",
    "models": [
      {
        "id": "ZIBAR_MK2",
        "name": "MK2",
        "russianName": "мк2"
      }
    ]
  },
  "ZIL": {
    "id": "ZIL",
    "name": "ЗИЛ",
    "russianName": "ЗИЛ",
    "models": [
      {
        "id": "ZIL_111",
        "name": "111",
        "russianName": "111"
      },
      {
        "id": "ZIL_114",
        "name": "114",
        "russianName": "114"
      },
      {
        "id": "ZIL_117",
        "name": "117",
        "russianName": "117"
      },
      {
        "id": "ZIL_4104",
        "name": "4104",
        "russianName": "4104"
      }
    ]
  },
  "ZIS": {
    "id": "ZIS",
    "name": "ЗиС",
    "russianName": "ЗиС",
    "models": [
      {
        "id": "ZIS_101",
        "name": "101",
        "russianName": "101"
      },
      {
        "id": "ZIS_102",
        "name": "102",
        "russianName": "102"
      },
      {
        "id": "ZIS_110",
        "name": "110",
        "russianName": "110"
      }
    ]
  },
  "ZOTYE": {
    "id": "ZOTYE",
    "name": "Zotye",
    "russianName": "Зоти",
    "models": [
      {
        "id": "ZOTYE_COUPA",
        "name": "Coupa",
        "russianName": "Купа"
      },
      {
        "id": "ZOTYE_DOMY_X5",
        "name": "Domy X5",
        "russianName": "Доми Х5"
      },
      {
        "id": "ZOTYE_DOMY_X7",
        "name": "Domy X7",
        "russianName": "Доми Х7"
      },
      {
        "id": "ZOTYE_E200",
        "name": "E200",
        "russianName": "Е200"
      },
      {
        "id": "ZOTYE_NOMAD",
        "name": "Nomad (RX6400)",
        "russianName": "Ноумэд"
      },
      {
        "id": "ZOTYE_SR9",
        "name": "SR9",
        "russianName": "ср9"
      },
      {
        "id": "ZOTYE_T300",
        "name": "T300",
        "russianName": "т300"
      },
      {
        "id": "ZOTYE_T500",
        "name": "T500",
        "russianName": "т500"
      },
      {
        "id": "ZOTYE_T600",
        "name": "T600",
        "russianName": "т600"
      },
      {
        "id": "ZOTYE_T700",
        "name": "T700",
        "russianName": "Т700"
      },
      {
        "id": "ZOTYE_T800",
        "name": "T800",
        "russianName": "Т800"
      },
      {
        "id": "ZOTYE_Z100",
        "name": "Z100",
        "russianName": "З100"
      },
      {
        "id": "ZOTYE_Z300",
        "name": "Z300",
        "russianName": "З300"
      }
    ]
  },
  "ZX": {
    "id": "ZX",
    "name": "ZX",
    "russianName": "ЗХ",
    "models": [
      {
        "id": "ZX_ADMIRAL",
        "name": "Admiral",
        "russianName": "Адмирал"
      },
      {
        "id": "ZX_GRANDLION",
        "name": "Grandlion",
        "russianName": "Грандлайон"
      },
      {
        "id": "ZX_GRAND_TIGER",
        "name": "Grand Tiger",
        "russianName": "Гранд Тайгер"
      },
      {
        "id": "ZX_LANDMARK",
        "name": "Landmark",
        "russianName": "Лендмарк"
      },
      {
        "id": "ZX_TERRALORD",
        "name": "Terralord",
        "russianName": "Терралорд"
      }
    ]
  }
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;

export const vehicleManufacturers: Record<
  VehicleManufacturerId,
  VehicleManufacturer
> = vehicleManufacturersMap;
