import { Area, AREAS } from "@/types/cities";

export const israelLocations: Area[] = [
    {
      id: AREAS.NORTH,
      name: "Север",
      description: "Galilee region and Golan Heights",
      cities: [
        { id: "c2", name: "Акко" },
        { id: "c7", name: "Афула" },
        { id: "c12", name: "Бейт Джан" },
        { id: "c34", name: "Кармиель" },
        { id: "c36", name: "Кацрин" },
        { id: "c46", name: "Кирьят Шмона" },
        { id: "c59", name: "Нацерет" },
        { id: "c60", name: "Нацрат Илит" },
        { id: "c77", name: "Рош Пина" },
        { id: "c80", name: "Тверия" },
        { id: "c85", name: "Хацор Ха-Глилит" },
        { id: "c89", name: "Цфат" },
        { id: "c100", name: "Тамра" },
        { id: "c101", name: "Шфарам" },
        { id: "c99", name: "Метула" }
      ]
    },
    {
      id: AREAS.SOUTH,
      name: "Юг",
      description: "Negev region including Be'er Sheva metropolitan area",
      cities: [
        { id: "c4", name: "Арад" },
        { id: "c20", name: "Беэр Шева" },
        { id: "c27", name: "Димона" },
        { id: "c29", name: "Йерухам" },
        { id: "c55", name: "Мицпе Рамон" },
        { id: "c62", name: "Нетивот" },
        { id: "c64", name: "Омер" },
        { id: "c67", name: "Офаким" },
        { id: "c94", name: "Эйлат" },
        { id: "c107", name: "Рахат" },
        { id: "c108", name: "Тель Шева" },
        { id: "c109", name: "Лехавим" }
      ]
    },
    {
      id: AREAS.EAST,
      name: "Восток",
      description: "Jordan Valley and Dead Sea region",
      cities: [
        { id: "c13", name: "Бейт Шеан" },
        { id: "c15", name: "Бейт Эль" },
        { id: "c39", name: "Кирьят Арба" },
        { id: "c51", name: "Маале Адумим" },
        { id: "c5", name: "Ариэль" },
        { id: "c35", name: "Карней Шомрон" },
        { id: "c37", name: "Кдумим" },
        { id: "c111", name: "Маале Эфраим" },
        { id: "c112", name: "Альмог" }
      ]
    },
    {
      id: AREAS.WEST,
      name: "Запад",
      description: "Mediterranean coastal plain",
      cities: [
        { id: "c8", name: "Ашдод" },
        { id: "c9", name: "Ашкелон" },
        { id: "c6", name: "Атлит" },
        { id: "c28", name: "Зихрон Яaков" },
        { id: "c58", name: "Натания" },
        { id: "c84", name: "Хайфа" },
        { id: "c86", name: "Хедера" },
        { id: "c63", name: "Нешер" },
        { id: "c47", name: "Кирьят Ям" },
        { id: "c44", name: "Кирьят Моцкин" },
        { id: "c40", name: "Кирьят Ата" },
        { id: "c96", name: "Кирьят Хаим" },
        { id: "c79", name: "Сдерот" },
        { id: "c57", name: "Наария" }
      ]
    },
    {
      id: AREAS.CENTER,
      name: "Центр",
      description: "Greater Tel Aviv metropolitan area and inland region",
      cities: [
        { id: "c1", name: "Азур" },
        { id: "c10", name: "Бат Ям" },
        { id: "c19", name: "Бней Брак" },
        { id: "c14", name: "Бейт Шемеш" },
        { id: "c23", name: "Герцлия" },
        { id: "c24", name: "Гиватаим" },
        { id: "c32", name: "Иерусалим" },
        { id: "c30", name: "Йехуд" },
        { id: "c49", name: "Кфар Саба" },
        { id: "c50", name: "Лод" },
        { id: "c56", name: "Модиин" },
        { id: "c70", name: "Петах Тиква" },
        { id: "c71", name: "Раанана" },
        { id: "c72", name: "Рамат Ган" },
        { id: "c74", name: "Рамла" },
        { id: "c75", name: "Реховот" },
        { id: "c76", name: "Ришон ле Цион" },
        { id: "c81", name: "Тель Авив" },
        { id: "c88", name: "Холон" },
        { id: "c104", name: "Модиин-Маккабим-Реут" },
        { id: "c105", name: "Эльад" },
        { id: "c106", name: "Гиват Шмуэль" }
      ]
    }
  ];

  export const getAreasToSelectOptions = () => {
    return israelLocations.map((area) => ({
      value: area.id,
      label: area.name,
    }));
  };

  export const getCitiesToSelectOptions = () => {
    return israelLocations.flatMap((area) => 
      area.cities.map((city) => ({
        value: city.id,
        label: city.name,
      }))
    );
  };
