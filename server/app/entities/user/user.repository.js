const generalRepository = require('../generalRepository');
const userModel = require('../../models/user');

class UserRepository extends generalRepository {
	constructor() {
		super();
		this.model = userModel;
	}

	findByEmail(obj, callback) {
		this.model
			.findOne({
				where: {
					email: obj.user.email
				}
			})
			.then(data => {
				callback(null, data);
			})
			.catch(err => callback(err, null));
	}

	save(obj, callback) {
		this.model
			.create(obj.user)
			.then(data => {
				callback(null, data.dataValues);
			})
			.catch(err => callback(err, obj.user));
	}

	login(obj, callback) {
		this.model
			.findOne({
				where: {
					email: obj.email
				}
			})
			.then(data => {
				if (data === null) {
					throw new Error('User does not exist');
				} else if (data.dataValues.password === obj.password) {
					callback(null, 'Success');
				} else {
					throw new Error('Wrong password');
				}
			})
			.catch(err => callback(err, obj));
	}
}

module.exports = new UserRepository();
