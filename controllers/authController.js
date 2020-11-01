
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

            console.log('req.body', req.body);

            User.findOne({ where: { email: req.body.email, password: req.body.password } })
            .then(user=> {
                console.log('found')
                req.session.isLoggedIn = true;
                req.session.user = true;
                res.redirect('home', {user: user, path:'/home'});
            });

            // req.session.isLoggedIn = true;
            // if ( req.session.isLoggedIn){
            //     res.redirect('home');
            // } else {
            //     res.redirect('login');
            // }
           
            console.log('req', req.body);
            //User.findOne()
            
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

        this.router.get('/logout', (req, res) => {
            req.session.destroy(()=>{
                req.redirect(200,'login');
            });
            
        });

    }

}

module.exports = AuthController;

