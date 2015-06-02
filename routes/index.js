var express = require('express');
var router = express.Router();
var quizControler = require('../controllers/quiz_controllers.js');

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Leandro martinez fernandez' });
});

router.get('/quizes/question',quizControler.question);
router.get('/quizes/answer',quizControler.answer);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LeoQuiz' });
});

module.exports = router;