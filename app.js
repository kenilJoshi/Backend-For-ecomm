const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );


const home = require('./routes/home')
const user = require('./routes/user')
const product = require('./routes/product')
const cart = require("./routes/cart")

app.use("/api/v1",home)
app.use('/api/v1',user)
app.use('/api/v1',product)
app.use('/api/v1', cart)


module.exports = app