function getStyle(obj){
	return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
}
var WIDTH = document.getElementsByTagName('body')[0].offsetWidth;
var HEIGHT = document.getElementsByTagName('body')[0].offsetHeight;
var SLIDE_WIDTH = parseInt(getStyle($("wrap")).width);

var container = $("container");
var buttons = $("buttons").getElementsByTagName("span");
var index = 0;//纵向滚动索引

var slideContainer = document.getElementsByClassName("slideContainer")[0];
var slideIndex = -1;//横向滚动索引

//鼠标滚轮滑动事件
addEvent(document, "mousewheel", function(event){
	if(event.wheelDelta < 0){//↓
		down();
	}else{//↑
		up();
	}
})
//鼠标滚轮滑动事件兼容firefox
addEvent(document, "DOMMouseScroll", function(event){
	if(event.detail > 0){//↓
		down();
	}else{
		up();
	}
})
//按钮切换滑动页
addEvent($("buttons"), "click", function(event){
	var event = event || window.event;
	var target = event.target || event.srcElement;
	if(target && target.tagName === "span".toUpperCase()){
		var myIndex = parseInt(target.dataset.index);
		if(myIndex === index) return;
		clearButton();
		container.style.top = -myIndex * HEIGHT + 'px';
		index = myIndex;
		showButton();
	}
})


function showButton(){
	buttons[index].className = 'on';
}
function clearButton(){
	buttons[index].className = '';
}
function down(){
	if(parseInt(container.style.top) < -HEIGHT * 2) return;
	clearButton();
	index++;
	container.style.top = parseInt(container.style.top) - HEIGHT + 'px';
	showButton();
	if(index === 1) slideIndex = 0;
	else slideIndex = -1;
}
function up(){
	if(parseInt(container.style.top) === 0) return;
	clearButton();
	index--;
	container.style.top = parseInt(container.style.top) + HEIGHT + 'px';
	showButton();
	if(index === 1) slideIndex = 0;
	else slideIndex = -1;
}
function left(){
	slideIndex--;
	if(slideIndex < 0){
		slideIndex = 2;
	}
	slideContainer.style.left = -SLIDE_WIDTH*slideIndex + 'px';
}
function right(){
	slideIndex++;
	if(slideIndex > 2){
		slideIndex = 0;
	}
	slideContainer.style.left = -SLIDE_WIDTH*slideIndex + 'px';
}

//横向滚动向右按钮
addEvent($("next"), "click", function(){
	if(slideIndex !== -1) right();
})
//横向滚动向左按钮
addEvent($("pre"), "click", function(){
	if(slideIndex !== -1) left();
})

var startPos, endPos;
var isScrolling = -1;//纵向滑动1，横向滑动0
addEvent(document, "touchstart", function(event){
	// event.preventDefault();放在这里会导致点击事件失效
	var touch = event.targetTouches[0];//touches数组对象获得屏幕上所有的touch，取第一个touch
	startPos = {
		x: touch.pageX,
		y: touch.pageY,
		time: +new Date
	};
})
addEvent(document, "touchmove", function(event){
	event.preventDefault();
	//当屏幕有多个touch或者页面被缩放过，就不执行move操作
　　if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
　　var touch = event.targetTouches[0];
	endPos = {
		x: touch.pageX - startPos.x,
		y: touch.pageY - startPos.y
	};
	isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0;
})
addEvent(document, "touchend", function(event){
	var duration = +new Date - startPos.time;//滑动持续时间
	if(Number(duration) > 10){
		if(isScrolling === 0 && slideIndex !== -1){//水平滚动
			//判断是左移还是右移，偏移量大于10时执行
			if(endPos.x > 10){
				left();
			}else if(endPos.x < -10){
				right();
			}
		}
		if(isScrolling === 1){//垂直移动
			if(endPos.y > 10){//移动端应该是手指向下滑页面向上滑
				up();
			}else if(endPos.y < -10){
				down();
			}
		}
	}
	endPos.x = 0;
	endPos.y = 0;
})


function init(){
	//处理纵向滚动页高度颜色
	var COLORS = ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90', '#ef820'];
	var sections = document.getElementsByClassName("section");
	for(var i = 0; i < sections.length; i++){
		sections[i].style.height = HEIGHT + 'px';
		sections[i].style.backgroundColor = COLORS[i];
	}
	//处理第二页的横向轮播
	slideContainer.style.width = '300%';
	var slides = document.getElementsByClassName("slide");
	for(var i = 0; i < slides.length; i++){
		slides[i].style.width = 100/3 +'%';
	}
}
init();
