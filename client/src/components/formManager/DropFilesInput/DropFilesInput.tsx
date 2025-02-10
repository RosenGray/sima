import React, { useCallback } from "react";
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
  accept?: AcceptedFileTypes;
  onFilesDrop?: (files: File[]) => void;
  maxSize?: number; // Optional max file size in bytes
  maxFiles?: number; // Add this new prop
  errors?: string[];
}

const DropFilesInput: React.FC<DropFilesInputProps> = ({
  field,
  accept,
  maxSize,
  maxFiles,
  errors,
}) => {
  const onDrop = useCallback((_acceptedFiles: File[]) => {
    // console.log("acceptedFiles", acceptedFiles);
    // acceptedFiles.map((file) =>
    //   Object.assign(file, {
    //     previewUrl: URL.createObjectURL(file),
    //   })
    // );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles, // Add this to useDropzone config
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
          {...conformGetInputProps(field, { type: "file", multiple: true })}
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
                (макс: {maxFiles} файлов, до {Math.round(maxSize! / 1024 / 1024)}MB - 1 файл)
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
