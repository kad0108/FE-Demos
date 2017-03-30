### canvas的一些实现，包括有：
* 参考慕课网教程倒计时的实现，canvas画布实现数字变化多个小球滚落的效果
* canvas实现一个动态的粒子系统，包括鼠标跟随效果（缓动）、边缘碰撞检测等
* 手写功能实现，移动端适配
* 斐波那契数列曲线绘制
* 移动端的手势解锁

## 知识点

* 
```
//保存canvas状态
context.save();
//重新开始绘制路径， beginPath,closePath不一定成对出现
context.beginPath();
//画线
context.moveTo(x, y);
context.lineTo(x, y);
//画圆
context.arc(centerX, centerY, radius, startAngle, endAngle, anticlock=false);
context.closePath();

context.lineWidth = 9;
context.strokeStyle = 'black';
context.stroke()//绘制线

context.fillStyle = 'black';
context.fill()//绘制填充色块

//恢复之前的状态
context.restore();

//清空画布
context.clearRect(x, y, width, height);
```

* 获取元素相对位置top、left、right、bottom使用**getBoundingClientRect()**方法。

* style获取元素行内样式，getComputedStyle()获取元素外部样式
```
function getStyle(obj){
	return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
}
```

* 移动端适配
```
<meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
```

* 鼠标事件：mousedown、mouseup、mouseout、mousemove

* 触控事件：touchstart、touchmove、touchend。移动端会有多点触控，获取触点event.touches。
