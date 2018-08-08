const generalRepository = require('../../common/repository/Repository');
const userModel = require('./user.model');

class UserRepository extends generalRepository {
	constructor() {
		super();
		this.model = userModel;
	}

	findByEmail(obj) {
		return this.model.findOne({
			where: {
				email: obj.email
			}
		});
	}

	save(obj) {
		return this.model.create(obj.user);
	}
}

module.exports = new UserRepository();
