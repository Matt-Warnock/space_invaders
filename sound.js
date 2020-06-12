class Sound {
  constructor() {
    this.sounds = {
      backgroundMusic: new Audio('sounds/background_music.mp3'),
      levelIntro: new Audio('sounds/level_intro.wav'),
      gameWin: new Audio('sounds/game_win1.wav'),
      gameOver: new Audio('sounds/15_Game Over.mp3'),
      playerLaser: new Audio('sounds/player_laser6.mp3'),
      playerDeath: new Audio('sounds/explosion.mp3'),
      invaderStep: new Audio('sounds/fastinvader1.mp3'),
      invaderMove: new Audio('sounds/fastinvader4.mp3'),
      invaderLaser: new Audio('sounds/ivader_laser3.mp3'),
      invaderDeath: new Audio('sounds/invaderkilled.mp3')
    };
    this.readySounds();
  }

  readySounds() {
    Object.values(this.sounds).forEach(sound => sound.load());
    this.sounds.backgroundMusic.loop = true;
    this.sounds.backgroundMusic.volume = 0.6;
    this.sounds.invaderStep.volume = 0.6;
    this.sounds.invaderMove.volume = 0.6;
    this.sounds.invaderDeath.volume = 0.2;
  }

  resetSounds() {
    Object.values(this.sounds).forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }

  backgroundMusic() {
    this.sounds.backgroundMusic.play();
    this.sounds.invaderStep.muted = false;
    this.sounds.invaderMove.muted = false;
  }

  stopBackgroundMusic() {
    this.sounds.backgroundMusic.pause();
    this.sounds.backgroundMusic.currentTime = 0;
    this.sounds.invaderStep.muted = true;
    this.sounds.invaderMove.muted = true;
  }

  levelIntro() {
    this.sounds.levelIntro.play();
  }

  playerLaser() {
    this.sounds.playerLaser.cloneNode(true).play();
  }

  playerDeath() {
    this.sounds.playerDeath.cloneNode(true).play();
  }

  invaderLaser() {
    this.sounds.invaderLaser.cloneNode(true).play();
  }

  invaderStep() {
    this.sounds.invaderStep.play();
  }

  invaderMove() {
    this.sounds.invaderMove.play();
  }

  invaderDeath() {
    this.sounds.invaderDeath.cloneNode(true).play();
  }

  gameOver() {
    this.sounds.gameOver.play();
  }

  gameWin() {
    this.sounds.gameWin.play();
  }
}
