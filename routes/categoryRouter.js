const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryController')
const { auth } = require('../middlewares/auth')
const { authAdmin } = require('../middlewares/authAdmin')


router.route('/categories')
    .get(categoryCtrl.getCategories)
    .post( auth , authAdmin ,categoryCtrl.createCategory)

router.route('/categories/:id')
    .delete(auth , authAdmin ,categoryCtrl.deleteCategory)
    .put(auth , authAdmin ,categoryCtrl.updateCategory)

module.exports = router