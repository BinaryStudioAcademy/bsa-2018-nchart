const generalRepository = require("../../generalRepository");
const groupUserModel = require("../../../models/group/group_user");

class GroupUserRepository extends generalRepository {
  constructor() {
    super();
    this.model = groupUserModel;
  }

  save(user_id, group_id, callback) {
    this.model
      .create({
        user_id: user_id,
        group_id: group_id,
        is_admin: true
      })
      .then(data => {
        callback(null, data.dataValues);
      })
      .catch(err => callback(err, { user_id, group_id }));
  }
}

module.exports = new GroupUserRepository();
