var pageVisibility = (function(){
	var support = 'hidden' in document ? true : false;
	var prefix = (function(){
		return 'hidden' in document ? '' : function(){
			var p = undefined;
			['webkit', 'moz', 'ms', 'o'].forEach(function(pre){
				if((pre + 'Hidden') in document){
					support = true;
					return pre;
				}
			})
			return p;
		}
	})();
	var isHidden = function () {
		if(!support) return undefined;
		return prefix ? document[prefix + 'Hidden'] : document['hidden'];
	}
	var getVisibilityState = function(){
		if(!support) return undefined;
		return prefix ? document[prefix + 'VisibilityState'] : document['visibilityState'];
	}
	var onVisibilityChange = function(fn){
		if(support && typeof fn === 'function'){
			return document.addEventListener(prefix + 'visibilitychange', function(e){
				this.hidden = isHidden();
				this.visibilityState = getVisibilityState();
				fn.call(this, e);
			}.bind(this))
		}
		return undefined;
	}
	return {
		hidden: isHidden(),
		visibilityState: getVisibilityState(),
		visibilityChange: onVisibilityChange()
	}
})();