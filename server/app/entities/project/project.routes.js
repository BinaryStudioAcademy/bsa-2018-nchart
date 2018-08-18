const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.get('/test', (req, res) => {
	const projects = [
		{
			id: '0',
			name: 'test1',
			datasets: [1, 2, 3],
			charts: [3, 4, 5],
			createdAt: 1,
			isDraft: true
		},
		{
			id: '1',
			name: 'test2',
			datasets: [1, 2, 3],
			charts: [3, 4, 5],
			createdAt: 1,
			isDraft: true
		}
	];
	const payload = {
		payload: projects,
		isSuccess: true,
		errors: []
	};
	res.json(payload);
});

module.exports = project;
