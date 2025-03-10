export type District = {
  id: string;
  name: string;
  cities: City[];
  description?: string;
};

export type City = {
  id: string;
  name: string;
  nameRussian: string;
};

export enum Districts {
  North = "d1",
  South = "d2",
  Center = "d3",
  Heifa = "d4",
  Jerusalem = "d5",
  TelAviv = "d6",
}
