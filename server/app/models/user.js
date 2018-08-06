const Sequelize = require("sequelize");
const sequelize = require("../config/index");
const Group = require("./group");

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
User.sync().then(()=>{
  Group.sync();
  return User.hasMany(Group, {
    foreignKey: 'owner_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    constraints: false
  });
});

module.exports = User;
