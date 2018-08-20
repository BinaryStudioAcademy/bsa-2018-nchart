const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const PdfService = require('../../common/services/pdf.service');

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/:id/export', (req, res) => {
	PdfService.createPdf(req.params.id).then(result => {
		res.writeHead(200, {
			'Content-Disposition': 'inline',
			'Content-Length': result.length,
			'Content-Type': 'application/pdf'
		});
		res.end(result);
	});
});

module.exports = project;
