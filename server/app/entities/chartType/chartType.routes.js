const chartType = require('express').Router();
const chartTypeService = require('./chartType.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

chartType.get('/', (req, res, next) => {
	chartTypeService
		.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

chartType.get('/:id', (req, res, next) => {
	chartTypeService
		.getById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = chartType;
