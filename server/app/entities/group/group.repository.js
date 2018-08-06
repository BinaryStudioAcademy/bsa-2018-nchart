const generalRepository = require("../generalRepository");
const groupModel = require("../../models/group");

class GroupRepository extends generalRepository {
  constructor() {
    super();
    this.model = groupModel;
  }
}

module.exports = new GroupRepository();
