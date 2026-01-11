import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";

export const commercialVehicleManufacturersMap = {
  OPEL: {
    id: "OPEL",
    name: "אופל",
    russianName: "Opel",
    models: [
      {
        id: "OPEL_VIVARO_LONG",
        name: "ויוארו ארוך",
        russianName: "Vivaro длинная база",
      },
      {
        id: "OPEL_VIVARO_SHORT",
        name: "ויוארו קצר",
        russianName: "Vivaro короткая база",
      },
      {
        id: "OPEL_MOVANO",
        name: "מובאנו",
        russianName: "Movano",
      },
      {
        id: "OPEL_COMBO",
        name: "קומבו",
        russianName: "Combo",
      },
      {
        id: "OPEL_CORSA_COMBO",
        name: "קורסה קומבו",
        russianName: "Corsa Combo",
      },
    ],
  },
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;
