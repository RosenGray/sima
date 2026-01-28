import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { FileUploadItem } from "@/lib/files/uploadFiles";
import mongoose from "mongoose";

export interface IJob {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  title: string;
  district: string;
  city: string;
  description: string;
  images: FileUploadItem[];
  contactName: string;
  contactPrimaryPhone: string;
  contactSecondaryPhone?: string;
  contactEmail: string;
  acceptTerms: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SerializedJob
  extends Omit<IJob, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
