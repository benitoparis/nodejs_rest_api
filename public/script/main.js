
import { GeneralConfig } from './class/general-config.js';
import { Hero } from './class/hero.js';
import { Door } from './class/door.js';
import { People } from './class/people.js';
import { Item } from './class/item.js';
import { MainCharacter } from './class/main-character.js';
import { SecretPassage } from './class/secret-passage.js';
import { SwitchButton } from './class/switch-button.js';
import { DialogBox } from './class/dialog-box.js';
import { Storytelling } from './class/storytelling.js';



// Déclaration des variables
const stage = document.getElementById("stage");
stage.width = 750;
stage.height = 625;

// On utilise la méthode getContext pour aller chercher les methodes et les propriétés du canvas
export const ctx = stage.getContext("2d");

export const config = new GeneralConfig();
export const dialogBox = new DialogBox();
export const storytelling = new Storytelling(config.stories);

let backgroundToDisplay = [];
let currentMapSheetDatas = {};

// On initialise des objets vides
export let hero = {};
export let doorsList = [];
export let peopleList = [];
export let mainCharacterList = [];
export let itemList = [];
export let switchButtonList = [];
export let secretPassageList = [];


// Méthode pour initialiser le héros
const InitHero = () => {

  const params = {
    x: 400,
    y: 400,
    belongsToWorldId: 1 ,
    belongsToMapSheetId: 2
  };

  hero = new Hero (params);
};

// Méthode pour initialiser les portes
const InitDoors = (doorsSet) => {
  doorsSet.forEach(elem => {
    let door = new Door(elem);
    doorsList.push(door);
  })
};

// Méthode pour Initialiser les personnages figurants
const initPeople = (peopleSet)=> {
  peopleSet.forEach(elem =>{
    let people = new People(elem);
    peopleList.push(people);
  });
};

// On initialise les personnages principaux
const initMainCharacter = (mainCharacterSet) => {
  mainCharacterSet.forEach(elem => {
    let mainCharacter = new MainCharacter(elem);
    mainCharacterList.push(mainCharacter);
  })
};

// Méthode pour initialiser les items (les trésors)
const initItems = (itemSet)=> {
  itemSet.forEach(elem => {
   let item = new Item(elem);
   itemList.push(item);
  });
};

// On initialise les boutons
const initSwitchButton = (switchButtonSet) => {
 switchButtonSet.forEach(elem => {
   let switchButton = new SwitchButton(elem);
   switchButtonList.push(switchButton);
 });
};

// Méthode qui initialise les passages secrets
const initSecretPassage = (secretPassageSet) => {

  // On intère sur les boutons
  switchButtonList.forEach( elem => {
    if(elem.isOpen){ // Si levié est activé
      secretPassageSet.forEach(passage => {
        let secretPassage = new SecretPassage(passage);
        secretPassageList.push(secretPassage);
      });
    }
  })
};



// Méthode pour initialiser les sprites
const initAllSprites = () => {

  // On vérifie si le héros n'a pas déjà été initialisé
  if (typeof(hero.x) === 'undefined'){
    InitHero();
  };

  // On récupère les informations sur la map sur laquelle se trouve le héros
  currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

  // On récupère les informations pour ininitialiser les sprites animés
  const people = currentMapSheetDatas.sprites.people;

    // On récupère les informations pour initialiser les portes
  const doors = currentMapSheetDatas.doors;

  // On récupère les informations pour initialiser les sprites non animés
  const items = currentMapSheetDatas.sprites.item;
  const mainCharacters = currentMapSheetDatas.sprites.mainCharacter;
  const secretPassages =  currentMapSheetDatas.sprites.secretPassage;
  const switchButtons = currentMapSheetDatas.sprites.switchButton;


  // On initialise tous les sprites s'il y en a dans la map
  initPeople(people);


  initItems(items);

  initSecretPassage(secretPassages);

  // On initialise les objets qui ne seront jamais supprimés
  if(!config.checkSpritesExists(switchButtonList)){ // Si n'existe pas encore dans la map
     initSwitchButton(switchButtons);
  }

  if(!config.checkSpritesExists(mainCharacterList)){ // Si n'existe pas encore dans la map
    initMainCharacter(mainCharacters);
  }


  InitDoors(doors);

  // On selectionne le bon background
  selectBackGroundImg(hero);
};



