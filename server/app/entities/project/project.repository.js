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

	getProjectAndCharts(id) {
		return this.projectModel.findOne(
			{
				where: { id },
				attributes: ['id', 'name'],
				include: [
					{
						model: projectChartModel,
						attributes: ['chartId'],
						include: [{
							model: chartModel,
							attributes: ['id', 'chartTypeId', 'datasetId', 'dimensionSettings', 'customizeSettings'],
							include: [
								{
									model: datasetModel,
									attributes: ['id', 'data', 'columns']
								}
							]
						}]
					}
				]
			}
		);
	}

	queryTest(id) {
		return this.projectChartModel.findAll(
			{
				where: { projectId: id },
				attributes: ['projectId', 'chartId'],
				include: [
					{
						model: chartModel,
						include: [{
							model: datasetModel
						}]
					},
					projectModel
				]
			}
		);
	}
}

module.exports = new ProjectRepository();
