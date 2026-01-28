"use server";

import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { IJob, Job } from "../models/Job";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { revalidatePath } from "next/cache";

export async function deleteJobAd(jobPublicId: string) {
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

    // Find the job ad
    const job = await Job.findOne<IJob>({
      publicId: jobPublicId,
    });

    if (!job) {
      return {
        success: false,
        error: "Объявление не найдено",
      };
    }

    // Verify ownership - only the creator can delete their ad
    if (job.user.toString() !== user.id) {
      return {
        success: false,
        error: "У вас нет прав для удаления этого объявления",
      };
    }

    // Delete associated images from storage
    if (job.images && job.images.length > 0) {
      const fileManager = await getFileManager();

      // Delete each image file
      await fileManager.deleteFiles(
        user.id,
        "jobs",
        job.images.map((image) => ({
          fileName: image.uniqueName,
          versionId: image.versionId,
        }))
      );
    }

    // Delete the job record from database
    await Job.findOneAndDelete({
      publicId: jobPublicId,
    });

    return {
      success: true,
      message: "Объявление успешно удалено",
    };
  } catch (error) {
    console.error("Error deleting job ad:", error);
    return {
      success: false,
      error: "Ошибка при удалении объявления. Попробуйте позже.",
    };
  }
}

// Alternative version with redirect
export async function deleteJobAdWithRedirect(jobPublicId: string) {
  const result = await deleteJobAd(jobPublicId);

  if (result.success) {
    revalidatePath("/jobs");
    redirect("/jobs");
  }

  return result;
}
