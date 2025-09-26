import { 
  FileUploadRequest, 
  FileUploadResponse, 
  FileUploadError,
  FileUploadConfig 
} from '@/types/fileUpload';

const DEFAULT_CONFIG: FileUploadConfig = {
  endpoint: '/api/files/create',
  validation: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    maxFiles: 10,
  }
};

export class FileUploadService {
  private config: FileUploadConfig;

  constructor(config?: Partial<FileUploadConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Upload single or multiple files
   */
  async uploadFiles(request: FileUploadRequest): Promise<FileUploadResponse> {
    // Validate files before upload
    this.validateFiles(request.files);

    // Create FormData
    const formData = new FormData();
    formData.append('folderName', request.folderName);
    formData.append('userId', request.userId);
    
    // Append files
    request.files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      return result as FileUploadResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      throw new Error('Upload failed: Unknown error');
    }
  }

  /**
   * Upload a single file
   */
  async uploadFile(
    file: File, 
    folderName: string, 
    userId: string
  ): Promise<FileUploadResponse> {
    return this.uploadFiles({
      folderName,
      userId,
      files: [file]
    });
  }

  /**
   * Validate files before upload
   */
  private validateFiles(files: File[]): void {
    if (files.length === 0) {
      throw new Error('No files provided');
    }

    if (files.length > this.config.validation.maxFiles) {
      throw new Error(
        `Maximum ${this.config.validation.maxFiles} files allowed, received ${files.length}`
      );
    }

    files.forEach(file => {
      // Check file size
      if (file.size > this.config.validation.maxFileSize) {
        throw new Error(
          `File ${file.name} exceeds maximum size of ${
            this.config.validation.maxFileSize / (1024 * 1024)
          }MB`
        );
      }

      // Check file type
      if (!this.config.validation.allowedMimeTypes.includes(file.type)) {
        throw new Error(
          `File type ${file.type} is not allowed. Allowed types: ${
            this.config.validation.allowedMimeTypes.join(', ')
          }`
        );
      }
    });
  }

  /**
   * Get upload configuration
   */
  getConfig(): FileUploadConfig {
    return { ...this.config };
  }

  /**
   * Update upload configuration
   */
  updateConfig(config: Partial<FileUploadConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// Default instance
export const fileUploadService = new FileUploadService();

// Utility functions
export const createFileUploadService = (config?: Partial<FileUploadConfig>) => {
  return new FileUploadService(config);
};

export const uploadFiles = async (request: FileUploadRequest): Promise<FileUploadResponse> => {
  return fileUploadService.uploadFiles(request);
};

export const uploadFile = async (
  file: File, 
  folderName: string, 
  userId: string
): Promise<FileUploadResponse> => {
  return fileUploadService.uploadFile(file, folderName, userId);
};
