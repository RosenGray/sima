import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./DropFilesInput.module.scss";
import { UploadIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import {
  FieldMetadata,
  getInputProps as conformGetInputProps,
} from "@conform-to/react";

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
  const { id, name, type } = conformGetInputProps(field, {
    type: "file",
  });

  const onDrop = useCallback(
    (newFiles: File[]) => {
      const updatedFiles = [...files];
      console.log("updatedFiles before", updatedFiles);

      newFiles.forEach((file) => {
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
    [files]
  );

  useEffect(() => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
    const fileInputElement = document.getElementById(id) as HTMLInputElement;
    if (fileInputElement) {
      fileInputElement.files = dataTransfer.files;
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles, // Add this to useDropzone config
    multiple: maxFiles === 1 ? false : true,
    disabled,
  });

  return (
    <section className={styles.dropzone}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone__container} ${
          isDragActive ? styles["dropzone__container--active"] : ""
        }`}
      >
        <input
          {...getInputProps()}
          id={id}
          name={name}
          type={type}
          disabled={disabled}
        />
        <p className={styles.dropzone__text}>
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
                (макс: {maxFiles} файлов, до{" "}
                {Math.round(maxSize! / 1024 / 1024)}MB - 1 файл)
              </span>
            </span>
          )}
        </p>
        <Text as="p" align="center" weight="bold" size="2" color="red">
          {errors}
        </Text>
      </div>
    </section>
  );
};

export default DropFilesInput;
