/**
 * Professional Service Creation E2E Tests
 * Tests entity creation with validation
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { publishProfessionalServiceAd } from "@/lib/professionals/professional-service/actions/publishProfessionalServiceAd";
import { professionalServiceRepository } from "@/lib/professionals/professional-service/repository/ProfessionalServiceRepository";
import { UserFactory } from "@/__tests__/factories";
import {
  createProfessionalServiceFormData,
  assertServerActionSuccess,
  assertServerActionError,
  createMockFile,
  createMockFiles,
} from "@/__tests__/utils/serverAction.helpers";
import { Districts } from "@/lib/cities/types/cities.schema";
import mongoose from "mongoose";
import { ServiceCategory } from "@/lib/service-categories/models/ServiceCategory";
import { ServiceSubCategory } from "@/lib/service-categories/models/ServiceSubCategory";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
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

describe("Professional Service Creation [e2e]", () => {
  let mongoServer: MongoMemoryServer;
  let testCategory: any;
  let testSubCategory: any;

  beforeAll(async () => {
    const result = await setupMongoMemoryServer();
    mongoServer = result.mongoServer;

    // Create test category and subcategory (use valid enum value)
    testCategory = await ServiceCategory.create({
      key: "ConstructionRepair",
      displayName: "Test Category",
      description: "Test description",
      russianDisplayName: "Тестовая категория",
      russianDescription: "Тестовое описание",
      navItem: {
        label: "Test",
        href: "/professional-service",
        id: new mongoose.Types.ObjectId().toString(),
      },
    });

    testSubCategory = await ServiceSubCategory.create({
      key: `ConstructionRepair-Sub-${Date.now()}`,
      displayName: "Test SubCategory",
      description: "Test description",
      russianDisplayName: "Тестовая подкатегория",
      russianDescription: "Тестовое описание",
      serviceCategory: testCategory._id,
      serviceCategoryKey: testCategory.key,
    });
  });

  afterAll(async () => {
    await teardownMongoMemoryServer(mongoServer);
  });

  beforeEach(async () => {
    await clearDatabase();
    vi.clearAllMocks();

    // Recreate category and subcategory after clear
    testCategory = await ServiceCategory.create({
      key: "ConstructionRepair",
      displayName: "Test Category",
      description: "Test description",
      russianDisplayName: "Тестовая категория",
      russianDescription: "Тестовое описание",
      navItem: {
        label: "Test",
        href: "/professional-service",
        id: new mongoose.Types.ObjectId().toString(),
      },
    });

    testSubCategory = await ServiceSubCategory.create({
      key: `ConstructionRepair-Sub-${Date.now()}`,
      displayName: "Test SubCategory",
      description: "Test description",
      russianDisplayName: "Тестовая подкатегория",
      russianDescription: "Тестовое описание",
      serviceCategory: testCategory._id,
      serviceCategoryKey: testCategory.key,
    });
  });

  it("should create professional service with valid data", async () => {
    // Setup: Create authenticated user
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

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
        userId: user.id,
      },
    });

    // Create form data
    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      district: Districts.Center,
      city: "Тель-Авив",
      description: "Test service description",
      email: "test@example.com",
      phoneNumber: "0501234567",
    });

    // Execute
    const result = await publishProfessionalServiceAd(undefined, formData);

    // Assert: Should redirect (no error returned)
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/professional-service");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith(
      "/professional-service",
      "layout"
    );
    assertServerActionSuccess(result);

    // Verify: Service was created in database
    const services = await professionalServiceRepository.getAll({}, 1, 10);
    expect(services.data.length).toBeGreaterThan(0);
    const createdService = services.data[0];
    expect(createdService.description).toBe("Test service description");
    expect(createdService.email).toBe("test@example.com");
    expect(createdService.phoneNumber).toBe("0501234567");
    expect(createdService.user.id).toBe(user.id);
  });

  it("should return error for unauthenticated user", async () => {
    // Setup: No authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(null);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
    });

    // Execute
    const result = await publishProfessionalServiceAd(undefined, formData);

    // Assert: Should return error
    expect(result?.status).toBe("error");
    expect(result?.error?.formErrors).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
  });

  it("should validate required fields - category", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: "", // Missing required field
      subCategory: testSubCategory.id,
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - subCategory", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - district", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      district: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - city", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      city: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - description", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      description: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - email", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      email: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - phoneNumber", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      phoneNumber: "", // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate required fields - acceptTerms", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      acceptTerms: undefined, // Missing required field
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate email format", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const invalidEmails = ["invalid-email", "test@", "@example.com", "test@.com"];

    for (const invalidEmail of invalidEmails) {
      const formData = createProfessionalServiceFormData({
        category: testCategory.id,
        subCategory: testSubCategory.id,
        email: invalidEmail,
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      expect(result?.status).toBe("error");
      expect(result?.error).toBeDefined();
    }
  });

  it("should validate phone number format - only digits", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const invalidPhones = ["050-123-4567", "050 123 4567", "abc123", "123-456"];

    for (const invalidPhone of invalidPhones) {
      const formData = createProfessionalServiceFormData({
        category: testCategory.id,
        subCategory: testSubCategory.id,
        phoneNumber: invalidPhone,
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      expect(result?.status).toBe("error");
      expect(result?.error).toBeDefined();
    }
  });

  it("should validate minimum 1 image required", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      images: [], // No images
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate maximum 5 images", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      images: createMockFiles(6), // 6 images (exceeds max of 5)
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate image file size limit (5MB)", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    // Create file larger than 5MB (5 * 1024 * 1024 + 1)
    const largeFile = createMockFile(
      "large-file.jpg",
      "image/jpeg",
      5 * 1024 * 1024 + 1
    );

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      images: [largeFile],
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should validate image file type", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    const invalidFile = createMockFile("test.pdf", "application/pdf", 1024);

    const formData = createProfessionalServiceFormData({
      category: testCategory.id,
      subCategory: testSubCategory.id,
      images: [invalidFile],
    });

    const result = await publishProfessionalServiceAd(undefined, formData);

    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });

  it("should accept valid image types (PNG, JPEG, JPG, WebP)", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

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
        userId: user.id,
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
        category: testCategory.id,
        subCategory: testSubCategory.id,
        images: [validFile],
      });

      const result = await publishProfessionalServiceAd(undefined, formData);

      // Should succeed (redirect means success)
      expect(mocks.mockRedirect).toHaveBeenCalled();
      vi.clearAllMocks();
    }
  });
});
