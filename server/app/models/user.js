const Sequelize = require('sequelize');
const sequelize = require('../config/index');
const CompanyUser = require('./company/company_user');
const GroupUser = require('./group/group_user');

const User = sequelize.define('users', {
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

// this method creates table if it doesn't exit
User.sync().then(() => {
	CompanyUser.sync();
	return User.hasMany(CompanyUser, {
		foreignKey: 'userId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	});
});

User.sync().then(() => {
	GroupUser.sync();
	return User.hasMany(GroupUser, {
		foreignKey: 'user_id',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	});
});

module.exports = User;
