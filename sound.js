class Sound {
  constructor() {
    this.sounds = {
      backgroundSong: new Audio('sounds/background_music.mp3'),
      gameWin: new Audio('sounds/game_win1.mp3'),
      gameOver: new Audio('sounds/15_Game Over.mp3'),
      playerLaser: new Audio('sounds/player_laser6.mp3'),
      playerDeath: new Audio('sounds/explosion.mp3'),
      invaderMove: new Audio('sounds/fastinvader1.mp3'),
      invaderLaser: new Audio('sounds/ivader_laser3.mp3'),
      invaderDeath: new Audio('sounds/invaderkilled.mp3')
    };
  }

  readySounds() {
    Object.values(this.sounds).forEach(sound => sound.load());
    this.sounds.backgroundSong.loop = true;
    this.sounds.backgroundSong.volume = 0.6;
  }

  backgroundMusic() {
    this.sounds.backgroundSong.play();
  }

  stopBackgroundMusic() {
    this.sounds.backgroundSong.pause();
  }

  lazerBlast() {
    this.sounds.playerLaser.cloneNode(true).play();
  }

  shipExplosion() {
    this.sounds.playerDeath.cloneNode(true).play();
  }

  invaderFire() {
    this.sounds.invaderLaser.cloneNode(true).play();
  }

  invaderStep() {
    this.sounds.invaderMove.play();
  }

  invaderStepMute(boolen) {
    this.sounds.invaderMove.muted = boolen;
  }

  invaderKill() {
    this.sounds.invaderDeath.cloneNode(true).play();
  }

  gameLose() {
    this.sounds.gameOver.play();
  }

  playerWin() {
    this.sounds.gameWin.play();
  }
}
