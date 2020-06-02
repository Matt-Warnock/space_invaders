class Player {
  constructor(game) {
    this.game = game;
    this.size = {x: 18, y: 18};
    this.center = {x: this.game.gameSize.x / 2, y: this.game.gameSize.y - this.size.x};
    this.keyboarder = new Keyboarder();
  }
  update() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;
    }
    if (this.center.x - this.size.x / 2 <= this.game.gameLeftSide) {
      this.center.x += 2;
    }else if (this.center.x + this.size.x / 2 >= this.game.gameSize.x) {
      this.center.x -= 2;
    }
    if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
      this.keyboarder.restore(this.keyboarder.KEYS.SPACE);
      let bullet = new Bullet ({x: this.center.x, y: this.center.y - this.size.x / 2}, {x: 0, y: -7});
      this.game.addBody(bullet);
      this.game.sound.playerLaser();
    }
  }
}
