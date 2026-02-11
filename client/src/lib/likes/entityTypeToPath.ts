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
};

export function getDetailPathForEntityType(entityType: EntityType): string {
  return ENTITY_TYPE_TO_PATH[entityType] ?? "/";
}

export function buildHref(entityType: EntityType, publicId: string): string {
  const base = getDetailPathForEntityType(entityType);
  return `${base}/${publicId}`;
}
