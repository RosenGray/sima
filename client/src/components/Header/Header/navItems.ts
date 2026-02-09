import { NavigationItems } from "../Header.utils";

export const navItems: NavigationItems = [
  {
    label: "Транспорт",
    type: "dropdown",
    subItems: [
      { label: "Легковые автомобили", href: "/vehicles/cars/" },
      { label: "Внедорожники и джипы", href: "/vehicles/off-road/" },
      {
        label: "Коммерческий транспорт",
        href: "/vehicles/commercial-vehicles/",
      },
      { label: "Мотоциклы", href: "/vehicles/motorcycles/" },
      { label: "Скутеры и мопеды", href: "/vehicles/scooters/" },
      {
        label: "Квадроциклы",
        href: "/vehicles/special-vehicles?category=X4Y5Z6",
      },
      {
        label: "Грузовики",
        href: "/vehicles/special-vehicles?category=L2M3N4",
      },
      {
        label: "Специальные транспортные средства",
        href: "/vehicles/special-vehicles/",
      },
      { label: "Аксессуары и звук", href: "/vehicles/accessories/" },
    ],
  },

  {
    label: "Домашние животные",
    type: "dropdown",
    subItems: [
      { label: "Собаки", href: "/pets/for-sale?animal=dog" },
      { label: "Кошки", href: "/pets/for-sale?animal=cat" },
      { label: "Рыбы", href: "/pets/for-sale?animal=fish" },
      { label: "Птицы", href: "/pets/for-sale?animal=bird" },
      { label: "Хорьки", href: "/pets/for-sale?animal=ferrets" },
      { label: "Грызуны", href: "/pets/for-sale?animal=rodents" },
      {
        label: "Сельскохозяйственные животные",
        href: "/pets/for-sale?animal=farm_animals",
      },
      { label: "Лошади", href: "/pets/for-sale?animal=horses" },
      { label: "Ящерицы и змеи", href: "/pets/for-sale?animal=reptiles" },
      { label: "Аксессуары для животных", href: "/pets/accessories" },
    ],
  },

  {
    label: "Недвижимость",
    type: "dropdown",
    subItems: [
      { label: "Продажа квартир", href: "/real-estate/for-sale/" },
      { label: "Аренда квартир", href: "/real-estate/for-rent/" },
      {
        label: "Аренда и продажа коммерческой недвижимости",
        href: "/real-estate/commercial-real-estate/",
      },
      { label: "Жилая единица", href: "/real-estate/for-rent?propertyKind=9" },
      {
        label: "Туризм,отдых,короткий срок",
        href: "/real-estate/for-rent?propertyKind=6",
      },
      {
        label: "Аренда офисов",
        href: "/real-estate/commercial-real-estate?propertyKind=1&dealKind=1",
      },
      {
        label: "Продажа офисов",
        href: "/real-estate/commercial-real-estate?propertyKind=1&dealKind=2",
      },
      { label: "Все остальные ", href: "/real-estate/for-rent?" },
    ],
  },

  {
    label: "Куплю-Продам",
    type: "dropdown",
    subItems: [
      { label: "Все", href: "/yad2" },
      { label: "Бытовая техника", href: "/yad2?category=44" },
      { label: "Б/у мебель", href: "/yad2?category=45" },
      { label: "Велосипеды", href: "/yad2?category=57" },
      { label: "Мобильные телефоны", href: "/yad2?category=48" },
      { label: "Компьютеры", href: "/yad2?category=49" },
      { label: "Камеры", href: "/yad2?category=63" },
      { label: "Для малышей и детей", href: "/yad2?category=54" },
      { label: "Офисное оборудование", href: "/yad2?category=68" },
      { label: "Спортивный инвентарь", href: "/yad2?category=55" },
      { label: "Садовый инвентарь", href: "/yad2?category=353" },
    ],
  },
  {
    label: "Работа",
    type: "link",
    subItems: [{ label: "Все", href: "/jobs" }],
  },
  {
    label: "Другое",
    type: "link",
    subItems: [{ label: "Все", href: "/other" }],
  },
];
