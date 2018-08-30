const CompanyRepository = require('./company.repository');

class CompanyService {
	constructor() {
		this.CompanyRepository = CompanyRepository;
	}

	saveCompany(obj) {
		return this.CompanyRepository.saveCompany(obj);
	}

	saveCompanyUser(userId, companyId) {
		return this.CompanyRepository.saveCompanyUser(userId, companyId);
	}

	findAllUserCompanies(res) {
		return this.CompanyRepository.findAllUserCompanies(res.locals.user.id);
	}
}

module.exports = new CompanyService();
