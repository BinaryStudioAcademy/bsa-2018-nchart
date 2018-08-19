const userRouter = require('../entities/user/user.routes');
const projectRouter = require('../entities/project/project.routes');
const groupRouter = require('../entities/group/group.routes');
const companyRouter = require('../entities/company/company.routes');
const chartRouter = require('../entities/chartType/chartType.routes');
const fileRouter = require('./file.routes');
const datasetRouter = require('../entities/dataset/dataset.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	app.use('/api/project', projectRouter);
	app.use('/api/group', groupRouter);
	app.use('/api/company', companyRouter);
	app.use('/api/chart-type', chartRouter);
	// todo: solve problem with those routes
	app.use('/api/data-set', fileRouter);
	app.use('/api/dataset', datasetRouter);
};
