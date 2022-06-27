const {Router} = require('express')
const router = new Router();

const personal = require('../controllers/datos.personal.controller')
const {checkToken } = require('../validation/token.validation')

router.post('/register/dato_psicogolo',checkToken,personal.createDatoPsicologos);
router.get('/horarios/:id',checkToken,personal.gethorariospsicologo);
router.put('/update/dataschool',checkToken,personal.updatedataschool);
router.put('/update/foto',checkToken,personal.subirfoto);
router.post('/horario/post',checkToken,personal.createhorario);
router.delete('/horario/delete/:id',checkToken,personal.deletehorario);

module.exports = router;