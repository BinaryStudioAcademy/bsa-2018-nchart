const Repository = require('../../common/repository/repository');
const chartModel = require('./chart.model');
const TransactionService = require('../../common/services/db-transaction.service');

class ChartRepository extends Repository {
	constructor() {
		super();
		this.model = chartModel;
	}

	getAll() {
		return this.model.findAll({
			attributes: [
				'id',
				'chartTypeId',
				'dimensionSettings',
				'customizeSettings',
				'datasetId',
				'createdAt'
			]
		});
	}

	upsertMult(obj) {
		this.model = chartModel;
		return TransactionService(obj, this.model, 'upsert');
	}

	saveMult(obj) {
		this.model = chartModel;
		return TransactionService(obj, this.model, 'create');
	}
}

module.exports = new ChartRepository();
