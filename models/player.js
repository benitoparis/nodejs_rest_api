
const players = [];


class Player {

    constructor(name, position, age){
        this.id = Math.floor(Math.random()* 100);
        this.name = name;
        this.position = position;
        this.age = age;
    }

    save() {
     players.push(this);
    }

    static getAllPlayers(){
        return players;
    }

    static getPlayerById(id){
        return players.find(elem => {
            return elem.id === id;
        });
    }
}

module.exports = Player;