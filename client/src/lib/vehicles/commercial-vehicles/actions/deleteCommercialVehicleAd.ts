"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { commercialVehicleRepository } from "../repository/CommercialVehicleRepository";

export async function deleteCommercialVehicleAd(commercialVehiclePublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the commercial vehicle ad using repository
    const commercialVehicle = await commercialVehicleRepository.getByPublicId(commercialVehiclePublicId);

    if (!commercialVehicle) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (commercialVehicle.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (commercialVehicle.images && commercialVehicle.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "vehicles/commercial-vehicles",
        commercialVehicle.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the commercial vehicle record from database using repository
    const deleted = await commercialVehicleRepository.delete(commercialVehiclePublicId);

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
    console.error("Error deleting commercial vehicle ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

export async function deleteCommercialVehicleAdWithRedirect(
  commercialVehiclePublicId: string,
  initialState: unknown,
  formData: FormData
) {
  const result = await deleteCommercialVehicleAd(commercialVehiclePublicId);
  if(result.success) {
    revalidatePath("/vehicles/commercial-vehicles", "layout");
    redirect("/vehicles/commercial-vehicles");
  }
  return result;
}
