const userRouter = require("../entities/user/user.routes");

module.exports = app => {
  app.use("/api/user", userRouter);
};
