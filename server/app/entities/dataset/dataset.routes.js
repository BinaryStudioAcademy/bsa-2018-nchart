const dataset = require('express').Router();
const datasetService = require('./dataset.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

dataset.get('/', (req, res, next) => {
	datasetService
		.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

dataset.get('/:id', (req, res, next) => {
	datasetService
		.getById(req.params.id)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

dataset.post('/', (req, res, next) => {
	datasetService
		.upsert(req.body.datasets)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = dataset;
