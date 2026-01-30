"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import type { AdSnapshot } from "../types/chat.types";

const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";
const ENTITY_TYPE_PROFESSIONAL_SERVICE = "professional-service";

const SUPPORTED_ENTITY_TYPES = [
  ENTITY_TYPE_PETS_FOR_SALE,
  ENTITY_TYPE_PROFESSIONAL_SERVICE,
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
