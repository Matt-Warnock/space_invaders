class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screen = this.canvas.getContext('2d');
    this.gameSize = {x: this.canvas.width, y: this.canvas.height};
    this.bodies = this.createInvaders(this).concat(new Player(this, this.gameSize));
  }

  run() {
    var self= this;
    var tick = function() {
      self.update();
      self.draw(self.screen, self.gameSize);
      requestAnimationFrame(tick);
    };
    tick();
  }

  update() {
    let notCollidingWithAnything = b1 => {
      return this.bodies.filter(b2 => {return this.colliding(b1, b2);}).length === 0;
    };

    this.bodies = this.bodies.filter(notCollidingWithAnything);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);
    for (var i = 0; i < this.bodies.length; i++) {
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

      createInvaders(game) {
        var invaders = [];
        for (var i = 0; i < 24; i++) {
          var x = 30 + (i % 8) * 30;
          var y = 30 + (i % 3) * 30;
          invaders.push(new Invader(game, {x: x, y: y}));
        }
        return invaders;
      }
    }


    class Keyboarder {
      constructor() {
        this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
        var keyState = {};

        window.onkeydown = function(e) {
          keyState[e.keyCode] = true;
        };
        window.onkeyup = function(e) {
          keyState[e.keyCode] = false;
        };
        this.isDown = function(keyCode) {
          return keyState[keyCode] === true;
        };
      }
    }


    window.onload = function() {
      (new Game('screen')).run();
    };
