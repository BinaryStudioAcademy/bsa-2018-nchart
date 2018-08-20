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

	handleDataset(obj) {
		const objsToCreate = [];
		const objToUpdate = [];
		obj.forEach(element => {
			if (element.id === null) {
				const correctObj = Object.assign({}, element);
				delete correctObj.id;
				objsToCreate.push(correctObj);
			} else objToUpdate.push(element);
		});
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.DatasetRepository.saveMult(objsToCreate)
							.then(data => {
								callback(null, {
									saved: data
								});
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						this.DatasetRepository.updateMult(objToUpdate).then(
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

module.exports = new DatasetService();
