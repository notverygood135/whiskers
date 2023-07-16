require('dotenv');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

const port = 3001;

const corsOptions = {
    origin: true,
    credentials: true,
};
const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none'
}

const accessTokenCookieOptions = {
    ...cookieOptions,
    expires: Date.now() + 15 * 60 * 1000,
    maxAge: 15 * 60 * 1000 * 1000
};

const refreshTokenCookieOptions = {
    ...cookieOptions,
    expires: Date.now() + 60 * 60 * 1000,
    maxAge: 60 * 60 * 1000 * 1000
}

app.options('*', cors(corsOptions));

const user_model = require('./models/user_model');
const category_model = require('./models/category_model');
const product_model = require('./models/product_model');

app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/auth', (req, res, next) => {
    res.send('hi');
    next();
})

app.post('/auth/register', async (req, res) => {
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

app.post('/auth/login', (req, res) => {
    user_model.getUser()
    .then(async response => {
        const user = response.find(user => user.username == req.body.username);
        if (user == null) {
            res.status(400).send('User does not exist!');
        }
        else if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            res.cookie('accessToken', accessToken, accessTokenCookieOptions);
            res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
            res.cookie('loggedIn', true, {
                ...accessTokenCookieOptions,
                httpOnly: false
            });
            res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
        }
        else {
            res.send('Invalid password');
        }
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.post('/auth/logout', (req, res) => {
    try {
        res.cookie('accessToken', '', { maxAge: -1 });
        res.cookie('refreshToken', '', { maxAge: -1 });
        res.cookie('refresh_token', '', { maxAge: -1 });
        res.cookie('loggedIn', '', { maxAge: -1 });
        res.status(200).send('logged out');
    }
    catch (err) {
        console.log(err);
    }
})

app.post('/auth/refresh', (req, res) => {
    console.log(req.headers)
    try {
        if (!req.cookies) {
            res.status(403).send('no refresh tokens')
        }
        else {
            res.status(200).send({ refreshToken: refreshToken });
        }
    }
    catch (err) {
        console.log(err)
    }
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
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

app.listen(port, () => {
    console.log(`Authenticate server running on port ${port}`);
});