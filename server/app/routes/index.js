const userRouter = require('../entities/user/user.routes');
const projectRouter = require('../entities/project/project.routes');
const groupRouter = require('../entities/group/group.routes');
const companyRouter = require('../entities/company/company.routes');
const chartRouter = require('../entities/chart_type/chart_type.routes');
const fileRouter = require('./file.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	app.use('/api/project', projectRouter);
	app.use('/api/group', groupRouter);
	app.use('/api/company', companyRouter);
	app.use('/api/chartType', chartRouter);
	app.use('/api/data-set', fileRouter);
};
