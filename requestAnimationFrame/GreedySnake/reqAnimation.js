/*
* Implement by requestAnimationFrame
*/

var WIDTH = 400, HEIGHT = 300, SIZE = 10;
var score = 0;
var canvas = $("canvas");
var context = canvas.getContext("2d");

function Pos(x, y){
	this.x = x;
	this.y = y;
}
var snakeBody = [new Pos(10, 10),
				new Pos(20, 10),
				new Pos(30, 10),
				new Pos(40, 10),
				new Pos(50, 10),
				new Pos(60, 10)];

var stop = true;

requestAnimationFrame = window.requestAnimationFrame 
					|| window.webkitRequestAnimationFrame 
					|| window.msRequestAnimationFrame 
					|| window.mozRequestAnimationFrame;
cancelRequestAnimationFrame = window.cancelRequestAnimationFrame 
					|| window.cancelAnimationFrame
					|| window.webkitCancelRequestAnimationFrame
					|| window.msCancelRequestAnimationFrame
					|| window.mozCancelRequestAnimationFrame;

var food = {
	x: 100,
	y: 10
};
var snake = {
	x: 60,//snake head pos
	y: 10,
	len: 6,
	dir: 2//0|left, 1|up, 2|right, 3|down
};

function randomFood(){
	var x = parseInt(Math.random() * (WIDTH / SIZE)) * 10;
	var y = parseInt(Math.random() * (HEIGHT / SIZE)) * 10;
	//food position can't be within snake's body
	for(var i = 0; i < snakeBody.length; i++){
		if(snakeBody[i].x == x && snakeBody[i].y == y){
			return randomFood();
		}
	}
	food.x = x;
	food.y = y;
}

function move(){
	switch(snake.dir){
		case 0:
			snake.x -= SIZE;
			break;
		case 1:
			snake.y -= SIZE;
			break;
		case 2:
			snake.x += SIZE;
			break;
		case 3:
			snake.y += SIZE;
	}
	//bound
	if(snake.x >= WIDTH || snake.x < 0 || snake.y >= HEIGHT || snake.y < 0){
		stop = true;
		return;
	}
	//can't struck itself
	for(var i = 0; i < snakeBody.length; i++){
		if(snakeBody[i].x == snake.x && snakeBody[i].y == snake.y){
			stop = true;
			return;
		}
	}

	if(snake.x == food.x && snake.y == food.y){
		snakeBody.push(new Pos(food.x, food.y));
		score++;
		snake.len++;
		randomFood();
		return;
	}else{
		var tail = snakeBody.shift();
		snakeBody.push(new Pos(snake.x, snake.y));
	}
}

function drawSnake(){
	context.save();
	context.fillStyle = "#006699";
	for(var i = 0; i < snakeBody.length; i++){
		context.fillRect(snakeBody[i].x, snakeBody[i].y, SIZE, SIZE);
	}
	context.restore();
}

function drawFood(){
	context.save();
	context.fillStyle = "#000";
	context.fillRect(food.x, food.y, SIZE, SIZE);
	context.restore();
}

var select = $("level");
addEvent(document, "keydown", function(e){
	var dir = {37: 0, 38: 1, 39: 2, 40: 3}[e.keyCode];
	if(dir != undefined){
		changeDir(dir);
	}else if(e.keyCode == 32){
		if(stop == false) {
			cancelAnimationFrame(timer);
			stop = true;
			select.removeAttribute("disabled");
		}
		else {
			timer = requestAnimationFrame(main);
			stop = false;
			select.setAttribute("disabled", "disabled");
		}
	}
	function changeDir(num){
		var dirHandle = {0: 2, 1: 3, 2: 0, 3: 1}[num];
		if(snake.dir != dirHandle && dirHandle != undefined) snake.dir = num;
	}
});

var level = 5;
addEvent($("level"), "change", function(){
	level = this.value;
	this.blur();
});

function init(){

	if(navigator.userAgent.match(/Mobile/)){
		WIDTH = document.body.clientWidth;
		HEIGHT = document.body.clientHeight;

		var div = $("wrap");
		div.innerHTML = "<button type='button' id='start' class='btn' style='background-color: purple'>start</button>"
		 + "<button type='button' id='up' class='btn'>&uarr;</button>"
		 + "<button type='button' id='left' class='btn'>&larr;</button>" 
		 + "<button type='button' id='right' class='btn'>&rarr;</button>"
		 + "<button type='button' id='down' class='btn'>&darr;</button>";

		addEvent($("up"), "click", function(){
			changeDir(1);
		})
		addEvent($("down"), "click", function(){
			changeDir(3);
		})
		addEvent($("left"), "click", function(){
			changeDir(0);
		})
		addEvent($("right"), "click", function(){
			changeDir(2);
		})
		addEvent($("start"), "click", function(){
			if(stop == true){
				timer = requestAnimationFrame(main);
				stop = false;
				this.innerHTML = "stop";
			}else if(stop == false){
				cancelAnimationFrame(timer);
				stop = true;
				this.innerHTML = "start";
			}
		})
		function changeDir(num){
			var dirHandle = {0: 2, 1: 3, 2: 0, 3: 1}[num];
			if(snake.dir != dirHandle && dirHandle != undefined) snake.dir = num;
		}
	}

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	context.clearRect(0, 0, WIDTH, HEIGHT);
	drawSnake();
	drawFood();
	var maxScore = localStorage.getItem("maxScore");
	if(maxScore != undefined) $("maxScore").innerHTML = maxScore;
}

var cot = 0;
var timer;
var main = function(){
	cot++;

	if(cot % level == 0){
		move();
	}
	context.clearRect(0, 0, WIDTH, HEIGHT);
	drawSnake();
	drawFood();
	if(stop){
		cancelRequestAnimationFrame(timer);
		var flag = confirm("游戏结束： " + score + "分\n\n重新开始？");
		if(flag) {
			var maxScore = localStorage.getItem("maxScore");
			maxScore = Math.max(score, maxScore);
			localStorage.setItem("maxScore", maxScore);
			window.location.reload();
		}
		else return;
	}else{
		timer = requestAnimationFrame(main);
	}
}

init();