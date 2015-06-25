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


//formulario de creacion de preguntas
exports.new = function(req, res) {
	var miQuiz = modelo.Quiz.build({pregunta:"Pregunta",respuesta:"Respuesta"});//crea unos valores genericos temporales.Solo se usa para pasar info
	res.render('quizes/new', { quiz: miQuiz });
};


//accion de creacion de la pregunta en BBDD
exports.create = function(req, res) {
	var miQuiz = modelo.Quiz.build(req.body.quiz);//build crea un objeto No persistente asociado a la tabla modelo.Quiz
	miQuiz.save({fields:["pregunta","respuesta"]}).then(function (){//commit del objeto pero solo de los campos indicados.Evita sqlInyect
		res.redirect('/quizes');//redireccion a lista de preguntas con la nueva ya metida
	});
};