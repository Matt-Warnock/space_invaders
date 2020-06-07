class Display {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screen = this.canvas.getContext('2d');
    this.images = {background: new Image(), ship: new Image(), invader: new Image(), bullet:new Image()};
  }

  textGameMiddle(text, game) {
    this.screen.font = 'bold 0.9em "Press Start 2P"';
    this.screen.fillStyle = '#e8eaef';
    let textMiddle = Math.max(game.gameSize.x / 2 - this.screen.measureText(text).width / 2, game.gameLeftSide);
    this.screen.fillText(text, textMiddle, game.gameSize.y / 2, game.gameSize.x);
  }

  draw(game) {
    this.images.background.src = 'images/blue-and-purple-cosmic-sky-956999.png';
    this.images.ship.src = 'images/galaga_ship.png';
    this.images.invader.src = 'images/invader_3.png';
    this.images.bullet.src = 'images/bullet.png';

    this.screen.clearRect(0, 0, game.gameSize.x, game.gameSize.y);
    this.screen.drawImage(this.images.background, 0, 0, game.gameSize.x, game.gameSize.y);


    this.styleObjects('Player', this.images.ship, game);
    this.styleObjects('Invader', this.images.invader, game);
    this.styleObjects('Bullet', this.images.bullet, game);
    this.livesDisplay(game);
  }

  styleObjects(objName, image, game) {
    let bodiesGroup = game.bodies.filter(body => body.constructor.name === objName);
    bodiesGroup.forEach(body => this.drawObject(image, body));
  }

  drawObject(img, body) {
    this.screen.drawImage(img, body.center.x - body.size.x / 2,
      body.center.y - body.size.y / 2,
      body.size.x, body.size.y);
    }

    livesDisplay(game) {
      const imageSize = 12,
      gameSizeTop = 1;

      this.screen.globalAlpha = 0.6;
      for (var i = 0; i < game.playerLives; i++) {
        let x = game.gameSize.x - 46 + (i % 3) * 15;
        this.screen.drawImage(this.images.ship, x, gameSizeTop, imageSize, imageSize);
      }
      this.screen.globalAlpha = 1;
    }
  }
