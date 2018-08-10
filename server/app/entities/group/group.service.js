const GroupRepository = require('./group.repository');

class GroupService {
	constructor() {
		this.GroupRepository = GroupRepository;
	}

	saveGroup(obj) {
		return this.GroupRepository.saveGroup(obj);
	}

	saveGroupUser(userId, groupId) {
		return this.GroupRepository.saveGroupUser(userId, groupId);
	}
}

module.exports = new GroupService();
