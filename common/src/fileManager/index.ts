import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import {
  BackblazeConfig,
  FileManagerHandler,
  FileToDelete,
  UploadResult,
} from "./filesManager.types";
import { isFieldnameFileMap } from "./filesManager.utils";

class FileManager {
  private s3Client: S3Client;
  private config: BackblazeConfig;

  constructor(config?: Partial<BackblazeConfig>) {
    this.config = this.initializeConfig(config);
    this.validateConfig();
    this.s3Client = this.initializeS3Client();
  }

  private initializeConfig(
    configOverrides?: Partial<BackblazeConfig>
  ): BackblazeConfig {
    const defaultConfig: BackblazeConfig = {
      region: process.env.BACKBLAZEB_REGION ?? "",
      bucketName: process.env.BACKBLAZEB_PUBLIC_BUCKET_NAME ?? "",
      endpoint: process.env.BACKBLAZEB_ENDPOINT ?? "",
      accessKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY ?? "",
      secretKey: process.env.BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY ?? "",
      baseUrl: process.env.BACKBLAZEB_BASE_URL ?? "",
    };

    return {
      ...defaultConfig,
      ...configOverrides,
    };
  }

  private validateConfig(): void {
    const missingConfigs = Object.entries(this.config)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingConfigs.length > 0) {
      throw new Error(
        `Missing required Backblaze configuration: ${missingConfigs.join(", ")}`
      );
    }
  }

  private initializeS3Client(): S3Client {
    return new S3Client({
      region: this.config.region,
      endpoint: this.config.endpoint,
      credentials: {
        accessKeyId: this.config.accessKey,
        secretAccessKey: this.config.secretKey,
      },
    });
  }

  private async uploadSingleFile(
    file: Express.Multer.File,
    folderPath: string,
    fieldname?: string
  ): Promise<UploadResult> {
    const buffer = file.buffer;
    const originalName = file.originalname;
    const fileExtension = originalName.split(".").pop() || "";
    const uniqueFileName = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${fileExtension}`;
    const url = `${this.config.baseUrl}/${this.config.bucketName}/${folderPath}/${uniqueFileName}`;

    const params = {
      Bucket: this.config.bucketName,
      Key: `${folderPath}/${uniqueFileName}`,
      Body: buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await this.s3Client.send(new PutObjectCommand(params));
      return {
        originalName: file.originalname,
        uniqueName: uniqueFileName,
        fieldname: fieldname || file.fieldname,
        data,
        url,
      };
    } catch (err) {
      console.error("Error uploading file:", err);
      throw new Error(
        `Failed to upload file ${originalName}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  }

  private async deleteSingleFile(
    file: FileToDelete,
    folderPath: string
  ): Promise<void> {
    const params = {
      Bucket: this.config.bucketName,
      Key: `${folderPath}/${file.fileName}`,
      VersionId: file.versionId,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
    } catch (err) {
      console.error("Error deleting file:", err);
      throw new Error(
        `Failed to delete file ${file.fileName}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  }

  private getFullFolderPath(userId: string, folderName: string): string {
    return `${folderName}/${userId}`;
  }

  public async uploadFiles({
    userId,
    folderName,
    files,
  }: FileManagerHandler): Promise<UploadResult[]> {
    const fullFolderPath = this.getFullFolderPath(userId, folderName);
    let uploadPromises: Promise<UploadResult>[] = [];

    if (isFieldnameFileMap(files)) {
      Object.entries(files).forEach(([fieldname, fileArray]) => {
        const promises = fileArray.map((file) =>
          this.uploadSingleFile(file, fullFolderPath, fieldname)
        );
        uploadPromises = uploadPromises.concat(promises);
      });
    } else {
      uploadPromises = files.map((file) =>
        this.uploadSingleFile(file, fullFolderPath)
      );
    }

    return Promise.all(uploadPromises);
  }

  public async deleteFiles(
    userId: string,
    folderName: string,
    files: FileToDelete[]
  ): Promise<void> {
    const fullFolderPath = this.getFullFolderPath(userId, folderName);

    if (files.length > 1) {
      const params = {
        Bucket: this.config.bucketName,
        Delete: {
          Objects: files.map((file) => ({
            Key: `${fullFolderPath}/${file.fileName}`,
            VersionId: file.versionId,
          })),
          Quiet: false,
        },
      };

      try {
        await this.s3Client.send(new DeleteObjectsCommand(params));
      } catch (err) {
        console.error("Error deleting multiple files:", err);
        throw new Error(
          `Failed to delete files: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }
    } else if (files.length === 1) {
      await this.deleteSingleFile(files[0], fullFolderPath);
    }
  }
}

export { FileManager };

// Usage example:
/*
const fileManager = new FileManager();

// Upload files
const uploadResults = await fileManager.uploadFiles({
  userId: "user123",
  folderName: "uploads",
  files: myFiles
});

// Delete files
await fileManager.deleteFiles("user123", "uploads", ["file1.jpg", "file2.pdf"]);
*/
