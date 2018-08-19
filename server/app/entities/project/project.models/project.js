const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const ProjectChart = require('./project_chart');
const GroupProject = require('../../group/group.models/group_project');

const Project = sequelize.define('project', {
	name: {
		type: Sequelize.STRING
	}
});

Project.sync().then(() => {
    ProjectChart.sync().then(() => Project.hasMany(ProjectChart, {
        foreignKey: 'projectId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        constraints: false
    }));
    ProjectChart.belongsTo(Project, { foreignKey: 'projectId' });
    GroupProject.sync().then(() => {
        Project.hasMany(GroupProject, {
            foreignKey: 'projectId',
            sourceKey: 'id',
            onDelete: 'CASCADE',
            constraints: false
        });
    });
    GroupProject.belongsTo(Project, { foreignKey: 'projectId' });
});

module.exports = Project;
