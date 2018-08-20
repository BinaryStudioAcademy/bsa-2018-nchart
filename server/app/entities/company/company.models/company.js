const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const CompanyUser = require('./company_user');
const Group = require('../../group/group.models/group');

const Company = sequelize.define('company', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Company.sync().then(() => {
	CompanyUser.sync().then(() => {
		Company.hasMany(CompanyUser, {
			foreignKey: 'companyId',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: false
		});
	});
	CompanyUser.belongsTo(Company, { foreignKey: 'companyId' });
	Group.sync().then(() => {
		Company.hasMany(Group, {
			foreignKey: 'companyId',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: false
		});
	});
	Group.belongsTo(Company, { foreignKey: 'companyId' });
});

module.exports = Company;
