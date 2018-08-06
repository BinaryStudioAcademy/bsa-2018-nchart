const Sequelize = require("sequelize");
const sequelize = require("../../config/index");
const Group_User = require("../../models/group/group_user");

const Group = sequelize.define("group", {
  name: {
    type: Sequelize.STRING
  }
});

Group.sync().then(() => {
  Group_User.sync();
  Group.hasMany(Group_User, {
    foreignKey: "group_id",
    sourceKey: "id",
    onDelete: "CASCADE",
    constraints: false
  });
});

module.exports = Group;
