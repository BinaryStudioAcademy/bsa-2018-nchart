const generalRepository = require('../generalRepository');
const groupModel = require('../../models/group/group');

class GroupRepository extends generalRepository {
	constructor() {
		super();
		this.model = groupModel;
	}

	save(name = 'General', callback) {
		this.model
			.create({
				name
			})
			.then(data => {
				callback(null, data.dataValues);
			})
			.catch(err => callback(err, name));
	}
}

module.exports = new GroupRepository();
