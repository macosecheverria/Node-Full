import { httpClientPlugin as http } from "../plugins/http-client.pugin";

export const getPokemonById = async (id: string | number): Promise<string> => {

  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await http.get(url)

    console.log(pokemon.name);
    
    return pokemon.name;
  } catch (error) {
    throw `Pokemon not found with id ${id}`;    
  }

};

getPokemonById(1);
