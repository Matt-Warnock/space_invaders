class Player {
  constructor(game, gameSize) {
    this.game = game;
    this.margin = 2;
    this.size = {x: 15, y: 15};
    this.center = {x: gameSize.x / 2, y: gameSize.y - this.size.x};
    this.keyboarder = new Keyboarder();
  }
  update() {
    if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
      this.center.x -= 2;
    } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
      this.center.x += 2;
    }
    if (this.center.x - this.size.x / this.margin <= this.game.gameLeftSide) {
      this.center.x += 2;
    }else if (this.center.x + this.size.x / this.margin >= this.game.gameSize.x) {
      this.center.x -= 2;
    }
    if (this.keyboarder.shootOnce(this.keyboarder.KEYS.SPACE)) {
      let bullet = new Bullet ({x: this.center.x, y: this.center.y - this.size.x / this.margin}, {x: 0, y: -7});
      this.game.addBody(bullet);
    }
  }
}
