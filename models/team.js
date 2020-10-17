class Team {

    constructor(){
        this.name = 'psg';
        this.players = [];
    }

    addPlayer(playerID){
        const playerFound = this.checkexstingProduct();

        if (!playerFound){
            this.players.push({id: playerID, qty: 1});
        }
    }

    checkexstingProduct(playerID){
        return this.players.find(player=> { player.id === playerID});
    }

    getTeamPlayers(){
        return this.players;
    }
}

module.exports = new Team();