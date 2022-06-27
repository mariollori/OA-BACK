

const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')

const reports = require('../controllers/reportExcel.controller')

router.get('/estudiantesConPacientes',reports.estudiantes_con_pacientes_asignados);
router.get('/psicologosConPacientes',reports.psicologos_con_pacientes_asignados);
// router.get('/personasSolicitantes',reports.registro_personas_enProceso);   
router.get('/personasAtendidasEgresados',reports.registro_personasAtendidasEgresados);   
router.get('/personasAtendidasEstudiantes',reports.registro_personasAtendidasEstudiantes);   
router.get('/personasCanceladas',reports.registro_datos_personas_canceladas);   
router.get('/registroAtenciones',reports.registro_atenciones);   
module.exports=router;