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

	handleDataset(obj) {
		const objsToCreate = [];
		const objToUpdate = [];
		obj.forEach(element => {
			if (element.id === null) {
				objsToCreate.push(element);
			} else objToUpdate.push(element);
		});
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ChartRepository.save(objsToCreate)
							.then(data => {
								callback(null, {
									saved: data
								});
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						this.ChartRepository.update(objToUpdate).then(
							data => {
								callback(
									null,
									Object.assign({}, payload, {
										updated: data
									})
								);
							}
						);
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
