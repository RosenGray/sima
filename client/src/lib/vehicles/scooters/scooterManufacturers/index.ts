import { Option } from "@/components/filters/select/types";
import { scooterManufacturersMap } from "./data";
import {
  ScooterManufacturer,
  ScooterManufacturerId,
} from "./types/scooterManufacturer.schema";

export { scooterManufacturersMap };

const manufacturersListCache: ScooterManufacturer[] = Object.values(
  scooterManufacturersMap,
);

const manufacturerOptionsCache: Option[] = manufacturersListCache.map(
  ({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "manufacturer",
  }),
);

const manufacturerLookupCache = new Map<
  ScooterManufacturerId,
  ScooterManufacturer
>(
  Object.entries(scooterManufacturersMap) as Array<
    [ScooterManufacturerId, ScooterManufacturer]
  >,
);

export const getScooterManufacturers = (): ScooterManufacturer[] =>
  manufacturersListCache;

export const getScooterManufacturerById = (
  id: ScooterManufacturerId,
): ScooterManufacturer | undefined => manufacturerLookupCache.get(id);

export const mapScooterManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;
