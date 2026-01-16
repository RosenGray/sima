import { Option } from "@/components/filters/select/types";
import { scooterManufacturersMap } from "../scooterManufacturers/data";
import {
  ScooterManufacturer,
  ScooterManufacturerId,
  ScooterModel,
} from "../scooterManufacturers/types/scooterManufacturer.schema";

const emptyOptions: Option[] = [];

const manufacturerEntries = Object.entries(
  scooterManufacturersMap,
) as Array<[ScooterManufacturerId, ScooterManufacturer]>;

const manufacturerLookupCache = new Map<
  ScooterManufacturerId,
  ScooterManufacturer
>(manufacturerEntries);

const modelOptionsCache = new Map<ScooterManufacturerId, Option[]>();
const modelLookupCache = new Map<
  ScooterManufacturerId,
  Map<ScooterModel["id"], ScooterModel>
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

export const getScooterModelsToSelectOptions = (
  manufacturerId: ScooterManufacturerId,
): Option[] => modelOptionsCache.get(manufacturerId) ?? emptyOptions;

export const getScooterModelsToSelectOptionsByManufacturerIds = (
  manufacturerIds: ScooterManufacturerId[],
): Option[] => {
  const cacheKey = [...manufacturerIds].sort().join(",");
  const cached = multiManufacturerModelOptionsCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const result = manufacturerIds.flatMap((manufacturerId) =>
    getScooterModelsToSelectOptions(manufacturerId),
  );

  multiManufacturerModelOptionsCache.set(cacheKey, result);

  return result;
};

export const getScooterModelById = (
  id: ScooterModel["id"],
  manufacturerId: ScooterManufacturerId,
): ScooterModel | undefined => modelLookupCache.get(manufacturerId)?.get(id);

export const getScooterManufacturerById = (
  id: ScooterManufacturerId,
): ScooterManufacturer | undefined => manufacturerLookupCache.get(id);
