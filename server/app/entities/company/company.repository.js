const generalRepository = require('../generalRepository');
const companyModel = require('../../models/company/company');

class CompanyRepository extends generalRepository {
	constructor() {
		super();
		this.model = companyModel;
	}

	save(obj, callback) {
		if (typeof obj.company === 'string' && obj.company.length >= 1) {
			this.model
				.create({
					name: obj.company
				})
				.then(data => {
					callback(null, data.dataValues);
				})
				.catch(err => callback(err, obj));
		} else {
			this.model
				.create({
					name: `${obj.user.firstName} ${obj.user.lastName}`
				})
				.then(data => {
					callback(null, data.dataValues);
				})
				.catch(err => callback(err, obj));
		}
	}
}

module.exports = new CompanyRepository();
