"use server";

import { parseWithZod } from "@conform-to/zod";
import { createProfessionalPageSchema } from "../types/professional-page.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { User } from "@/lib/auth/models/User";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";
import { professionalPageRepository } from "../repository/ProfessionalPageRepository";
import { ProfessionalPage } from "../models/ProfessionalPage";
import { slugify } from "slugify";

const FOLDER = "professional-page";

export async function publishProfessionalPage(
  _initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createProfessionalPageSchema({ minGalleryImages: 0 }),
  });

  if (result.status !== "success") return result.reply();

  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Необходимо войти в аккаунт"],
    });
  }

  const existing = await professionalPageRepository.getByUserId(user.id);
  if (existing) {
    return result.reply({
      formErrors: ["У вас уже есть персональная страница. Перейдите в редактирование."],
    });
  }

  let slug = result.value.slug?.trim();
  if (!slug) {
    slug = `${slugify(result.value.displayName, { lower: true, strict: true })}-${nanoid(5)}`;
  } else {
    slug = slug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const existingBySlug = await ProfessionalPage.findOne({ slug });
    if (existingBySlug) {
      return result.reply({
        formErrors: ["Такой адрес страницы уже занят. Выберите другой."],
      });
    }
  }

  try {
    await connectDB();

    const profileFile = result.value.profileImage;
    const galleryFiles = (result.value.galleryImages ?? []).filter(
      (f: File) => f.size > 0 && f.name !== "undefined"
    );

    let profileImage: { id: string; originalName: string; uniqueName: string; url: string; fieldname?: string; versionId?: string; folderName: string } | undefined;
    let galleryImages: typeof profileImage[] = [];

    if (profileFile && profileFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("files", profileFile);
      const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);
      if (uploadResult.files.length > 0) {
        profileImage = uploadResult.files[0];
      }
    }

    if (galleryFiles.length > 0) {
      const uploadFormData = new FormData();
      galleryFiles.forEach((f) => uploadFormData.append("files", f));
      const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);
      galleryImages = uploadResult.files;
    }

    const publicId = nanoid(10);
    await professionalPageRepository.create({
      publicId,
      slug,
      user: user.id,
      displayName: result.value.displayName,
      description: result.value.description,
      profileImage,
      galleryImages,
      category: result.value.category,
      subCategory: result.value.subCategory,
      district: result.value.district,
      city: result.value.city,
      contactPhone: result.value.contactPhone,
      contactEmail: result.value.contactEmail,
      socialLinks:
        result.value.whatsapp ||
        result.value.instagram ||
        result.value.facebook ||
        result.value.website
          ? {
              whatsapp: result.value.whatsapp,
              instagram: result.value.instagram,
              facebook: result.value.facebook,
              website: result.value.website,
            }
          : undefined,
      isPublished: result.value.isPublished ?? true,
    });

    await User.findByIdAndUpdate(user.id, {
      hasPrivateProfessionalPage: true,
    });
  } catch (error) {
    console.error("publishProfessionalPage error:", error);
    return result.reply({
      formErrors: ["Не удалось создать страницу. Попробуйте позже."],
    });
  }

  revalidatePath("/professional", "layout");
  redirect(`/publish-ad/professional-page/edit/${publicId}`);
}
