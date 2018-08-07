const CompanyUserRepository = require('./company_user.repository');

module.exports = {
	save: (userId, companyId, callback) => {
		CompanyUserRepository.save(userId, companyId, (err, data) => {
			callback(err, data);
		});
	}
};
