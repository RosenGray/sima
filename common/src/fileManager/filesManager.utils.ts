import { FileManagerHandler } from "./filesManager.types";

// Type guard to check if files exist and are in the correct format
export const isValidFiles = (files: any): files is Express.Multer.File[] => {
  return (
    Array.isArray(files) &&
    files.every(
      (file) =>
        file &&
        typeof file === "object" &&
        "buffer" in file &&
        "mimetype" in file
    )
  );
};

export function isFieldnameFileMap(
  files: FileManagerHandler["files"]
): files is { [fieldname: string]: Express.Multer.File[] } {
  return !Array.isArray(files);
}
