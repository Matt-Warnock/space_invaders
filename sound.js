class Sound {
  constructor() {
    this.backgroundMusic = new Audio('sound/background_music.mp3');
    this.gameWin = new Audio('sound/game_win1.mp3');
    this.gameOver = new Audio('sound/game_over2.mp3');
    this.playerLaser = new Audio('sounds/player_laser6.mp3');
    this.playerDeath = new Audio('sound/player_death1.mp3');
    this.invederMove = new Audio('sound/fastinvader1.mp3');
    this.invaderLaser = new Audio('sound/ivader_laser3.mp3');
    this.invaderDeath = new Audio('sound/invader_death.mp3');
  }

  lazerBlast() {
    this.playerLaser.cloneNode(true).play();
  }
}
