const Sequelize = require('sequelize');
const sequelize = require('../../config/index');
const ProjectChart = require('../project/project.models/project_chart');

const Chart = sequelize.define('chart', {
	typeId: {
		type: Sequelize.INTEGER
	},
	userSettings: {
		type: Sequelize.JSON
	},
	datasetId: {
		type: Sequelize.INTEGER
	}
});

Chart.sync().then(() => {
    ProjectChart.sync().then(() => Chart.hasMany(ProjectChart, {
        foreignKey: 'chartId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        constraints: false
    }));
    ProjectChart.belongsTo(Chart, { foreignKey: 'chartId' });
});

module.exports = Chart;
