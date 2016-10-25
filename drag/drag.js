function $(ele){
	return document.querySelectorAll(ele);
}

var dustbin = $('.dustbin')[0];
var dragList = $('.dragbox');
var dragremind = $('.dragremind')[0];
var curEle = null;


for(var i = 0; i < dragList.length; i++){
	//拖拽开始
	dragList[i].ondragstart = function(event){
		event.dataTransfer.setData('text', event.target.innerHTML);//被拖动的数据
		curEle = event.target;//被拖动的元素，貌似setData只能是text和url，而不能是dom节点
		return true;
	}
	//拖拽结束
	dragList[i].ondragend = function(event){
		curEle = null;
	}
}
//有元素被拖动到目标元素上时
dustbin.ondragenter = function(event){
	this.style.color = 'white';
}
//被拖动元素在目标元素范围内移动
dustbin.ondragover = function(event){
	//默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式
	event.preventDefault();
}
//元素被放倒了目标元素中
dustbin.ondrop = function(event){
	if(curEle){
		dragremind.innerHTML = event.dataTransfer.getData('text') + '被扔进了垃圾箱中';//接受文本数据
		curEle.parentNode.removeChild(curEle);
	}
	this.style.color = 'black';
}
//元素被拖出了目标元素
dustbin.ondragleave = function(event){
	this.style.color = 'black';
}

