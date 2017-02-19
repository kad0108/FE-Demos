(function(){
	const WIDTH = Math.min(600, window.innerWidth-20);
	const HEIGHT = WIDTH;

	var controller = document.getElementById('controller');
	controller.style.width = WIDTH + 'px';
	controller.addEventListener('click', function(e){
		var target = e.target;
		if(target && target.tagName === 'button'.toUpperCase()){
			if(target.className.indexOf('color_btn') != -1){
				clearSelected();
				target.classList.add('selected');
				strokeColor = getStyle(target).backgroundColor;
			}else if(target.className.indexOf('clear_btn') != -1){
				context.clearRect(0, 0, WIDTH, HEIGHT);
				drawGrid();
			}
		}

		function clearSelected(){
			var nodes = document.getElementsByClassName('color_btn');
			[].forEach.call(nodes, function(item){//nodes不是数组
				item.classList.remove('selected');
			})
		}
		function getStyle(obj){
		    return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
		}
	})

	var isMouseDown = false;
	var lastLoc = {x: 0, y: 0};
	var lastTimeStamp = 0;//运笔速度与线条粗细
	var lastWidth = -1;//线条粗细平滑过渡
	var strokeColor = 'black';
	var firstDraw = true;//性能考虑，应该是在下笔时moveTo，在连续画线时lineTo即可

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	drawGrid();

	canvas.onmousedown = function(e){
		e.preventDefault();//阻止默认事件响应
		beginStroke({x: e.clientX, y: e.clientY});
	}
	canvas.onmouseup = function(e){
		e.preventDefault();
		endStroke();
	}
	canvas.onmouseout = function(e){//移出canvas
		e.preventDefault();
		endStroke();
	}
	canvas.onmousemove = function(e){
		e.preventDefault();
		moveStroke({x: e.clientX, y: e.clientY});
	}

	canvas.addEventListener('touchstart', function(e){
		e.preventDefault();
		var touch = e.touches[0];//多点触控
		beginStroke({x: touch.clientX, y: touch.clientY});
	})
	canvas.addEventListener('touchmove', function(e){
		e.preventDefault();
		var touch = e.touches[0];
		moveStroke({x: touch.clientX, y: touch.clientY});
	})
	canvas.addEventListener('touchend', function(e){
		e.preventDefault();
		endStroke()
	})





	function drawGrid(){
		context.save();//保存canvas状态

		context.strokeStyle = 'rgb(230, 11, 9)';
		//绘制边框
		context.beginPath();
		context.moveTo(3,3);
		context.lineTo(WIDTH-3, 3);
		context.lineTo(WIDTH-3, HEIGHT-3);
		context.lineTo(3, HEIGHT-3);
		context.closePath();

		context.lineWidth = 6;
		context.stroke();

		//绘制米字格
		context.beginPath();

		context.setLineDash([5, 10]);//[a,b]a是虚线线段长度，b是间隔长度

		context.moveTo(0,0);
		context.lineTo(WIDTH, HEIGHT);

		context.moveTo(WIDTH, 0);
		context.lineTo(0, HEIGHT);

		context.moveTo(WIDTH/2, 0);
		context.lineTo(WIDTH/2, HEIGHT);

		context.moveTo(0, HEIGHT/2);
		context.lineTo(WIDTH, HEIGHT/2);

		context.lineWidth = 1;
		context.stroke();

		context.restore();//恢复之前的状态
	}
	function beginStroke(point){
		isMouseDown = true;
		lastLoc = getCanvasCoordinate(point.x, point.y);
		lastTimeStamp = new Date().getTime();

		context.beginPath();
		context.strokeStyle = strokeColor;
		context.lineCap = 'round';//线条末端线帽样式
		context.lineJoin = 'round';//线条交汇处创建圆形边角
	}
	function endStroke(){
		isMouseDown = false;
		firstDraw = true;
	}
	function moveStroke(point){
		if(isMouseDown){
			var curLoc = getCanvasCoordinate(point.x, point.y);
			
			var curTimeStamp = new Date().getTime();
			var s = calDistance(curLoc, lastLoc);
			var lineWidth = calLineWidth(s, curTimeStamp - lastTimeStamp);

			if(firstDraw){
				context.moveTo(lastLoc.x, lastLoc.y);
				firstDraw = false;	
			}
			
			context.lineTo(curLoc.x, curLoc.y);
			context.lineWidth = lineWidth;
			context.stroke();
			lastLoc = curLoc;
			lastTimeStamp = curTimeStamp;
			lastWidth = lineWidth;
		}
	}
	function getCanvasCoordinate(x, y){
		var box = canvas.getBoundingClientRect();
		return {
			x: Math.round(x-box.left),
			y: Math.round(y-box.top)
		};
	}

	function calDistance(loc1, loc2){
		 return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y));
	}
	function calLineWidth(s, t){
		var v = s/t;
		var resLineWidth;
		if(v <= 0.1) resLineWidth = 30;
		else if(v >= 10) resLineWidth = 1;
		else resLineWidth = 30-(v-0.1)/(10-0.1)*(30-1);

		if(lastWidth == -1) return resLineWidth;
		return lastWidth*2/3 + resLineWidth*1/3;//平滑过渡
	}

})();