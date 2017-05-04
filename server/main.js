const express = require('express')
const path = require('path')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const aframe = require('aframe');
// const session = require('express-session');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*

app.use(session({
  secret: 'a wildly insecure secret',
  resave: false,
  saveUnitialized: false
}))

*/


/***** SOCKET STUFF START *****/

var os = require('os');
var socketIO = require('socket.io');
var server = require('http').createServer(app);  
var io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {

  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message) {
    log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    numClients = io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 1;

    if (!io.sockets.adapter.clients[room]) {  // if room hasn't been created, create one
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room, socket.id);
    } else if (numClients === 2) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      // io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room, socket.id);
      io.sockets.in(room).emit('ready', room);
      socket.broadcast.emit('ready', room);
    } else { // max two clients
      socket.emit('full', room);
    }

    numClients = io.sockets.adapter.rooms[room] ? io.sockets.adapter.rooms[room].length : 1;

    log('Room ' + room + ' now has ' + numClients + ' client(s)');

  });

  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });

});

/***** SOCKET STUFF END *****/



app.use('/api', require('./apiRoutes')) // matches all requests to /api

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../public/index.html'))
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// app.listen(process.env.PORT || 3000, function () {
//   console.log("Listening judgmentally on port 3000");
// });

server.listen(process.env.PORT || 3000, function () {
  console.log("Listening judgmentally on port 3000");
});