window.onload = function(){
	waterfall();
	//模拟后台传输的json数据
	var data = {"data":[{"src": 'A.png'}, {"src":"B.png"}]};
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = $("main");
			//渲染图片到页面尾部
			for(var i = 0; i < data.data.length; i++){
				var oBox = document.createElement("div");
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement("div");
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var img = new Image();
				img.src = "images/" + data.data[i].src;
				oPic.appendChild(img);
			}
			waterfall();
		}
	}

}

function waterfall(){
	//将main下所有class为box的元素取出
	var oParent = $("main");
	var oBoxs = document.querySelectorAll(".box");
	//计算整个页面显示的列数 页面宽/box宽
	var oBoxWidth = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth / oBoxWidth);
	//设置main宽度
	oParent.style.cssText = "width:" + oBoxWidth * cols + "px; margin: 0 auto;";

	var hArr = [];//初始放第一行盒子的高度，之后存放的是每一列当前的高度
	for(var i = 0; i < oBoxs.length; i++){
		if(i < cols){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null, hArr);
			var index = getMinHeightIndex(hArr, minH);
			oBoxs[i].style.position = "absolute";
			oBoxs[i].style.top = minH + 'px';
			// oBoxs[i].style.left = oBoxWidth * index + 'px';
			oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
			//修改每列高度
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	/*瀑布流特点：第二行第一张图片要加载在第一行高度最小的图片下面*/
}

function getMinHeightIndex(arr, val){
	for(var i in arr){
		if(arr[i] == val) return i;
	}
}
//检测滚动条滚动位置需要加载图片
function checkScrollSlide(){
	var oParent = $("main");
	var oBoxs = document.querySelectorAll(".box");
	var lastBoxHeight = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//标准模式与混杂模式兼容
	var clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxHeight < scrollTop + clientHeight) ? true : false;
}