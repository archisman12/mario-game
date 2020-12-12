
var PLAY=1;
var END=0;
var gameState = PLAY;
var backgroundImage, background;
var mario_running, mario1, mario2, mario3, mario;
var mario_bomb, mario_bombImage;
var mario_flowerImage, mario_flower;
var mario_goldImage, marioGold;
var landImage,land;
var mario_standing;
var lostSound;
var invisibleGround;
var mario_shellImg;
var bulletImage,bulllet;
var lifesroom,lifesroomimage;
var badgePointImage;
var checkPoint, checkpointImage;
var coinCollected = 0;
var life=4;
var restartImage, restart;
var score = 0;
var gameOverImage,gameOver;


function preload() {
  backgroundImage = loadImage("background-mario.png")
  mario_running =
    loadAnimation("mario1.png", "mario2.png", "mario3.png");
  mario_bombImage = loadImage("mario bomb.png");
  mario_flowerImage = loadImage("mario flower.png")
  mario_goldImage = loadImage("mario gold.png");
  mario_shellImg = loadImage("shell.png")
  mario_poisonmushroomImage = loadImage("mushroom.png")
  mario_mushroomImage = loadImage("mushroom.png");
  backgroundSound = loadSound("Recording (5).m4a");
  badgePointImage = loadImage("BadgePoint.png")
  restartImage = loadImage("replay button.png");
  landImage = loadImage("land.png");
  //checkpointImgage=loadImage("Checkpoint.png")
//  lostSound=loadSound("Recording ().m4a");
  gameOverImage=loadImage("gameOver.png");
  mario_standing=loadImage("mario standing.png");
  bulletImage=loadImage("Bullet mario.png");
  lifeshroomImage=loadImage("LifeShroom.png")
}




