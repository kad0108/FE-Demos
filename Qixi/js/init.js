(function(){
	var boy = BoyWalk();

    //音乐设置
    var audio1 = Hmlt5Audio(audioConfig.playURl);
    audio1.end(function() {
        Hmlt5Audio(audioConfig.cycleURL, true);
    });
    /* 第一张背景图动画 */
    //太阳公转
    $("sun").className += " rotation";
    //飘云
    $("cloud1").className += " cloud1Anim";
    $("cloud2").className += " cloud2Anim";

    //开始第一次走路
    boy.walkTo(2000, 0.2)
    .then(function(){
        //第一次走路完成，开始页面滚动
        scrollTo(10000, 1);
    })
    /* 第二张背景图动画 */
    .then(function(){
        // 第二次走路
        return boy.walkTo(10000, 0.5);
    })
    .then(function(){
        boy.stopWalk();//暂停走路
    })
    .then(function(){
        return openDoor();//开门
    })
    .then(function(){
        lamp.bright();//开灯
    })
    .then(function(){
        return boy.toShop(2000);//进商店
    })
    .then(function(){
        return boy.takeFlower();//取花
    })
    .then(function(){
        return bird.fly();
    })
    .then(function(){
        return boy.outShop(2000);//出商店
    })
    .then(function(){
        lamp.dark();//关灯
    })
    .then(function(){
        return boy.walkTo(2000, 0.7);
    })
    .then(function(){
        //第二次走路完成，开始页面滚动
        scrollTo(3000, 2);
    })
    /* 第三张背景图动画 */
    .then(function(){
        // 第一次走路到桥底边left,top
        return boy.walkTo(3000, 0.15);
    })
    .then(function() {
        // $boy.removeEventListener(transitionEvent, callback);
        // 第二次走路到桥上left,top
        return boy.walkTo(1500, 0.25, (bridgeY - girl.getHeight()) / HEIGHT);
    })
    .then(function(){
        /*
        * 2016-06-10
        * 这是个大bug啊啊啊！！！transition过渡效果传入两个[left, top]，
        * 监听transitionend就会影响后面的动画，小男孩上桥之后就会飘到女孩面前。。。太吓人了。。。
        * 不得不加入这个中间动画消除上一个动画多出来的transitionend
        * 表示很懵逼，完全不知道什么情况,等以后自己能力再提升再回来解决这个bug吧
        */
        // $boy.removeEventListener(transitionEvent, callback);
        console.log("bug");
        return boy.walkTo(0, 0.25);
    })
    .then(function() {
        // $boy.removeEventListener(transitionEvent, callback);
        // 实际走路的比例
        var proportionX = (girl.getOffset().left - boy.getWidth() + girl.getWidth() / 5) / WIDTH;
        // 第三次桥上直走到小女孩面前
        return boy.walkTo(1500, proportionX);
    })
    .then(function() {
        // $boy.removeEventListener(transitionEvent, callback);
        // 图片还原原地停止状态
        boy.resetOriginal();
    })
    .then(function(){
        setTimeout(function(){
            girl.rotate();
            boy.rotate();
            snowflake();
        }, 1000);
    });
})();