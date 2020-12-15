import { ctx, config, launchGame} from '../main.js';

export class Storytelling {

  constructor(storiesSet){
    this.storiesSet = storiesSet;
    this.currentMsgSet = [];
    this.msgToDisplay = '';
    this.currentMsgIndex = 0;
  }

  // Dessine une storyTelling
  drawStoryTelling() {

    this.drawBlackScreen();

    // On affiche le message au centre
    this.drawMessages(70, 200, 2);
  }

  // Dessine une écran noir
  drawBlackScreen(msg){

    // On dessine un fond noir
    ctx.fillStyle="#000000";
    ctx.fillRect(0, 0, stage.width, stage.height);

    if(msg){
      // On affiche le message au centre
      this.drawMessages(stage.width / 2, stage.height / 2, 3, msg);
    }
  }

  // Méthode pour écrire des messages sur l'écran
  drawMessages(x, y, fontsize, msg) {

    if(!msg){
      msg = this.msgToDisplay;
    }

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
    ctx.fillStyle = "#FFFFFF";

    for(let i = 0; i <= msg.length; i += 40){
      let start = i;
      let end = i  + 40;
      y += 50;

      let cuttedMsg = msg.slice(start, end);

      ctx.fillText(cuttedMsg, x, y);

    }
  }

  // Dessine l'image du menu
  launchStorytelling(id) {

    this.currentMsgSet = [];

    this.currentMsgSet = this.storiesSet.find(item =>{
      return item.id === id;
    }).storyArray;

    this.setMsgToDisplay();

    if(this.checkStoryContinue()){ // Si la story doit continuer

      this.drawStoryTelling();

    } else { // S'il n'y a plus de texte à afficher dans la story

      launchGame();
    }
  }

  // Méthode qui définit le message à afficher
  setMsgToDisplay(){

    if(this.checkStoryContinue()){ // Si l'index du message courant est inférieur à la longueur du dialogue
        this.msgToDisplay = this.currentMsgSet[this.currentMsgIndex];
        this.currentMsgIndex++;
    } else {
      this.msgToDisplay = '';
      this.currentMsgSet = [];
    }
  }

  // Vérifie si le dialogue continue
  checkStoryContinue(){

    if (this.currentMsgIndex < this.currentMsgSet.length){
      return true;
    } else {
      this.currentMsgIndex = 0;
      return false;
    }
  }
}
