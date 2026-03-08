import { EntityType } from "@/lib/constants/entityTypes";
import { generateBackblazeUrl } from "@/utils/common";

const THUMBNAIL_MAP: Record<EntityType, string> = {
  "vehicles-cars": "vehicles.png",
  "vehicles-off-road": "vehicles.png",
  "vehicles-commercial": "vehicles.png",
  "vehicles-motorcycles": "vehicles.png",
  "vehicles-scooters": "vehicles.png",
  "vehicles-special-vehicles": "vehicles.png",
  "vehicles-accessories": "vehicles.png",
  "pets-for-sale": "pets.png",
  "pets-for-free": "pets.png",
  "pets-accessories": "pets.png",
  "real-estate-commercial-real-estate": "real-estate.png",
  "real-estate-for-rent": "real-estate.png",
  "real-estate-for-sale": "real-estate.png",
  jobs: "jobs.png",
  other: "other.png",
  yad2: "yad2.png",
  "professional-service": "professional-service.png",
};

export function getSearchThumbnail(entityType: EntityType): string {
  const fileName = THUMBNAIL_MAP[entityType] ?? "other.png";
  return generateBackblazeUrl("public", fileName);
}
