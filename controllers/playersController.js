// On importe la clas
const Player = require('../models/player');
const team = require('../models/team');

// Classe de la ressource joueur
class PlayerController {

  // A l'instanciation
  constructor(router){
    this.router = router;
  }

  // Méthode pour déclarer les routes pour la ressource player
  registerRoutes(){
    console.log('registerRoutes');

    this.router.post('/player/add_to_my_team', (req, res)=> {
      console.log('in');
      const playerId = req.body.playerId;
      team.addPlayer(playerId);
      console.log('team', team);
      res.redirect('/home');
    });


    this.router.get('/players', (req, res)=> {
      console.log('url players');
      res.render('players', {list: Player.getAllPlayers(), title: 'Les joueurs'})
    });

    this.router.get('/player', (req, res)=> {
      console.log('url players');
      res.render('add_player', {title: 'Création d\'un nouveau joueur'});
    });

    this.router.get('/player/:id', (req, res)=> {

      const playerFound = Player.getPlayerById(parseInt(req.params.id));
      if (playerFound){
        console.log('url players');
        res.render('player_details', {title: 'Détails d un joueurs', playerDetails: playerFound});
      } else {
        res.render('<div>not Found</div>', {title: 'Détails d un joueurs'});
      }

    });



    this.router.post('/player', (req, res)=> {
      console.log('post players');
      new Player(req.body.playerName, req.body.playerPosition, req.body.playerAge).save();
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

module.exports = PlayerController;
