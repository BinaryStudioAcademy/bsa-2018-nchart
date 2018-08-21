
module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define('Project', {
		name: DataTypes.STRING
	}, {});
	// Project.associate = function(models) {
	//   // associations can be defined here
	// };
	return Project;
};
