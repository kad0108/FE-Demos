onmessage = sayCheese;
function sayCheese(event){
	console.log("worker", event);
	if(event.data == "Say"){
		postMessage("Cheese");
	}
}