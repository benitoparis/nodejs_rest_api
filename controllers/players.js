// On importe la clas
var playerService = require('../services/players');

// Classe de la ressource joueur
class playersController {

  // A l'instanciation
  constructor(router){
    this.router = router;

  }

  // Méthode pour déclarer les routes pour la ressource player
  registerRoutes(){
    this.router.get('/players', this.getPlayers.bind(this));
    // this.router.get();
    // this.router.post();
    // this.router.put();
  }

  // Méthode pour récupérer les joueurs
  getPlayers(){
    var players = playerService.getPlayers();
  }
}
