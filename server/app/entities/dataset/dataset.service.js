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
								const payload = [];
								data.forEach(el => {
									const payloadEl = this.createDatasetPayload(el);
									payload.push(payloadEl);
								});
								callback(null, payload);
							})
							.catch(err => callback(err, null));
					},
					(saved, callback) => {
						this.DatasetRepository.updateMult(objToUpdate).then(
							() => {
								const payload = saved.concat(objToUpdate);
								callback(
									null,
									payload
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

	createDatasetPayload(data) {
		this.payload = {
			id: data.id,
			columns: data.columns,
			data: data.data
		};
		return this.payload;
	}
}

module.exports = new DatasetService();
