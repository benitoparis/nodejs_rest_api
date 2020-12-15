import { ctx, hero, config, dialogBox} from '../main.js';
import { WorldPosition } from './world-position.js';

// classe d'un people
export class People {

 // Constructeur de la classe people...
 constructor(params) {

    this.name = params.name;
    this.reference = params.reference;
    this.characterImg = config.getImage(this.reference);
    /* propriétés communes sprites animés */
    this.x = params.x; // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.speedX = 15;
    this.speedY = 15;
    this.faceX = 0;
    this.faceY = 64;
    this.currentLoopIndex = 0;
    this.rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    this.leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    this.upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    this.downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
    this.dialog = params.dialog;
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId );

    let that  = this;
    this.autoMove = setInterval(() => { that.setRandomDirection();}, 2000);
    this.direction = 'south';

  }

  // Méthode pour afficher le people
  draw() {
    ctx.drawImage(
      this.characterImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      351 - (hero.x - this.x),
      288.5 - (hero.y - this.y),
      this.width, // Largeur de la partie cropée
      this.height // Hauteur de la partie cropée
    );
  }

  // Méthode qui va modifier les coordonnées du people.
  update() {

    this.setCurrentLoopIndex();

    switch (this.direction) {
      case 'east':
        this.speedX = 2;

        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

        break;

      case 'west':
        this.speedX = 2;

        this.x = (this.x - this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'north':
        this.speedY = 2;

        this.y = (this.y - this.speedY);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        break;

      case 'south':

        this.speedY = 2;
        this.y = (this.y + this.speedY);
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

        default:
          alert('default update');
          break;
    }

    this.setCenter();
    this.setMapIndexPosition();
  }

  // Réinitialise les cordonnées x /y du people
  resetCoordinates(x, y){
    this.x = x;
    this.y = y;
  }

  // Renvoie une direction aléatoirement
  setRandomDirection() {

    this.direction = config.randomDirection();
  }

  // On recalcule le centre du people
  setCenter(){

    // On recalcule le centre du people
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
  }

  // Méthode qui renseigne l'index de la séquence de marche
  setCurrentLoopIndex(){
    if(this.frame === this.fps){
      this.frame = 0;
    } else {
      this.frame++;
    }

    // On détermine quel sprite afficher
    if (this.frame % 3 === 0){ // on décide d'incrémenter l'index toutes les 3 frames
      this.currentLoopIndex++;
    }

    // Si l'index est supérieur au nombre de position possible on le repositionne à zero
    if (this.currentLoopIndex >= this.rightCycleLoop.length) {
      this.currentLoopIndex = 0;
    }
  }

  // Méthode pour réinitialiser la position du people dans la map
  setPosition(destination) {

    this.x = destination.x;
    this.y = destination.y;
    this.currentWorldPosition =  new WorldPosition(destination.worldId,destination.mapSheetId );
    this.setCenter();
    this.setMapIndexPosition();
  }

  // Méthode pour setter l'index du figuant sur la map
  setMapIndexPosition(){

    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }


}
