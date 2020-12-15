import { ctx, config, hero} from '../main.js';

// classe d'un Item
export class Destination {

 // Constructeur de la classe Destination
 constructor(params) {
    this.worldName = params.worldName;
    this.worldId = params.worldId;
    this.mapSheetName = params.mapSheetName;
    this.mapSheetId = params.mapSheetId;
    this.roomName = params.roomName;
    this.x = params.x;
    this.y = params.y;
    this.heroDirection = params.heroDirection;
 }


}
