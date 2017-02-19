## Page Visibility

浏览器打开很多很多个tab页，电脑会很卡吧。不要怪电脑，不要怪浏览器～～

即使用户打开多个tab，用户当前窗口看的永远只是一个tab页，其他tab虽然不被用户关注，但依然在跑，该计算的还在计算，该占内存的不会少，明显资源浪费。

网页开发要做的，不关注的页面停止耗性能的操作，用户切换回页面，恢复原来状态，丝毫不影响用户体验。

**场景再现：乐呵呵在看视频，老板一来视察，立马切换回IDE，可是！不可见的视频还在播放，还在播放着声音。。。尴尬了。。。**

## API

* document.hidden: Boolean值，表示当前页面可见还是不可见

* document.visibilityState: 返回当前页面的可见状态

* visibilitychange: 当可见状态改变时候触发的事件

## setInterval+PageVisibility == RequestAnimationFrame

[Video自动暂停](http://kad0108.github.io/Html5/pageVisibility/video.html)

[动态绘制](http://kad0108.github.io/Html5/pageVisibility/)

[requestAnimationFrame动态绘制](http://kad0108.github.io/Html5/pageVisibility/requestAnimationFrame.html)