import { ctx, config, hero} from '../main.js';
import { WorldPosition } from './world-position.js';

// classe d'un personnage principal
export class MainCharacter {

 // Constructeur de la classe d'un personnage principal
 constructor(params) {
    this.name = params.name; // Exemple 'darius'
    this.reference = params.reference;
    this.characterImg = config.getImage(this.reference); // Récupère l'objet image de la créature
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.faceX = 0; // Coordonnées X du morceau d'image à cropper sur l'image de la créature
    this.faceY = 0; // Coordonnées Y du morceau d'image à cropper sur l'image de la créature
    this.width = 48; // Largeur de la créature en pixel
    this.height = 48; // Hauteur de la créature en pixel
    this.centerX = ((this.x + this.width) - (this.width / 2)); // Centre x
    this.centerY = ((this.y + this.height) - (this.height / 2)); // Centre y
    this.dialog = params.dialog; // Le dialogue de la créature
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId);
  }

  // Méthode pour afficher le personnage sur le canvas
  draw() {

    ctx.drawImage(
        this.characterImg, // Objet de l'image à croper
        this.faceX , // Position X de la partie à croper
        this.faceY , // Position Y de la partie à croper
        30 , // Largeur de la partie à croper
        30 , // Hauteur de la partie à corper
        351 - (hero.x - this.x),
        288.5 - (hero.y - this.y),
        this.width, // Largeur de la partie cropée
        this.height // Hauteur de la partie cropée
    );
  };

  // Méthide qui vérifie si le héros a collecté les 9 trésors
  ckeckItems(hero){

      if(hero.items >= 9) { // Si le héros a collecté les X trésors
        return true;
      } else {
        return false;
      }
  }

}
