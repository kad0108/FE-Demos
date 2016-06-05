var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var mousePos = [0, 0];

var nodes = [];//存储粒子
var edges = [];//存储边

var easingFactor = 5.0;//缓动因子
var backgroundColor = "#000";
var nodeColor = "#fff";
var edgeColor = "#fff";

window.onresize = function(){
	canvas.width = document.body.clientWidth;
	canvas.height = canvas.clientHeight;

	if(nodes.length == 0){
		constructNodes();
	}
	render();
};
window.onresize();

function constructNodes(){
	/*
	* 构建粒子点
	*/
	for(var i = 0; i < 100; i++){
		var node = {
			drivenByMouse: i == 0,  //给第一个点添加此属性，这个点不绘制，而是随鼠标移动与其他点连线
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: Math.random() - 0.5,
			vy: Math.random() - 0.5,
			radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3
		};
		if(node.x >= canvas.width) console.log(node.x, node.y);
		nodes.push(node);
	}
	/*
	* 构建点与点之间的连线
	*/
	nodes.forEach(function(i){
		nodes.forEach(function(j){
			if(i != j) {
				var edge = {
					from: i,
					to: j
				};
				addEdge(edge);
			}
		});
	});
}

function addEdge(edge){
	/*
 	* 对于边a-b和边b-a其实是相同的，不需要多余存储
	*/
	var ignore = false;
	edges.forEach(function(e){
		if((e.from == edge.from && e.to == edge.to)
			|| (e.to == edge.from && e.from == edge.to)) 
			ignore = true;
	});
	if(!ignore){
		edges.push(edge);
	}
}
/*
* 让粒子动起来，遍历粒子，更新其状态
*/
function step(){
	nodes.forEach(function(node){
		if(node.drivenByMouse) return;

		node.x += node.vx;
		node.y += node.vy;

		if((node.x - node.radius) <= 0 || (node.x + node.radius) >= canvas.width){
			node.vx = -node.vx;
			node.x = bound(0, canvas.width, node.x);
		}
		if((node.y - node.radius) <= 0 || (node.y + node.radius) >= canvas.height){
			node.vy = -node.vy;
			node.y = bound(0, canvas.height, node.y);
		}
	});

	adjustNodeDrivenByMouse();
	render();
	window.requestAnimationFrame(step);

}
/*
* 鼠标跟随效果
* 让第一个点的位置一点一点移动到鼠标的位置
* 公式 x = x + (t - x)/factor 实现缓动
* 其中 factor是缓动因子，t是最终位置，x是当前位置。
*/
function adjustNodeDrivenByMouse(){
	nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor;
	nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor;
}

function bound(min, max, val){
	if(val >= max) return max;
	if(val <= min) return min;
	return val;
}

function lengthOfEdge(edge){
	return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));
}

function render(){
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	edges.forEach(function(e){
		var l = lengthOfEdge(e);
		var threshold = canvas.width / 8;
		if(l > threshold) return;

		ctx.strokeStyle = edgeColor;
		ctx.lineWidth = (1.0 - l / threshold) * 2.5;
		ctx.globalAlpha = 1.0 - l / threshold;
		ctx.beginPath();
		ctx.moveTo(e.from.x, e.from.y);
		ctx.lineTo(e.to.x, e.to.y);
		ctx.stroke();
	});
	ctx.globalAlpha = 1.0;

	nodes.forEach(function(node){
		if(node.drivenByMouse) return;
		ctx.fillStyle = nodeColor;
		ctx.beginPath();
		ctx.arc(node.x, node.y, node.radius, 0.2 * Math.PI, anticlock=false);
		ctx.fill();
	});
}


window.onmousemove = function(e){
	mousePos[0] = e.clientX;
	mousePos[1] = e.clientY;
}


window.requestAnimationFrame(step);



