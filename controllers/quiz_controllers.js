var modelo = require('../modelos/modelo.js');


//get /quizes/:id
exports.index = function(req, res) {
	modelo.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes: quizes});
	});
};


//get /quizes/:id
exports.show = function(req, res) {
	modelo.Quiz.findById(req.params.quizId).then(function(miQuiz){
		res.render('quizes/show', { quiz: miQuiz});
	});
};


//get /quizes/:id/answer
exports.answer = function(req, res) {
	modelo.Quiz.findById(req.params.quizId).then(function(miQuiz){
		if (req.query.respuesta === miQuiz.respuesta){
			res.render('quizes/answer', { respuesta: 'Correcto'});
		}else{
			res.render('quizes/answer', { respuesta: 'incorrecto'});
		}
	});
};