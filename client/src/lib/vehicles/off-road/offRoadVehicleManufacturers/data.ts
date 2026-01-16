import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";

export const offRoadVehicleManufacturersMap = {
  JEEP: {
    id: "JEEP",
    name: "ג'יפ",
    russianName: "Jeep",
    models: [
      {
        id: "JEEP_WRANGLER",
        name: "רנגלר",
        russianName: "Wrangler",
      },
      {
        id: "JEEP_GRAND_CHEROKEE",
        name: "גרנד צ'רוקי",
        russianName: "Grand Cherokee",
      },
      {
        id: "JEEP_CHEROKEE",
        name: "צ'רוקי",
        russianName: "Cherokee",
      },
    ],
  },
  LAND_ROVER: {
    id: "LAND_ROVER",
    name: "לנד רובר",
    russianName: "Land Rover",
    models: [
      {
        id: "LAND_ROVER_DEFENDER",
        name: "דפנדר",
        russianName: "Defender",
      },
      {
        id: "LAND_ROVER_DISCOVERY",
        name: "דיסקברי",
        russianName: "Discovery",
      },
    ],
  },
  TOYOTA: {
    id: "TOYOTA",
    name: "טויוטה",
    russianName: "Toyota",
    models: [
      {
        id: "TOYOTA_LAND_CRUISER",
        name: "לנד קרוזר",
        russianName: "Land Cruiser",
      },
      {
        id: "TOYOTA_4RUNNER",
        name: "4Runner",
        russianName: "4Runner",
      },
      {
        id: "TOYOTA_HILUX",
        name: "הילוקס",
        russianName: "Hilux",
      },
    ],
  },
  FORD: {
    id: "FORD",
    name: "פורד",
    russianName: "Ford",
    models: [
      {
        id: "FORD_BRONCO",
        name: "ברונקו",
        russianName: "Bronco",
      },
      {
        id: "FORD_RANGER",
        name: "ריינג'ר",
        russianName: "Ranger",
      },
    ],
  },
  NISSAN: {
    id: "NISSAN",
    name: "ניסאן",
    russianName: "Nissan",
    models: [
      {
        id: "NISSAN_PATROL",
        name: "פטרול",
        russianName: "Patrol",
      },
      {
        id: "NISSAN_XTERRA",
        name: "אקסטרה",
        russianName: "Xterra",
      },
    ],
  },
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;
