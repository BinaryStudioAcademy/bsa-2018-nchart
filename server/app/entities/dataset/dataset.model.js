const Sequelize = require('sequelize');
const sequelize = require('../../config/index');
const Chart = require('../chart/chart.model');

const Dataset = sequelize.define('dataset', {
	data: {
		type: Sequelize.JSON,
		allowNull: false
	},
	columns: {
		type: Sequelize.JSON,
		allowNull: false
	}
});

Dataset.sync().then(() => {
	Chart.sync().then(() => Dataset.hasMany(Chart, {
		foreignKey: 'datasetId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	}));
	Chart.belongsTo(Dataset, { foreignKey: 'datasetId' });
});

module.exports = Dataset;
