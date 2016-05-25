var WIDTH = 400, HEIGHT = 300, SIZE = 10;
var score = 0;
var canvas = $("canvas");
var context = canvas.getContext("2d");
var timer;
var map = [];
var flag = false;

function Food(){
	this.x = 0,
	this.y = 0
};
Food.prototype.randomPos = function(){
	var x = parseInt(Math.random() * (WIDTH / SIZE)) * 10;
	var y = parseInt(Math.random() * (HEIGHT / SIZE)) * 10;
	//food position can't be within snake's body
	for(var i = 0; i < map.length; i++){
		if(map[i].x == x && map[i].y == y){
			return this.randomPos();
		}
	}
	this.x = x;
	this.y = y;
	context.fillStyle = "#000";
	context.fillRect(this.x, this.y, SIZE, SIZE);
}

function Snake(){
	this.food = new Food();
}
Snake.prototype.init = function(){
	this.x = 100;
	this.y = 10;
	map = [];
	this.len = 10;
	this.dir = 39;//37|left, 38|up, 39|right, 40|down
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = "#006699";
	context.fillRect(10, 10, this.x, this.y);
	this.fillMap();
	clearInterval(timer);
	$("btn").innerHTML = "start";
	this.food.randomPos();
}
Snake.prototype.fillMap = function(){
	map = [];
	for(var i = SIZE; i <= this.x; i+= SIZE){
		map.push({'x': i, 'y': SIZE});
	}
}
Snake.prototype.move = function(){
	switch(this.dir){
		case 37:
			this.x -= SIZE;
			break;
		case 38:
			this.y -= SIZE;
			break;
		case 39:
			this.x += SIZE;
			break;
		case 40:
			this.y += SIZE;
	}
	//bound
	if(this.x >= WIDTH || this.x < 0 || this.y >= HEIGHT || this.y < 0){
		alert("游戏结束： " + score + "分 撞到墙啦~");
		this.init();
		return;
	}
	//can't struck itself
	for(var i = 0; i < map.length; i++){
		if(map[i].x == this.x && map[i].y == this.y){
			alert("游戏结束： " + score + "分 撞到自己啦~");
			this.init();
			return;
		}
	}
	//snake move forward and fill its head
	map.push({'x': this.x, 'y': this.y});
	context.fillStyle = "#006699";
	context.fillRect(this.x, this.y, SIZE, SIZE);
	//delete and clear its tail if length exceeds
	if(map.length > this.len){
		var delPos = map.shift();
		context.clearRect(delPos.x, delPos.y, SIZE, SIZE);
	}
	//eat food?
	if(this.x == this.food.x && this.y == this.food.y){
		this.food.randomPos();
		this.len++;
		score++;
	}
}


function init(){
	snake = new Snake();
	snake.init();

	var num;
	addEvent($("up"), "click", function(){
		num = 38;
		changeDir(num);
	})
	addEvent($("down"), "click", function(){
		num = 40;
		changeDir(num);
	})
	addEvent($("left"), "click", function(){
		num = 37;
		changeDir(num);
	})
	addEvent($("right"), "click", function(){
		num = 39;
		changeDir(num);
	})
	addEvent(document, "keydown", function(e){
		if(e.keyCode == 32){
			if(flag == true) {
				flag = false;
				clearInterval(timer);
				return;
			}else if(flag == false){
				flag = true;
				timer = setInterval(function(){
					snake.move();
				}, 100);
			}
		}
		num = e.keyCode;
		changeDir(num);
	});

	addEvent($("btn"), "click", function(){
		if(flag == true){
			flag = false;
			clearInterval(timer);
			this.innerHTML = "start";
		}else if(flag == false){
			flag = true;
			timer = setInterval(function(){
				snake.move();
			}, 100);
			this.innerHTML = "stop";
		}
	});
	function changeDir(num){
		var dir = {37:39, 38:40, 39:37, 40:38}[num];
		if(this.snake.dir != dir && dir != undefined) this.snake.dir = num;
	}
}

window.onload = init;
