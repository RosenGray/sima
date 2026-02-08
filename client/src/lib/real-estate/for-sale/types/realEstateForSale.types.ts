import { IRealEstateForSale } from "../models/RealEstateForSale";
import { SerializedUser } from "@/lib/auth/types/auth.scema";
import {
  AirConditioning,
  Parking,
  AdditionalFeatures,
  Furniture,
  EntryDate,
} from "@/lib/real-estate/common/types/realEstateCommon.types";

export { AirConditioning, Parking, AdditionalFeatures, Furniture, EntryDate };

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

export interface SerializedRealEstateForSale
  extends Omit<IRealEstateForSale, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
