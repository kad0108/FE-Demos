## 懒加载原理 [demo](http://kad0108.github.io/Html5/lazyload/lazyload.html)

将页面中的img标签src指向一张小图片或者src为空，然后定义data-src属性指向真实的图片。当载入页面时，先把可视区域内的img标签的data-src属性值赋给src，然后监听滚动事件，把用户即将看到的图片加载。这样便实现了懒加载。

## 函数节流 [demo](http://kad0108.github.io/Html5/lazyload/throttle.html)

**函数节流，简单地讲，就是让一个函数无法在很短的时间间隔内连续调用，只有当上一次函数执行后过了你规定的时间间隔，才能进行下一次该函数的调用。通过定时器实现。**

基本形式：
```javascript
var processor = {
	timeoutId: null,
	// 实际处理的方法
	performProcessing: function(){
		
	},
	// 调用的方法
	process: function(){
		clearTimeout(this.timeoutId);
		// 箭头函数体内的this对象是定义时所在的对象，而不是使用时所在的对象
		this.timeoutId = setTimeout( () => {this.performProcessing();}, 100);
	}
}
processor.process();
```

简化形式：(其实并没太看懂)
```javascript
function throttle(method, context){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context);// 没有第二个参数会在全局作用域内执行该方法
	}, 100);
}
```

闭包形式：
```javascript
var throttle = function(fn, delay){
	var timer = null;
	return function(){
		clearTimeout(timer);
		timer = setTimeout( () => {fn.apply(this, arguments);}, delay);
	};
}
```

拓展深化：
```javascript
var throttle = function(fn, delay, mustRunDelay){
    var timer = null,
        start;
    return function(){
        var cur = +new Date();// 返回当前时间的毫秒数，相当于调用date.getTime()
        clearTimeout(timer);
        if(!start) start = cur;
        if(cur - start >= mustRunDelay){
            fn.apply(this, arguments);
            start = cur;
        }else{
            timer = setTimeout( () => {
                fn.apply(this, arguments);
            }, delay);
        }
    };
}
```

## Reference

[图片懒加载](https://zhuanlan.zhihu.com/p/24057749)

[作者的博客](http://i.jakeyu.top/)

[函数节流](http://www.alloyteam.com/2012/11/javascript-throttle/)




