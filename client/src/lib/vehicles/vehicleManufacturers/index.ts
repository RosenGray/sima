import { Option } from "@/components/filters/TextSearch/SearchMultiSelect/types";
import { vehicleManufacturers } from "./data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/vehicleManufacturer.schema";

export { vehicleManufacturers };

export const getVehicleManufacturers = (): VehicleManufacturer[] =>
  Object.values(vehicleManufacturers);

export const getVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => vehicleManufacturers[id];

export const mapVehicleManufacturersToSelectOptions = (): Option[] =>
  getVehicleManufacturers().map(({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "manufacturer",
  }));
