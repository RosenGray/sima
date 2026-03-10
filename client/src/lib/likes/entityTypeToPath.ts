import { EntityType } from "../constants/entityTypes";

export interface LikedAdSummary {
  entityType: EntityType;
  publicId: string;
  href: string;
  thumbnailUrl: string | null;
  title: string;
  description: string;
  price: number | null;
}

/** Summary for "My Ads" list: one row per ad with detail/edit links */
export interface MyAdSummary {
  entityType: EntityType;
  publicId: string;
  href: string;
  thumbnailUrl: string | null;
  title: string;
  status: string;
  createdAt: string;
  sectionLabel: string;
}

const ENTITY_TYPE_TO_PATH: Record<string, string> = {
  "pets-for-sale": "/pets/for-sale",
  "professional-service": "/professional-service",
  jobs: "/jobs",
  "pets-accessories": "/pets/accessories",
  "pets-for-free": "/pets/for-free",
  "vehicles-cars": "/vehicles/cars",
  "vehicles-off-road": "/vehicles/off-road",
  "vehicles-commercial": "/vehicles/commercial-vehicles",
  "vehicles-motorcycles": "/vehicles/motorcycles",
  "vehicles-scooters": "/vehicles/scooters",
  "vehicles-special-vehicles": "/vehicles/special-vehicles",
  "vehicles-accessories": "/vehicles/accessories",
  "real-estate-commercial-real-estate": "/real-estate/commercial-real-estate",
  "real-estate-for-rent": "/real-estate/for-rent",
  "real-estate-for-sale": "/real-estate/for-sale",
  yad2: "/yad2",
  other: "/other",
};

/** Russian section labels for "My Ads" list */
export const ENTITY_TYPE_TO_SECTION_LABEL: Record<string, string> = {
  "pets-for-sale": "Питомцы (продажа)",
  "professional-service": "Услуги",
  jobs: "Вакансии",
  "pets-accessories": "Аксессуары для питомцев",
  "pets-for-free": "Питомцы (в добрые руки)",
  "vehicles-cars": "Автомобили",
  "vehicles-off-road": "Внедорожники",
  "vehicles-commercial": "Коммерческий транспорт",
  "vehicles-motorcycles": "Мотоциклы",
  "vehicles-scooters": "Скутеры",
  "vehicles-special-vehicles": "Спецтехника",
  "vehicles-accessories": "Аксессуары для транспорта",
  "real-estate-commercial-real-estate": "Коммерческая недвижимость",
  "real-estate-for-rent": "Аренда",
  "real-estate-for-sale": "Продажа недвижимости",
  yad2: "Яд2",
  other: "Прочее",
};

export function getDetailPathForEntityType(entityType: EntityType): string {
  return ENTITY_TYPE_TO_PATH[entityType] ?? "/";
}

export function buildHref(entityType: EntityType, publicId: string): string {
  const base = getDetailPathForEntityType(entityType);
  return `${base}/${publicId}`;
}

export function getSectionLabelForEntityType(entityType: EntityType): string {
  return ENTITY_TYPE_TO_SECTION_LABEL[entityType] ?? entityType;
}
