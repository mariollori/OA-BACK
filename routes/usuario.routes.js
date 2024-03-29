const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')
const usuario = require('../controllers/usuario.controller')

router.get('/nombre/:id',checkToken, usuario.get_nombre_usuario);
router.get('/:id',checkToken, usuario.get_datos_usuario);
router.get('/datapersonal/:id',checkToken, usuario.get_datos_personales);
router.get('/dataschool/:id',checkToken, usuario.get_datos_academicos);
router.get('/dataasig/:id',checkToken, usuario.getasignaciondata);
router.get('/persondata/:id', checkToken,usuario.getpersonadata);
router.get('/roles/:id', checkToken,usuario.getNameOfRol);
router.get('/getuserstocompare/getdata',checkToken, usuario.getuserstocompare);
router.put('/putdataper',checkToken, usuario.modificar_datos_personales);
// router.get('/estadisticastotales/fecha',checkToken,usuario.estadisticas_generales_tipo_sede_fecha);
// router.get('/estadisticas/fecha',checkToken,usuario.obtenerestadisticas_fecha);


module.exports=router