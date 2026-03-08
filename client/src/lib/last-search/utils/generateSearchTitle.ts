import { EntityType } from "@/lib/constants/entityTypes";

const ENTITY_NAMES: Record<EntityType, string> = {
  "vehicles-cars": "Легковые автомобили",
  "vehicles-off-road": "Внедорожники",
  "vehicles-commercial": "Коммерческий транспорт",
  "vehicles-motorcycles": "Мотоциклы",
  "vehicles-scooters": "Скутеры",
  "vehicles-special-vehicles": "Спецтехника",
  "vehicles-accessories": "Автозапчасти",
  "pets-for-sale": "Животные на продажу",
  "pets-for-free": "Животные даром",
  "pets-accessories": "Зоотовары",
  "real-estate-commercial-real-estate": "Коммерческая недвижимость",
  "real-estate-for-rent": "Аренда недвижимости",
  "real-estate-for-sale": "Продажа недвижимости",
  jobs: "Вакансии",
  other: "Разное",
  yad2: "Яд2",
  "professional-service": "Услуги",
};

const PRIORITY_PARAMS: Record<EntityType, string[]> = {
  "vehicles-cars": ["manufacturer", "model", "city", "district"],
  "vehicles-off-road": ["manufacturer", "model", "city", "district"],
  "vehicles-commercial": ["manufacturer", "model", "city", "district"],
  "vehicles-motorcycles": ["manufacturer", "model", "city", "district"],
  "vehicles-scooters": ["manufacturer", "model", "city", "district"],
  "vehicles-special-vehicles": ["manufacturer", "model", "city", "district"],
  "vehicles-accessories": ["manufacturer", "model", "city", "district"],
  "pets-for-sale": ["animal", "kind", "city", "district"],
  "pets-for-free": ["animal", "kind", "city", "district"],
  "pets-accessories": ["animal", "kind", "city", "district"],
  "real-estate-commercial-real-estate": [
    "propertyKind",
    "numberOfRooms",
    "city",
    "district",
  ],
  "real-estate-for-rent": [
    "propertyKind",
    "numberOfRooms",
    "city",
    "district",
  ],
  "real-estate-for-sale": [
    "propertyKind",
    "numberOfRooms",
    "city",
    "district",
  ],
  jobs: ["city", "district"],
  other: ["city", "district"],
  yad2: ["city", "district"],
  "professional-service": ["categoryId", "subCategoryId", "city", "district"],
};

export function generateSearchTitle(
  entityType: EntityType,
  params: URLSearchParams
): string {
  const baseName = ENTITY_NAMES[entityType];
  const priorityKeys = PRIORITY_PARAMS[entityType] ?? [];
  const appended: string[] = [];

  for (const key of priorityKeys) {
    if (appended.length >= 2) break;
    const val = params.get(key);
    if (val && val.trim() !== "") {
      appended.push(val.trim());
    }
  }

  if (appended.length === 0) return baseName;
  return `${baseName} · ${appended.join(" · ")}`;
}
