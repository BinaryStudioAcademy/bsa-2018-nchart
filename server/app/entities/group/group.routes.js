const group = require('express').Router();
const groupService = require('../../entities/group/group.service');

group.get('/', (req, res) => {
	groupService.findAll((err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

group.get('/:id', (req, res) => {
	groupService.findById(Number(req.params.id), (err, data) => {
		if (!err) {
			res.data = data;
			res.json(res.data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

group.post('/', (req, res) => {
	groupService.save(req.body, (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

group.put('/:id', (req, res) => {
	groupService.update(Number(req.params.id), req.body, (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

group.delete('/:id', (req, res) => {
	groupService.removeById(Number(req.params.id), (err, data) => {
		if (!err) {
			res.json(data);
		} else {
			res.status(400);
			res.end();
		}
	});
});

module.exports = group;
