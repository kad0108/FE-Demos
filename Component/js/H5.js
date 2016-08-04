/* 内容管理对象 */

var H5 = function(){
	this.id = ('h5_' + Math.random()).replace('.', '_');
	this.ele = $('<div class="h5">').hide();
	this.ele.attr('id', this.id);
	$('body').append(this.ele);
	this.page = [];
	// 新增页
	this.addPage = function(name, text){
		var page = $('<div class="h5_page section">');
		name && page.addClass('h5_page_' + name);
		text && page.text(text);
		this.ele.append(page);
		this.page.push(page);
		return this;
	}
	// 新增组件
	this.addComponent = function(name, cfg){
		var cfg = cfg || {};
		cfg = $.extend(cfg, {type: 'base'});
		
		var component;//存储组件元素
		var page = this.page.slice(-1)[0];//拿到最后一个page元素
		switch(cfg.type){
			case 'base':
				component = new H5ComponentBase(name, cfg);
				break;
			default:
		}
		page.append(component);
		return this;
	}
	// h5对象初始化呈现
	this.loader = function(){
		this.ele.fullpage({
			onLeave: function(index, nextIndex, direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad: function(anchorLink, index){
                $(this).find('.h5_component').trigger('onLoad');
            },
		});
		this.page[0].find('.h5_component').trigger('onLoad');
		this.ele.show();
	}
}