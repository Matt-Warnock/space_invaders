class ButtonControler {
  constructor() {
    this.leftButton = document.getElementById('left');
    this.rightButton = document.getElementById('right');
    this.fireButton = document.getElementById('fire');
    this.leftState = false;
    this.rightState = false;
    this.fireState = false;
    this.buttonListen();
  }

  buttonListen() {
    this.leftButton.addEventListener('touchstart', () => this.leftState = true);
    this.leftButton.addEventListener('touchend', () => this.leftState = false);

    this.rightButton.addEventListener('touchstart', () => this.rightState = true);
    this.rightButton.addEventListener('touchend', () => this.rightState = false);

    this.fireButton.addEventListener('touchstart', () => this.fireState = true);
  }
}
