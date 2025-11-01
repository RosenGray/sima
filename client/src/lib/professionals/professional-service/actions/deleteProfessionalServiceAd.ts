"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import {
  IProfessionalService,
  ProfessionalService,
} from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";

export async function deleteProfessionalServiceAd(
  professionalServicePublicId: string
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

    await connectDB();

    // Find the professional service ad
    const professionalService =
      await ProfessionalService.findOne<IProfessionalService>({
        publicId: professionalServicePublicId,
      });

    if (!professionalService) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (professionalService.user.toString() !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (professionalService.images && professionalService.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file

      await fileManager.deleteFiles(
        user.id,
        "professionals",
        professionalService.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the professional service record from database
    await ProfessionalService.findOneAndDelete({
      publicId: professionalServicePublicId,
    });

    return {
      success: true,
      message: "Объявление успешно удалено",
    };
  } catch (error) {
    console.error("Error deleting professional service ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteProfessionalServiceAdWithRedirect(
  professionalServicePublicId: string
) {
  const result = await deleteProfessionalServiceAd(professionalServicePublicId);

  if (result.success) {
    redirect("/professional-service");
  }

  return result;
}
