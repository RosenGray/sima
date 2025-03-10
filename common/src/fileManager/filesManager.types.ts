import { PutObjectCommandOutput } from "@aws-sdk/client-s3";

export type Files =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];

export interface FileManagerHandler {
  userId: string;
  folderName: string;
  files: Files;
}

export interface UploadResult {
  originalName: string;
  uniqueName: string;
  fieldname?: string;
  data: PutObjectCommandOutput;
  url: string;
}

export interface BackblazeConfig {
  region: string;
  bucketName: string;
  endpoint: string;
  accessKey: string;
  secretKey: string;
  baseUrl: string;
}

export interface FileValidationOptions {
  required?: boolean;
  maxFiles?: number;
  allowedMimeTypes?: string[];
  maxFileSize?: number; // in bytes
}
export interface FileToDelete {
  fileName: string;
  versionId?: string;
}
