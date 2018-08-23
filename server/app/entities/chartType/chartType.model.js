const Sequelize = require('sequelize');
const sequelize = require('../../../config/index');
const CompanyChartType = require('../company/company.models/company_chart_type');
const Chart = require('../chart/chart.model');

const ChartType = sequelize.define('chartTypes', {
	type: {
		type: Sequelize.STRING,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	sysName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false
	},
	dimensionSettings: {
		type: Sequelize.JSON,
		allowNull: false
	},
	customizeSettings: {
		type: Sequelize.JSON,
		allowNull: false
	}
});

ChartType.sync().then(() => {
	CompanyChartType.sync().then(() =>
		ChartType.hasMany(CompanyChartType, {
			foreignKey: 'chartTypeId',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: false
		})
	);
	CompanyChartType.belongsTo(ChartType, { foreignKey: 'chartTypeId' });
	Chart.sync().then(() => {
		ChartType.hasMany(Chart, {
			foreignKey: 'typeId',
			sourceKey: 'id',
			onDelete: 'CASCADE',
			constraints: false
		});
	});
	Chart.belongsTo(ChartType, { foreignKey: 'typeId' });
});

module.exports = ChartType;
