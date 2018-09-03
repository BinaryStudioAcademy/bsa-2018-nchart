const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');
const ProjectPayloadValidator = require('../../common/middleware/validation/project.validator');
const {
	successOrEmptyPayload
} = require('../../common/middleware/payload.middleware');

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

project.post('/name', (req, res, next) => {
	// getByProjectId user from token, and set it into res.locals.user
	ProjectService.updateProjectName(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// todo: what do with rout names?
project.get('/group/:id', (req, res, next) => {
	ProjectService.fullProjectsByGroupId(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get(
	'/user',
	(req, res, next) => {
		ProjectService.fullProjectByUserId(res.locals.user.id)
			.then(PayloadGeneratorService.nextWithData(next, res))
			.catch(next);
	},
	successOrEmptyPayload
);

project.post('/share', (req, res, next) => {
	ProjectService.shareProject(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// todo: retard route name
project.post('/shareByEmail', (req, res, next) => {
	ProjectService.shareProjectByEmail(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get(
	'/owners',
	(req, res, next) => {
		ProjectService.findProjectsWithOwners(res.locals.user.id)
			.then(PayloadGeneratorService.nextWithData(next, res))
			.catch(next);
	},
	successOrEmptyPayload
);

project.post('/delete', (req, res, next) => {
	ProjectService.deleteProjects(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/:id', (req, res, next) => {
	ProjectService.fullProjectById(Number(req.params.id), res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/:id/export', (req, res) => {
	ProjectService.export(
		req.params.id,
		req.query.type,
		req.query.selector
	).then(result => {
		let contentType;
		switch (req.query.type) {
			case 'pdf':
				contentType = 'application/pdf';
				break;
			case 'png':
				contentType = 'image/png';
				break;
			case 'svg':
				contentType = 'image/svg+xml';
				break;
			default:
				contentType = 'application/json';
				break;
		}
		if (result) {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': `${contentType}`
			});
			res.end(result);
		} else {
			res.sendStatus(400);
		}
	});
});

project.post('/:id/export', (req, res) => {
	ProjectService.exportHtml(req.body.content, req.body.type).then(result => {
		let contentType;
		switch (req.body.type) {
			case 'pdf':
				contentType = 'application/pdf';
				break;
			case 'png':
				contentType = 'image/png';
				break;
			case 'svg':
				contentType = 'image/svg+xml';
				break;
			default:
				contentType = 'application/json';
				break;
		}
		if (result) {
			res.writeHead(200, {
				'Content-Disposition': 'inline',
				'Content-Length': result.length,
				'Content-Type': `${contentType}`
			});
			res.end(result);
		} else {
			res.sendStatus(400);
		}
	});
});

module.exports = project;
