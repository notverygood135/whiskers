const { nanoid } = import("nanoid");
require('dotenv');
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = require('express-session');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();

const port = 3001;

const corsOptions = {
    origin: true,
    credentials: true,
};

app.options('*', cors(corsOptions));

const user_model = require('./models/user_model');
const session_model = require('./models/session_model');

app.use(express.json());
app.use(cookieParser());
app.use(sessions({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
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
            const session = req.session;
            console.log(`auth: ${req.session.id}`);
            const user_id = user.user_id;
            const session_id = session.id;
            session.user_id = user.user_id;
            session.authenticated = true;
            session_model.createSession({ session_id, user_id });
            res.status(200).send(true);
        }
        else {
            res.send('Invalid password');
        }
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/auth/logout', (req, res) => {
    try {
        // res.cookie('accessToken', '', { maxAge: -1 });
        // res.cookie('refreshToken', '', { maxAge: -1 });
        // res.cookie('loggedIn', '', { maxAge: -1 });
        const session_id = req.cookies['session'].split(':')[1].split('.')[0];
        session_model.deleteSession({ session_id })
        .then(response => {
            req.session.destroy();
            res.status(200).send(response);
        });
    }
    catch (err) {
        console.log(err);
    }
})

function authenticate(req, res, next) {
    const session_id = req.cookies['session'].split(':')[1].split('.')[0];
    session_model.getSession({ session_id })
    .then(response => {
        if (response) {
            return next();
        }
        res.status(400).send('session broke');
    });
}

module.exports = {
    authenticate
}

app.listen(port, () => {
    console.log(`Authenticate server running on port ${port}`);
});