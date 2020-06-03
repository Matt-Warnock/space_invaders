class Sound {
  constructor() {
    this.backgroundMusic = new Audio('sound/background_music.mp3');
    this.gameWin = new Audio('sounds/game_win1.mp3');
    this.gameOver = new Audio('sounds/game_over2.mp3');
    this.playerLaser = new Audio('sounds/player_laser6.mp3');
    this.playerDeath = new Audio('sounds/player_death1.mp3');
    this.invaderMove = new Audio('sounds/fastinvader1.mp3');
    this.invaderLaser = new Audio('sounds/ivader_laser3.mp3');
    this.invaderDeath = new Audio('sounds/invaderkilled.mp3');
  }

  lazerBlast() {
    this.playerLaser.cloneNode(true).play();
  }

  shipExplosion() {
    this.playerDeath.play();
  }

  invaderFire() {
    this.invaderLaser.cloneNode(true).play();
  }

  invaderStep() {
    this.invaderMove.play();
  }

  invaderKill() {
    this.invaderDeath.cloneNode(true).play();
  }
}
