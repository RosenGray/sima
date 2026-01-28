import { FilterQuery } from "mongoose";
import { ProfessionalService } from "../models/ProfessionalService";
import { ProfessionalServiceSearchFilters } from "./ProfessionalServiceRepository";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

/**
 * Builds MongoDB search filter from search filters
 * This function is extracted for unit testing
 */
export function buildProfessionalServiceSearchFilter(
  searchFilters: ProfessionalServiceSearchFilters
): FilterQuery<typeof ProfessionalService> {
  // Sanitize all incoming filters to prevent NoSQL injection
  const sanitizedFilters: ProfessionalServiceSearchFilters = {
    categoryId: sanitize(searchFilters.categoryId),
    subCategoryId: sanitize(searchFilters.subCategoryId),
    district: sanitize(searchFilters.district),
    city: sanitize(searchFilters.city),
  };

  // Build search filter using MongoDB text index and structured filters
  const searchFilter: FilterQuery<typeof ProfessionalService> = {};

  // Add category filter
  if (sanitizedFilters.categoryId) {
    // Validate ObjectId format before adding to filter
    const isValidObjectId = sanitizedFilters.categoryId.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (isValidObjectId) {
      searchFilter.category = { $in: sanitizedFilters.categoryId };
    } else {
      // Invalid ObjectId - return empty results by adding impossible filter
      searchFilter._id = new mongoose.Types.ObjectId();
    }
  }

  // Add subcategory filter
  if (sanitizedFilters.subCategoryId) {
    // Validate ObjectId format before adding to filter
    const isValidObjectId = sanitizedFilters.subCategoryId.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (isValidObjectId) {
      searchFilter.subCategory = { $in: sanitizedFilters.subCategoryId };
    } else {
      // Invalid ObjectId - return empty results by adding impossible filter
      searchFilter._id = new mongoose.Types.ObjectId();
    }
  }

  // Add district filter
  if (sanitizedFilters.district) {
    searchFilter.district = { $in: sanitizedFilters.district };
  }

  // Add city filter
  if (sanitizedFilters.city) {
    searchFilter.city = { $in: sanitizedFilters.city };
  }

  return searchFilter;
}
