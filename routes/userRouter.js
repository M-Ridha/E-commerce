const router = require('express').Router()
const userCtrl = require ('../controllers/userController')
const { auth } = require('../middlewares/auth')

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login )
router.get('/logout', userCtrl.logout )
router.get('/userProfile', auth , userCtrl.getUserProfile)
router.get('/refresh_token', userCtrl.refreshToken )
router.patch('/addCart' , auth , userCtrl.addCart )
router.get('/history' , auth , userCtrl.history )


module.exports = router