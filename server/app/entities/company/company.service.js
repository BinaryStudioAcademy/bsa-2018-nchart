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
}

module.exports = new CompanyService();
