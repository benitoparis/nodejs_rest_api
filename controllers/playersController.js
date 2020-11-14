// On importe la classs
const path = require('path');
const checkAuth = require('../middleware/auth');
const Player = require('../models/player');
const user = require('../models/user');
const multer = require('multer');

const fs = require('fs');
const PDFDocument = require('../services/PDFDocumentWithTables_service');
const doc = new PDFDocument();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb)=> {
      //let destination = path.join(__dirname, 'uploads');
      cb(null, 'uploads/images/');
  },
  filename: (req, file, cb )=> {
      cb(null, file.fieldname + '-' + Date.now() + '.png');
  }
});

// const fileFilter = (req, file, cb)=> {

//   console.log('fileFilter file', file);
//   if (file.minetype === 'image/png' || file.minetype === 'image/jpg' || file.minetype === 'image/jpeg' ){
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }

// };

const upload = multer({ storage: fileStorage});



// Classe de la ressource joueur
class PlayerController {

  // A l'instanciation
  constructor(router){
    this.router = router;
  }

  // Méthode pour déclarer les routes pour la ressource player
  registerRoutes(){

    this.router.post('/player/add_to_my_team', (req, res)=> {

      const userId = req.session.user.id;
      
      console.log('req', req);
      const playerId = parseInt(req.body.playerId);
      
      Player.findOne({where : { id: playerId}})
      .then(player=> {
        console.log('player trouvé', player);

        player.userId = userId;
        player.save();

        res.redirect('/players');
      })
      .catch(err=> {
        console.log('err', err);
      });

    });

    this.router.get('/players', checkAuth, (req, res)=> {
      console.log('url players');
      // db.execute('SELECT * FROM players').then(data=>{
      //   console.log('data', data[0]);
      //   res.render('players', {list: data[0], title: 'Les joueurs', path: '/players'});
      // })

      Player.findAll({where: {userId:null}})
        .then(data=> {
          console.log('data', data);
          res.render('players', {list: data, title: 'Les joueurs sur le marché', path: '/players'});
        })
        .catch();
    });

    this.router.get('/player/mon-equipe', checkAuth, (req, res)=> {
      console.log('url players');


   
      const userId = req.session.user.id;
      user.findByPk(userId)
       .then(user=> {

        console.log('user', user);
        user.getPlayers().then(players=> {
          console.log('players', players);

 

          res.render('my-team', {list: players, title: 'Mes joueurs', path: '/player/mon-equipe'});
        });

       })
       .catch(err=> {

       });
    });

    this.router.get('/players', checkAuth, (req, res)=> {
      console.log('url players');
      // db.execute('SELECT * FROM players').then(data=>{
      //   console.log('data', data[0]);
      //   res.render('players', {list: data[0], title: 'Les joueurs', path: '/players'});
      // })

      Player.findAll({where: {userId:null}})
        .then(data=> {
          console.log('data', data);
          res.render('players', {list: data, title: 'Les joueurs sur le marché', path: '/players'});
        })
        .catch();
    });

    this.router.get('/player/mon-equipe/downloadPDF', checkAuth, (req, res)=> {

      const userId = req.session.user.id;
      user.findByPk(userId)
       .then(user=> {

        console.log('user', user);
        user.getPlayers().then(players=> {

          const playerRows = [];
          players.forEach(player=> {
            const rowPlayer = Object.values(player.dataValues);
            console.log('rowPlayer', rowPlayer);
            playerRows.push(rowPlayer);
          });

          // On génère un PDF avec la liste de l'équipe
          doc.pipe(fs.createWriteStream('./download/output2.pdf'));

          const table0 = {
              headers: ['Numéro', 'Nom', 'Poste', 'Age', 'chemin img', 'Date de création', 'Date de modification'],
              rows: playerRows
          };

          doc.table(table0, {
              prepareHeader: () => doc.font('Helvetica-Bold'),
              prepareRow: (row, index) => doc.font('Helvetica').fontSize(12)
          });

          const table1 = {
              headers: ['classement', 'Equipe', 'buts marqués'],
              rows: [
                  ['1', 'OM', '34'],
                  ['2', 'PSG', '22'],
                  ['3', 'ST ETIENNE', '45']
              ]
          };

          doc.moveDown().table(table1, 100, 350, { width: 300 });

          doc.printImage('./uploads/images/playerPhoto-1605111218920.png', [50, 50], 'center', 'center');

          doc.moveTo(10,10)
          .lineTo(10, 500)
          .lineWidth(1)
          .stroke();

          doc.end();

          // On envoie le PDF
          //var data = fs.readFileSync('../download/output2.pdf');
          //res.contentType("application/pdf");
          //res.send(data);
      
        });

       })
       .catch(err=> {

       });
    });


    this.router.get('/player', checkAuth, (req, res)=> {
      console.log('req.session', req.session);
      console.log('url players');
      res.render('add_player', {title: 'Création d\'un nouveau joueur', path: '/player'});
    });

    this.router.get('/player/:id', checkAuth, (req, res) => {

      Player.findByPk(parseInt(req.params.id))
        .then(player=> {
          res.render('player_details', {title: 'Détails d un joueurs', playerDetails: player, path:'player_details'});
        })
        .catch(err=> {
          
        });

    });

    this.router.post('/player', upload.single('playerPhoto'),  (req, res)=> {
   
      console.log('req.file', req.file);

      Player.create({
        name: req.body.name,
        position: req.body.position,
        age: req.body.age,
        imgUrl: `images/${req.file.filename}`,

      }).then(data=>{
        console.log('player enregistré');
        res.redirect('/players');
      });
      
    });

    this.router.get('/download/fichier', (req, res)=> {
      var data = fs.readFileSync('./download/output.pdf');
      res.contentType("application/pdf");
      res.send(data);
    });
  }

}

module.exports = PlayerController;
