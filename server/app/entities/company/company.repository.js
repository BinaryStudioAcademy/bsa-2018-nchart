const generalRepository = require('../generalRepository');
const companyModel = require('../../models/company/company');
const companyUserModel = require('../../models/company/company_user');

class CompanyRepository extends generalRepository {
	constructor() {
		super();
		this.companyModel = companyModel;
		this.companyUserModel = companyUserModel;
	}

	saveCompany(obj) {
		if (typeof obj.company === 'string' && obj.company.length >= 1) {
			return this.companyModel.create({
				name: obj.company
			});
		}
		return this.companyModel.create({
			name: `${obj.user.firstName} ${obj.user.lastName}`
		});
	}

	saveCompanyUser(userId, companyId) {
		return this.companyUserModel.create({
			userId,
			companyId,
			isAdmin: true
		});
	}
}

module.exports = new CompanyRepository();
