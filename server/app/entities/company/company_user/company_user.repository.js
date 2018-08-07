const generalRepository = require("../../generalRepository");
const companyUserModel = require("../../../models/company/company_user");

class CompanyUserRepository extends generalRepository {
  constructor() {
    super();
    this.model = companyUserModel;
  }

  save(user_id, company_id, callback) {
    this.model
      .create({
        user_id: user_id,
        company_id: company_id,
        is_admin: true
      })
      .then(data => {
        callback(null, data.dataValues);
      })
      .catch(err => callback(err, { user_id, company_id }));
  }
}

module.exports = new CompanyUserRepository();
