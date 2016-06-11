/**
 * 小孩走路
 * @param {[type]} container [description]
 */
var instanceX, instanceY;

function BoyWalk() {

    var container = $("content");

    // 路的Y轴
    var pathY = function(){
        var data = getValue("a_bg_middle");
        return data.top + data.height / 2;
    }();
    var $boy = $("boy");
    var boyWidth = getWidth($boy);
    var boyHeight = getHeight($boy);
    //修正男孩的位置，路的中间位置减去小孩的高度
    $boy.style.top = (pathY - boyHeight + 25) + 'px';

    // 暂停走路
    function pauseWalk() {
        if(!$boy.className.match(/pauseWalk/))
            $boy.className += " pauseWalk";
    }

    // 恢复走路
    function restoreWalk(){
        $boy.className = $boy.className.replace(/pauseWalk/, "");
    }

    // css3的动作变化
    function slowWalk(){
        if(!$boy.className.match(/slowWalk/))
            $boy.className += " slowWalk";
    }


    
    // 用transition做运动
    function startRun(options, runTime) {
        return new Promise(function(resolve, reject){
            restoreWalk();
            // transition($boy, options, runTime, resolve);
            var arr = [];
            for(var i in options){
                arr.push(i);
            }
            for(var i = 0; i < arr.length; i++){
                $boy.style[arr[i]] = options[arr[i]];
            }

            $boy.style.transitionProperty = arr;
            $boy.style.transitionDuration = runTime + 'ms';
            $boy.style.transitionTimingFunction = "linear";


            transitionEvent = whichTransitionEvent();
            callback = function(){
                resolve();
            }
            transitionEvent && $boy.addEventListener(transitionEvent, callback);
        })
    }

    // 开始走路
    function walkRun(time, dist, disY) {
        time = time || 3000;
        // 脚动作
        slowWalk();
        // 开始走路
        var options = {};
        options.left = dist + 'px';
        if(disY) options.top = disY + 'px';
        else delete options.top;
        var d1 = startRun(options, time);
        return d1;
    }

    // 走进商店
    function walkToShop(runTime){
        var doorObj = $$("door");
        //门坐标
        var doorOffsetLeft = doorObj.getBoundingClientRect().left;
        var doorOffsetTop = doorObj.getBoundingClientRect().top;
        //boy坐标
        var boyOffsetLeft = $boy.getBoundingClientRect().left;
        var boyOffsetTop = $boy.getBoundingClientRect().top;
        //当前需要移动的坐标
        instanceX = (doorOffsetLeft + getWidth(doorObj) / 2) - (boyOffsetLeft + boyWidth / 2);
        instanceY = boyOffsetTop + boyHeight - (doorOffsetLeft + getHeight(doorObj) / 2);
        //开始走路
        var walkPlay = startRun({
            transform: "translate("+ instanceX +"px, "+ instanceY +"px)",
            transform: "scale(0.3,0.3)",
            opacity: 0.1
        }, runTime);
        return new Promise(function(resolve, reject){
            //走路完毕
            walkPlay.then(function(){
                $boy.style.opacity = 0;
                resolve();
            });
        })
    }
    // //取花
    function takeFlower(){
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                $boy.className += " slowFlowerWalk";
                resolve();
            }, 1000);
        })
    }
    //走出商店
    function walkOutShop(runTime){
        restoreWalk();
        var walkPlay = startRun({
            transform: "translateX("+ instanceX +"px)",
            transform: "scale(1,1)",
            opacity: 1
        }, runTime);
        return new Promise(function(resolve, reject){
            //走路完毕
            walkPlay.then(function(){
                resolve();
            });
        })
    }

    // 计算移动距离
    function calculateDist(direction, proportion) {
        return (direction == "x" ? WIDTH : HEIGHT) * proportion;
    }

    return {
        // 开始走路
        walkTo: function(time, proportionX, proportionY) {
            var distX = calculateDist('x', proportionX)
            var distY = calculateDist('y', proportionY)
            return walkRun(time, distX, distY);
        },
        //走进商店
        toShop: function(){
            return walkToShop.apply(null, arguments);
        },
        //取花
        takeFlower: function(){
            return takeFlower();
        },
        //走出商店
        outShop: function(){
            return walkOutShop.apply(null, arguments);
        },
        setColor:function(value){
            $boy.style.backgroundColor = value;
        },
        getWidth: function(){
            return getWidth($boy);
        },
        //复位初始状态
        resetOriginal: function(){
            this.stopWalk();
            $boy.className = $boy.className.replace(/slowWalk/, "");
            $boy.className = $boy.className.replace(/slowFlowerWalk/, "");
            $boy.className += " boyOriginal";
        },
        setFlowerWalk: function(){
            $boy.className += " slowFlowerWalk";
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        rotate: function(){
            restoreWalk();
            $boy.className += " boy-rotate";
        }
    }
}