// 感觉自定义事件就是订阅-发布的过程
function CustomEvent(){
	this._listener = {};
}

CustomEvent.prototype = {
	constructor: this,
	addEvent: function(type, fn){
		if(typeof type === "string" && typeof fn === "function"){
			if(typeof this._listener[type] === "undefined"){
				this._listener[type] = [];
			}
			this._listener[type].push(fn);
		}
		console.log(this._listener);
		return this;
	},
	emitEvent: function(type){
		var evt = this._listener[type];
		if(evt instanceof Array){
			for(var i = 0, len = evt.length; i < len; i++){
				if(typeof evt[i] === "function"){
					evt[i]();
				}
			}
		}
		return this;
	},
	removeEvent: function(type, fn){
		var evt = this._listener[type];
		if(typeof type === "string" && evt instanceof Array){
			if(typeof fn === "function"){
				for(var i = 0, len = evt.length; i < len; i++){
					if(evt[i] === fn){
						this._listener[type].splice(i, 1);
						break;
					}
				}
			}else{
				delete this._listener[type];
			}
		}
		return this;
	}
};