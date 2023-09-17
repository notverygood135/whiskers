require('dotenv');
const { authenticate } = require('./auth.js');
const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require("cookie-parser");
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
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
const session_model = require('./models/session_model');
const cart_model = require('./models/cart_model');
const { response } = require('express');
const { restart } = require('nodemon');

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
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

app.get('/home', (req, res) => {
    product_model.getHomeProducts()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/products/:cid/:s/:min/:max/:search', (req, res) => {
    product_model.getProducts(req.params)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
});

app.post('/upload', (req, res) => {
    const file = req.files.image
    file.mv(`${__dirname}/public/products/${file.name}`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.status(200).send('successs')
    })
    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }
    // console.log(req.files.image);
});

app.post('/products', authenticate, (req, res) => {
    let data = req.body;
    const session_id = req.cookies['session'].split(':')[1].split('.')[0];
    session_model.getSession({ session_id })
    .then(response => {
        data = {...data, user_id: response.user_id};
        product_model.createProduct(data)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(error => {
            res.status(500).send(response)
        });
    });
})

app.delete('/products/:id', (req, res) => {
    product_model.deleteProduct(req.params.id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.get('/cart', (req, res) => {
    const session_id = req.cookies['session'].split(':')[1].split('.')[0];
    session_model.getSession({ session_id })
    .then(response => {
        cart_model.getCart(response.user_id)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
    });
})

app.post('/cart', authenticate, (req, res) => {
    let data = req.body;
    const session_id = req.cookies['session'].split(':')[1].split('.')[0];
    session_model.getSession({ session_id })
    .then(response => {
        data = {...data, user_id: response.user_id};
        cart_model.addToCart(data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
    });
})

app.delete('/cart', authenticate, (req, res) => {
    let data = req.body;
    console.log(req.body);
    const session_id = req.cookies['session'].split(':')[1].split('.')[0];
    session_model.getSession({ session_id })
    .then(response => {
        data = {...data, user_id: response.user_id};
        cart_model.deleteFromCart(data)
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        });
    });
})

app.post('/checkout', authenticate, async (req, res) => {
    let data = req.body;
    const id = data.map(product => product.id);
    let quantity = {}
    data.forEach(product => {
        quantity[product.id] =  product.quantity;
    })
    product_model.getCheckoutProducts(id)
    .then(async response => {
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: response.map(product => {
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product.product_name
                            },
                            unit_amount: (product.discounted_price * 100).toFixed(0)
                        },
                        quantity: quantity[product.product_id]
                    }
                }),
                success_url: `${process.env.CLIENT_URL}/success`,
                cancel_url:  `${process.env.CLIENT_URL}/cart`
            })
            res.json({ url: session.url })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    })
    .catch(error => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});