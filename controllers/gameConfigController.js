
const ItemList = require('../models/itemList');
const Item = require('../models/item');
const Stage = require('../models/stages');
const Door = require('../models/door');
const Dialog = require('../models/dialog');
const Message = require('../models/message');

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

        this.router.get('/stage/:id', (req, res)=> {

            const stageId = +req.params.id;

            Stage.findByPk(
                stageId, 
                {
                    include: [
                    {
                        model: Item,
                        as: 'items' 
                    },
                    {
                        model: Dialog,
                        as: 'dialogs',
                        include : [{
                            model: Message,
                            as: 'messages',
                        }]
                    },
                    {
                        model: Door,
                        as: 'doors' 
                    },


                ]
                //include: [{all: true}]
                }
            )
            .then(stage => {
                if (stage !== null){
                    res.status(200).json(stage);
                } else {
                    return new Error('pas de stage');
                }
            }).catch(err=>{
                console.log('err', err);
                res.status(404).json('Aucun résultat');
            });
        });


    }
}

module.exports = GameConfigController;