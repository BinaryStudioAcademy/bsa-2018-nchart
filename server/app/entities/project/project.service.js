const async = require('async');
const _ = require('lodash');
const ProjectRepository = require('./project.repository');
const DatasetService = require('../dataset/dataset.service');
const ChartService = require('../chart/chart.service');
const GroupService = require('../group/group.service');
const UserService = require('../user/user.service');
const MarkupTemplateService = require('../../common/services/export.services/markup-template.service');
const DocumentGeneratingService = require('../../common/services/export.services/document-generating.service');

class ProjectService {
	constructor() {
		this.ProjectRepository = ProjectRepository;
		this.GroupService = GroupService;
		this.DocumentGeneratingService = DocumentGeneratingService;
		this.MarkupTemplateService = MarkupTemplateService;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	upsertProjectCharts(objs) {
		return this.ProjectRepository.upsertProjectCharts(objs);
	}

	createProject(obj, defaultGroupId) {
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
						this.GroupService.saveGroupProject({
							groupId: defaultGroupId,
							projectId: payload.project.id,
							accessLevelId: 1
						})
							.then(() => {
								callback(null, payload);
							})
							.catch(err => {
								callback(null, err);
							});
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
			return this.createProject(obj, res.locals.user.defaultGroupId);
		}
		// obj.groupId, res.locals.user
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						// todo: ask if this correct way to check
						this.GroupService.findOneGroupUser({
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
						this.GroupService.saveGroupProject({
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

	fullProjectById(id, res) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.findByUserIdAndProjectId({
							projectId: id,
							userId: res.locals.user.id
						})
							.then(data => {
								if (data !== null) {
									return callback(null);
								}
								throw new Error(
									'User has no rights on this project'
								);
							})
							.catch(err => callback(err, null));
					},
					callback => {
						this.ProjectRepository.fullProjectById(id)
							.then(data => {
								if (data) {
									const project = ProjectService.getProjectFromPayload(
										data.dataValues
									);
									return callback(null, project);
								}
								throw new Error('Object did not exist');
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

	fullProjectsByGroupId(id) {
		return this.ProjectRepository.fullProjectsByGroupId(id).then(data => {
			const projects = [];
			data.dataValues.groupProjects.forEach(el => {
				projects.push(el.project.dataValues);
			});
			const payload = {
				projects: []
			};
			projects.forEach(el => {
				const project = ProjectService.getProjectFromPayload(el);
				payload.projects.push(project);
			});
			return payload;
		});
	}

	fullProjectByUserId(id) {
		return this.ProjectRepository.fullProjectByUserId(id)
			.then(data => {
				const projects = [];
				data.forEach(payload => {
					payload.group.groupProjects.forEach(el => {
						projects.push(el.project.dataValues);
					});
				});
				const payload = {
					projects: []
				};
				projects.forEach(el => {
					const project = ProjectService.getProjectFromPayload(el);
					payload.projects.push(project);
				});
				return payload;
			})
			.catch(err => {
				throw err;
			});
	}

	shareProject(obj) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.GroupService.findOneGroupUser({
							userId: obj.userId,
							defaultGroup: true
						})
							.then(data => {
								if (data === null) {
									throw new Error('Object did not exist');
								}
								callback(null, data.dataValues.groupId);
							})
							.catch(err => callback(err, null));
					},
					(groupId, callback) => {
						this.GroupService.saveGroupProject({
							groupId,
							projectId: obj.projectId,
							accessLevelId: obj.accessLevelId
						})
							.then(data => {
								callback(null, data);
							})
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						reject(err);
					}
					// todo: what should be here
					resolve(payload);
				}
			);
		});
	}

	shareProjectByEmail(obj, res) {
		if (obj.email === res.locals.user.email) {
			throw new Error("Can't share with yourself");
		}
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						UserService.findByEmail(obj.email).then(data => {
							if (data !== null) {
								return callback(null, data.dataValues.id);
							}
							throw new Error('Object did not exist');
						});
					},
					(userId, callback) => {
						this.shareProject({
							userId,
							projectId: obj.projectId,
							accessLevelId: obj.accessLevelId
						})
							.then(data => callback(null, data))
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

	findProjectsWithOwners(id) {
		return this.ProjectRepository.findProjectsWithOwners(id)
			.then(data => {
				// data[0].group.groupProjects[0].project - id, name
				// data[0].group.groupProjects[0].project
				// .groupProjects[0].group.groupUsers[0].user.dataValues - name, email
				const projects = [];
				// todo: look very, very bad
				data.forEach(el => {
					el.group.groupProjects.forEach(pj => {
						const user =							pj.project.groupProjects[0].group.groupUsers[0].user
							.dataValues;
						projects.push({
							id: pj.project.dataValues.id,
							name: pj.project.dataValues.name,
							groupName: el.group.name,
							companyName: el.group.company.name,
							user
						});
					});
				});
				return projects;
			})
			.catch(err => err);
	}

	static getProjectFromPayload(rawProject) {
		const charts = [];
		const datasets = [];
		rawProject.projectCharts.forEach(el => {
			charts.push(_.omit(el.chart.dataValues, 'dataset'));
			datasets.push(el.chart.dataValues.dataset.dataValues);
		});
		return {
			id: rawProject.id,
			name: rawProject.name,
			createdAt: rawProject.createdAt,
			charts,
			datasets
		};
	}

	export(id, type, selector) {
		return this.DocumentGeneratingService.getDocument(id, type, selector);
	}

	exportHtml(content, type) {
		return this.MarkupTemplateService.getDocument(content, type);
	}
}

module.exports = new ProjectService();
