module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('groupUsers', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			groupId: {
				type: Sequelize.INTEGER
			},
			userId: {
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
	down: queryInterface => queryInterface.dropTable('groupUsers')
};
