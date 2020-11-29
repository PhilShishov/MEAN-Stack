let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');


let index = require('./routes/index');
let tasks = require('./routes/tasks');

const port = 3000;

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);
app.use('/api', tasks);

app.listen(port, function() {
    console.log('Server started on port' + port);
});