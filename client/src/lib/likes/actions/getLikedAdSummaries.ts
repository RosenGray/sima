"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { getLikedAdIdsByUser } from "@/lib/likes/repository/LikesRepository";
import type { MyAdSummary } from "@/lib/likes/entityTypeToPath";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { othersRepository } from "@/lib/other/repository/OthersRepository";
import {
  carToMyAdSummary,
  offRoadVehicleToMyAdSummary,
  commercialVehicleToMyAdSummary,
  motorcycleToMyAdSummary,
  scooterToMyAdSummary,
  specialVehicleToMyAdSummary,
  vehicleAccessoryToMyAdSummary,
  jobToMyAdSummary,
  professionalServiceToMyAdSummary,
  petForSaleToMyAdSummary,
  petForFreeToMyAdSummary,
  petAccessoryToMyAdSummary,
  realEstateForSaleToMyAdSummary,
  realEstateForRentToMyAdSummary,
  commercialRealEstateToMyAdSummary,
  yad2ItemToMyAdSummary,
  otherToMyAdSummary,
} from "@/lib/my-ads/entityToMyAdSummary";

type Fetcher = (publicId: string) => Promise<MyAdSummary | null>;

const fetchers: Record<string, Fetcher> = {
  "vehicles-cars": async (publicId) => {
    const entity = await carRepository.getByPublicId(publicId);
    return entity ? carToMyAdSummary(entity) : null;
  },
  "vehicles-off-road": async (publicId) => {
    const entity = await offRoadVehicleRepository.getByPublicId(publicId);
    return entity ? offRoadVehicleToMyAdSummary(entity) : null;
  },
  "vehicles-commercial": async (publicId) => {
    const entity = await commercialVehicleRepository.getByPublicId(publicId);
    return entity ? commercialVehicleToMyAdSummary(entity) : null;
  },
  "vehicles-motorcycles": async (publicId) => {
    const entity = await motorcycleRepository.getByPublicId(publicId);
    return entity ? motorcycleToMyAdSummary(entity) : null;
  },
  "vehicles-scooters": async (publicId) => {
    const entity = await scooterRepository.getByPublicId(publicId);
    return entity ? scooterToMyAdSummary(entity) : null;
  },
  "vehicles-special-vehicles": async (publicId) => {
    const entity = await specialVehicleRepository.getByPublicId(publicId);
    return entity ? specialVehicleToMyAdSummary(entity) : null;
  },
  "vehicles-accessories": async (publicId) => {
    const entity = await accessoryRepository.getByPublicId(publicId);
    return entity ? vehicleAccessoryToMyAdSummary(entity) : null;
  },
  jobs: async (publicId) => {
    const entity = await jobRepository.getByPublicId(publicId);
    return entity ? jobToMyAdSummary(entity) : null;
  },
  "professional-service": async (publicId) => {
    const entity = await professionalServiceRepository.getByPublicId(publicId);
    return entity ? professionalServiceToMyAdSummary(entity) : null;
  },
  "pets-for-sale": async (publicId) => {
    const entity = await petForSaleRepository.getByPublicId(publicId);
    return entity ? petForSaleToMyAdSummary(entity) : null;
  },
  "pets-for-free": async (publicId) => {
    const entity = await petForFreeRepository.getByPublicId(publicId);
    return entity ? petForFreeToMyAdSummary(entity) : null;
  },
  "pets-accessories": async (publicId) => {
    const entity = await petAccessoryRepository.getByPublicId(publicId);
    return entity ? petAccessoryToMyAdSummary(entity) : null;
  },
  "real-estate-for-sale": async (publicId) => {
    const entity = await realEstateForSaleRepository.getByPublicId(publicId);
    return entity ? realEstateForSaleToMyAdSummary(entity) : null;
  },
  "real-estate-for-rent": async (publicId) => {
    const entity = await realEstateForRentRepository.getByPublicId(publicId);
    return entity ? realEstateForRentToMyAdSummary(entity) : null;
  },
  "real-estate-commercial-real-estate": async (publicId) => {
    const entity = await commercialRealEstateRepository.getByPublicId(publicId);
    return entity ? commercialRealEstateToMyAdSummary(entity) : null;
  },
  yad2: async (publicId) => {
    const entity = await yad2ItemRepository.getByPublicId(publicId);
    return entity ? yad2ItemToMyAdSummary(entity) : null;
  },
  other: async (publicId) => {
    const entity = await othersRepository.getByPublicId(publicId);
    return entity ? otherToMyAdSummary(entity) : null;
  },
};

export async function getLikedAdSummaries(): Promise<MyAdSummary[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  const likedByType = await getLikedAdIdsByUser(user.id);

  const allPromises = Object.entries(likedByType).flatMap(
    ([entityType, publicIds]) => {
      const fetcher = fetchers[entityType];
      if (!fetcher || !publicIds?.length) return [];
      return publicIds.map((publicId) =>
        fetcher(publicId).catch((err) => {
          console.error(
            `getLikedAdSummaries: failed for ${entityType}/${publicId}`,
            err
          );
          return null;
        })
      );
    }
  );

  const results = await Promise.all(allPromises);

  return (results.filter(Boolean) as MyAdSummary[]).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
