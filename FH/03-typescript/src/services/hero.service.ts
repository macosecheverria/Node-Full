import { TipoHero, hero } from "../data/hero";

export const findHeroById = (id: number): TipoHero | undefined => {
  return hero.find((el) => el.id === id);
};

console.log(findHeroById(2));
