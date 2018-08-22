module.exports = (sequelize, DataTypes) => {
	const GroupProject = sequelize.define(
		'GroupProject',
		{
			groupId: DataTypes.INTEGER,
			projectId: DataTypes.INTEGER,
			accessLevelId: DataTypes.INTEGER
		},
		{}
	);
	// GroupProject.associate = function(models) {
	//   // associations can be defined here
	// };
	return GroupProject;
};
