class Game {
  constructor(canvasId) {
    this.sound = new Sound();
    this.display = new Display(canvasId, this);
    this.gameSize = {x: this.display.canvas.width, y: this.display.canvas.height};
    this.gameLeftSide = 0;
    this.gameReset();
  }

  gameReset() {
    this.gameInProgress = true;
    this.sound.readySounds();
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

  run(userinterface) {
    let tick = () => {
      this.update();
      this.display.draw(this);
      if (this.gameInProgress && userinterface.userEngaged) {
        this.checkStatus();
        this.sound.backgroundMusic();
      }else {
        this.sound.stopBackgroundMusic();
      }
      if (userinterface.userEngaged) {
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
