"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { specialVehicleRepository } from "../repository/SpecialVehicleRepository";

export async function deleteSpecialVehicleAd(specialVehiclePublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the special vehicle ad using repository
    const specialVehicle =
      await specialVehicleRepository.getByPublicId(specialVehiclePublicId);

    if (!specialVehicle) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (specialVehicle.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (specialVehicle.images && specialVehicle.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "vehicles/special-vehicles",
        specialVehicle.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the special vehicle record from database using repository
    const deleted = await specialVehicleRepository.delete(specialVehiclePublicId);

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
    console.error("Error deleting special vehicle ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteSpecialVehicleAdWithRedirect(
  specialVehiclePublicId: string
) {
  const result = await deleteSpecialVehicleAd(specialVehiclePublicId);

  if (result.success) {
    revalidatePath("/vehicles/special-vehicles");
    redirect("/vehicles/special-vehicles");
  }

  return result;
}
