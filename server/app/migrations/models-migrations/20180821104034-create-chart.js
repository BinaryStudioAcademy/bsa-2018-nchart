module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('charts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			chartTypeId: {
				type: Sequelize.INTEGER
			},
			userSettings: {
				type: Sequelize.JSON
			},
			datasetId: {
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
	down: queryInterface => queryInterface.dropTable('charts')
};
