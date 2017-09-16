var score = 0;
var Hp = 100;
var money = 10000;
var enemies = [];
var Towers = [];
var clock = 0;
var FPS = 60;
var isBuilding = false;
var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";
var twImg = document.createElement("img");
twImg.src = "images/tower-btn.png";
var toImg = document.createElement("img");
toImg.src = "images/tower.png";
var coImg = document.createElement("img");
coImg.src = "images/crosshair.png";

var tower_btn = {
	x: 640-96 ,
	y: 192
}

var cursor = {
	x:0,
	y:0
};

function Tower(){
	this.x = 0;
	this.y = 0;
	this.range = 640;
	this.aimingEnemyId = null;
	this.seachEnemy = function(){
		this.readyToShootTime -= 1/FPS;
		for (var i = 0; i < enemies.length; i++) {
			var distance = Math.sqrt(
				Math.pow(this.x-enemies[i].x,2)+ Math.pow(this.y-enemies[i].y,2)
				);
			if(distance<=this.range){
				this.aimingEnemyId = i;
				if(this.readyToShootTime <= 0){
					this.shoot();
					this.readyToShootTime = this.fireRate;
				}
				return;
			}
		}
		this.aimingEnemyId = null;
	};
	this.fireRate = 1;
	this.readyToShootTime = 1;
	this.damage = 5;
	this.shoot = function(){
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.x + 16, this.y + 16);
		ctx.lineTo(enemies[this.aimingEnemyId].x + 16,
					enemies[this.aimingEnemyId].y + 16);
		ctx.stroke();
		enemies[this.aimingEnemyId].hp = enemies[this.aimingEnemyId].hp - this.damage;
	};
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


var hp = 100;

function Enemy(speed){
	this.x= 64;
	this.y= 480-32;
	this.speed = speed;
	this.speedX= 0;
	this.speedY= -this.speed;
	this.pathDes= 0;
	this.hp = 1;
	this.move= function(){
		this.x += this.speedX;
		this.y += this.speedY;
		if(isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y,
			this.speed, this.speed)){
			if(this.pathDes == enemyPath.length - 1){
				this.hp = 0;
				hp-=10;
			}
			else{
			this.x = enemyPath[this.pathDes].x;
			this.y = enemyPath[this.pathDes].y;
			this.pathDes++;
			

			
		
			

			if (this.x > enemyPath[this.pathDes].x){
				this.speedX = -this.speed;
			}else if(this.x < enemyPath[this.pathDes].x){
					this.speedX = this.speed;
				}else if(this.x == enemyPath[this.pathDes].x){
						this.speedX = 0;
					}
			if(this.y >enemyPath[this.pathDes].y){
				this.speedY = -this.speed;
			}else if(this.y < enemyPath[this.pathDes].y){
					this.speedY = this.speed;
				}else if(this.y = enemyPath[this.pathDes].y){
						this.speedY = 0;
			}
					}
		}
	}
};
 


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




// var enemy = new Enemy;
function draw(){
	ctx.drawImage(bglmg,0,0);
	clock++;
	if(clock%80==0){
		var newEnemy = new Enemy((64+  Math.floor(clock/100))/FPS);
		enemies.push(newEnemy);

	};
	for (var i = 0; i < enemies.length; i++) { 
		if (enemies[i].hp <= 0) {
			enemies.splice(i, 1);
			score += 50000;
			money += 5;
		}else{
			enemies[i].move(); //執行move
			ctx.drawImage(enemyImg, enemies[i].x, enemies[i].y); //畫出來
		}
		
	}
		
		if(isBuilding){
		ctx.drawImage(toImg, cursor.x -16, cursor.y -16, 32, 32);
		};
		ctx.drawImage(twImg, 640-96, 480-288, 64, 64);

	for (var j = 0; j < Towers.length; j++) {
		ctx.drawImage(toImg, Towers[j].x, Towers[j].y, 32, 32);
		Towers[j].seachEnemy();
		if (Towers[j].aimingEnemyId != null) {
	 		ctx.drawImage(coImg, enemies[Towers[j].aimingEnemyId].x, enemies[Towers[j].aimingEnemyId].y);
	 
	 	}

	}

	ctx.fillText("HP:" + hp, 100, 100);
	ctx.font = "24px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + score, 100, 132);
	ctx.fillText("Money: " + money, 196, 100);
	if(hp <= 0){
	 	clearInterval(IntervalID);
	}
};


var intervalID = setInterval(draw, 1000/FPS);


$("#game-canvas").on("mousemove", function(event){
	console.log("x:"+ event.offsetX+ ",y:"+ event.offsetY);
	cursor.x = event.offsetX;
	cursor.y = event.offsetY;
});


$("#game-canvas").on("click", function(){
   if(cursor.x > 640-96 && cursor.x < 640-32 && cursor.y > 192 && cursor.y < 192 + 64){
     isBuilding = true;
   }else{
   	if(isBuilding){
   	 	if (money >= 25) {
   	 		money -= 25;
   	 		var newTower = new Tower;
   	 		newTower.x = Math.floor(cursor.x/32)*32;
   			newTower.y = Math.floor(cursor.y/32)*32;
   			Towers.push(newTower);
    }
   	 	}
   	isBuilding = false;
   }

   
});