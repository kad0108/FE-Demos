/* 基本图文组件对象 */
var H5ComponentBase = function(name, cfg){
	var cfg = cfg || {};
	var id = ('h5_' + Math.random()).replace('.', '_');
	var cls = 'h5_component_' + cfg.type;
	name = 'h5_component_' + name;
	var component = $('<div class="h5_component ' + cls + ' ' + name + '">');
	component.attr('id', id);

	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width / 2);
	cfg.height && component.height(cfg.height / 2);

	cfg.css && component.css(cfg.css);

	if(cfg.center === true){
		component.css({
			marginLeft: (cfg.width/4 * -1) + 'px',
			left: '50%',
		})
	}
	// cfg.bg && component.css('backgroundImage', 'url( '+ cfg.bg + ')');

	component.on('onLoad', function(){
        component.addClass(cls + '_load').removeClass(cls + '_leave');
        cfg.animateIn && component.animate(cfg.animateIn);
        return false;//这个事件执行完就不要向上传播啦，不然会死循环
    })
    component.on('onLeave', function(){
        component.addClass(cls + '_leave').removeClass(cls + '_load');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    })

	return component;
}