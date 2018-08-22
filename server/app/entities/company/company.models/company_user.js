const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const CompanyUser = sequelize.define('companyUser', {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	companyId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});

CompanyUser.sync();

module.exports = CompanyUser;
