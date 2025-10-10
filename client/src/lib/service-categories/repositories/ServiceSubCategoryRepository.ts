import { ServiceSubCategory } from '../models/ServiceSubCategory';
import { ServiceCategory } from '../models/ServiceCategory';
import serviceSubCategoriesData from './professionals.servicesubcategories.json';
import serviceCategoriesData from './professionals.servicecategories.json';
import connectDB from '@/lib/mongo/mongodb';
import { unstable_cache } from 'next/cache';
import { SerializeServiceSubCategory } from '../types/service-categories.types';

// Internal function that performs the actual database operations
async function _getAllSubCategories(): Promise<SerializeServiceSubCategory[]> {
  console.log('ServiceSubCategoryRepositor 1y');
  try {
    await connectDB();
    console.log('ServiceSubCategoryRepositor 2y');
    // First, check if there are any existing service subcategories
    const existingSubCategories = await ServiceSubCategory.find({})
    .populate("serviceCategory");
    console.log("existingSubCategories", existingSubCategories);
    // If no subcategories exist, initialize with the JSON data
    if (existingSubCategories.length === 0) {
      console.log('No service subcategories found. Initializing with default data...');
      
      // First, ensure service categories are initialized
      let serviceCategories = await ServiceCategory.find({});
      
      if (serviceCategories.length === 0) {
        console.log('No service categories found. Initializing categories first...');
        const categoriesToInsert = serviceCategoriesData.map((category) => ({
          key: category.key,
          displayName: category.displayName,
          description: category.description,
          russianDisplayName: category.russianDisplayName,
          russianDescription: category.russianDescription,
        }));
        serviceCategories = await ServiceCategory.insertMany(categoriesToInsert);
        console.log(`Initialized ${serviceCategories.length} service categories`);
      }
      
      // Now map the service category IDs
      const categoryMap = new Map();
      serviceCategories.forEach(category => {
        categoryMap.set(category.key, category._id);
      });

      // Transform the JSON data to match our model structure
      const subCategoriesToInsert = serviceSubCategoriesData
        .map((subCategory: {
          key: string;
          displayName: string;
          description: string;
          serviceCategoryKey: string;
          russianDisplayName: string;
          russianDescription: string;
        }) => {
          const serviceCategoryId = categoryMap.get(subCategory.serviceCategoryKey);
          
          if (!serviceCategoryId) {
            console.warn(`Service category with key "${subCategory.serviceCategoryKey}" not found for subcategory "${subCategory.key}"`);
            return null;
          }

          return {
            key: subCategory.key,
            displayName: subCategory.displayName,
            description: subCategory.description,
            serviceCategory: serviceCategoryId,
            serviceCategoryKey: subCategory.serviceCategoryKey,
            russianDisplayName: subCategory.russianDisplayName,
            russianDescription: subCategory.russianDescription,
          };
        })
        .filter(Boolean); // Remove null entries

      if (subCategoriesToInsert.length === 0) {
        throw new Error('No valid subcategories to insert. Make sure service categories are initialized first.');
      }

      // Insert the subcategories
      const insertedSubCategories = await ServiceSubCategory.insertMany(subCategoriesToInsert);
      console.log(`Initialized ${insertedSubCategories.length} service subcategories`);
      
      return insertedSubCategories;
    }

    console.log(`Found ${existingSubCategories.length} existing service subcategories`);
    return JSON.parse(JSON.stringify(existingSubCategories));
  } catch (error) {
    console.error('Error in ServiceSubCategoryRepository.getAll:', error);
    throw error;
  }
}

export class ServiceSubCategoryRepository {
  // Cached version of getAll - caches for 1 hour (3600 seconds)
  async getAll(): Promise<SerializeServiceSubCategory[]> {
    const cachedGetAll = unstable_cache(
      _getAllSubCategories,
      ['service-subcategories'], // cache key
      { 
        revalidate: 86400, // 1 day
        tags: ['service-subcategories']
      }
    );
    return cachedGetAll();
  }
}

export const serviceSubCategoryRepository = new ServiceSubCategoryRepository();
