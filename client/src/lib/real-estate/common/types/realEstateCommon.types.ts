/**
 * Shared enums used by both for-rent and for-sale residential flows.
 * PropertyKind and DealKind are flow-specific and live in their respective modules.
 */

export enum AirConditioning {
  None = 1,
  InRooms = 2,
  InRoomsAndLivingRoom = 3,
  InLivingRoom = 4,
  Central = 5,
  MiniCentral = 6,
  Split = 7,
}

export enum Parking {
  None = 1,
  InTheStreet = 2,
  Shared = 3,
  PayedParking = 4,
  PrivateCovered = 5,
  PrivateUncovered = 6,
}

export enum AdditionalFeatures {
  Bars = 1,
  Elevator = 2,
  ForRoommates = 3,
  Warehouse = 4,
  Shelter = 5,
  PetsSuitable = 6,
  SolarHeater = 7,
  Renovated = 8,
}

export enum Furniture {
  None = 1,
  Partial = 2,
  Full = 3,
}

export enum EntryDate {
  Immediate = 1,
  Flexible = 2,
}
