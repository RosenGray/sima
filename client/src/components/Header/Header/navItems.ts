import { NavigationItems } from "../Header.utils";

export const navItems: NavigationItems = [
  {
    label: "Работа",
    type: "link",
    subItems: [{ label: "Все", href: "/jobs" }],
  },
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
    label: "Другое",
    type: "link",
    subItems: [{ label: "Все", href: "/other" }],
  },
  {
    label: "Недвижимость",
    type: "link",
    subItems: [{ label: "Все", href: "/real-estate" }],
  },
  {
    label: "Куплю-Продаю",
    type: "link",
    subItems: [{ label: "Все", href: "/yad2" }],
  },
];
