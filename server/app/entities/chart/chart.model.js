const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

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

// this method creates table if it doesn't exit
Chart.sync();

module.exports = Chart;
