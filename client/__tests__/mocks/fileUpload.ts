import { vi } from "vitest";
import { FileUploadResponse, FileUploadItem } from "@/lib/files/uploadFiles";
import { nanoid } from "nanoid";

/**
 * Mock file upload response
 */
export const createMockFileUploadResponse = (
  folderName: string,
  userId: string,
  fileCount: number = 1
): FileUploadResponse => {
  const files: FileUploadItem[] = Array.from({ length: fileCount }, (_, i) => ({
    id: nanoid(10),
    originalName: `test-image-${i + 1}.jpg`,
    uniqueName: `${nanoid(20)}-test-image-${i + 1}.jpg`,
    url: `https://example.com/${folderName}/${userId}/test-image-${i + 1}.jpg`,
    fieldname: "files",
    versionId: nanoid(10),
    folderName: folderName,
  }));

  return {
    success: true,
    message: `Successfully uploaded ${fileCount} file(s)`,
    files,
    metadata: {
      totalFiles: fileCount,
      folderName,
      userId,
    },
  };
};

/**
 * Mock uploadFiles function
 */
export const mockUploadFiles = vi.fn(
  async (
    folderName: string,
    userId: string,
    _formData: FormData
  ): Promise<FileUploadResponse> => {
    // Count files in FormData
    const fileCount = _formData.getAll("files").length || 1;
    return createMockFileUploadResponse(folderName, userId, fileCount);
  }
);

/**
 * Reset mock uploadFiles function
 */
export const resetMockUploadFiles = () => {
  mockUploadFiles.mockClear();
  mockUploadFiles.mockReset();
};

/**
 * Setup mock for uploadFiles module
 */
export function setupFileUploadMock() {
  vi.mock("@/lib/files/uploadFiles", () => ({
    uploadFiles: mockUploadFiles,
    FileUploadResponse: {},
    FileUploadItem: {},
    ExistingImageItem: {},
  }));
}
