import connectDB from "@/lib/mongo/mongodb";
import { ServiceCategory, IServiceCategory } from "../models/ServiceCategory";
import { IServiceSubCategory, ServiceSubCategory } from "../models/ServiceSubCategory";
import serviceCategoriesData from "./professionals.servicecategories.json";
import { unstable_cache } from "next/cache";
import { ServiceCategoryMapping } from "../types/professionals.scema";
import { serviceSubCategoryRepository } from "./ServiceSubCategoryRepository";

// Internal function that performs the actual database operations
async function _getAllCategories(): Promise<IServiceCategory[]> {
  try {
    console.log("ServiceCategoryRepository 1y");
    await connectDB();
    console.log("ServiceCategoryRepository 2y");
    // First, check if there are any existing service categories
    const existingCategories = await ServiceCategory.find({});

    // If no categories exist, initialize with the JSON data
    if (existingCategories.length === 0) {
      console.log(
        "No service categories found. Initializing with default data..."
      );

      // Transform the JSON data to match our model structure
      const categoriesToInsert = serviceCategoriesData.map(
        (category: {
          key: string;
          displayName: string;
          description: string;
          russianDisplayName: string;
          russianDescription: string;
        }) => ({
          key: category.key,
          displayName: category.displayName,
          description: category.description,
          russianDisplayName: category.russianDisplayName,
          russianDescription: category.russianDescription,
        })
      );

      // Insert the categories
      const insertedCategories = await ServiceCategory.insertMany(
        categoriesToInsert
      );
      console.log(
        `Initialized ${insertedCategories.length} service categories`
      );

      return insertedCategories;
    }

    console.log(
      `Found ${existingCategories.length} existing service categories`
    );
    return existingCategories;
  } catch (error) {
    console.error("Error in ServiceCategoryRepository.getAll:", error);
    throw error;
  }
}

// Normalize data to ensure all ObjectIds and Dates are converted to strings
function normalizeServiceCategory(category: IServiceCategory) {
  return {
    id: category.id.toString(),
    key: category.key,
    displayName: category.displayName,
    description: category.description,
    russianDisplayName: category.russianDisplayName,
    russianDescription: category.russianDescription,
    createdAt: category.createdAt?.toString(),
    updatedAt: category.updatedAt?.toString(),
  };
}

function normalizeServiceSubCategory(subCategory: IServiceSubCategory) {
  return {
    id: subCategory.id.toString(),
    key: subCategory.key,
    displayName: subCategory.displayName,
    description: subCategory.description,
    russianDisplayName: subCategory.russianDisplayName,
    russianDescription: subCategory.russianDescription,
    serviceCategory: subCategory.serviceCategory.toString(),
    serviceCategoryKey: subCategory.serviceCategoryKey,
    createdAt: subCategory.createdAt?.toString(),
    updatedAt: subCategory.updatedAt?.toString(),
  };
}

export class ServiceCategoryRepository {
  // Cached version of getAll - caches for 1 hour (3600 seconds)
  async getAll(): Promise<IServiceCategory[]> {
    const cachedGetAll = unstable_cache(
      _getAllCategories,
      ["service-categories"], // cache key
      {
        revalidate: 86400, // 1 day
        tags: ["service-categories"],
      }
    );

    return cachedGetAll();
  }

  // Get mapped categories with their subcategories
  async getMappedCategories(): Promise<ServiceCategoryMapping> {
    const serviceCategories = await this.getAll();
    const subcategories = await serviceSubCategoryRepository.getAll();

    const mapping: ServiceCategoryMapping = {};

    // Use synchronous operations with the already fetched subcategories
    serviceCategories.forEach((category) => {
      const subCategories = subcategories.filter(
        (sub) => sub.serviceCategoryKey === category.key
      );

      mapping[category.id] = {
        category: normalizeServiceCategory(category),
        subCategories: subCategories.map(normalizeServiceSubCategory),
      };
    });

    return mapping;
  }
}

export const serviceCategoryRepository = new ServiceCategoryRepository();
