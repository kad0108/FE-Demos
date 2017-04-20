function $(ele){
	return document.querySelectorAll(ele);
}

var $ul = $("#list")[0];
var $lists = $('#list li');
var $volume = $('#volume')[0];
var $box = $('#box')[0];
var $types = $('#type')[0];



$volume.onchange = function(){
	changeVolume(this.value/this.max);
}

function clearSelected(eles){
	eles.childNodes.forEach((item) => {
		if(item.nodeName !== '#text') item.classList.remove('selected');
	})
}

$ul.addEventListener('click', function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	if(target !== e.currentTarget){
		clearSelected(this);
		target.classList.add('selected');
	}
	load('/media/' + target.title);
})
$types.addEventListener('click', function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	if(target !== e.currentTarget){
		clearSelected(this);
		target.classList.add('selected');
		draw.type = target.dataset.type;
	}

})

var xhr = new XMLHttpRequest();
var ac = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = ac[ac.createGain ? 'createGain' : 'createGainNode']();
gainNode.connect(ac.destination);

var analyser = ac.createAnalyser();
var size = 128; // 实际数据长度
analyser.fftSize = size*2;
analyser.connect(gainNode);

var source = null; // 记录上一首音频资源
var cot = 0; // 记录已经请求的音频资源的数目

function load(url){
	var tmp = ++cot;
	// 当已经有一首在播放时又点击了一首歌，应该让前一首歌停止播放
	source && source[source.stop ? 'stop' : 'noteOff']();
	// 终止上一次请求
	xhr.abort();
	xhr.open('GET', url);
	xhr.responseType = "arraybuffer";
	xhr.onload = function(){
		// 在前一首歌还没加载完成的时候又点击了一首歌，发现两首歌会重叠播放，比较本次的tmp和全局的cot
		if(tmp != cot) return;
		// xhr.response拿到的是一个ArrayBuffer对象
		ac.decodeAudioData(xhr.response).then(function(buffer){
			if(tmp != cot) return;
			// 解码成功，创建bufferSourceNode对象
			var bufferSource = ac.createBufferSource();
			// 定义音频资源
			bufferSource.buffer = buffer;
			// 将节点连接到destination上
			// bufferSource.connect(ac.destination);
			// bufferSource.connect(gainNode);
			bufferSource.connect(analyser);
			// 播放
			bufferSource[bufferSource.start ? 'start' : 'noteOn'](0);
			source = bufferSource;

			

		}, function(err){
			console.log(err);
		})
	}
	xhr.send();
}



function changeVolume(percent){
	gainNode.gain.value = percent * percent;
}


var height, width;
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
$box.appendChild(canvas);


var dots = [];
function random(m, n){
	return Math.round(Math.random() *(n-m) + m);
}
function getDots(){
	dots = [];
	for(var i = 0; i < size; i++){
		var x = random(0, width);
		var y = random(0, height);
		var color = "rgb("+ random(0, 255) + "," + random(0, 255) + "," + random(0, 255) +")";
		dots.push({
			x: x,
			y: y,
			color: color
		});
	}
}

var line;
function resize(){
	height = $box.clientHeight;
	width = $box.clientWidth;
	canvas.width = width;
	canvas.height = height;
	line = context.createLinearGradient(0, 0, 0, height);
	line.addColorStop(0, "red");
	line.addColorStop(0.5, "yellow");
	line.addColorStop(1, "green");
	

	getDots();
}
resize();

window.onresize = resize;



// function visualizer(){
// 	console.log(dots);
// 	var arr = new Uint8Array(analyser.frequencyBinCount);
	
// 	requestAnimationFrame = window.requestAnimationFrame ||
// 							window.webkitRequestAnimationFrame || 
// 							window.mozRequestAnimationFrame;
// 	function v(){
// 		// 把拿到的音频分析数据复制到arr中
// 		analyser.getByteFrequencyData(arr);
// 		draw(arr);
// 		requestAnimationFrame(v);
// 	}
// 	requestAnimationFrame(v);
// }
// visualizer();

var arr = new Uint8Array(analyser.frequencyBinCount);

requestAnimationFrame = window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame || 
						window.mozRequestAnimationFrame;
function v(){
	// console.log(dots);
	// 把拿到的音频分析数据复制到arr中
	analyser.getByteFrequencyData(arr);
	draw(arr);
	requestAnimationFrame(v);
}
v();

draw.type = 'col';
function draw(arr){
	context.clearRect(0, 0, width, height);
	var w = width / size;
	context.fillStyle = line;
	for(var i = 0; i < size; i++){
		context.save();
		if(draw.type == 'col'){
			var h = arr[i] / 256 * height; // arr值最大是256，换算成柱形应该绘制的高度
			context.fillRect(w * i, height - h, w*0.6, h);
		}else{
			context.beginPath();
			var dot = dots[i];
			var r = arr[i] / 256 * 50;
			context.arc(dot.x, dot.y, r, 0, Math.PI * 2, true);
			var g = context.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r);
			g.addColorStop(0, "#fff");
			g.addColorStop(1, dot.color);
			context.fillStyle = g;
			context.fill();
			// context.strokeStyle = "#fff";
			// context.stroke();
			context.closePath();
		}
		context.restore();
	}
}


