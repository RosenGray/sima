'use server';
import { parseWithZod } from "@conform-to/zod";
import { ProfessionalServiceSchema } from "../types/professional-service.scema";
import { getCurrentUser } from "@/lib/auth/utils/auth.utils";

// Type for the files API response
interface FileUploadResponse {
  success: boolean;
  message: string;
  files: Array<{
    originalName: string;
    uniqueName: string;
    url: string;
    fieldname: string;
  }>;
  metadata: {
    totalFiles: number;
    folderName: string;
    userId: string;
  };
}

export async function publishProfessionalServiceAd(initialState: unknown, formData: FormData) {
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
      uploadFormData.append('files', file);
    });
    
    // Add metadata
    uploadFormData.append('folderName', 'professionals');
    uploadFormData.append('userId', user.id); // You'll need to get this from auth context

    // Send request to files API route
    const response = await fetch('/api/files/create', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload files');
    }

    const uploadResult: FileUploadResponse = await response.json();
    
    // Return success response with uploaded file data
    return {
      status: "success" as const,
      value: {
        ...result.value,
        uploadResult
      },
    };

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
}
