const async = require('async');
const GroupRepository = require('./group.repository');

class GroupService {
	constructor() {
		this.GroupRepository = GroupRepository;
	}

	saveGroup(obj) {
		return this.GroupRepository.saveGroup(obj);
	}

	saveFullGroup(obj, res) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.GroupRepository.saveGroup(obj)
							.then(data => callback(null, data.dataValues))
							.catch(err => callback(err, null));
					},
					(group, callback) => {
						this.GroupRepository.saveGroupUser(
							{
								groupId: group.id,
								userId: res.locals.user.id,
								defaultGroup: false

							}
						)
							.then(() => callback(group))
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
