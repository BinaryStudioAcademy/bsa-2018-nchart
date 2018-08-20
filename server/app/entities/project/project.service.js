const async = require('async');
const ProjectRepository = require('./project.repository');
const DatasetService = require('../dataset/dataset.service');
const ChartService = require('../chart/chart.service');
const TokenService = require('../../common/services/token.service');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	handleProject(obj, token) {
		TokenService.verifyToken(token).then(data => data);
		if (obj.project && !(obj.groupId)) {
			return new Promise((resolve, reject) => {
				async.waterfall(
					[
						callback => {
							this.ProjectRepository.handleProjectReq(obj.project)
								.then(data => {
									callback(null, {
										project: data
									});
								})
								.catch(err => callback(err, null));
						},
						(payload, callback) => {
							DatasetService.handleDataset(obj.project.datasets)
								.then(data => {
									callback(null, Object.assign({}, payload, {
										datasets: data
									}));
								})
								.catch(err => callback(err, null));
						},
						(payload, callback) => {
							ChartService.handleCharts(obj.project.charts)
								.then(data => {
									callback(null, Object.assign({}, payload, {
										charts: data
									}));
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
		} return false;
	}
}

module.exports = new ProjectService();
