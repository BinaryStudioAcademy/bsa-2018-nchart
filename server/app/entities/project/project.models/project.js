const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const Project = sequelize.define('project', {
	name: {
		type: Sequelize.STRING
	}
});

// this method creates table if it doesn't exit
Project.sync();

module.exports = Project;
