const express = require('express')
const router = express.Router()
const { insertCart, orderList, usersOrder, orderDetails, updateStatusOrder} = require("../controllers/cartController")
const {isLoggedIn, customRoles} = require("../middleware/authMiddleware")

router.route("/order").get(isLoggedIn, usersOrder)
router.route("/orderDetail/:id").get(isLoggedIn, orderDetails)
router.route("/cartCreate").post(isLoggedIn, insertCart)
router.route("/orderList").get(isLoggedIn, customRoles("admin"), orderList)
router.route("/updateOrder/:id").put(isLoggedIn, customRoles("admin"), updateStatusOrder)
router.route("/getPendingOrders").get(isLoggedIn, customRoles("admin"), updateStatusOrder)
router.route("/getCompleteOrder").get(isLoggedIn, customRoles("admin"), updateStatusOrder)

module.exports = router
