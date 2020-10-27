
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

        this.router.get('/signup', (req, res)=> {
            res.render('signup', {title: 'Signup', path: '/signup'});
        });

        this.router.post('/signup', (req, res)=> {
            console.log('req', req.body);
            User.create({
                nickname: req.body.nickname,
                email: req.body.email,
                age: req.body.age,
                city: req.body.city,
                password: req.body.password
            }).then(user=>{
                res.render('home', {title: 'Accueil', path: '/home'});
            });
        });

    }

}

module.exports = AuthController;

