import { Option } from "@/components/filters/select/types";
import { motorcycleManufacturersMap } from "./data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/motorcycleManufacturer.schema";

export { motorcycleManufacturersMap };

const manufacturersListCache: VehicleManufacturer[] = Object.values(
  motorcycleManufacturersMap,
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
  Object.entries(motorcycleManufacturersMap) as Array<
    [VehicleManufacturerId, VehicleManufacturer]
  >,
);

export const getMotorcycleManufacturers = (): VehicleManufacturer[] =>
  manufacturersListCache;

export const getMotorcycleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);

export const mapMotorcycleManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;
