const async = require('async');
const _ = require('lodash');
const DatasetRepository = require('./dataset.repository');

class DatasetService {
	constructor() {
		this.DatasetRepository = DatasetRepository;
	}

	getAll() {
		return this.DatasetRepository.getAll();
	}

	getById(id) {
		return this.DatasetRepository.getById(id);
	}

	getAllById(ids) {
		return this.DatasetRepository.getAllById(ids);
	}

	upsert(obj) {
		const objCutted = obj.map(el => _.omit(el, ['sample']));
		// todo: remove waterfall model
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.DatasetRepository.upsertMulti(objCutted)
							.then(() => {
								// todo: seems to be always success, add schema error handling
								// return [[true][false]]
								callback(null, objCutted);
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					return resolve(payload);
				}
			);
		});
	}
}

module.exports = new DatasetService();
