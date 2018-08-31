const Repository = require('../../common/repository/repository');
const userModel = require('./user.model');

class UserRepository extends Repository {
	constructor() {
		super();
		this.model = userModel;
	}

	getAll() {
		return this.model.findAll({
			attributes: ['id', 'name', 'email']
		});
	}

	getById(id) {
		return this.model.findById(id, {
			attributes: ['id', 'name', 'email']
		});
	}

	findByEmail(email) {
		return this.model.findOne({
			where: {
				email
			}
		});
	}

	save(user) {
		return this.model.create(user);
	}
}

module.exports = new UserRepository();
