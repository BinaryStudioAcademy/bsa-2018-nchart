const generalRepository = require("../generalRepository");
const userModel = require("../../models/user");

class UserRepository extends generalRepository {
  constructor() {
    super();
    this.model = userModel;
  }
}

module.exports = UserRepository;
