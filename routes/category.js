const express = require('express')
const ADAuth = require('../middleware/adauth')
const { addCategory, getCategory, getbyid, editCategory, deleteCategory, deleteallcat } = require('../controller/categorycntrl')

// const{addCategory} = require('../controller/categorycntrl')
const router = new express.Router()


const{upload_Category} = require('../multer')

console.log(getCategory)
console.log(addCategory)


router.post('/add',  ADAuth , upload_Category.single('myField'), addCategory)


router.get('/get', getCategory)
router.get('/getone/:id', getbyid)
router.post('/edit/:id', ADAuth, upload_Category.single('myField'), editCategory)
router.delete('/delete/:id', ADAuth, deleteCategory)
router.delete('/deleteall', ADAuth, deleteallcat)


module.exports = router

