const {Router} = require('express')
const router = new Router();

const consulta = require('../controllers/consultante.controller')

const {formvalid } = require('../validation/form.validation')
router.post('/postpaciente',formvalid,consulta.crearpaciente);


module.exports = router;