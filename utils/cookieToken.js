const jwt = require("jsonwebtoken")

const cookieToken = (user, res) => {
    const token = jwt.sign({email: user.email}, 'thisismyjwttopsecret')

    res.status(200).cookie("token", token).json({
        success: true,
        user,
        token
    })
}

module.exports = {
    cookieToken
}