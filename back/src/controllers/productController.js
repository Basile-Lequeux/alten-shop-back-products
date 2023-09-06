const {db} = require('../database');
const {getAllProducts} = require("../services/productService");

exports.createProduct = (req, res) => {
    const product = req.body;
    const sql = db.prepare(`INSERT INTO products (code, name, description, price, quantity, inventoryStatus, category, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    sql.run(product.code, product.name, product.description, product.price, product.quantity, product.inventoryStatus, product.category, product.image, product.rating);
    sql.finalize();

    getAllProducts((err, products) => {
        if (err) {
            res.status(500).send({error: 'Database error'});
            return;
        }
        res.status(201).send({message: 'Product created!', products: products});
    });
};

exports.getAllProducts = (req, res) => {
    getAllProducts((err, products) => {
        if (err) {
            res.status(500).send({error: 'Database error'});
            return;
        }
        res.send(products);
    });
};

exports.getProductById = (req, res) => {
    db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        }
        if (!row) {
            return res.status(404).send({error: 'Product not found'});
        }
        res.send(row);
    });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.id;

    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        }

        if (!row) {
            return res.status(404).send({error: 'Product not found'});
        }

        db.run('DELETE FROM products WHERE id = ?', [productId], (err) => {
            if (err) {
                return res.status(500).send({error: 'Database error during deletion'});
            }

            getAllProducts((err, products) => {
                if (err) {
                    res.status(500).send({error: 'Database error'});
                    return;
                }
                res.status(200).send({message: 'Product deleted!', products: products});
            });
        });
    });
};


exports.updateProduct = (req, res) => {
    const productId = req.params.id;

    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        }

        if (!row) {
            return res.status(404).send({error: 'Product not found'});
        }

        const product = req.body;
        const sql = `
            UPDATE products 
            SET code = ?, 
                name = ?, 
                description = ?, 
                price = ?, 
                quantity = ?, 
                inventoryStatus = ?, 
                category = ?, 
                image = ?, 
                rating = ?
            WHERE id = ?
        `;

        db.run(sql, [
            product.code,
            product.name,
            product.description,
            product.price,
            product.quantity,
            product.inventoryStatus,
            product.category,
            product.image,
            product.rating,
            productId
        ], (err) => {
            if (err) {
                return res.status(500).send({error: 'Database error during update'});
            }

            getAllProducts((err, products) => {
                if (err) {
                    res.status(500).send({error: 'Database error'});
                    return;
                }
                res.status(200).send({message: 'Product updated!', products: products});
            });
        });
    });
};

