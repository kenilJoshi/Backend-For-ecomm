const {pool} = require('../config/db')

class Product{

    async allProduct(){
        
        try{

            const statement = `
            SELECT * 
            FROM category 
            INNER JOIN product ON category.id = product.category_id;
            `
            const allProduct = await pool.query(statement)

            if(allProduct.rows.length != 0){
                return allProduct.rows
            }else if(allProduct.rows.length == 0){
                return allProduct
            }

        }catch(e){
            return e
        }

    }

    async findProductById(id){

        try{

            const statement = `
            SELECT * 
            FROM category 
            INNER JOIN product ON category.id = product.category_id
            where product.id = $1
            `
            const product = await pool.query(statement, [id])

            if(product.rows.length != 0){
                return product.rows
            }else if(product.rows.length == 0){
                return product
            }

        }catch(e){
            return e
        }

    }

    async firstSixProduct(limit, category_name) {
        try{

            const statement = `
            SELECT * 
            FROM category 
            INNER JOIN product ON category.id = product.category_id
            where category.name = $1
			limit $2
            `

            const product = await pool.query(statement, [category_name, limit])
            
            if(product.rows.length != 0){
                return product.rows
            }else{
                return null
            }
        }catch(e){
            console.log(e);
        }
    }
    
    async insertCategory(data){
        try{

            const statement = `
                insert into category (name)
                values ($1)
                RETURNING *;
            `
            const category = await pool.query(statement, [data])

            if(category.rows.length != 0){
                return category.rows
            }

        }catch(e){
            return e
        }
    }

    async getCategoryList(){
        try{

            const statement = `
                select * from category
            `
            const categoryList = await pool.query(statement)

            if(categoryList.rows.length != 0 ){
                return categoryList.rows
            }else if(categoryList.rows.length == 0){
                return categoryList
            }

        }catch(e){
            return e
        }
    }

    async updateCategory(data){
        try{

            const statement = `
                update category
                set name = $1
                where id = $2
                RETURNING *;
            `
            const values = [data.name, data.id]
            const result = await pool.query(statement, values)
        
            if(result.rows.length > 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            return e
        }
    }

    async insertProduct(data){
        try{

            const statement =  `
                insert into product (title, description, price, quantity, image, picture_id, category_id)
                values ($1, $2, $3, $4, $5, $6, (select id from category where name=$7))
                RETURNING *;
            `
            const values = [data.title, data.description, data.price, data.quantity, data.image, data.picture_id, data.category_name]
            const result = await pool.query(statement, values)

            if(result.rows.length !== 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            return e
        }

    }

    async updateProduct(data, productId) {
        try{
            const dataKeys = Object.keys(data)
            const dataValues = Object.values(data)

            const updateValueString = dataKeys.map((key, index) => `${key}=$${index + 2}`).join(', ')

            const statement = `update product set ${updateValueString} where id=$1 RETURNING *;`
            const result = await pool.query(statement, [productId, ...dataValues])

            if(result.rows.length!==0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            return e
        }
    }

    async deleteProduct(id){
        try{

            const statement = `delete from product where id=$1`

            const result = await pool.query(statement, [id])
            
            return result
        }catch(e){
            return e
        }
    }

    async deleteCategoryAndUpdate(id){
        if(id != 3){
            try{
                const query1 = `update product set category_id=3 where category_id=$1`

                const updateProductTable = await pool.query(query1,[id])

                const query2 = `delete from category where id=$1`

                const deleteCategory = await pool.query(query2, [id])

                return deleteCategory
            }catch(e){
                return e
            }
        }
    }

    async categoryAndProduct(id){
        console.log('here', id);
        try{
            console.log('here');
            const statement = ` SELECT * 
            FROM category 
            INNER JOIN product ON category.id = product.category_id
            where category.id = $1`

            const result = await pool.query(statement, [id])

            if(result.rows.length != 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            return e
        }
    }

}

module.exports = new Product()