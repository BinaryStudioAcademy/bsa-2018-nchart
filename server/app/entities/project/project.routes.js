const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');
const ProjectPayloadValidator = require('../../common/middleware/validation/project.validator');

project.use(tokenInfoMiddleware);

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.post('/', ProjectPayloadValidator.fullSet, (req, res, next) => {
	// getByProjectId user from token, and set it into res.locals.user
	ProjectService.handleProject(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/:id', (req, res, next) => {
	ProjectService.fullProjectById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// todo: what do with rout names?
project.get('/group/:id', (req, res, next) => {
	ProjectService.fullProjectsByGroupId(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// todo: add element selector to query
project.get('/:id/export', (req, res) => {
	ProjectService.export(req.params.id, req.query.type).then(result => {
		if (result && !(req.query.type === 'svg')) {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': `application/${req.query.type}`
			});
			res.end(result);
		} else if (result && req.query.type === 'svg') {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': 'image/svg+xml'
			});
			res.end(result);
		} else {
			res.sendStatus(400);
		}
	});
});

// todo: add content and type to body
project.post('/:id/export', (req, res) => {
	ProjectService.exportHtml(req.params.id, req.body).then(result => {
		if (result) {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': 'application/pdf'
			});
			res.end(result);
		} else {
			res.send(400);
		}
	});
});

// todo: remove this
project.get('/:id/screenshot', (req, res) => {
	ProjectService.screenshot(req.params.id).then(result => {
		if (result) {
			res.writeHead(200, {
				'Content-Disposition': 'attachment; filename="screenshot.png"',
				'Content-Length': result.length,
				'Content-Type': 'application/png'
			});
			res.end(result);
		} else {
			res.send(400);
		}
	});
});

module.exports = project;
