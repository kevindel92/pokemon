const axios = require('axios');
const { Pokemon, Type } = require('../db');

// trae los pokemons

const getPokemonsApi = async () => {
    try {
        const pokeInfo = [];
        const pokeApiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15');
        const results = pokeApiUrl.data.results;

        for(let i = 0; i < results.length; i++){
            const pokes = await axios.get(results[i].url);
            
            pokeInfo.push({
                id: pokes.data.id,
                name: pokes.data.name,
                image: pokes.data.sprites.other.dream_world.front_default,
                hp:pokes.data.stats[0].base_stat,
                attack: pokes.data.stats[1].base_stat,
                defense: pokes.data.stats[2].base_stat,
                speed: pokes.data.stats[5].base_stat,
                height: pokes.data.height,
                weight: pokes.data.weight,
                type: pokes.data.types.map((typ) => typ.type.name).join(', ')
            });
        }
        console.log('Esta es la dataApi', pokeInfo);
        return pokeInfo;
    } catch (error) {
        return {error: error.message}
    }
}
getPokemonsApi();

const getPokemonsDb = async () => {
    try {
        const results = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        });
		const results2 = results.map((el) => {
			return {
				id: el.id,
				name: el.name,
				image: el.image,
				hp: el.hp,
				attack: el.attack,
				defense: el.defense,
				speed: el.speed,
				height: el.height,
				weight: el.weight,
				type: el.types.map((e) => e.name).join(', ')
			};
		});
        console.log('Esta es la dataDb', results2);
        return results2;
    } catch (error) {
        return {error: error.message};
    }
}

const getAllPokemonsApiDb = async () => {
    try {
        const apiInfo = await getPokemonsApi();
        const dbInfo = await getPokemonsDb();
        const infoTotal = dbInfo.concat(apiInfo);
        console.log('Esta es la info total', infoTotal);
        return infoTotal;
    } catch (error) {
    return {error: error.message}
    }
}
module.exports = getAllPokemonsApiDb;