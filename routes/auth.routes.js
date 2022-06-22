const {Router} = require('express')
const router= new Router();

const auth = require('../controllers/auth.controller')


router.post('/login',auth.login);

router.put('/forgote-password',auth.forgot_password);

router.put('/change-password',auth.change_password)

module.exports=router;