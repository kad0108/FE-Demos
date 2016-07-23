/*
* $.get() 方法通过 HTTP GET 请求从服务器上请求数据
* 缺点：回调函数会越嵌套越深
*/
(function(){
	var Dom = {
		top_nav: $("#top_nav"),
		bot_nav: $("#bot_nav"),
		font_container: $("#font_container"),
		font_btn: $("#font_btn"),
		fiction_container: $("#fiction_container"),
		body: $('body'),
		bglist: $("#bglist").children(),
		night_btn: $("#night_btn"),
		day_btn: $("#day_btn"),
		toast: $("#toast"),
	}
	var Win = $(window);
	var readerModel, readerUI;
	var initFontSize, initBgObj, chapter_id;

	var Util = (function(){
		var prefix = 'html5_reader_';
		var StorageGetter = function(key){
			return localStorage.getItem(prefix + key);
		}
		var StorageSetter = function(key, val){
			return localStorage.setItem(prefix + key, val);
		}
		var getJsonp = function(url, callback){//获得加密后的json数据
			return $.jsonp({//插件方法，把请求得到的数据当作一段js代码插入页面中直接执行
				url: url,
				cache: true,
				callback: 'duokan_fiction_chapter',//jsonp数据加密头部，也就是请求回来数据外面包的方法名
				success:function(result){//请求成功的回调，拿到一个结果集
					var data = $.base64.decode(result);//用base64插件解码得到json数据
					var json = decodeURIComponent(escape(data));
					callback(json);
				}
			})
		}
		return {
			getJsonp: getJsonp,
			StorageSetter:StorageSetter,
			StorageGetter:StorageGetter
		}
	})();

	function main(){
		//入口函数
		init();
		readerModel = ReaderModel();
		readerUI = ReaderBaseFrame(Dom.fiction_container);
		readerModel.init(function(data){
			readerUI(data);
		});
		EventHandler();
	}
	main();

	function init(){
		//初始化页面字体
		initFontSize = parseInt(Util.StorageGetter('font-size') ? Util.StorageGetter('font-size') : 14);
		Dom.fiction_container.css('font-size', initFontSize);
		//初始化页面背景
		initBgObj = {
			bgColor: '#e9dfc7',
			index: 0
		}
		if(Util.StorageGetter('initBgObj')){
			initBgObj = JSON.parse(Util.StorageGetter('initBgObj'));
			if(parseInt(initBgObj.index) === 2){//如果背景是夜间模式则显示白天按钮
				Dom.night_btn.hide();
				Dom.day_btn.show();
			}
			Dom.bglist.eq(parseInt(initBgObj.index)).addClass('bgfocus');
			Dom.body.css('background-color', initBgObj.bgColor);
		}else{
			Dom.bglist.eq(parseInt(initBgObj.index)).addClass('bgfocus');
			Dom.body.css('background-color', initBgObj.bgColor);
		}
		//初始化章节
		var hash = window.location.hash.split("#chapter")[1];
		chapter_id = parseInt(hash ? hash : 1);
	}
	
	function ReaderModel(){
		//实现与阅读器相关的数据交互的方法
		// var chapter_id;
		var chapter_len;
		var init = function(UIcallback){
			getFictionInfo(function(){
				getCurChapterContent(chapter_id, function(data){
					UIcallback && UIcallback(data);
				});
			});
		}
		var getFictionInfo = function(callback){//拿到章节列表信息
			$.get('data/chapter.json',function(data){//请求数据
				//获得章节信息之后的回调
				chapter_id = data.chapters[chapter_id].chapter_id;
				// chapter_len = data.chapters.length;
				chapter_len = 4;
				callback && callback();
			}, 'json');
		}
		var getCurChapterContent = function(chapter_id, callback){//获得章节内容
			$.get('data/data' + chapter_id + '.json', function(data){
				if(data.result === 0){//服务器状态ok
					var url = data.jsonp;//获得数据真实地址
					Util.getJsonp(url, function(data){//通过跨域的jsonp请求取得解码后可用于文本渲染的数据
						callback && callback(data);
					});
				}
			}, 'json');
		}
		var preChapter = function(UIcallback){
			chapter_id = parseInt(chapter_id, 10);
			if(chapter_id == 1){
				new Toast({div: Dom.toast, msg:"已经是第一页啦"}).show();
				return;
			}
			chapter_id--;
			getCurChapterContent(chapter_id, UIcallback);
			window.location = "#chapter" + chapter_id;
		}
		var nextChapter = function(UIcallback){
			chapter_id = parseInt(chapter_id, 10);
			if(chapter_id == chapter_len){
				new Toast({div: Dom.toast, msg:"已经是最后一页啦"}).show();
				return;
			}
			chapter_id++;
			getCurChapterContent(chapter_id, UIcallback);
			window.location = "#chapter" + chapter_id;
		}
		return {
			init: init,
			preChapter: preChapter,
			nextChapter: nextChapter
		}
	}

	function ReaderBaseFrame(container){
		//渲染基本UI结构
		function parseChapterData(jsonData){
			var jsonObj = JSON.parse(jsonData);
			var html = '<h4>' + jsonObj.t + '</h4>';
			for(var i = 0; i < jsonObj.p.length; i++){
				html += '<p>' + jsonObj.p[i] + '</p>';
			}
			return html;
		}
		return function(data){
			container.html(parseChapterData(data));
			Win.scrollTop(0);
		}
	}
	/*
	* 交互的事件绑定
	*/
	function EventHandler(){
		//点击页面中部唤起上下导航栏
		$("#action_mid").click(function(){
			if(Dom.top_nav.css('display') === 'none'){
				Dom.bot_nav.show();
				Dom.top_nav.show();
			}else{
				Dom.bot_nav.hide();
				Dom.top_nav.hide();
				Dom.font_container.hide();
				Dom.font_btn.removeClass('focus');
			}
		});
		//点击字体按钮唤起下部导航栏
		Dom.font_btn.click(function(){
			if(Dom.font_container.css('display') === 'none'){
				Dom.font_container.show();
				Dom.font_btn.addClass('focus');
			}else{
				Dom.font_container.hide();
				Dom.font_btn.removeClass('focus');
			}
		});
		//夜间模式
		Dom.night_btn.click(function(){
			$(this).hide();
			Dom.day_btn.show();
			Dom.bglist.eq(2).trigger("click");
		});
		//白天模式
		Dom.day_btn.click(function(){
			$(this).hide();
			Dom.night_btn.show();
			Dom.bglist.eq(0).trigger("click");
		})
		//字体大小点击事件
		$("#large_font").click(function(){
			if(initFontSize > 20) return;
			initFontSize++;
			Dom.fiction_container.css('font-size', initFontSize);
			Util.StorageSetter('font-size', initFontSize);
		});
		$("#small_font").click(function(){
			if(initFontSize < 12) return;
			initFontSize--;
			Dom.fiction_container.css('font-size', initFontSize);
			Util.StorageSetter('font-size', initFontSize);
		});
		//背景点击事件
		Dom.bglist.each(function(){
			$(this).click(bgClick);
		})
		//上一章下一章按钮点击事件
		$("#pre_btn").click(function(){
			readerModel.preChapter(function(data){
				readerUI(data);
			});
		})
		$("#next_btn").click(function(){
			readerModel.nextChapter(function(data){
				readerUI(data);
			});
		})
		//页面滚动事件
		Win.scroll(function(){
			Dom.bot_nav.hide();
			Dom.top_nav.hide();
			Dom.font_container.hide();
			Dom.font_btn.removeClass('focus');
		});

		//点击更换背景模式
		function bgClick(){
			$(".bg-container").each(function(){
				$(this).removeClass('bgfocus');
			});
			$(this).addClass('bgfocus');
			initBgObj.index = $(this).index();
			initBgObj.bgColor = $(this).css('background-color');
			Util.StorageSetter('initBgObj', JSON.stringify(initBgObj));
			Dom.body.css('background-color', initBgObj.bgColor);
		}
	}

	function Toast(content){
		this.div = content.div;
		this.msg = content.msg;
		this.show = function(){
			this.div.html(this.msg);
			this.div.show();
			var me = this;
			setTimeout(function(){
				me.div.hide();
			}, 1500);
		}
	}
})();