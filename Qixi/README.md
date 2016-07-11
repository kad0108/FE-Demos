### 参考慕课网教程，自己用原生JS实现，未使用第三方库，动画不兼容全部浏览器，推荐使用Chrome。[demo访问这里](http://kad0108.github.io/Html5/Qixi/)
### 学习到的知识点：
* 教程中使用了jquery的deferred来实现异步，防止回调嵌套。我自己则用JS中原生的Promise实现，通过then的链式调用实现一系列动画。
* transition过渡动画的封装，以及transitionend的监听回调，此处还有疑问，留待以后解决。
* 几个场景的切换，都是相对父容器坐标变化，小男孩的走路也是相对屏幕比例。