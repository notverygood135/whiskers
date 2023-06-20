require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: `${process.env.USER}`,
    host: 'localhost',
    database: 'webpho',
    password: `${process.env.PASSWORD}`,
    port: 5432
})

const getUser = () => {
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const createUser = (body) => {
    return new Promise(function(resolve, reject) {
        console.log(body);
        const { user_id, first_name, last_name, username, password, email, balance } = body;
        pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [user_id, first_name, last_name, username, password, email, balance],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new user has been added: ${results.rows[0]}`);
        })
    })
}

const deleteUser = (body) => {
    return new Promise(function(resolve, reject) {
        const { user_id } = body;
        pool.query('DELETE FROM users WHERE user_id = $1', [user_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Deleted user with ID ${user_id}`);
        })
    })
}

module.exports = {
    getUser,
    createUser,
    deleteUser
}