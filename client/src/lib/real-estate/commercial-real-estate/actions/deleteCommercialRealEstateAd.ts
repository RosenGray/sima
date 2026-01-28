"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { commercialRealEstateRepository } from "../repository/CommercialRealEstateRepository";

export async function deleteCommercialRealEstateAd(
  commercialRealEstatePublicId: string
) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the commercial real estate ad using repository
    const commercialRealEstate =
      await commercialRealEstateRepository.getByPublicId(
        commercialRealEstatePublicId
      );

    if (!commercialRealEstate) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (commercialRealEstate.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (
      commercialRealEstate.images &&
      commercialRealEstate.images.length > 0
    ) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "real-estate/commercial-real-estate",
        commercialRealEstate.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the commercial real estate record from database using repository
    const deleted = await commercialRealEstateRepository.delete(
      commercialRealEstatePublicId
    );

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
    console.error("Error deleting commercial real estate ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteCommercialRealEstateAdWithRedirect(
  commercialRealEstatePublicId: string
) {
  const result = await deleteCommercialRealEstateAd(
    commercialRealEstatePublicId
  );

  if (result.success) {
    revalidatePath("/real-estate/commercial-real-estate");
    redirect("/real-estate/commercial-real-estate");
  }

  return result;
}
