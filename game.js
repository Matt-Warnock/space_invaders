class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screen = this.canvas.getContext('2d');
    this.gameSize = {x: this.canvas.width, y: this.canvas.height};
    this.bodies = createInvaders(this).concat(new Player(this, this.gameSize));
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
      return this.bodies.filter(b2 => {return colliding(b1, b2);}).length === 0;
    };

    this.bodies = this.bodies.filter(notCollidingWithAnything);

    for (var i = 0; i < this.bodies.length; i++) {
      this.bodies[i].update();
    }
  }

  draw(screen, gameSize) {
    screen.clearRect(0, 0, gameSize.x, gameSize.y);
    for (var i = 0; i < this.bodies.length; i++) {
      drawRect(screen, this.bodies[i]);
    }
  }

  addBody(body) {
    this.bodies.push(body);
  }

  invadersBelow(invader) {
    return this.bodies.filter(b => {
      return b instanceof Invader &&
      b.center.y > invader.center.y &&
      Math.abs(b.center.x - invader.center.x) < invader.size.x;
    }).length > 0;
  }
}
