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
    title: `${car.manufacturer} ${car.model}`,
    subtitle: `${car.yearOfManufacture}, ${car.city}`,
    description: car.description || "",
    city: car.city || "",
    price: formatPrice(car.price),
    district: car.district || "",
    href: `/vehicles/cars/${car.publicId}`,
    createdAt: car.createdAt,
  };
}

export function mapMotorcycle(m: SerializedMotorcycle): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(m.images),
    title: `${m.manufacturer} ${m.model}`,
    subtitle: `${m.yearOfManufacture}, ${m.city}`,
    description: m.description || "",
    city: m.city || "",
    price: formatPrice(m.price),
    district: m.district || "",
    href: `/vehicles/motorcycles/${m.publicId}`,
    createdAt: m.createdAt,
  };
}

export function mapScooter(s: SerializedScooter): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(s.images),
    title: `${s.manufacturer} ${s.model}`,
    subtitle: `${s.yearOfManufacture}, ${s.city}`,
    description: s.description || "",
    city: s.city || "",
    price: formatPrice(s.price),
    district: s.district || "",
    href: `/vehicles/scooters/${s.publicId}`,
    createdAt: s.createdAt,
  };
}

export function mapCommercialVehicle(cv: SerializedCommercialVehicle): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(cv.images),
    title: `${cv.manufacturer} ${cv.model}`,
    subtitle: `${cv.yearOfManufacture}, ${cv.city}`,
    description: cv.description || "",
    city: cv.city || "",
    price: formatPrice(cv.price),
    district: cv.district || "",
    href: `/vehicles/commercial-vehicles/${cv.publicId}`,
    createdAt: cv.createdAt,
  };
}

export function mapOffRoadVehicle(orv: SerializedOffRoadVehicle): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(orv.images),
    title: `${orv.manufacturer} ${orv.model}`,
    subtitle: `${orv.yearOfManufacture}, ${orv.city}`,
    description: orv.description || "",
    city: orv.city || "",
    price: formatPrice(orv.price),
    district: orv.district || "",
    href: `/vehicles/off-road/${orv.publicId}`,
    createdAt: orv.createdAt,
  };
}

export function mapSpecialVehicle(sv: SerializedSpecialVehicle): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(sv.images),
    title: sv.title || "",
    subtitle: sv.category || "",
    description: sv.description || "",
    city: sv.city || "",
    price: formatPrice(sv.price),
    district: sv.district || "",
    href: `/vehicles/special-vehicles/${sv.publicId}`,
    createdAt: sv.createdAt,
  };
}

export function mapVehicleAccessory(a: SerializedAccessory): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(a.images),
    title: a.title || "",
    subtitle: a.category || "",
    description: a.description || "",
    city: a.city || "",
    price: formatPrice(a.price),
    district: a.district || "",
    href: `/vehicles/accessories/${a.publicId}`,
    createdAt: a.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Pet mappers
// ---------------------------------------------------------------------------

export function mapPetForSale(p: SerializedPetForSale): LobbyCarouselItemWithDate {
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
  };
}

export function mapPetForFree(p: SerializedPetForFree): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(p.images),
    title: `${p.animal} — ${p.kind}`,
    subtitle: p.city || "",
    description: p.description || "",
    city: p.city || "",
    price: "",
    district: p.district || "",
    href: `/pets/for-free/${p.publicId}`,
    createdAt: p.createdAt,
  };
}

export function mapPetAccessory(pa: SerializedPetAccessory): LobbyCarouselItemWithDate {
  return {
    imageUrl: firstImage(pa.images),
    title: pa.title || "",
    subtitle: `${pa.animal} — ${pa.kind}`,
    description: pa.description || "",
    city: pa.city || "",
    price: formatPrice(pa.price),
    district: pa.district || "",
    href: `/pets/accessories/${pa.publicId}`,
    createdAt: pa.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Real estate mappers
// ---------------------------------------------------------------------------

export function mapRealEstateForSale(re: SerializedRealEstateForSale): LobbyCarouselItemWithDate {
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
  };
}

export function mapRealEstateForRent(re: SerializedRealEstateForRent): LobbyCarouselItemWithDate {
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
  };
}

export function mapCommercialRealEstate(cre: SerializedCommercialRealEstate): LobbyCarouselItemWithDate {
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
  };
}

// ---------------------------------------------------------------------------
// Professional services mapper
// ---------------------------------------------------------------------------

export function mapProfessionalService(ps: SerilizeProfessionalService): LobbyCarouselItemWithDate {
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
  };
}
