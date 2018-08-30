const group = require('express').Router();
const groupService = require('../../entities/group/group.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');

group.use(tokenInfoMiddleware);

group.get('/', (req, res, next) => {
	groupService
		.findAllUserGroups(res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

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
	groupService
		.findOneGroupUser(req.body)
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
