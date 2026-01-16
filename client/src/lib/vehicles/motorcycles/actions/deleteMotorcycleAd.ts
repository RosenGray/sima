"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { motorcycleRepository } from "../repository/MotorcycleRepository";

export async function deleteMotorcycleAd(motorcyclePublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the motorcycle ad using repository
    const motorcycle = await motorcycleRepository.getByPublicId(
      motorcyclePublicId
    );

    if (!motorcycle) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (motorcycle.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (motorcycle.images && motorcycle.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "vehicles/motorcycles",
        motorcycle.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the motorcycle record from database using repository
    const deleted = await motorcycleRepository.delete(motorcyclePublicId);

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
    console.error("Error deleting motorcycle ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

export async function deleteMotorcycleAdWithRedirect(
  motorcyclePublicId: string,
  initialState: unknown,
  formData: FormData
) {
  const result = await deleteMotorcycleAd(motorcyclePublicId);
  revalidatePath("/vehicles/motorcycles", "layout");
  redirect("/vehicles/motorcycles");
}
