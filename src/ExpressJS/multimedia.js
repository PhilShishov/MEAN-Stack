let express = require('express');
let app = express();
let bodyParser = require('body-parser');

const products = [
    { id: 1, name: 'PC - Alienware', price: 400 },
    { id: 2, name: 'Keyboard - Steelseries Apex M800', price: 60.25 },
    { id: 3, name: 'Mouse - Razer Mamba', price: 40.20 },
    { id: 4, name: 'Monitor - Dell UltraSharp 34 Curved', price: 749.99 },
    { id: 5, name: 'Laptop - Lenovo IdeaPad 700-15', price: 960.99 }
];

// JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    let html =
        '<body style="background: aliceblue"><h2>For all go to localhost:3000/products </br> For id go to localhost:3000/products?id=1 </h2></body>';
    res.send(html);
});

app.get('/products', function(req, res) {
    if (req.query.id) {
        let response = products.filter(function(product) { return (product.id == req.query.id); });
        res.send(response);
    } else {
        res.send(products);
    }
});

// Postman for post request
app.post('/products', function(req, res) {
    products.push(req.body);
    res.send({ count: products.length });
});

app.listen(3000);
console.log('Listening on port 3000....');