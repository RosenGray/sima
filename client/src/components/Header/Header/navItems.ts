import { NavigationItems } from "../Header.utils";

export const navItems: NavigationItems = [
  {
    label: "Транспорт",
    type: "dropdown",
    subItems: [
        { label: "Легковые автомобили", href: "/vehicles/cars/" },
        { label: "Внедорожники и джипы", href: "/vehicles/off-road/" },
        { label: "Коммерческий транспорт", href: "/vehicles/commercial-vehicles/" },
        { label: "Мотоциклы", href: "/vehicles/motorcycles/" },
        { label: "Скутеры и мопеды", href: "/vehicles/scooters/" },
        { label: "Квадроциклы", href: "/vehicles/atv/" },
        { label: "Грузовики", href: "/vehicles/trucks/" },
        { label: "Прицепы", href: "/vehicles/trailers/" },
        { label: "Специальные транспортные средства", href: "/vehicles/special-vehicles/" },
        { label: "Аксессуары и звук", href: "/vehicles/accessories-and-sound/" },
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
      { label: "Сельскохозяйственные животные", href: "/pets/for-sale?animal=farm_animals" },
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
      { label: "Аренда и продажа коммерческой недвижимости", href: "/real-estate/commercial-real-estate/" },
      { label: "Аренда квартир в совместное владение", href: "/real-estate/shared-apartments/" },
      { label: "Аренда квартир на короткий срок", href: "/real-estate/short-term-rentals/" },
      { label: "Аренда офисов", href: "/real-estate/office-rent/" },
      { label: "Продажа офисов", href: "/real-estate/office-sale/" },
      { label: "Аренда магазинов", href: "/real-estate/store-rent/" },
      { label: "Аренда торговых площадей", href: "/real-estate/commercial-vacation/" },
      { label: "Аренда недвижимости за рубежом", href: "/real-estate/foreign-real-estate/" },
    ],
  },
  {
    label: "Куплю-Продам",
    type: "link",
    subItems: [{ label: "Все", href: "/yad2" }],
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

