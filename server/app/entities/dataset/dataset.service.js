const async = require('async');
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

	upsert(obj) {
		// todo: remove waterfall model
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.DatasetRepository.upsertMulti(obj)
							.then(() => {
								// todo: seems to be always success, add schema error handling
								// return [[true][false]]
								callback(null, obj);
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
