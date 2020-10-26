
const User = require('../models/user');

class AuthController {

    // A l'instanciation
    constructor(router){
        this.router = router;
    }

    // Méthode pour déclarer les routes pour la ressource
    registerRoutes(){

        this.router.get('/login', (req, res)=> {
            res.render('login', {title: 'Connexion', path: '/login'});
        });

        this.router.post('/login', (req, res)=> {
            console.log('req', req.body);
            User.findOne()
        });

    }

}

module.exports = AuthController;

