location.hash = 'Pierre🤜Feuille✋Ciseaux✌️:thème_marvels👊Spider_man🆚Iron_man💪'
//--------------------------------------LODER-------------------------------------------

const start = document.querySelector(".start")
const buttonStart = document.querySelector(".button-start")
const fight = document.querySelector('.load')

buttonStart.addEventListener('click', () => {
  start.style.display = 'none'

  setTimeout(() => {
    fight.style.transform = 'translateX(250%)'
  }, 1500)

  fightMusic.play();
  fightSound.play();
}, { once: true }); // c'est pour dire que le code ne s'exécutera qu'une seule fois avec once: true

//------------------------------------------------------------------------------------------

//-------------------------------------AUDIO------------------------------------------------

const fightSound = new Audio("audio/Fight.mp3")
const fightMusic = new Audio("audio/combat.mp3")
const winSound = new Audio("audio/YouWin.mp3")
const punchSound = new Audio("audio/Punch.mp3")
const gameOverSound = new Audio("audio/GameOver.mp3")
const spiderManSound = new Audio("audio/SpiderMan.mp3")

fightMusic.loop = true
fightMusic.volume = .5
fightMusic.play()

punchSound.volume = .5
spiderManSound.volume = .5

//------------------------------------------------------------------------------------------

//----------------------------------------PLUIE---------------------------------------------

function createRain() {
  const rainContainer = document.querySelector('.rain');
  const nombreGoutes = 1000; 

  for (let i = 0; i < nombreGoutes; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');
    
    drop.style.left = Math.random() * window.innerWidth + 'px';
    drop.style.animationDuration = (Math.random() * 2 + 2) + 's'; 
    drop.style.animationDelay = Math.random() * 2 + 's'; 
    drop.style.transform = 'translateY(-100px)'
    
    rainContainer.appendChild(drop);
  }
}

createRain()

window.onresize = () => {
  document.querySelector('.rain').innerHTML = '';
  createRain();
};

//-------------------------------------------------------------------------------------------

//-------------------------------------ANIME REBOND PERSO------------------------------------

gsap.fromTo(".iron-perso, .spider-perso",
  {
      y: 0, 
  }, 
  {
      y: -50, 
      duration: 0.5, 
      delay: 2.5,
      ease: "power1.out", 
      yoyo: true, 
      repeat: Infinity, 
      onComplete: function() {
          gsap.to(".iron-perso", {
              y: -30, 
              duration: 0.2,
              ease: "bounce.out"
          });
      }
});

//-------------------------------------------------------------------------------------------

//--------------------------------LOGIQUE DU JEU---------------------------------------------

const poing = document.querySelector('.button')
const ciseaux = document.querySelector('.button2')
const feuille = document.querySelector('.button3')

let barVieSpider = document.querySelector('.inter-bar-spider')
let barVieIron = document.querySelector('.inter-bar-iron')

const coup1 = document.querySelector('.coup1')
const coup2 = document.querySelector('.coup2')

const replay = document.querySelector('.replay')

//--------------------------------------CHOIX IA-------------------------------------------------
const choixIa = ["Pierre", "Ciseaux", "Feuille"]
function getChoiceIa() {
    const index = Math.floor(Math.random() * choixIa.length)
    return choixIa[index]
}
//-----------------------------------------------------------------------------------------------

//--------------------------------------DEFINITION DU GAGNANT------------------------------------

function winner(choixJoueur, choixOrdi) {
  if (choixJoueur === choixOrdi) {
      coup1.style.display = 'flex'
      coup2.style.display = 'flex'
    setTimeout(() => {
      coup1.style.display = 'none'
      coup2.style.display = 'none'
    }, 2000)
    return "Égalité"
  } else if (
    (choixJoueur === "Pierre" && choixOrdi === "Ciseaux") ||
    (choixJoueur === "Feuille" && choixOrdi === "Pierre") ||
    (choixJoueur === "Ciseaux" && choixOrdi === "Feuille") 
  ) {
    coup2.style.display = 'flex'
    setTimeout(() => {
      coup2.style.display = 'none'
    },2000)
    return "Bravo ! Vous avez Gagné"
  } else {
    coup1.style.display = 'flex'
    setTimeout(() => {
      coup1.style.display = 'none'
    }, 2000)
    return "Perdu !!"
  }
}
//-------------------------------------------------------------------------------------------

//--------------------------------------LES BARRES DE VIE------------------------------------

let barVieSpiderValue = 100;
let barVieIronValue = 100;

function updateBarVie() {
  barVieSpider.style.width = `${barVieSpiderValue}%`;
  barVieIron.style.width = `${barVieIronValue}%`;
}

