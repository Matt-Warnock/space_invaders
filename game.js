class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.button = document.getElementById('button');
    this.screen = this.canvas.getContext('2d');
    this.gameSize = {x: this.canvas.width, y: this.canvas.height};
    this.gameLeftSide = 0;
    this.bodies = this.bodies = this.createInvaders().concat(new Player(this));
    this.userEngaged = false;
  }

  initialize() {
    button.addEventListener('focus', event => event.currentTarget.blur());
    this.textGameMiddle('Press button to play game');

    button.addEventListener('click', () => {
      if (!this.userEngaged) {
        this.userEngaged = true;
        this.run();
      }
      this.gameReset();
    });
  }

  gameReset() {
    this.bodies = this.createInvaders().concat(new Player(this));
  }

  haveBeenDestroyed(constructorName) {
    return this.bodies.filter(b => b.constructor.name === constructorName).length === 0;
  }

  checkStatus() {
    if (this.haveBeenDestroyed('Player')) {
      this.textGameMiddle('Game Over');

    } else if (this.haveBeenDestroyed('Invader')) {
      this.textGameMiddle('You Win!');
    }
  }

  run() {
    let tick = () => {
      this.userOnScreenCheck();
      this.update();
      this.draw(this.screen, this.gameSize);
      this.checkStatus();
      if (this.userEngaged) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }

  userOnScreenCheck() {
    window.addEventListener('blur', () => this.userEngaged = false);
  }

  update() {
    let notCollidingWithAnything = b1 => {
      return this.bodies.filter(b2 => {return this.colliding(b1, b2);}).length === 0;
    };

    this.bodies = this.bodies.filter(notCollidingWithAnything);

    for (let i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
  }

  textGameMiddle(text) {
    this.screen.font = 'bold 1em "Press Start 2P"';
    let textMiddle = Math.max(this.gameSize.x / 2 - this.screen.measureText(text).width / 2, this.gameLeftSide);
    this.screen.fillText(text, textMiddle, this.gameSize.y / 2, this.gameSize.x);
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);
    for (let i = 0; i < this.bodies.length; i++) {
      this.drawRect(screen, this.bodies[i]);
    }
  }

  drawRect(screen, body) {
    screen.fillRect(body.center.x - body.size.x / 2,
      body.center.y - body.size.y / 2,
      body.size.x, body.size.y);
    }

    colliding(b1, b2) {
      return !(b1 === b2 ||
        b1.center.x + b1.size.x / 2 < b2.center.x - b2.size.x /2 ||
        b1.center.y + b1.size.y / 2 < b2.center.y - b2.size.y /2 ||
        b1.center.x - b1.size.x / 2 > b2.center.x + b2.size.x /2 ||
        b1.center.y - b1.size.y / 2 > b2.center.y + b2.size.y /2);
      }

      addBody(body) {
        this.bodies.push(body);
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
    }

    window.onload = function() {
      (new Game('screen')).initialize();
    };
