const Sequelize = require('sequelize');
const sequelize = require('../../../../db/connection');

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
