const GroupUserRepository = require("./group_user.repository");

module.exports = {
  save: (user_id, group_id, callback) => {
    GroupUserRepository.save(user_id, group_id, (err, data) => {
      callback(err, data);
    });
  }
};
