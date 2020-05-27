
class Keyboarder {
  constructor() {
    this.KEYS = {LEFT: 37, RIGHT: 39, SPACE: 32};
    this.keyState = {};
    this.isKeyUp = true;
    this.keyPressNotRepeat = false;

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

  shootOnce(keyCode) {
    this.keyRepeatCheck(keyCode);
    return this.keyPressNotRepeat;
  }

  keyRepeatCheck(keyCode) {
    if (!this.keyState[keyCode]) {
      this.isKeyUp = true;
      this.keyPressNotRepeat = false;
    }
    else if (!this.isKeyUp) {
      this.keyPressNotRepeat = false;
    }
    else if (this.keyState[keyCode]) {
      this.isKeyUp = false;
      this.keyPressNotRepeat = true;
    }
  }
}
