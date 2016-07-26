### 参考慕课网教程实现WebAPP阅读器 [demo访问这里](http://kad0108.github.io/Html5/ReaderAPP/)
#### 接触到的知识点
* 引入两个jquery库，需要底层库zepto的基础方法支持，因为jquery在移动端性能低，而zepto更加轻量级。阅读器的数据为了防止直接被爬虫爬到，把数据做了base64加密，需要解码的过程，也就是引入的base64数据解码库。jsonp库提供了跨域数据请求。
* css3选择器的使用:nth-child，索引从1开始。background-size:contain自适应容器宽度高度，一定在设置了背景之后加。
* 移动端代码尽量轻量级，把代码直接放在一个闭包中不影响全局：(function(){})();
* escape()对字符串编码，使得该字符串在所有计算机上可读取。decodeURIComponent()解码。
* 刷新页面时需要加载刷新前选择的字号、背景、章节。字号和背景的历史状态保留使用了localStorage，章节则使用了location.hash。
* 细节处理：调节字体背景div的z-index值应该比唤起上下导航栏的z-index值大。为了使每次加载页面返回页面顶部，$(window).scrollTop(0)应该放在渲染UI的回调函数中执行。
* 自己实现了一个简易版的toast效果，使用jquery的fadeIn、fadeOut方法效果更好。
* 使用ES6必须有声明'use strict'，使用promise代替异步回调
* 之后再实现请求目录数据