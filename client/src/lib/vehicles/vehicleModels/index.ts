import { Option } from "@/components/filters/TextSearch/SearchMultiSelect/types";
import { vehicleManufacturers } from "../vehicleManufacturers/data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
  VehicleModel,
} from "../vehicleManufacturers/types/vehicleManufacturer.schema";

const emptyOptions: Option[] = [];

const manufacturerEntries = Object.entries(vehicleManufacturers) as Array<
  [VehicleManufacturerId, VehicleManufacturer]
>;

const manufacturerOptionsCache: Option[] = manufacturerEntries.map(
  ([id, manufacturer]) => ({
    value: id,
    label: manufacturer.russianName,
    fieldKey: "manufacturer",
  }),
);

const manufacturerLookupCache = new Map<
  VehicleManufacturerId,
  VehicleManufacturer
>(manufacturerEntries);

const modelOptionsCache = new Map<VehicleManufacturerId, Option[]>();
const modelLookupCache = new Map<
  VehicleManufacturerId,
  Map<VehicleModel["id"], VehicleModel>
>();

manufacturerEntries.forEach(([manufacturerId, manufacturer]) => {
  const modelOptions = manufacturer.models.map(({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "model",
  }));

  modelOptionsCache.set(manufacturerId, modelOptions);
  modelLookupCache.set(
    manufacturerId,
    new Map(
      manufacturer.models.map((model) => [model.id, model] as const),
    ),
  );
});

const multiManufacturerModelOptionsCache = new Map<string, Option[]>();

export const mapVehicleManufacturersToSelectOptions = (): Option[] =>
  manufacturerOptionsCache;

export const getVehicleModelsToSelectOptions = (
  manufacturerId: VehicleManufacturerId,
): Option[] => modelOptionsCache.get(manufacturerId) ?? emptyOptions;

export const getVehicleModelsToSelectOptionsByManufacturerIds = (
  manufacturerIds: VehicleManufacturerId[],
): Option[] => {
  const cacheKey = [...manufacturerIds].sort().join(",");
  const cached = multiManufacturerModelOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = manufacturerIds.flatMap((manufacturerId) =>
    getVehicleModelsToSelectOptions(manufacturerId),
  );

  multiManufacturerModelOptionsCache.set(cacheKey, result);

  return result;
};

export const getVehicleModelById = (
  id: VehicleModel["id"],
  manufacturerId: VehicleManufacturerId,
): VehicleModel | undefined => modelLookupCache.get(manufacturerId)?.get(id);

export const getVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);
