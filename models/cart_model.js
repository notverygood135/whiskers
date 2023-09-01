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
        pool.query('SELECT cart.product_id, product_name, cart.quantity as quantity, products.quantity as max_quantity, price, discounted_price, image FROM cart JOIN products ON cart.product_id = products.product_id', (error, results) => {
            if (error) {
                console.log(error);
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

const deleteFromCart = (body) => {
    const { user_id, product_id } = body;
    console.log(body);
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM cart WHERE user_id = $1 AND product_id = $2', [user_id, product_id],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve('Deleted product');
        })
    })
}

module.exports = {
    getCart,
    addToCart,
    deleteFromCart
}