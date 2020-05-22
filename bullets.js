class Bullet {
  constructor(center, velocity) {
    this.size = {x: 3, y: 3};
    this.center = center;
    this.velocity = velocity;
  }

  update() {
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  }
}
