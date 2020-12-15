import { ctx, config } from '../main.js';
import { WorldPosition } from './world-position.js';

// classe du héros
export class Hero {

 // Constructeur de la classe du héros...
 constructor(params) {

    this.reference = 'heros1';
    this.characterImg = config.getImage(this.reference); // Récupère l'objet image du héros
    this.isTalking = false; // Proprité qui spécifie si le héros est en train de parler
    this.items = 0 // Nb de trésor collecté
    this.xp = 500200; // Chiffre en dur

    /* propriétés communes sprites animés */
    this.x = params.x; // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.width = 48; // Largeur du héros en pixel
    this.height = 48; // Hauteur du héros en pixel
    this.centerX = (this.x + this.width / 2);// Centre X
    this.centerY = (this.y + this.height / 2); // Centre Y
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48)); // Position du héros sur le tableau de collision
    this.speedX = 15; // Vitesse du héros quand il se déplace en abscisse
    this.speedY = 15; // Vitesse du héros quand il se déplace en ordonnée
    //this.frame = 0;
    this.faceX = 0; // Coordonnées X du morceau d'image à cropper sur l'image du héros
    this.faceY = 64; // Coordonnées Y du morceau d'image à cropper sur l'image du héros
    this.currentLoopIndex = 0;
    this.rightCycleLoop = [{faceX:0,faceY:64}, {faceX:32,faceY:64},{faceX:0,faceY:64},{faceX:64,faceY:64}];
    this.leftCycleLoop = [{faceX:0,faceY:32}, {faceX:32,faceY:32},{faceX:0,faceY:32},{faceX:64,faceY:32}];
    this.upCycleLoop = [{faceX:0,faceY:96}, {faceX:32,faceY:96},{faceX:0,faceY:96},{faceX:64,faceY:96}];
    this.downCycleLoop = [{faceX:0,faceY:0}, {faceX:32,faceY:0},{faceX:0,faceY:0},{faceX:64,faceY:0}];
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId ); // Détermine le number du monde et de la map dans lequel il se situe au moment de son instanciation
  }

  // Méthode pour afficher le héros
  draw() {

    ctx.drawImage(
      this.characterImg,
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      32 , // Largeur de la partie à croper
      32 , // Hauteur de la partie à corper
      351, // on l'affiche toujours au milieu du canvas // Position x de l'image à croper sur le canvas
      288.5, // on l'affiche toujours au milieu du canvas // Position y de l'image à croper sur le canvas
      this.width, // Largeur de la partie cropée
      this.height // Hauteur de la partie cropée
    );
  }

  // Méthode qui va modifier les coordonnées du héros.
  update(event) {

    this.setCurrentLoopIndex();

    switch (event.key) {
      case "ArrowRight":

        this.x = (this.x + this.speedX);

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.rightCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.rightCycleLoop[this.currentLoopIndex].faceY;

        break;

      case "ArrowLeft":

        this.x = this.x - this.speedX;

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.leftCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.leftCycleLoop[this.currentLoopIndex].faceY;
        break;

      case "ArrowUp":

        this.y = this.y - this.speedY;

        this.faceX = 8;
        this.faceY = 22;

        // On détermine la positon x/y du crop du personnage
        this.faceX = this.upCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.upCycleLoop[this.currentLoopIndex].faceY;
        break;

      case "ArrowDown":

        this.y = this.y + this.speedY;

        this.faceX = 8;
        this.faceY = 210;
        // On détermine la positon x/y du crop du personnage
        this.faceX = this.downCycleLoop[this.currentLoopIndex].faceX;
        this.faceY = this.downCycleLoop[this.currentLoopIndex].faceY;
        break;

      default:
        break;
    }

    this.setCenter();

    // On recalcule la position de l'index du héros sur la map
    this.setMapIndexPosition();
  }

  // Méthode pour réinitialiser la position du héros
  setPosition(destination) {

    this.x = destination.x;
    this.y = destination.y;
    this.currentWorldPosition.worldId = destination.worldId;
    this.currentWorldPosition.mapSheetId = destination.mapSheetId;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.setMapIndexPosition();
  };

  // Méthode pour renseigner l'index du héros sur la map
  setMapIndexPosition(){

    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
  }

  // On indique que le heros est en train de parler
  setTalkMode(){

    this.isTalking = true;
  }

  // On recalcule le centre du héros
  setCenter(){

    this.centerX = (this.x + this.width / 2);// Centre X
    this.centerY = (this.y + this.height / 2); // Centre Y
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

  // On retire le mode talk
  removeTalkMode(){

    this.isTalking = false;
  }

  // On incrémente le nombre d'item
  addItem(){

    this.items++ ;
  }

  // Affiche des informations sur le héros
  drawHeroDatas(x, y , fontsize) {

    switch(fontsize) {
      case 1:
        ctx.font = "100px small-caption";
        break;
      case 2:
        ctx.font = "40px small-caption";
        break;
      case 3:
        ctx.font = "20px small-caption";
        break;
    }

    const message = `Item : ${this.items}   XP : ${this.xp}`;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(message, x, y);
  };

}
