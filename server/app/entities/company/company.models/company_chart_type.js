const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');

const CompanyChartType = sequelize.define('companyChartType', {
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
