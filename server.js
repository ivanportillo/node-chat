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
  console.log(socket);

  socket.on('login', function(user){
    console.log("User logged as: " + user);
    socket.user = user;
  });
  socket.on('disconnect', function(){
    io.emit('message', "client " + socket.user + " disconnected" , 'SERVER');
  });
  socket.on('message', function(msg){
    console.log(socket.user + ": " + msg);
    io.emit('message', msg, socket.user);
  });
});


//SERVER
http.listen(3030, function(){
  console.log("Server listening in port 3030");
});
