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
