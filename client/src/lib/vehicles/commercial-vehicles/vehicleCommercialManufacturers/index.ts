import { Option } from "@/components/filters/select/types";
import { commercialVehicleManufacturersMap } from "./data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "./types/commercialVehicleManufacturer.schema";

export { commercialVehicleManufacturersMap };

const manufacturersListCache: VehicleManufacturer[] = Object.values(
  commercialVehicleManufacturersMap,
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
  Object.entries(commercialVehicleManufacturersMap) as Array<
    [VehicleManufacturerId, VehicleManufacturer]
  >,
);

export const getCommercialVehicleManufacturers = (): VehicleManufacturer[] =>
  manufacturersListCache;

export const getCommercialVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);

export const mapCommercialVehicleManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;
