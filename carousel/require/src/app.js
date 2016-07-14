define(['math'], function(math){
	function doSth(){
		alert("do " + math.add(1, 1));
	}
	return{
		doSth: doSth
	};
});