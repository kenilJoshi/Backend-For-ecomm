const {z}= require('zod')
const bcrypt = require('bcryptjs');

const validateUser = async (data) => {

    const registerValidateSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })
    try{
        registerValidateSchema.safeParse({name: data?.name, email: data?.email, password: data?.password})

        let passwordHash = await bcrypt.hash(data.password, 10);

        let user = {
            name: data.name,
            email: data.email,
            password: passwordHash
        }
        console.log(user);

        return user
    }catch(e){
        return e
    }

}

const validatePassword = async (password, password_hash) => {
    return await bcrypt.compare(password, password_hash)
}

module.exports = {
    validateUser,
    validatePassword
}