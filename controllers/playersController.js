// On importe la clas
const Player = require('../models/player');
//const team = require('../models/team');
//const db = require('../util/database');

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
      const playerId = req.body.playerId;
      team.addPlayer(playerId);
      res.redirect('/players');
    });

    this.router.get('/players', (req, res)=> {
      console.log('url players');
      // db.execute('SELECT * FROM players').then(data=>{
      //   console.log('data', data[0]);
      //   res.render('players', {list: data[0], title: 'Les joueurs', path: '/players'});
      // })

      Player.findAll()
        .then(data=> {
          console.log('data', data);
          res.render('players', {list: data, title: 'Les joueurs', path: '/players'});
        })
        .catch();
    });

    this.router.get('/player/mon-equipe', (req, res)=> {
      console.log('url players');
      // db.execute('SELECT * FROM users_players WHERE userid === 1').then(data=> {
      //   res.render('mon-equipe', {list: data[0], title: 'Mes joueurs', path: '/player/mon-equipe'});
      // })
    });

    this.router.get('/player', (req, res)=> {
      console.log('url players');
      res.render('add_player', {title: 'Création d\'un nouveau joueur', path: '/player'});
    });

    this.router.get('/player/:id', (req, res)=> {


      const playerFound = Player.getPlayerById(parseInt(req.params.id));
      if (playerFound){
        res.render('player_details', {title: 'Détails d un joueurs', playerDetails: playerFound});
      } else {
        res.render('<div>not Found</div>', {title: 'Détails d un joueurs'});
      }

    });


    this.router.post('/player', (req, res)=> {
      console.log('post players', req.body);
      //new Player(req.body.playerName, req.body.playerPosition, req.body.playerAge).save();

      Player.create({
        name: req.body.name,
        position: req.body.position,
        age: req.body.age
      }).then(data=>{
        console.log('player enregistré');
        res.redirect('/players');
      });
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
