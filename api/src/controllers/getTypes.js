const axios = require('axios');
const { Type } = require('../db');

const getAllTypes = async (req, res) => {
	try {
		const types = await axios.get('https://pokeapi.co/api/v2/type');
		const apiTypes = types.data.results.map((e) => e.name);
		apiTypes.forEach((el) =>
			Type.findOrCreate({
				where: { name: el }
			})
		);
		const allTypes = await Type.findAll();
		console.log('Estos son los tipos',allTypes);
		return res.status(200).json(allTypes);
		
	} catch (error) {
		// console.log(error);
		return res.status(400).json({error: error.message})
	}
};

module.exports = {
	getAllTypes
};