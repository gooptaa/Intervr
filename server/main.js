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


app.use('/api', require('./apiRoutes')) // matches all requests to /api

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './../public/index.html'))
})

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3000, function () {
  console.log("Listening judgmentally on port 3000");
});
