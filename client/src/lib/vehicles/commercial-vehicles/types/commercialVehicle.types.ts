import { ICommercialVehicle } from "../models/CommercialVehicle";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedCommercialVehicle
  extends Omit<ICommercialVehicle, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
