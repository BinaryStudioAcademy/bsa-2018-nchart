const generalRepository = require('../../common/repository/Repository');
const companyModel = require('./company.models/company');
const companyUserModel = require('./company.models/company_user');

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
