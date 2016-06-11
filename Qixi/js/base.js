//获取元素最终style
function getStyle(obj){
    return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
}
function getWidth(obj){
    return parseInt(getStyle(obj).width.split('px')[0]);
}
function getHeight(obj){
    return parseInt(getStyle(obj).height.split('px')[0]);
}

var WIDTH, HEIGHT;//父容器尺寸

//兼容transitionend
var transitionEvent, callback;
function whichTransitionEvent(){
    var t;
    var el = document.createElement("fakeelement");
    //兼容transitionend事件
    var transitions = {
        "transition":"transitionend",
        "OTrasition":"oTrasitionEnd",
        "MozTransition":"transitionend",
        "WebkitTransition":"webkitTransitionEnd"
    }
    for(t in transitions){
        if(el.style[t] != undefined){
            return transitions[t];
        }
    }
}

var animationEnd = (function() {
   var explorer = navigator.userAgent;
   if (~explorer.indexOf('WebKit')) {
       return 'webkitAnimationEnd';
   }
   return 'animationend';
})();

function $$(className){
    return document.getElementsByClassName(className)[0];
}

function transition(elem, options, runTime, move){
    var arr = [];
    for(var i in options){
        arr.push(i);
    }
    //transition应该设置在修改属性之前
    elem.style.transitionProperty = arr;
    elem.style.transitionDuration = runTime + 'ms';
    elem.style.transitionTimingFunction = move ? move : "linear";
    //这里用setTimeout也不太清楚为何？？？？？？
    setTimeout(function(){
        for(var i = 0; i < arr.length; i++){
            elem.style[arr[i]] = options[arr[i]];
        }
    }, 10);
    
}

// 获取数据
function getValue(className){
    var $elem = document.getElementsByClassName(className)[0];
    //getStyle($elem).top获取到auto,使用方法getBoundingClientRect拿到元素top属性
    return {
        height: $elem.getBoundingClientRect().height, 
        top: $elem.getBoundingClientRect().top
    };
}