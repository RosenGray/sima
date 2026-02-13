import { FileUploadItem } from "@/lib/files/uploadFiles";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { SerializeServiceCategory, SerializeServiceSubCategory } from "@/lib/service-categories/types/service-categories.types";
import { ISocialLinks } from "../models/ProfessionalPage";

export interface SerializedProfessionalPage {
  id: string;
  publicId: string;
  slug: string;
  user: SerializedUser;
  displayName: string;
  description: string;
  profileImage?: FileUploadItem;
  galleryImages?: FileUploadItem[];
  category?: SerializeServiceCategory;
  subCategory?: SerializeServiceSubCategory;
  district?: string;
  city?: string;
  contactPhone?: string;
  contactEmail?: string;
  socialLinks?: ISocialLinks;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
