
module.exports = (sequelize, DataTypes) => {
	const Chart = sequelize.define('Chart', {
		chartTypeId: DataTypes.INTEGER,
		dimensionSettings: DataTypes.JSON,
		customizeSettings: DataTypes.JSON,
		datasetId: DataTypes.INTEGER
	}, {});
	// Chart.associate = function (models) {
	//     // associations can be defined here
	// };
	return Chart;
};
