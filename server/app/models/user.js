const Sequelize = require("sequelize");
const sequelize = require("../config/index");

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
});

// this method creates table if it doesn't exit
User.sync();

module.exports = User;
