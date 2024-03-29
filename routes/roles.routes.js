const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')
const opciones_rol = require('../controllers/roles.controller')


router.get('/getopciones/',checkToken,opciones_rol.get_opciones_por_rol);

router.get('/listarop/',checkToken,opciones_rol.listaropciones);
router.post('/crearop/',checkToken,opciones_rol.crearopcion);
router.delete('/eliminarop/:id',checkToken,opciones_rol.eliminaropcion);
router.put('/modificarop/',checkToken,opciones_rol.modificaropcion);
router.post('/asignarop/',checkToken,opciones_rol.asignaropc_rol);
router.get('/listaropid/:id',checkToken,opciones_rol.listaropcid);

router.get('/listarrol/',checkToken,opciones_rol.listarrol);
router.post('/crearrol/',checkToken,opciones_rol.crearrol);
router.delete('/eliminarrol/:id',checkToken,opciones_rol.eliminarrol);
router.put('/modificarrol/',checkToken,opciones_rol.modificarrol);
router.get('/listarrolid/:id',checkToken,opciones_rol.listarrolid);

router.get('/listaropcdisponibles/:id',checkToken,opciones_rol.listaropcdisponibles);
router.get('/listarrolesdisponibles/:id',checkToken,opciones_rol.listarusuariosdisponibles);
router.get('/listarrolesactuales/:id',checkToken,opciones_rol.listarusuariospertenecientes);
router.post('/asignarrol/',checkToken,opciones_rol.asignarrol_user);

router.get('/listarusers/',checkToken,opciones_rol.listarusuarios);
router.get('/listarusers_desactives/',checkToken,opciones_rol.listarusuarios_tipo);
router.get('/listaropcionesactuales/:id',checkToken,opciones_rol.listaropcionesderol);


router.delete('/eliminaropcrol/:id',checkToken,opciones_rol.eliminaropcionderol);
router.delete('/eliminarroluser/:id',checkToken,opciones_rol.eliminarroldeusuario);


router.delete('/desactivar_user/:id',checkToken,opciones_rol.desactivar_usuario);
router.delete('/activar_user/:id',checkToken,opciones_rol.activar_usuario)


module.exports = router;