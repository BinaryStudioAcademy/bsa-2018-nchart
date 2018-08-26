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

	/*

        "id": 1,
        "name": "test4",
        "projectCharts": [
            {
                "chartId": 1,
                "chart": {
                    "id": 1,
                    "chartTypeId": 1,
                    "datasetId": "1",
                    "dimensionSettings": [
                        {
                            "id": 1,
                            "columnId": 1
                        },
                        {
                            "id": 2,
                            "columnId": 2
                        }
                    ],
                    "customizeSettings": [
                        {
                            "id": 1,
                            "value": 123,
                            "option": "lol",
                            "description": "desc desc"
                        },
                        {
                            "id": 2,
                            "value": 123,
                            "option": "lol",
                            "description": "desc desc"
                        }
                    ],
                    "dataset": {
                        "id": "1",
                        "data": [
                            [
                                1,
                                2
                            ],
                            [
                                "text",
                                "text"
                            ]
                        ],
                        "columns": [
                            {
                                "id": 1,
                                "title": "col1",
                                "type": "number"
                            },
                            {
                                "id": 2,
                                "title": "col2",
                                "type": "string"
                            }
                        ]
                    }
                }
            },
            {
                "chartId": 2,
                "chart": {
                    "id": 2,
                    "chartTypeId": 2,
                    "datasetId": "2",
                    "dimensionSettings": [
                        {
                            "id": 1,
                            "columnId": 1
                        },
                        {
                            "id": 2,
                            "columnId": 2
                        }
                    ],
                    "customizeSettings": [
                        {
                            "id": 1,
                            "value": 123,
                            "option": "lol",
                            "description": "desc desc"
                        },
                        {
                            "id": 2,
                            "value": 123,
                            "option": "lol",
                            "description": "desc desc"
                        }
                    ],
                    "dataset": {
                        "id": "2",
                        "data": [
                            [
                                1,
                                2
                            ],
                            [
                                "t11",
                                "t11"
                            ]
                        ],
                        "columns": [
                            {
                                "id": 1,
                                "title": "col1",
                                "type": "number"
                            },
                            {
                                "id": 2,
                                "title": "col2",
                                "type": "string"
                            }
                        ]
                    }
                }
            }
        ]

	 */

	getFullProject(id) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.getProjectAndCharts(id)
							.then(data => {
								const projectData = data.dataValues;
								const charts = [];
								const datasets = [];
								projectData.projectCharts.forEach(el => {
									charts.push(_.omit(el.chart.dataValues, 'dataset'));
									datasets.push(el.chart.dataValues.dataset.dataValues);
								});
								const payload = {
									id: projectData.id,
									name: projectData.name,
									charts,
									datasets
								};
								callback(null, payload);
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

	queryTest(id) {
		return this.ProjectRepository.queryTest(id);
	}
}

module.exports = new ProjectService();
