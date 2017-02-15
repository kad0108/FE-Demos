// var http = require("http");
// var port = 9998;

// http.createServer(function(request, response){
// 	response.writeHead(200, {'Content-Type': 'text/plain'});
// 	response.end('Hello World\n');
// }).listen(port);

// console.log('Server running at http://127.0.0.1:' + port + '/');

const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 9998
});
console.log('服务器已启动');

wss.on('connection', function(ws){
	ws.on('message', function(message){
		console.log('接收到客户端数据:' + message);

		ws.send('我收到你的消息啦！');
	})
})