function ColorBarVie () {
  if (barVieSpiderValue <= 40) {
        barVieSpider.style.background = 'red'
  }
  if (barVieIronValue <= 40) {
        barVieIron.style.background = 'red'
  }
}
//---------------------------------------------------------------------------------------------

//--------------------------------------FIN DE PARTIE------------------------------------------

const win = document.querySelector('.win')
const lose = document.querySelector('.lose')

function Ko() {
  if (barVieIronValue == 0) {
      win.style.opacity = '1'
      winSound.play()
      poing.style.pointerEvents = 'none'
      ciseaux.style.pointerEvents = 'none'
      feuille.style.pointerEvents = 'none'
  } else if (barVieSpiderValue == 0) {
      lose.style.opacity = '1'
      gameOverSound.play()
      poing.style.pointerEvents = 'none'
      ciseaux.style.pointerEvents = 'none'
      feuille.style.pointerEvents = 'none'
  }
}
//--------------------------------------------------------------------------------------------

//--------------------------------------ANIMATION BAR DE VIE----------------------------------

function TremblementBar() {
  gsap.fromTo(".bar-vie-spider, .bar-vie-iron", 
    {x: 0,y: 0},
    {
      x: "-=5",
      y: "-=5",
      repeat: 5,
      yoyo: true,
      duration: 0.05,
      ease: "power1.inOut"
    }
  )
}

//--------------------------------------------------------------------------------------------

//--------------------------------------FONCTION DESAC BOUTONS PENDANT LES ANIME--------------

function toggleButtons(state) {
  poing.style.pointerEvents = state ? 'auto' : 'none';
  ciseaux.style.pointerEvents = state ? 'auto' : 'none';
  feuille.style.pointerEvents = state ? 'auto' : 'none';
}

//--------------------------------------------------------------------------------------------

//-------------------------------------ANIMATIONS CLIQUE BOUTONS (perso, sound, gif...)--------

const spiderPerso = document.querySelector('.spider-perso')
const ironPerso = document.querySelector('.iron-perso')

const ironPied = document.querySelector('.ironPied')
const ironPoing = document.querySelector('.ironPoing')
const ironToile = document.querySelector('.ironToile')

//--------------------------------------------------------------------------------------------

poing.addEventListener('click', () => {
  toggleButtons(false)

  const gifPoing = document.querySelector('.gifPoing')
  setTimeout(() => {
    punchSound.play()
  },900)

  gsap.killTweensOf(gifPoing)

  const src = gifPoing.src
  setTimeout(() => {
    gifPoing.src = src
  }, 50);

  gsap.to(spiderPerso, {opacity: 0, duration: 0.2})
  setTimeout(() => {
    gsap.to(spiderPerso, {opacity:1, duration: 0.2})
  }, 2100)


  gsap.set(gifPoing, { x: 0 }) 

  gsap.to(".gifPoing", {
    x: "25rem",
    duration: 1.5,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(ironPerso, {display: "none", duration: 0.2, onComplete: () => {
        gsap.to(ironPoing, {display: "flex", duration: 0.2})

        setTimeout(() => {
          gsap.to(ironPoing, {display: "none", duration: 0.2, onComplete: () => {
            gsap.to(ironPerso, {display: "flex", duration: 0.2})
          }})
        }, 1000)
      }})
      
      setTimeout(() => {
        gsap.to(".gifPoing", {x: "0rem", duration: 1.5, ease: "power1.inOut"})
        toggleButtons(true)
      }, 1000)
    }
  })

  gsap.to(gifPoing, { opacity: 1, duration: 0.2 });
  setTimeout(() => {
    gsap.to(gifPoing, { opacity: 0, duration: 0.2 });
  }, 2100);


  TremblementBar()

  const choixJoueur = "Pierre"
  const choixOrdi = getChoiceIa()
  const resultatPartie =  winner(choixJoueur, choixOrdi)

  if (resultatPartie === "Bravo ! Vous avez Gagné") {
    barVieIronValue -= 10
  } else if (resultatPartie === "Perdu !!") {
    barVieSpiderValue -= 10
  } else {
    barVieIronValue -= 10
    barVieSpiderValue -= 10
  }

  updateBarVie()
  ColorBarVie()
  Ko()
})
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------

