import { IPetAccessory } from "../models/PetAccessory";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export interface SerializedPetAccessory
  extends Omit<IPetAccessory, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