// Méthode pour connaitre l'image de background à afficher
const selectBackGroundImg = (hero) => {

  if (hero.currentWorldPosition.worldId === 1 &&
    hero.currentWorldPosition.mapSheetId === 1){ // Si le héros est sur la map 1

    backgroundToDisplay.push(config.getImage('room1'));

  }

  if(hero.currentWorldPosition.worldId === 1 &&
     hero.currentWorldPosition.mapSheetId === 2){ // Si le héros est sur la map 2
    backgroundToDisplay.push(config.getImage('room2_layer_01'), config.getImage('room2_layer_02'), config.getImage('room2_layer_03')) ;
  }
};

// Dessine l'image de fond
const drawBackground = () => {

  backgroundToDisplay.forEach(background => {

    ctx.drawImage(
      background, // Objet image représentant le background
      hero.x - 351, // Position X de la partie à croper
      hero.y - 288.5, // Position Y de la partie à croper
      750 , // Largeur de la partie à croper
      625 , // Hauteur de la partie à corper
      0, // Position X sur le canvas de l'image cropée
      0,  // Position Y sur le canvas de l'image cropée
      750 , // Largeur de l'image cropée sur le canvas
      625 // Hauteur de l'image cropée sur le canvas
    );
  })
};

// On met à jour la position des personnages figurants
const updatePeople = () => {

  peopleList.forEach(people => {
    const x = people.x;
    const y = people.y;
    const centerX = people.centerX;
    const centerY = people.centerY;

    people.update();

    //On vérifie si le personnage figurant est sorti des limites / a traversé un mur.
    if(config.checkOutOfBounds(currentMapSheetDatas, people)){ // Si le personnage est en dehors du terrain

      // On repositionne le people avant la collision
      people.resetCoordinates(x,y);
      // On détermine aléatoirement une nouvelle direction
      people.setRandomDirection();
    }
  });
};

// On dessine le héros
const drawHero = () => {
  hero.draw();
  // On dessine aussi les stats du héros en haut de l'écran
  hero.drawHeroDatas(stage.width - 200, 30, 3);
};


// On dessine les personnages figurant
const drawPeople = () => {
  // On itère sur la liste des personnages
  peopleList.forEach(people => {
    people.draw();
  });
};


// Méthode pour dessiner les boutons
const drawSwitchButton = () => {
  switchButtonList.forEach(button => {

    if(config.checkSameMapSheet(button, hero)){ // Si le boutton et le héros sont sur la même map
      button.draw();
    }

  })
}
// On dessine les personnages principaux
const drawMainCharacter = () => {
  mainCharacterList.forEach(mainCharacter => {
    if(config.checkSameMapSheet(mainCharacter, hero) ){ // On vérifie si le héros et le personnage principal sont sur la même map
      mainCharacter.draw();
    }
  });
};

// On dessine les items(les trésors)
const drawItems = () => {
  // On itère sur la liste des items
  itemList.forEach(item => {
    item.draw();
  });
};

// Dessine la boite de dialogue (La bulle de dialogue)
export const drawDialogBox = () => {
  if(hero.isTalking){ // Si le heros est en mode discussion
    dialogBox.drawDialogs();
  }
};

// On dessine les passages secrets
const drawSecretPassage = ()=> {

  console.log('secretPassageList', secretPassageList);
  // On itère sur la liste des passages secrets
  secretPassageList.forEach(secretPassage => {
    secretPassage.draw();
  });
};

