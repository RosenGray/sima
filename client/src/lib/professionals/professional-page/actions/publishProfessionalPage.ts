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

const FOLDER = "professional-page";

export async function publishProfessionalPage(
  _initialState: unknown,
  formData: FormData,
) {
  const result = parseWithZod(formData, {
    schema: createProfessionalPageSchema({ minGalleryImages: 1 }),
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
      formErrors: [
        "У вас уже есть персональная страница. Перейдите в Личный кабинет на редактирования.",
      ],
    });
  }

  const { profileImage, galleryImages, slug, slugPrefix } = result.value;

  try {
    const uploadFormData = new FormData();

    if (profileImage) {
      profileImage.forEach((file: File) => {
        uploadFormData.append("files", file);
      });
    }

    galleryImages.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles(FOLDER, user.id, uploadFormData);

    await connectDB();

    const professionalPage = new ProfessionalPage({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      acceptTerms: result.value.acceptTerms === "on",
      profileImage: uploadResult.files[0],
      galleryImages: uploadResult.files.slice(1), 
    });

    await professionalPage.save();

    await User.findByIdAndUpdate(user.id, {
      hasPrivateProfessionalPage: true,
    });
  } catch (error) {
    if (error instanceof Error) {
      return result.reply({
        formErrors: ["Неизвестная ошибка"],
      });
    }
    return result.reply({
      formErrors: ["Неизвестная ошибка"],
    });
  }

  revalidatePath("/professional", "layout");
  redirect(`/professional/${slug}-${slugPrefix}`);
}
