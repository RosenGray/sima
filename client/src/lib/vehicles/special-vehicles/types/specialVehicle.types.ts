import { ISpecialVehicle } from "../models/SpecialVehicle";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedSpecialVehicle
  extends Omit<ISpecialVehicle, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
