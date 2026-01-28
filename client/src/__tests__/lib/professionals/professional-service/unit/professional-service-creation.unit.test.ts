/**
 * Professional Service Creation Unit Tests
 * Tests entity creation with validation using mocks
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publishProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/publishProfessionalServiceAd";
import {
  createProfessionalServiceFormData,
  assertServerActionSuccess,
  assertServerActionError,
  createMockFile,
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
    mockConnectDB: vi.fn(),
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

vi.mock("@/lib/mongo/mongodb", () => ({
  default: mocks.mockConnectDB,
}));

describe("Professional Service Creation [unit]", () => {
  const testCategoryId = new mongoose.Types.ObjectId().toString();
  const testSubCategoryId = new mongoose.Types.ObjectId().toString();
  const mockUser = {
    id: new mongoose.Types.ObjectId().toString(),
    email: "test@example.com",
  };

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

    // Mock ProfessionalService.prototype.save
    vi.spyOn(ProfessionalService.prototype, "save").mockImplementation(
      mocks.mockSave
    );
  });

  it("should create professional service with valid data", async () => {
    // Setup: Mock authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Setup: Mock file upload
    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "test-id",
          originalName: "test.jpg",
          uniqueName: "test-unique.jpg",
          url: "https://example.com/test.jpg",
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

    // Create form data
    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      district: Districts.Center,
      city: "Тель-Авив",
      description: "Test service description",
      email: "test@example.com",
      phoneNumber: "0501234567",
    });

    // Execute - redirect throws, so we catch it
    try {
      await publishProfessionalServiceAd(undefined, formData);
    } catch (error: any) {
      // Next.js redirect throws an error - this is expected
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        // Redirect was called - success
      } else {
        throw error;
      }
    }

    // Assert: Should redirect (no error returned)
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/professional-service");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith(
      "/professional-service",
      "layout"
    );

    // Verify: Service save was called
    expect(mocks.mockSave).toHaveBeenCalled();
    expect(mocks.mockConnectDB).toHaveBeenCalled();
    expect(mocks.mockUploadFiles).toHaveBeenCalled();
  });

  it("should return error for unauthenticated user", async () => {
    // Setup: No authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(null);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
    });

    // Execute
    const result = await publishProfessionalServiceAd(undefined, formData);

    // Assert: Should return error (no redirect thrown)
    expect(result).toBeDefined();
    expect(result?.status).toBe("error");
    expect(result?.error?.formErrors).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - category", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: "", // Missing required field
      subCategory: testSubCategoryId,
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - subCategory", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - district", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      district: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - city", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      city: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - description", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      description: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - email", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      email: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - phoneNumber", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      phoneNumber: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate required fields - acceptTerms", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      acceptTerms: undefined, // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate email format", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const invalidEmails = [
      "invalid-email",
      "test@",
      "@example.com",
      "test@.com",
    ];

    for (const invalidEmail of invalidEmails) {
      const formData = createProfessionalServiceFormData({
        category: testCategoryId,
        subCategory: testSubCategoryId,
        email: invalidEmail,
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      expect(result?.status).toBe("error");
      expect(result?.error).toBeDefined();
      expect(mocks.mockSave).not.toHaveBeenCalled();
    }
  });

  it("should validate phone number format - only digits", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const invalidPhones = [
      "050-123-4567",
      "050 123 4567",
      "abc123",
      "123-456",
    ];

    for (const invalidPhone of invalidPhones) {
      const formData = createProfessionalServiceFormData({
        category: testCategoryId,
        subCategory: testSubCategoryId,
        phoneNumber: invalidPhone,
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      expect(result?.status).toBe("error");
      expect(result?.error).toBeDefined();
      expect(mocks.mockSave).not.toHaveBeenCalled();
    }
  });

  it("should validate minimum 1 image required", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: [], // No images
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate maximum 5 images", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: createMockFiles(6), // 6 images (exceeds max of 5)
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate image file size limit (5MB)", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Create file larger than 5MB (5 * 1024 * 1024 + 1)
    const largeFile = createMockFile(
      "large-file.jpg",
      "image/jpeg",
      5 * 1024 * 1024 + 1
    );

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: [largeFile],
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should validate image file type", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    const invalidFile = createMockFile("test.pdf", "application/pdf", 1024);

    const formData = createProfessionalServiceFormData({
      category: testCategoryId,
      subCategory: testSubCategoryId,
      images: [invalidFile],
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockSave).not.toHaveBeenCalled();
  });

  it("should accept valid image types (PNG, JPEG, JPG, WebP)", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "test-id",
          originalName: "test.jpg",
          uniqueName: "test-unique.jpg",
          url: "https://example.com/test.jpg",
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

    const validTypes = [
      { type: "image/png", name: "test.png" },
      { type: "image/jpeg", name: "test.jpeg" },
      { type: "image/jpg", name: "test.jpg" },
      { type: "image/webp", name: "test.webp" },
    ];

    for (const { type, name } of validTypes) {
      const validFile = createMockFile(name, type, 1024);
      const formData = createProfessionalServiceFormData({
        category: testCategoryId,
        subCategory: testSubCategoryId,
        images: [validFile],
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      // Should succeed (redirect means success)
      expect(mocks.mockRedirect).toHaveBeenCalled();
      expect(mocks.mockSave).toHaveBeenCalled();
      vi.clearAllMocks();
    }
  });
});
