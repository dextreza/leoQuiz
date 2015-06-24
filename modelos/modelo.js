var moduloPath = require('path');

//cargar modelo ORM
var moduloSequelize = require('sequelize');

//usar bbdd sqlite
var sequelize = new moduloSequelize(null,null,null,{dialect:"sqlite",storage:"quiz.sqlite"});

//importar la definicion de la tabla tablaquiz en quiz.js
var Quiz = sequelize.import(moduloPath.join(__dirname,'quiz'));//quiz.js

exports.Quiz = Quiz;//exportar definicion de la tabla para que pueda ser exportada

sequelize.sync().then(

	function(){//crea e inicilaiza la tabla de preguntas

		Quiz.count().then(
			function(count){//da el numero de filas de la tabla
				if (count === 0){//la table se inicializa solo si esta vacia
					Quiz.create({pregunta:'Capital de Italia',respuesta:'Roma'});
					Quiz.create({pregunta:'Capital de Portugal',respuesta:'Lisboa'});
					Quiz.create({pregunta:'Capital de España',respuesta:'Madrid'}).then(function(){console.log('BBDD inicializada');});
				}
			}
		);
	}
);