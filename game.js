class Game {
  constructor(canvasId) {
    this.sound = new Sound();
    this.display = new Display(canvasId, this);
    this.gameSize = {x: this.display.canvas.width, y: this.display.canvas.height};
    this.gameLeftSide = 0;
    this.gameReset();
  }

  gameReset() {
    const firstLevelSpeed = 0.3,
    firstLevelFireRate = 0.995;

    this.gameLevel = 1;
    this.score = 0;
    this.gameInProgress = true;
    this.sound.readySounds();
    this.sound.backgroundMusic();
    this.bodies = this.createInvaders(firstLevelSpeed, firstLevelFireRate).concat(new Player(this));
    this.playerLives = 3;
  }

  createInvaders(speedX, fireRate) {
    let invaders = [];
    for (let i = 0; i < 24; i++) {
      let x = 30 + (i % 8) * 30;
      let y = 30 + (i % 3) * 30;
      invaders.push(new Invader(this, {x: x, y: y}, speedX, fireRate));
    }
    return invaders;
  }

  run(userinterface) {
    let tick = () => {
      this.update();
      this.display.draw(this);
      if (this.gameInProgress && userinterface.userEngaged) {
        this.checkStatus();
      }
      if (userinterface.userEngaged) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  checkStatus() {
    if (this.haveBeenDestroyed('Player')) {
      this.gameInProgress = false;
      this.playerLives -= 1;
      this.sound.playerDeath();

      if (this.playerLives > 0) {
        setTimeout(() => {
          this.addBody(new Player(this));
          this.gameInProgress = true;
        }, 500);
        return;
      }
      this.sound.stopBackgroundMusic();
      this.sound.gameOver();

    } else if (this.haveBeenDestroyed('Invader')) {
      this.gameInProgress = false;
      this.sound.stopBackgroundMusic();
      this.gameLevel += 1;

      if (this.gameLevel === 4) {
        this.sound.gameWin();
        return;
      }
      this.sound.levelIntro();
      this.levelProgression();
    }
  }

  levelProgression() {
    const secondLevelSpeed = 0.7,
    secondLevelFireRate = 0.992,
    thirdLevelSpeed = 1,
    thirdLevelFireRate = 0.988;

    setTimeout(() => {
      this.sound.backgroundMusic();
      if (this.gameLevel === 2) {
        this.nextLevel(secondLevelSpeed, secondLevelFireRate);
        return;
      }
      this.nextLevel(thirdLevelSpeed, thirdLevelFireRate);
    }, 3000);
  }

  nextLevel(speedX, fireRate) {
    this.gameInProgress = true;
    this.bodies = this.createInvaders(speedX, fireRate).concat(new Player(this));
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
      this.score += 50;
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
