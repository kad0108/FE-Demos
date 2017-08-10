##Cookie [demo](http://kad0108.github.io/FE-Demos/cookie/)

##参考资料

* [W3C Cookie](http://www.w3school.com.cn/js/js_cookies.asp)
* [cookie属性](http://www.360doc.com/content/10/1219/10/2631212_79425592.shtml)

##知识点

* cookie使用escape编码，读取时需要unescape解编码。
* chrome出于安全性考虑不能本地设置cookie，导致document.cookie=""失效，需要在服务器环境下运行。
* 多个值，cookie只能单独设置，每次设置一个。还没有找到官方很好的解释。