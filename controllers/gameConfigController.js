
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
    }
}

module.exports = GameConfigController;