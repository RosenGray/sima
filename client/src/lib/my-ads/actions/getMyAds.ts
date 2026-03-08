"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
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
  commercialVehicleToMyAdSummary,
  commercialRealEstateToMyAdSummary,
  jobToMyAdSummary,
  motorcycleToMyAdSummary,
  offRoadVehicleToMyAdSummary,
  otherToMyAdSummary,
  petAccessoryToMyAdSummary,
  petForFreeToMyAdSummary,
  petForSaleToMyAdSummary,
  professionalServiceToMyAdSummary,
  realEstateForRentToMyAdSummary,
  realEstateForSaleToMyAdSummary,
  scooterToMyAdSummary,
  specialVehicleToMyAdSummary,
  vehicleAccessoryToMyAdSummary,
  yad2ItemToMyAdSummary,
} from "../entityToMyAdSummary";

export type MyAdsStatusFilter = "active" | "expired" | "archived" | "all";

/**
 * Fetch all ads for the current user, optionally filtered by status.
 * Aggregates from all entity-type repositories and returns a single list sorted by createdAt desc.
 */
export async function getMyAds(
  statusFilter: MyAdsStatusFilter = "active"
): Promise<MyAdSummary[]> {
  const user = await getCurrentUser();
  if (!user?.id) return [];

  const statusOption: {
    status?: "active" | "expired" | "archived" | "deleted" | "pending" | null;
  } =
    statusFilter === "all"
      ? { status: null }
      : { status: statusFilter };

  const [
    cars,
    offRoad,
    commercialVehicles,
    motorcycles,
    scooters,
    specialVehicles,
    vehicleAccessories,
    jobs,
    professionalServices,
    petsForSale,
    petsForFree,
    petAccessories,
    realEstatesForSale,
    realEstatesForRent,
    commercialRealEstates,
    yad2Items,
    others,
  ] = await Promise.all([
    carRepository.getByUserId(user.id, statusOption),
    offRoadVehicleRepository.getByUserId(user.id, statusOption),
    commercialVehicleRepository.getByUserId(user.id, statusOption),
    motorcycleRepository.getByUserId(user.id, statusOption),
    scooterRepository.getByUserId(user.id, statusOption),
    specialVehicleRepository.getByUserId(user.id, statusOption),
    accessoryRepository.getByUserId(user.id, statusOption),
    jobRepository.getByUserId(user.id, statusOption),
    professionalServiceRepository.getByUserId(user.id, statusOption),
    petForSaleRepository.getByUserId(user.id, statusOption),
    petForFreeRepository.getByUserId(user.id, statusOption),
    petAccessoryRepository.getByUserId(user.id, statusOption),
    realEstateForSaleRepository.getByUserId(user.id, statusOption),
    realEstateForRentRepository.getByUserId(user.id, statusOption),
    commercialRealEstateRepository.getByUserId(user.id, statusOption),
    yad2ItemRepository.getByUserId(user.id, statusOption),
    othersRepository.getByUserId(user.id, statusOption),
  ]);

  const summaries: MyAdSummary[] = [
    ...cars.map(carToMyAdSummary),
    ...offRoad.map(offRoadVehicleToMyAdSummary),
    ...commercialVehicles.map(commercialVehicleToMyAdSummary),
    ...motorcycles.map(motorcycleToMyAdSummary),
    ...scooters.map(scooterToMyAdSummary),
    ...specialVehicles.map(specialVehicleToMyAdSummary),
    ...vehicleAccessories.map(vehicleAccessoryToMyAdSummary),
    ...jobs.map(jobToMyAdSummary),
    ...professionalServices.map(professionalServiceToMyAdSummary),
    ...petsForSale.map(petForSaleToMyAdSummary),
    ...petsForFree.map(petForFreeToMyAdSummary),
    ...petAccessories.map(petAccessoryToMyAdSummary),
    ...realEstatesForSale.map(realEstateForSaleToMyAdSummary),
    ...realEstatesForRent.map(realEstateForRentToMyAdSummary),
    ...commercialRealEstates.map(commercialRealEstateToMyAdSummary),
    ...yad2Items.map(yad2ItemToMyAdSummary),
    ...others.map(otherToMyAdSummary),
  ];

  summaries.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return summaries;
}
