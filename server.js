
var express = require('express');
const path = require('path');
app = express();
let ejs = require('ejs');
var bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const sequelize = require('./util/database');

// Import des modeles sequelize
const user = require('./models/user');
const message = require('./models/message');
const dialog = require('./models/dialog');
const dialogList = require('./models/dialogList');

const door = require('./models/door');
const item = require('./models/item');
const itemList = require('./models/itemList');
const stage = require('./models/stages');

//  Session middleware
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);

const sequelizeSessionStore = new SessionStore({
    db: sequelize,
});


// On set l'engine html de expressJS
app.set('view engine', 'ejs');
app.set('views', './views');

// On récupère l'objet router pour construire les routes
const router = express.Router();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname + 'uploads')));
app.use(express.static('uploads'));

// On ajoute le body parser comme middle ware pour parser le contenu des formulaires html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(
    {
        secret:'my phrase',
        resave: false,
        saveUninitialized: false,
        store: sequelizeSessionStore
    }
));

// On s'occupe de définir le type de liaison entre les tables de notre BDD

stage.belongsToMany(item, {
    through: 'itemList',
    as: 'items',
    foreignKey: 'stage_id',
});

item.belongsToMany(stage, {
    through: 'itemList',
    as: 'stages',
    foreignKey: 'item_id',
});

//

stage.belongsToMany(dialog, {
    through: 'dialogLists',
    as: 'dialogs',
    foreignKey: "stage_id",
});


dialog.belongsToMany(stage, {
    through: 'dialogLists',
    as: 'stages',
    foreignKey: 'dialog_id',
});



//
dialog.hasMany(message);

// dialog.hasMany(message);
// dialogList.hasMany(dialog);

// dialogList.hasMany(stage);


stage.hasMany(door);


//
stage.hasMany(user);
user.belongsTo(stage);


sequelize.sync({
    force: false
}).then(data=>{
    app.listen(8080);
})
.catch(err=>{
    console.log(err);
});

let AuthController = require('./controllers/authController');
new AuthController(router).registerRoutes();

let gameConfigController = require('./controllers/gameconfigController');
new gameConfigController(router).registerRoutes();

app.route('/home').get(function(req, res) {
    console.log('home');
    //res.send('hello world !');
    res.redirect('login');
});

app.use('/', router);

// app.get('*', ((req, res)=> {
//     res.render('<div>cette page n existe pas</div>', 404);
// }));

app.use(express.static('public'));


