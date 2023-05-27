const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'webpho',
    password: 'root',
    port: 5432
})

const getCategory = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM categories', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

module.exports = {
    getCategory
}