const {Router} = require('express')
const router = new Router();

const consulta = require('../controllers/consultante.controller')


router.post('/postpaciente',consulta.crearpaciente);


module.exports = router;