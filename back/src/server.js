const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, initDb } = require('./database');
const productController = require("./controllers/productController");

const app = express();
const PORT = 3000;

// Initialize the database
initDb();

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS middleware to allow cross-origin requests
app.use(cors())

// Routes
app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);
app.delete('/products/:id', productController.deleteProduct);
app.patch('/products/:id', productController.updateProduct);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
