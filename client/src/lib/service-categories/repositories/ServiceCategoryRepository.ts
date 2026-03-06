import connectDB from "@/lib/mongo/mongodb";
import { ServiceCategory } from "../models/ServiceCategory";
import serviceCategoriesData from "./professionals.servicecategories.json";
import { ServiceCategoryMapping } from "../../professionals/professional-service/types/professional-service.scema";
import { serviceSubCategoryRepository } from "./ServiceSubCategoryRepository";
import { SerializeServiceCategory } from "../types/service-categories.types";

// Module-level in-memory cache — replaces unstable_cache which uses TransformStream
// internally and causes controller[kState].transformAlgorithm errors on Node 20 + Next 16.
let _cache: { data: SerializeServiceCategory[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 3600 * 1000; // 1 hour

// Internal function that performs the actual database operations
async function _getAllCategories(): Promise<SerializeServiceCategory[]> {
  try {
    await connectDB();
    // First, check if there are any existing service categories
    const existingCategories = await ServiceCategory.find({})
      .collation({ locale: "ru" })
      .sort('russianDisplayName');

    // If no categories exist, initialize with the JSON data
    if (existingCategories.length === 0) {
      console.log(
        "No service categories found. Initializing with default data..."
      );

      console.log("foooo", serviceCategoriesData);

      // Transform the JSON data to match our model structure
      const categoriesToInsert = serviceCategoriesData.map(
        (category: {
          key: string;
          displayName: string;
          description: string;
          russianDisplayName: string;
          russianDescription: string;
          navItem?: { label: string; href: string };
        }) => ({
          key: category.key,
          displayName: category.displayName,
          description: category.description,
          russianDisplayName: category.russianDisplayName,
          russianDescription: category.russianDescription,
          navItem: category.navItem,
        })
      );

      // Insert the categories using create() to trigger pre-save hooks
      const insertedCategories = await ServiceCategory.create(
        categoriesToInsert
      );
      console.log(
        `Initialized ${insertedCategories.length} service categories`
      );
      return JSON.parse(JSON.stringify(insertedCategories));
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
  async getAll(): Promise<SerializeServiceCategory[]> {
    if (process.env.NODE_ENV === "development") {
      return _getAllCategories();
    }

    const now = Date.now();
    if (_cache && now < _cache.expiresAt) {
      return _cache.data;
    }

    const data = await _getAllCategories();
    _cache = { data, expiresAt: now + CACHE_TTL_MS };
    return data;
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

  // async getMappingToNavItem(): Promise<unknown>   {
  //   const serviceCategories = await this.getAll();
  //   const mapping: ServiceCategoryMappingToNavItem = {};

  //   serviceCategories.forEach((category) => {
  //     mapping[category.key] = {
  //       label: category.displayName,
  //       href: category.navItem?.href || "",
  //     };
  //   });

  //   return 1;
  // }
}

export const serviceCategoryRepository = new ServiceCategoryRepository();
