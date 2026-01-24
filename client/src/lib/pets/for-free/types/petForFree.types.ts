import { IPetForFree } from "../models/PetForFree";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export {
  PetGender,
  PetAge,
  PetAdjustments,
} from "@/lib/pets/for-sale/types/petForSale.types";

export interface SerializedPetForFree
  extends Omit<IPetForFree, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
