const group = require('express').Router();
const groupService = require('../../entities/group/group.service');
const tokenInfoMiddleware = require('../../common/middleware/token-info.middleware');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');

group.use(tokenInfoMiddleware);

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

group.post('/test', (req, res, next) => {
	groupService
		.findAllFullUserGroups(req.body, res)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = group;
