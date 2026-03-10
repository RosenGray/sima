import { EntityType } from "@/lib/constants/entityTypes";

const ENTITY_TYPE_TO_EDIT_BASE: Record<string, string> = {
  "pets-for-sale": "/publish-ad/pets/for-sale",
  "professional-service": "/publish-ad/professional-service",
  jobs: "/publish-ad/jobs",
  "pets-accessories": "/publish-ad/pets/accessories",
  "pets-for-free": "/publish-ad/pets/for-free",
  "vehicles-cars": "/publish-ad/vehicles/cars",
  "vehicles-off-road": "/publish-ad/vehicles/off-road",
  "vehicles-commercial": "/publish-ad/vehicles/commercial-vehicles",
  "vehicles-motorcycles": "/publish-ad/vehicles/motorcycles",
  "vehicles-scooters": "/publish-ad/vehicles/scooters",
  "vehicles-special-vehicles": "/publish-ad/vehicles/special-vehicles",
  "vehicles-accessories": "/publish-ad/vehicles/accessories",
  "real-estate-commercial-real-estate":
    "/publish-ad/real-estate/commercial-real-estate",
  "real-estate-for-rent": "/publish-ad/real-estate/for-rent",
  "real-estate-for-sale": "/publish-ad/real-estate/for-sale",
  yad2: "/publish-ad/yad2",
  other: "/publish-ad/other",
};

/**
 * Build edit page URL for an ad by entity type and public id.
 * Used in My Ads list for "Редактировать" link.
 */
export function getEditPathForEntityType(
  entityType: EntityType,
  publicId: string
): string {
  const base = ENTITY_TYPE_TO_EDIT_BASE[entityType] ?? "/publish-ad";
  return `${base}/edit/${publicId}`;
}
