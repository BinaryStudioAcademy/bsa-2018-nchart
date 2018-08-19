const project = require('express').Router();
const ProjectService = require('../../entities/project/project.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

project.get('/', (req, res, next) => {
	ProjectService.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

project.post('/', (req, res) => {
	// console.log(req.body);
	res.status(200).json({ payload: null, isSuccess: true, errors: [] });
});

project.get('/test', (req, res) => {
	// console.log(true, 'get all', 1);
	const projects = [
		{
			id: '0',
			name: 'test1',
			datasets: [
				{
					id: 1,
					columns: [
						{
							id: 1,
							title: 'col1',
							type: 'number'
						},
						{
							id: 2,
							title: 'col2',
							type: 'string'
						}
					],
					data: [[1, 2], ['text', 'text']]
				}
			],
			charts: [
				{
					id: 1,
					chartTypeId: 1,
					datatsetId: 1,
					dimensionSettings: [
						{
							id: 1,
							columnId: 1
						},
						{
							id: 2,
							columnId: 2
						}
					],
					customizeSettings: [
						{
							id: 1,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						},
						{
							id: 2,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						}
					]
				}
			],
			createdAt: 1,
			isDraft: true
		},
		{
			id: '1',
			name: 'test2',
			datasets: [
				{
					id: 1,
					columns: [
						{
							id: 1,
							title: 'col1',
							type: 'number'
						},
						{
							id: 2,
							title: 'col2',
							type: 'string'
						}
					],
					data: [[1, 2], ['text', 'text']]
				}
			],
			charts: [
				{
					id: 1,
					chartTypeId: 1,
					datatsetId: 1,
					dimensionSettings: [
						{
							id: 1,
							columnId: 1
						},
						{
							id: 2,
							columnId: 2
						}
					],
					customizeSettings: [
						{
							id: 1,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						},
						{
							id: 2,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						}
					]
				}
			],
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

project.get('/:id', (req, res) => {
	// console.log(req.params.id);
	const projectTest = [
		{
			id: '0',
			name: 'test0',
			datasets: [
				{
					id: 1,
					columns: [
						{
							id: 1,
							title: 'col1',
							type: 'number'
						},
						{
							id: 2,
							title: 'col2',
							type: 'string'
						}
					],
					data: [[1, 2], ['text', 'text']]
				}
			],
			charts: [
				{
					id: 1,
					chartTypeId: 1,
					datatsetId: 1,
					dimensionSettings: [
						{
							id: 1,
							columnId: 1
						},
						{
							id: 2,
							columnId: 2
						}
					],
					customizeSettings: [
						{
							id: 1,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						},
						{
							id: 2,
							value: 123,
							option: 'lol',
							description: 'desc desc'
						}
					]
				}
			],
			createdAt: 1,
			isDraft: true
		}
	];
	const payload = {
		payload: projectTest,
		isSuccess: true,
		errors: []
	};
	res.json(payload);
});

module.exports = project;
