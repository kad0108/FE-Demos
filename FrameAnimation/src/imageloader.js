'use strict';

/*
* 预加载图片函数
* @param images 加载图片的数组或者对象
* @param callback 全部图片加载完毕后调用的回调函数
* @param timeout 加载超时的时长
*/
function loadImage(images, callback, timeout){
	var count = 0;//加载完成图片的计数器
	var success = true;//全部图片加载成功的标志位
	var timeoutId = 0;//超时timer的id
	var isTimeout = false;//是否加载超时的标志位

	for(var key in images){
		//过滤prototype上的属性，此方法无法检查该对象的原型链中是否具有该属性
		if(!images.hasOwnProperty(key)){
			continue;
		}
		//获得每个图片元素，期望格式是object:{src:xxx}
		var item = images[key];
		//js中推荐用全等，比较时不会作类型转换
		if(typeof item === 'string'){
			item = images[key] = {
				src: item
			}; 
		}
		if(!item || !item.src){
			continue;
		}
		count++;
		item.id = '__img__' + key + getId(); //设置图片元素id
		item.img = window[item.id] = new Image();

		doLoad(item);
	}
	if(!count){
		callback(success);
	}else if(timeout){
		timeoutId = setTimeout(onTimeout, timeout);
	}
	/*
	* 真正进行图片加载的函数
	* @param item 图片元素对象
	*/
	function doLoad(item){
		item.status = 'loading';
		var img = item.img;
		img.onload = function(){
			success = success & true;
			item.status = 'loaded';
			done();
		};
		img.onerror = function(){
			success = false;
			item.status = 'error';
			done();
		};
		img.src = item.src;//发起一个http(s)的请求
		/*
		* 每张图片加载完成的回调函数
		*/
		function done(){
			img.onload = img.onerror = null;//清理事件
			try{
				delete window[item.id];
			}catch(e) {

			}
			//每次加载完成一个图片count--，当所有图片加载完成且没有超时，就清除超时函数，调用回调函数
			if(!--count && !isTimeout){
				clearTimeout(timeoutId);
				callback(success);
			}
		}
	}
	/* 
	* 超时函数
	*/
	function onTimeout(){
		isTimeout = true;
		callback(false);
	}
}

var __id = 0;
function getId(){
	return ++__id;
}
module.exports = loadImage;