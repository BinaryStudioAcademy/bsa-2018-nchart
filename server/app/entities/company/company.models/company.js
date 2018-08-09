const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const CompanyUser = require('./company_user');

const Company = sequelize.define('company', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Company.sync().then(() => {
	CompanyUser.sync();
	Company.hasMany(CompanyUser, {
		foreignKey: 'companyId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	});
});

module.exports = Company;
