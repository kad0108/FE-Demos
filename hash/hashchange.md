##hashchange事件

**当前页面URL中的hash值发生改变时触发**

```
<p>first: <button id="btn">change anchor</button></p>
<p>second: now try browser back</p>
<p id="anchor"></p>
<!-- 问过的面试题，ajax实现分页，如何实现点击浏览器后退按钮回退到上一页而不是上一个链接，浏览器记忆hash，回退时触发hashchange事件ajax加载分页 -->
<script src="../base.js"></script>
<script>
    var num = 0;
    $('btn').onclick = function(){
        num++;
        window.location.hash = '#' + num;
    }
    function hash(){
        $('anchor').innerHTML = 'Simulate Ajax. Anchor: ' +　window.location.hash;
    }
    window.onload = hash;
    window.onhashchange = hash;
    
</script>
```