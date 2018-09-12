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
						if (groupId) {
							return this.GroupService.saveGroupProject({
								groupId,
								projectId: payload.project.id,
								accessLevelId: 1
							})
								.then(() => {
									callback(null, payload);
								})
								.catch(err => {
									callback(null, err);
								});
						}
						return (
							this.GroupService.saveGroupProject({
								groupId: defaultGroupId,
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
					callback => {
						if (!res.locals.user) {
							return this.ProjectRepository.publicProject(
								id
							).then(data => {
								if (data === null) {
									return callback(null);
								}
								return callback(
									'User has no rights on this project',
									null
								);
							});
						}
						return this.ProjectRepository.findByUserIdAndProjectId({
							projectId: id,
							userId: res.locals.user.id
						})
							.then(data => {
								let count = 0;
								data.forEach(el => {
									if (el.group) {
										count += 1;
									}
								});
								// data[1].group.groupUsers[0].dataValues
								if (count >= 1) {
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

	findProjectsWithOwners(id, params) {
		return this.ProjectRepository.findProjectsWithOwners(id, params.name)
			.then(data => {
				const projects = [];
				data.forEach(el => {
					el.group.groupProjects.forEach(pj => {
						const user = pj.project.groupProjects[0].group.groupUsers[0].user
							.dataValues;
						const userCharts = [];
						pj.project.projectCharts.forEach(projectChart => {
							userCharts.push(projectChart.chart.chartType.name);
						});
						const uniqueCharts = userCharts.filter(
							(item, pos) => userCharts.indexOf(item) === pos
						);
						projects.push({
							id: pj.project.dataValues.id,
							name: pj.project.dataValues.name,
							updatedAt: pj.project.dataValues.updatedAt,
							groupName: el.group.name,
							companyName: el.group.company.name,
							accessLevelId: pj.dataValues.accessLevelId,
							userCharts: uniqueCharts,
							user
						});
					});
				});
				return projects;
			})
			.catch(err => err);
	}

	/*
    "projects":[
      {
        "id":4,
        "name":"rename test",
        "updatedAt":"2018-09-08T11:26:08.029Z",
        "groupName":"General",
        "companyName":"General",
        "accessLevelId":1,
        "userCharts":[
          "Bar chart",
          "Pie Chart"
        ],
        "user":{
          "name":"Nemchenko",
          "email":"1user@gmail.com"
        }
      }
    ],
    "pagination":{
      "pageCount":1,
      "page":1,
      "totalRecords":2,
      "rows":10
    }
  }
     */
	static formQuery(title, page, limit, charts, from, to) {
		const queryName = title || '';
		const queryChart = (charts || '').split(',').filter(el => !!el);
		let queryMinDate = moment(from, 'YYYY-MM-DD', true).isValid() ? from : '1700-01-01';
		let queryMaxDate = moment(to, 'YYYY-MM-DD', true).isValid() ? to : '3000-01-01';
		const duration = moment.duration(moment(queryMaxDate).diff((moment(queryMinDate)))).asDays();
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
			return [{ accessLevelId: 1 }, { accessLevelId: 1 }];
		}
		if (owner === 'shared') {
			return [{ accessLevelId: [2, 3] }, { accessLevelId: 1 }];
		}
		return [{ accessLevelId: [1, 2, 3] }, { accessLevelId: 1 }];
	}

	projectsWithPagination(id, {
		title, page, limit, charts, from, to, owner
	}) {
		const queryLimit = Number(limit) || this.pageLimit;
		const queryOffset = ((page || 1) - 1) * queryLimit;
		const queryParams = ProjectService.formQuery(title, page, limit, charts, from, to);
		const searchQuery = ProjectService.ownerMe(owner);
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.ProjectRepository.findProjectsWithOwners({
							id,
							queryName: queryParams.queryName,
							queryMinDate: queryParams.queryMinDate,
							queryMaxDate: queryParams.queryMaxDate,
							queryChart: queryParams.queryChart,
							searchQuery,
							offset: queryOffset,
							limit: queryLimit
						})
							.then(data => callback(null, data))
						// .then(data => callback(data, null))
							.catch(err => callback(err, null));
					},
					(payload, callback) => {
						if (payload.rows.length === 0) {
							this.ProjectRepository.findProjectsWithOwners({
								id,
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
					(data, callback) => {
						const payload = {
							projects: [],
							pagination: {}
						};
						data.rows.forEach(el => {
							const users = [];
							el.groupProjects.forEach(groupProject => {
								groupProject.group.groupUsers.forEach(groupUser => {
									users.push(groupUser.user.dataValues);
								});
							});
							const unsortedCharts = [];
							el.projectCharts.forEach(projectChart => {
								unsortedCharts.push(projectChart.chart.chartType.name);
							});
							const userCharts = unsortedCharts.filter(
								(item, pos) => unsortedCharts.indexOf(item) === pos
							);
							const queryChart = (charts || '').split(',').filter(ele => !!ele);
							if (userCharts.length >= queryChart.length) {
								payload.projects.push({
									id: el.id,
									name: el.name,
									updatedAt: el.updatedAt,
									accessLevelId:
                                el.groupProjects[0].accessLevelId,
									user:
                                el.groupProjects[0].group.groupUsers[0].user,
									userCharts
								});
							}
						});
						const pageCount = Math.ceil(payload.projects.length / queryLimit);
						let userPage = page;
						if (page > pageCount) {
							userPage = 1;
						}
						payload.pagination = {
							totalRecords: payload.projects.length,
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
