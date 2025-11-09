import { Option } from "@/components/filters/TextSearch/SearchMultiSelect/types";
import { vehicleManufacturers } from "../vehicleManufacturers/data";
import {
  VehicleManufacturer,
  VehicleManufacturerId,
  VehicleModel,
} from "../vehicleManufacturers/types/vehicleManufacturer.schema";

export const mapVehicleManufacturersToSelectOptions = (): Option[] =>
  Object.values(vehicleManufacturers).map(({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "manufacturer",
  }));

export const getVehicleModelsToSelectOptions = (
  manufacturerId: VehicleManufacturerId,
): Option[] => {
  const manufacturer = vehicleManufacturers[manufacturerId];

  if (!manufacturer) {
    return [];
  }

  return manufacturer.models.map(({ id, russianName }) => ({
    value: id,
    label: russianName,
    fieldKey: "model",
  }));
};

export const getVehicleModelsToSelectOptionsByManufacturerIds = (
  manufacturerIds: VehicleManufacturerId[],
): Option[] =>
  manufacturerIds.flatMap((manufacturerId) =>
    getVehicleModelsToSelectOptions(manufacturerId),
  );

export const getVehicleModelById = (
  id: VehicleModel["id"],
  manufacturerId: VehicleManufacturerId,
): VehicleModel | undefined => {
  const manufacturer = vehicleManufacturers[manufacturerId];

  return manufacturer?.models.find((model) => model.id === id);
};

export const getVehicleManufacturerById = (
  id: VehicleManufacturerId,
): VehicleManufacturer | undefined => vehicleManufacturers[id];
