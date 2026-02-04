import { IRealEstateForSale } from "../models/RealEstateForSale";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

// Shared with for-rent flow (single source of truth for PropertyKind)
export { PropertyKind } from "../../for-rent/types/realEstateForRent.types";

export enum AirConditioning {
  None = 1,
  InRooms = 2,
  InRoomsAndLivingRoom = 3,
  InLivingRoom = 4,
  Central = 5,
  MiniCentral = 6,
  Split = 7,
}

export enum Parking {
  None = 1,
  InTheStreet = 2,
  Shared = 3,
  PayedParking = 4,
  PrivateCovered = 5,
  PrivateUncovered = 6,
}

export enum AdditionalFeatures {
  Bars = 1,
  Elevator = 2,
  ForRoommates = 3,
  Warehouse = 4,
  Shelter = 5,
  PetsSuitable = 6,
  SolarHeater = 7,
  Renovated = 8,
}

export enum Furniture {
  None = 1,
  Partial = 2,
  Full = 3,
}

export enum EntryDate {
  Immediate = 1,
  Flexible = 2,
}

export interface SerializedRealEstateForSale
  extends Omit<IRealEstateForSale, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
