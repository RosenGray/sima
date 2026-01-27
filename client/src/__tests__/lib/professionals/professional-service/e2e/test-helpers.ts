import { ProfessionalServiceFactory } from "@/__tests__/factories";
import { Districts } from "@/lib/cities/types/cities.schema";
import mongoose from "mongoose";
import { ServiceCategory } from "@/lib/service-categories/models/ServiceCategory";
import { ServiceSubCategory } from "@/lib/service-categories/models/ServiceSubCategory";

/**
 * Create diverse test data for professional services
 * Ensures different categories, districts, cities, and timestamps
 */
export async function setupDiverseTestData(count: number = 200) {
  // Create test categories and subcategories if they don't exist
  const categories = await createTestCategories();
  const subCategories = await createTestSubCategories(categories);

  // Get all available districts
  const allDistricts = Object.values(Districts).filter(
    (d) => d !== Districts.All
  );

  // Create services with diverse data
  const services = [];
  const batchSize = 50;

  for (let i = 0; i < count; i += batchSize) {
    const batchCount = Math.min(batchSize, count - i);
    const batch = await Promise.all(
      Array.from({ length: batchCount }, async (_, index) => {
        const globalIndex = i + index;
        const category = categories[globalIndex % categories.length];
        const subCategory =
          subCategories[category.id]?.[
            globalIndex % (subCategories[category.id]?.length || 1)
          ] || subCategories[category.id]?.[0];

        // Distribute across districts and cities
        const districtIndex = globalIndex % allDistricts.length;
        const district = allDistricts[districtIndex];

        // Create with slight time offset for sorting tests
        const createdAt = new Date();
        createdAt.setSeconds(createdAt.getSeconds() - (count - globalIndex));

        return ProfessionalServiceFactory.create({
          category: category.id,
          subCategory: subCategory?.id || new mongoose.Types.ObjectId(),
          district,
          city: `City-${districtIndex}-${globalIndex % 5}`,
          createdAt: createdAt as any,
        });
      })
    );
    services.push(...batch);
  }

  return {
    services,
    categories,
    subCategories,
    districts: allDistricts,
  };
}

/**
 * Create test service categories
 */
async function createTestCategories() {
  // Use valid enum values from ServiceCategory schema
  const categoryKeys = [
    "ConstructionRepair",
    "ApplianceRepair",
    "Legal",
    "Medical",
    "Transportation",
  ] as const;

  const categories = [];
  for (const key of categoryKeys) {
    let category = await ServiceCategory.findOne({ key });
    if (!category) {
      category = await ServiceCategory.create({
        key,
        displayName: `Test ${key}`,
        description: `Test description for ${key}`,
        russianDisplayName: `Тест ${key}`,
        russianDescription: `Тестовое описание для ${key}`,
        navItem: {
          label: key,
          href: `/professional-service`,
          id: new mongoose.Types.ObjectId().toString(),
        },
      });
    }
    categories.push(category);
  }
  return categories;
}

/**
 * Create test service subcategories
 */
async function createTestSubCategories(categories: any[]) {
  const subCategoriesMap: Record<string, any[]> = {};

  for (const category of categories) {
    const subCategoryKeys = [`${category.key}-Sub1`, `${category.key}-Sub2`];
    const subCategories = [];

    for (const key of subCategoryKeys) {
      let subCategory = await ServiceSubCategory.findOne({ key });
      if (!subCategory) {
        subCategory = await ServiceSubCategory.create({
          key,
          displayName: `Test ${key}`,
          description: `Test description for ${key}`,
          russianDisplayName: `Тест ${key}`,
          russianDescription: `Тестовое описание для ${key}`,
          serviceCategory: category._id,
          serviceCategoryKey: category.key,
        });
      }
      subCategories.push(subCategory);
    }
    subCategoriesMap[category.id] = subCategories;
  }

  return subCategoriesMap;
}
