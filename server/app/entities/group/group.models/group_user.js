const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const GroupUser = sequelize.define('groupUser', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = GroupUser;
