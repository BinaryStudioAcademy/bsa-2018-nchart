const file = require('express').Router();
const fileUpload = require('express-fileupload');
const {
	fileService
} = require('../common/services/file.services/file.service');
const PayloadGeneratorService = require('../common/services/payload-generator.service');

// middleware for uploading files
file.use(fileUpload());

file.post('/upload', (req, res, next) => {
	fileService(req.files, req.body.text, req.body.link)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

file.post('/link', (req, res, next) => {
	fileService(req.files, req.body.text, req.body.link)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = file;
