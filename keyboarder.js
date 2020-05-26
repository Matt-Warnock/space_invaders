
class Keyboarder {
  constructor() {
    this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
    this.keyState = {};
    this.isKeyUp = true;

    window.onkeydown = (e) => {
      this.keyState[e.keyCode] = true;
    };
    window.onkeyup = (e) => {
      this.keyState[e.keyCode] = false;
    };
  }

  isDown(keyCode) {
    return this.keyState[keyCode];
  }

  keyTap(keyCode) {
    if (!this.keyState[keyCode]) {
      this.isKeyUp = true;
    }
    if (!this.isKeyUp) return false;
    else if (this.keyState[keyCode]) {
      this.isKeyUp = false;
      return true;
    }
  }
}
