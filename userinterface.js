class Ui {
  constructor(canvasId) {
    this.button = document.getElementById('button');
    this.game = new Game(canvasId);
    this.userEngaged = false;
  }

  initialize() {
    window.addEventListener('blur', () => this.userEngaged = false);
    this.button.addEventListener('focus', event => event.currentTarget.blur());
    this.game.display.centeredMessage('Press button to play', this.game);

    this.button.addEventListener('click', () => {
      if (!this.userEngaged) {
        this.userEngaged = true;
        this.game.display.setBackground();
        this.game.run(this);
      }
      this.game.gameReset();
    });
  }
}


window.onload = function() {
  (new Ui('screen')).initialize();
};
