const Repository = require('../../common/repository/repository');
const chartModel = require('./chart.model');
const TransactionService = require('../../common/services/db.transaction.service');

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

	updateMult(obj) {
		this.model = chartModel;
		return TransactionService(obj, this.model, 'update');
	}

	saveMult(obj) {
		this.model = chartModel;
		return TransactionService(obj, this.model, 'save');
	}

	create(obj) {
		return this.model.create(obj);
	}
}

module.exports = new ChartRepository();
