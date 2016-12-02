##Html5 [history](https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history#pushState()方法)提供对浏览器历史记录的访问。


```
// 在历史记录中后退
window.history.back(); 

// 前进，类似浏览器中点击前进按钮
window.history.forward(); 

// 历史记录栈中一共有多少个记录
window.history.length 

// 添加记录，相当于入栈
var json = { time: new Date().getTime() };
window.history.pushState(json, "", "http://same.domain/test.html");

// 监听历史记录点
// 调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退按钮(或者在JavaScript中调用history.back()方法).
window.onpopstate = function(){
	console.log(window.history.state); // 获得存储在历史记录点的json对象
}
```

