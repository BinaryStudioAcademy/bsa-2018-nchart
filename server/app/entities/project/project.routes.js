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
            datasets: [{
                id: 1,
                isDraft: true,
                modified: {
                    id: 1,
                    columns: [{
                        id: 1,
                        title: 'col1',
                        type: 'number'
                    },
                        {
                            id: 2,
                            title: 'col2',
                            type: 'string'
                        }],
                    data: [[1, 2], ['text', 'text']],
                },
                source: {
                    id: 1,
                    columns: [{
                        id: 1,
                        title: 'col1',
                        type: 'number'
                    },
                        {
                            id: 2,
                            title: 'col2',
                            type: 'string'
                        }],
                    data: [[1, 2], ['text', 'text']],
                },
            }],
            charts: [{
                id: 1,
                type: 'bar',
                name: 'coolChart',
                description: 'awesome description',
                dimensionSettings: [{
                    id: 1,
                    variable: 'lol',
                    multiple: true,
                    required: true,
                    type: ['number', 'string'],
                    description: 'desc'
                },
                    {
                        id: 2,
                        variable: 'lol',
                        multiple: true,
                        required: true,
                        type: ['number', 'string'],
                        description: 'desc'
                    }
                ],
                customizeSettings: [{
                    id: 1,
                    value: 123,
                    option: 'lol',
                    description: 'desc desc',
                },{
                    id: 2,
                    value: 123,
                    option: 'lol',
                    description: 'desc desc',
                }],
            }],
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
