const {db} = require('../database');

exports.getAllProducts = (callback) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
    });
};

exports.validateProductBody = (req, res, next) => {
    const product = req.body;

    if (!product) {
        return res.status(400).send({error: 'Product data is missing.'});
    }

    const expectedProperties = {
        code: 'string',
        name: 'string',
        description: 'string',
        price: 'number',
        quantity: 'number',
        inventoryStatus: 'string',
        category: 'string',
        image: 'string',
        rating: 'number'
    };

    for (const [key, type] of Object.entries(expectedProperties)) {
        if (typeof product[key] !== type) {
            return res.status(400).send({error: `Expected ${key} to be a ${type}.`});
        }
    }


    next();
}
