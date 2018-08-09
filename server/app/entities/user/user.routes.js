const user = require('express').Router();
const userService = require('../../entities/user/user.service');
const GeneratePayload = require('../../common/middleware/payload.middleware');

user.get('/', (req, res, next) => {
	userService
		.getAll()
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.get('/:id', (req, res, next) => {
	userService
		.getById(Number(req.params.id))
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.post('/register', (req, res, next) => {
	userService
		.save(req.body)
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.post('/login', (req, res, next) => {
	userService
		.login(req.body)
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.post('/verifyToken', (req, res, next) => {
	userService
		.verifyToken(req.body.token)
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.put('/:id', (req, res, next) => {
	userService
		.updateUser(Number(req.params.id), req.body)
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

user.delete('/:id', (req, res, next) => {
	userService
		.removeById(Number(req.params.id))
		.then(data => {
			res.json(GeneratePayload.generateSuccess(data));
		})
		.catch(next);
});

module.exports = user;
