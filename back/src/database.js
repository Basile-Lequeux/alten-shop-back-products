const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

const initDb = () => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT,
        name TEXT,
        description TEXT,
        price REAL,
        quantity INTEGER,
        inventoryStatus TEXT,
        category TEXT,
        image TEXT,
        rating REAL
    )`);
};

module.exports = {
    db,
    initDb
};
