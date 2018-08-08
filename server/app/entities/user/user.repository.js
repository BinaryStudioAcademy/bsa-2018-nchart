const Repository = require('../../common/repository/repository');
const userModel = require('./user.model');

class UserRepository extends Repository {
	constructor() {
		super();
		this.model = userModel;
	}

	findByEmail(email) {
		return this.model.findOne({
			where: {
				email
			}
		});
	}

	save(obj) {
		return this.model.create(obj.user);
	}
}

module.exports = new UserRepository();
