const Sequelize = require('sequelize');
const sequelize = require('../../config/index');
const CompanyUser = require('../company/company.models/company_user');
const GroupUser = require('../group/group.models/group_user');

const User = sequelize.define('users', {
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z ]+$/, msg: 'Not valid name' }
		}
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			is: { args: /^[a-zA-Z ]+$/, msg: 'Not valid surname' }
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
