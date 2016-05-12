window.onload = function(){
	if(window["Worker"]){
		$("output").innerHTML = "No Web workers";
	}

	var worker = new Worker("worker.js");
	worker.postMessage("Say");
	worker.onmessage = function(event){
		var message = "Worker says" + event.data;
		$("output").innerHTML = message;
	};
}