const app = require('./app')
require("dotenv").config();
const {Pool} = require("pg")
const cloudinary = require('cloudinary')
const {pool} = require('./config/db')


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
})