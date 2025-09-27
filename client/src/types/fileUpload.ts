import { z } from "zod";

export interface FileUploadRequest {
  folderName: string;
  userId: string;
  files: File[];
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  files: UploadedFile[];
  metadata: {
    totalFiles: number;
    folderName: string;
    userId: string;
  };
}

export interface UploadedFile {
  originalName: string;
  uniqueName: string;
  url: string;
  fieldname?: string;
}

export interface FileUploadError {
  error: string;
  message?: string;
  details?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}

export interface FileValidationOptions {
  maxFileSize: number;
  allowedMimeTypes: string[];
  maxFiles: number;
}

export interface FileUploadConfig {
  endpoint: string;
  validation: FileValidationOptions;
}

export const ImageSchema = z.object({
  src: z.string(),
  fileName: z.string(),
  versionId: z.string().optional(),
});

export type Image = z.infer<typeof ImageSchema>;

