import connectDB from "@/lib/mongo/mongodb";
import { ServiceCategory } from "../models/ServiceCategory";
import serviceCategoriesData from "./professionals.servicecategories.json";
import { unstable_cache } from "next/cache";
import { ServiceCategoryMapping } from "../../professionals/professional-service/types/professional-service.scema";
import { serviceSubCategoryRepository } from "./ServiceSubCategoryRepository";
import { SerializeServiceCategory } from "../types/service-categories.types";

// Internal function that performs the actual database operations
async function _getAllCategories(): Promise<SerializeServiceCategory[]> {
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
    return JSON.parse(JSON.stringify(existingCategories));
  } catch (error) {
    console.error("Error in ServiceCategoryRepository.getAll:", error);
    throw error;
  }
}

export class ServiceCategoryRepository {
  // Cached version of getAll - caches for 1 hour (3600 seconds)
  async getAll(): Promise<SerializeServiceCategory[]> {
    // In development, skip cache to always get fresh data
    if (process.env.NODE_ENV === 'development') {
      return _getAllCategories();
    }

    const cachedGetAll = unstable_cache(
      _getAllCategories,
      ["service-categories"], // cache key
      {
        revalidate: 3600, // 1 hour in production
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
        category: category,
        subCategories: subCategories,
      };
    });

    return mapping;
  }
}

export const serviceCategoryRepository = new ServiceCategoryRepository();
