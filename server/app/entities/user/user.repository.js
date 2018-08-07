const generalRepository = require("../generalRepository");
const userModel = require("../../models/user");

class UserRepository extends generalRepository {
  constructor() {
    super();
    this.model = userModel;
  }

  save(obj, callback) {
    this.model
      .findAll({
        where: {
          email: obj.user.email
        }
      })
      .then(data => {
        if (data.length === 0) {
          this.model
            .create(obj.user)
            .then(data => {
              callback(null, data.dataValues);
            })
            .catch(err => callback(err, obj.user));
        } else {
          throw new Error("user exists");
        }
      })
      .catch(err => callback(err, null));
  }
}

module.exports = new UserRepository();