// On update les coordonnées du héros
const updateHero = () => {

    // On conserve les coordonnées x et y du héros avant de le déplacer
    const x = hero.x;
    const y = hero.y;
    const centerX = hero.centerX;
    const centerY = hero.centerY;

    // On met à jour les coordonnées du héros
    hero.update(event);

    // On itère sur toutes les portes de la map
    doorsList.forEach(door => {

      // On vérifie s'il y a une collision entre la porte et le héros
      if (config.checkCollision(door, hero)) { // Si passe par une porte

        // A chaque passage dans une porte on détruit tous les objets (sauf le héros, le levier et Darius)
        removeDestructibleSprites();

        const destinationX = door.destination.x;
        const destinationY = door.destination.y;

        // On renseigne la position du héros dans la pièce de destination
        hero.setPosition(door.destination);

        // On récupère les informations sur la map courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);

        // On initalise à nouveau les sprites en fonction de la map
        initAllSprites();

      };
    });

    // On itère sur les passages secrets de la map
    secretPassageList.forEach(passage =>{
      if(config.checkCollision(passage, hero)) { // On vérifie s'il y a une collision entre le passage secret et le héros

        // On renseigne la position du héros dans la pièce de destination
        hero.setPosition(passage.destination);

        removeDestructibleSprites();

        // On récupère les informations sur la courrante
        currentMapSheetDatas = config.getCurrentMapSheetDatas(hero);

        // On selectionne le bon background
        selectBackGroundImg(hero);

        // On initalise à nouveau les sprites en fonction de la map
        initAllSprites();
      }
    });

    // On vérifie s'il y a une collision entre un trésor et le héros
    itemList.forEach(item => {
      if(config.checkCollision(item, hero)){ // Si collision

        // On indentifie l'index de l'item en collision
        const itemIndex = itemList.findIndex(elem => {
          return elem === item;
        });
        // On supprime l'item de la liste
        itemList.splice(itemIndex, 1);

        // On incrémente ne nombre d'item collectés par le héros
        hero.addItem();

        // On retire définitivement cet élément du jeu
        config.permanentlyRemoveFromWorld(currentMapSheetDatas,'item', item);

      }
    });

    // On vérifie s'il y a collision entre le héros et un bouton
    switchButtonList.forEach(button => {

      if(config.checkCollision(button, hero)){ // Si collision
        if(button.isOpen){
          alert('Levier désactivé');
        } else {
           alert('Levier activé');
        }
        // On active ou désactive le levier
        button.toogleOpen();
      };
    });


    // On vérifie si le héros est sorti des limites
    if(config.checkOutOfBounds(currentMapSheetDatas, hero)){ // Si le héro est en dehors du terrain
      // Si c'est le cas on lui remet ses coordonées initiales, celles qu'il avait avant de dépaser les limites
      hero.x = x;
      hero.y = y;
      hero.centerX = centerX;
      hero.centerY = centerY;
      hero.setMapIndexPosition();
    }
};

// Méthode qui réagit aux évènements du clavier
const handleKeyboardInput = (event) => {

  if (event.code === 'Space'){ // Si touche ESPACE

    // On active le mode dialogue
    setDialogBox();

  } else if (event.keyCode === 13) { // Si touche ENTREE

    if(!config.gameActive){ // On n'est pas en phase de jeu

      // On lance la cinématique 1
      storytelling.launchStorytelling(1);
    }

	}  else { // n'importe quelle autre touche

    // on met à jour le heros
    updateHero();

  }
};

// On initialise tous les élémets du jeu
export const launchGame = (event) => {

  ctx.clearRect(0, 0, stage.width, stage.height);

  // On indique qu'on est en phase de jeu
  config.gameActive = true;

  // On initialise les sprites après un délai de deux secondes
  setTimeout(initAllSprites, 2000);

  // Méthode pour rafraichir tous les éléments du jeu chaque seconde
  config.setInterval = setInterval(drawAll, 1000 / config.fps);
};


// Méthode pour dessiner tous les éléments
const drawAll = () => {

  updatePeople();

	drawBackground();
  drawHero();
  drawItems();
  drawPeople();
  drawMainCharacter();
  drawSwitchButton();
  drawSecretPassage();
  drawDialogBox();
};



// Méthode initialise l'objet sonore
const initSound = (url)  => {
  const audio = document.getElementById('myPlayer');
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove(); //on arrete le son à la fin de la piste
  };
  // On attache un évènement au clic sur l'objet Audio
  audio.addEventListener('click', audio.play);
};