function setup() {
  createCanvas(windowWidth, windowHeight);

  



  background = createSprite(500, 290, 0, 0);
  background.addImage(backgroundImage);
  
  gameOver = createSprite(500, 290,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false
  gameOver.scale=0.6

  mario = createSprite(60, 490, 0, 0);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("standing",mario_standing)
  mario.scale = 0.19

  invisibleGround = createSprite(490, 548, 1700, 15);
  invisibleGround.visible = false;

 

  restart = createSprite(510, 270,0,0);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  

  obstaclesGroup = createGroup();
  pointsGroup = createGroup();
  badgePointsGroup = createGroup();
  landsGroup = createGroup()
  invisibleBlockGroup = createGroup();
  bulletsGroup=createGroup();
  lifeshroomsGroup=createGroup();
      backgroundSound.loop()
}

function draw() {
  //background(67);

  
  
  
  background.velocityX = -1.7
  if (background.x <620) {
    background.x = background.width / 2;

  }
  //console.log(background.x)
  mario.collide(invisibleGround)
  if (gameState === PLAY) {

console.log(background.x)
  //mario.debug=true;
restart.visible = false;
    if (touches.length>0||keyDown("space") && mario.y > 160) {
      mario.velocityY = -12;
      touches=[];
    }
    if (keyDown("left_arrow") && mario.x>0&&mario.y>160) {
     // background.x = background.x+1.8;
      mario.x = mario.x - 3;
    
      
    }
    if (keyDown("right_arrow") && mario.x < 627&&mario.y>160) {
    //  background.x = background.x-1.8;
 
     mario.x = mario.x + 3;
    }
    


    mario.velocityY = mario.velocityY + 0.8
    if (obstaclesGroup.isTouching(mario)) {
     //gameState = END
      life=life-1;
     // lostSound.play();
      obstaclesGroup.destroyEach();
    }
    if(life==0){
       gameState = END
       
       }

    spawnObstacles();
    spawnpoints();
    spawnbadgePoint();
    spawnlands();
    spawnBullets();
    spawnlifeshroom();
    if (badgePointsGroup.isTouching(mario)) {
      coinCollected = coinCollected + 1;
      badgePointsGroup.destroyEach()


    }
    if (pointsGroup.isTouching(mario)) {
      score = score + 150;
      pointsGroup.destroyEach()
    }
    
    
    
    
     if (lifeshroomsGroup.isTouching(mario)) {
      life = life + 1;
      lifeshroomsGroup.destroyEach()
    }
    if (bulletsGroup.isTouching(mario)) {
      life = life - 1;
      bulletsGroup.destroyEach()
    }
   

    if (landsGroup.isTouching(mario)) {
      mario.velocityY = 0;
    }

    score = score + Math.round(getFrameRate() / 60);
  } else if (gameState === END) {
     textSize(49);
     text("game Over", 500, 100);
     text.visible=true;
    background.velocityX=0;
    mario.visible=false;
    restart.visible = true;
    gameOver.visible=true;
   // backgroundSound.stop();
      
    
    badgePointsGroup.destroyEach();
    obstaclesGroup.destroyEach();
    pointsGroup.destroyEach();
    lifeshroomsGroup.destroyEach();
    bulletsGroup.destroyEach();
    landsGroup.destroyEach();
    if(touches.length>0||mousePressedOver(restart)) {
      touches=[]
      reset();
      
    }
  
   
  }


function reset(){
  gameState=PLAY;
  score=0;
  coinCollected=0;
  life=4;
  background.velocityX=-(1.5+score/200);
  mario.visible=true;
  gameOver.visible=false;
  mario.x=60;
  mario.y=490;
 // backgroundSound.play()
}
  




  drawSprites();
  textSize(30);
  fill("gold");
  text("Coin Collected:" + coinCollected, 450, 50);

  textSize(30);
  fill("red")
  text("Score: " + score, 100, 50);
  
  textSize(30);
  fill("red")
  text("Life: " + life, 800, 50);
}

function spawnObstacles() {
  if (frameCount % 650 === 0) {
    var obstacle = createSprite(width-20, 510, 0, 0);
    obstacle.velocityX = -1.7

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacle.addImage(mario_bombImage);
        break;
      case 2:
        obstacle.addImage(mario_shellImg);
        break;
      case 3:
        obstacle.addImage(mario_poisonmushroomImage);
        break;

      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.13;
    obstacle.lifetime = width/1.7;

    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}

function spawnpoints() {
  if (frameCount % 900 === 0) {
    var point = createSprite(width-100, 510, 0, 0);
    point.velocityX = -1.7;

    //generate random obstacles
    var pos = Math.round(random(1, 2));
    switch (pos) {
      case 1:
        point.addImage(mario_flowerImage);
        break;
      case 2:
        point.addImage(mario_mushroomImage);
        break;

      default:
        break
    }
    //assign scale and lifetime to the obstacle           
    point.scale = 0.1;
    point.lifetime = width/1.7;

    //add each obstacle to the group
    pointsGroup.add(point);
  }
}

function spawnbadgePoint() {
  if (frameCount % 200 === 0) {
    badgePoint = createSprite(width-100, 400, 10, 10);
    badgePoint.y = Math.round(random(0, 400));
    badgePoint.addImage(badgePointImage);
    badgePoint.scale = 1;
    badgePoint.velocityX = -1.7


    badgePoint.lifetime = width/1.7;
    badgePointsGroup.add(badgePoint);
    //console.log(badgePoint.y)

    badgePoint.depth = mario.depth;
    mario.depth = badgePoint.depth + 1;

  }
}

function spawnlands() {

  if (frameCount % 250 === 0) {

    var land = createSprite(width-100, 10);
    land.addImage(landImage);
    land.scale = 1.4

    land.y = Math.round(random(120, 500));


    land.velocityX = -1.7;


    land.depth = mario.depth;
    mario.depth = land.depth + 1;
    //door.lifetime = 600;
    land.lifetime = width/1.7;


    // land.debug = true;
    land.setCollider("rectangle", -7, 0, 60, 19)
    landsGroup.add(land);

  }
}
  
  function spawnBullets(){
  if(frameCount%250 === 0){
    var bullet=createSprite(width,300,20,20);
    bullet.y = Math.round(random(120,500));
    bullet.addImage(bulletImage);
    bullet.velocityX = -1.7; 
    bullet.lifetime=width/1.7;
    bullet.scale=0.04;
    bulletsGroup.add(bullet);
    //bullet.debug=true;
   // bullet.setCollider("rectangle",0,0,5000,300)
  }
  
  
}
  
  function spawnlifeshroom() {
  if (frameCount % 1005 === 0) {
    var lifeshroom = createSprite(width, 510, 0, 0);
    lifeshroom.velocityX = -1.7;
    lifeshroom.addImage(lifeshroomImage)
    //generate random obstacles
  
    //assign scale and lifetime to the obstacle           
    lifeshroom.scale = 0.09;
    lifeshroom.lifetime = width/1.7;

    //add each obstacle to the group
    lifeshroomsGroup.add(lifeshroom);
    //console.log(lifeshroom)

  }
}