import { useState, useCallback } from 'react';
import { FileUploadResponse, FileUploadError } from '@/types/fileUpload';
import { fileUploadService } from '@/lib/fileUpload';

export interface UseFileUploadOptions {
  folderName: string;
  userId: string;
  onSuccess?: (response: FileUploadResponse) => void;
  onError?: (error: FileUploadError) => void;
}

export interface UseFileUploadReturn {
  uploadFiles: (files: File[]) => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
  isUploading: boolean;
  error: string | null;
  lastResponse: FileUploadResponse | null;
  clearError: () => void;
  clearResponse: () => void;
}

export const useFileUpload = (options: UseFileUploadOptions): UseFileUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<FileUploadResponse | null>(null);

  const uploadFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      setError('No files selected');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const response = await fileUploadService.uploadFiles({
        folderName: options.folderName,
        userId: options.userId,
        files,
      });

      setLastResponse(response);
      options.onSuccess?.(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      options.onError?.({
        error: errorMessage,
        message: errorMessage,
      });
    } finally {
      setIsUploading(false);
    }
  }, [options]);

  const uploadFile = useCallback(async (file: File) => {
    await uploadFiles([file]);
  }, [uploadFiles]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearResponse = useCallback(() => {
    setLastResponse(null);
  }, []);

  return {
    uploadFiles,
    uploadFile,
    isUploading,
    error,
    lastResponse,
    clearError,
    clearResponse,
  };
};
