const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');
const validationMiddleware = require('../../common/middleware/validation.middleware');

project.use(tokenInfoMiddleware);
project.use(validationMiddleware);

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.post('/', (req, res, next) => {
	// get user from token, and set it into res.locals.user
	ProjectService.handleProject(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/test/:id', (req, res, next) => {
	ProjectService.queryTest(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = project;
