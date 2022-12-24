
const express = require('express');
const router = new express.Router();
const {addToCart, getCart, getSingleUserCart, emptycart , deleteCartItem,updateQuantity, increase} = require('../controller/cartcntrl');
const Auth = require('../middleware/auth')




router.post('/',Auth,addToCart)

router.get('/', getCart)
// router.get('/empty' ,nulcart)
router.get('/single-cart',Auth,getSingleUserCart)
// router.patch('/updatequantity/:id' ,Auth, updateQuantity)
router.delete('/emptycart/:id', Auth, emptycart)
router.patch('/deleteCartItem/:id', Auth, deleteCartItem)
// router.post('/increase',  Auth, increase)



module.exports = router