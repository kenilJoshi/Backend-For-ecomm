const cloudinary = require('cloudinary').v2
const User = require('../models/userModals')
const {validateUser, validatePassword} = require('../utils/validatorUtil')
const {cookieToken} = require('../utils/cookieToken')
const nodeMailer = require('../utils/emailHelper')
const crypto = require('crypto')

exports.signup = async(req, res) => {
    let result
    // console.log(req);
    console.log(req.body);
    // res.send("hii from usercontroller")
    // if(req.files){
    //     let file = req.files.photo
    //     result = await cloudinary.uploader.upload(file.tempFilePath, {
    //         folder: "users",
    //         width: 150,
    //         crop: "scale"
    //     })
    // }
    
    // const {name, email, password, picture_id, secureUrl} = req.body
    // const {name, email, password} = req.body

    res.status(200).send(req.body)

    // console.log(name);

    // if(!name || !email || !password){
    //     res.status(400).send({
    //         Error: 'Please fill all the values'
    //     })
    // }

    // try{
    //     let data = await validateUser({name, email, password})
    //     const newUser = await User.Create({
    //         name: data.name,
    //         email: data.email,
    //         password: data.password,
    //         picture_id: 'kenil',
    //         secureUrl: 'kenil'
    //     })
    //     // res.send(newUser)
    //     cookieToken(newUser, res)
    // }catch(e){
    //     res.status(400).send(e.message)
    // }

}

exports.signin = async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        res.status(400).send({
            Error: 'Please fill all the values'
        })
    }
    try{
        const user = await User.findByEmail(email)
        if(user.role !== 'admin'){
            if(user !== null){
                const isPasswordCorrect = await validatePassword(password, user.password)
                if(isPasswordCorrect){
                    cookieToken(user, res)
                }else{
                    res.status(400).send('wrong password or email')
                }
            }else{
                res.status(400).send('wrong password or email')
            }
        }else{
            cookieToken(user, res)
        }   
    }catch(e){
        res.status(400).send(e)
    }

    
}

exports.logout = async (req, res) => {
    res.cookie("token", null)
    res.status(200).json({
        success: true,
        message: "logout successfully"
    })
}

exports.forgetPassword = async (req, res) => {
    const {email} = req.body;

    if(!email){
        res.status(400).send('Email is not provided')
    }

    const forgot_Password_Token = await User.forgotPasswordToken(email)

    if(forgot_Password_Token == null){
        res.status(400).send('User is not present')
    }

    const myUrl = `${req.protocol}://localhost:5173/reset/${forgot_Password_Token}`
    const message = `Copy paste the url to reset the password \n\n ${myUrl}`;

    console.log(message);

    try{
        await nodeMailer({
            email: email,
            subject: "Tshirt store reset password",
            message: message
        })

        res.status(200).json({
            success: true,
            message: 'Email sent'
        })

    }catch(e){
        res.status(400).send(e)
    }

}

exports.passwordReset = async (req, res) => {
    const token = req.params.token
    const password = req.body.password;

    if(!password){
        res.status(400).sennd('password shouldnt be empty')
    }

    try{
        const user = await User.updatePassword(token, password)
        if(user != null){
            cookieToken(user, res)
        }else{
            res.status(400).send('The Password has changed')
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.getLoggedInUserDetail = async (req, res) => {
    console.log(req.user);
    res.status(200).json({...req.user})
}

exports.addWishlist = async (req, res) => {

    try{
        let product_id = req.params.id

        const wishlist = await User.addToWishList(product_id, req.user.user_id)

        if(wishlist.length !== 0){
        res.status(200).json({
            success: true,
            wishlist
        })
    }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.removeWishlist = async (req, res) => {
    try{
        let id= req.params.id

        const removeeishlist = await User.removeWishlist(id)

        if(removeeishlist){
            res.status(200).json({
                status: true
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.getUserWishlist = async(req, res) => {
    try{
        let userWishlist = await User.userWishlist(req.user.user_id)
        
        if(userWishlist.length !== 0){
            res.status(200).json({
                success: true,
                userWishlist
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.wishlistwithProductdetail = async(req, res) => {
    console.log('kenil');
    try{
        let wishlistwithProductdetail = await User.getWishlistWithProduct(req.user.user_id)

        if(User.userWishlist.length !== 0){
            res.status(200).json({
                success: true,
                wishlistwithProductdetail
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.adminAllUser = async (req, res) => {
    try{
        const allUser = await User.allUser()

        res.status(200).send(allUser)
    }catch(e){
        res.status(400).send(e)
    }

}

exports.adminSingleUser = async (req, res) => {
    try{
        const id = req.params.id
        const singleUser = await User.singleUser(id)

        res.status(200).send(singleUser)

    }catch(e){
        res.status(400).send(e)
    }
}

exports.adminDeleteUser = async (req, res) => {
    
    try{
        const id = req.params.id
        const deleteUser = await User.deleteUser(id)

        if(deleteUser!=null){
            res.status(200).json({
                success: true,
                message: "deleted"
            })
        }else{
            res.status(400).json({
                success: false,
                message: "no record"
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
}