const GroupUserRepository = require('./group_user.repository');

module.exports = {
	save: (userId, groupId, callback) => {
		GroupUserRepository.save(userId, groupId, (err, data) => {
			callback(err, data);
		});
	}
};
