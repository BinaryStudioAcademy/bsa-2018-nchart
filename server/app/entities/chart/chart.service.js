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
								const payload = [];
								data.forEach(el => {
									const payloadEl = this.createChartPayload(el);
									payload.push(payloadEl);
								});
								callback(null, payload);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(saved, callback) => {
						this.ChartRepository.updateMult(objToUpdate).then(() => {
							const payload = saved.concat(objToUpdate);
							callback(
								null,
								payload
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

	createChartPayload(data) {
		this.payload = {
			id: data.id,
			chartTypeId: data.chartTypeId,
			dimensionSettings: data.dimensionSettings,
			customizeSettings: data.customizeSettings,
			datasetId: data.datasetId
		};
		return this.payload;
	}
}

module.exports = new ChartService();
