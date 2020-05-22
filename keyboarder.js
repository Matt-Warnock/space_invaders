
class Keyboarder {
  constructor() {
    this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
    this.keyState = {};

    window.onkeydown = (e) => {
      this.keyState[e.keyCode] = true;
    };
    window.onkeyup = (e) => {
      this.keyState[e.keyCode] = false;
    };
  }
  
  isDown(keyCode) {
    return this.keyState[keyCode] === true;
  }
}
