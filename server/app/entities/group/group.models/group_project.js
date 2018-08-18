const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const GroupProject = sequelize.define('groupProject', {
	groupId: {
		type: Sequelize.INTEGER
	},
	projectId: {
		type: Sequelize.INTEGER
	},
	accessLevelId: {
		type: Sequelize.INTEGER
	}
});

// this method creates table if it doesn't exit
GroupProject.sync();

module.exports = GroupProject;
