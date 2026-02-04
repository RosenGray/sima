import { ICommercialRealEstate } from "../models/CommercialRealEstate";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export enum DealKind {
  Rent = 1,
  Sale = 2,
}

// Shared with for-rent and for-sale (single source of truth)
export { PropertyKind } from "../../for-rent/types/realEstateForRent.types";

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
