let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongojs = require('mongojs');

const url = 'mongodb://localhost:27017/mydb2';
let db = mongojs(url, ['products']);

let products;

// JSON-encoded bodies.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    let html =
        '<body style="background: aliceblue"><h2>For all go to localhost:3000/products </br> For id go to localhost:3000/products?id=1 </h2></body>';
    res.send(html);
});

app.get('/products', function(req, res) {
    if (req.query.id) {
        db.products.findOne({ _id: mongojs.ObjectId(req.query.id) }, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    } else {
        db.products.find(function(err, products) {
            if (err) {
                res.send(err);
            }
            res.json(products);
        });
    }
});

// Postman for post request
app.post('/products', function(req, res) {
    let product = req.body;
    if (!product.name) {
        req.status(400);
        req.json({
            "error": "Bad Data"
        });
    } else {
        db.products.save(product, function(err, product) {
            if (err) {
                res.send(err);
            }
            res.json(product);
        });
    }
});

app.listen(3000);
console.log('Listening on port 3000....');