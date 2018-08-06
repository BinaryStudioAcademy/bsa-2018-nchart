const Sequelize = require("sequelize");
const sequelize = require("../../config/index");
const Company_User = require("./company_user");

const Company = sequelize.define("company", {
  name: {
    type: Sequelize.STRING
  }
});

Company.sync().then(() => {
  Company_User.sync();
  Company.hasMany(Company_User, {
    foreignKey: "company_id",
    sourceKey: "id",
    onDelete: "CASCADE",
    constraints: false
  });
});

module.exports = Company;
