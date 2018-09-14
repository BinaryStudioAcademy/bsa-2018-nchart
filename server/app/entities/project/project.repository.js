const SequilizeOp = require('sequelize').Op;
const Repository = require('../../common/repository/repository');
const projectModel = require('./project.models/project');
const projectChartModel = require('./project.models/project_chart');
const TransactionService = require('../../common/services/db-transaction.service');
const chartModel = require('../chart/chart.model');
const chartTypeModel = require('../chartType/chartType.model');
const datasetModel = require('../dataset/dataset.model');
const groupModel = require('../group/group.models/group');
const groupProjectModel = require('../group/group.models/group_project');
const groupUserModel = require('../group/group.models/group_user');
const userModel = require('../user/user.model');

class ProjectRepository extends Repository {
	constructor() {
		super();
		this.projectModel = projectModel;
		this.projectChartModel = projectChartModel;
		this.groupProjectModel = groupProjectModel;
	}

	upsert(obj) {
		return this.projectModel.upsert({ id: obj.id, name: obj.name });
	}

	create(name) {
		return this.projectModel.create({ name });
	}

	upsertProjectCharts(objs) {
		return TransactionService(objs, this.projectChartModel, 'upsert');
	}

	fullProjectById(id) {
		return this.projectModel.findOne({
			where: { id },
			attributes: ['id', 'name', 'createdAt'],
			include: [
				{
					model: projectChartModel,
					attributes: ['chartId'],
					include: [
						{
							model: chartModel,
							attributes: [
								'id',
								'chartTypeId',
								'datasetId',
								'dimensionSettings',
								'customizeSettings'
							],
							include: [
								{
									model: datasetModel,
									attributes: ['id', 'data', 'columns']
								}
							]
						}
					]
				}
			]
		});
	}

	fullProjectsByGroupId(id) {
		this.groupModel = groupModel;
		return this.groupModel.findOne({
			where: { id },
			attributes: ['id'],
			include: [
				{
					model: groupProjectModel,
					attributes: ['groupId', 'projectId'],
					include: [
						{
							model: this.projectModel,
							attributes: ['id', 'name', 'createdAt'],
							include: [
								{
									model: projectChartModel,
									attributes: ['chartId'],
									include: [
										{
											model: chartModel,
											attributes: [
												'id',
												'chartTypeId',
												'datasetId',
												'dimensionSettings',
												'customizeSettings'
											],
											include: [
												{
													model: datasetModel,
													attributes: [
														'id',
														'data',
														'columns'
													]
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
	}

	fullProjectByUserId(id) {
		this.groupUser = groupUserModel;
		return this.groupUser.findAll({
			where: { userId: id },
			attributes: ['groupId'],
			include: [
				{
					model: groupModel,
					attributes: ['id'],
					include: [
						{
							model: groupProjectModel,
							separate: true,
							attributes: ['groupId', 'projectId'],
							include: [
								{
									model: this.projectModel,
									attributes: ['id', 'name', 'createdAt'],
									include: [
										{
											model: projectChartModel,
											separate: true,
											attributes: ['chartId'],
											include: [
												{
													model: chartModel,
													attributes: [
														'id',
														'chartTypeId',
														'datasetId',
														'dimensionSettings',
														'customizeSettings'
													],
													include: [
														{
															model: datasetModel,
															attributes: [
																'id',
																'data',
																'columns'
															]
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				}
			]
		});
	}

	findProjectsWithOwners({
		id,
		searchQuery,
		queryName,
		queryMinDate,
		queryMaxDate,
		queryChart,
		offset,
		limit
	}) {
		this.groupUser = groupUserModel;

		const query = {
			'$groupProjects.group.groupUsers.id$': id,
			name: { $iLike: `%${queryName}%` },
			updatedAt: {
				[SequilizeOp.gte]: queryMinDate,
				[SequilizeOp.lte]: queryMaxDate
			}
		};
		if (queryChart && queryChart.length > 0) {
			query['$projectCharts.chart.chartType.sysName$'] = {
				[SequilizeOp.in]: queryChart
			};
		}
		const groupInclude = {
			model: groupProjectModel,
			where: searchQuery[0],
			include: [
				{
					model: groupModel,
					attributes: ['id'],
					include: [
						{
							model: groupUserModel,
							attributes: ['id'],
							include: [
								{
									model: userModel,
									attributes: ['name', 'email']
								}
							]
						}
					]
				}
			]
		};

		const chartInclude = {
			model: this.projectChartModel,
			attributes: ['chartId', 'projectId'],
			include: [
				{
					model: chartModel,
					attributes: ['chartTypeId', 'id'],
					include: [
						{
							attributes: ['name', 'sysName', 'id'],
							model: chartTypeModel
						}
					]
				}
			]
		};

		return new Promise(res => {
			projectModel
				.findAll({
					where: query,
					attributes: ['id'],
					include: [chartInclude, groupInclude]
				})
				.then(data => {
					groupInclude.where = {
						accessLevelId: searchQuery[1].accessLevelId
					};
					projectModel
						.findAndCount({
							limit,
							offset,
							subQuery: false,
							where: {
								id: {
									[SequilizeOp.in]: data.map(el => el.id)
								}
							},
							include: [chartInclude, groupInclude]
						})
						.then(d => {
							res(d);
						});
				});
		});
	}

	findByUserIdAndProjectId(obj) {
		return this.groupProjectModel.findAll({
			where: { projectId: obj.projectId },
			attributes: ['groupId'],
			include: [
				{
					model: groupModel,
					attributes: ['id'],
					include: [
						{
							model: groupUserModel,
							where: { userId: obj.userId }
						}
					]
				}
			]
		});
	}

	deleteAllProjectsCharts(id) {
		return this.projectChartModel.destroy({
			where: { projectId: id }
		});
	}

	publicProject(projectId) {
		return this.groupProjectModel.findOne({ where: { projectId } });
	}

	deleteProject(id) {
		return this.projectModel.destroy({ where: { id } });
	}

	deleteGroupProject(projectId, groupId) {
		if (groupId) {
			return this.groupProjectModel.destroy({
				where: { projectId, groupId }
			});
		}
		return this.groupProjectModel.destroy({ where: { projectId } });
	}

	deleteProjectCharts(projectId) {
		return this.projectChartModel.destroy({ where: { projectId } });
	}

	updateProjectName(id, name) {
		return this.projectModel.update({ name }, { where: { id } });
	}
}

module.exports = new ProjectRepository();
