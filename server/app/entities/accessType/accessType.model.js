const Sequelize = require('sequelize');
const sequelize = require('../../config/index');
const GroupGpoject = require('../group/group.models/group_project');

const AccessType = sequelize.define('accessType', {
	accessLevel: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

AccessType.sync().then(() => {
	GroupGpoject.sync().then(() => AccessType.hasMany(GroupGpoject, {
		foreignKey: 'accessLevelId',
		sourceKey: 'id',
		onDelete: 'CASCADE',
		constraints: false
	}));
	GroupGpoject.belongsTo(AccessType, { foreignKey: 'accessLevelId' });
});

module.exports = AccessType;
