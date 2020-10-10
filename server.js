
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views');


const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

let playerController = require('./controllers/players');

new playerController(router).registerRoutes();

app.route('/home').get(function(req, res) {
    console.log('home');
    //res.send('hello world !');
    res.render('home', {title: 'Accueil'});
});

app.use('/', router);
app.use(express.static('public'));

app.listen(8080);

console.log('dddd');
