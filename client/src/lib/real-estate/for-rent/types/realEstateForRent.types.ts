import { IRealEstateForRent } from "../models/RealEstateForRent";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

// Aligned with homeless.co.il/rent "סוג הנכס" dropdown; Russian labels in realEstateOptions.ts
// Keeps Apartment=1, Loft=2 for DB compatibility; then same concepts as for-sale in order.
export enum PropertyKind {
  Apartment = 1,
  Loft = 2,
  GardenApartment = 3,
  Penthouse = 4,
  Duplex = 5,
  TourismAndVacation = 6,
  Basement = 7,
  Triplex = 8,
  HousingUnit = 9,
  StudioLoft = 10,
  PrivateHouseCottage = 11,
  TwoFamily = 12,
  FarmAgricultural = 13,
  AuxiliaryFarm = 14,
  Other = 15,
  Plots = 16,
  ProtectedHousing = 17,
  ResidentialBuilding = 18,
  Storage = 19,
  Parking = 20,
  PurchaseGroupRight = 21,
}

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

export interface SerializedRealEstateForRent
  extends Omit<IRealEstateForRent, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
