import {
  VehicleManufacturer,
  VehicleManufacturerId,
} from "@/lib/vehicles/cars/vehicleManufacturers/types/vehicleManufacturer.schema";

export const motorcycleManufacturersMap = {
  YAMAHA: {
    id: "YAMAHA",
    name: "יאמאהא",
    russianName: "Yamaha",
    models: [
      {
        id: "YAMAHA_YZF_R1",
        name: "YZF-R1",
        russianName: "YZF-R1",
      },
      {
        id: "YAMAHA_YZF_R6",
        name: "YZF-R6",
        russianName: "YZF-R6",
      },
      {
        id: "YAMAHA_MT_07",
        name: "MT-07",
        russianName: "MT-07",
      },
      {
        id: "YAMAHA_MT_09",
        name: "MT-09",
        russianName: "MT-09",
      },
      {
        id: "YAMAHA_TENERE_700",
        name: "Tenere 700",
        russianName: "Tenere 700",
      },
    ],
  },
  HONDA: {
    id: "HONDA",
    name: "הונדה",
    russianName: "Honda",
    models: [
      {
        id: "HONDA_CBR_1000RR",
        name: "CBR1000RR",
        russianName: "CBR1000RR",
      },
      {
        id: "HONDA_CBR_600RR",
        name: "CBR600RR",
        russianName: "CBR600RR",
      },
      {
        id: "HONDA_CB_650F",
        name: "CB650F",
        russianName: "CB650F",
      },
      {
        id: "HONDA_AFRICA_TWIN",
        name: "Africa Twin",
        russianName: "Africa Twin",
      },
      {
        id: "HONDA_XR_650L",
        name: "XR650L",
        russianName: "XR650L",
      },
    ],
  },
  KAWASAKI: {
    id: "KAWASAKI",
    name: "קאווסאקי",
    russianName: "Kawasaki",
    models: [
      {
        id: "KAWASAKI_NINJA_ZX_10R",
        name: "Ninja ZX-10R",
        russianName: "Ninja ZX-10R",
      },
      {
        id: "KAWASAKI_NINJA_ZX_6R",
        name: "Ninja ZX-6R",
        russianName: "Ninja ZX-6R",
      },
      {
        id: "KAWASAKI_Z_900",
        name: "Z900",
        russianName: "Z900",
      },
      {
        id: "KAWASAKI_KLR_650",
        name: "KLR650",
        russianName: "KLR650",
      },
    ],
  },
  SUZUKI: {
    id: "SUZUKI",
    name: "סוזוקי",
    russianName: "Suzuki",
    models: [
      {
        id: "SUZUKI_GSX_R1000",
        name: "GSX-R1000",
        russianName: "GSX-R1000",
      },
      {
        id: "SUZUKI_GSX_R600",
        name: "GSX-R600",
        russianName: "GSX-R600",
      },
      {
        id: "SUZUKI_GSX_S750",
        name: "GSX-S750",
        russianName: "GSX-S750",
      },
      {
        id: "SUZUKI_DR_Z400",
        name: "DR-Z400",
        russianName: "DR-Z400",
      },
    ],
  },
  KTM: {
    id: "KTM",
    name: "KTM",
    russianName: "KTM",
    models: [
      {
        id: "KTM_1290_SUPER_DUKE",
        name: "1290 Super Duke",
        russianName: "1290 Super Duke",
      },
      {
        id: "KTM_790_ADVENTURE",
        name: "790 Adventure",
        russianName: "790 Adventure",
      },
      {
        id: "KTM_450_EXC",
        name: "450 EXC",
        russianName: "450 EXC",
      },
      {
        id: "KTM_350_EXC",
        name: "350 EXC",
        russianName: "350 EXC",
      },
    ],
  },
  DUCATI: {
    id: "DUCATI",
    name: "דוקאטי",
    russianName: "Ducati",
    models: [
      {
        id: "DUCATI_PANIGALE_V4",
        name: "Panigale V4",
        russianName: "Panigale V4",
      },
      {
        id: "DUCATI_MONSTER_821",
        name: "Monster 821",
        russianName: "Monster 821",
      },
      {
        id: "DUCATI_MULTISTRADA",
        name: "Multistrada",
        russianName: "Multistrada",
      },
    ],
  },
  BMW: {
    id: "BMW",
    name: "BMW",
    russianName: "BMW",
    models: [
      {
        id: "BMW_S_1000_RR",
        name: "S 1000 RR",
        russianName: "S 1000 RR",
      },
      {
        id: "BMW_R_1200_GS",
        name: "R 1200 GS",
        russianName: "R 1200 GS",
      },
      {
        id: "BMW_F_800_GS",
        name: "F 800 GS",
        russianName: "F 800 GS",
      },
    ],
  },
  TRIUMPH: {
    id: "TRIUMPH",
    name: "טריומף",
    russianName: "Triumph",
    models: [
      {
        id: "TRIUMPH_STREET_TRIPLE",
        name: "Street Triple",
        russianName: "Street Triple",
      },
      {
        id: "TRIUMPH_TIGER_800",
        name: "Tiger 800",
        russianName: "Tiger 800",
      },
      {
        id: "TRIUMPH_BONNEVILLE",
        name: "Bonneville",
        russianName: "Bonneville",
      },
    ],
  },
} satisfies Record<VehicleManufacturerId, VehicleManufacturer>;
