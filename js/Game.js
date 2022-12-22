class Game {
  constructor() {
    this.resetButton = createButton("Reset Game");
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });

  }


  update(state) {
    database.ref('/').update({
      'gameState': state
    });
  }

  start() {

    player = new Player();
    player.getCount();

    form = new Form();
    form.display();

    aeroplane1 = createSprite(width / 2 - 500, 500)
    aeroplane1.addImage(aeroplane1Img)
    aeroplane1.scale = .4
    aeroplane1.addImage('boom', boom)

    aeroplane2 = createSprite(width / 2, 500)
    aeroplane2.addImage(aeroplane2Img)
    aeroplane2.scale = .5
    aeroplane2.setCollider('rectangle', 0, 0, 300, 300)
    aeroplane2.addImage('boom', boom)

    aeroplane3 = createSprite(width / 2 + 500, 500)
    aeroplane3.addImage(aeroplane3Img)
    aeroplane3.scale = .4
    aeroplane3.addImage('boom', boom)

    obstacles = new Group();
    aeroplanes = [aeroplane1, aeroplane2, aeroplane3]

    this.addSprites(obstacles, 15, obstacleImage, 0.3);
  }

  addSprites(spriteGroup, numberOfSprites, spritesImage, scale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      x = random(width / 2 + 550, width / 2 - 550);
      y = random(-height * 5, height - 800)

      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spritesImage);
      sprite.scale = scale;
      sprite.velocityY = random(4, 8)
      spriteGroup.add(sprite);
    }

  }

  handelElement() {
    form.hide()
    //form.titleImg.position(40, 50);
    //form.titleImg.class('gameTitleAfterEffect');

    this.resetButton.position(width / 2 + 250, 100);
    this.resetButton.class("resetButton");
  }

  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {}
      });
      window.location.reload();
    });
  }

  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY = player.positionY - 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > 50) {
      player.positionX = player.positionX - 10;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width - 50) {
      player.positionX = player.positionX + 10;
      player.update();
    }

  }

  play() {
    this.handelElement();
    this.handleResetButton();
    Player.getPlayerInfo();
    if (allPlayers !== undefined) {
      image(backgroundImage, 0, -height * 5, width, height * 6);
      var index = 0;
      for (var plr in allPlayers) {

        var x = allPlayers[plr].positionX;
        var y = allPlayers[plr].positionY;

        aeroplanes[index].position.x = x;
        aeroplanes[index].position.y = y;

        if(allPlayers[plr].blast == true){
          aeroplanes[index].changeImage('boom');
        }


        if ((index + 1) == player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          this.handleObstacleCollision(player.index);
          camera.position.y = aeroplanes[index].position.y;
        }

        index = index + 1;

        //console.log(x, y);
      }

      this.handlePlayerControls()

      var finishLine = height * 5 - 1000;
      if ((player.positionY * -1) > finishLine) {
        console.log("crossed finish line...")
        gameState = 2;
        player.update();
      }


      drawSprites();
    }
  }

  handleObstacleCollision(index) {
    if (aeroplanes[index - 1].collide(obstacles)) {
      gameState = 2;
      player.blast = true;
      crashSound.play()
      player.update();
    }
  }
  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!",
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks for Playing"
    })
  }

  showWinMsg() {
    swal({
      title: `Awsome!`,
      text: "You successfully reached the finishing line",
      imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "OK"

    })
  }
  end() {

    if(player.blast == true){
      this.gameOver();
    }
    else{
      this.showWinMsg();
    }
    

  }
}


