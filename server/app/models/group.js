const Sequelize = require("sequelize");
const sequelize = require("../config/index");
const Project = require("./project");

const Group = sequelize.define("group", {
  name: {
    type: Sequelize.STRING
  },
  owner_id: {
    type: Sequelize.INTEGER
  }
});

module.exports = Group;
