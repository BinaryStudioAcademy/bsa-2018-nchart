const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const ProjectChart = sequelize.define('projectCharts', {
	chartId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

// this method creates table if it doesn't exit
ProjectChart.sync();

module.exports = ProjectChart;
