const { Router } = require('express')
const router = new Router();

const paciente = require('../controllers/paciente.controller')
const {checkToken } = require('../validation/token.validation')


router.get('/listarpacasig/:id', checkToken,paciente.getpac_asignados);
router.get('/paciente_info/:id',checkToken,paciente.get_paciente_info)
router.get('/atenciones_registradas/:id',checkToken,paciente.get_atenciones_registradas)
router.post('/registrardata1', checkToken,paciente.registrar_primera_atencion);
router.post('/registrardata2', checkToken,paciente.registrar_atencion);
router.post('/finalizar_atencion/:id', checkToken,paciente.finalizar_atencion);
router.post('/derivar_externo/:id', checkToken,paciente.derivar_externo);
router.post('/cancelar_atencion/:id', checkToken,paciente.cancelar_atencion);
router.post('/derivar_atencion/:id', checkToken,paciente.derivar_atencion_inmediata);
router.post('/registrar_valoracion',paciente.registrar_puntuacion);
router.get('/get_historial/:id',checkToken,paciente.get_historial)



module.exports = router;