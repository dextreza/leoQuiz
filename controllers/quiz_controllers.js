var modelo = require('../modelos/modelo.js');

//autoload - busca el id que se pide en  bbdd y si esta lo pasa al req.EOC error
exports.load = function(req, res, next,quizId) {
	modelo.Quiz.findById(quizId).then(function(miQuiz){
		if (miQuiz){
			 req.quiz = miQuiz;
			 next();//para que continue el flujo
		}else{
			next (new Error('No existe la pregunta solicitada:' +  quizId));
		}
	}).catch(function(error){next(error)});
};


exports.index = function(req, res) {
	
	if (req.query.search){
		modelo.Quiz.findAll({where: ["pregunta like ?", '%' + req.query.search.split(' ').join('%') + '%']}).then(function(quizes){
				res.render('quizes/index', { quizes: quizes});
			}).catch(function(error){next(error)});
	}else{
		modelo.Quiz.findAll().then(function(quizes){
				res.render('quizes/index', { quizes: quizes});
			}).catch(function(error){next(error)});
	}
};


//get /quizes/:id
exports.show = function(req, res) {
	modelo.Quiz.findById(req.params.quizId).then(function(miQuiz){
		res.render('quizes/show', { quiz: miQuiz});
	});
};


//get /quizes/:id/answer
exports.answer = function(req, res) {
	if (req.query.respuesta === req.quiz.respuesta){
		res.render('quizes/answer', { quiz: req.quiz,respuesta: 'Correcto'});
	}else{
		res.render('quizes/answer', { quiz: req.quiz,respuesta: 'incorrecto'});
	}
};