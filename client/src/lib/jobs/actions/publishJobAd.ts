"use server";
import { parseWithZod } from "@conform-to/zod";
import { createJobSchema } from "../types/job.schema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { Job } from "../models/Job";
import connectDB from "@/lib/mongo/mongodb";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { uploadFiles } from "@/lib/files/uploadFiles";

export async function publishJobAd(
  initialState: unknown,
  formData: FormData
) {
  const result = parseWithZod(formData, {
    schema: createJobSchema({ minNumberOfImages: 1 }),
  });

  if (result.status !== "success") return result.reply();
  const user = await getCurrentUser();
  if (!user) {
    return result.reply({
      formErrors: ["Что-то пошло не так, попробуйте позже"],
    });
  }

  const { images } = result.value;

  try {
    // Create FormData for file upload
    const uploadFormData = new FormData();

    // Add files to FormData
    images.forEach((file: File) => {
      uploadFormData.append("files", file);
    });

    const uploadResult = await uploadFiles("jobs", user.id, uploadFormData);

    await connectDB();

    const job = new Job({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
    await job.save();
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
  revalidatePath("/jobs", "layout");
  redirect("/jobs");
}
