require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: `${process.env.USER}`,
    host: 'localhost',
    database: 'webpho',
    password: `${process.env.PASSWORD}`,
    port: 5432
})

const getCart = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM cart', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const addToCart = (body) => {
    const { userID, productID, quantity } = body;
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO products VALUES ($1, $2, $3) RETURNING *', [userID, productID, quantity], 
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Added product to cart`);
        })
    })
}

module.exports = {
    getCart,
    addToCart
}