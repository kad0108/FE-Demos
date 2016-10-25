##拖拽功能的实现，使用Html5提供的API [demo访问这里](http://kad0108.github.io/Html5/drag/)

###知识点

1. 设置元素为可拖放，把 draggable 属性设置为 true。
2. 拖动元素：被拖动元素的dragstart事件触发，event.dataTransfer.setData()设置被拖动元素数据。
3. 拖拽到何处：拖动到目标元素的dragover事件触发，默认地，无法将数据/元素放置到其他元素中，目标元素需要设置允许放置，必须阻止对元素的默认处理方式，event.preventDefault()。
4. 进行放置：当放置被拖动元素时，目标元素的drop事件触发，event.dataTransfer.getData()获取被拖数据，进行被拖元素和目标元素的相关操作。

[参考 W3school](http://www.w3school.com.cn/html5/html_5_draganddrop.asp)

[参考 HTML5 drag & drop 拖拽与拖放简介](http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/)