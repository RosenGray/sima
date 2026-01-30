"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { chatRepository } from "../repository/ChatRepository";
import { petForSaleRepository } from "@/lib/pets/for-sale/repository/PetForSaleRepository";

const ENTITY_TYPE_PETS_FOR_SALE = "pets-for-sale";

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

  if (adEntityType !== ENTITY_TYPE_PETS_FOR_SALE) {
    return { success: false, error: "Этот тип объявления не поддерживается" };
  }

  const pet = await petForSaleRepository.getByPublicId(adPublicId);
  if (!pet) {
    return { success: false, error: "Объявление не найдено" };
  }

  const adOwnerId = typeof pet.user === "object" ? pet.user.id : pet.user;
  if (adOwnerId === user.id) {
    return { success: false, error: "Нельзя начать чат с самим собой" };
  }

  const thumbnailUrl =
    pet.images?.[0]?.url ?? "";
  const title = [pet.animal, pet.kind, pet.city].filter(Boolean).join(" • ") || "Pet";
  const adLink = `/pets/for-sale/${pet.publicId}`;

  const adSnapshot = {
    entityType: ENTITY_TYPE_PETS_FOR_SALE,
    entityPublicId: pet.publicId,
    title,
    thumbnailUrl,
    price: pet.price,
    adLink,
    adRemoved: false,
  };

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
