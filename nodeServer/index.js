//node server to hadle socket io connections
const io = require('socket.io')(8000);
const users = {};
io.on('connection', socket => {

  socket.on('new-user-joined', name => {
    console.log(name);
    users[socket.id] = name;

    socket.broadcast.emit('user-joined', name);
  }); // listen to the event
  socket.on('send', message => {
    console.log(message);
    socket.broadcast.emit('recieve', { name: users[socket.id], message: message });
  });
  socket.on('disconnect', message => {
    console.log(message);
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });



});