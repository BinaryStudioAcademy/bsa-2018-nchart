const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const ProjectChart = sequelize.define('projectChart', {
	chartId: {
		type: Sequelize.INTEGER
	},
	projectId: {
		type: Sequelize.INTEGER
	}
});

// this method creates table if it doesn't exit
ProjectChart.sync();

module.exports = ProjectChart;