// On déclenche le mode dialogue
const setDialogBox = () => {

    if(hero.isTalking === false){ // Le héros n'est pas déjà en cours de discussion

      peopleList.forEach(people => {
        // On vérifie s'il y a collision entre le héros et un personnage
        if(config.checkCollision(hero, people)){ // Si collision

          // Le héros passe en mode discussion
          hero.setTalkMode();

          // On injecte le personnage dans l'objet dialogBox afin qu'il récupère son dialogue
          dialogBox.getSprite(people);

          // On renseigne le message à afficher
          dialogBox.setMsgToDisplay();
        }
      });

      // On vérifie s'il y a collision entre le héros et l'un des personnages principaux (Darius)
      mainCharacterList.forEach(mainCharacter => {

        if(config.checkCollision(hero, mainCharacter)){ // Si collision

          // Le héros passe en mode discussion
          hero.setTalkMode();

          if(mainCharacter.ckeckItems(hero)){ // Si le personnage principal constate que le héros a récupéré les 12 trésors

            // On renseigne une nouvelle discussion
            mainCharacter.dialog = ['bravo', 'c\'super', 'vous avez collecté tous les trésors'];

            // La partie est terminée
            // On met fin au jeu
            setTimeout(endGame, 5000);
          }
          // On injecte le personnage principal dans l'objet dialogBox
          dialogBox.getSprite(mainCharacter);

          // On renseigne le message à afficher
          dialogBox.setMsgToDisplay();
        }
      });

    } else { // Si le héros est déjà en train de discuter

      if (dialogBox.checkDialogContinue()){ // Si le dialogue continue

        // On passe au message suivant
        dialogBox.setMsgToDisplay();

      } else {
        // On stoppe la conversation
        hero.removeTalkMode();
      }

    }
};

// Méthode pour supprimer les portes
const removeDoors = ()=> {
  doorsList = [];
};

// Méthode pour supprimer les personnages figurants
const removePeople = () => {
  peopleList = [];
};

// Méthode pour supprimer les boutons
const removeSwitchButton = () => {
  switchButtonList = [];
};

// Méthode pour supprimer les passages secrets
const removeSecretPassage = ()=>{
  secretPassageList = [];
};

// Méthode pour supprimer tous les trésors
const removeItems = () =>{
  itemList = [];
};

// Méthode pour supprimer les personnages principaux
const removeMainCharacter = ()=>{
  mainCharacterList = [];
};

// Méthode pour supprimer tous les sprites
const removeAllSprites = () => {
  hero = {};
  removeDoors();
  removePeople();
  removeSwitchButton();
  removeSecretPassage();
  removeItems();
  removeMainCharacter();
};

// On supprime les sprites que l'on est autorisé à détruire pendant la partie (à chaque changement de map)
const removeDestructibleSprites = () =>{
  removePeople();
  removeSecretPassage();
  removeItems();
  removeDoors();
};


// Méthode qui met fin à la partie
const endGame = () => {

  // On supprime tous les sprites
  removeAllSprites();

  // On nettoie le canvas
  ctx.clearRect(0, 0, stage.width, stage.height);

  // On met fin à la phase de jeu
  config.gameActive = false;

  // On met fin au cycle de rafraichissement
  clearInterval(config.setInterval);

  // On affiche le message THE END
  storytelling.drawBlackScreen('the END');

  // on relance le menu d'accueil au bout de 3 secondes
  setTimeout(config.drawHomeMenu, 3000);
};

// On initialise l'objet Audio
initSound('../audio/soundtracks/far-east-kingdom.mp3');

// On ajoute une évènement qui se déclenche dès qu'une touche du clavier est enfoncée.
window.addEventListener('keydown', handleKeyboardInput);


config.fetchImageSet();
// On charge les images du jeu
//config.loadImages();





async function fetchUserCurrentStage() {

  let myHeaders = new Headers();

  let options = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

  let response = await fetch('/stage', options);

  if (response.status === 200) {
    let data = await response.text();
    const stageModel = JSON.parse(data);
  }
}

fetchUserCurrentStage();