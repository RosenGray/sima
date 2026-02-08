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
      { label: "Продажа", href: "/pets/for-sale" },
      { label: "Отдам бесплатно", href: "/pets/for-free" },
      { label: "Аксессуары", href: "/pets/accessories" },
    ],
  },
  {
    label: "Недвижимость",
    type: "dropdown",
    subItems: [
      { label: "Продажа", href: "/real-estate/for-sale/" },
      { label: "Аренда", href: "/real-estate/for-rent/" },
      { label: "Коммерческая недвижимость", href: "/real-estate/commercial-real-estate/" },
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
