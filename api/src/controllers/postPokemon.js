const { Pokemon, Type } = require('../db');

const createPkm = async (req, res) => {
	try {
		const {
			id,
			name,
			type,
			hp,
			attack,
			defense,
			speed,
			height,
			weight,
			image,
			createdInDb
		} = req.body;
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
		res.status(200).send('Your pokemon has been created!');
	} catch (error) {
		console.log(error);
		res.status(400).send('Cannot create your Pokemon');
	}
};

module.exports = {
	createPkm
};
