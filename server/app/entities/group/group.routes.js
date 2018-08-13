const group = require('express').Router();
const groupService = require('../../entities/group/group.service');

group.post('/', (req, res) => {
	groupService
		.saveGroup(req.body)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err);
			res.status(400);
			res.end();
		});
});

module.exports = group;