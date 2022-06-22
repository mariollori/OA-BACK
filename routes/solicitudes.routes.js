const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')

const solicitud = require('../controllers/solicitudes.controller')



router.get('/getsolpsi',checkToken,solicitud.list_personal_sede);
router.post('/crearusuario',checkToken,solicitud.crearusuariooa);
router.post('/deletepersona',checkToken,solicitud.deletesolicitud);




module.exports = router;