const { Router } = require("express");

const router = Router();

const { getAllPkm, pkmById, createPkm } = require("../controllers/pokemon");

// ruta para obtener todos y filtrar por nombre
router.get("/", getAllPkm);

// ruta para traer por id
router.get("/:id", pkmById);

// ruta para crear un nuevo Pokemon
router.post("/", createPkm);

module.exports = router;