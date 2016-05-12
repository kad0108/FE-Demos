window.onload = function(){
	var worker = new Worker("worker.js");
	console.log(worker);
	worker.postMessage("Say");
	worker.onmessage = function(event){
		var message = "Worker says " + event.data;
		$("output").innerHTML = message;
	};
}