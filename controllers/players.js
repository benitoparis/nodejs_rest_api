// On importe la clas
//const playerService = require('../services/players');

// Classe de la ressource joueur
class playerController {

  // A l'instanciation
  constructor(router){
    this.router = router;
  }

  // Méthode pour déclarer les routes pour la ressource player
  registerRoutes(){
    console.log('registerRoutes');
    this.router.get('/players', (req, res)=> {
      console.log('url players');
      res.send('les joueurs');
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
