var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

//ExpressJS
app.get('/', function(req, res){
    res.sendFile(__dirname + '/webClient/index.html');
});

//SOCKETIO
io.on('connection', function(socket){
  console.log("New client!");

  socket.on('login', function(msg){
    console.log("User logged as: " + msg);
  });
  socket.on('disconnect', function(){
    io.emit('message', 'SERVER', '')
  });
  socket.on('message', function(msg, user){
    console.log(user + ": " + msg);
    io.emit('message', msg, user);
  });
});


//SERVER
http.listen(3030, function(){
  console.log("Server listening in port 3030");
});
