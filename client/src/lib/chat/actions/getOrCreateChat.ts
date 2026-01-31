"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { petForFreeRepository } from "@/lib/pets/for-free/repository/PetForFreeRepository";
import { petAccessoryRepository } from "@/lib/pets/accessories/repository/PetAccessoryRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { jobRepository } from "@/lib/jobs/repository/JobRepository";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import type { AdSnapshot } from "../types/chat.types";

const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";
const ENTITY_TYPE_PETS_FOR_FREE = "pets-for-free";
const ENTITY_TYPE_PETS_ACCESSORIES = "pets-accessories";
const ENTITY_TYPE_PROFESSIONAL_SERVICE = "professional-service";
const ENTITY_TYPE_JOBS = "jobs";
const ENTITY_TYPE_CARS = "cars";

const SUPPORTED_ENTITY_TYPES = [
  ENTITY_TYPE_PETS_FOR_SALE,
  ENTITY_TYPE_PETS_FOR_FREE,
  ENTITY_TYPE_PETS_ACCESSORIES,
  ENTITY_TYPE_PROFESSIONAL_SERVICE,
  ENTITY_TYPE_JOBS,
  ENTITY_TYPE_CARS,
] as const;

export type GetOrCreateChatResult =
  | { success: true; chatId: string }
  | { success: false; error: string };

export async function getOrCreateChat(
  adEntityType: string,
  adPublicId: string
): Promise<GetOrCreateChatResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, error: "Войдите в аккаунт" };
  }

  if (!SUPPORTED_ENTITY_TYPES.includes(adEntityType as (typeof SUPPORTED_ENTITY_TYPES)[number])) {
    return { success: false, error: "Этот тип объявления не поддерживается" };
  }

  let adOwnerId: string;
  let adSnapshot: AdSnapshot;

  if (adEntityType === ENTITY_TYPE_PETS_FOR_SALE) {
    const pet = await petForSaleRepository.getByPublicId(adPublicId);
    if (!pet) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof pet.user === "object" ? pet.user.id : pet.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const title =
      [pet.animal, pet.kind, pet.city].filter(Boolean).join(" • ") || "Pet";
    adSnapshot = {
      entityType: ENTITY_TYPE_PETS_FOR_SALE,
      entityPublicId: pet.publicId,
      title,
      thumbnailUrl: pet.images?.[0]?.url ?? "",
      price: pet.price,
      adLink: `/pets/for-sale/${pet.publicId}`,
      adRemoved: false,
    };
  } else if (adEntityType === ENTITY_TYPE_PETS_FOR_FREE) {
    const petForFree = await petForFreeRepository.getByPublicId(adPublicId);
    if (!petForFree) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof petForFree.user === "object" ? petForFree.user.id : petForFree.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const titleForFree =
      [petForFree.animal, petForFree.kind, petForFree.city].filter(Boolean).join(" • ") || "Питомец";
    adSnapshot = {
      entityType: ENTITY_TYPE_PETS_FOR_FREE,
      entityPublicId: petForFree.publicId,
      title: titleForFree,
      thumbnailUrl: petForFree.images?.[0]?.url ?? "",
      adLink: `/pets/for-free/${petForFree.publicId}`,
      adRemoved: false,
    };
  } else if (adEntityType === ENTITY_TYPE_PETS_ACCESSORIES) {
    const accessory = await petAccessoryRepository.getByPublicId(adPublicId);
    if (!accessory) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof accessory.user === "object" ? accessory.user.id : accessory.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const titleAccessory =
      [accessory.title, accessory.city].filter(Boolean).join(" • ") || "Аксессуар";
    adSnapshot = {
      entityType: ENTITY_TYPE_PETS_ACCESSORIES,
      entityPublicId: accessory.publicId,
      title: titleAccessory,
      thumbnailUrl: accessory.images?.[0]?.url ?? "",
      price: accessory.price,
      adLink: `/pets/accessories/${accessory.publicId}`,
      adRemoved: false,
    };
  } else if (adEntityType === ENTITY_TYPE_PROFESSIONAL_SERVICE) {
    const service = await professionalServiceRepository.getByPublicId(adPublicId);
    if (!service) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof service.user === "object" ? service.user.id : service.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const title =
      [service.subCategory?.russianDisplayName, service.city]
        .filter(Boolean)
        .join(" • ") || "Professional Service";
    adSnapshot = {
      entityType: ENTITY_TYPE_PROFESSIONAL_SERVICE,
      entityPublicId: service.publicId,
      title,
      thumbnailUrl: service.images?.[0]?.url ?? "",
      adLink: `/professional-service/${service.publicId}`,
      adRemoved: false,
    };
  } else if (adEntityType === ENTITY_TYPE_JOBS) {
    const job = await jobRepository.getByPublicId(adPublicId);
    if (!job) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof job.user === "object" ? job.user.id : job.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const jobTitle =
      [job.title, job.city].filter(Boolean).join(" • ") || "Вакансия";
    adSnapshot = {
      entityType: ENTITY_TYPE_JOBS,
      entityPublicId: job.publicId,
      title: jobTitle,
      thumbnailUrl: job.images?.[0]?.url ?? "",
      adLink: `/jobs/${job.publicId}`,
      adRemoved: false,
    };
  } else if (adEntityType === ENTITY_TYPE_CARS) {
    const car = await carRepository.getByPublicId(adPublicId);
    if (!car) {
      return { success: false, error: "Объявление не найдено" };
    }

    adOwnerId = typeof car.user === "object" ? car.user.id : car.user;
    if (adOwnerId === user.id) {
      return { success: false, error: "Нельзя начать чат с самим собой" };
    }

    const carTitle =
      [car.manufacturer, car.model, car.city].filter(Boolean).join(" • ") ||
      "Автомобиль";
    adSnapshot = {
      entityType: ENTITY_TYPE_CARS,
      entityPublicId: car.publicId,
      title: carTitle,
      thumbnailUrl: car.images?.[0]?.url ?? "",
      price: car.price,
      adLink: `/vehicles/cars/${car.publicId}`,
      adRemoved: false,
    };
  } else {
    return { success: false, error: "Этот тип объявления не поддерживается" };
  }

  try {
    const { publicId } = await chatRepository.getOrCreateConversation(
      user.id,
      adOwnerId,
      adEntityType,
      adPublicId,
      adSnapshot
    );
    return { success: true, chatId: publicId };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Не удалось создать чат";
    return { success: false, error: message };
  }
}
