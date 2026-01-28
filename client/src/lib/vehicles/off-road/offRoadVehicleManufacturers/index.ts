import { Option } from "@/components/filters/select/types";
import { offRoadVehicleManufacturersMap } from "./data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/offRoadVehicleManufacturer.schema";

export { offRoadVehicleManufacturersMap };

const manufacturersListCache: VehicleManufacturer[] = Object.values(
  offRoadVehicleManufacturersMap,
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
  Object.entries(offRoadVehicleManufacturersMap) as Array<
    [VehicleManufacturerId, VehicleManufacturer]
  >,
);

export const getOffRoadVehicleManufacturers = (): VehicleManufacturer[] =>
  manufacturersListCache;

export const getOffRoadVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);

export const mapOffRoadVehicleManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;
