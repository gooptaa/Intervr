const express = require('express')
const path = require('path')
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, './../public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes')) // matches all requests to /api

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../public/index.html'))
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

server.listen(process.env.PORT || 3000, function () {
  console.log("Listening judgmentally on port 3000");
});
