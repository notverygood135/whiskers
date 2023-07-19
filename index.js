require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();

const port = 3000;

const corsOptions = {
    origin: true,
    credentials: true
};
app.options('*', cors(corsOptions));

const user_model = require('./models/user_model');
const category_model = require('./models/category_model');
const product_model = require('./models/product_model');
const { response } = require('express');
const { restart } = require('nodemon');

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/users', (req, res) => {
    user_model.getUser()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.delete('/users/:id', (req, res) => {
    user_model.deleteUser(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/categories', (req, res) => {
    category_model.getCategory()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/products', (req, res) => {
    product_model.getProducts()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/products/:id', (req, res) => {
    product_model.getProductDetails(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.get('/products/:cid/:page', (req, res) => {
    console.log(req.params.cid)
    console.log(req.params.page)
    product_model.getProducts()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.post('/products', (req, res) => {
    product_model.createProduct(req.body)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.delete('/products/:id', (req, res) => {
    product_model.deleteProduct(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});