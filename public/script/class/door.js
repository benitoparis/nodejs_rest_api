import { ctx, config, hero} from '../main.js';
import { Destination } from './destination.js';
import { WorldPosition } from './world-position.js';

// Classe d'une porte
export class Door {

// Constructeur de la classe des portes
constructor(params) {
  this.name = params.roomName;
  this.x = params.x // Position x de la porte sur la map
  this.y = params.y; // Position y de la porte sur la map
  this.width = params.width; // Largeur de la porte en pixel
  this.height = params.height; // Hauteur de la porte de pixel
  this.centerX = ((this.x + this.width) - (this.width / 2)); // Centre x de la porte
  this.centerY = ((this.y + this.height) - (this.height / 2)); // Centre y de la porte
  this.currentWorldPosition = new WorldPosition(params.belongsToWorldId,params.belongsToMapSheetId ); // Détermine le monde et la map ou se trouve la porte
  this.destination = new Destination(params.destination); // Destination du héros quand il passera par cette porte
 }

}
