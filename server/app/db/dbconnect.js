function DBConnectionHandler() {
  const sequelize = require("../config/index");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
}

module.exports = DBConnectionHandler;
