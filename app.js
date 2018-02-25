var express = require('express'),
    mysql = require('mysql'),
    bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'anhtien1996',
    database : 'Books'
});

var app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


bookRouter = require('./Router/bookRouter')(connection);

var port = process.env.POST || 8000;

app.use('/api', bookRouter);

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end(JSON.stringify(req.body, null, 2))
});

app.get('/', function (req, res) {
    res.send('my books');
});

app.listen(port, function () {
   console.log('running my app on port '+ port)
});
