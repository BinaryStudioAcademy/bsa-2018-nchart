module.exports = {
	up: (queryInterface, Sequelize) => Promise.all([
		queryInterface.dropTable('users'),
		queryInterface.createTable('users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					is: { args: /^[a-zа-яэіїє]+$/i, msg: 'Not valid name' }
				}
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: { msg: 'Not valid email' }
				}
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			defaultGroupId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	]),
	// down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
	down: queryInterface => queryInterface.dropTable('users')
};
