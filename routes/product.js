const express = require('express')
const router = express.Router()
const {allProducts, singleProduct, createCategory, categoryList, updateCategory, insertProduct, updateProduct, deleteProduct, deleteCategory, categoryById, recommandProduct} = require('../controllers/productController')
const {isLoggedIn, customRoles} = require("../middleware/authMiddleware")


router.route('/products').get(allProducts)
router.route('/product/:id').get(singleProduct)
router.route('/recommandProduct').get(recommandProduct)
router.route('/product/createCategory').post(isLoggedIn, customRoles('admin'), createCategory)
router.route("/categoryList").get(categoryList)
router.route("/updateCategory/:id").put(isLoggedIn, customRoles('admin'), updateCategory)
router.route("/insertProduct").post(isLoggedIn, customRoles("admin"), insertProduct)
router.route("/updateProduct/:id").put(isLoggedIn, customRoles("admin"), updateProduct)
router.route("/deleteProduct/:id").delete(isLoggedIn, customRoles("admin"), deleteProduct)
router.route("/deleteCategory/:id").delete(isLoggedIn, customRoles("admin"), deleteCategory)
router.route("/category/categoryById/:id").get(categoryById)

module.exports = router