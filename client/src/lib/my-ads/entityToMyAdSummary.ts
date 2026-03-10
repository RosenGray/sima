import type { EntityType } from "@/lib/constants/entityTypes";
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
import {
  buildHref,
  getSectionLabelForEntityType,
  type MyAdSummary,
} from "@/lib/likes/entityTypeToPath";
import {
  mapCar,
  mapCommercialVehicle,
  mapJob,
  mapMotorcycle,
  mapOffRoadVehicle,
  mapOther,
  mapPetAccessory,
  mapPetForFree,
  mapPetForSale,
  mapProfessionalService,
  mapRealEstateForSale,
  mapRealEstateForRent,
  mapCommercialRealEstate,
  mapScooter,
  mapSpecialVehicle,
  mapVehicleAccessory,
  mapYad2Item,
} from "@/lib/home/lobbyCarouselMappers";
import type { SerializedCar } from "@/lib/vehicles/cars/types/cars.types";
import type { SerializedCommercialVehicle } from "@/lib/vehicles/commercial-vehicles/types/commercialVehicle.types";
import type { SerializedMotorcycle } from "@/lib/vehicles/motorcycles/types/motorcycle.types";
import type { SerializedOffRoadVehicle } from "@/lib/vehicles/off-road/types/offRoadVehicle.types";
import type { SerializedScooter } from "@/lib/vehicles/scooters/types/scooter.types";
import type { SerializedSpecialVehicle } from "@/lib/vehicles/special-vehicles/types/specialVehicle.types";
import type { SerializedAccessory } from "@/lib/vehicles/accessories/types/accessory.types";
import type { SerializedJob } from "@/lib/jobs/types/job.types";
import type { SerializedPetForSale } from "@/lib/pets/for-sale/types/petForSale.types";
import type { SerializedPetForFree } from "@/lib/pets/for-free/types/petForFree.types";
import type { SerializedPetAccessory } from "@/lib/pets/accessories/types/petAccessory.types";
import type { SerializedRealEstateForSale } from "@/lib/real-estate/for-sale/types/realEstateForSale.types";
import type { SerializedRealEstateForRent } from "@/lib/real-estate/for-rent/types/realEstateForRent.types";
import type { SerializedCommercialRealEstate } from "@/lib/real-estate/commercial-real-estate/types/commercialRealEstate.types";
import type { SerializedYad2Item } from "@/lib/yad2/types/yad2.types";
import type { SerializedOthers } from "@/lib/other/types/others.types";

type EntityWithStatusAndDate = {
  publicId: string;
  status?: string;
  createdAt?: string | Date;
  [key: string]: unknown;
};

function toCreatedAtIso(createdAt: string | Date | undefined): string {
  if (!createdAt) return "";
  return typeof createdAt === "string"
    ? createdAt
    : new Date(createdAt).toISOString();
}

function toSummary(
  entityType: EntityType,
  publicId: string,
  title: string,
  thumbnailUrl: string | null,
  status: string,
  createdAt: string
): MyAdSummary {
  return {
    entityType,
    publicId,
    href: buildHref(entityType, publicId),
    thumbnailUrl,
    title,
    status: status ?? "active",
    createdAt,
    sectionLabel: getSectionLabelForEntityType(entityType),
  };
}

