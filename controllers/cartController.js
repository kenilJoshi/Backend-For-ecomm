const { json } = require('express')
const Cart = require('../models/cartModels')
const Product = require('../models/productModal')

// exports.cartList = async (req, res) => {
//     res.status(200).send('hii from cart')
// }

exports.usersOrder = async (req, res) => {
    try{
        console.log(req.user.user_id);
        let orderList = await Cart.cartList(req.user.user_id)
        console.log(req.user.user_id);
        res.status(200).json({
            success: true,
            orderList
        })

    }catch(e){
        res.status(400).send(e)
    }
}

exports.orderDetails = async (req, res) => {
    try{
        let id = req.params.id
        let orderDetail = await Cart.orderDetail(id)
        let order = await Cart.order(id)
        console.log(orderDetail);
        res.status(200).json({
            success: true,
            orderDetail,
            order
        })
    }catch(e){
        res.status(400).send(e)
    }
}


exports.insertCart = async (req, res) => {

    try{
        let cartObj = req.body
        if(cartObj){
            let insertedCart = await Cart.insertCart({user_id: req.user.user_id, total_price: cartObj.totalPrice, total_quantity: cartObj.totalQuantity, address: cartObj.address})
            // console.log(insertedCart);
            let insertCartItem = []
            if(insertedCart.length !== 0){
                for(let i=0;i<cartObj.items.length;i++){
                    let cartItemList = {
                        cart_id: insertedCart[0].id,
                        quantity: cartObj.items[i]?.quantity,
                        price: cartObj.items[i]?.price,
                        product_id: cartObj.items[i]?.id
                    }
                    console.log(cartItemList);
                    Cart.insertCartItem(cartItemList).then((response)=>{
                        insertCartItem.push(response[0]);
                        if(i == cartObj.items.length - 1){
                            res.status(200).json({
                                success: true,
                                insertCartItem
                            })
                        }
                    })
                }

            }
        }
    }catch(e){
        res.status(400).send(e)
    }
}

exports.orderList = async (req, res) => {
    try{

        const orderList = await Cart.orderList()

        if(orderList.length !== 0){
            res.status(200).json({
                success: true,
                message:"order list",
                orderList
            })
        }

    }catch(e){
        return e
    }
}

exports.getPendingOrders = async (req, res) => {
    try{

        const status = 'Pending'
        const pendingOrder = await Cart.getPendingOrders(status)

        if(pendingOrder.length !== 0){
            res.status(200).json({
                success: true,
                pendingOrder
            })
        }
        
    }catch(e){
        res.status(400).send(e)
    }
}

exports.getCompleteOrders = async (req, res) => {
    try{

        const status = 'Complete'
        const completeOrder = await Cart.getPendingOrders(status)

        if(completeOrder.length !== 0){
            res.status(200).json({
                success: true,
                completeOrder
            })
        }
        
    }catch(e){
        res.status(400).send(e)
    }
}

exports.updateStatusOrder = async (req, res) => {
    try{

        let id = req.params.id
        const getOrder = await Cart.order(id)

        console.log(getOrder);

        if(getOrder.length !== 0){
            let status = getOrder[0].status == 'Pending' ? 'Complete' : 'Pending'

            const updateOrderStatus = await Cart.updateOrderStatus(id, status)

            res.status(200).json({
                success: true
            })

        }

        // if(completeOrder.length !== 0){
        //     res.status(200).json({
        //         success: true,
        //         completeOrder
        //     })
        // }
        
    }catch(e){
        res.status(400).send(e)
    }
}
