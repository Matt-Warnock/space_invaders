class Invader {
  constructor(game, center, speedX, fireRate) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.center = center;
    this.patrolX = 0;
    this.patrolY = 0;
    this.speedX = speedX;
    this.fireRate = fireRate;
    this.speedY = 7;
  }

  update() {
    this.center.x += this.speedX;
    this.patrolX += this.speedX;
    this.game.sound.invaderStep();

    if (this.patrolX < -14 || this.patrolX > 54) {
      this.speedX = -this.speedX;
      if (this.patrolY < 0 || this.patrolY > 100) {
        this.speedY = -this.speedY;
      }
      this.center.y += this.speedY;
      this.patrolY += this.speedY;
      this.game.sound.invaderMove();
    }

    if (Math.random() > this.fireRate && !this.invadersBelow(this)) {
      let bullet = new Bullet ({x: this.center.x, y: this.center.y + this.size.x / 2}, {x: Math.random() - 0.5 , y: 3});
      this.game.addBody(bullet);
      this.game.sound.invaderLaser();
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
