import type { LobbyCarouselItemWithDate } from "./lobbyCarousel.types";

// --- Vehicle types ---
import type { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";
import type { SerializedMotorcycle } from "@/lib/vehicles/motorcycles/types/motorcycle.types";
import type { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";
import type { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";
import type { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";
import type { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";
import type { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";

// --- Pet types ---
import type { SerializedPetForSale } from "@/lib/pets/for-sale/types/petForSale.types";
import type { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import type { SerializedPetAccessory } from "@/lib/pets/accessories/types/petAccessory.types";

// --- Real estate types ---
import type { SerializedRealEstateForSale } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";
import type { SerializedRealEstateForRent } from "@/lib/real-estate/for-rent/types/realEstateForRent.types";
import type { SerializedCommercialRealEstate } from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.types";

// --- Other types ---
import type { SerilizeProfessionalService } from "@/lib/professionals/professional-service/types/professional-service.scema";
import type { SerializedYad2Item } from "@/lib/yad2/types/yad2.types";
import type { SerializedJob } from "@/lib/jobs/types/job.types";
import type { SerializedOthers } from "@/lib/other/types/others.types";

// --- Label formatters ---
import { formatPropertyKind as formatPropertyKindForSale } from "@/lib/real-estate/for-sale/utils/realEstateOptions";
import { formatPropertyKind as formatPropertyKindForRent } from "@/lib/real-estate/for-rent/utils/realEstateOptions";
import {
  formatCommercialPropertyKind,
  formatDealKind,
} from "@/lib/real-estate/commercial-real-estate/utils/commercialRealEstateOptions";
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
} from "../constants/entityTypes";
import { getAccessoryCategoryById } from "../vehicles/accessories/accessoryCategories";
import { getSpecialVehicleCategoryById } from "../vehicles/special-vehicles/specialVehicleCategories";
import { getScooterManufacturerById } from "../vehicles/scooters/scooterManufacturers";
import {
  ScooterManufacturerId,
  ScooterModelId,
} from "../vehicles/scooters/scooterManufacturers/types/scooterManufacturer.schema";
import { getScooterModelById } from "../vehicles/scooters/scooterModels";
import { getMotorcycleManufacturerById } from "../vehicles/motorcycles/motorcycleManufacturers";
import { getMotorcycleModelById } from "../vehicles/motorcycles/motorcycleModels";
import { getCommercialVehicleManufacturerById } from "../vehicles/commercial-vehicles/vehicleCommercialManufacturers";
import { getCommercialVehicleModelById } from "../vehicles/commercial-vehicles/vehicleCommercialModels";
import { getOffRoadVehicleManufacturerById } from "../vehicles/off-road/offRoadVehicleManufacturers";
import { getOffRoadVehicleModelById } from "../vehicles/off-road/offRoadVehicleModels";
import { getVehicleManufacturerById } from "../vehicles/cars/vehicleManufacturers";
import { getVehicleModelById } from "../vehicles/cars/vehicleModels";
import { getAnimalById, getAnimalKindById } from "../pets/accessories/animals";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const PLACEHOLDER_IMAGE = "/images/placeholder.png";

function firstImage(images?: { url: string }[]): string {
  return images?.[0]?.url ?? PLACEHOLDER_IMAGE;
}

function formatPrice(price?: number | null): string {
  if (price == null || price === 0) return "";
  const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `₪ ${formatted}`;
}

// ---------------------------------------------------------------------------
// Vehicle mappers
// ---------------------------------------------------------------------------

export function mapCar(car: SerializedCar): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(car.images),
    title: getVehicleManufacturerById(car.manufacturer)?.russianName || "",
    subtitle: getVehicleModelById(car.model, car.manufacturer)?.russianName || "",
    description: car.description || "",
    city: car.city || "",
    price: formatPrice(car.price),
    district: car.district || "",
    href: `/vehicles/cars/${car.publicId}`,
    createdAt: car.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_CARS,
      publicId: car.publicId,
    },
  };
}

export function mapMotorcycle(
  m: SerializedMotorcycle,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(m.images),
    title: getMotorcycleManufacturerById(m.manufacturer)?.russianName || "",
    subtitle:
      getMotorcycleModelById(m.model, m.manufacturer)?.russianName || "",
    description: m.description || "",
    city: m.city || "",
    price: formatPrice(m.price),
    district: m.district || "",
    href: `/vehicles/motorcycles/${m.publicId}`,
    createdAt: m.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_MOTORCYCLES,
      publicId: m.publicId,
    },
  };
}

export function mapScooter(s: SerializedScooter): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(s.images),
    title:
      getScooterManufacturerById(s.manufacturer as ScooterManufacturerId)
        ?.russianName || "",
    subtitle:
      getScooterModelById(
        s.model as ScooterModelId,
        s.manufacturer as ScooterManufacturerId,
      )?.russianName || "",
    description: s.description || "",
    city: s.city || "",
    price: formatPrice(s.price),
    district: s.district || "",
    href: `/vehicles/scooters/${s.publicId}`,
    createdAt: s.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_SCOOTERS,
      publicId: s.publicId,
    },
  };
}

