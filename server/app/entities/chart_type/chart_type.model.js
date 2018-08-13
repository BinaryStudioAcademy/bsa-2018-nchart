const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

const ChartType = sequelize.define('chartType', {
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	dimension_settings: {
		type: Sequelize.JSON,
		allowNull: false
	},
	customize_settings: {
		type: Sequelize.JSON,
		allowNull: false
	}
});
// this method creates table if it doesn't exit
ChartType.sync();

module.exports = ChartType;
