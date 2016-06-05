function getStyle(obj){
	return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
}

var WIDTH, HEIGHT;

/**
 * [Swipe description]
 * @param {[type]} container [页面容器节点]
 * @param {[type]} options   [参数]
 */
function Swipe(container){
    //滑动对象
    var swipe = {};
    
    WIDTH = parseInt(getStyle(container).width.split('px')[0]);
    HEIGHT = parseInt(getStyle(container).height.split('px')[0]);

    var element = container.children[0];
    var slides = element.children;
    element.style.width = (slides.length * WIDTH) + 'px';
    element.style.height = HEIGHT + 'px';

    //设置每一个页面li的样式
    for(var i = 0; i < slides.length; i++){
        slides[i].style.width = WIDTH + 'px';
        slides[i].style.height = HEIGHT + 'px';
    }

    //监控完成与移动
    swipe.scrollTo = function(x, speed){
        //移动父容器，实现相对子容器移动
        element.style.transitionTimingFunction = "linear";
        element.style.transitionDuration = speed + "ms";
        element.style.transform = "translate3d(-" + x * 2 + "px, 0px, 0px)";
    };

    return swipe;
}






