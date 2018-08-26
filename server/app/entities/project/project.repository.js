const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');
const projectChartModel = require('./project.models/project_chart');
const TransactionService = require('../../common/services/db-transaction.service');
const chartModel = require('../chart/chart.model');

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
		return this.projectChartModel.findAll(
			{
				where: { projectId: id },
				attributes: ['projectId', 'chartId'],
				include: [chartModel, projectModel]
			},
			{ exclude: ['id'] }
		);
	}
}

module.exports = new ProjectRepository();
