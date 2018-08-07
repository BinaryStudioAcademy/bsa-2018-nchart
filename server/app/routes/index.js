// const userRouter = require("../entities/user/user.routes").default;
const userRouter = require('../entities/user/user.routes');
const projectRouter = require('../entities/project/project.routes');
const groupRouter = require('../entities/group/group.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	app.use('/api/project', projectRouter);
	app.use('/api/group', groupRouter);
};
