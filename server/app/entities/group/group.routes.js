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

group.post('/', (req, res, next) => {
	groupService
		.saveFullGroup(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// test route
group.post('/user', (req, res, next) => {
	groupService
		.saveGroupUser(req.body.userId, req.body.groupId)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

// test route
group.post('/findOne', (req, res, next) => {
	groupService
		.findOneGroupUser(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = group;
