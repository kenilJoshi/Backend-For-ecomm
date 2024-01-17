const express = require('express')
const router = express.Router()
const {signup, signin, logout, forgetPassword, passwordReset, addWishlist, wishlistwithProductdetail, getUserWishlist, getLoggedInUserDetail, removeWishlist, adminAllUser, adminSingleUser, adminDeleteUser} = require('../controllers/userControllers')
const {isLoggedIn, customRoles} = require('../middleware/authMiddleware')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/logout').get(logout)
router.route('/forgetPassword').post(forgetPassword)
router.route('/reset/:token').post(passwordReset)
router.route('/userDashboard').get(isLoggedIn, getLoggedInUserDetail)
router.route("/addWishList/:id").post(isLoggedIn, addWishlist)
router.route("/removewishlist/:id").delete(isLoggedIn, removeWishlist)
router.route("/wishlist").get(isLoggedIn, getUserWishlist)
router.route("/wishlistProduct").get(isLoggedIn, wishlistwithProductdetail)

router.route('/admin/users').get(isLoggedIn, customRoles('admin'), adminAllUser)
router.route('/admin/user/:id').get(isLoggedIn, customRoles('admin'), adminSingleUser)
router.route('/admin/deleteUser/:id').get(isLoggedIn, customRoles('admin'), adminDeleteUser)


module.exports = router
