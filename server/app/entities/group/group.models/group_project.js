const Sequelize = require('sequelize');
const sequelize = require('../../../../db/connection');

const GroupProject = sequelize.define('groupProjects', {
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
