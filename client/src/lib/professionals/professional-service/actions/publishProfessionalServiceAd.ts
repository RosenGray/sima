"use server";
import { parseWithZod } from "@conform-to/zod";
import { ProfessionalServiceSchema } from "../types/professional-service.scema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";
import { ProfessionalService } from "../models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";
import { FileUploadResponse } from "@/app/api/files/create/route";
import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";



export async function publishProfessionalServiceAd(
  initialState: unknown,
  formData: FormData
) {
  
  //fake 5 sec await
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const result = parseWithZod(formData, { schema: ProfessionalServiceSchema });

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

    const professionalService = new ProfessionalService({
      ...result.value,
      user: user.id,
      publicId: nanoid(10),
      acceptTerms: result.value.acceptTerms === "on",
      images: uploadResult.files,
    });
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
