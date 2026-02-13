"use server";

import { parseWithZod } from "@conform-to/zod";
import { createProfessionalPageEditSchema } from "../schema/professional-page-edit.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import connectDB from "@/lib/mongo/mongodb";
import {
  ExistingImageItem,
  FileUploadResponse,
  uploadFiles,
} from "@/lib/files/uploadFiles";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getFileManager } from "@/lib/common/actions/getFileManager";
import { professionalPageRepository } from "../repository/ProfessionalPageRepository";
import { ProfessionalPage } from "../models/ProfessionalPage";
import mongoose from "mongoose";

const FOLDER_NAME = "professional-page";

function isFormData(value: unknown): value is FormData {
  return value instanceof FormData && typeof (value as FormData).get === "function";
}

export async function editProfessionalPage(
  context: {
    pagePublicId: string;
    profileImageToDelete?: ExistingImageItem | null;
    galleryImagesToDelete: ExistingImageItem[];
    allGalleryImagesDeleted: boolean;
  },
  _initialState: unknown,
  formDataArg?: FormData
) {
  const formData = isFormData(_initialState)
    ? _initialState
    : isFormData(formDataArg)
      ? formDataArg
      : undefined;

  if (!formData) {
    const failResult = parseWithZod(new FormData(), {
      schema: createProfessionalPageEditSchema({
        minGalleryImages: context.allGalleryImagesDeleted ? 1 : 0,
      }),
    });
    return failResult.reply({
      formErrors: ["Отсутствуют данные формы. Попробуйте ещё раз."],
    });
  }

  const result = parseWithZod(formData, {
    schema: createProfessionalPageEditSchema({
      minGalleryImages: context.allGalleryImagesDeleted ? 1 : 0,
    }),
  });

  if (result.status !== "success") return result.reply();

  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const page = await professionalPageRepository.getByPublicId(
    context.pagePublicId
  );
  if (!page || page.user.id !== user.id) {
    return result.reply({
      formErrors: ["Страница не найдена или доступ запрещён"],
    });
  }

  const fileManager = await getFileManager();
  const toDelete: { fileName: string; versionId?: string }[] = [];
  if (context.profileImageToDelete) {
    toDelete.push({
      fileName: context.profileImageToDelete.uniqueName,
      versionId: context.profileImageToDelete.versionId,
    });
  }
  context.galleryImagesToDelete.forEach((img) => {
    toDelete.push({ fileName: img.uniqueName, versionId: img.versionId });
  });
  if (toDelete.length > 0) {
    await fileManager.deleteFiles(user.id, FOLDER_NAME, toDelete);
  }

  const value = result.value;
  let newProfileImage: FileUploadResponse["files"][0] | undefined;
  if (value.profileImage && value.profileImage instanceof File) {
    const profileFormData = new FormData();
    profileFormData.append("files", value.profileImage);
    const profileUpload = await uploadFiles(FOLDER_NAME, user.id, profileFormData);
    if (profileUpload.files.length > 0) {
      newProfileImage = profileUpload.files[0];
    }
  }

  const validGalleryFiles = (value.galleryImages || []).filter(
    (file: File) => file.size > 0 && file.name !== "undefined"
  );
  let newGalleryFiles: FileUploadResponse["files"] = [];
  if (validGalleryFiles.length > 0) {
    const galleryFormData = new FormData();
    validGalleryFiles.forEach((file: File) => {
      galleryFormData.append("files", file);
    });
    const galleryUpload = await uploadFiles(FOLDER_NAME, user.id, galleryFormData);
    newGalleryFiles = galleryUpload.files;
  }

  const galleryIdsToDelete = new Set(
    context.galleryImagesToDelete.map((img) => img.id)
  );
  const remainingGallery = (page.galleryImages || []).filter(
    (img: { id: string }) => !galleryIdsToDelete.includes(img.id)
  );
  const galleryImages = [...remainingGallery, ...newGalleryFiles];

  const profileImage =
    newProfileImage ??
    (context.profileImageToDelete ? undefined : page.profileImage);

  const update: Record<string, unknown> = {
    displayName: value.displayName,
    description: value.description,
    profileImage: profileImage ?? null,
    galleryImages,
    district: value.district || undefined,
    city: value.city || undefined,
    contactPhone: value.contactPhone || undefined,
    contactEmail: value.contactEmail || undefined,
    socialLinks: {
      whatsapp: value.whatsapp || undefined,
      instagram: value.instagram || undefined,
      facebook: value.facebook || undefined,
      website: value.website || undefined,
    },
    isPublished: value.isPublished ?? page.isPublished,
  };

  if (value.category && mongoose.Types.ObjectId.isValid(value.category)) {
    update.category = value.category;
  } else {
    update.category = null;
  }
  if (value.subCategory && mongoose.Types.ObjectId.isValid(value.subCategory)) {
    update.subCategory = value.subCategory;
  } else {
    update.subCategory = null;
  }

  try {
    await connectDB();
    await ProfessionalPage.findOneAndUpdate(
      { publicId: context.pagePublicId },
      { $set: update },
      { new: true }
    );
  } catch (error) {
    console.error("Error updating professional page:", error);
    return result.reply({
      formErrors: ["Не удалось сохранить изменения"],
    });
  }

  revalidatePath("/professional", "layout");
  revalidatePath(`/professional/${page.slug}`);
  redirect(`/professional/${page.slug}`);
}
