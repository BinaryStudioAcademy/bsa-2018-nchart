const userRouter = require('../entities/user/user.routes').default;

module.exports = app => {
	app.use('/api/user', userRouter);
};
