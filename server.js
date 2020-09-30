
var express = require('express');
app = express();
const router = express.Router();
let playerController = require('./controllers/players');

new playerController(router).registerRoutes();

app.route('/hello').get(function(req, res) {
    console.log('hello');
    res.send('hello world !');
});

app.use('/', router);
app.use(express.static('public'));

app.listen(8080);

console.log('dddd');
