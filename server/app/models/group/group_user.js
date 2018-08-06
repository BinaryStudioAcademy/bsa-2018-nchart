const Sequelize = require("sequelize");
const sequelize = require("../../config/index");

const Group_User = sequelize.define("group_user", {
  group_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Group_User;
