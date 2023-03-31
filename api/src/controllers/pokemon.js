const axios = require("axios");
const { Pokemon, Type } = require("../db");

const dataApi = async () => {
    try {
        let request = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
        let requestUrl = request.data.results.map((pokemon) => axios.get(pokemon.url));
        let subRequest = await axios.all(requestUrl);
        let pokemonData = subRequest.map((pokemon) => pokemon.data);
        let info = pokemonData.map((pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                height: pokemon.height,
                weight: pokemon.weight,
                hp: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                image: pokemon.sprites.other.dream_world.front_default,
                createdInDb: pokemon.createdInDb,
                type: pokemon.types.map((pokemon) => pokemon.type.name).join(", ")
            };
        });
        return info;
    } catch (error) {
        console.log(error);
    }
};

//-----------------------------------------------------------------------------------------------------------------

const dataDb = async () => {
    try {
        let infoDb = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        });

        let aux = infoDb.map((el) => {
            return {
                id: el.id,
                name: el.name,
                hp: el.hp,
                type: el.types.map((e) => e.name).join(", "),
                attack: el.attack,
                defense: el.defense,
                speed: el.speed,
                height: el.height,
                weight: el.weight,
                image: el.image
            };
        });
        return aux;
    } catch (error) {
        console.log(error);
    }
};

//---------------------------------------------------------------------------------------------

const allPokemon = async () => {
    try {
        const apiPkm = await dataApi();
        const dbPkm = await dataDb();
        const allPkm = dbPkm.concat(apiPkm);
        return allPkm;
    } catch (error) {
        console.log(error);
    }
};

//--------------------------------------------------------------------------------------------------

const getAllPkm = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            let aux = await allPokemon();
            let aux2 = aux.filter((el) => el.name === name);
            res.status(200).send(aux2);
        } else {
            const allPokemons = await allPokemon();
            res.send(allPokemons);
        }
    } catch (error) {
        console.log(error);
    }
};

//-------------------------------------------------------------------------------------

const pkmById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id.length > 7) {
            let pkmDbId = await Pokemon.findByPk(id, {
                include: {
                    model: Type
                }
            });
            return res.status(200).send(pkmDbId);
        } else {
            const pkmApiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const dataApiId = {
                id: pkmApiId.data.id,
                name: pkmApiId.name,
                type: pkmApiId.data.types.map((e) => e.type.name).join(", "),
                hp:pkmApiId.data.stats[0].base_stat,
                attack: pkmApiId.data.stats[1].base_stat,
                defense: pkmApiId.data.stats[2].base_stat,
                speed: pkmApiId.data.stats[5].base_stat,
                height: pkmApiId.data.height,
                weight: pkmApiId.data.weight,
                image: pkmApiId.data.sprites.other.dream_world.front_default
            };
            return res.status(200).send(dataApiId);
        }
    } catch (error) {
        console.log(error);
        
    }
};

//--------------------------------------------------------------------------------------------

const createPkm = async (req, res) => {
    try {
        const { id, name, type, hp, attack, defense, speed, height, weight, image, createdInDb } = req.body;
        let newPokemon = await Pokemon.create({
            id,
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
            createdInDb
        });
        let typeDb = await Type.findAll({
            where: { name: type }
        });
        newPokemon.addType(typeDb);
        res.status(200).send("Pokemon creado con exito");
    } catch (error) {
        console.log(error);
        res.status(400).send("No se pudo crear su Pokemon");
    }
};

module.exports = {
    getAllPkm,
    pkmById,
    createPkm
}