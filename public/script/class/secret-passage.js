import { ctx, config, hero} from '../main.js';
import { WorldPosition } from './world-position.js';
import { Destination } from './destination.js';

// classe d'un passage secret
export class SecretPassage {

 // Constructeur de la classe secret passage
 constructor(params) {
    this.reference = params.reference;
    this.img = config.getImage(this.reference);
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.faceX = 130;
    this.faceY = 195;
    this.width = 48;
    this.height = 48;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId);
    this.destination = new Destination(params.destination);
  }

  // Méthode pour afficher le passage secret sur le canvas
  draw() {

    ctx.drawImage(
        this.img, // Objet de l'image à croper
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

}
