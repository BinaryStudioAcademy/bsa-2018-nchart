const Sequelize = require('sequelize');
const sequelize = require('../../config/index');

const GroupUser = sequelize.define('groupUser', {
	groupId: {
		type: Sequelize.INTEGER
	},
	userId: {
		type: Sequelize.INTEGER
	}
});

module.exports = GroupUser;
