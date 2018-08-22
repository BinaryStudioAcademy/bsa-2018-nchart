const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const ProjectChart = require('../project/project.models/project_chart');

const Chart = sequelize.define('charts', {
	chartTypeId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	dimensionSettings: {
		type: Sequelize.JSON,
		allowNull: false
	},
	customizeSettings: {
		type: Sequelize.JSON,
		allowNull: false
	},
	datasetId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

Chart.sync().then(() => {
	ProjectChart.sync().then(() => Chart.hasMany(ProjectChart, {
		foreignKey: 'chartTypeId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	}));
	ProjectChart.belongsTo(Chart, { foreignKey: 'chartTypeId' });
});

module.exports = Chart;
