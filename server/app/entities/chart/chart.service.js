const async = require('async');
const ChartRepository = require('./chart.repository');
const validator = require('../../common/services/schema-validation.service');
const chartSchema = require('./chart.schema');

class ChartService {
	constructor() {
		this.ChartRepository = ChartRepository;
	}

	getAll() {
		return this.ChartRepository.getAll();
	}

	getById(id) {
		return this.ChartRepository.getById(id);
	}

	upsert(obj) {
		// todo: remove waterfall model
		const errors = [];
		obj.forEach(el => {
			const response = validator(el, chartSchema);
			if (response !== null) {
				response.forEach(err => errors.push(err));
			}
		});
		if (errors.length > 0) {
			throw errors;
		}
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ChartRepository.upsert(obj)
							.then(() => {
								callback(null, obj);
							})
							.catch(err => {
								callback(err, null);
							});
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

module.exports = new ChartService();
