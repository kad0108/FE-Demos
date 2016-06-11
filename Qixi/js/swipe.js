/**
 * 页面滑动
 * [Swipe description]
 * @param {[type]} container [页面容器节点]
 * @param {[type]} options   [参数]
 */
function Swipe(container){
    //滑动对象
    var swipe = {};
    
    WIDTH = getWidth(container);
    HEIGHT = getHeight(container);

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
        options = {
            transform: "translate3d(-" + x + "px, 0px, 0px)"
        };
        transition(element, options, speed);
    };

    return swipe;
}






