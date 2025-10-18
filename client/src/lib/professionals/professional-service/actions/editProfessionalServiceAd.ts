"use server";
import { parseWithZod } from "@conform-to/zod";
import { createProfessionalServiceSchema } from "../types/professional-service.scema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import {
  ExistingImageItem,
  FileUploadResponse,
} from "@/app/api/files/create/route";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { professionalServiceRepository } from "../repository/ProfessionalServiceRepository";

export async function editProfessionalServiceAd(
  context: {
    servicePublicId: string;
    imagesToDelete: ExistingImageItem[];
    allImagesShouldBeDeleted: boolean;
  },
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createProfessionalServiceSchema({
      minNumberOfImages: context.allImagesShouldBeDeleted ? 1 : 0,
    }),
  });
  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  if (context.imagesToDelete.length > 0) {
    const fileManager = await getFileManager();
    await fileManager.deleteFiles(
      user.id,
      "professionals",
      context.imagesToDelete.map((image) => ({
        fileName: image.uniqueName,
        versionId: image.versionId,
      }))
    );
  }

  const { images } = result.value;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    images.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    // Add metadata
    uploadFormData.append("folderName", "professionals");
    uploadFormData.append("userId", user.id); // You'll need to get this from auth context

    // Send request to files API route
    const response = await fetch("http://localhost:3000/api/files/create", {
      method: "POST",
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload files");
    }

    const uploadResult: FileUploadResponse = await response.json();

    await connectDB();

    const service = await professionalServiceRepository.getByPublicId(
      context.servicePublicId
    );
    if (!service) {
      return result.reply({
        formErrors: ["Объявление не найдено"],
      });
    }
    const imageIdsToDelete = context.imagesToDelete.map((img) => img.id);
    const updatedImages = [
      ...service.images.filter((img) => !imageIdsToDelete.includes(img.id)),
      ...uploadResult.files,
    ];

    const professionalService = await ProfessionalService.findOneAndUpdate(
      { publicId: context.servicePublicId },

      {
        ...result.value,
        user: user.id,
        acceptTerms: result.value.acceptTerms === "on",
        images: updatedImages,
      }
    );
    await professionalService.save();
    // Return success response with uploaded file data
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return result.reply({
        formErrors: ["Неизвестная ошибка"],
      });
    }
    return result.reply({
      formErrors: ["Неизвестная ошибка"],
    });
  }
  revalidatePath("/professional-service", "layout"); // Explicitly revalidate the layout
  redirect("/professional-service");
}
