### 轮播实现，不兼容ie浏览器，支持移动端 [demo访问这里](http://kad0108.github.io/FE-Demos/carousel/)

轮播图：几张图片轮流循环显示

#### 知识点

* container容器

  ```
  .container{
    width: 600px;
    height: 400px;
    overflow: hidden;/*溢出隐藏*/
    postion: relative;/*图片list相对于container滚动*/
  }
  ```

* list图片列表，图片大小是container容器的宽高，list容器的宽是其n倍，n是图片数量。设置container的overflow为hidden，通过动态修改list的left值来显示对应位置的图片

* 两个箭头：偏移量判断。无缝滚动：从最后一张图切回第一张图时借助两张辅助图来填补切换空白。

* 定时器：setInterval触发箭头click事件

* buttons按钮：通过一个全局变量index记录当前轮播到第几张图片，对应计算新的切换偏移量

* 过渡效果应该可以通过transition属性实现

