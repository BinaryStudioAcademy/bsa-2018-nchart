const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

const Dataset = sequelize.define('dataset', {
	data: {
		type: Sequelize.JSON
	}
});

// this method creates table if it doesn't exit
Dataset.sync();

module.exports = Dataset;