ciseaux.addEventListener('click', () => {
  toggleButtons(false)

  const gifPied = document.querySelector('.gifPied')
  setTimeout(() => {
    punchSound.play()
  },900)

  gsap.killTweensOf(gifPied) // Stopper toute animation en cours sur le GIF

  const src = gifPied.src
  setTimeout(() => {
    gifPied.src = src
  }, 50);


  gsap.to(spiderPerso, {opacity: 0, duration: 0.2})
  setTimeout(() => {
    gsap.to(spiderPerso, {opacity:1, duration: 0.2})
  }, 2100)

  gsap.set(gifPied, { x: 0 }) // Réinitialiser la position du GIF avant de rejouer l'animation

  gsap.to(".gifPied", {
    x: "25rem",
    duration: 1.5,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(ironPerso, {display: "none", duration: 0.2, onComplete: () => {
        gsap.to(ironPied, {display: "flex", duration: 0.2})

        setTimeout(() => {
          gsap.to(ironPied, {display: "none", duration: 0.2, onComplete: () => {
            gsap.to(ironPerso, {display: "flex", duration: 0.2})
          }})
        }, 1000)
      }})

      setTimeout(() => {
        gsap.to(".gifPied", {x: "0rem", duration: 1.5, ease: "power1.inOut"})
        toggleButtons(true)
      }, 1000)
    }
  })

  gsap.to(gifPied, { opacity: 1, duration: 0.2 });
  setTimeout(() => {
    gsap.to(gifPied, { opacity: 0, duration: 0.2 });
  }, 2000);


  TremblementBar()

  const choixJoueur = "Ciseaux"
  const choixOrdi = getChoiceIa()
  const resultatPartie =  winner(choixJoueur, choixOrdi)

  if (resultatPartie === "Bravo ! Vous avez Gagné") {
    barVieIronValue -= 10
  } else if (resultatPartie === "Perdu !!") {
    barVieSpiderValue -= 10
  } else {
    barVieIronValue -= 10
    barVieSpiderValue -= 10
  }

  updateBarVie();
  ColorBarVie()
  Ko()
})
//--------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------
feuille.addEventListener('click', () => {
  toggleButtons(false)

  const toile = document.querySelector('.toile-ara')
  const toile2 = document.querySelector('.toile-ara1')
  setTimeout(() => {
    toile.style.display = 'flex'
    toile2.style.display = 'flex'
  },300)

  setTimeout(() => {
    toile.style.display = 'none'
    toile2.style.display = 'none'
  },1500)

  const gifToile = document.querySelector('.gifToile')
  spiderManSound.play()

  const src = gifToile.src
  setTimeout(() => {
    gifToile.src = src
  }, 50);

  gsap.to(spiderPerso, {opacity: 0, duration: 0.2})
  setTimeout(() => {
    gsap.to(spiderPerso, {opacity:1, duration: 0.2})
  }, 1600)

  gsap.to(gifToile, { opacity: 1, duration: 0.2 });
  setTimeout(() => {
    gsap.to(gifToile, { opacity: 0, duration: 0.2 });
  }, 1500);

  TremblementBar()

  const choixJoueur = "Feuille"
  const choixOrdi = getChoiceIa()
  const resultatPartie =  winner(choixJoueur, choixOrdi)

  if (resultatPartie === "Bravo ! Vous avez Gagné") {
    barVieIronValue -= 10
  } else if (resultatPartie === "Perdu !!") {
    barVieSpiderValue -= 10
  } else {
    barVieIronValue -= 10
    barVieSpiderValue -= 10
  }

    gsap.to(ironPerso, {display: "none", duration: 0.2, onComplete: () => {
    gsap.to(ironToile, {display: "flex", duration: 0.2})

    setTimeout(() => {
      gsap.to(ironToile, {display: "none", duration: 0.2, onComplete: () => {
        gsap.to(ironPerso, {display: "flex", duration: 0.2})
      }})
    }, 1000)
  }})

  setTimeout(() => {
    toggleButtons(true);
  }, 1000);

  updateBarVie();
  ColorBarVie()
  Ko()
})
//--------------------------------------------------------------------------------------------

//-----------------------------------------BOUTON REPLAY--------------------------------------
replay.addEventListener('click', () => {
  fightSound.play()

  barVieSpiderValue = 100 
  barVieIronValue = 100 

  updateBarVie()

  win.style.opacity = '0';
  lose.style.opacity = '0';

  barVieSpider.style.background = 'linear-gradient(to left, rgb(212, 195, 11), rgb(230, 95, 5) 70%)'
  barVieIron.style.background = 'linear-gradient(to right, rgb(212, 195, 11), rgb(230, 95, 5) 70%)'
  
  fight.style.transform = 'translateX(0%)'
  setTimeout(() => {
    fight.style.transform = 'translateX(250%)'
  }, 2500)

  poing.style.pointerEvents = 'auto'
  ciseaux.style.pointerEvents = 'auto'
  feuille.style.pointerEvents = 'auto'
 
})
//--------------------------------------------------------------------------------------------