export function mapCommercialVehicle(
  cv: SerializedCommercialVehicle,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(cv.images),
    title:
      getCommercialVehicleManufacturerById(cv.manufacturer)?.russianName || "",
    subtitle: getCommercialVehicleModelById(cv.model, cv.manufacturer)?.russianName || "",
    description: cv.description || "",
    city: cv.city || "",
    price: formatPrice(cv.price),
    district: cv.district || "",
    href: `/vehicles/commercial-vehicles/${cv.publicId}`,
    createdAt: cv.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_COMMERCIAL_VEHICLES,
      publicId: cv.publicId,
    },
  };
}

export function mapOffRoadVehicle(
  orv: SerializedOffRoadVehicle,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(orv.images),
    title: getOffRoadVehicleManufacturerById(orv.manufacturer)?.russianName || "",
    subtitle: getOffRoadVehicleModelById(orv.model, orv.manufacturer)?.russianName || "",
    description: orv.description || "",
    city: orv.city || "",
    price: formatPrice(orv.price),
    district: orv.district || "",
    href: `/vehicles/off-road/${orv.publicId}`,
    createdAt: orv.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_OFF_ROAD,
      publicId: orv.publicId,
    },
  };
}

export function mapSpecialVehicle(
  sv: SerializedSpecialVehicle,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(sv.images),
    title: sv.title || "",
    subtitle: getSpecialVehicleCategoryById(sv.category)?.russianName || "",
    description: sv.description || "",
    city: sv.city || "",
    price: formatPrice(sv.price),
    district: sv.district || "",
    href: `/vehicles/special-vehicles/${sv.publicId}`,
    createdAt: sv.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_SPECIAL_VEHICLES,
      publicId: sv.publicId,
    },
  };
}

export function mapVehicleAccessory(
  a: SerializedAccessory,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(a.images),
    title: a.title || "",
    subtitle: getAccessoryCategoryById(a.category)?.russianName || "",
    description: a.description || "",
    city: a.city || "",
    price: formatPrice(a.price),
    district: a.district || "",
    href: `/vehicles/accessories/${a.publicId}`,
    createdAt: a.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_VEHICLES_ACCESSORIES,
      publicId: a.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Pet mappers
// ---------------------------------------------------------------------------

export function mapPetForSale(
  p: SerializedPetForSale,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(p.images),
    title: `${p.animal} — ${p.kind}`,
    subtitle: p.city || "",
    description: p.description || "",
    city: p.city || "",
    price: formatPrice(p.price),
    district: p.district || "",
    href: `/pets/for-sale/${p.publicId}`,
    createdAt: p.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_PETS_FOR_SALE,
      publicId: p.publicId,
    },
  };
}

export function mapPetForFree(
  p: SerializedPetForFree,
): LobbyCarouselItemWithDate {
  console.log(p);
  return {
    imageUrl: firstImage(p.images),
    title: getAnimalById(p.animal)?.russianName || "",
    subtitle: getAnimalKindById(p.kind, p.animal)?.russianName || "",
    description: p.description || "",
    city: p.city || "",
    price: "",
    district: p.district || "",
    href: `/pets/for-free/${p.publicId}`,
    createdAt: p.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_PETS_FOR_FREE,
      publicId: p.publicId,
    },
  };
}

