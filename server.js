
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');
var bodyParser = require('body-parser')
const sequelize = require('./util/database');
const player = require('./models/player');
const user = require('./models/user');
const session = require('express-session');

app.set('view engine', 'ejs');
app.set('views', './views');


const router = express.Router();

const checkLogged = (req, res, next)=>{

    console.log('req.url', req.url);

    if (req.url === 'login'){
        res.redirect(200, 'login');
    } else if (req.url === 'signup'){
        res.redirect(200,'signup');
    } else {
        next();
    }
}

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:'my phrase', resave: false, saveUninitialized: false}));
app.use(checkLogged);

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
    res.render('home', {title: 'Accueil', path:'/home'});
});

app.use('/', router);

// app.get('*', ((req, res)=> {
//     res.render('<div>cette page n existe pas</div>', 404);
// }));

app.use(express.static('public'));




