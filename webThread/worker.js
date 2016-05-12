onmessage = sayCheese;
function sayCheese(event){
	if(event.data == "say"){
		postMessage("Cheese");
	}
}