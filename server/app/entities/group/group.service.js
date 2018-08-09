const GroupRepository = require('./group.repository');

class GroupService {
	constructor() {
		this.GroupRepository = GroupRepository;
	}

	saveGroup(name) {
		return this.GroupRepository.saveGroup(name);
	}

	saveGroupUser(userId, groupId) {
		return this.GroupRepository.saveGroupUser(userId, groupId);
	}
}

module.exports = new GroupService();
