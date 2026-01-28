import { Districts } from "@/lib/cities/types/cities.schema";

/**
 * Create a FormData object with test data
 * Uses global FormData (available in Node.js 18+)
 */
export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData() as any;

  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, String(item));
        }
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  }

  return formData;
}

/**
 * Create a mock File object for testing
 */
export function createMockFile(
  name: string = "test-file.jpg",
  type: string = "image/jpeg",
  size: number = 1024
): File {
  // Create a Blob with the specified size by padding with zeros
  const content = new ArrayBuffer(size);
  const blob = new Blob([content], { type });
  const file = new File([blob], name, { type });
  // Override the size property to ensure it matches
  Object.defineProperty(file, "size", {
    value: size,
    writable: false,
    configurable: true,
  });
  return file;
}

/**
 * Create multiple mock files
 */
export function createMockFiles(
  count: number,
  baseName: string = "test-file"
): File[] {
  return Array.from({ length: count }, (_, i) =>
    createMockFile(`${baseName}-${i + 1}.jpg`)
  );
}

/**
 * Add files to FormData
 */
export function addFilesToFormData(
  formData: FormData,
  files: File[],
  fieldName: string = "images"
): FormData {
  files.forEach((file) => {
    formData.append(fieldName, file);
  });
  return formData;
}

/**
 * Assert server action success response
 */
export function assertServerActionSuccess(result: any) {
  expect(result).toBeDefined();
  // Server actions that succeed typically redirect, so we check for no errors
  expect(result?.status).not.toBe("error");
}

/**
 * Assert server action error response
 */
export function assertServerActionError(result: any, expectedErrors?: string[]) {
  expect(result).toBeDefined();
  if (expectedErrors) {
    expect(result?.error).toBeDefined();
    if (result?.error?.formErrors) {
      expectedErrors.forEach((error) => {
        expect(result.error.formErrors).toContain(error);
      });
    }
  }
}

/**
 * Create FormData for car ad submission
 */
export function createCarAdFormData(overrides?: Record<string, any>): FormData {
  const defaultData = {
    manufacturer: "Toyota",
    model: "Camry",
    yearOfManufacture: "2020",
    numberOfHand: "1",
    transmission: "automatic",
    engineType: "gasoline",
    engineCapacity: "2.0",
    mileage: "50000",
    numberOfDoors: "4",
    color: "Black",
    price: "150000",
    description: "Test car description",
    accessories: "Test accessories",
    district: "Центр",
    city: "Тель-Авив",
    contactName: "Test User",
    contactPrimaryPhone: "050-123-4567",
    contactEmail: "test@example.com",
    acceptTerms: "on",
    images: createMockFiles(1),
  };

  return createFormData({ ...defaultData, ...overrides });
}

/**
 * Create FormData for job ad submission
 */
export function createJobAdFormData(overrides?: Record<string, any>): FormData {
  const defaultData = {
    title: "Software Developer",
    district: "Центр",
    city: "Тель-Авив",
    description: "Test job description",
    contactName: "Test User",
    contactPrimaryPhone: "050-123-4567",
    contactEmail: "test@example.com",
    acceptTerms: "on",
    images: createMockFiles(1),
  };

  return createFormData({ ...defaultData, ...overrides });
}

/**
 * Create FormData for professional service ad submission
 */
export function createProfessionalServiceFormData(
  overrides?: Record<string, any>
): FormData {
  const defaultData = {
    category: "category-id",
    subCategory: "subcategory-id",
    district: Districts.Center,
    city: "Тель-Авив",
    description: "Test service description",
    email: "test@example.com",
    phoneNumber: "0501234567",
    acceptTerms: "on",
    images: createMockFiles(1),
  };

  return createFormData({ ...defaultData, ...overrides });
}
