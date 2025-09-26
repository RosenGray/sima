# File Upload Component

A comprehensive file upload solution for Next.js 15.4.6 that handles both single and multiple file uploads with validation, progress tracking, and integration with the existing FileManager.

## Features

- ✅ Single and multiple file upload support
- ✅ File validation (size, type, count limits)
- ✅ Progress tracking and error handling
- ✅ Integration with existing FileManager (Backblaze S3)
- ✅ TypeScript support with full type safety
- ✅ React hooks for easy integration
- ✅ Styled components with Radix UI theme
- ✅ Drag and drop interface
- ✅ File preview and management

## API Route

### POST `/api/files/create`

Handles file uploads with the following features:

#### Request Format
```typescript
// FormData with the following fields:
{
  folderName: string;    // Required: Target folder name
  userId: string;        // Required: User identifier
  files: File[];         // Required: One or more files
}
```

#### Response Format
```typescript
{
  success: boolean;
  message: string;
  files: Array<{
    originalName: string;
    uniqueName: string;
    url: string;
    fieldname?: string;
  }>;
  metadata: {
    totalFiles: number;
    folderName: string;
    userId: string;
  };
}
```

#### Validation Rules
- **Max file size**: 10MB per file
- **Max files**: 10 files per request
- **Allowed types**: Images (JPEG, PNG, GIF, WebP), PDF, Text, Word documents
- **Required fields**: folderName, userId, files

## Usage

### 1. Basic File Upload Component

```tsx
import { FileUpload } from '@/components/FileUpload';

export default function MyPage() {
  return (
    <FileUpload
      folderName="uploads"
      userId="user123"
      multiple={true}
      maxFiles={5}
      onSuccess={(response) => console.log('Upload successful:', response)}
      onError={(error) => console.error('Upload failed:', error)}
    />
  );
}
```

### 2. Using the Hook

```tsx
import { useFileUpload } from '@/hooks/useFileUpload';

export default function MyComponent() {
  const { uploadFiles, isUploading, error, lastResponse } = useFileUpload({
    folderName: 'documents',
    userId: 'user123',
    onSuccess: (response) => {
      console.log('Files uploaded:', response.files);
    },
    onError: (error) => {
      console.error('Upload error:', error);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    uploadFiles(files);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileSelect} />
      {isUploading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {lastResponse && <p>Uploaded {lastResponse.metadata.totalFiles} files</p>}
    </div>
  );
}
```

### 3. Using the Service Directly

```tsx
import { fileUploadService } from '@/lib/fileUpload';

export default function MyComponent() {
  const handleUpload = async (files: File[]) => {
    try {
      const response = await fileUploadService.uploadFiles({
        folderName: 'uploads',
        userId: 'user123',
        files,
      });
      console.log('Upload successful:', response);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <input 
      type="file" 
      multiple 
      onChange={(e) => handleUpload(Array.from(e.target.files || []))} 
    />
  );
}
```

## Component Props

### FileUpload Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `folderName` | `string` | - | **Required**: Target folder name |
| `userId` | `string` | - | **Required**: User identifier |
| `multiple` | `boolean` | `true` | Allow multiple file selection |
| `accept` | `string` | - | File type restrictions (e.g., "image/*") |
| `maxFiles` | `number` | `10` | Maximum number of files |
| `onSuccess` | `(response: FileUploadResponse) => void` | - | Success callback |
| `onError` | `(error: string) => void` | - | Error callback |
| `className` | `string` | - | Additional CSS class |
| `disabled` | `boolean` | `false` | Disable the component |

### useFileUpload Hook

| Option | Type | Description |
|--------|------|-------------|
| `folderName` | `string` | **Required**: Target folder name |
| `userId` | `string` | **Required**: User identifier |
| `onSuccess` | `(response: FileUploadResponse) => void` | Success callback |
| `onError` | `(error: FileUploadError) => void` | Error callback |

#### Hook Returns

| Property | Type | Description |
|----------|------|-------------|
| `uploadFiles` | `(files: File[]) => Promise<void>` | Upload multiple files |
| `uploadFile` | `(file: File) => Promise<void>` | Upload single file |
| `isUploading` | `boolean` | Upload in progress |
| `error` | `string \| null` | Current error message |
| `lastResponse` | `FileUploadResponse \| null` | Last successful response |
| `clearError` | `() => void` | Clear error state |
| `clearResponse` | `() => void` | Clear response state |

## File Validation

The system automatically validates files based on:

- **File size**: Maximum 10MB per file
- **File type**: Only allowed MIME types
- **File count**: Maximum 10 files per request
- **File integrity**: Non-empty files only

### Customizing Validation

You can customize validation by creating a new FileUploadService instance:

```tsx
import { createFileUploadService } from '@/lib/fileUpload';

const customUploadService = createFileUploadService({
  validation: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 3,
    allowedMimeTypes: ['image/jpeg', 'image/png'],
  },
});
```

## Error Handling

The system provides comprehensive error handling for:

- **Validation errors**: File size, type, or count violations
- **Network errors**: Connection issues or timeouts
- **Server errors**: Backend processing failures
- **Storage errors**: File storage or upload failures

## Environment Variables

Ensure the following environment variables are set for the FileManager:

```env
BACKBLAZEB_REGION=your-region
BACKBLAZEB_PUBLIC_BUCKET_NAME=your-bucket-name
BACKBLAZEB_ENDPOINT=your-endpoint
BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY=your-access-key
BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY=your-secret-key
BACKBLAZEB_BASE_URL=your-base-url
```

## Examples

See `FileUploadExample.tsx` for a complete working example that demonstrates:

- File selection and preview
- Upload progress tracking
- Success and error handling
- Result display with file URLs

## TypeScript Support

All components and utilities are fully typed with TypeScript. Import types as needed:

```tsx
import type { 
  FileUploadResponse, 
  FileUploadError, 
  FileUploadRequest 
} from '@/types/fileUpload';
```
