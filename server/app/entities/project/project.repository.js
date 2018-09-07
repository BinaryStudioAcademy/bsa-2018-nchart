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
const companyModel = require('../company/company.models/company');

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

	projectsPartsByGroupId(id) {
		this.groupModel = groupModel;
		return this.groupModel.findOne({
			where: { id },
			attributes: ['id'],
			include: [
				{
					model: groupProjectModel,
					attributes: ['groupId', 'projectId', 'accessLevelId'],
					include: [
						{
							model: this.projectModel,
							attributes: ['id', 'name']
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

	findProjectsWithOwners(userId, name) {
		let projectName = name;
		if (!name) {
			projectName = '';
		}
		this.groupUser = groupUserModel;
		return this.groupUser.findAll({
			where: { userId },
			separate: true,
			attributes: ['groupId'],
			include: [
				{
					model: groupModel,
					attributes: ['id', 'name', 'companyId'],
					include: [
						{
							model: groupProjectModel,
							attributes: ['projectId', 'accessLevelId'],
							include: [
								{
									model: this.projectModel,
									attributes: ['id', 'name', 'updatedAt'],
									where: {
										name: { $like: `%${projectName}%` }
									},
									include: [
										{
											model: groupProjectModel,
											separate: true,
											attributes: [
												'projectId',
												'groupId'
											],
											where: { accessLevelId: 1 },
											include: [
												{
													model: groupModel,
													attributes: ['id'],
													include: [
														{
															model: groupUserModel,
															attributes: [
																'userId'
															],
															include: {
																model: userModel,
																attributes: [
																	'name',
																	'email'
																]
															}
														}
													]
												}
											]
										},
										{
											model: this.projectChartModel,
											attributes: ['chartId'],
											include: [
												{
													model: chartModel,
													attributes: ['chartTypeId'],
													include: [
														{
															model: chartTypeModel,
															attributes: ['name']
														}
													]
												}
											]
										}
									]
								}
							]
						},
						{
							model: companyModel,
							attributes: ['name']
						}
					]
				}
			]
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
