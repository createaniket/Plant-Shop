
const express = require('express');
const router = new express.Router();
const {addToCart, getCart, getSingleUserCart, emptycart , deleteCartItem, increase, decrease} = require('../controller/cartcntrl');
const Auth = require('../middleware/auth')




router.post('/',Auth,addToCart)
router.get('/', getCart)
router.get('/single-cart',Auth,getSingleUserCart)
router.delete('/emptycart/:id', Auth, emptycart)
router.post('/deleteCartItem/:id', Auth, deleteCartItem)
router.post('/increase/:id',  Auth, increase)
router.post('/decrease/:id',  Auth, decrease)




module.exports = router