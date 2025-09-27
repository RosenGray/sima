import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Test endpoint: Starting...');
    
    const formData = await request.formData();
    console.log('Test endpoint: Form data parsed');
    
    const files = formData.getAll('files') as File[];
    console.log('Test endpoint: Files received:', files.length);
    
    const folderName = formData.get('folderName') as string;
    const userId = formData.get('userId') as string;
    
    console.log('Test endpoint: Metadata:', { folderName, userId });
    
    // Log file details
    files.forEach((file, index) => {
      console.log(`Test endpoint: File ${index + 1}:`, {
        name: file.name,
        size: file.size,
        type: file.type
      });
    });
    
    return NextResponse.json({
      success: true,
      message: 'Test endpoint working',
      filesReceived: files.length,
      metadata: { folderName, userId },
      files: files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Test endpoint error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
