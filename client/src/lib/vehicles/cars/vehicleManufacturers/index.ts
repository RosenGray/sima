import { Option } from "@/components/filters/TextSearch/SearchMultiSelect/types";
import { vehicleManufacturers } from "./data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/vehicleManufacturer.schema";

export { vehicleManufacturers };

const manufacturersListCache: VehicleManufacturer[] = Object.values(
  vehicleManufacturers,
);

const manufacturerOptionsCache: Option[] = manufacturersListCache.map(
  ({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "manufacturer",
  }),
);

const manufacturerLookupCache = new Map<
  VehicleManufacturerId,
  VehicleManufacturer
>(
  Object.entries(vehicleManufacturers) as Array<
    [VehicleManufacturerId, VehicleManufacturer]
  >,
);

export const getVehicleManufacturers = (): VehicleManufacturer[] =>
  manufacturersListCache;

export const getVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);

export const mapVehicleManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;
