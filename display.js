class Display {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screen = this.canvas.getContext('2d');
    this.images = {ship: new Image(), invader: new Image(), bullet:new Image()};
    this.images.ship.src = 'images/galaga_ship.png';
    this.images.invader.src = 'images/invader_3.png';
    this.images.bullet.src = 'images/bullet.png';
  }

  centeredMessage(message, game) {
    this.screen.font = 'bold 0.9em "Press Start 2P"';
    this.screen.fillStyle = '#e8eaef';
    let startPosition = Math.max(game.gameSize.x / 2 - this.screen.measureText(message).width / 2, game.gameLeftSide);
    this.screen.fillText(message, startPosition, game.gameSize.y / 2, game.gameSize.x);
  }

  setBackground() {
    this.canvas.classList.add('canvas_when_playing');
  }

  draw(game) {
    this.screen.clearRect(0, 0, game.gameSize.x, game.gameSize.y);

    this.styleObjects('Player', this.images.ship, game);
    this.styleObjects('Invader', this.images.invader, game);
    this.styleObjects('Bullet', this.images.bullet, game);
    this.livesDisplay(game);
    this.score(game);

    if (game.haveBeenDestroyed('Player') && game.playerLives === 0) {
      this.centeredMessage('Game Over', game);
      return;
    } else if (game.haveBeenDestroyed('Invader') && game.gameLevel === 2) {
      this.centeredMessage('Level Two', game);
      return;
    } else if (game.haveBeenDestroyed('Invader') && game.gameLevel === 3) {
      this.centeredMessage('Level Three', game);
      return;
    } else if (game.haveBeenDestroyed('Invader') && game.gameLevel === 4) {
      this.centeredMessage('You Win!', game);
    }
  }

  styleObjects(objName, image, game) {
    let bodiesGroup = game.bodies.filter(body => body.constructor.name === objName);
    bodiesGroup.forEach(body => this.drawObject(image, body));
  }

  drawObject(img, body) {
    this.screen.drawImage(img,
      body.center.x - body.size.x / 2,
      body.center.y - body.size.y / 2,
      body.size.x, body.size.y
    );
  }

  livesDisplay(game) {
    const displayTotalWithMargin = 46,
    imageSize = 12,
    gameSizeTop = 1,
    margin = 5,
    text = 'Lives: ';

    this.screen.font = '7px "Press Start 2P"';
    this.screen.fillStyle = '#e8eaef';
    let startPosition = game.gameSize.x - displayTotalWithMargin - this.screen.measureText(text).width + margin;
    this.screen.fillText(text, startPosition, gameSizeTop + imageSize);

    this.screen.globalAlpha = 0.6;
    for (var i = 0; i < game.playerLives; i++) {
      let x = game.gameSize.x - displayTotalWithMargin + (i % 3) * 15;
      this.screen.drawImage(this.images.ship, x, gameSizeTop, imageSize, imageSize);
    }
    this.screen.globalAlpha = 1;
  }

  score(game) {
    const leftMargin = 3,
    fontSizeWithTopMargin = 13;

    this.screen.font = '7px "Press Start 2P"';
    this.screen.fillStyle = '#e8eaef';
    this.screen.fillText('Score: ' + game.score, leftMargin, fontSizeWithTopMargin);
  }
}
