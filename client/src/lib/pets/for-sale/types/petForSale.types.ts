import { IPetForSale } from "../models/PetForSale";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export enum PetGender {
  MALE = 1,
  FEMALE = 2,
}

export enum PetAge {
  PUPPY = 1, // Щенок
  YOUNG = 2, // Молодой
  ADULT = 3, // Взрослый
  GROWN = 4, // Старший
}

export interface SerializedPetForSale
  extends Omit<IPetForSale, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
