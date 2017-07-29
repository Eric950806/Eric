var bglmg = document.createElement("img");
bglmg.src = "images/map.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

setInterval(draw, 16);



var enemy = {
	x: 96,
	y: 480-32
}
 var enemyImg = document.createElement("img");
enemyImg.src = "images/slime.gif";



function draw(){
	ctx.drawImage(bglmg,0,0);
	ctx.drawImage(enemyImg, enemy.x ,enemy.y);
}