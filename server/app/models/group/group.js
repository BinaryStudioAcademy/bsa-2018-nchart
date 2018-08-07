const Sequelize = require('sequelize');
const sequelize = require('../../config/index');
const GroupUser = require('../../models/group/group_user');

const Group = sequelize.define('group', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

Group.sync().then(() => {
	GroupUser.sync();
	Group.hasMany(GroupUser, {
		foreignKey: 'groupId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	});
});

module.exports = Group;
