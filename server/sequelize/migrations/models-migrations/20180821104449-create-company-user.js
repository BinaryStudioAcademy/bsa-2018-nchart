
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('companyUser', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		userId: {
			type: Sequelize.INTEGER
		},
		companyId: {
			type: Sequelize.INTEGER
		},
		isAdmin: {
			type: Sequelize.BOOLEAN
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
	down: (queryInterface) => queryInterface.dropTable('companyUser')
};
