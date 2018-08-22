module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('chartTypes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			type: {
				type: Sequelize.STRING
			},
			name: {
				type: Sequelize.STRING
			},
			sysName: {
				type: Sequelize.STRING
			},
			description: {
				type: Sequelize.STRING
			},
			dimensionSettings: {
				type: Sequelize.JSON
			},
			customizeSettings: {
				type: Sequelize.JSON
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
	down: queryInterface => queryInterface.dropTable('chartTypes')
};
