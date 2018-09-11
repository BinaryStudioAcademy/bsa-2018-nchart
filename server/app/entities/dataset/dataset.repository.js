const Repository = require('../../common/repository/repository');
const datasetModel = require('./dataset.model');
const TransactionService = require('../../common/services/db-transaction.service');

class DatasetRepository extends Repository {
	constructor() {
		super();
		this.model = datasetModel;
	}

	upsertMulti(obj) {
		this.model = datasetModel;
		return TransactionService(obj, this.model, 'upsert');
	}

	getAllById(ids) {
		return this.model.findAll({ where: { id: ids } });
	}

	getSamples() {
		return this.model.findAll({
			attributes: {
				exclude: ['createdAt', 'updatedAt', 'columns', 'data', 'sample']
			},
			where: { sample: true }
		});
	}
}

module.exports = new DatasetRepository();
