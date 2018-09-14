const async = require('async');
const _ = require('lodash');
const moment = require('moment');
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

		this.pageLimit = 10;
	}

	getAll() {
		return this.ProjectRepository.getAll();
	}

	upsertProjectCharts(objs) {
		return this.ProjectRepository.upsertProjectCharts(objs);
	}

	createProject(obj, defaultGroupId, groupId) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						if (obj.project.id) {
							this.ProjectRepository.upsert(obj.project)
								.then(() => callback(null, false, {
									project: {
										id: obj.project.id,
										name: obj.project.name
									}
								}))
								.catch(err => callback(err, null));
						} else {
							this.ProjectRepository.create(obj.project.name)
								.then(data => {
									callback(null, true, {
										project: {
											id: data.dataValues.id,
											name: data.dataValues.name
										}
									});
								})
								.catch(err => callback(err, null));
						}
					},
					(status, payload, callback) => {
						if (!status || (!groupId && !defaultGroupId)) {
							return callback(null, payload);
						}

						return (
							this.GroupService.saveGroupProject({
								groupId: groupId || defaultGroupId,
								projectId: payload.project.id,
								accessLevelId: 1
							})
								// todo: error handler if groupProject  already exists
								.then(() => {
									callback(null, payload);
								})
								.catch(err => {
									callback(null, err);
								})
						);
					},
					(payload, callback) => {
						this.ProjectRepository.deleteAllProjectsCharts(
							payload.project.id
						)
							.then(() => {
								callback(null, payload);
							})
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
		if (!obj.groupId && res.locals.user) {
			return this.createProject(
				obj,
				res.locals.user.defaultGroupId,
				null
			);
		}
		if (!obj.groupId && !res.locals.user) {
			return this.createProject(obj, null, null);
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
								return callback(
									'Group with such user does not exist',
									null
								);
							})
							.catch(err => {
								callback(err, null);
							});
					},
					callback => {
						this.createProject(obj, null, obj.groupId)
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
					callback => this.ProjectRepository.fullProjectById(id)
						.then(data => {
							if (data) {
								const project = ProjectService.getProjectFromPayload(
									data.dataValues
								);
								return callback(null, project);
							}
							throw new Error('Object did not exist');
						})
						.catch(err => callback(err, null)),
					(project, callback) => this.ProjectRepository.publicProject(id)
						.then(data => {
							if (!data) {
								return callback(null, project);
							}
							if (!res.locals.user) {
								return callback(
									'User has no rights on this project'
								);
							}

							return this.ProjectRepository.findByUserIdAndProjectId(
								{
									projectId: id,
									userId: res.locals.user.id
								}
							)
								.then(d => {
									let count = 0;
									d.forEach(el => {
										if (el.group) {
											count += 1;
										}
									});
									if (count >= 1) {
										return callback(null, project);
									}
									throw new Error(
										'User has no rights on this project'
									);
								})
								.catch(err => callback(err, null));
						})
						.catch(err => callback(err, null))
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
									return callback(
										'Object did not exist',
										null
									);
								}
								return callback(null, data.dataValues.groupId);
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
							if (data === null) {
								return callback('Object did not exist', null);
							}
							return callback(null, data.dataValues.id);
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

	static formQuery(title, page, limit, charts, from, to) {
		const queryName = title || '';
		let queryChart = charts;
		if (!(typeof charts === 'object')) {
			queryChart = (charts || '').split(',').filter(el => !!el);
		}
		let queryMinDate = moment(from, 'YYYY-MM-DD', true).isValid()
			? from
			: '1700-01-01';
		let queryMaxDate = moment(to, 'YYYY-MM-DD', true).isValid()
			? to
			: '3000-01-01';
		const duration = moment
			.duration(moment(queryMaxDate).diff(moment(queryMinDate)))
			.asDays();
		if (duration < 0) {
			throw new Error('Invalid date');
		}
		queryMinDate = `${queryMinDate}T00:00:00.000Z`;
		queryMaxDate += 'T23:59:59.999Z';
		return {
			queryName,
			queryChart,
			queryMinDate,
			queryMaxDate
		};
	}

	static ownerMe(owner) {
		if (owner === 'me') {
			return [1];
		}
		if (owner === 'shared') {
			return [2, 3];
		}
		return [1, 2, 3];
	}

	projectsWithPagination(
		obj,
		{
			title, page, limit, charts, from, to, owner
		}
	) {
		const queryLimit = Number(limit) || this.pageLimit;
		const queryOffset = ((page || 1) - 1) * queryLimit;
		const queryParams = ProjectService.formQuery(
			title,
			page,
			limit,
			charts,
			from,
			to
		);
		const searchQuery = ProjectService.ownerMe(owner);
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.findProjectsWithOwners({
							id: obj.id,
							queryName: queryParams.queryName,
							queryMinDate: queryParams.queryMinDate,
							queryMaxDate: queryParams.queryMaxDate,
							queryChart: queryParams.queryChart,
							searchQuery,
							offset: queryOffset,
							limit: queryLimit
						})
							.then(data => {
								callback(null, data);
							})
							// .then(data => callback(data, null))
							.catch(err => {
								callback(err, null);
							});
					},
					(payload, callback) => {
						if (payload.rows.length === 0) {
							this.ProjectRepository.findProjectsWithOwners({
								id: obj.id,
								queryName: queryParams.queryName,
								queryMinDate: queryParams.queryMinDate,
								queryMaxDate: queryParams.queryMaxDate,
								queryChart: queryParams.queryChart,
								searchQuery,
								offset: 0,
								limit: queryLimit
							})
								.then(data => callback(null, data))
								.catch(err => callback(err, null));
						} else {
							callback(null, payload);
						}
					},
					({ rows, count }, callback) => {
						const payload = {
							projects: [],
							pagination: {}
						};
						rows.forEach(el => {
							const users = [];
							el.groupProjects.forEach(groupProject => {
								groupProject.group.groupUsers.forEach(
									groupUser => {
										users.push(groupUser.user.dataValues);
									}
								);
							});
							const unsortedCharts = [];
							const unsortedSysCharts = [];
							el.projectCharts.forEach(projectChart => {
								unsortedCharts.push(
									projectChart.chart.chartType.name
								);
								unsortedSysCharts.push(
									projectChart.chart.chartType.sysName
								);
							});
							const userCharts = unsortedCharts.filter(
								(item, pos) => unsortedCharts.indexOf(item) === pos
							);
							const userSysCharts = unsortedSysCharts.filter(
								(item, pos) => unsortedSysCharts.indexOf(item) === pos
							);
							let queryChart = charts;
							if (!(typeof queryChart === 'object')) {
								queryChart = (charts || '')
									.split(',')
									.filter(ele => !!ele);
							}
							const userAccessLvlId =	el.groupProjects[0].accessLevelId;
							// todo: need to check if every value is inside userCharts
							let c = 0;
							queryChart.forEach(qChart => {
								userSysCharts.forEach(uChart => {
									if (qChart === uChart) {
										c += 1;
									}
								});
							});
							if (c >= queryChart.length) {
								payload.projects.push({
									id: el.id,
									name: el.name,
									updatedAt: el.updatedAt,
									accessLevelId: userAccessLvlId,
									user:
										el.groupProjects.find(g => g.accessLevelId === 1).group.groupUsers[0]
											.user,
									userCharts
								});
							}
						});
						const pageCount = Math.ceil(count / queryLimit);
						let userPage = page;
						if (page > pageCount) {
							userPage = 1;
						}
						payload.pagination = {
							totalRecords: count,
							pageCount,
							page: userPage,
							rows: queryLimit
						};
						return callback(null, payload);
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

	deleteProjects(obj, res) {
		if (obj.accessLevelId !== 1) {
			return this.ProjectRepository.deleteGroupProject(
				obj.projectId,
				res.locals.user.defaultGroupId
			);
		}
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.deleteGroupProject(obj.projectId)
							.then(() => callback(null))
							.catch(err => callback(err, null));
					},
					callback => {
						this.ProjectRepository.deleteProjectCharts(
							obj.projectId
						)
							.then(() => callback(null))
							.catch(err => callback(err, null));
					},
					callback => {
						this.ProjectRepository.deleteProject(obj.projectId)
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

	updateProjectName(obj) {
		return this.ProjectRepository.updateProjectName(obj.id, obj.name).then(
			data => {
				if (data[0] === 1) {
					return {
						id: obj.id,
						name: obj.name
					};
				}
				throw new Error('Object did not exist');
			}
		);
	}

	export(id, type, selector) {
		return this.DocumentGeneratingService.getDocument(id, type, selector);
	}

	exportHtml(content, type) {
		return this.MarkupTemplateService.getDocument(content, type);
	}
}

module.exports = new ProjectService();
