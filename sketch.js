var bird,bird1Image,bird2Image,bird3Image,bird9Image;
var pig,pigImage;
var ground,groundImage;
var egg,eggImage;
var score;
var birdGroup,pigGroup,eggGroup;
var invisiGround;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  bird1Image = loadImage("red.png");
  bird2Image = loadImage("bomb.png");
  bird3Image = loadImage("chuck.png");
  //bird4Image = loadImage("bubble.png");
  //bird5Image = loadImage("matilda.png");
  //bird6Image = loadImage("terence.png");
  //bird7Image = loadImage("stella.png");
  //bird8Image = loadImage("hal.png");
  bird9Image = loadImage("blue.jpg");
  
  eggImage = loadImage("egg.png");
  
  //groundImage = loadImage("ground2.png");
  
  pigImage = loadImage("pig.png");
}

function setup(){
  createCanvas(700,400);
  
  pig = createSprite(650,330,20,20);
  pig.addImage(pigImage);
  pig.scale = 0.2;
  
  
  ground = createSprite(350,380,1400,10);
  //ground.addImage(groundImage);
  ground.velocityX = -6;
  //ground.x = ground.width /2;
  
  
  //bird.scale = 0.2;
  //bird3Image.scale = 0.5;
  
  birdGroup = createGroup();
  pigGroup = createGroup();
  eggGroup = createGroup();
  score = 0;
  pigGroup.add(pig);
}

function draw(){
  background("white");
  textSize(20);
  text("Score: "+score,pig.x,pig.y-50);
  
  
  if(gameState === PLAY){
    if (pig.x<30){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&&pig.y>=100){
    pig.velocityY = -12;
  }
  pig.velocityY = pig.velocityY + 0.4;
  pig.velocityX = -6;
  ground.velocityX = -6;
  pig.collide(ground);

  camera.position.x = pig.x;
  camera.position.y = pig.y;
  
  if(pigGroup.isTouching(eggGroup)){
     score = score+1;
    eggGroup.destroyEach();
  }
    spawnBird();
  Egg();
  }
  
    if(pigGroup.isTouching(birdGroup)){
       gameState = END; 
  }
  if(gameState === END){
    pigGroup.scale = 0.6;
    birdGroup.setVelocityXEach(0);
    //birdGroup.velocityX = 0;
    eggGroup.setVelocityXEach(0);
    pigGroup.velocityY = 0;
    //eggGroup.destroyEach();
    text("GAME OVER",300,300)
    ground.velocityX = 0;
    pigGroup.collide(ground);
    
    pigGroup.setLifetimeEach(-1);
    birdGroup.setLifetimeEach(-1);
    eggGroup.setLifetimeEach(-1);
  }
  
  
  drawSprites();
}

function spawnBird(){
  if(frameCount % 60 === 0){
    var bird = createSprite(Math.round(random(50,-1000)),330,20,20);
    bird.velocityX = 6;
    
    var rand = Math.round(random(1,4));
    switch(rand){
          case 1: bird.addImage(bird1Image);
          break;
          case 2: bird.addImage(bird2Image);
          break;
          case 3: bird.addImage(bird3Image);
          break;
          case 4: bird.addImage(bird9Image);
          break;
          
          default: break;
          
          
    } 
          bird.scale = 0.1;
      //if(bird.addImage(bird1Image)){
        //bird.scale = 0.2;
      //}
          bird.lifetime = 150;
        
          birdGroup.add(bird);
  }
}

function Egg(){
  if(World.frameCount % 300 === 0){
    egg = createSprite(200,330,20,20);
    egg.addImage(eggImage);
    egg.velocityX = 6;
    egg.scale = 0.5;
  eggGroup.add(egg);
  
  }
}