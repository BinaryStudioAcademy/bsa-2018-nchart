const file = require('express').Router();
const fileUpload = require('express-fileupload');
const fileService = require('../common/services/file.service');
const GeneratePayload = require('../common/middleware/payload.middleware');

// middleware for uploading files
file.use(fileUpload());

// file.get('/', (req, res, next) => {
//
// });

file.post('/upload', (req, res, next) => {
	fileService(req.files)
		.then(GeneratePayload.nextWithData(next, res))
		.catch(next);
});

module.exports = file;
