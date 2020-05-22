class Invader {
  constructor(game, center) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.center = center;
    this.patrolX = 0;
    this.speedX = 0.3;
  }

  update() {
    if (this.patrolX < 0 || this.patrolX > 40) {
      this.speedX = -this.speedX;
    }

    this.center.x += this.speedX;
    this.patrolX += this.speedX;

    if (Math.random() > 0.995 && !this.invadersBelow(this)) {
      let bullet = new Bullet ({x: this.center.x, y: this.center.y + this.size.x / 2}, {x: Math.random() - 0.5 , y: 2});
      this.game.addBody(bullet);
    }
  }

  invadersBelow(invader) {
    return this.game.bodies.filter(b => {
      return b instanceof Invader &&
      b.center.y > invader.center.y &&
      Math.abs(b.center.x - invader.center.x) < invader.size.x;
    }).length > 0;
  }
}
