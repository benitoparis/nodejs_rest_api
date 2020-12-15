
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
const messageList = require('./models/messageList');
const mapSheet = require('./models/mapSheet');
const door = require('./models/door');
const doorDestination = require('./models/doorDestination');
const switchButton = require('./models/switchButton');
const item = require('./models/item');
const itemList = require('./models/itemList');
const stage = require('./models/stages');
const people = require('./models/people');
const secretPassage = require('./models/secretPassage');
const secretPassageDestination = require('./models/secretPassageDestination');
const mainCharacter = require('./models/mainCharacter');
const imageSet = require('./models/imageSet');



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

/* On s'occupe de définir le type de liaison entre les tables de notre BDD */
mapSheet.belongsToMany(item, {
    through: 'itemLists',
    as: 'items',
    foreignKey: 'mapSheet_id',
});

item.belongsToMany(mapSheet, {
    through: 'itemLists',
    as: 'mapSheets',
    foreignKey: 'item_id',
});

mapSheet.hasMany(people);
people.belongsTo(mapSheet);

mapSheet.hasMany(mainCharacter);
mainCharacter.belongsTo(mapSheet);

mapSheet.hasMany(mainCharacter);
mainCharacter.belongsTo(mapSheet);

people.belongsToMany(message,{
    through: 'messagesLists',
    as: 'messages',
    foreignKey: 'people_id',
});
message.belongsToMany(people,{
    through: 'messagesLists',
    as: 'people',
    foreignKey: 'message_id',
});


mapSheet.hasMany(door);
door.belongsTo(mapSheet);

door.hasOne(doorDestination);
doorDestination.belongsTo(door);

// mapSheet.hasMany(doorDestination);
// doorDestination.belongsTo(mapSheet);

mapSheet.hasMany(secretPassage);
secretPassage.belongsTo(mapSheet);

secretPassage.hasOne(secretPassageDestination);
secretPassageDestination.belongsTo(secretPassage);

mapSheet.hasMany(switchButton);
switchButton.belongsTo(mapSheet);
  
stage.hasMany(mapSheet);
mapSheet.belongsTo(stage);

stage.hasMany(user);
user.belongsTo(stage);



/*fin des liaisons à la BDD */

// On synvhronise nos modèles avec la base de données
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


