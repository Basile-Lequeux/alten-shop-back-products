const express = require('express');
const router = express.Router();
const productController = require("../controllers/productController");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {validateProductBody} = require("../services/productService");

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/products', validateProductBody, productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);
router.patch('/products/:id', validateProductBody, productController.updateProduct);

module.exports = router;
