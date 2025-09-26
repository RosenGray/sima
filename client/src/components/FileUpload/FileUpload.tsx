'use client';

import React, { useRef, useState } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { FileUploadResponse } from '@/types/fileUpload';
import * as Styled from './FileUpload.styles';

export interface FileUploadProps {
  folderName: string;
  userId: string;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  onSuccess?: (response: FileUploadResponse) => void;
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  folderName,
  userId,
  multiple = true,
  accept,
  maxFiles = 10,
  onSuccess,
  onError,
  className,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { uploadFiles, isUploading, error, lastResponse, clearError } = useFileUpload({
    folderName,
    userId,
    onSuccess: (response) => {
      setSelectedFiles([]);
      onSuccess?.(response);
    },
    onError: (error) => {
      onError?.(error.error);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length > maxFiles) {
      onError?.(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setSelectedFiles(files);
    clearError();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      onError?.('Please select files to upload');
      return;
    }

    await uploadFiles(selectedFiles);
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Styled.Container className={className}>
      <Styled.UploadArea>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          style={{ display: 'none' }}
        />
        
        <Styled.DropZone
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          disabled={disabled || isUploading}
        >
          <Styled.UploadIcon />
          <Styled.UploadText>
            {isUploading ? 'Uploading...' : 'Click to select files or drag and drop'}
          </Styled.UploadText>
          <Styled.UploadSubtext>
            {multiple ? `Up to ${maxFiles} files` : 'Single file only'}
          </Styled.UploadSubtext>
        </Styled.DropZone>
      </Styled.UploadArea>

      {selectedFiles.length > 0 && (
        <Styled.FileList>
          <Styled.FileListHeader>
            <span>Selected Files ({selectedFiles.length})</span>
            <Styled.ClearButton onClick={handleClearFiles}>
              Clear All
            </Styled.ClearButton>
          </Styled.FileListHeader>
          
          {selectedFiles.map((file, index) => (
            <Styled.FileItem key={index}>
              <Styled.FileInfo>
                <Styled.FileName>{file.name}</Styled.FileName>
                <Styled.FileSize>{formatFileSize(file.size)}</Styled.FileSize>
              </Styled.FileInfo>
              <Styled.RemoveButton onClick={() => handleRemoveFile(index)}>
                ×
              </Styled.RemoveButton>
            </Styled.FileItem>
          ))}
        </Styled.FileList>
      )}

      {error && (
        <Styled.ErrorMessage>
          {error}
        </Styled.ErrorMessage>
      )}

      {lastResponse && (
        <Styled.SuccessMessage>
          {lastResponse.message}
        </Styled.SuccessMessage>
      )}

      {selectedFiles.length > 0 && (
        <Styled.UploadButton
          onClick={handleUpload}
          disabled={disabled || isUploading}
        >
          {isUploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
        </Styled.UploadButton>
      )}
    </Styled.Container>
  );
};
