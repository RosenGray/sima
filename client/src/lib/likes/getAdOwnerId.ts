import { EntityType } from "@/lib/constants/entityTypes";
import {
  ENTITY_TYPE_CARS,
  ENTITY_TYPE_COMMERCIAL_REAL_ESTATE,
  ENTITY_TYPE_COMMERCIAL_VEHICLES,
  ENTITY_TYPE_JOBS,
  ENTITY_TYPE_MOTORCYCLES,
  ENTITY_TYPE_OFF_ROAD,
  ENTITY_TYPE_OTHER,
  ENTITY_TYPE_PETS_ACCESSORIES,
  ENTITY_TYPE_PETS_FOR_FREE,
  ENTITY_TYPE_PETS_FOR_SALE,
  ENTITY_TYPE_PROFESSIONAL_SERVICE,
  ENTITY_TYPE_REAL_ESTATE_FOR_RENT,
  ENTITY_TYPE_REAL_ESTATE_FOR_SALE,
  ENTITY_TYPE_SCOOTERS,
  ENTITY_TYPE_SPECIAL_VEHICLES,
  ENTITY_TYPE_VEHICLES_ACCESSORIES,
  ENTITY_TYPE_YAD2,
} from "@/lib/constants/entityTypes";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { othersRepository } from "@/lib/other/repository/OthersRepository";

type EntityWithUser = { user?: { id?: string } | null };

/**
 * Resolve the owner user id for an ad by entity type and public id.
 * Returns null if the ad is not found or has no user.
 * Used when merging guest likes to skip ads owned by the logged-in user.
 */
export async function getAdOwnerId(
  entityType: EntityType,
  publicId: string
): Promise<string | null> {
  try {
    let entity: EntityWithUser | null = null;

    switch (entityType) {
      case ENTITY_TYPE_PETS_FOR_SALE:
        entity = await petForSaleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_PROFESSIONAL_SERVICE:
        entity = await professionalServiceRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_JOBS:
        entity = await jobRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_PETS_ACCESSORIES:
        entity = await petAccessoryRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_PETS_FOR_FREE:
        entity = await petForFreeRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_CARS:
        entity = await carRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_OFF_ROAD:
        entity = await offRoadVehicleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_COMMERCIAL_VEHICLES:
        entity = await commercialVehicleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_MOTORCYCLES:
        entity = await motorcycleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_SCOOTERS:
        entity = await scooterRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_SPECIAL_VEHICLES:
        entity = await specialVehicleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_VEHICLES_ACCESSORIES:
        entity = await accessoryRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_COMMERCIAL_REAL_ESTATE:
        entity = await commercialRealEstateRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_REAL_ESTATE_FOR_RENT:
        entity = await realEstateForRentRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_REAL_ESTATE_FOR_SALE:
        entity = await realEstateForSaleRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_YAD2:
        entity = await yad2ItemRepository.getByPublicId(publicId);
        break;
      case ENTITY_TYPE_OTHER:
        entity = await othersRepository.getByPublicId(publicId);
        break;
      default:
        return null;
    }

    return entity?.user?.id ?? null;
  } catch {
    return null;
  }
}
