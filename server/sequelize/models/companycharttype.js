
module.exports = (sequelize, DataTypes) => {
	const CompanyChartType = sequelize.define('CompanyChartType', {
		companyId: DataTypes.INTEGER,
		chartTypeId: DataTypes.INTEGER
	}, {});
	// CompanyChartType.associate = function(models) {
	//   // associations can be defined here
	// };
	return CompanyChartType;
};
