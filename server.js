
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.set('views', './views');


const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: false }));

let PlayerController = require('./controllers/playersController');

new PlayerController(router).registerRoutes();

app.route('/home').get(function(req, res) {
    console.log('home');
    //res.send('hello world !');
    res.render('home', {title: 'Accueil'});
});

app.use('/', router);

// app.get('*', ((req, res)=> {
//     res.render('<div>cette page n existe pas</div>', 404);
// }));

app.use(express.static('public'));

app.listen(8080);

console.log('dddd');
