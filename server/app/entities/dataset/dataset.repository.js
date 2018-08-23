const Repository = require('../../common/repository/repository');
const datasetModel = require('./dataset.model');
const TransactionService = require('../../common/services/db-transaction.service');

class DatasetRepository extends Repository {
	constructor() {
		super();
		this.model = datasetModel;
	}

	updateMult(obj) {
		this.model = datasetModel;
		return TransactionService(obj, this.model, 'update');
	}

	saveMult(obj) {
		this.model = datasetModel;
		return TransactionService(obj, this.model, 'save');
	}
}

module.exports = new DatasetRepository();
