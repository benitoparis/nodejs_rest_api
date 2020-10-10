
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');
let playersList = ['geddy', 'neil', 'alex'];
app.set('view engine', 'ejs');
app.set('views', './views');


const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

let playerController = require('./controllers/players');

new playerController(router).registerRoutes();

app.route('/hello').get(function(req, res) {
    console.log('hello');
    //res.send('hello world !');
    res.render('players', {list: playersList, title: 'Les joueurs'})
});

app.use('/', router);
app.use(express.static('public'));

app.listen(8080);

console.log('dddd');
