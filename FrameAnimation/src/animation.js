/* Created by kad on 16/7/8 */
'use strict';//让js执行在严格模式下，避免一些问题

var loadImage = require('./imageloader');
var Timeline = require('./timeline');

var STATE_INITIAL = 0;//初始化状态
var STATE_START = 1;//开始状态
var STATE_STOP = 2;//停止状态

var TASK_SYNC = 0;//同步任务
var TASK_ASYNC = 1;//异步任务

/*
* 简单的函数封装，执行callback
* @param callback
*/
function next(callback){
	callback && callback();
}

/*
* 帧动画库类
* @constructor
*/
function Animation(){
	this.taskQueue = [];//任务链数组
	this.index = 0;//索引记录当前执行的任务
	this.timeline = new Timeline();
	this.state = STATE_INITIAL;
}
/*
* 添加一个同步任务，去预加载图片
* @param imglist 图片数组
*/
Animation.prototype.loadImage = function(imglist){
	var taskFun = function(next){
		loadImage(imglist.slice(), next);
	};
	var type = TASK_SYNC;
	return this._add(taskFun, type);
};
/*
* 添加一个异步定时任务，通过定时改变图片背景位置，实现帧动画
* @param ele dom对象
* @param positions 背景位置数组
* @param imageUrl 图片地址
*/
Animation.prototype.changePosition = function(ele, positions, imageUrl){
	var len = positions.length;
	var taskFun;
	var type;
	if(len){
		var me = this;
		taskFun = function(next, time){
			if(imageUrl){
				ele.style.backgroundImage = 'url(' + imageUrl + ')';
			}
			//获得当前背景图片位置索引
			var index = Math.min(time/me.interval | 0, len - 1);//或|0相当于Math.floor
			var position = positions[index].split(' ');
			//改变dom对象的背景图片位置
			ele.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
			if(index === len - 1){//这个帧动画做完了
				next();
			}
		};
		type = TASK_ASYNC;
	}else{
		taskFun = next;
		type = TASK_SYNC;
	}
	return this._add(taskFun, type);//添加到任务队列
};
/*
* 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
* @param ele image标签
* @param imglist 图片数组
*/
Animation.prototype.changeSrc = function(ele, imglist){
	var len = imglist.length;
	var taskFun;
	var type;
	if(len){
		var me = this;
		taskFun = function(next, time){
			//获得当前图片索引
			var index = Math.min(time/me.interval|0, len - 1);
			//改变image对象的图片地址
			ele.src = imglist[index];
			if(index === len - 1){
				next();
			}
		};
		type = TASK_ASYNC;
	}else{
		taskFun = next;
		type = TASK_SYNC;
	}
	return this._add(taskFun, type);
};
/*
* 高级用法，添加一个异步定时执行的任务，该任务
* @param taskFun 自定义动画每帧执行的任务函数
*/
Animation.prototype.enterFrame = function(taskFun){
	return this._add(taskFun, TASK_ASYNC);
};
/*
* 添加一个同步任务，可以再上一个任务完成之后执行回调函数
* @param callback 回调函数
*/
Animation.prototype.then = function(callback){
	var taskFun = function(next){
		callback();
		next();
	};
	var type = TASK_SYNC;
	return this._add(taskFun, type);
};
/*
* 开始执行任务
* @param interval 异步定义任务执行的间隔
*/
Animation.prototype.start = function(interval){
	if(this.state === STATE_START){
		return this;
	}
	if(!this.taskQueue.length){
		return this;
	}
	this.state = STATE_START;
	this.interval = interval;
	this._runTask();
	return this;
};
/*
* 添加一个同步任务，该任务回退到上一个任务中，实现重复上一个任务的效果，可以定义重复次数
* @param times 重复次数
*/
Animation.prototype.repeat = function(times){
	var me = this;
	var taskFun = function(){
		if(typeof times === 'undefined'){
			//无限回退到上一个任务
			me.index--;
			me._runTask();
			return;
		}
		if(times){
			times--;
			//回退
			me.index--;
			me._runTask();
		}else{
			//达到重复次数，跳转到下一个任务
			var task = me.taskQueue[me.index];
			me._next(task);
		}
	}
	var type = TASK_SYNC;
	return this._add(taskFun, type);
};
/*
* 添加一个同步任务，相当于repeat更友好的接口，无限循环上一次任务
*/
Animation.prototype.repeatForever = function(){
	return this.repeat();
};
/*
* 设置当前任务执行结束后到下一个任务开始前的等待时间
* @param time 等待时长
*/
Animation.prototype.wait = function(time){
	if(this.taskQueue && this.taskQueue.length > 0){
		this.taskQueue[this.taskQueue.length - 1].wait = time;
	}
	return this;
};
/*
* 暂停当前异步定时任务
*/
Animation.prototype.pause = function(){
	if(this.state === STATE_START){
		this.state = STATE_STOP;
		this.timeline.stop();
		return this;
	}
	return this;
};
/*
* 重新执行上一步暂停的异步任务
*/
Animation.prototype.restart = function(){
	if(this.state === STATE_STOP){
		this.state = STATE_START;
		this.timeline.restart();
		return this;
	}
	return this;
};
/*
* 释放资源
*/
Animation.prototype.dispose = function(){
	if(this.state !== STATE_INITIAL){
		this.state = STATE_INITIAL;
		this.taskQueue = null;
		this.timeline.stop();
		this.timeline = null;
		return this;
	}
	return this;
};
/*
* 添加一个任务到任务队列中
* @param tashFun 任务方法
* @param type 任务类型
* @private 命名规范，类内部使用的方法
*/
Animation.prototype._add = function(taskFun, type){
	this.taskQueue.push({
		taskFun: taskFun,
		type: type
	});
	return this;//链式调用，把这个类的实例传回去
};
/*
* 执行任务
* @private
*/
Animation.prototype._runTask = function(){
	if(!this.taskQueue || this.state !== STATE_START){
		return;
	}
	if(this.index === this.taskQueue.length){//任务执行完毕
		this.dispose();
		return;
	}
	var task = this.taskQueue[this.index];//拿到任务链上当前任务
	if(task.type === TASK_SYNC){
		this._syncTask(task);
	}else{
		this._asyncTask(task);
	}
};
/*
* 同步任务
* @param tash 执行的任务对象
* @private
*/
Animation.prototype._syncTask = function(task){
	var me = this;
	var next = function(){
		//切换到下一个任务
		me._next(task);
	};
	var taskFun = task.taskFun;
	taskFun(next);
};
/*
* 异步任务
* @param tash 执行的任务对象
* @private
*/
Animation.prototype._asyncTask = function(task){
	var me = this;
	//定义每一帧执行的回调函数
	var enterFrame = function(time){
		var taskFun = task.taskFun;
		var next = function(){
			//停止当前任务
			me.timeline.stop();
			//执行下一个任务
			me._next(task);
		};
		taskFun(next, time);
	};
	this.timeline.onenterframe = enterFrame;
	this.timeline.start(this.interval);
}
/*
* 切换到下一个任务,支持如果当前任务需要等待，则延时执行
* @param task 当前任务
* @private 
*/
Animation.prototype._next = function(task){
	this.index++;
	var me = this;
	task.wait ? setTimeout(function(){
		me._runTask();
	}, task.wait) : this._runTask();
};

module.exports = function(){
	return new Animation();
};