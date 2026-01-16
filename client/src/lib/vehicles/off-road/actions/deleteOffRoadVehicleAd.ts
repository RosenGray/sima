"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { offRoadVehicleRepository } from "../repository/OffRoadVehicleRepository";

export async function deleteOffRoadVehicleAd(offRoadVehiclePublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the off-road vehicle ad using repository
    const offRoadVehicle = await offRoadVehicleRepository.getByPublicId(offRoadVehiclePublicId);

    if (!offRoadVehicle) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (offRoadVehicle.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (offRoadVehicle.images && offRoadVehicle.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "vehicles/off-road",
        offRoadVehicle.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the off-road vehicle record from database using repository
    const deleted = await offRoadVehicleRepository.delete(offRoadVehiclePublicId);

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
    console.error("Error deleting off-road vehicle ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

export async function deleteOffRoadVehicleAdWithRedirect(
  offRoadVehiclePublicId: string,
  initialState: unknown,
  formData: FormData
) {
  const result = await deleteOffRoadVehicleAd(offRoadVehiclePublicId);
  revalidatePath("/vehicles/off-road", "layout");
  redirect("/vehicles/off-road");
}
