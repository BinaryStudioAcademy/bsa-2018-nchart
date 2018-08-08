const async = require('async');
const UserRepository = require('./user.repository');
const TokenService = require('../../common/token.service');
const CompanyService = require('../company/company.service');
const CompanyUserService = require('../company/company_user/company_user.service');
const GroupService = require('../group/group.service');
const GroupUserService = require('../group/group_user/group_user.service');

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
		return new Promise((resolve, reject) => {
			async.waterfall(
				[
					callback => {
						this.UserRepository.save(obj)
							.then(data =>
								callback(null, {
									token: TokenService.createToken(data),
									user: data
								})
							)
							.catch(err =>
								callback(err.errors[0].message, null)
							);
					},
					(payload, callback) => {
						GroupService.save('General', (err, data) => {
							if (err) {
								return callback(err, null);
							}
							return callback(
								null,
								Object.assign({}, payload, { group: data })
							);
						});
					},
					(payload, callback) => {
						GroupUserService.save(
							payload.user.id,
							payload.group.id,
							(err, data) => {
								if (err) {
									return callback(err, null);
								}
								return callback(
									null,
									Object.assign({}, payload, {
										groupUser: data
									})
								);
							}
						);
					},
					(payload, callback) => {
						CompanyService.save(obj, (err, data) => {
							if (err) {
								return callback(err, null);
							}
							return callback(
								null,
								Object.assign({}, payload, { company: data })
							);
						});
					},
					(payload, callback) => {
						CompanyUserService.save(
							payload.user.id,
							payload.company.id,
							(err, data) => {
								if (err) {
									return callback(err, null);
								}
								return callback(
									null,
									Object.assign({}, payload, {
										companyUser: data
									})
								);
							}
						);
					}
				],
				(err, payload) => {
					if (err) {
						return reject(err);
					}
					return resolve(payload.token);
				}
			);
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
