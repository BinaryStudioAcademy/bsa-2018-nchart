const async = require('async');
const _ = require('lodash');
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
		const objsToCreate = [];
		const objToUpdate = [];
		obj.forEach(element => {
			if (element.id === null) {
				objsToCreate.push(_.omit(element, 'id'));
			} else objToUpdate.push(element);
		});
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ChartRepository.saveMult(objsToCreate)
							.then(data => {
								callback(null, this.createChartsPayload(data));
							})
							.catch(err => {
								callback(err, null);
							});
					},
					(data, callback) => {
						const payload = data.concat(objToUpdate);
						this.ChartRepository.upsertMult(objToUpdate).then(() => {
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

	createChartsPayload(objs) {
		this.charts = [];
		objs.forEach(el => {
			this.charts.push({
				id: el.id,
				chartTypeId: el.chartTypeId,
				datasetId: el.datasetId,
				dimensionSettings: el.dimensionSettings,
				customizeSettings: el.customizeSettings
			});
		});
		return this.charts;
	}
}

module.exports = new ChartService();
