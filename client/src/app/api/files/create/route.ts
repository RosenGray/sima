import { NextRequest, NextResponse } from 'next/server';
import { FileManager } from '@sima-board/common';
import { z } from 'zod';

// Route configuration for file uploads
export const config = {
  maxDuration: 60, // 60 seconds timeout
  runtime: 'nodejs', // Use Node.js runtime for better file handling
};

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
    console.log('Starting file upload process...');
    
    // Parse form data with timeout handling
    const formData = await request.formData();
    console.log('Form data parsed successfully');
    
    // Extract metadata
    const folderName = formData.get('folderName') as string;
    const userId = formData.get('userId') as string;
    
    console.log('Metadata extracted:', { folderName, userId });
    
    // Validate metadata
    const validationResult = FileUploadSchema.safeParse({ folderName, userId });
    if (!validationResult.success) {
      console.log('Validation failed:', validationResult.error.errors);
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
    
    console.log('Files received:', fileEntries.length);
    
    // Handle both single file and multiple files
    if (fileEntries.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Validate files with detailed logging
    for (let i = 0; i < fileEntries.length; i++) {
      const file = fileEntries[i];
      console.log(`Validating file ${i + 1}/${fileEntries.length}:`, {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      if (!file || file.size === 0) {
        console.log('Invalid file detected:', file);
        return NextResponse.json(
          { error: 'Invalid file detected' },
          { status: 400 }
        );
      }

      // Check file size
      if (file.size > FILE_VALIDATION.maxFileSize) {
        console.log('File size exceeded:', file.name, file.size);
        return NextResponse.json(
          { 
            error: `File ${file.name} exceeds maximum size of ${FILE_VALIDATION.maxFileSize / (1024 * 1024)}MB` 
          },
          { status: 400 }
        );
      }

      // Check file type
      if (!FILE_VALIDATION.allowedMimeTypes.includes(file.type)) {
        console.log('File type not allowed:', file.name, file.type);
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

    console.log('All files validated successfully, converting to multer format...');

    // Convert File objects to Express.Multer.File format for FileManager
    // Process files sequentially to avoid memory issues with large files
    const multerFiles: Express.Multer.File[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(`Processing file ${i + 1}/${files.length}: ${file.name}`);
      
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const multerFile = {
          fieldname: 'files',
          originalname: file.name,
          encoding: '7bit',
          mimetype: file.type,
          buffer: buffer,
          size: file.size,
        } as Express.Multer.File;
        
        multerFiles.push(multerFile);
        console.log(`File ${i + 1} processed successfully`);
      } catch (error) {
        console.error(`Error processing file ${i + 1}:`, error);
        return NextResponse.json(
          { 
            error: `Failed to process file ${file.name}`,
            message: error instanceof Error ? error.message : 'Unknown error'
          },
          { status: 500 }
        );
      }
    }

    console.log('All files converted, initializing FileManager...');

    // Initialize FileManager
    const fileManager = new FileManager({
        bucketName: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME,
        endpoint: process.env.NEXT_PUBLIC_BACKBLAZEB_ENDPOINT,
        region: process.env.NEXT_PUBLIC_BACKBLAZEB_REGION,
        accessKey: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY,
        secretKey: process.env.NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY,
        baseUrl: process.env.NEXT_PUBLIC_BACKBLAZEB_BASE_URL,
      });

    console.log('FileManager initialized, starting upload...');

    // Upload files
    const uploadResults = await fileManager.uploadFiles({
      userId: validationResult.data.userId,
      folderName: validationResult.data.folderName,
      files: multerFiles,
    });

    console.log('Upload completed successfully:', uploadResults.length, 'files');

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

    console.log('Response prepared, sending...');
    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('File upload error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
      },
      { status: 500 }
    );
  }
}