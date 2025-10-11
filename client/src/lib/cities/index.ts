import { District, Districts } from "@/lib/cities/types/cities.schema";

export const israelLocations: Record<Districts, District> = {
  [Districts.South]: {
    id: Districts.South,
    name: "Юг",
    description: "Negev region including Be'er Sheva metropolitan area",
    cities: [
      { id: "c1", name: "אופקים", nameRussian: "Офаким" },
      { id: "c2", name: "אילת", nameRussian: "Эйлат" },
      { id: "c3", name: "אשדוד", nameRussian: "Ашдод" },
      { id: "c4", name: "אשקלון", nameRussian: "Ашкелон" },
      { id: "c5", name: "באר שבע", nameRussian: "Беэр-Шева" },
      { id: "c6", name: "דימונה", nameRussian: "Димона" },
      { id: "c7", name: "נתיבות", nameRussian: "Нетивот" },
      { id: "c8", name: "ערד", nameRussian: "Арад" },
      { id: "c9", name: "קריית גת", nameRussian: "Кирьят-Гат" },
      { id: "c10", name: "קריית מלאכי", nameRussian: "Кирьят-Малахи" },
      { id: "c11", name: "רהט", nameRussian: "Рахат" },
      { id: "c12", name: "שדרות", nameRussian: "Сдерот" },
    ],
  },
  [Districts.North]: {
    id: Districts.North,
    name: "Север",
    description: "Galilee region and Golan Heights",
    cities: [
      {
        id: "c12",
        name: "בית שאן",
        nameRussian: "Бейт-Шеан",
      },
      {
        id: "c13",
        name: "טבריה",
        nameRussian: "Тверия",
      },
      {
        id: "c14",
        name: "טמרה",
        nameRussian: "Тамра",
      },
      {
        id: "c15",
        name: "יקנעם עילית",
        nameRussian: "Йокнеам-Илит",
      },
      {
        id: "c16",
        name: "כרמיאל",
        nameRussian: "Кармиэль",
      },
      {
        id: "c17",
        name: "מגדל העמק",
        nameRussian: "Мигдаль-ха-Эмек",
      },
      {
        id: "c18",
        name: "מע'אר",
        nameRussian: "Магар",
      },
      {
        id: "c19",
        name: "מעלות-תרשיחא",
        nameRussian: "Маалот-Таршиха",
      },
      {
        id: "c20",
        name: "נהריה",
        nameRussian: "Нагария",
      },
      {
        id: "c21",
        name: "נוף הגליל",
        nameRussian: "Ноф-ха-Галиль",
      },
      {
        id: "c22",
        name: "נצרת",
        nameRussian: "Назарет",
      },
      {
        id: "c23",
        name: "סח'נין",
        nameRussian: "Сахнин",
      },
      {
        id: "c24",
        name: "עכו",
        nameRussian: "Акко",
      },
      {
        id: "c25",
        name: "עפולה",
        nameRussian: "Афула",
      },
      {
        id: "c26",
        name: "עראבה",
        nameRussian: "Араба",
      },
      {
        id: "c27",
        name: "צפת",
        nameRussian: "Цфат",
      },
      {
        id: "c28",
        name: "קריית שמונה",
        nameRussian: "Кирьят-Шмона",
      },
      {
        id: "c29",
        name: "שפרעם",
        nameRussian: "Шфарам",
      },
    ],
  },
  [Districts.Heifa]: {
    id: Districts.Heifa,
    name: "Хайфа и окрестности",
    description: "Jordan Valley and Dead Sea region",
    cities: [
      {
        id: "c30",
        name: "אום אל-פחם",
        nameRussian: "Умм-эль-Фахм",
      },
      {
        id: "c31",
        name: "אור עקיבא",
        nameRussian: "Ор-Акива",
      },
      {
        id: "c32",
        name: "באקה אל-גרבייה",
        nameRussian: "Бака-эль-Гарбия",
      },
      {
        id: "c33",
        name: "חדרה",
        nameRussian: "Хадера",
      },
      {
        id: "c34",
        name: "חיפה",
        nameRussian: "Хайфа",
      },
      {
        id: "c35",
        name: "טירת כרמל",
        nameRussian: "Тират-Кармель",
      },
      {
        id: "c36",
        name: "כפר קרע",
        nameRussian: "Кфар-Кара",
      },
      {
        id: "c37",
        name: "נשר (עיר)",
        nameRussian: "Нешер",
      },
      {
        id: "c38",
        name: "קריית אתא",
        nameRussian: "Кирьят-Ата",
      },
      {
        id: "c39",
        name: "קריית ביאליק",
        nameRussian: "Кирьят-Бялик",
      },
      {
        id: "c40",
        name: "קריית ים",
        nameRussian: "Кирьят-Ям",
      },
      {
        id: "c41",
        name: "קריית מוצקין",
        nameRussian: "Кирьят-Моцкин",
      },
    ],
  },
  [Districts.Jerusalem]: {
    id: Districts.Jerusalem,
    name: "Иерусалим и окрестности",
    description: "Mediterranean coastal plain",
    cities: [
      {
        id: "c42",
        name: "בית שמש",
        nameRussian: "Бейт-Шемеш",
      },
      {
        id: "c43",
        name: "ירושלים",
        nameRussian: "Иерусалим",
      },
    ],
  },
  [Districts.Center]: {
    id: Districts.Center,
    name: "Центр",
    description: "Greater Tel Aviv metropolitan area and inland region",
    cities: [
      {
        id: "c44",
        name: "אלעד",
        nameRussian: "Эльад",
      },
      {
        id: "c45",
        name: "באר יעקב",
        nameRussian: "Беэр-Яаков",
      },
      {
        id: "c46",
        name: "גבעת שמואל",
        nameRussian: "Гиват-Шмуэль",
      },
      {
        id: "c47",
        name: "גני תקווה",
        nameRussian: "Ганей Тиква",
      },
      {
        id: "c48",
        name: "הוד השרון",
        nameRussian: "Ход-ха-Шарон",
      },
      {
        id: "c49",
        name: "טייבה",
        nameRussian: "Тайбе",
      },
      {
        id: "c50",
        name: "טירה",
        nameRussian: "Тира",
      },
      {
        id: "c51",
        name: "יבנה",
        nameRussian: "Явне",
      },
      {
        id: "c52",
        name: "יהוד-מונוסון",
        nameRussian: "Йехуд-Моноссон",
      },
      {
        id: "c53",
        name: "כפר יונה",
        nameRussian: "Кфар-Йона",
      },
      {
        id: "c54",
        name: "כפר קאסם",
        nameRussian: "Кфар-Касем",
      },
      {
        id: "c55",
        name: "לוד",
        nameRussian: "Лод",
      },
      {
        id: "c56",
        name: "מודיעין-מכבים-רעות",
        nameRussian: "Модиин-Маккабим-Реут",
      },
      {
        id: "c57",
        name: "נס ציונה",
        nameRussian: "Нес-Циона",
      },
      {
        id: "c58",
        name: "נתניה",
        nameRussian: "Нетания",
      },
      {
        id: "c59",
        name: "פתח תקווה",
        nameRussian: "Петах-Тиква",
      },
      {
        id: "c60",
        name: "קלנסווה",
        nameRussian: "Калансуа",
      },
      {
        id: "c61",
        name: "ראשון לציון",
        nameRussian: "Ришон-ле-Цион",
      },
      {
        id: "c62",
        name: "רחובות",
        nameRussian: "Реховот",
      },
      {
        id: "c63",
        name: "רמלה",
        nameRussian: "Рамла",
      },
      {
        id: "c64",
        name: "רעננה",
        nameRussian: "Раанана",
      },
    ],
  },
  [Districts.TelAviv]: {
    id: Districts.TelAviv,
    name: "Тель-Авив и окрестности",
    description: "Greater Tel Aviv metropolitan area and inland region",
    cities: [
      {
        id: "c65",
        name: "אור יהודה",
        nameRussian: "Ор-Иегуда",
      },
      {
        id: "c66",
        name: "בני ברק",
        nameRussian: "Бней-Брак",
      },
      {
        id: "c67",
        name: "בת ים",
        nameRussian: "Бат-Ям",
      },
      {
        id: "c68",
        name: "גבעתיים",
        nameRussian: "Гиватаим",
      },
      {
        id: "c69",
        name: "הרצליה",
        nameRussian: "Герцлия",
      },
      {
        id: "c70",
        name: "חולון",
        nameRussian: "Холон",
      },
      {
        id: "c71",
        name: "קריית אונו",
        nameRussian: "Кирьят-Оно",
      },
      {
        id: "c72",
        name: "רמת גן",
        nameRussian: "Рамат-Ган",
      },
      {
        id: "c73",
        name: "רמת השרון",
        nameRussian: "Рамат-ха-Шарон",
      },
      {
        id: "c74",
        name: "תל אביב-יפו",
        nameRussian: "Тель-Авив-Яффо",
      },
    ],
  },
  [Districts.All]: {
    id: Districts.All,
    name: "Все районы Израиля",
    description: "All regions of Israel",
    cities: [
      { id: "c75", name: "Все города", nameRussian: "Все города" },
    ],
  },
};

export const mapAreasToSelectOptions = () => {
  return Object.entries(israelLocations).map(([id, district]) => ({
    value: id,
    label: district.name,
  }));
};

export const getCitiesToSelectOptions = (districtId: Districts) => {
  return israelLocations[districtId].cities.map((city) => ({
    value: city.id,
    label: city.nameRussian,
  }));
};


// create a helper function to get the city name by id
export const getCityById = (id: string, districtId: Districts) => {
  return israelLocations[districtId].cities.find((city) => city.id === id);
};

// create a helper function to get the district name by id
export const getDistrictById = (id: Districts) => {
  return israelLocations[id];
};  