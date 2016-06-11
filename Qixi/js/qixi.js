var container = $("content");
var swipe = Swipe(container);

//页面滚动到指定位置
function scrollTo(time, proportionX){
    var disX = WIDTH * proportionX;
    swipe.scrollTo(disX, time);
} 

//灯动画
var lamp = {
    elem: $$("b_bg"),
    bright: function(){
        this.elem.className += " lamp-bright";
    },
    dark: function(){
        this.elem.className = this.elem.className.replace(/lamp-bright/, "");
    }
};

//门动画
function doorAction(left, right, time){
    var $door = $$("door");
    var doorLeft = $$("door-left");
    var doorRight = $$("door-right");

    function tranAction(elem, left, time, callback){
        elem.style.left = left;//left传入是百分比
        elem.style.transitionProperty = "left";
        elem.style.transitionDuration = time + 'ms';
        var transitionEvent = whichTransitionEvent();
        transitionEvent && elem.addEventListener(transitionEvent, function(){
            callback();
        });
    }

    return new Promise(function(resolve, reject){
        var count = 2;
        //等待开门完成
        var complete = function(){
            if(count == 1){
                resolve();
                return;
            }
            count--;
        };
        tranAction(doorLeft, left, time, complete);
        tranAction(doorRight, right, time, complete);
    });
}
function openDoor(){
    return doorAction("-50%", "100%", 2000);
}
function shutDoor(){
    return doorAction("0%", "50%", 2000);
}

//鸟动画
var bird = {
    elem: $$("bird"),
    fly: function(){
        this.elem.className += " birdFly";
        options = {right: WIDTH + 'px'};
        transition(this.elem, options, 15000);
    }
};


// 桥的Y轴
var bridgeY = function() {
    var data = getValue('c_bg_middle');
    return data.top;
}();



//飘花效果
var snowflakeURL = [
    "images/snowflake/snowflake1.png",
    "images/snowflake/snowflake2.png",
    "images/snowflake/snowflake3.png",
    "images/snowflake/snowflake4.png",
    "images/snowflake/snowflake5.png",
    "images/snowflake/snowflake6.png"
];
//飘雪花
function snowflake() {
    // 雪花容器
    var $flakeContainer = $('snowflake');

    // 随机六张图
    function getImagesName() {
        return snowflakeURL[Math.floor(Math.random() * 6)];
    }
    // 创建一个雪花元素
    function createSnowBox() {
        var url = getImagesName();
        var div = document.createElement("div");
        div.className = "snowbox";
        div.style.top = "-41px";
        div.style.backgroundImage = "url("+ url +")";
        div.className += " snowRoll";
        return div;
    }
    // 开始飘花
    /*
    * 2016-06-11
    * 这里也实在搞不懂了，给transition设置终止位置做了延时，
    * 还是避免不了个别花瓣没有过渡效果直接出现在终止位置，真是搞不懂transition，什么鬼
    * 因为这个bug，为了防止浏览器过负载，加了计数退出
    */
    var count = 0;
    var timer = setInterval(function() {
        if(count == 100){
            clearInterval(timer);
            return;
        }
        // 运动的轨迹
        var startPositionLeft = Math.random() * WIDTH - 100,
            startOpacity    = 1,
            endPositionTop  = HEIGHT - 40,
            endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
            duration        = HEIGHT * 10 + Math.random() * 5000;
        // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;
        // 创建一个雪花
        var $flake = createSnowBox();
        // 设计起点位置
        $flake.style.left = startPositionLeft + 'px';
        $flake.style.opacity = randomStart;
        // 加入到容器
        $flakeContainer.appendChild($flake);
        // 开始执行动画
        options = {
            top: endPositionTop + 'px',
            left: endPositionLeft + 'px'
        };
        transition($flake, options, duration, "ease-out");
        transitionEvent = whichTransitionEvent();
        transitionEvent && $flake.addEventListener(transitionEvent, function(){
            try{
                $flakeContainer.removeChild(this);
            }catch(err){

            }
        });
        count++;
    }, 200);
}

// 音乐配置
var audioConfig = {
    enable: true, // 是否开启音乐
    playURl: 'music/happy.wav', // 正常播放地址
    cycleURL: 'music/circulation.wav' // 正常循环播放地址
};
//背景音乐
function Hmlt5Audio(url, isloop) {
    var audio = new Audio(url);//创建一个音频对象并传入地址
    audio.autoPlay = true;
    audio.loop = isloop || false;
    audio.play();
    return {
        end: function(callback) {
            //ended事件——音频播放完毕
            audio.addEventListener('ended', function() {
                callback();
            }, false);
        }
    };
}

var girl = {
    elem: $$("girl"),
    getWidth: function(){
        return getWidth(this.elem);
    },
    getHeight: function(){
        return getHeight(this.elem);
    },
    //转身动作
    rotate: function(){
        this.elem.className += " girl-rotate";
    },
    setOffset: function(){
        this.elem.style.left = WIDTH / 2 + 'px';
        this.elem.style.top = bridgeY - this.getHeight() + 'px';
    },
    getOffset: function(){
        return this.elem.getBoundingClientRect();
    }
}
//修正女孩位置
girl.setOffset();
