const Repository = require('../../common/repository/repository');
const groupModel = require('./group.models/group');
const groupUserModel = require('./group.models/group_user');

class GroupRepository extends Repository {
	constructor() {
		super();
		this.groupModel = groupModel;
		this.groupUserModel = groupUserModel;
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
}

module.exports = new GroupRepository();
