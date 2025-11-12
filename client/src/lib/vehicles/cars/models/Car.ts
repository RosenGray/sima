import { IVehicle } from "../../models/Vehicle";
import { EngineType, TransmissionType } from "../types/cars.types";


export interface ICar extends IVehicle {
    transmission: TransmissionType;
    engineType: EngineType;
}