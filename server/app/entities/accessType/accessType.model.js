const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

const AccessType = sequelize.define('accessType', {
	accessLevel: {
		type: Sequelize.STRING
	}
});

// this method creates table if it doesn't exit
AccessType.sync();

module.exports = AccessType;
