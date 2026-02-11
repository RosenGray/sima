export const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";
export const ENTITY_TYPE_PROFESSIONAL_SERVICE = "professional-service";
export const ENTITY_TYPE_JOBS = "jobs";
export const ENTITY_TYPE_PETS_ACCESSORIES = "pets-accessories";
export const ENTITY_TYPE_PETS_FOR_FREE = "pets-for-free";
export const ENTITY_TYPE_CARS = "vehicles-cars";
export const ENTITY_TYPE_OFF_ROAD = "vehicles-off-road";
export const ENTITY_TYPE_COMMERCIAL_VEHICLES = "vehicles-commercial";
export const ENTITY_TYPE_MOTORCYCLES = "vehicles-motorcycles";
export const ENTITY_TYPE_SCOOTERS = "vehicles-scooters";
export const ENTITY_TYPE_SPECIAL_VEHICLES = "vehicles-special-vehicles";
export const ENTITY_TYPE_VEHICLES_ACCESSORIES = "vehicles-accessories";

export type EntityType =
  | typeof ENTITY_TYPE_PETS_FOR_SALE
  | typeof ENTITY_TYPE_PROFESSIONAL_SERVICE
  | typeof ENTITY_TYPE_JOBS
  | typeof ENTITY_TYPE_PETS_ACCESSORIES
  | typeof ENTITY_TYPE_PETS_FOR_FREE
  | typeof ENTITY_TYPE_CARS
  | typeof ENTITY_TYPE_OFF_ROAD
  | typeof ENTITY_TYPE_COMMERCIAL_VEHICLES
  | typeof ENTITY_TYPE_MOTORCYCLES
  | typeof ENTITY_TYPE_SCOOTERS
  | typeof ENTITY_TYPE_SPECIAL_VEHICLES
  | typeof ENTITY_TYPE_VEHICLES_ACCESSORIES;
