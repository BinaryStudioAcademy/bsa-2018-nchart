const generalRepository = require("../generalRepository");
const userModel = require("../../models/user");

class UserRepository extends generalRepository {
  constructor() {
    super();
    this.model = userModel;
  }

  save(obj, callback) {
    this.model
      .create(obj.user)
      .then(data => {
        callback(null, data.dataValues);
      })
      .catch(err => callback(err, obj.user));
  }
}

module.exports = new UserRepository();
