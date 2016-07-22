### 参考慕课网教程实现WebAPP阅读器
##### 接触到的知识点
* Meta标签中的format-detection属性，telephone=no禁止了把数字转化为拨号链接
* 引入两个jquery库，需要底层库zepto的基础方法支持，因为jquery在移动端性能低，而zepto更加轻量级。阅读器的数据为了防止直接被爬虫爬到，把数据做了base64加密，需要解码的过程，也就是引入的base64数据解码库。jsonp库提供了跨域数据请求。
* css3选择器的使用:nth-child，索引从1开始。background-size:contain自适应容器宽度高度，一定在设置了背景之后加。
* 移动端代码尽量轻量级，把代码直接放在一个闭包中不影响全局：(function(){})();
* css类名为'-'，id命名为'_'
* $.get() 方法通过 HTTP GET 请求从服务器上请求数据
* escape()对字符串编码，使得该字符串在所有计算机上可读取。decodeURIComponent()解码。
* 刷新页面时需要加载刷新前选择的字号、背景、章节。字号和背景的历史状态保留使用了localStorage，章节则使用了location.hash。