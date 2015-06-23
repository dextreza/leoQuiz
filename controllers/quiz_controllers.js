var modelo = require('../modelos/modelo.js');

exports.question = function(req, res) {
	modelo.Quiz.findAll().then(function(miQuiz){
		res.render('quizes/question', { pregunta: miQuiz[0].pregunta});
	});
};

exports.answer = function(req, res) {
	modelo.Quiz.findAll().then(function(miQuiz){
		if (req.query.respuesta === miQuiz[0].respuesta){
			res.render('quizes/answer', { respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer', { respuesta: 'incorrecto'});
		}
	});
};