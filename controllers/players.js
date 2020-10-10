// On importe la clas
//const playerService = require('../services/players');

// Classe de la ressource joueur
class playerController {

  // A l'instanciation
  constructor(router){
    this.router = router;
    this.playersList = [
      {id: 1, name:'geddy', position:'Attaquant', age: 23},
      {id: 2, name:'marcus', position:'Defenseur', age: 24},
      {id: 3, name:'laurent', position:'Attaquant', age: 22}
      
    ];
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

    this.router.get('/player/:id', (req, res)=> {

      const playerFound = this.playersList.find(elem=> {
        return elem.id === parseInt(req.params.id);
      })
      if (playerFound){
        console.log('url players');
        res.render('player_details', {title: 'Détails d un joueurs', playerDetails: playerFound});
      } else {
        res.render('<div>not Found</div>', {title: 'Détails d un joueurs'});
      }

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
