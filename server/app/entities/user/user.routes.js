const user = require('express').Router();
const userService = require('../../entities/user/user.service');
// const GeneratePayload = require('../../common/middleware/payload.middleware');

user.get('/', (req, res) => {
	userService
		.getAll()
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err.message);
			res.status(400);
			res.end();
		});
});

user.get('/:id', (req, res) => {
	userService
		.getById(Number(req.params.id))
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err.message);
			res.status(400);
			res.end();
		});
});

/**
 * Register user
 *
 * @param {req} req.body - expected array:
 *
 * {
   "user":{
      "firstName":"testName",
      "lastName":"testSurname",
      "email":"user@gmail.com",
      "password":"password"
   },
   "company": "BSA" || false
   }
 *
 * @returns array of created entities, status 400 if it's not
 */

user.post('/register', (req, res) => {
	userService
		.save(req.body)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err);
			res.status(400);
			res.end();
		});
});

/**
 * Login user
 *
 * @param {req} req.body - expected array:
 *
 * {
      "email":"user@gmail.com",
      "password":"password"
   }
 *
 * @returns "token" if login successful, err and status 400 if it's not.
 */
user.post('/login', (req, res) => {
	userService
		.login(req.body)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err.message);
			res.status(400);
			res.end();
		});
});

user.post('/verifyToken', (req, res) => {
	userService
		.verifyToken(req.body.token)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err);
			res.status(400);
			res.end();
		});
});

user.put('/:id', (req, res) => {
	userService
		.updateUser(Number(req.params.id), req.body)
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err.message);
			res.status(400);
			res.end();
		});
});

user.delete('/:id', (req, res) => {
	userService
		.removeById(Number(req.params.id))
		.then(data => {
			res.json(data);
		})
		.catch(err => {
			res.json(err.message);
			res.status(400);
			res.end();
		});
});

module.exports = user;
