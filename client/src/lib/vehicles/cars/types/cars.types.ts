import { ICar } from "../models/Car";
import { SerializedUser } from "@/lib/auth/types/auth.scema";

export enum TransmissionType {
  MANUAL = "manual",
  AUTOMATIC = "automatic",
  TIPTRONIC = "tiptronic",
  ROBOTIC = "robotic",
}

export enum EngineType {
  GASOLINE = "gasoline",
  DIESEL = "diesel",
  TURBO_DIESEL = "turboDiesel",
  HYBRID = "hybrid",
  ELECTRIC = "electric",
}

export interface SerializedCar
  extends Omit<ICar, "createdAt" | "updatedAt" | "user"> {
  updatedAt: string;
  createdAt: string;
  user: SerializedUser;
}