const user = require('express').Router();
const userService = require('../../entities/user/user.service');
const PayloadGeneratorService = require('../../common/services/payload-generator.service');
const validationMiddleware = require('../../common/middleware/validation.middleware');

user.use(validationMiddleware);

user.get('/', (req, res, next) => {
	userService
		.getAll()
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.get('/:id', (req, res, next) => {
	userService
		.getById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.post('/register', (req, res, next) => {
	userService
		.save(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.post('/login', (req, res, next) => {
	userService
		.login(req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.post('/verifyToken', (req, res, next) => {
	userService
		.verifyToken(req.body.token)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.put('/:id', (req, res, next) => {
	userService
		.updateUser(Number(req.params.id), req.body)
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

user.delete('/:id', (req, res, next) => {
	userService
		.removeById(Number(req.params.id))
		.then(PayloadGeneratorService.nextWithData(next, res))
		.catch(next);
});

module.exports = user;
