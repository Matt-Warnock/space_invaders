class Game {
  constructor(canvasId) {
    this.ui = new Ui(canvasId, this);
    this.button = document.getElementById('button');
    this.gameSize = {x: this.ui.canvas.width, y: this.ui.canvas.height};
    this.sound = new Sound();
    this.gameLeftSide = 0;
    this.userEngaged = false;
    this.gameReset();
  }

  gameReset() {
    this.gameInProgress = true;
    this.bodies = this.createInvaders().concat(new Player(this));
    this.playerLives = 3;
  }

  createInvaders() {
    let invaders = [];
    for (let i = 0; i < 24; i++) {
      let x = 30 + (i % 8) * 30;
      let y = 30 + (i % 3) * 30;
      invaders.push(new Invader(this, {x: x, y: y}));
    }
    return invaders;
  }

  initialize() {
    window.addEventListener('blur', () => this.userEngaged = false);
    this.button.addEventListener('focus', event => event.currentTarget.blur());
    this.ui.textGameMiddle('Press button to play');

    this.button.addEventListener('click', () => {
      if (!this.userEngaged) {
        this.userEngaged = true;
        this.run();
      }
      this.gameReset();
    });
  }

  run() {
    let tick = () => {
      this.update();
      this.ui.draw();
      if (this.gameInProgress) {
        this.checkStatus();
        this.sound.backgroundMusic();
      }else {
        this.sound.stopBackgroundMusic();
      }
      if (this.userEngaged) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  checkStatus() {
    if (this.haveBeenDestroyed('Player')) {
      this.playerLives -= 1;
      this.sound.playerDeath();
      if (this.playerLives > 0) {
        this.addBody(new Player(this));
        return;
      }
      this.sound.gameOver();
      this.gameInProgress = false;

    } else if (this.haveBeenDestroyed('Invader')) {
      this.sound.gameWin();
      this.gameInProgress = false;
    }
  }

  update() {
    let notCollidingWithAnything = b1 => {
      return this.bodies.filter(b2 => {return this.colliding(b1, b2);}).length === 0;
    };

    this.bodies = this.bodies.filter(notCollidingWithAnything);

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
    if (this.hasInvaderCollided(notCollidingWithAnything)) {
      this.sound.invaderDeath();
    }
  }

  hasInvaderCollided(notCollidingWithAnything) {
    return this.bodies.filter(b1 => !notCollidingWithAnything(b1)).some(b => {
      return b instanceof Invader;
    });
  }

  colliding(b1, b2) {
    return !(b1 === b2 ||
      b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x /2 ||
      b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y /2 ||
      b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x /2 ||
      b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y /2);
    }

    haveBeenDestroyed(constructorName) {
      return this.bodies.filter(b => b.constructor.name === constructorName).length === 0;
    }

    addBody(body) {
      this.bodies.push(body);
    }
  }


  window.onload = function() {
    (new Game('screen')).initialize();
  };
