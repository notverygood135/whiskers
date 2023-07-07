require('dotenv');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const port = 3001;

const corsOptions = {
    origin: true,
    credentials: true,
};
app.options('*', cors(corsOptions));

const user_model = require('./models/user_model');
const category_model = require('./models/category_model');
const product_model = require('./models/product_model');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.post('/users/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        user_model.createUser(req.body)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
    }
    catch {
        res.status(500).send();
    }
});

app.post('/users/login', (req, res) => {
    user_model.getUser()
    .then(async response => {
        const user = response.find(user => user.username == req.body.username);
        if (user == null) {
            res.status(400).send('User does not exist!');
        }
        else if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
        }
        else {
            res.send('Not allowed');
        }
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.post('/users/token', (req, res) => {
    const refreshToken = req.body.token;
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(user) {
    console.log(user);
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

app.listen(port, () => {
    console.log(`Authenticate server running on port ${port}`);
});