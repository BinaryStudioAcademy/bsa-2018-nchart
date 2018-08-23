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
		return this.groupModel.create(obj);
	}

	saveGroupUser(userId, groupId) {
		return this.groupUserModel.create({
			userId,
			groupId,
			isAdmin: true
		});
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
}

module.exports = new GroupRepository();
