import { ctx, config, hero} from '../main.js';
import { WorldPosition } from './world-position.js';

// classe d'un bouton
export class SwitchButton {

 // Constructeur de la classe des boutons
 constructor(params) {
    this.reference = params.reference;
    this.img = config.getImage(this.reference);
    this.x = params.x // Position X sur la map
    this.y = params.y; // Position Y sur la map
    this.width = 48;
    this.height = 48;
    this.faceX = 0;
    this.faceY = 32;
    this.centerX = ((this.x + this.width) - (this.width / 2));
    this.centerY = ((this.y + this.height) - (this.height / 2));
    this.mapIndexPosition = Math.floor(this.centerX / 48) + (60 * Math.floor(this.centerY / 48));
    this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId);
    this.isOpen = false;
  }


  // Méthode pour afficher le bouton sur le canvas
  draw() {

    ctx.drawImage(
      this.img, // Objet image à afficher
      this.faceX , // Position X de la partie à croper
      this.faceY , // Position Y de la partie à croper
      30 , // Largeur de la partie à croper
      30 , // Hauteur de la partie à corper
      351 - (hero.x - this.x), // Position X sur le canvas
      288.5 - (hero.y - this.y), // Position Y sur le canvas
      this.width, // Largeur de l'image sur le canvas
      this.height // Hauteur de l'image sur le canvas
    );
  }


  // Méthode qui ouvre/ ferme le bouton
  toogleOpen(){

      this.isOpen = this.isOpen ? false : true;

      if(this.isOpen){ // Si bouton activé
        // On détermine les coordonnées de l'image à cropper
        this.faceX = 66;
        this.faceY = 32;
      } else { // Bouton désactivé
        // On détermine les coordonnées de l'image à cropper
        this.faceX = 0;
        this.faceY = 32;
      }
  }

}
