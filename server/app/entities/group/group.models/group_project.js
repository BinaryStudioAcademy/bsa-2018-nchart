const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const GroupProject = sequelize.define('groupProject', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	accessLevelId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

// this method creates table if it doesn't exit
GroupProject.sync();

module.exports = GroupProject;
