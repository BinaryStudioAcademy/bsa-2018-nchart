const async = require('async');
const _ = require('lodash');
const ProjectRepository = require('./project.repository');
const DatasetService = require('../dataset/dataset.service');
const ChartService = require('../chart/chart.service');
const GroupService = require('../group/group.service');
const ExportService = require('../../common/services/export.services/export.service');
// todo: wrong

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
		this.ExportService = ExportService;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	upsertProjectCharts(objs) {
		return this.ProjectRepository.upsertProjectCharts(objs);
	}

	createProject(obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						if (obj.project.id) {
							this.ProjectRepository.upsert(obj.project)
								.then(() => callback(null, {
									project: {
										id: obj.project.id,
										name: obj.project.name
									}
								}))
								.catch(err => callback(err, null));
						} else {
							this.ProjectRepository.create(obj.project.name)
								.then(data => {
									callback(null, {
										project: {
											id: data.dataValues.id,
											name: data.dataValues.name
										}
									});
								})
								.catch(err => callback(err, null));
						}
					},
					(payload, callback) => {
						DatasetService.upsert(obj.project.datasets)
							.then(data => {
								callback(
									null,
									Object.assign(payload.project, {
										datasets: data
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						ChartService.upsert(obj.project.charts)
							.then(data => {
								callback(
									null,
									Object.assign({}, payload, {
										charts: data
									})
								);
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						const projectCharts = [];
						payload.charts.forEach(el => {
							projectCharts.push({
								chartId: el.id,
								projectId: payload.id
							});
						});
						this.upsertProjectCharts(projectCharts)
							.then(() => {
								callback(null, payload);
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

	handleProject(obj, res) {
		if (obj.project && !obj.groupId) {
			return this.createProject(obj);
		}
		// obj.groupId, res.locals.user
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						// todo: ask if this correct way to check
						GroupService.findOneByQuery({
							groupId: obj.groupId,
							userId: res.locals.user.id
						})
							.then(data => {
								if (data !== null) {
									return callback(null);
								}
								throw new Error(
									'Group with such user does not exist'
								);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					callback => {
						this.createProject(obj)
							.then(data => {
								callback(null, data);
							})
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						GroupService.saveGroupProject({
							groupId: obj.groupId,
							projectId: payload.id,
							// todo: where does this come from
							accessLevelId: 1
						})
							.then(() => {
								callback(null, payload);
							})
							.catch(() => callback(null, payload));
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

	getFullProject(id) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.getProjectAndCharts(id)
							.then(data => {
								// todo: handle error here
								callback(null, data);
							})
							.catch(err => callback(err, null));
					},
					(data, callback) => {
						const datasetIds = [];
						const charts = [];
						data.forEach(el => {
							// todo: do it in sequelize // don't no how
							charts.push(
								_.omit(el.chart.dataValues, [
									'createdAt',
									'updatedAt'
								])
							);
							datasetIds.push(el.chart.datasetId);
						});
						DatasetService.getAllById(datasetIds)
							.then(datasets => {
								const datasetsPayload = [];
								datasets.forEach(el => {
									// todo: do it in sequelize // don't no how
									datasetsPayload.push(
										_.omit(el.dataValues, [
											'createdAt',
											'updatedAt'
										])
									);
								});
								return callback(null, {
									id: data[0].project.id,
									name: data[0].project.name,
									charts,
									datasets: datasetsPayload
								});
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						reject(err);
					}
					resolve(payload);
				}
			);
		});
	}

	export(id, type) {
		return this.ExportService.getFile(id, type);
	}
}

module.exports = new ProjectService();
