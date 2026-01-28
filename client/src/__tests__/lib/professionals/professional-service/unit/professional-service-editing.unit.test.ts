/**
 * Professional Service Editing Unit Tests
 * Tests entity editing with validation using mocks
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { editProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/editProfessionalServiceAd";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import {
  createProfessionalServiceFormData,
  assertServerActionSuccess,
  createMockFiles,
} from "@/__tests__/utils/serverAction.helpers";
import { Districts } from "@/lib/cities/types/cities.schema";
import mongoose from "mongoose";
import { ProfessionalService } from "@/lib/professionals/professional-service/models/ProfessionalService";
import connectDB from "@/lib/mongo/mongodb";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockGetFileManager: vi.fn(async () => ({
      deleteFiles: vi.fn(async () => ({ success: true })),
    })),
    mockConnectDB: vi.fn(),
    mockGetByPublicId: vi.fn(),
    mockSave: vi.fn(),
  };
});

vi.mock("@/lib/auth/utils/auth.utils", () => ({
  getCurrentUser: mocks.mockGetCurrentUser,
}));

vi.mock("@/lib/files/uploadFiles", () => ({
  uploadFiles: mocks.mockUploadFiles,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.mockRevalidatePath,
}));

vi.mock("@/lib/common/actions/getFileManager", () => ({
  getFileManager: mocks.mockGetFileManager,
}));

vi.mock("@/lib/mongo/mongodb", () => ({
  default: mocks.mockConnectDB,
}));

describe("Professional Service Editing [unit]", () => {
  const testCategoryId = new mongoose.Types.ObjectId().toString();
  const testSubCategoryId = new mongoose.Types.ObjectId().toString();
  const mockUser = {
    id: new mongoose.Types.ObjectId().toString(),
    email: "test@example.com",
  };
  const mockServicePublicId = "test-public-id-123";

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockConnectDB.mockResolvedValue(undefined);
    mocks.mockSave.mockResolvedValue(undefined);
    
    // Mock redirect to throw Next.js redirect error
    mocks.mockRedirect.mockImplementation(() => {
      const error = new Error("NEXT_REDIRECT");
      (error as any).digest = "NEXT_REDIRECT;redirect=/professional-service";
      throw error;
    });

    // Mock ProfessionalService.findOneAndUpdate
    vi.spyOn(ProfessionalService, "findOneAndUpdate").mockResolvedValue({
      save: mocks.mockSave,
    } as any);

    // Mock ProfessionalService.prototype.save
    vi.spyOn(ProfessionalService.prototype, "save").mockImplementation(
      mocks.mockSave
    );

    // Mock repository getByPublicId
    vi.spyOn(
      professionalServiceRepository,
      "getByPublicId"
    ).mockImplementation(mocks.mockGetByPublicId);
  });

  it("should edit professional service successfully", async () => {
    // Setup: Mock existing service
    const mockService = {
      id: new mongoose.Types.ObjectId().toString(),
      publicId: mockServicePublicId,
      user: { id: mockUser.id },
      category: { id: testCategoryId },
      subCategory: { id: testSubCategoryId },
      district: Districts.Center,
      city: "Тель-Авив",
      description: "Original description",
      email: "original@example.com",
      phoneNumber: "0501234567",
      images: [
        {
          id: "image-1",
          originalName: "original.jpg",
          uniqueName: "original-unique.jpg",
          url: "https://example.com/original.jpg",
          fieldname: "files",
          folderName: "professionals-service",
        },
      ],
    };

    mocks.mockGetByPublicId.mockResolvedValue(mockService);
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [],
      metadata: {
        totalFiles: 0,
        folderName: "professionals-service",
        userId: mockUser.id,
      },
    });

    // Create form data with updated values
    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      description: "Updated description",
      email: "updated@example.com",
      phoneNumber: "0512345678",
    });

    // Execute: Edit service
    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete: [],
      allImagesShouldBeDeleted: false,
    };

    // Execute - redirect throws, so we catch it
    try {
      await editProfessionalServiceAd(context, undefined, formData);
    } catch (error: any) {
      // Next.js redirect throws an error - this is expected
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        // Redirect was called - success
      } else {
        throw error;
      }
    }

    // Assert: Should redirect (success)
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/professional-service");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith(
      "/professional-service",
      "layout"
    );

    // Verify: Repository methods were called
    expect(mocks.mockGetByPublicId).toHaveBeenCalledWith(mockServicePublicId);
    expect(mocks.mockSave).toHaveBeenCalled();
  });

  it("should handle image deletion", async () => {
    // Setup: Mock existing service with images
    const mockService = {
      id: new mongoose.Types.ObjectId().toString(),
      publicId: mockServicePublicId,
      user: { id: mockUser.id },
      category: { id: testCategoryId },
      subCategory: { id: testSubCategoryId },
      images: [
        {
          id: "image-1",
          originalName: "old-image.jpg",
          uniqueName: "old-unique.jpg",
          url: "https://example.com/old-image.jpg",
          versionId: "version-1",
          fieldname: "files",
          folderName: "professionals-service",
        },
      ],
    };

    mocks.mockGetByPublicId.mockResolvedValue(mockService);
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Mark all existing images for deletion
    const imagesToDelete = mockService.images.map((img: any) => ({
      ...img,
      isExisting: true,
      toBeDeleted: true,
    }));

    // Add new images
    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "new-image-id",
          originalName: "new-image.jpg",
          uniqueName: "new-unique.jpg",
          url: "https://example.com/new-image.jpg",
          fieldname: "files",
          versionId: "version-id",
          folderName: "professionals-service",
        },
      ],
      metadata: {
        totalFiles: 1,
        folderName: "professionals-service",
        userId: mockUser.id,
      },
    });

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: createMockFiles(1),
    });

    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete,
      allImagesShouldBeDeleted: true,
    };

    // Execute - redirect throws, so we catch it
    try {
      await editProfessionalServiceAd(context, undefined, formData);
    } catch (error: any) {
      // Next.js redirect throws an error - this is expected
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        // Redirect was called - success
      } else {
        throw error;
      }
    }

    // Assert: Should redirect (success)
    expect(mocks.mockRedirect).toHaveBeenCalled();
    
    // Verify: File deletion was called
    const fileManager = await mocks.mockGetFileManager();
    expect(fileManager.deleteFiles).toHaveBeenCalled();
  });

  it("should handle partial image update (keep some, delete some, add new)", async () => {
    // Setup: Mock existing service with multiple images
    const mockService = {
      id: new mongoose.Types.ObjectId().toString(),
      publicId: mockServicePublicId,
      user: { id: mockUser.id },
      category: { id: testCategoryId },
      subCategory: { id: testSubCategoryId },
      images: [
        {
          id: "image-1",
          originalName: "image1.jpg",
          uniqueName: "unique1.jpg",
          url: "https://example.com/image1.jpg",
          versionId: "version-1",
          fieldname: "files",
          folderName: "professionals-service",
        },
        {
          id: "image-2",
          originalName: "image2.jpg",
          uniqueName: "unique2.jpg",
          url: "https://example.com/image2.jpg",
          versionId: "version-2",
          fieldname: "files",
          folderName: "professionals-service",
        },
      ],
    };

    mocks.mockGetByPublicId.mockResolvedValue(mockService);
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Delete only first image, keep the rest
    const imagesToDelete = [mockService.images[0]].map((img: any) => ({
      ...img,
      isExisting: true,
      toBeDeleted: true,
    }));

    // Add new image
    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "new-image-id",
          originalName: "new-image.jpg",
          uniqueName: "new-unique.jpg",
          url: "https://example.com/new-image.jpg",
          fieldname: "files",
          versionId: "version-id",
          folderName: "professionals-service",
        },
      ],
      metadata: {
        totalFiles: 1,
        folderName: "professionals-service",
        userId: mockUser.id,
      },
    });

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: createMockFiles(1),
    });

    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete,
      allImagesShouldBeDeleted: false,
    };

    // Execute - redirect throws, so we catch it
    try {
      await editProfessionalServiceAd(context, undefined, formData);
    } catch (error: any) {
      // Next.js redirect throws an error - this is expected
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        // Redirect was called - success
      } else {
        throw error;
      }
    }

    // Assert: Should redirect (success)
    expect(mocks.mockRedirect).toHaveBeenCalled();

    // Verify: File deletion was called for deleted images
    const fileManager = await mocks.mockGetFileManager();
    expect(fileManager.deleteFiles).toHaveBeenCalled();
  });

  it("should return error for unauthenticated user", async () => {
    // Setup: No authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(null);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
    });

    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete: [],
      allImagesShouldBeDeleted: false,
    };

    const result = await editProfessionalServiceAd(context, undefined, formData);

    // Assert: Should return error (no redirect thrown)
    expect(result).toBeDefined();
    expect(result?.status).toBe("error");
    expect(result?.error?.formErrors).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
    expect(mocks.mockGetByPublicId).not.toHaveBeenCalled();
  });

  it("should return error if service not found", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);
    mocks.mockGetByPublicId.mockResolvedValue(null);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
    });

    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete: [],
      allImagesShouldBeDeleted: false,
    };

    const result = await editProfessionalServiceAd(context, undefined, formData);

    // Assert: Should return error
    expect(result?.status).toBe("error");
    expect(result?.error?.formErrors).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
  });

  it("should validate required fields when all images deleted", async () => {
    const mockService = {
      id: new mongoose.Types.ObjectId().toString(),
      publicId: mockServicePublicId,
      user: { id: mockUser.id },
      category: { id: testCategoryId },
      subCategory: { id: testSubCategoryId },
      images: [
        {
          id: "image-1",
          originalName: "image1.jpg",
          uniqueName: "unique1.jpg",
          url: "https://example.com/image1.jpg",
          versionId: "version-1",
          fieldname: "files",
          folderName: "professionals-service",
        },
      ],
    };

    mocks.mockGetByPublicId.mockResolvedValue(mockService);
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Delete all images
    const imagesToDelete = mockService.images.map((img: any) => ({
      ...img,
      isExisting: true,
      toBeDeleted: true,
    }));

    // No new images provided
    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: [], // No new images
    });

    const context = {
      servicePublicId: mockServicePublicId,
      imagesToDelete,
      allImagesShouldBeDeleted: true, // All deleted, need at least 1 new
    };

    const result = await editProfessionalServiceAd(context, undefined, formData);

    // Assert: Should return validation error (need at least 1 image)
    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
  });
});
