const jwt = require('jsonwebtoken')
const User = require('../models/userModals')

exports.isLoggedIn = async (req, res, next) => {
    console.log(req.cookies.token);

    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if(!token){
        return next(new Error('Token is not presented'))
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findByEmail(decoded.email)

    next()
}

exports.customRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return new Error('Yoou are not allowed to enter')
        }
        next()
    }
}