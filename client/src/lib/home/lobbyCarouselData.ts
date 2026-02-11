import type {
  LobbyCarouselSection,
  LobbyCarouselItemWithDate,
} from "./lobbyCarousel.types";

// --- Repositories ---
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { realEstateForSaleRepository } from "@/lib/real-estate/for-sale/repository/RealEstateForSaleRepository";
import { realEstateForRentRepository } from "@/lib/real-estate/for-rent/repository/RealEstateForRentRepository";
import { commercialRealEstateRepository } from "@/lib/real-estate/commercial-real-estate/repository/CommercialRealEstateRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { yad2ItemRepository } from "@/lib/yad2/repository/Yad2ItemRepository";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { othersRepository } from "@/lib/other/repository/OthersRepository";

// --- Mappers ---
import {
  mapCar,
  mapMotorcycle,
  mapScooter,
  mapCommercialVehicle,
  mapOffRoadVehicle,
  mapSpecialVehicle,
  mapVehicleAccessory,
  mapPetForSale,
  mapPetForFree,
  mapPetAccessory,
  mapRealEstateForSale,
  mapRealEstateForRent,
  mapCommercialRealEstate,
  mapProfessionalService,
  mapYad2Item,
  mapJob,
  mapOther,
} from "./lobbyCarouselMappers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const LOBBY_PAGE_SIZE = 10;

/**
 * Merge multiple arrays of carousel items, sort by newest createdAt,
 * and return the top N items.
 */
function mergeAndTakeNewest(
  arrays: LobbyCarouselItemWithDate[][],
  limit = LOBBY_PAGE_SIZE
): LobbyCarouselItemWithDate[] {
  return arrays
    .flat()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit);
}

/** Strip `createdAt` from carousel items before passing to the UI. */
function stripCreatedAt(
  items: LobbyCarouselItemWithDate[]
): LobbyCarouselSection["items"] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return items.map(({ createdAt, ...rest }) => rest);
}

// ---------------------------------------------------------------------------
// Per-category fetchers
// ---------------------------------------------------------------------------

async function fetchTransportItems(): Promise<LobbyCarouselSection> {
  const [cars, motorcycles, scooters, commercials, offRoad, specials, accessories] =
    await Promise.all([
      carRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      motorcycleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      scooterRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      commercialVehicleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      offRoadVehicleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      specialVehicleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
      accessoryRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
    ]);

  const merged = mergeAndTakeNewest([
    cars.data.map(mapCar),
    motorcycles.data.map(mapMotorcycle),
    scooters.data.map(mapScooter),
    commercials.data.map(mapCommercialVehicle),
    offRoad.data.map(mapOffRoadVehicle),
    specials.data.map(mapSpecialVehicle),
    accessories.data.map(mapVehicleAccessory),
  ]);

  return {
    title: "Транспорт",
    seeAllHref: "/vehicles/cars",
    items: stripCreatedAt(merged),
  };
}

async function fetchPetsItems(): Promise<LobbyCarouselSection> {
  const [forSale, forFree, accessories] = await Promise.all([
    petForSaleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
    petForFreeRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
    petAccessoryRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
  ]);

  const merged = mergeAndTakeNewest([
    forSale.data.map(mapPetForSale),
    forFree.data.map(mapPetForFree),
    accessories.data.map(mapPetAccessory),
  ]);

  return {
    title: "Домашние животные",
    seeAllHref: "/pets/for-sale",
    items: stripCreatedAt(merged),
  };
}

async function fetchRealEstateItems(): Promise<LobbyCarouselSection> {
  const [forSale, forRent, commercial] = await Promise.all([
    realEstateForSaleRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
    realEstateForRentRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
    commercialRealEstateRepository.getAll({}, 1, LOBBY_PAGE_SIZE),
  ]);

  const merged = mergeAndTakeNewest([
    forSale.data.map(mapRealEstateForSale),
    forRent.data.map(mapRealEstateForRent),
    commercial.data.map(mapCommercialRealEstate),
  ]);

  return {
    title: "Недвижимость",
    seeAllHref: "/real-estate/for-sale",
    items: stripCreatedAt(merged),
  };
}

async function fetchProfessionalServiceItems(): Promise<LobbyCarouselSection> {
  const result = await professionalServiceRepository.getAll({}, 1, LOBBY_PAGE_SIZE);

  return {
    title: "Услуги специалистов",
    seeAllHref: "/professional-service",
    items: stripCreatedAt(result.data.map(mapProfessionalService)),
  };
}

async function fetchYad2Items(): Promise<LobbyCarouselSection> {
  const result = await yad2ItemRepository.getAll({}, 1, LOBBY_PAGE_SIZE);

  return {
    title: "Куплю-Продам",
    seeAllHref: "/yad2",
    items: stripCreatedAt(result.data.map(mapYad2Item)),
  };
}

async function fetchJobItems(): Promise<LobbyCarouselSection> {
  const result = await jobRepository.getAll({}, 1, LOBBY_PAGE_SIZE);

  return {
    title: "Работа",
    seeAllHref: "/jobs",
    items: stripCreatedAt(result.data.map(mapJob)),
  };
}

async function fetchOtherItems(): Promise<LobbyCarouselSection> {
  const result = await othersRepository.getAll({}, 1, LOBBY_PAGE_SIZE);

  return {
    title: "Другое",
    seeAllHref: "/other",
    items: stripCreatedAt(result.data.map(mapOther)),
  };
}

// ---------------------------------------------------------------------------
// Main entry point — fetch all 7 sections in parallel
// ---------------------------------------------------------------------------

export async function fetchAllLobbySections(): Promise<LobbyCarouselSection[]> {
  const sections = await Promise.all([
    fetchProfessionalServiceItems(),
    fetchTransportItems(),
    fetchPetsItems(),
    fetchRealEstateItems(),
    fetchYad2Items(),
    fetchJobItems(),
    fetchOtherItems(),
  ]);

  // Only return sections that have at least one item
  return sections.filter((section) => section.items.length > 0);
}
