module.exports = (sequelize, DataTypes) => {
	const ChartType = sequelize.define(
		'ChartType',
		{
			type: DataTypes.STRING,
			name: DataTypes.STRING,
			sysName: DataTypes.STRING,
			description: DataTypes.STRING,
			dimensionSettings: DataTypes.JSON,
			customizeSettings: DataTypes.JSON
		},
		{}
	);
	// ChartType.associate = function(models) {
	//   // associations can be defined here
	// };
	return ChartType;
};
