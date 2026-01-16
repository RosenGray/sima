import { Option } from "@/components/filters/select/types";
import { motorcycleManufacturersMap } from "../motorcycleManufacturers/data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
  VehicleModel,
} from "../motorcycleManufacturers/types/motorcycleManufacturer.schema";

const emptyOptions: Option[] = [];

const manufacturerEntries = Object.entries(
  motorcycleManufacturersMap,
) as Array<[VehicleManufacturerId, VehicleManufacturer]>;

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

export const getMotorcycleModelsToSelectOptions = (
  manufacturerId: VehicleManufacturerId,
): Option[] => modelOptionsCache.get(manufacturerId) ?? emptyOptions;

export const getMotorcycleModelsToSelectOptionsByManufacturerIds = (
  manufacturerIds: VehicleManufacturerId[],
): Option[] => {
  const cacheKey = [...manufacturerIds].sort().join(",");
  const cached = multiManufacturerModelOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = manufacturerIds.flatMap((manufacturerId) =>
    getMotorcycleModelsToSelectOptions(manufacturerId),
  );

  multiManufacturerModelOptionsCache.set(cacheKey, result);

  return result;
};

export const getMotorcycleModelById = (
  id: VehicleModel["id"],
  manufacturerId: VehicleManufacturerId,
): VehicleModel | undefined => modelLookupCache.get(manufacturerId)?.get(id);

export const getMotorcycleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => manufacturerLookupCache.get(id);
