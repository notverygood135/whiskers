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
    console.log(body)
    return new Promise(function(resolve, reject) {
        const { first_name, last_name, username, password, email } = body;
        const user_id = nanoid();
        pool.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [user_id, first_name, last_name, username, password, email],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Created successfully`);
        })
    })
}

const updateUser = (body) => {
    console.log(body)
    return new Promise(function(resolve, reject) {
        const { image, userId } = body;
        pool.query('UPDATE users SET image = $1 WHERE user_id = $2',
        [image, userId],
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`Updated successfully`);
        })
    })
}

const getUserDetails = (body) => {
    return new Promise(function(resolve, reject) {
        const id = body;
        const query = 
            `SELECT first_name, last_name, username, email, image
            FROM users WHERE user_id = $1`;
        pool.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
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
    updateUser,
    deleteUser,
    getUserDetails
}