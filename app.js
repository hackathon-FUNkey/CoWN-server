var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	fs = require('fs');
app.listen(3000);
function handler(req, res) {
	fs.readFile(__dirname + '/index.html', function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error');
		}
		res.writeHead(200);
		res.write(data);
		res.end();
	})
}
io.sockets.on('connection', function(socket) {
	socket.on('emit_from_client', function(data) {
		//console.log(data);
		//接続しているソケットのみ
		//socket.emit('emit_from_client', 'hello from server: ' + data);
		//接続しているソケット以外全部
		//socket.broadcast.emit('emit_from_client', 'hello from server: ' + data);
		socket.client_name = data.name;
		var client_name = socket.client_name;
		//socket.get('client_name', function(err, name) {
			io.sockets.emit('emit_from_server', '[' + client_name + '] : ' + data.msg);
		//});
		//接続しているソケット全部
		//io.sockets.emit('emit_from_client', '[' + socket.id + '] : ' + data);
	});
});