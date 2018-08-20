const group = require('express').Router();
const groupService = require('../../entities/group/group.service');

// test route
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

// test route
group.post('/user', (req, res) => {
	groupService
		.saveGroupUser(req.body.userId, req.body.groupId)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err);
			res.status(400);
			res.end();
		});
});

// test route
group.post('/findOne', (req, res) => {
	groupService.findOneByQuery(req.body)
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
