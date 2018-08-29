const Repository = require('../../common/repository/repository');
const groupModel = require('./group.models/group');
const groupUserModel = require('./group.models/group_user');
const groupProjectModel = require('./group.models/group_project');

class GroupRepository extends Repository {
	constructor() {
		super();
		this.groupModel = groupModel;
		this.groupUserModel = groupUserModel;
		this.groupProjectModel = groupProjectModel;
	}

	saveGroup(obj) {
		return this.groupModel.create(obj, { attributes: ['id', 'name', 'companyId', 'createdAt'] });
	}

	saveGroupUser(obj) {
		return this.groupUserModel.create(obj);
	}

	saveGroupProject(obj) {
		return this.groupProjectModel.create(obj);
	}

	findOneGroupProject(query) {
		return this.groupProjectModel.findOne({
			where: query
		});
	}

	findOneGroupUser(query) {
		return this.groupUserModel.findOne({
			where: query
		});
	}

	findAllGroupUser(query) {
		return this.groupUserModel.findAll({
			where: query
		});
	}

	// userId, name - group.name
	findAllFullUserGroups(obj) {
		return this.groupUserModel.findAll({
			where: { userId: obj.userId },
			include: [
				{
					model: this.groupModel,
					where: {
						name: obj.name
					}
				}
			]
		});
	}
}

module.exports = new GroupRepository();
