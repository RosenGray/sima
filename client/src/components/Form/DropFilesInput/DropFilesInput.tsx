import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import {
  FieldMetadata,
  getInputProps as conformGetInputProps,
} from "@conform-to/react";
import {
  DropzoneContainer,
  DropzoneError,
  DropzoneText,
} from "./DropFilesInput.styles";

type AcceptedFileTypes =
  | {
      [key: string]: string[];
    }
  | undefined;

interface DropFilesInputProps {
  // Accept either a MIME type group (e.g., 'image/*') or specific types (e.g., {'.jpg': [], '.gif': []})
  field: FieldMetadata<File[] | undefined>;
  onFilesDrop: (files: File[]) => void;
  files: File[];
  accept?: AcceptedFileTypes;
  maxSize?: number; // Optional max file size in bytes
  maxFiles?: number; // Add this new prop
  errors?: string[];
  disabled?: boolean;
}

const DropFilesInput: React.FC<DropFilesInputProps> = ({
  field,
  onFilesDrop,
  files,
  accept,
  maxSize,
  maxFiles,
  errors,
  disabled,
}) => {
  const { id, name, type,form   } = conformGetInputProps(field, {
    type: "file",
  });

  const onDrop = useCallback(
    (newFiles: File[]) => {
      const updatedFiles = [...files];

      newFiles.forEach((file) => {
        // Check if we've reached the maxFiles limit
        if (maxFiles && updatedFiles.length >= maxFiles) {
          return; // Skip adding more files if limit reached
        }

        //Check if file with the same name already exists
        const existingFileIndex = updatedFiles.findIndex(
          (f) => f.name === file.name
        );
        if (existingFileIndex !== -1) {
          updatedFiles[existingFileIndex] = file;
        } else {
          updatedFiles.push(file);
        }
      });

      onFilesDrop(updatedFiles);
    },
    [files, onFilesDrop, maxFiles]
  );

  useEffect(() => {
    const dataTransfer = new DataTransfer();
    if (maxFiles && files.length > maxFiles) {
      files.slice(0, maxFiles).forEach((file) => {
        dataTransfer.items.add(file);
      });
    } else {
      files.forEach((file) => {
        dataTransfer.items.add(file);
      });
    }
    const fileInputElement = document.getElementById(id) as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.files = dataTransfer.files;
    }
  }, [files, id, maxFiles]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles, // Add this to useDropzone config
    multiple: maxFiles === 1 ? false : true,
    disabled,
  });

  return (
    <DropzoneContainer {...getRootProps()} $isDragActive={isDragActive}>
      <input
        {...getInputProps()}
        form={form}
        id={id}
        name={name}
        type={type}
        disabled={disabled}
      />
      <DropzoneText>
        <IconButton variant="soft" size="3" mb="20px">
          <UploadIcon />
        </IconButton>
        {isDragActive ? (
          "Перетащите файлы сюда..."
        ) : (
          <span>
            Перетащите файлы сюда или нажмите, чтобы выбрать файлы
            <br />
            <span>
              (макс: {maxFiles} файлов, до {Math.round(maxSize! / 1024 / 1024)}
              MB - 1 файл)
            </span>
          </span>
        )}
      </DropzoneText>
      {errors && (
        <DropzoneError as="p" align="center" weight="bold" size="2" color="red">
          {errors}
        </DropzoneError>
      )}
    </DropzoneContainer>
  );
};

export default DropFilesInput;
