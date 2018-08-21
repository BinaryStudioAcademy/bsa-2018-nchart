
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('projectCharts', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		chartId: {
			type: Sequelize.INTEGER
		},
		projectId: {
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
	down: (queryInterface) => queryInterface.dropTable('projectCharts')
};
