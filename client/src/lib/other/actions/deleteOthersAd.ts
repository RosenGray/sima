"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { IOthers, Others } from "../models/Others";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";

export async function deleteOthersAd(othersPublicId: string) {
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

    // Find the other ad
    const other = await Others.findOne<IOthers>({
      publicId: othersPublicId,
    });

    if (!other) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (other.user.toString() !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (other.images && other.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "other",
        other.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the other record from database
    await Others.findOneAndDelete({
      publicId: othersPublicId,
    });

    return {
      success: true,
      message: "Объявление успешно удалено",
    };
  } catch (error) {
    console.error("Error deleting other ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteOthersAdWithRedirect(othersPublicId: string) {
  const result = await deleteOthersAd(othersPublicId);

  if (result.success) {
    revalidatePath("/other");
    redirect("/other");
  }

  return result;
}
