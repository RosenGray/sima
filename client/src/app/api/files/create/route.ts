import { NextRequest, NextResponse } from 'next/server';
import { FileManager } from '@sima-board/common';

// Route configuration for file uploads
export const config = {
  maxDuration: 60, // 60 seconds timeout
  runtime: 'nodejs', // Use Node.js runtime for better file handling
};

export async function GET() {
  return NextResponse.json({ 
    message: 'Files API is running',
    supportedMethods: ['POST']
  });
}

export interface FileUploadResponse {
  success: boolean;
  message: string;
  files: Array<{
    originalName: string;
    uniqueName: string;
    url: string;
    fieldname: string;
    versionId?: string;
    folderName: string;
  }>;
  metadata: {
    totalFiles: number;
    folderName: string;
    userId: string;
  };
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

    // Get all files from form data
    const fileEntries = formData.getAll('files') as File[];
    
    console.log('Files received:', fileEntries.length);
    
    // Handle both single file and multiple files
    if (fileEntries.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    console.log('Converting files to multer format...');

    // Convert File objects to Express.Multer.File format for FileManager
    // Process files sequentially to avoid memory issues with large files
    const multerFiles: Express.Multer.File[] = [];
    
    for (let i = 0; i < fileEntries.length; i++) {
      const file = fileEntries[i];
      console.log(`Processing file ${i + 1}/${fileEntries.length}: ${file.name}`);
      
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
      userId: userId,
      folderName: folderName,
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
        versionId: result.data.VersionId,
        url: result.url,
        fieldname: result.fieldname,
        folderName: folderName,
      })),
      metadata: {
        totalFiles: uploadResults.length,
        folderName: folderName,
        userId: userId,
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