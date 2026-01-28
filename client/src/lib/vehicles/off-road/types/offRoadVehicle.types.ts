import { IOffRoadVehicle } from "../models/OffRoadVehicle";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedOffRoadVehicle
  extends Omit<IOffRoadVehicle, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
