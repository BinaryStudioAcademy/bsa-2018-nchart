module.exports = (sequelize, DataTypes) => {
	const GroupUser = sequelize.define(
		'GroupUser',
		{
			groupId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			userId: {
				type: DataTypes.INTEGER,
				primaryKey: true
			}
		},
		{}
	);
	// GroupUser.associate = function (models) {
	//     // associations can be defined here
	// };
	return GroupUser;
};
