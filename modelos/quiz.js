module.exports = function(sequelize,DataTypes){

	return sequelize.define('tablaquiz',
							{
								pregunta:{
											type:DataTypes.STRING,
											validate:{notEmpty:{msg:"-> Falta Pregunta"}}
										},//validaciones para los valores del campo.hay muchas mas en sequelize
								respuesta:{
											type:DataTypes.STRING,
											validate:{notEmpty:{msg:"-> Falta Respuesta"}}
										},
								tema:{
											type:DataTypes.STRING,
											validate:{notEmpty:{msg:"-> Falta tema"}}
										}
							});
};