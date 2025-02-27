import { Request, Response, NextFunction } from "express";
import { FileValidationOptions } from "./filesManager.types";
import { isValidFiles } from "./filesManager.utils";

export class FileValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "FileValidationError";
    }
  }
  
// Middleware factory for file validation
export const validateFiles = (options: FileValidationOptions = {}) => {
    const {
      required = true,
      maxFiles = 10,
      allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"],
      maxFileSize = 5 * 1024 * 1024, // 5MB default
    } = options;
  
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        // Check if files exist when required
        if (!req.files) {
          if (required) {
            throw new FileValidationError("No files were uploaded");
          }
          return next();
        }
  
        // Validate files array
        if (!isValidFiles(req.files)) {
          throw new FileValidationError("Invalid file format");
        }
  
        const files = req.files as Express.Multer.File[];
  
        // Validate number of files
        if (files.length > maxFiles) {
          throw new FileValidationError(`Maximum ${maxFiles} files allowed`);
        }
  
        // Validate each file
        files.forEach((file, index) => {
          // Check file type
          if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new FileValidationError(
              `File ${
                index + 1
              } has invalid type. Allowed types: ${allowedMimeTypes.join(", ")}`
            );
          }
  
          // Check file size
          if (file.size > maxFileSize) {
            throw new FileValidationError(
              `File ${index + 1} exceeds maximum size of ${
                maxFileSize / 1024 / 1024
              }MB`
            );
          }
        });
  
        // If all validations pass, modify the request to include typed files
        req.validatedFiles = files;
        next();
      } catch (error) {
        if (error instanceof FileValidationError) {
          return res.status(400).json({ error: error.message });
        }
        next(error);
      }
    };
  };
  
  // Extend Express Request interface
declare global {
    namespace Express {
      interface Request {
        validatedFiles?: Express.Multer.File[];
      }
    }
  }