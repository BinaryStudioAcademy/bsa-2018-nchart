

module.exports = {
	// up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
	up: (queryInterface) => queryInterface.bulkInsert('users', [{
		id: 1,
		name: 'Vasili',
		password: 'admin',
		email: 'demo@demo.com',
		defaultGroup: 1,
		createdAt: '21/08/2018',
		updatedAt: '21/08/2018'
	}], {}),

	// down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
	down: (queryInterface) => queryInterface.bulkDelete('users', null, {})
};
