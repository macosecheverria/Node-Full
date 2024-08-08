"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonById = void 0;
const http_client_pugin_1 = require("../plugins/http-client.pugin");
const getPokemonById = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const pokemon = await http_client_pugin_1.httpClientPlugin.get(url);
        console.log(pokemon.name);
        return pokemon.name;
    }
    catch (error) {
        throw `Pokemon not found with id ${id}`;
    }
};
exports.getPokemonById = getPokemonById;
(0, exports.getPokemonById)(1);
