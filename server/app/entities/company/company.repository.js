const Repository = require('../../common/repository/repository');
const companyModel = require('./company.models/company');
const companyUserModel = require('./company.models/company_user');
const groupModel = require('../group/group.models/group');

class CompanyRepository extends Repository {
	constructor() {
		super();
		this.companyModel = companyModel;
		this.companyUserModel = companyUserModel;
	}

	saveCompany(name) {
		return this.companyModel.create({
			name
		});
	}

	saveCompanyUser(userId, companyId) {
		return this.companyUserModel.create({
			userId,
			companyId,
			isAdmin: true
		});
	}

	findAllUserCompanies(userId) {
		return this.companyUserModel.findAll({
			where: { userId },
			attributes: [],
			include: [
				{
					model: this.companyModel,
					attributes: ['id', 'name', 'createdAt']
				}
			]
		});
	}

	findCompanyUsersByName(obj) {
		return this.companyUserModel.findOne({
			where: { userId: obj.userId },
			include: [
				{
					model: this.companyModel,
					where: {
						name: obj.name
					}
				}
			]
		});
	}

	findCompanyUsers(query) {
		return this.companyUserModel.findOne({
			where: query
		});
	}

	findGroupsByCompanyId(id) {
		return this.companyModel.findOne({
			where: { id },
			attributes: ['id'],
			include: [
				{
					model: groupModel,
					attributes: ['id', 'name']
				}
			]
		});
	}
}

module.exports = new CompanyRepository();
