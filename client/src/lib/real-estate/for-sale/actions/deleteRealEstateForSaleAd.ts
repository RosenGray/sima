"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { realEstateForSaleRepository } from "../repository/RealEstateForSaleRepository";

export async function deleteRealEstateForSaleAd(realEstatePublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the real estate ad using repository
    const realEstate = await realEstateForSaleRepository.getByPublicId(
      realEstatePublicId
    );

    if (!realEstate) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (realEstate.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (realEstate.images && realEstate.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "real-estate/for-sale",
        realEstate.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the real estate record from database using repository
    const deleted = await realEstateForSaleRepository.delete(realEstatePublicId);

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
    console.error("Error deleting real estate for sale ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteRealEstateForSaleAdWithRedirect(
  realEstatePublicId: string
) {
  const result = await deleteRealEstateForSaleAd(realEstatePublicId);

  if (result.success) {
    revalidatePath("/real-estate/for-sale");
    redirect("/real-estate/for-sale");
  }

  return result;
}
