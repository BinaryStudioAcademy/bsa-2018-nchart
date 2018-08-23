const Sequelize = require('sequelize');
const sequelize = require('../../../../config/index');

const GroupUser = sequelize.define('groupUsers', {
	groupId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	defaultGroup: {
		type: Sequelize.BOOLEAN,
		allowNull: false
	}
});

GroupUser.sync();

module.exports = GroupUser;
