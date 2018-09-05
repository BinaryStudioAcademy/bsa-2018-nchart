const Sequelize = require('sequelize');
const sequelize = require('../../../../db/connection');
const ProjectChart = require('./project_chart');
const GroupProject = require('../../group/group.models/group_project');

const Project = sequelize.define('projects', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Project.sync().then(() => {
	ProjectChart.sync().then(() =>
		Project.hasMany(ProjectChart, {
			foreignKey: 'projectId',
			sourceKey: 'id',
			onDelete: 'CASCADE'
			// constraints: false
		})
	);
	ProjectChart.belongsTo(Project, {
		foreignKey: 'projectId',
		onDelete: 'CASCADE',
		hooks: true
	});
	GroupProject.sync().then(() => {
		Project.hasMany(GroupProject, {
			foreignKey: 'projectId',
			sourceKey: 'id',
			onDelete: 'CASCADE'
			// constraints: false
		});
	});
	GroupProject.belongsTo(Project, {
		foreignKey: 'projectId',
		onDelete: 'CASCADE',
		hooks: true
	});
});

module.exports = Project;
