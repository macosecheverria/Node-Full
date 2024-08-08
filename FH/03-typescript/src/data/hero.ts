export interface TipoHero {
  id: number;
  name: string;
  compania: string;
}

export const hero: TipoHero[] = [
  {
    id: 1,
    name: "Batman",
    compania: "Dc",
  },
  {
    id: 2,
    name: "Superman",
    compania: "Dc",
  },
  {
    id: 3,
    name: "Spiderman",
    compania: "Marvel",
  },
];
