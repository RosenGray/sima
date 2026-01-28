"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";
import { yad2ItemRepository } from "../repository/Yad2ItemRepository";

export async function deleteYad2ItemAd(yad2ItemPublicId: string) {
  try {
    // Get authenticated user
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Необходимо войти в систему",
      };
    }

    // Find the yad2 item ad using repository
    const yad2Item = await yad2ItemRepository.getByPublicId(yad2ItemPublicId);

    if (!yad2Item) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (yad2Item.user.id !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (yad2Item.images && yad2Item.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "yad2",
        yad2Item.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the yad2 item record from database using repository
    const deleted = await yad2ItemRepository.delete(yad2ItemPublicId);

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
    console.error("Error deleting yad2 item ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteYad2ItemAdWithRedirect(yad2ItemPublicId: string) {
  const result = await deleteYad2ItemAd(yad2ItemPublicId);

  if (result.success) {
    revalidatePath("/yad2");
    redirect("/yad2");
  }

  return result;
}
