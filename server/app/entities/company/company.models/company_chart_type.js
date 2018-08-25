const Sequelize = require('sequelize');
const sequelize = require('../../../../db/connection');

const CompanyChartType = sequelize.define('companyChartTypes', {
	companyId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	chartTypeId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

// this method creates table if it doesn't exit
CompanyChartType.sync();

module.exports = CompanyChartType;
