const GroupRepository = require('./group.repository');

class GroupService {
	constructor() {
		this.GroupRepository = GroupRepository;
	}

	saveGroup(obj) {
		return this.GroupRepository.saveGroup(obj);
	}

	saveGroupUser(obj) {
		return this.GroupRepository.saveGroupUser(obj);
	}

	saveGroupProject(obj) {
		return this.GroupRepository.saveGroupProject(obj);
	}

	findOneGroupUser(query) {
		return this.GroupRepository.findOneGroupUser(query);
	}

	findOneGroupProject(query) {
		return this.GroupRepository.findOneGroupProject(query);
	}

	findAllByQuery(query) {
		return this.GroupRepository.findAllGroupUser(query);
	}
}

module.exports = new GroupService();
