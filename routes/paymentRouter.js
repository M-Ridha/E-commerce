const router = require ('express').Router()
const paymentCtrl = require('../controllers/paymentController')
const {auth} = require('../middlewares/auth')
const {authAdmin} = require ('../middlewares/authAdmin')


router.route('/payment')
    .get(auth , authAdmin , paymentCtrl.getPayments)
    .post(auth , paymentCtrl.createPayment )


module.exports = router