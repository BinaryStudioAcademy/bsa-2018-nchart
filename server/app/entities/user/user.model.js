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
	CompanyUser.sync().then(() =>
		User.hasMany(CompanyUser, {
			foreignKey: {
				name: 'userId',
				allowNull: false
			},
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: true
		})
	);
	GroupUser.sync().then(() => {
		User.hasMany(GroupUser, {
			foreignKey: {
				name: 'userId',
				allowNull: false
			},
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: true
		});
	});
});

module.exports = User;
