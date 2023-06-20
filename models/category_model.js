require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: `${process.env.USER}`,
    host: 'localhost',
    database: 'webpho',
    password: `${process.env.PASSWORD}`,
    port: 5432
})

const getCategory = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                reject(error);
            }
            console.log('helo');
            resolve(results.rows);
        })
    })
}

module.exports = {
    getCategory
}