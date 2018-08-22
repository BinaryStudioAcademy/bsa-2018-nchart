module.exports = (sequelize, DataTypes) => {
	const AccessType = sequelize.define(
		'AccessType',
		{
			accessLevel: DataTypes.STRING
		},
		{}
	);
	// AccessType.associate = function(models) {
	//   // associations can be defined here
	// };
	return AccessType;
};
