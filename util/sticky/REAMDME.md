## Sticky

在一些很长的表格中，常常会使用表头悬浮的设计以方便阅读，即在表格离开窗口之前，表头会一直 fixed 悬浮在表格的最顶上。

CSS3结合了Relative（在屏幕中时）和Fixed（移出屏幕时）的样式效果提出了**sticky**粘性元素。

```
.header{
	position: -webkit-sticky;
	position: -moz-sticky;
	position: sticky;
	top: 0;//这是重点
	width: 100%;
	height: 60px;
	background-color: purple;
}
```

### 原生JS实现

监听window的scroll事件，当滚走的高度大于header距离窗口上方的高度时，将header设为fixed，top为0。