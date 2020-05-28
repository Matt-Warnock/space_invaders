
class Keyboarder {
  constructor() {
    this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
    this.keyState = {};

    window.onkeydown = (e) => {
      this.keyState[e.keyCode] = true;
      if (e.repeat && e.keyCode === this.KEYS.SPACE) {
        this.keyState[e.keyCode] = false;
      }
    };
    window.onkeyup = (e) => {
      this.keyState[e.keyCode] = false;
    };
  }

  isDown(keyCode) {
    return this.keyState[keyCode];
  }

  restore(keyCode) {
    this.keyState[keyCode] = false;
  }
}
