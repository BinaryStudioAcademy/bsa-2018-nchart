const generalRepository = require("../generalRepository");
const userModel = require("../../models/user");

class UserRepository extends generalRepository {
  constructor() {
    super();
    this.model = userModel;
  }

  save(obj, callback) {
    this.model
      .findOne({
        where: {
          email: obj.user.email
        }
      })
      .then(data => {
        if (data === null) {
          this.model
            .create(obj.user)
            .then(data => {
              callback(null, data.dataValues);
            })
            .catch(err => callback(err, obj.user));
        } else {
          throw new Error("User already exists");
        }
      })
      .catch(err => callback(err, null));
  }

  login(obj, callback) {
    this.model
      .findOne({
        where: {
          email: obj.email
        }
      })
      .then(data => {
        if (data === null) {
          throw new Error("User does not exist");
        } else if (data.dataValues.password === obj.password) {
          callback(null, "Success");
        }
      })
      .catch(err => callback(err, obj));
  }
}

module.exports = new UserRepository();
