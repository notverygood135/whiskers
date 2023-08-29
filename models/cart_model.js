const { nanoid } = require('nanoid');
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
        pool.query('SELECT product_name, cart.quantity, price, discounted_price, image FROM cart JOIN products ON cart.product_id = products.product_id', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const addToCart = (body) => {
    const { user_id, product_id, quantity } = body;
    console.log(body);
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO cart VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *', [user_id, product_id, quantity], 
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