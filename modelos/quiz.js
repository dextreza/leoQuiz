module.exports = function(sequelize,DataTypes){

	return sequelize.define('tablaquiz',
							{pregunta:DataTypes.STRING,
							respuesta:DataTypes.STRING});
};