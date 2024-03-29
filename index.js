const express = require("express")
const app = express()
const path = require('path')



const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

const userRoute = require('./routes/user')
const addressRoute = require('./routes/address')
const adminRoute = require('./routes/admin')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const bannerRoute = require('./routes/banner')
const FieldRoute = require('./routes/constantfields')
const orderRoute = require('./routes/order')
const Wishlist = require('./routes/wishlistroute')
const privacypolicy = require('./routes/pp')
const tncRoute = require('./routes/tandc')
 const handsRoute = require('./routes/h&s')

 const cors = require('cors')
 app.use(cors())
 
 const dotenv = require("dotenv")
 dotenv.config()
 const mongoose = require('mongoose')
 mongoose.connect(process.env.mongodb_URL).then(() => {
     console.log('DB connection successful')
    }).catch((error) => {
        console.log(error)
    })

const port = process.env.PORT || 9000
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use('/userroute', userRoute)
app.use('/addaddress', addressRoute)
app.use('/adminroute', adminRoute)
app.use('/category', categoryRoute)
app.use('/product', productRoute)
app.use('/cart', cartRoute)
app.use('/banner', bannerRoute)
app.use('/constantfield', FieldRoute)
app.use('/order', orderRoute)
app.use('/wishlist', Wishlist)
app.use('/privacypolicy', privacypolicy)
app.use('/tnc', tncRoute)
app.use('/hns', handsRoute)
app.listen(port, () => {
    console.log('server is up on the port ' + port)
})
