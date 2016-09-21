### 参考慕课网教程。[demo访问这里](http://kad0108.github.io/Html5/Qixi/)
### 学习到的知识点：
* 标注工具Markman，按住空格键转为手拖动模式，双倍分辨率下所有宽、高值都必须是偶数。
* 切图，合并图层后右键转换为智能对象，双击进入后储存为web所用格式,如果元素有透明背景需要存为PNG24格式。
* 使用Jquery插件fullpage.js  [文档](https://www.uedsc.com/fullpage.html)
* triggerHandler() 方法触发被选元素的指定事件类型。但不会执行浏览器默认动作，也不会产生事件冒泡。
* 对封装的函数进行链式调用，只需每次调用的函数内部返回this即可。
* (function(){})();表示立即执行匿名函数，而 $(function(){}) 是 $(document).ready(function(){})的简写，表示在Dom加载完之后执行。
* $.extend()是对jquery类中的对象方法进行扩展，$.fn.extend()是对jquery.prototype进行扩展。
* chrome不支持显示小于12像素的字，通过transform的缩放来实现。
* 散点图、主图的生长动画由载入时css的transition完成.
* 折线图由canvas绘制，背景网格线是一层canvas，数据点及阴影是一层canvas，生成动画则是每次绘制percent数据直至最终数据。