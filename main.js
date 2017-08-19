var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60;
setInterval(draw, 1000/FPS);



var enemy = {
	x: 64,
	y: 480-32,
	speedX:0,
	speedY:-64/FPS,
	pathDes: 0,
	move: function(){
		this.x += this.speedX;
		this.y += this.speedY;
		if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y,
			this.x, this.y,
			64/FPS, 64/FPS))
		{
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;

			if (this.x > enemyPath[this.pathDes].x){
				this.speedX = -64/FPS;
			}else if(this.x < enemyPath[this.pathDes].x){
					this.speedX = 64/FPS;
				}else if(this.x == enemyPath[this.pathDes].x){
						this.speedX = 0;
					}
			if(this.y >enemyPath[this.pathDes].y){
				this.speedY = -64/FPS;
			}else if(this.y < enemyPath[this.pathDes].y){
					this.speedY = 64/FPS;
				}else if(this.y = enemyPath[this.pathDes].y){
						this.speedY = 0;
					}
		}
	}
};
 

 var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";


var twImg = document.createElement("img");
twImg.src = "images/tower-btn.png";
var tower_btn = {
	x: 640-96 ,
	y: 192
}

var cursor = {
	x:0,
	y:0
};


var isBuilding = false;

var toImg = document.createElement("img");
toImg.src = "images/tower.png";
var tower = {
	x: 0,
	y: 0
};



var enemyPath = [
	{x:64, y:256},
	{x:224, y:256},
	{x:224, y:416},
	{x:352, y:416},
	{x:352, y:256},
	{x:480, y:256},
	{x:480, y:416},
	{x:608, y:416},
	{x:608, y:160},
	{x:32, y:160},
	{x:32, y:32},
	{x:608, y:32},
];



function isCollided(pointX, pointY, targetX, targetY, targetWidth,targetHeight){
	if(pointX>= targetX
		&& pointX <= targetX + targetWidth
		&& pointY>= targetY
		&& pointY<= targetY + targetHeight
	){
		return true;
	}else{
		return false;
	}
};





function draw(){
	ctx.drawImage(bglmg,0,0);
	ctx.drawImage(enemyImg, enemy.x, enemy.y, 32, 32);
	ctx.drawImage(twImg, tower_btn.x, tower_btn.y, 64, 64);
	if(isBuilding){
		ctx.drawImage(toImg, cursor.x -16, cursor.y -16, 32, 32);
	};
	ctx.drawImage(toImg, tower.x, tower.y, 32, 32);
	enemy.move();
}

$("#game-canvas").on("mousemove", function(event){
	console.log("x:"+ event.offsetX+ ",y:"+ event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
});


$("#game-canvas").on("click", function(){
   if(cursor.x > 640-96 && cursor.y > 192){
     isBuilding = true;
   }else{
   	if(isBuilding){
   	 	tower.x = Math.floor(cursor.x/32)*32;
   		tower.y = Math.floor(cursor.y/32)*32;
    }
   	isBuilding = false;
   }

   
});