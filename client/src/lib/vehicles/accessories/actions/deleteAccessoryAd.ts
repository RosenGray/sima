"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { accessoryRepository } from "../repository/AccessoryRepository";

export async function deleteAccessoryAd(accessoryPublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the accessory ad using repository
    const accessory =
      await accessoryRepository.getByPublicId(accessoryPublicId);

    if (!accessory) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (accessory.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (accessory.images && accessory.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "vehicles/accessories",
        accessory.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the accessory record from database using repository
    const deleted = await accessoryRepository.delete(accessoryPublicId);

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
    console.error("Error deleting accessory ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteAccessoryAdWithRedirect(
  accessoryPublicId: string
) {
  const result = await deleteAccessoryAd(accessoryPublicId);

  if (result.success) {
    revalidatePath("/vehicles/accessories");
    redirect("/vehicles/accessories");
  }

  return result;
}
