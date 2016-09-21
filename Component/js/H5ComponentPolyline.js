/* 柱图组件对象 */
var H5ComponentPolyline = function(name, cfg){
	var component = new H5ComponentBase(name, cfg);
	//绘制网格线
	var w = cfg.width;
	var h = cfg.height;
	//网格线背景 - 背景层
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = context.width = w;
	canvas.height = context.height = h;

	component.append(canvas);

	//水平网格线 10份
	var step = 10;
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = '#aaa';
	window.context = context;
	for(var i = 0; i < step+1; i++){
		var y = (h/step) * i;
		context.moveTo(0, y);
		context.lineTo(w, y);
	}
	//垂直网格线 根据项目个数划分
	step = cfg.data.length+1;
	for(var i = 0; i < step+1; i++){
		var x = (w/step) * i;
		context.moveTo(x, 0);
		context.lineTo(x, h);
		if(cfg.data[i]){
			var text = $('<div class="text">');
			text.text(cfg.data[i][0]);
			var text_w = w/step >> 0;
			text.css('width', text_w/2).css('left', x/2 + text_w/4);
			component.append(text);
		}
	}
	context.stroke();

	//绘制折线数据 - 数据层
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = context.width = w;
	canvas.height = context.height = h;
	component.append(canvas);

	/**
	* 绘制折线及对应的数据和阴影
	* @param {float} per 0~1之间的数据，根据这个值绘制中间状态，实现动画生长效果
	* @return {DOM} 
	**/
	var draw = function(per){
		//清空画布
		context.clearRect(0, 0, w, h);

		context.beginPath();
		context.lineWidth = 3;
		context.strokeStyle = '#ff8878';
		//画点
		var x = 0, y = 0;
		var row_w = w/(cfg.data.length+1);
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h - item[1] * h * per;
			context.moveTo(x, y);
			context.arc(x, y, 5, 0, 2*Math.PI);
		}
		//移动画笔到第一个数据的点位置
		context.moveTo(row_w, h - cfg.data[0][1] * h * per);
		//连线
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h - item[1] * h * per;
			context.lineTo(x, y);
		}
		context.stroke();
		//绘制阴影
		context.lineWidth = 1;
		context.strokeStyle = 'rgba(255, 255, 255, 0)';
		context.lineTo(x, h);
		context.lineTo(row_w, h);
		context.fillStyle = "rgba(255, 136, 120, 0.2)";
		context.fill();
		//写数据
		for(i in cfg.data){
			var item = cfg.data[i];
			x = row_w * i + row_w;
			y = h - item[1] * h * per;
			context.fillStyle = item[2] ? item[2] : '#595959';
			context.fillText(item[1]*100 + '%', x-10, y-10);
		}

		context.stroke();
	}
	component.on('onLoad', function(){
		//折线图生长动画
		var s = 0;
		for(var i = 0; i < 100; i++){
			setTimeout(function(){
				s += 0.01;
				draw(s);
			}, i * 10 + 500);
		}
	})
	component.on('onLeave', function(){
		//折线图退场动画
		var s = 1;
		for(i = 0; i < 100; i++){
			setTimeout(function(){
				s -= 0.01;
				draw(s);
			}, i * 10);
		}
	})

	return component;
}