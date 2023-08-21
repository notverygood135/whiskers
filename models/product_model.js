require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: `${process.env.USER}`,
    host: 'localhost',
    database: 'webpho',
    password: `${process.env.PASSWORD}`,
    port: 5432
})

const getHomeProducts = () => {
    console.log('here');
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM products', [], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const getProducts = (params) => {
    let sqlFlag = 0;
    let paramCount = 1;
    let query = 'SELECT * FROM products';
    let paramsArray = [];
    const { s, min, max } = params;
    const cid = params?.cid.split(',');
    // console.log(cid);

    function queryDelimiter(param) {
        if (sqlFlag == 0) {
            sqlFlag = 1;
            return ' WHERE ';
        }
        if (param == 'cid') {
            return ' OR ';
        }
        return ' AND ';
    }

    if (cid[0] != '0') {
        cid.forEach(id => {
            query += queryDelimiter('cid') + `category_id = $${paramCount}`;
            paramsArray.push(+id);
            paramCount++;
        });
    }

    if (min != '0') {
        query += queryDelimiter() + `price >= $${paramCount}`;
        paramsArray.push(+min);
        paramCount++;
    }

    if (max != '0') {
        query += queryDelimiter() + `price <= $${paramCount}`;
        paramsArray.push(+max);
        paramCount++;
    }

    if (s == 'price') {
        query += ' ORDER BY price ASC';
    }

    // console.log(cid);
    console.log(query);
    console.log(paramsArray);
    
    return new Promise(function(resolve, reject) {
        pool.query(query, paramsArray, (error, results) => {
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
    getHomeProducts,
    getProducts,
    getProductDetails,
    createProduct,
    deleteProduct
}