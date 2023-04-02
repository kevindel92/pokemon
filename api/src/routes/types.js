const { Router } = require('express');
const { getAllTypes } = require('../controllers/getTypes');

const router = Router();

router.get('/', getAllTypes);

module.exports = router;