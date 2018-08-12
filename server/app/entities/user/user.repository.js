const Repository = require('../../common/repository/repository');
const userModel = require('./user.model');
const ErrorService = require('../../common/services/error.service');

class UserRepository extends Repository {
	constructor() {
		super();
		this.model = userModel;
	}

	getAll() {
		return this.model.findAll({
			attributes: ['id', 'firstName', 'lastName', 'email']
		});
	}

	getById(id) {
		return this.model.findById(id, {
			attributes: ['id', 'firstName', 'lastName', 'email']
		});
	}

	findByEmail(email) {
		return this.model
			.findOne({
				where: {
					email
				}
			})
			.catch(err => {
				throw ErrorService.createCustomDBError(err);
			});
	}

	save(user) {
		return this.model.create(user).catch(err => {
			throw ErrorService.createCustomDBError(err);
		});
	}
}

module.exports = new UserRepository();
