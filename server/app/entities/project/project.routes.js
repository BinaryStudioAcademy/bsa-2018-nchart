const project = require('express').Router();
const projectService = require('../../entities/project/project.service');

project.get('/:id', (req, res) => {
	projectService.findById(Number(req.params.id), (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

project.post('/', (req, res) => {
	projectService.save(req.body, (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

project.put('/:id', (req, res) => {
	projectService.update(Number(req.params.id), req.body, (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

project.delete('/:id', (req, res) => {
	projectService.removeById(Number(req.params.id), (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

module.exports = project;
