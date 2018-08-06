const Sequelize = require("sequelize");
const sequelize = require("../config/index");
const Company_User = require("./company/company_user");
const Group_User = require("./group/group_user");
const Company = require("./company/company");
const Group = require("./group/group");

const User = sequelize.define("users", {
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

// this method creates table if it doesn't exit
User.sync().then(() => {
  Company.sync();
  Company_User.sync();
  return User.hasMany(Company_User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "CASCADE",
    constraints: false
  });
});

User.sync().then(() => {
  Group.sync();
  Group_User.sync();
  return User.hasMany(Group_User, {
    foreignKey: "user_id",
    sourceKey: "id",
    onDelete: "CASCADE",
    constraints: false
  });
});

module.exports = User;
