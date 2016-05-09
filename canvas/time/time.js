var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIAN_LEFT = 60;
var MARGIAN_TOP = 30;

var balls = [];
var curTime = {
	year: 0,
	month: 0,
	day: 0,
	week: 0,
	hour: 0,
	minute: 0,
	second: 0,
	misecond: 0
};
var timer;

window.onload = function(){
	// console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
	// console.log(document.body.clientWidth, document.body.clientHeight);
	// console.log(document.body.offsetWidth, document.body.offsetHeight);
	// console.log(document.body.scrollWidth, document.body.scrollHeight);
	
	WINDOW_WIDTH = document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	MARGIAN_LEFT = Math.floor(WINDOW_WIDTH/10);
	RADIUS = Math.floor(WINDOW_WIDTH * 4 / 5 / 108) - 1;
	MARGIAN_TOP = Math.floor(WINDOW_HEIGHT/5);

	var canvas = $("canvas");
	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	var context = canvas.getContext("2d");
	var count = 0;
	timer = setInterval(function(){
		if(count != 0){
			initBalls();
		}
		render(context);
		updateBallsMove();
		count++;
	}, 50);
	addEvent($("btn"), "click", function(){
		clearInterval(timer);
	});
}

//render time and balls
function render(context){
	context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);//clear canvas's content

	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var week = date.getDay();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var misecond = date.getMilliseconds();

	curTime.year = year;
	curTime.month = month;
	curTime.day = day;
	curTime.week = week;
	curTime.hour = hour;
	curTime.minute = minute;
	curTime.second = second;

	renderDigit(MARGIAN_LEFT, MARGIAN_TOP, parseInt(hour/10), context);
	renderDigit(MARGIAN_LEFT + 15*(RADIUS+1), MARGIAN_TOP, parseInt(hour%10), context);
	renderDigit(MARGIAN_LEFT + 30*(RADIUS+1), MARGIAN_TOP, 10, context);
	renderDigit(MARGIAN_LEFT + 39*(RADIUS+1), MARGIAN_TOP, parseInt(minute/10), context);
	renderDigit(MARGIAN_LEFT + 54*(RADIUS+1), MARGIAN_TOP, parseInt(minute%10), context);
	renderDigit(MARGIAN_LEFT + 69*(RADIUS+1), MARGIAN_TOP, 10, context);
	renderDigit(MARGIAN_LEFT + 78*(RADIUS+1), MARGIAN_TOP, parseInt(second/10%10), context);
	renderDigit(MARGIAN_LEFT + 93*(RADIUS+1), MARGIAN_TOP, parseInt(second%10), context);

	for(var i = 0; i < balls.length; i++){
		context.fillStyle = balls[i].color;
		context.beginPath();
		context.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		context.closePath();
		context.fill();
	}
}

function initBalls(){
	var nextDate = new Date();
	var nexthour = nextDate.getHours();
	var nextminute = nextDate.getMinutes();
	var nextsecond = nextDate.getSeconds();

	if(parseInt(nexthour/10) != parseInt(curTime.hour/10)){
		addBalls(MARGIAN_LEFT + 0*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.hour/10));
	}
	if(parseInt(nexthour%10) != parseInt(curTime.hour%10)){
		addBalls(MARGIAN_LEFT + 15*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.hour%10));
	}
	if(parseInt(nextminute/10) != parseInt(curTime.minute/10)){
		addBalls(MARGIAN_LEFT + 39*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.minute/10));
	}
	if(parseInt(nextminute%10) != parseInt(curTime.minute%10)){
		addBalls(MARGIAN_LEFT + 54*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.minute%10));
	}
	if(parseInt(nextsecond/10%10) != parseInt(curTime.second/10%10)){
		addBalls(MARGIAN_LEFT + 78*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.second/10%10));
	}
	if(parseInt(nextsecond%10) != parseInt(curTime.second%10)){
		addBalls(MARGIAN_LEFT + 93*(RADIUS+1), MARGIAN_TOP, parseInt(curTime.second%10));
	}
}

function addBalls(x, y, num){
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x: x + j*2*(RADIUS+1) + (RADIUS+1),
					y: y + i*2*(RADIUS+1) + (RADIUS+1),
					g: 1.5+Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random()*10)) *4,
					vy: -5,
					color: randomColor()
				};
				balls.push(aBall);
			}
		}
	}
}

function updateBallsMove(){
	for(var i = 0; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = - balls[i].vy*0.75;
		}
	}
	//Optimize in case of balls's length is to large
	var count = 0;
	for(var i = 0; i < balls.length; i++){
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			balls[count++] = balls[i];
		}
	}
	while(balls.length > Math.min(300, count)){
		balls.pop();
	}
}

//render num start with position(x,y)
function renderDigit(x, y, num, context){
	context.fillStyle = "rgb(0, 102, 153)";
	for(var i = 0; i < digit[num].length; i++){
		for(var j = 0; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
				context.beginPath();
				context.arc(x + j*2*(RADIUS+1) + (RADIUS+1), y + i*2*(RADIUS+1) + (RADIUS+1), RADIUS, 0, 2*Math.PI);
				context.closePath();
				context.fill();
			}
		}
	}
}

function randomColor(){
	var color = Math.ceil(Math.random() * 0xffffff).toString(16);
	if(color.length == 6){
		return '#' + color;
	}else{
		return randomColor();
	}
}