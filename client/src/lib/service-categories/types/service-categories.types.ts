import { IServiceCategory } from "../models/ServiceCategory";
import { IServiceSubCategory } from "../models/ServiceSubCategory";

export interface SerializeServiceCategory extends IServiceCategory {
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface SerializeServiceSubCategory extends Omit<IServiceSubCategory, "serviceCategory"> {
  id: string;
  createdAt: string;
  updatedAt: string;
  serviceCategory: SerializeServiceCategory;
}