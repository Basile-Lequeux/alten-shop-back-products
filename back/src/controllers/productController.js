const {db} = require('../database');

exports.createProduct = (req, res) => {
    const product = req.body;
    const sql = db.prepare(`INSERT INTO products (code, name, description, price, quantity, inventoryStatus, category, image, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    sql.run(product.code, product.name, product.description, product.price, product.quantity, product.inventoryStatus, product.category, product.image, product.rating);
    sql.finalize();
    res.status(201).send({message: 'Product created!'});
};

exports.getAllProducts = (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        }
        res.send(rows);
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
            return res.status(500).send({ error: 'Database error' });
        }

        if (!row) {
            return res.status(404).send({ error: 'Product not found' });
        }

        db.run('DELETE FROM products WHERE id = ?', [productId], (err) => {
            if (err) {
                return res.status(500).send({ error: 'Database error during deletion' });
            }

            res.status(200).send({ message: 'Product deleted!' });
        });
    });
};


exports.updateProduct = (req, res) => {
    const productId = req.params.id;

    db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }

        if (!row) {
            return res.status(404).send({ error: 'Product not found' });
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
                return res.status(500).send({ error: 'Database error during update' });
            }

            res.status(200).send({ message: 'Product updated!' });
        });
    });
};

