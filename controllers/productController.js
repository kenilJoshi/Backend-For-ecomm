const Product  = require('../models/productModal')
const cloudinary = require('cloudinary').v2

exports.allProducts = async(req, res) => {
    try{

        const products = await Product.allProduct()
        if(products.length == 0){
            res.status(200).send('No recordd')
        }
        res.status(200).send(products)

    }catch(e){
        res.status(400).send(e)
    }
}

exports.singleProduct = async(req, res) => {
    try{
        const id = req.params.id

        const product = await Product.findProductById(id)
        if(product.length == 0){
            res.status(200).send('No recordd')
        }
        res.status(200).send(product)

    }catch(e){
        res.status(400).send(e)
    }
}

exports.recommandProduct = async(req, res) => {
    let limit = req.query.limit
    let category_name = req.query.name

    try{

        const product = await Product.firstSixProduct(limit, category_name)
        console.log(product);
        if(product){
            res.status(200).json(product)
        }else{
            res.status(200).json({
                success: false,
                message: 'There are no product'
            })
        }

    }catch(e){
        res.status(400).json({
            success: false,
            message: e
        })
    }
}

exports.createCategory = async(req, res) => {
    const {name} = req.body

    if(!name){
        res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }

    try{
        
        const newCategory = await Product.insertCategory(name) 
        if(newCategory.length !=0){
            res.status(200).json({
                success: true,
                message: "Completed",
                newCategory
            })
        }

    }catch(e){
        res.status(400).send(e)
    }
}

exports.categoryList = async (req, res) => {

    try{
        const categoryList = await Product.getCategoryList()
        if(categoryList.length == 0){
            res.status(200).send("No record found")
        }
        res.status(200).json({
            success: true,
            messsage: "List",
            categoryList
        })
    }catch(e){
        console.log('here');
        res.status(400).send(e)
    }
}

exports.updateCategory = async (req, res) => {

    const id = req.params.id
    const { name } = req.body
    try{

        const updateCategory = await Product.updateCategory({id, name})
        if(updateCategory.length == 0){
            res.status(200).send("No record found")
        }
        res.status(200).json({
            success: true,
            messsage: "updated",
            updateCategory
        })

    }catch(e){
        res.status(400).send(e)
    }

}

exports.insertProduct = async (req, res) => {
    let result
    console.log('result');
    if(req.files){
        console.log(req.files);
        // let file = req.files.photos
        // result = await cloudinary.uploader.upload(file.tempFilePath, {
        //     folder: "users",
        //     width: 150,
        //     crop: "scale"
        // })
    }

    // const {title, description, price, quantity, category_name} = req.body

    // if(!title || !description || !price || !quantity || !category_name){
    //     res.status(400).json({
    //         success: false,
    //         message: 'Field shouldnt be kept empty'
    //     })
    // }

    // try{
        
    //     const insertProduct = await Product.insertProduct({title, description, price, quantity, image: result.secure_url, picture_id: result.public_id, category_name})

    //     res.status(200).json({
    //         success: true,
    //         message: 'Inserted Product',
    //         insertProduct
    //     })

    // }catch(e){
    //     res.status(400).send(e.message)
    // }

}

exports.updateProduct = async (req, res) => {
    const id = req.params.id
    const data = req.body
    if(Object.keys(data).length === 0){
        res.status(400).send("you must provide the value")
    }

    try{
        const updatedProduct = await Product.updateProduct(data, id)
        console.log(updatedProduct);
        if(updatedProduct.length !== 0){
            res.status(200).json({
                success: true,
                message:'Updated',
                updatedProduct
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
    
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id

    try{
        const deleteProduct = await Product.deleteProduct(id)

        if(deleteProduct.rowCount != 0){
            res.status(200).json({
                success: true,
                message:'Deleted',
            })
        }else{
            res.status(200).json({
                success: false,
                message:'Not present',
            })
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.deleteCategory = async (req, res) => {
    const id = req.params.id

    try{
        const deleteCategory = await Product.deleteCategoryAndUpdate(id)
        if(deleteCategory.rowCount != 0){
            res.status(200).json({
                success: true,
                message:'Deleted',
            })
        }

    }catch(e){
        res.status(400).send(e)
    }
}

exports.categoryById = async (req, res) => {
    const id = req.params.id

    try{
        const categoryAndProduct = await Product.categoryAndProduct(id)

        if(categoryAndProduct.length != 0){
            res.status(200).json({
                success: true,
                message:'Updated',
                categoryAndProduct
            })
        }

    }catch(e){
        res.status(400).send(e)
    }

}