import {
  ScooterManufacturer,
  ScooterManufacturerId,
} from "./types/scooterManufacturer.schema";

export const scooterManufacturersMap = {
  YAMAHA: {
    id: "YAMAHA",
    name: "יאמאהא",
    russianName: "Yamaha",
    models: [
      {
        id: "YAMAHA_NMAX",
        name: "NMAX",
        russianName: "NMAX",
      },
      {
        id: "YAMAHA_XMAX",
        name: "XMAX",
        russianName: "XMAX",
      },
      {
        id: "YAMAHA_TMAX",
        name: "TMAX",
        russianName: "TMAX",
      },
      {
        id: "YAMAHA_ZY125",
        name: "ZY125",
        russianName: "ZY125",
      },
    ],
  },
  HONDA: {
    id: "HONDA",
    name: "הונדה",
    russianName: "Honda",
    models: [
      {
        id: "HONDA_PCX",
        name: "PCX",
        russianName: "PCX",
      },
      {
        id: "HONDA_FORZA",
        name: "Forza",
        russianName: "Forza",
      },
      {
        id: "HONDA_SH",
        name: "SH",
        russianName: "SH",
      },
      {
        id: "HONDA_ADV",
        name: "ADV",
        russianName: "ADV",
      },
    ],
  },
  VESPA: {
    id: "VESPA",
    name: "וספה",
    russianName: "Vespa",
    models: [
      {
        id: "VESPA_PRIMAVERA",
        name: "Primavera",
        russianName: "Primavera",
      },
      {
        id: "VESPA_GTS",
        name: "GTS",
        russianName: "GTS",
      },
      {
        id: "VESPA_SPRINT",
        name: "Sprint",
        russianName: "Sprint",
      },
    ],
  },
  PIAGGIO: {
    id: "PIAGGIO",
    name: "פיאג'יו",
    russianName: "Piaggio",
    models: [
      {
        id: "PIAGGIO_BEVERELLY",
        name: "Beverelly",
        russianName: "Beverelly",
      },
      {
        id: "PIAGGIO_MEDLEY",
        name: "Medley",
        russianName: "Medley",
      },
      {
        id: "PIAGGIO_LIBERTY",
        name: "Liberty",
        russianName: "Liberty",
      },
    ],
  },
  SYM: {
    id: "SYM",
    name: "סים",
    russianName: "SYM",
    models: [
      {
        id: "SYM_CITYCOM",
        name: "Citycom",
        russianName: "Citycom",
      },
      {
        id: "SYM_JOYRIDE",
        name: "Joyride",
        russianName: "Joyride",
      },
      {
        id: "SYM_FIDDLE",
        name: "Fiddle",
        russianName: "Fiddle",
      },
    ],
  },
  KYMCO: {
    id: "KYMCO",
    name: "קימקו",
    russianName: "Kymco",
    models: [
      {
        id: "KYMCO_AGILITY",
        name: "Agility",
        russianName: "Agility",
      },
      {
        id: "KYMCO_XCITING",
        name: "Xciting",
        russianName: "Xciting",
      },
      {
        id: "KYMCO_DOWNTOWN",
        name: "Downtown",
        russianName: "Downtown",
      },
    ],
  },
  PEUGEOT: {
    id: "PEUGEOT",
    name: "פג'ו",
    russianName: "Peugeot",
    models: [
      {
        id: "PEUGEOT_SPEEDFIGHT",
        name: "Speedfight",
        russianName: "Speedfight",
      },
      {
        id: "PEUGEOT_DJANGO",
        name: "Django",
        russianName: "Django",
      },
      {
        id: "PEUGEOT_METROPOLIS",
        name: "Metropolis",
        russianName: "Metropolis",
      },
    ],
  },
  APRILIA: {
    id: "APRILIA",
    name: "אפריליה",
    russianName: "Aprilia",
    models: [
      {
        id: "APRILIA_SCARABEO",
        name: "Scarabeo",
        russianName: "Scarabeo",
      },
      {
        id: "APRILIA_SR",
        name: "SR",
        russianName: "SR",
      },
    ],
  },
} satisfies Record<ScooterManufacturerId, ScooterManufacturer>;
