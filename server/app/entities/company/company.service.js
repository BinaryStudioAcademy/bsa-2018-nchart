const async = require('async');
const _ = require('lodash');
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
		return this.CompanyRepository.findAllUserCompanies(res.locals.user.id)
			.then(data => {
				const payload = [];
				data.forEach(el => {
					payload.push(el.company.dataValues);
				});
				return payload;
			});
	}

	saveFullCompany(obj, res) {
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.CompanyRepository.findCompanyUsersByName({
							userId: res.locals.user.id,
							name: obj.name
						})
							.then(data => {
								if (data.length === 0) {
									return callback(null);
								}
								throw new Error(
									'Company with such name already exists'
								);
							})
							.catch(err => callback(err, null));
					},
					callback => {
						this.CompanyRepository.saveCompany(obj.name)
							.then(data => callback(null, data.dataValues))
							.catch(err => callback(err, null));
					},
					(company, callback) => {
						this.CompanyRepository.saveCompanyUser(
							res.locals.user.id,
							company.id
						)
							.then(() => callback(null, _.omit(company, 'updatedAt')))
							.catch(err => callback(err, null));
					}
				],
				(err, payload) => {
					if (err) {
						reject(err);
					}
					resolve(payload);
				}
			);
		});
	}
}

module.exports = new CompanyService();
