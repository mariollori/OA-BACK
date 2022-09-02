const { Router } = require('express')
const router = new Router();
const {checkToken } = require('../validation/token.validation')

const semestre = require('../controllers/semestre.controller')




router.post('/postsem',checkToken, semestre.registrar_semestre);
router.get('/sem',checkToken, semestre.get_semestre);
router.get('/last_sem',checkToken, semestre.get_last_semestre);
router.put('/:id',checkToken, semestre.update_semestre);



module.exports = router;