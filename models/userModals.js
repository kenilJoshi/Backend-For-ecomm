const { query } = require('express');
const {pool} = require('../config/db')
const crypto = require("crypto");
const bcrypt = require('bcryptjs');

class User{

    async Create(data) {
        try{

            // let client = await clientQuery
            console.log(data);
            const statement = `with
                data(name, email, password, picture_id, secureUrl) as ( values
                ($1, $2, $3, $4, $5)),
                first_insert AS (
                    INSERT INTO user_profile(name, email, password)
                    SELECT name, email, password FROM data
                    RETURNING name, email, password, id AS sample_id
                  )
                  INSERT INTO profile(picture_id, secure_url, user_id)
                  SELECT d.picture_id, d.secureUrl, fi.sample_id
                  FROM data d
                  CROSS JOIN first_insert fi
                  RETURNING *;
                `;
            const values = [data.name, data.email, data.password, data.picture_id, data.secureUrl]
            console.log(values);

            const result = await pool.query(statement, values)

            if(result.rows.length > 0){
                return {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
            }else{
                return null
            }


        }catch(e){
            throw new Error(e)
        }
    }

    async createCompany(data){

        try{

            const statement = `insert into company (Name)
            values ($1)
            RETURNING *;`

            const result = await pool.query(statement, [data.name])

            if(result.rows.length > 0){
                return result.rows
            }

        }catch(e){
            throw new Error(e)
        }

    }

    async findByEmail(email){

        try{

            const statement = `
            SELECT * 
            FROM user_profile 
            INNER JOIN profile ON user_profile.id = profile.user_id
            WHERE user_profile.email = $1;
            `

            const result = await pool.query(statement, [email])

            if(result.rows.length > 0){
                return result.rows[0];
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }

    }

    async forgotPasswordToken(email){

        try{

            const forgot_Password_Token = crypto.randomBytes(20).toString("hex");

            const forgot_Password_Expiry = new Date(Date.now() + 20 * 60 * 1000);

            // console.log(Date.now(), new Date(Date.no w()+20));
            const statement = `
                UPDATE user_profile
                SET forgot_password_token = $1, forgot_password_expiry = $2
                WHERE email = $3
                RETURNING *;
            `;

            const values = [forgot_Password_Token, forgot_Password_Expiry, email];

            const result = await pool.query(statement, values)

            if(result.rows.length>0){
                return forgot_Password_Token
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }

    }

    async updatePassword(token, password){
        // console.log('hii');
        try{
            
            const password_hash = await bcrypt.hash(password, 10);

            const statement = `
                update user_profile set password = $1, forgot_password_token = '' where forgot_password_token = $2
                RETURNING *;
            `
            const result = await pool.query(statement, [password_hash, token])


            if(result.rows.length > 0){
                return result.rows[0];
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }

    }

    async addToWishList(product_id, user_id){

        try{

            const statement = `
            insert into wishlist (product_id, user_id) values ($1, $2) RETURNING *;
            `

            const result = await pool.query(statement, [product_id, user_id])

            if(result.rows.length > 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }
    } 

    async removeWishlist(id){

        try{

            const statement = `delete from wishlist where id=$1`

            const result = await pool.query(statement, [id])

            if(result){
                return result
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }
    }

    async userWishlist(user_id){

        try{

            const statement = `select * from wishlist where user_id=$1`

            const result = await pool.query(statement, [user_id])

            if(result.rows.length > 0){
                return result.rows
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }
    }

    async allUser(){

        try{

            const statement = `
            SELECT * 
            FROM user_profile 
            INNER JOIN profile ON user_profile.id = profile.user_id
            `

            const result = await pool.query(statement)

            if(result.rows.length > 0){
                return result.rows;
            }else{
                return null
            }


        }catch(e){
            throw new Error(e)
        }

    }

    async singleUser(id){

        try{

            const statement = `
            SELECT * 
            FROM user_profile 
            INNER JOIN profile ON user_profile.id = profile.user_id
            WHERE user_profile.id = $1;
            `

            const result = await pool.query(statement, [id])

            if(result.rows.length > 0){
                return result.rows;
            }else{
                return null
            }


        }catch(e){
            throw new Error(e)
        }

    }

    async getWishlistWithProduct(user_id) {

        try{

            const statement = `select * from wishlist inner join product on wishlist.product_id=product.id where user_id=$1`

            const result = await pool.query(statement, [user_id])

            if(result.rows.length > 0){
                return result.rows
            }else{
                return null
            }
        }catch(e){
            throw new Error(e)
        }
    }

    async deleteUser(id){

        try{

            const statement = `
            DELETE FROM profile
            WHERE user_id = $1;
            `

            const result = await pool.query(statement, [id])

            const statement2 = `
            DELETE FROM user_profile
            WHERE id = $1;
            `

            const result2 = await pool.query(statement2, [id])

            console.log(result);

            if(result.rowCount!=0 && result2.rowCount!=0){
                return "Deleted"
            }else{
                return null
            }

        }catch(e){
            throw new Error(e)
        }
    }

}

module.exports = new User()