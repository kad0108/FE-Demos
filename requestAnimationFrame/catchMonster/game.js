//prepare canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
// canvas.width = 512;
// canvas.height = 480;
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.body.appendChild(canvas);

//prepare img
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "img/background.png";
// bgImage.width = document.documentElement.clientWidth;
// bgImage.height = document.documentElement.clientHeight;

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "img/hero.png";

var mosReady = false;
var mosImage = new Image();
mosImage.onload = function(){
	mosReady = true;
};
mosImage.src = "img/monster.png";

//game object
var hero = {
	speed: 256,//pixel move per second
	x: 0,
	y: 0
};
var monster = {
	x: 0,
	y: 0
};
var mosCaught = 0;

//input
var keysDown = {};
addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

//reset
var reset = function(){
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	monster.x = Math.random() * (canvas.width - 64) + 32;
	monster.y = Math.random() * (canvas.height - 64) + 32;
};

//update
var update = function(modifier){
	if(38 in keysDown){//up
		hero.y -= hero.speed * modifier;
	}
	if(40 in keysDown){//down
		hero.y += hero.speed * modifier;
	}
	if(37 in keysDown){//left
		hero.x -= hero.speed * modifier;
	}
	if(39 in keysDown){//right
		hero.x += hero.speed * modifier;
	}

	if(hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32) 
		&& hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)){
		mosCaught++;
		reset();
	}
};

//render
var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
	}
	if(heroReady){
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if(mosReady){
		ctx.drawImage(mosImage, monster.x, monster.y);
	}

	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseLine = "top";
	ctx.fillText("Monster Caught: " + mosCaught, 32, 32);
};

//main func
var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


//start
var then = Date.now();
reset();
main();
// setInterval(main, 16);