import { FileManager } from "@sima-board/common";
import { Readable } from "stream";

// Route configuration for file uploads
export const config = {
  maxDuration: 60, // 60 seconds timeout
  runtime: "nodejs", // Use Node.js runtime for better file handling
};

// Define multer-like file interface for FileManager compatibility
// Extends the base properties needed for Express.Multer.File
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  stream: Readable;
  destination: string;
  filename: string;
  path: string;
}

export interface FileUploadItem {
  id: string;
  originalName: string;
  uniqueName: string;
  url: string;
  fieldname: string;
  versionId?: string;
  folderName: string;
}
export interface FileUploadResponse {
  success: boolean;
  message: string;
  files: Array<FileUploadItem>;
  metadata: {
    totalFiles: number;
    folderName: string;
    userId: string;
  };
}

export interface ExistingImageItem extends FileUploadItem {
  toBeDeleted: boolean;
  isExisting: boolean;
}

export const uploadFiles = async (
  folderName: string,
  userId: string,
  formData: FormData
):Promise<FileUploadResponse> => {
  try {
    console.log('bla')
    console.log("Starting file upload process...");
    console.log("Metadata extracted:", { folderName, userId });
    // Get all files from form data
    const fileEntries = formData.getAll("files") as File[];

    console.log("Files received:", fileEntries.length);
    if (fileEntries.length === 0) {
      throw new Error("No files provided");
    }
    console.log("Converting files to multer format...");
    // Convert File objects to MulterFile format for FileManager
    // Process files sequentially to avoid memory issues with large files
    const multerFiles: MulterFile[] = [];
    for (let i = 0; i < fileEntries.length; i++) {
      const file = fileEntries[i];
      console.log(
        `Processing file ${i + 1}/${fileEntries.length}: ${file.name}`
      );

      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const multerFile: MulterFile = {
          fieldname: "files",
          originalname: file.name,
          encoding: "7bit",
          mimetype: file.type,
          buffer: buffer,
          size: file.size,
          // Properties required for Express.Multer.File interface but not used in Next.js
          stream: new Readable(),
          destination: "",
          filename: file.name,
          path: "",
        };

        multerFiles.push(multerFile);
        console.log(`File ${i + 1} processed successfully`);
      } catch (error) {
        console.error(`Error processing file ${i + 1}:`, error);
        throw new Error(`Failed to process file ${file.name}`);
      }
    }
    console.log("All files converted, initializing FileManager...");

    // Initialize FileManager
    const fileManager = new FileManager({
      bucketName: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME,
      endpoint: process.env.NEXT_PUBLIC_BACKBLAZEB_ENDPOINT,
      region: process.env.NEXT_PUBLIC_BACKBLAZEB_REGION,
      accessKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
      secretKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
      baseUrl: process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL,
    });

    console.log("FileManager initialized, starting upload...");

    // Upload files
    const uploadResults = await fileManager.uploadFiles({
      userId: userId,
      folderName: folderName,
      files: multerFiles,
    });

    console.log(
      "Upload completed successfully:",
      uploadResults.length,
      "files"
    );

    // Format response
    const response = {
      success: true,
      message: `Successfully uploaded ${uploadResults.length} file(s)`,
      files: uploadResults.map((result) => ({
        originalName: result.originalName,
        uniqueName: result.uniqueName,
        versionId: result.data.VersionId,
        url: result.url,
        fieldname: result.fieldname,
        folderName: folderName,
      })),
      metadata: {
        totalFiles: uploadResults.length,
        folderName: folderName,
        userId: userId,
      },
    };

    console.log("Response prepared, sending...");
    return response;
  } catch (error) {
    throw new Error(
      `Failed to upload files: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};
