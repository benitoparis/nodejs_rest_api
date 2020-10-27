
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');
var bodyParser = require('body-parser')
const sequelize = require('./util/database');
const player = require('./models/player');
const user = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', './views');


const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: false }));


player.belongsTo(user); // Will add companyId to user

sequelize.sync({
    force: true
}).then(data=>{
    app.listen(8080);
})
.catch(err=>{
    console.log(err);
});



let PlayerController = require('./controllers/playersController');
let UserController = require('./controllers/userController');
let AuthController = require('./controllers/authController');

new PlayerController(router).registerRoutes();
new UserController(router).registerRoutes();
new AuthController(router).registerRoutes();

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




