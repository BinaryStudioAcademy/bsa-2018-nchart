const async = require('async');
const ProjectRepository = require('./project.repository');
const DatasetService = require('../dataset/dataset.service');
const ChartService = require('../chart/chart.service');
const GroupService = require('../group/group.service');
const schemaValidationService = require('../../common/services/schema-validation.service');
const {
	fullProjectSchema
} = require('../project/project.schemas/projects.schema');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	createProject(obj) {
		const errors = schemaValidationService(obj.project, fullProjectSchema);
		if (errors !== null) {
			throw errors;
		}
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.upsert(obj.project)
							.then(() =>
								callback(null, {
									project: {
										id: obj.project.id,
										name: obj.project.name
									}
								})
							)
							.catch(err => callback(err, null));
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
							.carch(err => callback(err, null));
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
}

module.exports = new ProjectService();
