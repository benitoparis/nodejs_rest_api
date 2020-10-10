// On importe la clas
//const playerService = require('../services/players');

// Classe de la ressource joueur
class playerController {

  // A l'instanciation
  constructor(router){
    this.router = router;
    this.playersList = ['geddy', 'neil', 'alex'];
  }

  // Méthode pour déclarer les routes pour la ressource player
  registerRoutes(){
    console.log('registerRoutes');
    this.router.get('/players', (req, res)=> {
      console.log('url players');
      res.render('players', {list: this.playersList, title: 'Les joueurs'})
    });

    this.router.get('/player', (req, res)=> {
      console.log('url players');
      res.render('add_player', {title: 'Les joueurs'});
    });


    this.router.post('/player', (req, res)=> {
      console.log('req', req);
      console.log('post players');
      res.redirect('/home');
    });

    //this.router.get('/players', this.getPlayers.bind(this));
    // this.router.get();
    // this.router.post();
    // this.router.put();
  }

  // Méthode pour récupérer les joueurs
  getPlayers(){
    //var players = playerService.getPlayers();
  }
}

module.exports = playerController;
