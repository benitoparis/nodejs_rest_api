
const User = require('../models/user');


class AuthController {

    // A l'instanciation
    constructor(router){
        this.router = router;
    }

    // Méthode pour déclarer les routes pour la ressource
    registerRoutes(){

        this.router.get('/login', (req, res)=> {
            res.render('login', {title: 'Connexion', loggedIn: req.session.isLoggedIn, path: '/login'});
        });

        this.router.post('/login', (req, res)=> {

            User.findOne({ where: { email: req.body.email, password: req.body.password } })
            .then(user=> {
                console.log(user);

                if (user !== null){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    res.render('home', {title:'accueil',loggedIn: req.session.isLoggedIn, path:'/home'});
                } else {
                    res.redirect('login');
                }
            }).catch(err=>{
                console.log('err', err);
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
            res.render('signup', {title: 'Signup', loggedIn: req.session.isLoggedIn, path: '/signup'});
        });

        this.router.post('/signup', (req, res)=> {
            console.log('req', req.body);
            User.create({
                email: req.body.email,
                nickname: req.body.nickname,
                ageRange: req.body.ageRange,
                password: req.body.password
            }).then(user =>{
                if (user !== null){
                    res.render('home', {title: 'Accueil',loggedIn: req.session.isLoggedIn, path: '/home'});
                }
            });
        });

        this.router.get('/logout', (req, res) => {
            req.session.destroy(()=>{
                res.redirect('login');
            });
        });

        this.router.get('/histoire-du-jeu', (req, res)=> {
            res.render('game-story', {title: 'Histoire et présentation des personnages',loggedIn: req.session.isLoggedIn, path: '/histoire-du-jeu'});
        });

        this.router.get('/le-projet', (req, res)=> {
            res.render('project', {title: 'Présentation du projet', loggedIn: req.session.isLoggedIn, path: '/le-projet'});
        });

        this.router.get('/contact', (req, res)=> {
            res.render('contact', {title: 'contact', loggedIn: req.session.isLoggedIn, path: '/contact'});
        });

        this.router.get('/jeu', (req, res)=> {
            res.render('game', {title: 'contact', loggedIn: req.session.isLoggedIn, path: '/jeu'});
        });

    }

}

module.exports = AuthController;

