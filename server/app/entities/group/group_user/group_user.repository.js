const generalRepository = require('../../generalRepository');
const groupUserModel = require('../../../models/group/group_user');

class GroupUserRepository extends generalRepository {
	constructor() {
		super();
		this.model = groupUserModel;
	}

	save(userId, groupId, callback) {
		this.model
			.create({
				userId,
				groupId,
				isAdmin: true
			})
			.then(data => {
				callback(null, data.dataValues);
			})
			.catch(err => callback(err, { userId, groupId }));
	}
}

module.exports = new GroupUserRepository();
