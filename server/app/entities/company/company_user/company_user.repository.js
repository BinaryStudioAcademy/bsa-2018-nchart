const generalRepository = require('../../generalRepository');
const companyUserModel = require('../../../models/company/company_user');

class CompanyUserRepository extends generalRepository {
	constructor() {
		super();
		this.model = companyUserModel;
	}

	save(userId, companyId, callback) {
		this.model
			.create({
				userId,
				companyId,
				isAdmin: true
			})
			.then(data => {
				callback(null, data.dataValues);
			})
			.catch(err => callback(err, { userId, companyId }));
	}
}

module.exports = new CompanyUserRepository();
