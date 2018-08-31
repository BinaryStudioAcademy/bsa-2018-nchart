const file = require('express').Router();
const fileUpload = require('express-fileupload');
const PayloadGeneratorService = require('../common/services/payload-generator.service');
const parseJSAsync = require('../common/services/worker.service');

// middleware for uploading files
file.use(fileUpload());

file.post('/parse', (req, res, next) => {
	parseJSAsync(req.files, req.body.text, req.body.link)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = file;
