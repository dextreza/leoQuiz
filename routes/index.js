var express = require('express');
var router = express.Router();
var quizControler = require('../controllers/quiz_controllers.js');

/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Leandro martinez fernandez' });
});


router.param('quizId',quizControler.load);//si el parametro 'quizId' existe en la ruta, entonces se ejecuta el quizController.load

router.get('/quizes',						quizControler.index);
router.get('/quizes/:quizId(\\d+)',			quizControler.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizControler.answer);
router.get('/quizes/new',					quizControler.new);
router.post('/quizes/create',				quizControler.create);//es POST, no GET!

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LeoQuiz' });
});

module.exports = router;