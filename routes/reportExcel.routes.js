

const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')

const reports = require('../controllers/reportExcel.controller')

router.get('/estudiantesConPacientes',checkToken,reports.estudiantes_con_pacientes_asignados);
router.get('/psicologosConPacientes',checkToken,reports.psicologos_con_pacientes_asignados);
// router.get('/personasSolicitantes',reports.registro_personas_enProceso);   
router.get('/personasAtendidasEgresados',checkToken,reports.registro_personasAtendidasEgresados);   
router.get('/personasAtendidasEstudiantes',checkToken,reports.registro_personasAtendidasEstudiantes);   
router.get('/personasCanceladas',checkToken,reports.registro_datos_personas_canceladas);   
router.get('/registroAtenciones',checkToken,reports.registro_atenciones);   
module.exports=router;