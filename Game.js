class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      //background (bg2);
      ground= createSprite(displayWidth/2,displayHeight-20,displayWidth,40);
      army1 = createSprite(displayWidth/2-200,displayHeight/2);
      army1.addAnimation("army1",army1Img);
      army1.scale=0.6;
      army2 = createSprite(displayWidth/2+200,displayHeight/2+50);
      army2.addAnimation("army2",army2Img);
      army2.scale=0.8
      army=[army1,army2]
      
    }

    play(){
      form.hide();
      var flag1=0;
      var flag2=0;
      Player.getPlayerInfo();
     // player.getCarsatEnd();
      if(allPlayers !== undefined){
        //var display_position = 100;
        
        image(bg2,0,0,displayWidth,displayHeight);
        //index of the array
        var index = 0;

        var x=displayWidth/4-800;
        var y;
  
        drawSprites();

      for(var plr in allPlayers){
        index=index+1

        x=x+800
        y=displayHeight/2-allPlayers[plr].distance

        army[index-1].x = x;
        army[index-1].y = y;
        if (index === player.index){
          camera.position.x = displayWidth/2;
          //camera.position.y = army[index-1].y;
          //console.log(index)
        }

        textSize(25);
        fill("red");
        text("Score ",50,50);
        text("Player 1 :" +allPlayers.player1.score,50,100);
        text("Player 2 :" +allPlayers.player2.score, 50, 150);
        text("Life ",displayWidth-300,50);
        text("Player 1 :" +allPlayers.player1.life,displayWidth-300,100);
        text("Player 2 :" +allPlayers.player2.life,displayWidth-300,150);
        //console.log(index)
      }
        
  
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance-=10
        
        player.update();
      }
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance+=10
        
        player.update();
      }
      if (player.index !== null) {
        for (var i = 0; i < bullet.length; i++) {
      if(bullet.get(i).isTouching(army1)&&flag1===0){
        bullet.get(i).destroy();
        if(player.life===1){
           army1.destroy();
           player.update();
        }
        
        player.score = player.score+1;
        player.life = player.life-1;
        flag1=1;
        player.update();
      }
        }
      }
      flag1=0;
      if (player.index !== null) {
        for (var i = 0; i < bullet.length; i++) {
      if(bullet.get(i).isTouching(army2)&&flag1===0){
        bullet.get(i).destroy();
        if(player.life===1){
          army2.destroy();
          player.update();
       }
        
        player.score = player.score+1;
        player.life = player.life-1;
        flag1=1;
        player.update();
      }
        }
      }
        flag1=0;
        
        if(keyDown("space")&&player.index===2){
        var b1=createSprite(army2.x-200,army2.y-50,50,50)
        b1.addImage(bullet1);
        b1.scale=0.1;
        b1.velocityX=-5
        bullet.add(b1)
         }
      if(keyDown("space")&&player.index===1){
        var b2=createSprite(army1.x+200,army1.y-50,50,50)
        b2.addImage(bullet2);
        b2.scale=0.2;
        b2.velocityX=5
        bullet.add(b2)
       
      }
      drawSprites();
      if(player.score>10){
        //gameState=2;
        //player.rank+=1;
        //Player.updateCarsatEnd(player.rank);
        //textSize(30);
        //fill("white");
        //text("You Won "+ player.rank,displayWidth/2-70,army[player.index-1].y-300)
      }
      
    }
      end(){
        console.log("gameEnded")
      }
  }
  
    
