class Team {

    constructor(){
        this.name = 'psg';
        this.players = [];
    }

    addPlayer(playerID){
        this.players.push({id: playerID, qty: 1});
    }
}

module.exports = new Team();