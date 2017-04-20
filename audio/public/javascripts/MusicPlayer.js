/**
* 音乐播放器
* @param {Object} obj 传递属性
*/
function MusicPlayer(obj){
	this.source = null; // 当前正在播放的buffersource
	this.cot = 0; // 点击次数
	this.analyser = MusicPlayer.ac.createAnalyser(); // 分析音频频域时域
	this.size = obj.size; // 实时音频频域个数
	this.analyser.fftSize = this.size * 2;
	this.gainNode = MusicPlayer.ac[MusicPlayer.ac.createGain ? 'createGain' : 'createGainNode']();
	this.gainNode.connect(MusicPlayer.ac.destination);
	this.analyser.connect(this.gainNode);

	this.xhr = new XMLHttpRequest();
	
	this.type = 'col';

	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	this.$box = obj.$box;
	this.$box.appendChild(this.canvas);

	this.dots = [];

	this.resize();
	this.visualize();
}

MusicPlayer.ac = new (window.AudioContext || window.webkitAudioContext)();
/**
* Ajax异步加载音频资源
* @param {String} url 音频路径
* @param {Function} callback 异步加载资源后的回调函数
*/
MusicPlayer.prototype.load = function(url, callback){
	this.xhr.abort();
	this.xhr.open("GET", url);
	this.xhr.responseType = "arraybuffer";
	this.xhr.onload = () => {
		callback(this.xhr.response);
	}
	this.xhr.send();
}
/**
* 调整窗口大小变化时的操作
*/
MusicPlayer.prototype.resize = function(){
	this.height = this.$box.clientHeight;
	this.width = this.$box.clientWidth;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	// 柱图渐变色
	this.line = this.context.createLinearGradient(0, 0, 0, this.height);
	this.line.addColorStop(0, "red");
	this.line.addColorStop(0.5, "yellow");
	this.line.addColorStop(1, "green");

	this.getDots();
}
/**
* 初始化随机点
*/
MusicPlayer.prototype.getDots = function(){
	this.dots = [];
	for(var i = 0; i < this.size; i++){
		var x = random(0, this.width);
		var y = random(0, this.height);
		var color = "rgba("+ random(0, 255) + "," + random(0, 255) + "," + random(0, 255) +",0)";
		this.dots.push({
			x: x,
			y: y,
			dx: random(1, 4),
			color: color,
			cap: 0
		});
	}

	function random(m, n){
		return Math.round(Math.random() *(n-m) + m);
	}
}
/**
* 解码音频资源
* @param {ArrayBuffer} arraybuffer ajax请求到的音频资源arraybuffer对象
* @param {Function} callback 解码后的回调函数
*/
MusicPlayer.prototype.decode = function(arraybuffer, callback){
	MusicPlayer.ac.decodeAudioData(arraybuffer).then(function(buffer){
		callback(buffer);
	}, function(err){
		console.log(err);
	})
}
/**
* 播放音频
* @param {String} url 音频路径
*/
MusicPlayer.prototype.play = function(url){
	var n = ++this.cot; // 每次播放时计数，用于切换歌曲时区别
	this.source && this.stop();
	this.load(url, (arraybuffer) => {
		if(n != this.cot) return;
		this.decode(arraybuffer, (buffer) => {
			if(n != this.cot) return;
			var bufferSource = MusicPlayer.ac.createBufferSource();
			bufferSource.buffer = buffer;
			bufferSource.connect(this.analyser);
			bufferSource[bufferSource.start ? 'start' : 'noteOn'](0);
			this.source = bufferSource;
		});
	});
}
/**
* 停止播放音频
*/
MusicPlayer.prototype.stop = function(){
	this.source[this.source.stop ? 'stop' : 'noteOff']();
}
/**
* 调整音频音量
*/
MusicPlayer.prototype.changeVolume = function(percent){
	this.gainNode.gain.value = percent * percent;
}
/**
* 音频可视化
*/
MusicPlayer.prototype.visualize = function(){
	this.arr = new Uint8Array(this.analyser.frequencyBinCount);
	this.assistloop();
}
/**
* 音频可视化辅助方法
*/
MusicPlayer.prototype.assistloop = function(){
	this.analyser.getByteFrequencyData(this.arr);
	this.draw();
	requestAnimationFrame(this.assistloop.bind(this));
}
/**
* canvas绘制柱图和点图
*/
MusicPlayer.prototype.draw = function(){
	this.context.clearRect(0, 0, this.width, this.height);
	var w = this.width / this.size;
	var caph = w * 0.6;
	this.context.fillStyle = this.line;
	for(var i = 0; i < this.size; i++){
		this.context.save();
		var dot = this.dots[i];
		if(this.type == 'col'){
			var h = this.arr[i] / 256 * this.height; // arr值最大是256，换算成柱形应该绘制的高度
			this.context.fillRect(w * i, this.height - h, w*0.6, h);
			this.context.fillRect(w * i, this.height - dot.cap - caph, w*0.6, caph);
			dot.cap--;
			dot.cap = dot.cap < 0 ? 0 : dot.cap;
			dot.cap = (h > 0 && dot.cap < h+40) ? dot.cap = (h+40 > this.height-caph ? this.height-caph : h+40) : dot.cap;
		}else{
			this.context.beginPath();
			var r = this.arr[i] / 256 * (this.height > this.width ? this.width : this.height)/10 + 10;
			this.context.arc(dot.x, dot.y, r, 0, Math.PI * 2, true);
			var g = this.context.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, r);
			g.addColorStop(0, "#fff");
			g.addColorStop(1, dot.color);
			this.context.fillStyle = g;
			this.context.fill();
			dot.x += dot.dx;
			dot.x = dot.x > this.width ? 0 : dot.x;
			this.context.closePath();
		}
		this.context.restore();
	}
}