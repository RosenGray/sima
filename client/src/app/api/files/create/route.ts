import { NextRequest, NextResponse } from 'next/server';
import { FileManager } from '@sima-board/common';
import { z } from 'zod';

// Validation schema for file uploads
const FileUploadSchema = z.object({
  folderName: z.string().min(1, 'Folder name is required'),
  userId: z.string().min(1, 'User ID is required'),
});

// File validation options
const FILE_VALIDATION = {
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
};

export async function GET() {
  return NextResponse.json({ 
    message: 'Files API is running',
    supportedMethods: ['POST'],
    maxFileSize: FILE_VALIDATION.maxFileSize,
    allowedMimeTypes: FILE_VALIDATION.allowedMimeTypes,
    maxFiles: FILE_VALIDATION.maxFiles
  });
}

export async function POST(request: NextRequest) {
  try {
   
    debugger;
    // Parse form data
    const formData = await request.formData();
    console.log(123)
    
    // Extract metadata
    const folderName = formData.get('folderName') as string;
    const userId = formData.get('userId') as string;
    
    // Validate metadata
    const validationResult = FileUploadSchema.safeParse({ folderName, userId });
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    // Get all files from form data
    const files: File[] = [];
    const fileEntries = formData.getAll('files') as File[];
    
    // Handle both single file and multiple files
    if (fileEntries.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate files
    for (const file of fileEntries) {
      if (!file || file.size === 0) {
        return NextResponse.json(
          { error: 'Invalid file detected' },
          { status: 400 }
        );
      }

      // Check file size
      if (file.size > FILE_VALIDATION.maxFileSize) {
        return NextResponse.json(
          { 
            error: `File ${file.name} exceeds maximum size of ${FILE_VALIDATION.maxFileSize / (1024 * 1024)}MB` 
          },
          { status: 400 }
        );
      }

      // Check file type
      if (!FILE_VALIDATION.allowedMimeTypes.includes(file.type)) {
        return NextResponse.json(
          { 
            error: `File type ${file.type} is not allowed. Allowed types: ${FILE_VALIDATION.allowedMimeTypes.join(', ')}` 
          },
          { status: 400 }
        );
      }

      files.push(file);
    }

    // Check total file count
    if (files.length > FILE_VALIDATION.maxFiles) {
      return NextResponse.json(
        { 
          error: `Maximum ${FILE_VALIDATION.maxFiles} files allowed, received ${files.length}` 
        },
        { status: 400 }
      );
    }

    // Convert File objects to Express.Multer.File format for FileManager
    const multerFiles: Express.Multer.File[] = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          fieldname: 'files',
          originalname: file.name,
          encoding: '7bit',
          mimetype: file.type,
          buffer: buffer,
          size: file.size,
        } as Express.Multer.File;
      })
    );

    // Initialize FileManager
    const fileManager = new FileManager({
        bucketName: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME,
        endpoint: process.env.NEXT_PUBLIC_BACKBLAZEB_ENDPOINT,
        region: process.env.NEXT_PUBLIC_BACKBLAZEB_REGION,
        accessKey: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
        secretKey: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
        baseUrl: process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL,
      });

    // Upload files
    const uploadResults = await fileManager.uploadFiles({
      userId: validationResult.data.userId,
      folderName: validationResult.data.folderName,
      files: multerFiles,
    });

    // Format response
    const response = {
      success: true,
      message: `Successfully uploaded ${uploadResults.length} file(s)`,
      files: uploadResults.map(result => ({
        originalName: result.originalName,
        uniqueName: result.uniqueName,
        url: result.url,
        fieldname: result.fieldname,
      })),
      metadata: {
        totalFiles: uploadResults.length,
        folderName: validationResult.data.folderName,
        userId: validationResult.data.userId,
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('File upload error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}