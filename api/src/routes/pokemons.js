const { Router } = require('express'); // ver

const router = Router(); //ver
const { getAllPkm } = require('../controllers/getPokemon');
const { pkmById } = require ('../controllers/getPokemonById');
const { createPkm } = require('../controllers/postPokemon');

//ruta para obtener todos y filtrar por name
router.get('/', getAllPkm);
//ruta para traer por id
router.get('/:id', pkmById);
//ruta para crear un nuevo pkm
router.post('/', createPkm);

module.exports = router;