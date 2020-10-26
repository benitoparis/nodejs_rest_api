// On importe la clas
const user = require('../models/user');

// Classe de la ressource joueur
class UserController {

  // A l'instanciation
  constructor(router){
    this.router = router;
  }

    // Méthode pour déclarer les routes pour la ressource user
    registerRoutes(){

        this.router.post('/player/add_to_my_team', (req, res)=> {
        //   const playerId = req.body.playerId;
        //   team.addPlayer(playerId);
        //res.redirect('/players');
        });

        this.router.get('/players', (req, res) => {
        //res.render('players', {list: data[0], title: 'Les joueurs', path: '/players'});
        })

    }
}

module.exports = UserController;