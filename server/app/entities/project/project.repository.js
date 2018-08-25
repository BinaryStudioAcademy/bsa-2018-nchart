const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');
const projectChartModel = require('./project.models/project_chart');
const TransactionService = require('../../common/services/db-transaction.service');

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
}

module.exports = new ProjectRepository();
