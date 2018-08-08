const UserRepository = require('./user.repository');
const TokenService = require('../../common/token.service');
// const async = require('async');
// const CompanyService = require('../company/company.service');
// const CompanyUserService = require('../company/company_user/company_user.service');
// const GroupService = require('../group/group.service');
// const GroupUserService = require('../group/group_user/group_user.service');

class UserService {
	constructor() {
		this.UserRepository = UserRepository;
	}

	getAll() {
		return this.UserRepository.getAll();
	}

	getById(id) {
		return this.UserRepository.getById(id);
	}

	save(obj) {
		return this.UserRepository.save(obj)
			.then(data => TokenService.createToken(data))
			.catch(err => {
				const errArr = [];
				for (let i = 0; i < err.errors.length; i + 1) {
					errArr.push(err.errors[i].message);
				}
				throw new Error(errArr.join(','));
			});
	}

	login(obj) {
		return this.UserRepository.findByEmail(obj)
			.then(data => {
				if (data === null) {
					throw new Error('User does not exist');
				} else if (data.dataValues.password === obj.password) {
					return TokenService.createToken(data.dataValues);
				} else {
					throw new Error('Wrong password');
				}
			})
			.catch(err => {
				throw new Error(err);
			});
	}

	removeById(id) {
		return this.UserRepository.removeById(id)
			.then(data => {
				if (data === 0) {
					throw new Error('Object did not exist');
				} else {
					return 'Object deleted';
				}
			})
			.catch(err => {
				throw new Error(err);
			});
	}

	updateUser(id, obj) {
		return this.UserRepository.update(id, obj)
			.then(data => {
				if (data[0] === 0) {
					throw new Error('Object does not exist');
				}
				return 'Object updated';
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = new UserService();
