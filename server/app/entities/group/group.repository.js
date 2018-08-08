const generalRepository = require('../generalRepository');
const groupModel = require('../../models/group/group');
const groupUserModel = require('../../models/group/group_user');

class GroupRepository extends generalRepository {
	constructor() {
		super();
		this.groupModel = groupModel;
		this.groupUserModel = groupUserModel;
	}

	saveGroup(name = 'General') {
		return this.groupModel.create({ name });
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
