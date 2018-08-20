const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const GroupProject = sequelize.define('groupProject', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	accessLevelId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

GroupProject.sync();

module.exports = GroupProject;
