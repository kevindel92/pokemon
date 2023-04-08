const axios = require('axios');
const { Pokemon, Type } = require('../db');

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
			const pkmApiId = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${id}`
			);
			const dataApiId = {
				id: pkmApiId.data.id,
				name: pkmApiId.data.name,
				type: pkmApiId.data.types.map((e) => e.type.name).join(', '),
				hp: pkmApiId.data.stats[0].base_stat,
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

module.exports =  {
	pkmById
}