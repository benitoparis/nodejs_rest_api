
const ItemList = require('../models/itemList');


const User = require('../models/user');
const Item = require('../models/item');
const Stage = require('../models/stages');
const Door = require('../models/door');
const DoorDestination = require('../models/doorDestination');
const Message = require('../models/message');
const SecretPassage = require('../models/secretPassage');
const SecretPassageDestination = require('../models/secretPassageDestination');
const SwitchButton = require('../models/switchButton');
const MapSheet = require('../models/mapSheet');
const People = require('../models/people');
const MainCharacter = require('../models/mainCharacter');

const ImageSet = require('../models/imageset');


class GameConfigController {

    // A l'instanciation
    constructor(router){
        this.router = router;
    }

    // Méthode pour déclarer les routes pour la ressource
    registerRoutes(){

        this.router.get('/gameConfig', (req, res)=> {

            const userGameConfigId = req.session.user.gameConfigId;

            gameConfig.findOne({ where: { id: userGameConfigId } })
            .then(config => {
                console.log(config);
                if (config !== null){
                    res.status(200).json(config);
                } else {
                    return new Error('pas de config');
                }
            }).catch(err=>{
                console.log('err', err);
            });
        });

        this.router.get('/stage', (req, res)=> {

            let userStageJSON = '';
            Stage.findByPk(
                1, 
                {
                    include: [
                        {
                            model: MapSheet,
                            as: 'mapSheets',
                            include : [
                                {
                                    model: Door,
                                    as: 'doors',
                                    include : [
                                        {
                                            model: DoorDestination,
                                            as: 'doorDestination',
                                        }
                                    ]
                                },
                                {
                                    model: People,
                                    as: 'people',
                                    include : [
                                        {
                                            model: Message,
                                            as: 'messages',
                                        }
                                    ]
                                },
                                {
                                    model: MainCharacter,
                                    as: 'mainCharacters',
                                },
                                {
                                    model: Item,
                                    as: 'items',
                                },
                                {
                                    model: SecretPassage,
                                    as: 'secretPassages',
                                    include : [
                                        {
                                            model: SecretPassageDestination,
                                            as: 'secretPassageDestination',
                                        }
                                    ]
                                },
                                {
                                    model: SwitchButton,
                                    as: 'switchButtons',
                                }
                            ]
                        }
                    ]
                //include: [{all: true}]
                }
            )
            .then(stage => {

                console.log('in');
                

                if (stage !== null){
                  
                    console.log('stage not null--');
                    res.json(stage);

                } else {
                    return new Error('pas de stage');
                }
            }).catch(err=>{
                res.status(404).json('Aucun résultat');
            });


        });


        //
        this.router.get('/game', (req, res)=> {
            res.render('game', {title:'le jeu',loggedIn: req.session.isLoggedIn, path:'/game'});
        });

        this.router.get('/imageset', (req, res)=> {
            ImageSet.findAll().then(imageSet => {
                if (imageSet !== null){
                    res.json(imageSet);
                } else {
                    return new Error('pas de set dimage');
                }
            }).catch(err=> {});
        });


    }
}

module.exports = GameConfigController;