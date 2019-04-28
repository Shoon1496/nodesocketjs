var express = require('express');//import
var app =express();
var http=require("http").Server(app);
var io=require('socket.io')(http);
var port=process.env.PORT || 5000
// var port=5000;

YT3_API_KEY = "AIzaSyBW5xLOcyCdUGjS3ygJGmam5blfoV58T4g"
const connections = [];

const videos = [];

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

http.listen(port,function() {

	console.log('listening on:' +port);
});

io.sockets.on('connection',(socket) => {

  connections.push(socket);
  console.log(' %s sockets is connected', connections.length);

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
  });    

  socket.on('play video', function (data) {

    io.sockets.emit('playing video', { hello: 'play world' });
  });

  socket.on('pause video', function (data) {

    io.sockets.emit('pausing video', { hello: 'pause world' });
  });

  // change video
  socket.on('change video', function(data) {

    io.sockets.emit('changeVideoClient', { videoId: data.videoId });
  });

});