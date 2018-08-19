const chart = require('express').Router();
const chartService = require('./chart.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

chart.get('/', (req, res, next) => {
	chartService
		.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

chart.get('/:id', (req, res, next) => {
	chartService
		.getById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

chart.post('/', (req, res, next) => {
	chartService
		.handleDataset(req.body.charts)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = chart;
