const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { db, initDb } = require('./database');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Initialize the database
initDb();

// Middleware to parse JSON
app.use(bodyParser.json());

// Enable CORS middleware to allow cross-origin requests
app.use(cors())

app.use(productRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
