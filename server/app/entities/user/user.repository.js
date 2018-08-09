const Repository = require('../../common/repository/repository');
const userModel = require('./user.model');
const ErrorService = require('../../common/services/error.service');

class UserRepository extends Repository {
	constructor() {
		super();
		this.model = userModel;
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

	save(obj) {
		return this.model.create(obj.user).catch(err => {
			throw ErrorService.createCustomDBError(err);
		});
	}
}

module.exports = new UserRepository();
