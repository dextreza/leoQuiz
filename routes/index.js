var express = require('express');
var router = express.Router();
var quizControler = require('../controllers/quiz_controllers.js');
var commentControler = require('../controllers/comment_controllers.js');
var sesionControler = require('../controllers/sesion_controller.js');


/* GET author page. */
router.get('/author', function(req, res) {
  res.render('author', { nombre: 'Leandro martinez fernandez',errors:[] });
});


router.get('/login',	sesionControler.new);
router.post('/login',	sesionControler.create);
router.get('/logout',	sesionControler.destroy);


router.param('quizId',quizControler.load);//si el parametro 'quizId' existe en la ruta, entonces se ejecuta el quizController.load
router.param('commentId',commentControler.load);

router.get('/quizes',						quizControler.index);
router.get('/quizes/:quizId(\\d+)',			quizControler.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizControler.answer);
router.get('/quizes/new',					sesionControler.loginRequerido ,quizControler.new);//asi tb se encadenan middleware, donde el primero da paso al segundo con next()

router.post('/quizes/create',				sesionControler.loginRequerido ,quizControler.create);//es POST, no GET!

router.get('/quizes/:quizId(\\d+)/edit',	sesionControler.loginRequerido ,quizControler.edit);
router.put('/quizes/:quizId(\\d+)',			sesionControler.loginRequerido ,quizControler.update);//es PUT, no GET!

router.delete('/quizes/:quizId(\\d+)',		sesionControler.loginRequerido ,quizControler.destroy);//es delete , no GET!, gracias a methosdoverride y al parametro _method= delete en la query


router.get('/quizes/:quizId(\\d+)/comments/new',commentControler.new);
router.post('/quizes/:quizId(\\d+)/comments',	commentControler.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sesionControler.loginRequerido ,commentControler.publish);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LeoQuiz',errors:[] });
});

module.exports = router;