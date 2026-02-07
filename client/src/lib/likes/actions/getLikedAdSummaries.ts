"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { getLikedAdIdsByUser } from "@/lib/likes/repository/LikesRepository";
import {
  buildHref,
  type LikedAdSummary,
} from "@/lib/likes/entityTypeToPath";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { offRoadVehicleRepository } from "@/lib/vehicles/off-road/repository/OffRoadVehicleRepository";
import { commercialVehicleRepository } from "@/lib/vehicles/commercial-vehicles/repository/CommercialVehicleRepository";
import { motorcycleRepository } from "@/lib/vehicles/motorcycles/repository/MotorcycleRepository";
import { scooterRepository } from "@/lib/vehicles/scooters/repository/ScooterRepository";
import { specialVehicleRepository } from "@/lib/vehicles/special-vehicles/repository/SpecialVehicleRepository";
import { accessoryRepository } from "@/lib/vehicles/accessories/repository/AccessoryRepository";


function thumbnailUrl(images: { url: string }[] | undefined): string | null {
  if (images?.length && images[0]?.url) return images[0].url;
  return null;
}

function toSummary(
  entityType: string,
  publicId: string,
  entity: {
    images?: { url: string }[];
    description?: string;
    [key: string]: unknown;
  },
  title: string,
  price: number | null
): LikedAdSummary {
  return {
    entityType,
    publicId,
    href: buildHref(entityType, publicId),
    thumbnailUrl: thumbnailUrl(entity.images),
    title: title ?? "",
    description: entity.description ?? "",
    price,
  };
}

export async function getLikedAdSummaries(): Promise<LikedAdSummary[]> {
  const user = await getCurrentUser();
  if (!user) return [];

  // const likedByType = await getLikedAdIdsByUser(user.id);
  // const results: LikedAdSummary[] = [];

  // for (const [entityType, publicIds] of Object.entries(likedByType)) {
  //   if (!publicIds?.length) continue;

  //   for (const publicId of publicIds) {
  //     try {
  //       switch (entityType) {
  //         case "vehicles-cars": {
  //           const entity = await carRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = [entity.manufacturer, entity.model].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "jobs": {
  //           const entity = await jobRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           results.push(toSummary(entityType, publicId, entity, entity.title ?? "", null));
  //           break;
  //         }
  //         case "pets-for-sale": {
  //           const entity = await petForSaleRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const animal = getAnimalById(entity.animal as Parameters<typeof getAnimalById>[0]);
  //           const kind = getAnimalKindById(
  //             entity.kind as Parameters<typeof getAnimalKindById>[0],
  //             entity.animal as Parameters<typeof getAnimalKindById>[1]
  //           );
  //           const title = [animal?.russianName, kind?.russianName].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "professional-service": {
  //           const entity = await professionalServiceRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title =
  //             (entity.subCategory as { russianDisplayName?: string })?.russianDisplayName ??
  //             (entity.category as { russianDisplayName?: string })?.russianDisplayName ??
  //             "";
  //           results.push(toSummary(entityType, publicId, entity, title, null));
  //           break;
  //         }
  //         case "pets-accessories": {
  //           const entity = await petAccessoryRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           results.push(toSummary(entityType, publicId, entity, entity.title ?? "", entity.price ?? null));
  //           break;
  //         }
  //         case "pets-for-free": {
  //           const entity = await petForFreeRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const animal = getAnimalById(entity.animal as Parameters<typeof getAnimalById>[0]);
  //           const kind = getAnimalKindById(
  //             entity.kind as Parameters<typeof getAnimalKindById>[0],
  //             entity.animal as Parameters<typeof getAnimalKindById>[1]
  //           );
  //           const title = [animal?.russianName, kind?.russianName].filter(Boolean).join(" ");
  //           const price = entity.price != null ? entity.price : null;
  //           results.push(toSummary(entityType, publicId, entity, title, price));
  //           break;
  //         }
  //         case "vehicles-off-road": {
  //           const entity = await offRoadVehicleRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = [entity.manufacturer, entity.model].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "vehicles-commercial": {
  //           const entity = await commercialVehicleRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = [entity.manufacturer, entity.model].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "vehicles-motorcycles": {
  //           const entity = await motorcycleRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = [entity.manufacturer, entity.model].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "vehicles-scooters": {
  //           const entity = await scooterRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = [entity.manufacturer, entity.model].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "vehicles-special-vehicles": {
  //           const entity = await specialVehicleRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = entity.title ?? [entity.category, entity.kind].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         case "vehicles-accessories": {
  //           const entity = await accessoryRepository.getByPublicId(publicId);
  //           if (!entity) continue;
  //           const title = entity.title ?? [entity.category, entity.kind].filter(Boolean).join(" ");
  //           results.push(toSummary(entityType, publicId, entity, title, entity.price ?? null));
  //           break;
  //         }
  //         default:
  //           results.push({
  //             entityType,
  //             publicId,
  //             href: buildHref(entityType, publicId),
  //             thumbnailUrl: null,
  //             title: "",
  //             description: "",
  //             price: null,
  //           });
  //       }
  //     } catch (err) {
  //       console.error(`getLikedAdSummaries: failed for ${entityType}/${publicId}`, err);
  //     }
  //   }
  // }

  return [];
}
