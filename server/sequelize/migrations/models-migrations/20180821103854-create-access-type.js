module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('accessType', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		accessLevel: {
			type: Sequelize.STRING
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
	down: queryInterface => queryInterface.dropTable('accessType')
};
