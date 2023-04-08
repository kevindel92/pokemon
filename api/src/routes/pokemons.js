const { Router } = require('express'); // ver

const router = Router(); //ver
const getAllPokemonsApiDb = require('../controllers/getPokemon');
const {pkmById} = require ('../controllers/getPokemonById');
const { createPkm } = require('../controllers/postPokemon');

//ruta para obtener todos y filtrar por name
// traigo todos los pokemons de la api como de la base de datos, y busco el nombre http://localhost:3001/pokemons?name=pikachu

const validate = (req, res, next) => {
    const { name, type, hp, attack, defense, speed, height, weight, image } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!type) return res.status(400).json({ error: 'Missing type' });
    if (!hp) return res.status(400).json({ error: 'Missing hp' });
    if (!attack) return res.status(400).json({ error: 'Missing attack' });
    if (!defense) return res.status(400).json({ error: 'Missing defense' });
    if (!speed) return res.status(400).json({ error: 'Missing speed' });
    if (!height) return res.status(400).json({ error: 'Missing height' });
    if (!weight) return res.status(400).json({ error: 'Missing weight' });
    if (!image) return res.status(400).json( { error: 'Missing image'});
    next();
}


router.get('/', async(req, res) => {
    try {
        const { name } = req.query;
        const pokeTotal = await getAllPokemonsApiDb();
        if(name){
            let pokeName = pokeTotal.filter((el) =>
                el.name.toLowerCase() === name.toLowerCase()
            );
            pokeName.length
            ? res.status(200).send(pokeName)
            : res.status(404).send('El pokemon no existe');
        } else {
            res.status(200).send(pokeTotal);
        }
    } catch (error) {
        console.log(error);
    }
});
//ruta para traer por id
// traigo los pokemons por el id
router.get('/:id', pkmById); 
//ruta para crear un nuevo pkm
router.post('/', validate, createPkm);

module.exports = router;