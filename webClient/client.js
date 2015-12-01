var socket = io(),
    user = confirm("Introduce your username");

io.emit('login', user);
