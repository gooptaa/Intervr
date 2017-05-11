const router = require('express').Router();
const General = require('../../db/general');
const Technical = require('../../db/technical');
const Intro = require('../../db/intro');


//Get random general questions from our database
router.get('/general', (req, res, next) => {
  console.log('in the general route')
  General.findAll()
  .then((questions) => {
    res.json(questions);
  })
  .catch(next);
});
//Get random technical questions from our database
router.get('/technical', (req, res, next) => {
  console.log('in the technical route')
  Technical.findAll()
  .then((questions) => {
    res.json(questions);
  })
  .catch(next);
});
//Get random intro questions from our database
router.get('/intro', (req, res, next) => {
  console.log('in the intro route')
  Intro.findAll()
  .then((questions) => {
    res.json(questions);
  })
  .catch(next);
});


router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
module.exports = router;
