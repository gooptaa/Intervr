const router = require('express').Router();
const General = require('../../db/general');
const Technical = require('../../db/technical');
const Intro = require('../../db/intro');

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

//Get random general question from our database
router.get('/general', (req, res, next) => {
  console.log('in the general route')
  General.findById(Math.floor(Math.random() * (10)))
  .then((question) => {
    res.json(question);
  })
  .catch(next);
});
//Get random technical question from our database
router.get('/technical', (req, res, next) => {
  console.log('in the technical route')
  Technical.findById(Math.floor(Math.random() * (6)))
  .then((question) => {
    res.json(question);
  })
  .catch(next);
});
//Get random intro question from our database
router.get('/intro', (req, res, next) => {
  console.log('in the intro route')
  Intro.findById(Math.floor(Math.random() * (6)))
  .then((question) => {
    res.json(question);
  })
  .catch(next);
});


module.exports = router;
