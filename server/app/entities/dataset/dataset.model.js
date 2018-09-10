const Sequelize = require('sequelize');
const sequelize = require('../../../db/connection');
const Chart = require('../chart/chart.model');

const Dataset = sequelize.define('datasets', {
	id: {
		type: Sequelize.STRING,
		allowNull: false,
		primaryKey: true
	},
	data: {
		type: Sequelize.JSON,
		allowNull: false
	},
	columns: {
		type: Sequelize.JSON,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: true
	},
	sample: {
		type: Sequelize.BOOLEAN,
		allowNull: true
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
