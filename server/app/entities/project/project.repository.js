const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');
const projectChartModel = require('./project.models/project_chart');
const TransactionService = require('../../common/services/db-transaction.service');
const chartModel = require('../chart/chart.model');
const datasetModel = require('../dataset/dataset.model');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.projectModel = projectModel;
		this.projectChartModel = projectChartModel;
	}

	upsert(obj) {
		return this.projectModel.upsert({ id: obj.id, name: obj.name });
	}

	create(name) {
		return this.projectModel.create({ name });
	}

	upsertProjectCharts(objs) {
		return TransactionService(objs, this.projectChartModel, 'upsert');
	}

	// hardcode gettion project
	queryTest(id) {
		return this.projectChartModel
			.findAll({
				where: { projectId: id },
				attributes: ['projectId', 'chartId'],
				include: [chartModel, projectModel]
			})
			.then(data => {
				const datasetIds = [];
				const charts = [];
				data.forEach(el => {
					charts.push(el.chart.dataValues);
					datasetIds.push(el.chart.datasetId);
				});
				return datasetModel
					.findAll({ where: { id: datasetIds } })
					.then(datasets => {
						const datasetsPayload = [];
						datasets.forEach(el => {
							datasetsPayload.push(el.dataValues);
						});
						return {
							id: data[0].project.id,
							name: data[0].project.name,
							charts,
							datasets: datasetsPayload
						};
					});
			});
	}
}

module.exports = new ProjectRepository();
