const userRouter = require('../entities/user/user.routes');
const projectRouter = require('../entities/project/project.routes');
const groupRouter = require('../entities/group/group.routes');
const companyRouter = require('../entities/company/company.routes');
const chartTypeRouter = require('../entities/chartType/chartType.routes');
const fileRouter = require('./file.routes');
const datasetRouter = require('../entities/dataset/dataset.routes');
const chartRouter = require('../entities/chart/chart.routes');

module.exports = app => {
	app.use('/api/user', userRouter);
	app.use('/api/project', projectRouter);
	app.use('/api/group', groupRouter);
	app.use('/api/company', companyRouter);
	app.use('/api/chart-type', chartTypeRouter);
	// todo: solve problem with those routes
	app.use('/api/data-set', fileRouter);
	app.use('/api/dataset', datasetRouter);
	app.use('/api/chart', chartRouter);
};