export function mapPetAccessory(
  pa: SerializedPetAccessory,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(pa.images),
    title: pa.title || "",
    subtitle: getAnimalById(pa.animal)?.russianName || "",
    description: pa.description || "",
    city: pa.city || "",
    price: formatPrice(pa.price),
    district: pa.district || "",
    href: `/pets/accessories/${pa.publicId}`,
    createdAt: pa.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_PETS_ACCESSORIES,
      publicId: pa.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Real estate mappers
// ---------------------------------------------------------------------------

export function mapRealEstateForSale(
  re: SerializedRealEstateForSale,
): LobbyCarouselItemWithDate {
  const kindLabel = formatPropertyKindForSale(re.propertyKind);
  return {
    imageUrl: firstImage(re.images),
    title: kindLabel ? `${kindLabel}, ${re.streetname}` : re.streetname || "",
    subtitle: `${re.numberOfRooms} комн., ${re.squaremeter} м²`,
    description: re.description || "",
    city: re.city || "",
    price: formatPrice(re.price),
    district: re.district || "",
    href: `/real-estate/for-sale/${re.publicId}`,
    createdAt: re.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_REAL_ESTATE_FOR_SALE,
      publicId: re.publicId,
    },
  };
}

export function mapRealEstateForRent(
  re: SerializedRealEstateForRent,
): LobbyCarouselItemWithDate {
  const kindLabel = formatPropertyKindForRent(re.propertyKind);
  return {
    imageUrl: firstImage(re.images),
    title: kindLabel ? `${kindLabel}, ${re.streetname}` : re.streetname || "",
    subtitle: `${re.numberOfRooms} комн., ${re.squaremeter} м²`,
    description: re.description || "",
    city: re.city || "",
    price: formatPrice(re.price),
    district: re.district || "",
    href: `/real-estate/for-rent/${re.publicId}`,
    createdAt: re.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_REAL_ESTATE_FOR_RENT,
      publicId: re.publicId,
    },
  };
}

export function mapCommercialRealEstate(
  cre: SerializedCommercialRealEstate,
): LobbyCarouselItemWithDate {
  const dealLabel = formatDealKind(cre.dealKind);
  const propLabel = formatCommercialPropertyKind(cre.propertyKind);
  return {
    imageUrl: firstImage(cre.images),
    title: `${dealLabel} — ${propLabel}`,
    subtitle: `${cre.squaremeter} м²`,
    description: cre.description || "",
    city: cre.city || "",
    price: formatPrice(cre.price),
    district: cre.district || "",
    href: `/real-estate/commercial-real-estate/${cre.publicId}`,
    createdAt: cre.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_COMMERCIAL_REAL_ESTATE,
      publicId: cre.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Professional services mapper
// ---------------------------------------------------------------------------

export function mapProfessionalService(
  ps: SerilizeProfessionalService,
): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(ps.images),
    title: ps.category?.russianDisplayName || "",
    subtitle: ps.subCategory?.russianDisplayName || "",
    description: ps.description || "",
    city: ps.city || "",
    price: "",
    district: ps.district || "",
    href: `/professional-service/${ps.publicId}`,
    createdAt: ps.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_PROFESSIONAL_SERVICE,
      publicId: ps.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Yad2 mapper
// ---------------------------------------------------------------------------

export function mapYad2Item(y: SerializedYad2Item): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(y.images),
    title: y.productTitle || "",
    subtitle: y.category || "",
    description: y.description || "",
    city: y.city || "",
    price: formatPrice(y.price),
    district: y.district || "",
    href: `/yad2/${y.publicId}`,
    createdAt: y.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_YAD2,
      publicId: y.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Job mapper
// ---------------------------------------------------------------------------

export function mapJob(j: SerializedJob): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(j.images),
    title: j.title || "",
    subtitle: j.city || "",
    description: j.description || "",
    city: j.city || "",
    price: "",
    district: j.district || "",
    href: `/jobs/${j.publicId}`,
    createdAt: j.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_JOBS,
      publicId: j.publicId,
    },
  };
}

// ---------------------------------------------------------------------------
// Other mapper
// ---------------------------------------------------------------------------

export function mapOther(o: SerializedOthers): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(o.images),
    title: o.title || "",
    subtitle: o.city || "",
    description: o.description || "",
    city: o.city || "",
    price: "",
    district: o.district || "",
    href: `/other/${o.publicId}`,
    createdAt: o.createdAt,
    likeButton: {
      entityType: ENTITY_TYPE_OTHER,
      publicId: o.publicId,
    },
  };
}
