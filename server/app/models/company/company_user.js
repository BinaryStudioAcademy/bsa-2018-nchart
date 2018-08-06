const Sequelize = require("sequelize");
const sequelize = require("../../config/index");

const Company_User = sequelize.define("company_user", {
  user_id: {
    type: Sequelize.INTEGER
  },
  company_id: {
    type: Sequelize.INTEGER
  },
  is_admin: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Company_User;
