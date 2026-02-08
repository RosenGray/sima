import { ICommercialRealEstate } from "../models/CommercialRealEstate";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export enum DealKind {
  Rent = 1,
  Sale = 2,
  Delivery = 3,
  GroupPurchase = 4,
  BusinessPartnership = 5,
  AssetConsolidation = 6,
}

export enum CommercialPropertyKind {
  Offices = 1,
  Stores = 2,
  Clinics = 3,
  Studio = 4,
  PrivateParking = 5,
  Warehouses = 6,
  Basements = 7,
  Plots = 8,
  Buildings = 9,
  IncomeGenerating = 10,
  CafesAndRestaurants = 11,
  IndustrialHalls = 12,
  EventHalls = 13,
  IndustrialBuildings = 14,
  AgriculturalLand = 15,
  Nahala = 16,
  VacationApartments = 17,
  RealEstateAbroad = 18,
  Businesses = 19,
  Other = 20,
}

export enum AdditionalFeatures {
  Shelter = 1,
  Guard = 2,
  Accessible = 3,
  Alarm = 4,
  Kitchen = 5,
  MeetingRoom = 6,
  ReceptionDesk = 7,
}

export interface SerializedCommercialRealEstate
  extends Omit<ICommercialRealEstate, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}
