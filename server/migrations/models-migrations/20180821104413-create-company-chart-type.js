module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('companyChartTypes', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		companyId: {
			type: Sequelize.INTEGER
		},
		chartTypeId: {
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
	down: queryInterface => queryInterface.dropTable('companyChartTypes')
};
