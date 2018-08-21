
module.exports = (sequelize, DataTypes) => {
	const ProjectChart = sequelize.define('ProjectChart', {
		chartId: DataTypes.INTEGER,
		projectId: DataTypes.INTEGER
	}, {});
	// ProjectChart.associate = function(models) {
	//   // associations can be defined here
	// };
	return ProjectChart;
};
