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

	getSamples() {
		return new Promise((resolve, reject) => {
			this.DatasetRepository.getSamples()
				.then(res => {
					res.forEach(element => {
						element.dataValues = _.omit(element.dataValues, [
							'data',
							'columns',
							'createdAt',
							'updatedAt',
							'sample'
						]);
					});
					return resolve(res);
				})
				.catch(err => reject(err));
		});
		// return this.DatasetRepository.getSamples();
	}
}

module.exports = new DatasetService();
