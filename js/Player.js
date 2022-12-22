class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 500;
    this.blast = false
  }
  addPlayer() {
    var playerRef = "players/player" + player.index;
    if (this.index === 1) {
      this.positionX = width / 2 - 500;
    }
    else if (this.index == 2) {
      this.positionX = width / 2
    }
    else {
      this.positionX = width / 2 + 500;
    }
    database.ref(playerRef).set({
      'name': this.name,
      'positionX': this.positionX,
      'positionY': this.positionY,
      'blast': this.blast
    });
  }
  getCount() {
    var databaseRef = database.ref("playerCount");
    databaseRef.on("value", (data) => {
      playerCount = data.val();
    })

  }
  updateCount(count) {
    var databaseRef = database.ref("/");
    databaseRef.update({
      'playerCount': count
    });
  }
  update() {
    var playerRef = "players/player" + player.index;
    database.ref(playerRef).update({
      positionX: this.positionX,
      positionY: this.positionY,
      blast: this.blast
    })
  }
  static getPlayerInfo() {
    var playerInfoRef = database.ref('players');
    playerInfoRef.on('value', (data) => {
      allPlayers = data.val();
    })
  }

}
