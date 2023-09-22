require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool({
    user: `${process.env.USER}`,
    host: 'localhost',
    database: 'webpho',
    password: `${process.env.PASSWORD}`,
    port: 5432
})

const getSession = (body) => {
    const { session_id } = body;
    return new Promise(function(resolve, reject) {
        pool.query('SELECT * FROM session WHERE session_id = $1', [session_id], 
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows[0]);
        })
    })
}

const createSession = (body) => {
    const { session_id, user_id } = body;
    return new Promise(function(resolve, reject) {
        pool.query('INSERT INTO session VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *', [session_id, user_id], 
        (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        })
    })
}

const deleteSession = (body) => {
    const { session_id } = body;
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM session WHERE session_id = $1', [session_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`logged out`);
        })
    })
}

const deleteUserSession = (body) => {
    const { user_id } = body;
    return new Promise(function(resolve, reject) {
        pool.query('DELETE FROM session WHERE user_id = $1', [user_id], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`logged out`);
        })
    })
}

module.exports = {
    getSession,
    createSession,
    deleteSession,
    deleteUserSession
}