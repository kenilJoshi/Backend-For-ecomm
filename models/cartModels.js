const { query } = require("express");
const {pool} = require("../config/db")


class Cart {


    async insertCart(data){
        try{
            const values = [data.product_id, data.quantity, data.user_id, data.price]
    
            //  See this afterwards for error
            // const statement = `
            // with 
            // data(product_id, quantity, user_id, price)
            // as ( values ($1, $2, $3, $4)),
            // first_insert as (
            //     insert into cart(user_id)
            //     select user_id from data
            //     RETURNING user_id, id as sample_id
            // )
            // insert into cartitem(product_id, quantity, price, cart_id)
            // select d.product_id, d.quantity, d.price, fi.sample_id
            // from data d
            // cross join first_insert fi
            // RETURNING *;
            // `;
            //  See this afterwards for error

            const statement = `insert into orders (user_id, total_price, total_quantity, address) values ($1, $2, $3, $4) RETURNING *;`
            const result = await pool.query(statement, [data.user_id, data.total_price, data.total_quantity, data.address])

        if(result.rows.length > 0){
            return result.rows
        }else{
            return null
        }
        }catch(e){
            return e
        }
    }

    async insertCartItem(data){
        try{
            console.log('here',data);

            const statement = `
            INSERT INTO cartitem (quantity, price, product_id, order_id) values ($1, $2, $3, $4) RETURNING *;`

            let order_id = data.cart_id

            const result = await pool.query(statement, [data.quantity, data.price, data.product_id, order_id])

            if(result.rows.length > 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            return e
        }
    }

    async cartList(id){
        try{

            const statement =  `
            select * from orders where user_id=$1 order by id DESC 

            `
            const result = await pool.query(statement, [id])
            console.log(result);
            if(result.rows.length){
                return result.rows
            }else{  
                return []
            }
            
        }catch(e){
            return e
        }
    }

    async cartItem(product_id){
        try{

            const statement = `
                select * from cartitem where product_id=$1
            `
            const result = await pool.query(statement, [product_id])

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }

        }catch(e){
            return e
        }
    }

    async orderDetail(order_id){
        try{

            const statement = `
            SELECT cartitem.quantity, product.title, cartitem.price, cartitem.id 
            FROM cartitem
            INNER JOIN product ON product.id = cartitem.product_id
            WHERE order_id = $1;
            `
            const result = await pool.query(statement, [order_id])

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }
        }catch(e){
            return e
        }
    }
    
    async getPendingOrders(status){
        try{

            const statement = `select * from orders where status=$1`

            const result = await pool.query(statement, [status])

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }

        }catch(e){
            throw new Error(e)
        }

    }

    async order(id) {
        try{

            const statement = `select * from orders where id=$1`

            const result = await pool.query(statement, [id])

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }

        }catch(e){
            return e
        }
    }

    async orderList(){
        try{
            
            const statement = `select * from orders
            inner join cartitem on orders.id=cartitem.order_id
            `
            const result = await pool.query(statement)

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }

        }catch(e){
            return e
        }
    }

    async updateOrderStatus(id, status){
        try{

            const statement = `update orders set status = $1 where id=$2 RETURNING *;`

            const result = await pool.query(statement, [status, id])

            if(result.rows.length){
                return result.rows
            }else{
                return []
            }

        }catch(e){
            throw new Error(e)
        }
    }

}

module.exports = new Cart()