module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('groupProjects', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		groupId: {
			type: Sequelize.INTEGER
		},
		projectId: {
			type: Sequelize.INTEGER
		},
		accessLevelId: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			allowNull: false,
			type: Sequelize.DATE
		},
		updatedAt: {
			allowNull: false,
			type: Sequelize.DATE
		}
	}),
	down: queryInterface => queryInterface.dropTable('groupProjects')
};
