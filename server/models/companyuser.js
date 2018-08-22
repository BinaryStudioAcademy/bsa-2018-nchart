module.exports = (sequelize, DataTypes) => {
	const CompanyUser = sequelize.define(
		'CompanyUser',
		{
			userId: DataTypes.INTEGER,
			companyId: DataTypes.INTEGER,
			isAdmin: DataTypes.BOOLEAN
		},
		{}
	);
	// CompanyUser.associate = function(models) {
	//   // associations can be defined here
	// };
	return CompanyUser;
};
