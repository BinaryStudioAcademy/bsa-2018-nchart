const CompanyUserRepository = require("./company_user.repository");

module.exports = {
  save: (user_id, company_id, callback) => {
    CompanyUserRepository.save(user_id, company_id, (err, data) => {
      callback(err, data);
    });
  }
};
