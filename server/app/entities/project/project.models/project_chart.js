const Sequelize = require('sequelize');
const sequelize = require('../../../../db/connection');

const ProjectChart = sequelize.define('projectCharts', {
	chartId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	}
});

// this method creates table if it doesn't exit
ProjectChart.sync();

module.exports = ProjectChart;
