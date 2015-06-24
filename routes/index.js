var express = require('express');
var router = express.Router();
var quizControler = require('../controllers/quiz_controllers.js');

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Leandro martinez fernandez' });
});

router.get('/quizes',		quizControler.index);
router.get('/quizes/:quizId(\\d+)',quizControler.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControler.answer);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LeoQuiz' });
});

module.exports = router;