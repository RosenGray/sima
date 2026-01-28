import { IAccessory } from "../models/Accessory";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedAccessory
  extends Omit<IAccessory, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
