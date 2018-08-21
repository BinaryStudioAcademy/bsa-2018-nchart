
module.exports = (sequelize, DataTypes) => {
	const Company = sequelize.define('Company', {
		name: DataTypes.STRING
	}, {});
	// Company.associate = function(models) {
	//   // associations can be defined here
	// };
	return Company;
};
