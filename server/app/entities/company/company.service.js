const CompanyRepository = require('./company.repository');

module.exports = {
	save: (obj, callback) => {
		CompanyRepository.save(obj, (err, data) => {
			callback(err, data);
		});
	}
};
