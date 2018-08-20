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

	handleCharts(obj) {
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
						this.ChartRepository.saveMult(objsToCreate)
							.then(data => {
								callback(null, {
									saved: data
								});
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(payload, callback) => {
						this.ChartRepository.updateMult(objToUpdate).then(data => {
							callback(
								null,
								Object.assign({}, payload, {
									updated: data
								})
							);
						}).catch(err => {
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

	/*
	createMult(arr){
        const promises = [];
		for(let i = 0;i<arr.length;i++){
            const newPromise = this.ChartRepository.createMult(arr[i]);
            promises.push(newPromise);
		}
		return Promise.all(promises);
	}
	 */
}

module.exports = new ChartService();
