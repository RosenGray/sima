"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { petForFreeRepository } from "../repository/PetForFreeRepository";

export async function deletePetForFreeAd(petPublicId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    const pet = await petForFreeRepository.getByPublicId(petPublicId);

    if (!pet) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    if (pet.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    if (pet.images && pet.images.length > 0) {
      const fileManager = await getFileManager();

      await fileManager.deleteFiles(
        user.id,
        "pets/for-free",
        pet.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    const deleted = await petForFreeRepository.delete(petPublicId);

    if (!deleted) {
      return {
        success: false,
        error: "Ошибка при удалении объявления. Попробуйте позже.",
      };
    }

    return {
      success: true,
      message: "Объявление успешно удалено",
    };
  } catch (error) {
    console.error("Error deleting pet for free ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

export async function deletePetForFreeAdWithRedirect(petPublicId: string) {
  const result = await deletePetForFreeAd(petPublicId);

  if (result.success) {
    revalidatePath("/pets/for-free");
    redirect("/pets/for-free");
  }

  return result;
}
