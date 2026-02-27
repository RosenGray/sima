import { SerializedUser } from "@/lib/auth/types/auth.scema";
import { FileUploadItem } from "@/lib/files/uploadFiles";
import mongoose from "mongoose";

export const OTHERS_STATUSES = [
  "active",
  "expired",
  "archived",
  "deleted",
  "pending",
] as const;

export type OthersStatus = (typeof OTHERS_STATUSES)[number];

export interface IOthers {
  id: string;
  publicId: string;
  user: mongoose.Types.ObjectId;
  status: OthersStatus;
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

export interface SerializedOthers
  extends Omit<IOthers, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
