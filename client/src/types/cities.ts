export type Area = {
  id: string;
  name: string;
  cities: City[];
  description?: string;
};

export type City = {
  id: string;
  name: string;
};

export enum AREAS {
  NORTH = "a1",
  SOUTH = "a2",
  EAST = "a3",
  WEST = "a4",
  CENTER = "a5",
}
