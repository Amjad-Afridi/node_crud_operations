const express = require('express')
const router = express.Router()
const {getProducts, getProductById, deleteProduct, updateProduct, addProduct} = require('../controllers/product')

router.get('/product', getProducts)
router.post('/product', addProduct)
router.get('/product/:id', getProductById)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)

module.exports = router