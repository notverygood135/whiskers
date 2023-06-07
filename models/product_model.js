const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'webpho',
    password: 'root',
    port: 5432
})

const getProducts = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM products LIMIT 60', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const getProductDetails = (body) => {
    return new Promise(function(resolve, reject) {
        const id = body;
        const query = 
            `SELECT product_name, category_name, price, quantity, description, discount, products.image, discounted_price
            FROM products JOIN categories ON products.category_id = categories.category_id
            WHERE product_id = $1`;
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        })
    })
}

const createProduct = (body) => {
    return new Promise(function(resolve, reject) {
        const { product_id, product_name, category_id, seller_id, price, quantity, description, discount, image } = body;
        pool.query('INSERT INTO products VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [product_id, product_name, category_id, seller_id, price, quantity, description, discount, image],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new product has been added: ${results.rows[0]}`);
        })
    })
}

const deleteProduct = (body) => {
    return new Promise(function(resolve, reject) {
        const { product_id } = body;
        pool.query('DELETE FROM products WHERE product_id = $1', [product_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Deleted product with ID ${user_id}`);
        })
    })
}

module.exports = {
    getProducts,
    getProductDetails,
    createProduct,
    deleteProduct
}