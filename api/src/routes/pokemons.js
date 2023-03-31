const { Router } = require('express'); // ver

const router = Router(); //ver
const { getAllPkm, pkmById, createPkm } = require('../controllers/pokemon');

//ruta para obtener todos y filtrar por name
router.get('/', getAllPkm);
//ruta para traer por id
router.get('/:id', pkmById);
//ruta para crear un nuevo pkm
router.post('/', createPkm);

module.exports = router;