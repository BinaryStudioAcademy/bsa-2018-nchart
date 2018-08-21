const async = require('async');
const ChartRepository = require('./chart.repository');

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