export function carToMyAdSummary(entity: SerializedCar): MyAdSummary {
  const m = mapCar(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_CARS,
    entity.publicId,
    title || "Автомобиль",
    m.imageUrl || null,
    entity.status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function motorcycleToMyAdSummary(
  entity: SerializedMotorcycle
): MyAdSummary {
  const m = mapMotorcycle(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_MOTORCYCLES,
    entity.publicId,
    title || "Мотоцикл",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function scooterToMyAdSummary(entity: SerializedScooter): MyAdSummary {
  const m = mapScooter(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_SCOOTERS,
    entity.publicId,
    title || "Скутер",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function commercialVehicleToMyAdSummary(
  entity: SerializedCommercialVehicle
): MyAdSummary {
  const m = mapCommercialVehicle(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_COMMERCIAL_VEHICLES,
    entity.publicId,
    title || "Коммерческий транспорт",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function offRoadVehicleToMyAdSummary(
  entity: SerializedOffRoadVehicle
): MyAdSummary {
  const m = mapOffRoadVehicle(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_OFF_ROAD,
    entity.publicId,
    title || "Внедорожник",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function specialVehicleToMyAdSummary(
  entity: SerializedSpecialVehicle
): MyAdSummary {
  const m = mapSpecialVehicle(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_SPECIAL_VEHICLES,
    entity.publicId,
    title || "Спецтехника",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function vehicleAccessoryToMyAdSummary(
  entity: SerializedAccessory
): MyAdSummary {
  const m = mapVehicleAccessory(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_VEHICLES_ACCESSORIES,
    entity.publicId,
    title || "Аксессуар",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function jobToMyAdSummary(entity: SerializedJob): MyAdSummary {
  const m = mapJob(entity);
  return toSummary(
    ENTITY_TYPE_JOBS,
    entity.publicId,
    m.title || "Вакансия",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function petForSaleToMyAdSummary(
  entity: SerializedPetForSale
): MyAdSummary {
  const m = mapPetForSale(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_PETS_FOR_SALE,
    entity.publicId,
    title || "Питомец",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function petForFreeToMyAdSummary(
  entity: SerializedPetForFree
): MyAdSummary {
  const m = mapPetForFree(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_PETS_FOR_FREE,
    entity.publicId,
    title || "Питомец",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function petAccessoryToMyAdSummary(
  entity: SerializedPetAccessory
): MyAdSummary {
  const m = mapPetAccessory(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_PETS_ACCESSORIES,
    entity.publicId,
    title || "Аксессуар",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function realEstateForSaleToMyAdSummary(
  entity: SerializedRealEstateForSale
): MyAdSummary {
  const m = mapRealEstateForSale(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_REAL_ESTATE_FOR_SALE,
    entity.publicId,
    title || "Недвижимость",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function realEstateForRentToMyAdSummary(
  entity: SerializedRealEstateForRent
): MyAdSummary {
  const m = mapRealEstateForRent(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_REAL_ESTATE_FOR_RENT,
    entity.publicId,
    title || "Аренда",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function commercialRealEstateToMyAdSummary(
  entity: SerializedCommercialRealEstate
): MyAdSummary {
  const m = mapCommercialRealEstate(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_COMMERCIAL_REAL_ESTATE,
    entity.publicId,
    title || "Коммерческая недвижимость",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function professionalServiceToMyAdSummary(entity: {
  publicId: string;
  status?: string;
  createdAt?: string | Date;
  category?: { russianDisplayName?: string };
  subCategory?: { russianDisplayName?: string };
  images?: { url: string }[];
}): MyAdSummary {
  const m = mapProfessionalService(entity as Parameters<typeof mapProfessionalService>[0]);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_PROFESSIONAL_SERVICE,
    entity.publicId,
    title || "Услуга",
    m.imageUrl || null,
    entity.status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function yad2ItemToMyAdSummary(entity: SerializedYad2Item): MyAdSummary {
  const m = mapYad2Item(entity);
  const title = [m.title, m.subtitle].filter(Boolean).join(" ");
  return toSummary(
    ENTITY_TYPE_YAD2,
    entity.publicId,
    title || "Объявление",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}

export function otherToMyAdSummary(entity: SerializedOthers): MyAdSummary {
  const m = mapOther(entity);
  return toSummary(
    ENTITY_TYPE_OTHER,
    entity.publicId,
    m.title || "Прочее",
    m.imageUrl || null,
    (entity as unknown as EntityWithStatusAndDate).status ?? "active",
    toCreatedAtIso(entity.createdAt)
  );
}
