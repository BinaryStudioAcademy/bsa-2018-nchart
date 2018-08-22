module.exports = (sequelize, DataTypes) => {
	const Dataset = sequelize.define(
		'Dataset',
		{
			data: DataTypes.JSON,
			columns: DataTypes.JSON
		},
		{}
	);
	// Dataset.associate = function(models) {
	//   // associations can be defined here
	// };
	return Dataset;
};
