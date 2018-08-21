
module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('dataset', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		data: {
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
	down: (queryInterface) => queryInterface.dropTable('dataset')
};
