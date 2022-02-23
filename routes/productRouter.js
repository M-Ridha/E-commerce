const router = require('express').Router()
const productCtrl = require('../controllers/productController')
const {auth} = require('../middlewares/auth')
const {authAdmin} = require ('../middlewares/authAdmin')

router.route('/products')
    .get(productCtrl.getProducts)
    .post( auth, authAdmin, productCtrl.createProduct)


router.route('/products/:id')
    .delete(auth, authAdmin , productCtrl.deleteProduct)
    .put(auth, authAdmin , productCtrl.updateProduct)


module.exports = router