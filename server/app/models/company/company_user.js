const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

const CompanyUser = sequelize.define('companyUser', {
	userId: {
		type: Sequelize.INTEGER
	},
	companyId: {
		type: Sequelize.INTEGER
	},
	isAdmin: {
		type: Sequelize.BOOLEAN
	}
});

module.exports = CompanyUser;
