const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");

router.post('/products', productController.createProduct);

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id', productController.updateProduct);

module.exports = router;