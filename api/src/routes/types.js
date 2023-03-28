const { Router } = require("express");
const { getAllTypes } = require("../controllers/types.js");

const router = Router();

router.get("/", getAllTypes);

module.exports = router;