var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
  res.sendFile(__dirname + '/public/javascript.html')
})

app.get('/swift', (req, res) => {
  res.sendFile(__dirname + '/public/swift.html')
})

app.get('/python', (req, res) => {
  res.sendFile(__dirname + '/public/python.html')
})

const tech = io.of('/tech')

tech.on('connection', (socket) => {
  
  socket.on('join', (data) => {
    socket.join(data.name)
    socket.broadcast.emit('message',`${data.name} is online`)
    //tech.in(data.name).emit('message', `new user joined ${data.name} root`)
  })

  socket.on('message', (data) => {
    tech.in(data.name).emit('message',  data.msg)
  })

  io.on('disconnect', () => {
    console.log('user Disconnected')
    tech.emit('message', 'user Disconnected')
  })
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});